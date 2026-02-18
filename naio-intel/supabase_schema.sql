-- ============================================================
-- DC Market Intelligence — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CORE TABLES
-- ============================================================

-- Companies we track
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN (
        'hyperscaler', 'dc_operator', 'chip_compute',
        'energy', 'supply_chain', 'financial_actor'
    )),
    sub_category TEXT, -- e.g., 'us_major', 'nordic_specialist', 'european_major'
    headquarters TEXT,
    website TEXT,
    ticker TEXT, -- stock ticker if public
    is_public BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- All intelligence items (the unified news table)
CREATE TABLE intelligence_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN (
        'news_summary', 'deal_synopsis', 'capex_announcement',
        'financing_event', 'earnings_intelligence', 'regulatory_update',
        'power_demand_signal', 'executive_move', 'supply_chain_signal',
        'briefing'
    )),
    headline TEXT NOT NULL,
    summary TEXT NOT NULL,
    layer TEXT NOT NULL CHECK (layer IN (
        'infrastructure', 'chip', 'energy', 'financing',
        'supply_chain', 'cross-layer'
    )),
    importance TEXT NOT NULL DEFAULT 'medium' CHECK (importance IN ('high', 'medium', 'low')),
    importance_rationale TEXT,
    region TEXT,
    date DATE NOT NULL,
    source_url TEXT,
    source_name TEXT,
    tags TEXT[] DEFAULT '{}',
    -- The full structured JSON output from Claude (contains all type-specific fields)
    full_data JSONB NOT NULL,
    -- Processing metadata
    raw_article_text TEXT, -- original article text that was processed
    processed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link intelligence items to companies (many-to-many)
CREATE TABLE intelligence_companies (
    intelligence_item_id UUID REFERENCES intelligence_items(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    role TEXT, -- e.g., 'buyer', 'seller', 'subject', 'mentioned'
    PRIMARY KEY (intelligence_item_id, company_id)
);

-- ============================================================
-- SPECIALIZED TABLES (for structured querying beyond JSON)
-- ============================================================

-- Deal comparables tracker
CREATE TABLE deal_comps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intelligence_item_id UUID REFERENCES intelligence_items(id) ON DELETE CASCADE,
    deal_type TEXT NOT NULL,
    deal_value_usd BIGINT, -- in USD, NULL if undisclosed
    capacity_mw DECIMAL,
    price_per_mw DECIMAL, -- computed: deal_value / capacity_mw
    location TEXT,
    date DATE NOT NULL,
    buyer TEXT,
    seller TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financing comparables tracker
CREATE TABLE financing_comps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intelligence_item_id UUID REFERENCES intelligence_items(id) ON DELETE CASCADE,
    company TEXT NOT NULL,
    event_subtype TEXT NOT NULL,
    amount_usd BIGINT,
    currency TEXT DEFAULT 'USD',
    tenor_years DECIMAL,
    coupon_rate DECIMAL,
    spread_bps INTEGER, -- spread in basis points
    rating_moodys TEXT,
    rating_sp TEXT,
    rating_fitch TEXT,
    rating_outlook TEXT,
    use_of_proceeds TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Capex tracker (running log of announced spend)
CREATE TABLE capex_tracker (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intelligence_item_id UUID REFERENCES intelligence_items(id) ON DELETE CASCADE,
    company TEXT NOT NULL,
    announced_spend_usd BIGINT,
    time_horizon TEXT,
    self_build_pct DECIMAL,
    colo_leasing_pct DECIMAL,
    regions TEXT[],
    funding_source TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Power demand pipeline
CREATE TABLE power_demand_pipeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intelligence_item_id UUID REFERENCES intelligence_items(id) ON DELETE CASCADE,
    region TEXT NOT NULL,
    utility_or_grid_operator TEXT,
    signal_type TEXT NOT NULL,
    requested_capacity_mw DECIMAL,
    dc_operator TEXT,
    timeline TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Regulatory tracker
CREATE TABLE regulatory_tracker (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intelligence_item_id UUID REFERENCES intelligence_items(id) ON DELETE CASCADE,
    jurisdiction TEXT NOT NULL,
    regulatory_body TEXT,
    action_type TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN (
        'proposed', 'under_review', 'approved', 'rejected',
        'in_effect', 'expired', 'appealed'
    )),
    affected_capacity_mw DECIMAL,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NEWS SOURCES (for the fetching pipeline)
-- ============================================================

CREATE TABLE news_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    source_type TEXT NOT NULL CHECK (source_type IN ('rss', 'api', 'scrape')),
    category TEXT, -- which layer/topic this source covers
    is_active BOOLEAN DEFAULT true,
    last_fetched_at TIMESTAMPTZ,
    fetch_interval_minutes INTEGER DEFAULT 360, -- default: every 6 hours
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Raw fetched articles (before Claude processing)
CREATE TABLE raw_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES news_sources(id),
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE, -- dedup key
    content TEXT,
    published_at TIMESTAMPTZ,
    is_processed BOOLEAN DEFAULT false,
    is_relevant BOOLEAN, -- set after Claude triage
    processing_error TEXT,
    fetched_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- ============================================================
-- EVENTS CALENDAR
-- ============================================================

CREATE TABLE events_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL CHECK (event_type IN (
        'conference', 'earnings', 'regulatory_deadline',
        'ipo', 'bond_maturity', 'other'
    )),
    title TEXT NOT NULL,
    description TEXT,
    company TEXT, -- for earnings events
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MARKET HEATMAP DATA (aggregated weekly)
-- ============================================================

CREATE TABLE market_heatmap (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region TEXT NOT NULL,
    week_start DATE NOT NULL,
    news_count INTEGER DEFAULT 0,
    deal_count INTEGER DEFAULT 0,
    total_deal_value_usd BIGINT DEFAULT 0,
    total_mw_announced DECIMAL DEFAULT 0,
    total_capex_announced_usd BIGINT DEFAULT 0,
    regulatory_events INTEGER DEFAULT 0,
    power_demand_signals INTEGER DEFAULT 0,
    heat_score DECIMAL, -- computed composite score
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (region, week_start)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_intelligence_type ON intelligence_items(type);
CREATE INDEX idx_intelligence_layer ON intelligence_items(layer);
CREATE INDEX idx_intelligence_importance ON intelligence_items(importance);
CREATE INDEX idx_intelligence_date ON intelligence_items(date DESC);
CREATE INDEX idx_intelligence_region ON intelligence_items(region);
CREATE INDEX idx_intelligence_tags ON intelligence_items USING GIN(tags);
CREATE INDEX idx_intelligence_full_data ON intelligence_items USING GIN(full_data);

CREATE INDEX idx_raw_articles_processed ON raw_articles(is_processed);
CREATE INDEX idx_raw_articles_url ON raw_articles(url);

CREATE INDEX idx_deal_comps_date ON deal_comps(date DESC);
CREATE INDEX idx_deal_comps_type ON deal_comps(deal_type);

CREATE INDEX idx_financing_comps_date ON financing_comps(date DESC);
CREATE INDEX idx_financing_comps_company ON financing_comps(company);

CREATE INDEX idx_capex_tracker_company ON capex_tracker(company);
CREATE INDEX idx_capex_tracker_date ON capex_tracker(date DESC);

CREATE INDEX idx_power_demand_region ON power_demand_pipeline(region);
CREATE INDEX idx_regulatory_jurisdiction ON regulatory_tracker(jurisdiction);
CREATE INDEX idx_regulatory_status ON regulatory_tracker(status);

CREATE INDEX idx_events_date ON events_calendar(start_date);
CREATE INDEX idx_events_type ON events_calendar(event_type);

CREATE INDEX idx_market_heatmap_region ON market_heatmap(region, week_start DESC);

-- ============================================================
-- ROW LEVEL SECURITY (public read, service role write)
-- ============================================================

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelligence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelligence_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_comps ENABLE ROW LEVEL SECURITY;
ALTER TABLE financing_comps ENABLE ROW LEVEL SECURITY;
ALTER TABLE capex_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE power_demand_pipeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulatory_tracker ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE raw_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_heatmap ENABLE ROW LEVEL SECURITY;

-- Public read access (for the frontend using anon key)
CREATE POLICY "Public read" ON companies FOR SELECT USING (true);
CREATE POLICY "Public read" ON intelligence_items FOR SELECT USING (true);
CREATE POLICY "Public read" ON intelligence_companies FOR SELECT USING (true);
CREATE POLICY "Public read" ON deal_comps FOR SELECT USING (true);
CREATE POLICY "Public read" ON financing_comps FOR SELECT USING (true);
CREATE POLICY "Public read" ON capex_tracker FOR SELECT USING (true);
CREATE POLICY "Public read" ON power_demand_pipeline FOR SELECT USING (true);
CREATE POLICY "Public read" ON regulatory_tracker FOR SELECT USING (true);
CREATE POLICY "Public read" ON events_calendar FOR SELECT USING (true);
CREATE POLICY "Public read" ON market_heatmap FOR SELECT USING (true);

-- Service role write access (for the data pipeline)
CREATE POLICY "Service write" ON companies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON intelligence_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON intelligence_companies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON deal_comps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON financing_comps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON capex_tracker FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON power_demand_pipeline FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON regulatory_tracker FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON news_sources FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON raw_articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON events_calendar FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON market_heatmap FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- HELPER FUNCTION: Update updated_at timestamp
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_intelligence_items_updated_at
    BEFORE UPDATE ON intelligence_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
