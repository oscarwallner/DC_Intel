export type Layer = "infrastructure" | "chip" | "energy" | "financing" | "supply_chain" | "cross-layer";
export type Importance = "high" | "medium" | "low";
export type IntelType =
  | "news_summary"
  | "deal_synopsis"
  | "capex_announcement"
  | "financing_event"
  | "earnings_intelligence"
  | "regulatory_update"
  | "power_demand_signal"
  | "executive_move"
  | "supply_chain_signal"
  | "briefing";

export interface IntelligenceItem {
  id: string;
  type: IntelType;
  headline: string;
  summary: string;
  layer: Layer;
  importance: Importance;
  importance_rationale: string;
  region: string;
  date: string;
  source_url: string;
  source_name: string;
  tags: string[];
  companies: string[];
  full_data: Record<string, any>;
}

export const seedData: IntelligenceItem[] = [
  {
    id: "1",
    type: "deal_synopsis",
    headline: "Microsoft signs 500MW colo deal with Equinix in Stockholm",
    summary:
      "Microsoft has signed a 500MW colocation agreement with Equinix for a new hyperscale campus in Stockholm, Sweden. The deal is one of the largest colo agreements in the Nordics and signals accelerating hyperscaler demand in the region. Construction is expected to begin Q3 2026 with first capacity online by Q1 2028.",
    layer: "infrastructure",
    importance: "high",
    importance_rationale:
      "Largest colo deal in the Nordics — signals hyperscaler commitment to the region and validates Sweden's power advantage.",
    region: "Stockholm, Sweden",
    date: "2026-02-15",
    source_url: "#",
    source_name: "Datacenter Dynamics",
    tags: ["colo", "nordics", "hyperscaler", "microsoft", "equinix"],
    companies: ["Microsoft", "Equinix"],
    full_data: {
      deal_type: "colo_agreement",
      deal_value: "undisclosed",
      capacity_mw: 500,
      parties: [
        { name: "Microsoft", role: "tenant" },
        { name: "Equinix", role: "landlord" },
      ],
      implications:
        "Validates Sweden as a tier-1 hyperscale market. Equinix secures long-term anchor tenant for Nordic expansion. Competitors (DigiPlex, Green Mountain) may face increased land/power competition.",
      comparable_context:
        "Compares to Microsoft's 300MW deal with Digital Realty in Dublin (Q4 2025) and AWS's 400MW AirTrunk lease in Tokyo (Q1 2026).",
    },
  },
  {
    id: "2",
    type: "financing_event",
    headline: "Digital Realty prices €1.5B green bond at T+145bps",
    summary:
      "Digital Realty priced a €1.5 billion dual-tranche green bond, with €750M 7-year at T+135bps and €750M 12-year at T+155bps. Proceeds will fund green-certified DC development in Europe, primarily Frankfurt and Amsterdam campuses. The deal was 3.8x oversubscribed.",
    layer: "financing",
    importance: "high",
    importance_rationale:
      "Largest DC green bond in 2026 — pricing signals strong investor appetite for DC credit in Europe.",
    region: "Europe",
    date: "2026-02-14",
    source_url: "#",
    source_name: "IFR",
    tags: ["green-bond", "digital-realty", "europe", "debt"],
    companies: ["Digital Realty"],
    full_data: {
      event_subtype: "green_bond",
      amount: "€1.5B",
      currency: "EUR",
      tenor_maturity: "7-year and 12-year tranches",
      coupon_rate: "3.25% / 3.75%",
      spread: "T+135bps / T+155bps",
      rating: {
        moodys: "Baa2",
        sp: "BBB",
        fitch: "BBB",
        outlook: "stable",
      },
      use_of_proceeds:
        "Green-certified DC development in Frankfurt and Amsterdam.",
      lead_arrangers: [
        "BNP Paribas",
        "Deutsche Bank",
        "J.P. Morgan",
        "Barclays",
      ],
      credit_commentary:
        "Strong oversubscription (3.8x) confirms robust investor demand for DC credit. Pricing is 10-15bps tighter than DLR's last EUR issuance (Oct 2025), reflecting improved market conditions and sector momentum.",
      comparable_context:
        "Equinix priced a €1B 10Y at T+150bps in January. DLR's tighter spread reflects similar credit quality but shorter weighted average life.",
    },
  },
  {
    id: "3",
    type: "capex_announcement",
    headline: "Meta raises 2026 DC capex guidance to $65B, up 40% YoY",
    summary:
      "Meta Platforms raised its 2026 data center capital expenditure guidance to $65 billion, a 40% increase from 2025 spending. CEO Mark Zuckerberg cited AI infrastructure demands as the primary driver. Approximately 30% of the spend is expected to flow to third-party colocation providers.",
    layer: "cross-layer",
    importance: "high",
    importance_rationale:
      "Massive capex increase with significant colo allocation — directly benefits Equinix, Digital Realty, and QTS.",
    region: "Global",
    date: "2026-02-12",
    source_url: "#",
    source_name: "Reuters",
    tags: ["capex", "meta", "ai", "colo-signal", "hyperscaler"],
    companies: ["Meta"],
    full_data: {
      announced_spend: "$65B",
      time_horizon: "FY2026",
      breakdown: {
        self_build: "~70%",
        colo_leasing: "~30% ($19.5B)",
        land_power: "Included in self-build",
      },
      funding_source: "Operating cash flow and existing credit facilities.",
      colo_signal:
        "Yes — ~$19.5B expected to flow to colo/third-party operators. Meta has historically used Equinix, QTS, and EdgeConnex for rapid market entry. This allocation represents the largest single-year colo spend by any hyperscaler.",
    },
  },
  {
    id: "4",
    type: "regulatory_update",
    headline: "Amsterdam lifts partial DC moratorium, caps new builds at 67MW",
    summary:
      "The City of Amsterdam has partially lifted its data center moratorium, allowing new builds up to 67MW per facility in designated zones outside the city center. Projects must demonstrate 100% renewable energy sourcing and waste heat recovery plans. The policy takes effect April 1, 2026.",
    layer: "infrastructure",
    importance: "high",
    importance_rationale:
      "Reopens one of Europe's most constrained DC markets — significant for operators with land positions in Amsterdam metro.",
    region: "Amsterdam, Netherlands",
    date: "2026-02-13",
    source_url: "#",
    source_name: "Dutch News",
    tags: ["regulation", "moratorium", "amsterdam", "europe"],
    companies: ["Equinix", "Digital Realty", "Interxion"],
    full_data: {
      jurisdiction: "Amsterdam, Netherlands",
      regulatory_body: "City of Amsterdam",
      action_type: "moratorium",
      status: "approved",
      affected_capacity_mw: 67,
      implications:
        "Releases pent-up demand but with strict environmental conditions. Operators with existing land and grid connections in AMS metro (Equinix/Interxion, Microsoft via its Agriport campus) benefit most. New entrants face 100% renewable + waste heat requirements, raising project costs by an estimated 15-20%.",
    },
  },
  {
    id: "5",
    type: "power_demand_signal",
    headline:
      "Vattenfall reports 2.4GW of DC interconnection requests in northern Sweden",
    summary:
      "Vattenfall disclosed that it has received data center interconnection requests totaling 2.4GW across northern Sweden, primarily in the Luleå-Boden corridor. The utility is accelerating grid reinforcement programs but warns that delivery timelines for new connections extend to 2029-2030 for requests filed today.",
    layer: "energy",
    importance: "high",
    importance_rationale:
      "2.4GW pipeline in northern Sweden alone — signals massive demand concentration and potential grid bottleneck in the Nordics.",
    region: "Luleå, Sweden",
    date: "2026-02-11",
    source_url: "#",
    source_name: "Energinyheter",
    tags: ["power", "nordics", "vattenfall", "grid", "interconnection"],
    companies: ["Vattenfall", "EcoDataCenter", "Evroc"],
    full_data: {
      utility_or_grid_operator: "Vattenfall",
      signal_type: "interconnection_request",
      requested_capacity_mw: 2400,
      timeline: "2029-2030 for new connections",
      associated_dc_operator: "Multiple — includes EcoDataCenter, Evroc, and unnamed hyperscalers",
      utility_opportunity:
        "Massive growth opportunity for Vattenfall, but grid reinforcement investment required is estimated at SEK 15-20B. Timeline risk is significant — 3-4 year connection wait could redirect demand to Norway or Finland.",
    },
  },
  {
    id: "6",
    type: "deal_synopsis",
    headline: "Blackstone acquires 60% stake in Aligned Data Centers for $3.2B",
    summary:
      "Blackstone Infrastructure Partners has agreed to acquire a 60% stake in Aligned Data Centers, valuing the company at approximately $5.3 billion. Aligned operates 12 hyperscale campuses across the US with 450MW of capacity. The deal includes a $2B commitment to fund new campus development.",
    layer: "infrastructure",
    importance: "high",
    importance_rationale:
      "Third major PE acquisition in DC sector in 6 months — confirms sustained institutional appetite for DC assets at premium valuations.",
    region: "United States",
    date: "2026-02-10",
    source_url: "#",
    source_name: "Bloomberg",
    tags: ["m&a", "pe", "aligned-dc", "blackstone", "hyperscale"],
    companies: ["Blackstone", "Aligned Data Centers"],
    full_data: {
      deal_type: "acquisition",
      deal_value: "$3.2B (60% stake; $5.3B enterprise value)",
      capacity_mw: 450,
      parties: [
        { name: "Blackstone Infrastructure Partners", role: "buyer" },
        { name: "Aligned Data Centers", role: "seller" },
      ],
      implications:
        "Validates DC as a core infrastructure asset class. Implied valuation of ~$11.8M/MW is a premium to recent comparables. Blackstone's $2B development commitment signals aggressive expansion, likely targeting 1GW+ total capacity.",
      comparable_context:
        "Compares to KKR's acquisition of CyrusOne at ~$10M/MW (2025) and DigitalBridge's Vantage recapitalization at ~$9.5M/MW (H2 2025). Blackstone paying a 20% premium reflects Aligned's cooling IP and hyperscaler backlog.",
    },
  },
  {
    id: "7",
    type: "supply_chain_signal",
    headline: "Schneider Electric announces 18-month wait for HV transformers in Europe",
    summary:
      "Schneider Electric has confirmed that lead times for high-voltage transformers in Europe have extended to 18 months, up from 12 months a year ago. The company is investing €500M in new manufacturing capacity in Poland and Spain but says relief won't materialize until late 2027.",
    layer: "supply_chain",
    importance: "medium",
    importance_rationale:
      "Transformer lead times directly constrain DC build timelines — any operator planning 2027 delivery without orders placed is at risk.",
    region: "Europe",
    date: "2026-02-09",
    source_url: "#",
    source_name: "Energy Monitor",
    tags: ["supply-chain", "transformers", "schneider", "lead-times"],
    companies: ["Schneider Electric"],
    full_data: {
      equipment_type: "transformer",
      signal_type: "lead_time_change",
      lead_time: "18 months (was 12 months in Q1 2025)",
      region_affected: "Europe",
    },
  },
  {
    id: "8",
    type: "earnings_intelligence",
    headline: "Equinix Q4 2025: Revenue up 12% YoY, raises 2026 capex to $4.2B",
    summary:
      "Equinix reported Q4 2025 revenue of $2.3B (+12% YoY) with AFFO/share of $9.45. Management raised 2026 capex guidance to $4.2B from $3.8B, citing strong hyperscaler demand, particularly in EMEA. Occupancy remained at 79% globally, with EMEA at 83%.",
    layer: "cross-layer",
    importance: "high",
    importance_rationale:
      "Bellwether DC REIT raising capex significantly — confirms sector-wide demand acceleration.",
    region: "Global",
    date: "2026-02-08",
    source_url: "#",
    source_name: "Equinix IR",
    tags: ["earnings", "equinix", "reit", "capex", "hyperscaler-demand"],
    companies: ["Equinix"],
    full_data: {
      period: "Q4 2025",
      key_metrics: {
        revenue: "$2.3B (+12% YoY)",
        ebitda: "$1.12B (48.7% margin)",
        ffo_affo: "AFFO/share: $9.45 (+8% YoY)",
        capex: "$4.2B guidance (raised from $3.8B)",
        utilization_occupancy: "79% global, 83% EMEA",
        bookings_leasing: "$185M in new leasing (record quarter)",
        backlog: "$1.4B signed-not-commenced",
        net_debt_leverage: "5.1x Net Debt/EBITDA",
      },
      guidance_update:
        "Raised 2026 revenue guidance to $9.4-9.6B (from $9.1-9.3B). Capex raised to $4.2B.",
      capex_commentary:
        "Management indicated 60% of incremental capex is allocated to EMEA, with new campuses in Stockholm, Madrid, and Warsaw.",
      demand_signals:
        "Hyperscaler bookings up 35% YoY. Enterprise demand stable. AI-related demand now represents 25% of new bookings.",
      geographic_color:
        "EMEA strongest region — Stockholm, Frankfurt, and London leading. US secondary markets (Dallas, Phoenix) accelerating. Asia-Pacific steady with Singapore reopening providing tailwind.",
    },
  },
  {
    id: "9",
    type: "news_summary",
    headline: "Crusoe Energy secures $600M Series D to expand AI-optimized DC fleet",
    summary:
      "Crusoe Energy Systems has closed a $600M Series D funding round led by Fidelity and Valor Equity Partners. The company plans to deploy capital toward expanding its fleet of AI-optimized data centers powered by stranded natural gas and renewable energy.",
    layer: "infrastructure",
    importance: "medium",
    importance_rationale:
      "Validates the energy-first DC model and AI-optimized design approach — Crusoe is a key player to watch in the design-sovereign segment.",
    region: "United States",
    date: "2026-02-07",
    source_url: "#",
    source_name: "TechCrunch",
    tags: ["funding", "crusoe", "ai", "energy", "series-d"],
    companies: ["Crusoe Energy Systems"],
    full_data: {},
  },
  {
    id: "10",
    type: "power_demand_signal",
    headline: "Constellation Energy signs 1GW nuclear PPA with AWS for DC campus in Pennsylvania",
    summary:
      "Constellation Energy has signed a 15-year power purchase agreement with Amazon Web Services for 1GW of nuclear-sourced power from its Susquehanna facility. The PPA will support AWS's planned 1.2GW data center campus near Berwick, Pennsylvania.",
    layer: "energy",
    importance: "high",
    importance_rationale:
      "Largest single nuclear PPA for DC use — sets pricing benchmark and validates nuclear as baseload for hyperscale.",
    region: "Pennsylvania, United States",
    date: "2026-02-06",
    source_url: "#",
    source_name: "Utility Dive",
    tags: ["nuclear", "ppa", "aws", "constellation", "energy"],
    companies: ["Constellation Energy", "Amazon/AWS"],
    full_data: {
      utility_or_grid_operator: "Constellation Energy",
      signal_type: "ppa_signing",
      requested_capacity_mw: 1000,
      dc_operator: "Amazon Web Services",
      timeline: "15-year term, delivery beginning 2027",
      utility_opportunity:
        "Validates nuclear as premium baseload for DC. At estimated pricing of $45-55/MWh, Constellation achieves significant premium to wholesale market. Sets precedent for other nuclear operators (Vistra, Talen) to pursue similar structures.",
    },
  },
  {
    id: "11",
    type: "executive_move",
    headline: "Former Fortum VP of Grid joins EcoDataCenter as COO",
    summary:
      "EcoDataCenter has hired Mats Lindqvist, formerly VP of Grid Development at Fortum, as its new Chief Operating Officer. The hire signals EcoDataCenter's focus on securing grid capacity in the Nordics as competition for power connections intensifies.",
    layer: "infrastructure",
    importance: "medium",
    importance_rationale:
      "Signals EcoDataCenter's strategic priority on grid access — the key bottleneck in Nordic DC development.",
    region: "Sweden",
    date: "2026-02-05",
    source_url: "#",
    source_name: "Data Economy",
    tags: ["executive", "ecodatacenter", "nordics", "grid"],
    companies: ["EcoDataCenter", "Fortum"],
    full_data: {
      person: "Mats Lindqvist",
      from_company: "Fortum",
      from_role: "VP of Grid Development",
      to_company: "EcoDataCenter",
      to_role: "Chief Operating Officer",
    },
  },
  {
    id: "12",
    type: "financing_event",
    headline: "Switch Inc. closes $2.1B credit facility to fund Las Vegas campus expansion",
    summary:
      "Switch Inc. has closed a $2.1 billion senior secured credit facility with a syndicate led by Goldman Sachs and Morgan Stanley. The facility includes a $1.5B term loan and $600M revolving credit facility, both maturing in 2031. Proceeds fund the company's SUPERNAP campus expansion in Las Vegas.",
    layer: "financing",
    importance: "medium",
    importance_rationale:
      "Large credit facility for a single-site operator — pricing will be watched as a benchmark for non-investment-grade DC credit.",
    region: "Las Vegas, United States",
    date: "2026-02-04",
    source_url: "#",
    source_name: "Leveraged Commentary & Data",
    tags: ["debt", "switch", "credit-facility", "las-vegas"],
    companies: ["Switch"],
    full_data: {
      event_subtype: "revolving_credit",
      amount: "$2.1B",
      currency: "USD",
      tenor_maturity: "due 2031",
      coupon_rate: "SOFR + 250bps",
      spread: "SOFR+250bps",
      rating: {
        moodys: "Ba2",
        sp: "BB",
        fitch: null,
        outlook: "stable",
      },
      use_of_proceeds: "SUPERNAP campus expansion in Las Vegas — 200MW incremental capacity.",
      lead_arrangers: ["Goldman Sachs", "Morgan Stanley"],
      credit_commentary:
        "Pricing at SOFR+250bps is ~75bps wider than investment-grade DC peers, reflecting Switch's higher leverage and single-market concentration risk. Management targets IG rating by 2028.",
      comparable_context:
        "QTS (Blackstone) priced a $1.8B TLB at SOFR+200bps in Q4 2025 — 50bps tighter, reflecting Blackstone's implicit credit support.",
    },
  },
  {
    id: "13",
    type: "regulatory_update",
    headline: "Ireland introduces DC water usage cap of 500,000 litres/day per facility",
    summary:
      "The Irish government has introduced a new regulation capping water usage for data center cooling at 500,000 litres per day per facility, effective January 2027. Facilities exceeding the cap must implement closed-loop or air-cooling systems. The regulation targets Dublin's growing water stress.",
    layer: "infrastructure",
    importance: "medium",
    importance_rationale:
      "Adds operational cost and design constraints for Dublin-area DCs — benefits operators already using air-cooling like Microsoft.",
    region: "Dublin, Ireland",
    date: "2026-02-03",
    source_url: "#",
    source_name: "Irish Times",
    tags: ["regulation", "ireland", "water", "cooling"],
    companies: ["Equinix", "Microsoft", "Digital Realty"],
    full_data: {
      jurisdiction: "Ireland",
      regulatory_body: "Department of Environment",
      action_type: "water_use_restriction",
      status: "approved",
      implications:
        "Forces operators to invest in closed-loop or air cooling. Estimated 10-15% increase in cooling capex for non-compliant facilities. Benefits Nordic operators marketing cold-climate cooling as an alternative to water-intensive approaches.",
    },
  },
  {
    id: "14",
    type: "deal_synopsis",
    headline: "Evroc secures €800M from EQT for sovereign cloud DC network in Europe",
    summary:
      "Swedish startup Evroc has closed €800M in funding from EQT Infrastructure to build a network of sovereign cloud data centers across Europe. Initial sites are planned in Sweden, Finland, and Germany. Evroc is positioning as a European alternative to US hyperscalers for sensitive government and enterprise workloads.",
    layer: "infrastructure",
    importance: "high",
    importance_rationale:
      "Major bet on European digital sovereignty — directly competes with hyperscaler public cloud offerings for government contracts.",
    region: "Europe (Sweden, Finland, Germany)",
    date: "2026-02-01",
    source_url: "#",
    source_name: "Financial Times",
    tags: ["evroc", "sovereign-cloud", "eqt", "nordics", "europe"],
    companies: ["Evroc", "EQT"],
    full_data: {
      deal_type: "investment",
      deal_value: "€800M",
      parties: [
        { name: "EQT Infrastructure", role: "investor" },
        { name: "Evroc", role: "recipient" },
      ],
      implications:
        "Validates European sovereign cloud as a distinct market segment. Evroc's Nordic-first approach leverages cheap renewable power and GDPR compliance. Competes directly with AWS GovCloud and Azure Government in the European public sector.",
      comparable_context:
        "Compares to OVHcloud's €350M IPO (2021) and Ionos's PE backing. EQT's commitment is significantly larger, reflecting higher conviction in the sovereign thesis post-US Cloud Act concerns.",
    },
  },
  {
    id: "15",
    type: "supply_chain_signal",
    headline: "Vertiv reports record $8.2B backlog, 30-week lead times on cooling units",
    summary:
      "Vertiv Holdings reported a record $8.2 billion backlog in its Q4 earnings, driven by surging DC demand. Lead times for large-scale cooling units have extended to 30 weeks. The company announced a new manufacturing facility in India to address capacity constraints.",
    layer: "supply_chain",
    importance: "medium",
    importance_rationale:
      "Record backlog and extended lead times confirm supply chain remains a bottleneck for DC build timelines globally.",
    region: "Global",
    date: "2026-01-30",
    source_url: "#",
    source_name: "Vertiv IR",
    tags: ["supply-chain", "vertiv", "cooling", "backlog"],
    companies: ["Vertiv"],
    full_data: {
      equipment_type: "cooling_system",
      signal_type: "order_backlog",
      lead_time: "30 weeks",
      region_affected: "Global",
    },
  },
  {
    id: "16",
    type: "news_summary",
    headline: "Green Mountain opens 40MW underground DC in Rennesøy, Norway",
    summary:
      "Green Mountain has opened its newest data center facility inside a former NATO ammunition storage facility on the island of Rennesøy in western Norway. The 40MW facility uses fjord water cooling and is powered entirely by Norwegian hydropower.",
    layer: "infrastructure",
    importance: "low",
    importance_rationale:
      "Niche but notable — demonstrates the Nordics' unique advantage in repurposing existing infrastructure for sustainable DC operations.",
    region: "Rennesøy, Norway",
    date: "2026-01-28",
    source_url: "#",
    source_name: "Datacenter Dynamics",
    tags: ["green-mountain", "norway", "nordics", "sustainable", "hydro"],
    companies: ["Green Mountain"],
    full_data: {},
  },
];

// Events calendar seed
export interface CalendarEvent {
  id: string;
  event_type: "conference" | "earnings" | "regulatory_deadline" | "ipo" | "bond_maturity" | "other";
  title: string;
  description: string;
  company?: string;
  location?: string;
  start_date: string;
  end_date?: string;
  url?: string;
}

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", event_type: "conference", title: "DCD>Connect Stockholm", description: "Nordic DC conference", location: "Stockholm, Sweden", start_date: "2026-03-12", end_date: "2026-03-13" },
  { id: "e2", event_type: "earnings", title: "Equinix Q1 2026 Earnings", description: "Q1 results", company: "Equinix", start_date: "2026-04-24" },
  { id: "e3", event_type: "earnings", title: "Digital Realty Q1 2026 Earnings", description: "Q1 results", company: "Digital Realty", start_date: "2026-04-28" },
  { id: "e4", event_type: "conference", title: "Datacloud Global Congress", description: "Monaco", location: "Monaco", start_date: "2026-06-02", end_date: "2026-06-04" },
  { id: "e5", event_type: "conference", title: "RE+ 2026", description: "Renewable energy + storage", location: "Anaheim, CA", start_date: "2026-09-08", end_date: "2026-09-11" },
  { id: "e6", event_type: "regulatory_deadline", title: "Amsterdam moratorium partial lift effective", description: "New DC builds up to 67MW allowed in designated zones", location: "Amsterdam", start_date: "2026-04-01" },
  { id: "e7", event_type: "bond_maturity", title: "Switch $800M Senior Notes maturity", company: "Switch", start_date: "2026-09-15", description: "7.5% Senior Notes due Sept 2026" },
  { id: "e8", event_type: "earnings", title: "NVIDIA Q1 FY2027 Earnings", description: "Q1 results", company: "NVIDIA", start_date: "2026-05-21" },
];

// Market heatmap seed
export interface MarketHeat {
  region: string;
  news_count: number;
  deal_count: number;
  total_mw: number;
  heat_score: number;
}

export const marketHeatmap: MarketHeat[] = [
  { region: "Northern Virginia", news_count: 24, deal_count: 8, total_mw: 1200, heat_score: 95 },
  { region: "Stockholm / Nordics", news_count: 18, deal_count: 5, total_mw: 900, heat_score: 88 },
  { region: "Frankfurt", news_count: 15, deal_count: 4, total_mw: 650, heat_score: 82 },
  { region: "Dallas / Texas", news_count: 14, deal_count: 6, total_mw: 800, heat_score: 80 },
  { region: "Dublin", news_count: 12, deal_count: 3, total_mw: 400, heat_score: 72 },
  { region: "London", news_count: 11, deal_count: 3, total_mw: 350, heat_score: 70 },
  { region: "Amsterdam", news_count: 10, deal_count: 2, total_mw: 200, heat_score: 65 },
  { region: "Phoenix / Arizona", news_count: 9, deal_count: 4, total_mw: 550, heat_score: 68 },
  { region: "Singapore", news_count: 8, deal_count: 2, total_mw: 180, heat_score: 55 },
  { region: "Tokyo", news_count: 7, deal_count: 3, total_mw: 400, heat_score: 60 },
];
