"use client";

import { MarketHeat } from "@/data/seed";

export default function HeatmapView({ data }: { data: MarketHeat[] }) {
  const maxScore = Math.max(...data.map((d) => d.heat_score));

  return (
    <div className="space-y-3">
      {data
        .sort((a, b) => b.heat_score - a.heat_score)
        .map((market) => {
          const pct = (market.heat_score / maxScore) * 100;
          const intensity =
            market.heat_score >= 80
              ? "from-naio-red/40 to-naio-orange/20"
              : market.heat_score >= 60
              ? "from-naio-orange/30 to-naio-orange/10"
              : "from-naio-cyan/20 to-naio-cyan/5";

          return (
            <div key={market.region} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-naio-text-primary">
                    {market.region}
                  </h3>
                  <span
                    className={`text-xs font-bold ${
                      market.heat_score >= 80
                        ? "text-naio-red"
                        : market.heat_score >= 60
                        ? "text-naio-orange"
                        : "text-naio-cyan"
                    }`}
                  >
                    {market.heat_score}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-naio-text-muted">
                  <span>{market.news_count} news</span>
                  <span>{market.deal_count} deals</span>
                  <span>{market.total_mw.toLocaleString()} MW</span>
                </div>
              </div>
              {/* Heat bar */}
              <div className="h-1.5 rounded-full bg-naio-bg-surface overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${intensity} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
