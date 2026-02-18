# NAIO Intelligence

Real-time data center market intelligence platform. Tracks the top 50 DC operators, hyperscalers, energy players, chip companies, and financial actors across five layers: Infrastructure, Chip/Compute, Energy, Financing, and Supply Chain.

## Architecture

- **Frontend**: Next.js 14 + Tailwind CSS + TypeScript
- **Database**: Supabase (PostgreSQL)
- **AI Processing**: Claude API (Anthropic) — processes raw news into structured intelligence
- **News Sources**: NewsAPI.org (free tier) + RSS feeds
- **Pipeline**: Vercel Cron Job runs daily at 06:00 UTC
- **Deployment**: Vercel (auto-deploy from GitHub)

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/naio-intel.git
cd naio-intel
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase_schema.sql`
3. Copy your project URL and keys

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — your Supabase service role key (for pipeline writes)
- `ANTHROPIC_API_KEY` — your Claude API key
- `NEWS_API_KEY` — your NewsAPI.org key (free tier: 100 req/day)

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Deploy to Vercel

1. Push to GitHub
2. Connect repo in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel will auto-detect Next.js

The pipeline cron job (`vercel.json`) runs daily at 06:00 UTC.

## Project Structure

```
src/
├── app/
│   ├── api/pipeline/    # Daily news processing pipeline
│   ├── globals.css      # NAIO design system
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main app (dashboard, tabs, filters)
├── components/
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── StatsBar.tsx     # Dashboard statistics
│   ├── IntelCard.tsx    # Intelligence item card
│   ├── DetailModal.tsx  # Drill-down detail panel
│   ├── FilterBar.tsx    # Search and filter controls
│   ├── CalendarView.tsx # Events and earnings calendar
│   └── HeatmapView.tsx # Market activity heatmap
├── data/
│   └── seed.ts          # Demo seed data
└── lib/
    ├── supabase.ts      # Supabase client
    └── utils.ts         # Helper functions
```

## Key Files

- `system_prompt_v3.md` — Claude system prompt for intelligence processing
- `supabase_schema.sql` — Complete database schema
- `vercel.json` — Cron job configuration

---

Built by NAIO (Vargas)
