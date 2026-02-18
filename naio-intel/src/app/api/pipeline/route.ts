import { NextResponse } from "next/server";

// This endpoint is called by Vercel Cron (daily) to run the news pipeline.
// It fetches articles from RSS/news sources, processes them through Claude,
// and inserts structured intelligence into Supabase.

const SYSTEM_PROMPT_URL = "system_prompt_v3.md"; // loaded at build time

// Company search terms for news API queries
const SEARCH_QUERIES = [
  // Hyperscalers + DC
  "data center hyperscaler Microsoft Azure AWS Google Meta Oracle",
  "Equinix Digital Realty data center",
  "QTS Switch Aligned Crusoe data center",
  "Vantage EdgeConnex Compass DataBank data center",
  "EcoDataCenter Evroc Green Mountain DigiPlex Nordic data center",
  // Energy + Power
  "data center power PPA nuclear renewable energy",
  "Vattenfall Fortum Statkraft data center power",
  "Constellation Vistra Talen Energy data center",
  // Financing
  "data center bond debt financing REIT",
  "data center acquisition M&A PE infrastructure",
  "data center credit rating Moody S&P",
  // Supply chain
  "data center transformer generator lead time supply chain",
  "Schneider Electric Vertiv Eaton data center",
  // Regulatory
  "data center moratorium regulation permitting zoning",
  "data center water cooling energy efficiency regulation",
];

export async function GET(request: Request) {
  // Verify this is called by cron or authorized user
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Allow in development
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const results = {
      fetched: 0,
      processed: 0,
      inserted: 0,
      errors: [] as string[],
    };

    // Step 1: Fetch articles from News API
    const articles = await fetchArticles();
    results.fetched = articles.length;

    // Step 2: Process each through Claude
    for (const article of articles) {
      try {
        const intel = await processWithClaude(article);
        if (intel) {
          results.processed++;
          // Step 3: Insert into Supabase
          const inserted = await insertIntelligence(intel);
          if (inserted) results.inserted++;
        }
      } catch (err: any) {
        results.errors.push(`${article.title}: ${err.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...results,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

async function fetchArticles(): Promise<any[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  const allArticles: any[] = [];
  const seenUrls = new Set<string>();

  for (const query of SEARCH_QUERIES.slice(0, 5)) {
    // Limit to 5 queries to stay within free tier
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`,
        { next: { revalidate: 0 } }
      );
      const data = await res.json();
      if (data.articles) {
        for (const a of data.articles) {
          if (!seenUrls.has(a.url)) {
            seenUrls.add(a.url);
            allArticles.push(a);
          }
        }
      }
    } catch (err) {
      console.error(`Failed to fetch for query: ${query}`, err);
    }
  }

  return allArticles;
}

async function processWithClaude(article: any): Promise<any | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const prompt = `Process the following article and produce a structured JSON intelligence output according to your instructions.

ARTICLE TITLE: ${article.title}
ARTICLE SOURCE: ${article.source?.name || "Unknown"}
ARTICLE URL: ${article.url}
PUBLISHED: ${article.publishedAt}
CONTENT: ${article.description || ""} ${article.content || ""}

If this article is not relevant to the data center industry (infrastructure, chip, energy, financing, supply chain), respond with: {"relevant": false}

Otherwise, produce the appropriate structured JSON output (news_summary, deal_synopsis, capex_announcement, financing_event, earnings_intelligence, regulatory_update, power_demand_signal, executive_move, or supply_chain_signal).`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5-20250514",
      max_tokens: 2000,
      system: await getSystemPrompt(),
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  const text = data.content?.[0]?.text;
  if (!text) return null;

  try {
    const parsed = JSON.parse(text);
    if (parsed.relevant === false) return null;
    return {
      ...parsed,
      source_url: article.url,
      source_name: article.source?.name,
      raw_article_text: `${article.title}\n\n${article.description || ""}\n\n${article.content || ""}`,
    };
  } catch {
    return null;
  }
}

async function getSystemPrompt(): Promise<string> {
  // In production, load from a file or environment variable.
  // For now, return a condensed version.
  return `You are a data center market intelligence analyst. Process news articles and produce structured JSON intelligence outputs. Your output types are: news_summary, deal_synopsis, capex_announcement, financing_event, earnings_intelligence, regulatory_update, power_demand_signal, executive_move, supply_chain_signal. Always output valid JSON. Never fabricate data points. Layer options: infrastructure, chip, energy, financing, supply_chain, cross-layer. Importance: high (>$500M or market-moving), medium, low.`;
}

async function insertIntelligence(intel: any): Promise<boolean> {
  const { supabaseAdmin } = await import("@/lib/supabase");
  if (!supabaseAdmin) return false;

  const { error } = await supabaseAdmin.from("intelligence_items").insert({
    type: intel.type,
    headline: intel.headline,
    summary: intel.summary,
    layer: intel.layer,
    importance: intel.importance || "medium",
    importance_rationale: intel.importance_rationale,
    region: intel.region,
    date: intel.date || new Date().toISOString().split("T")[0],
    source_url: intel.source_url,
    source_name: intel.source_name,
    tags: intel.tags || [],
    full_data: intel,
    raw_article_text: intel.raw_article_text,
  });

  if (error) {
    console.error("Insert error:", error);
    return false;
  }
  return true;
}
