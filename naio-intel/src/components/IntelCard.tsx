"use client";

import { IntelligenceItem } from "@/data/seed";
import { getLayerLabel, getTypeLabel, relativeDate, importanceDot } from "@/lib/utils";
import {
  Newspaper, Handshake, TrendingUp, Landmark, BarChart3,
  Scale, Zap, UserCheck, Truck, FileText, ChevronRight,
} from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  news_summary: <Newspaper size={14} />,
  deal_synopsis: <Handshake size={14} />,
  capex_announcement: <TrendingUp size={14} />,
  financing_event: <Landmark size={14} />,
  earnings_intelligence: <BarChart3 size={14} />,
  regulatory_update: <Scale size={14} />,
  power_demand_signal: <Zap size={14} />,
  executive_move: <UserCheck size={14} />,
  supply_chain_signal: <Truck size={14} />,
  briefing: <FileText size={14} />,
};

export default function IntelCard({
  item,
  onClick,
}: {
  item: IntelligenceItem;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="glass-card-hover p-4 text-left w-full group"
    >
      {/* Top row: type badge + importance + date */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`layer-badge layer-${item.layer}`}>
            {getLayerLabel(item.layer)}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-naio-text-muted">
            {typeIcons[item.type]}
            {getTypeLabel(item.type)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${importanceDot(item.importance)}`} />
          <span className="text-[11px] text-naio-text-dim">
            {relativeDate(item.date)}
          </span>
        </div>
      </div>

      {/* Headline */}
      <h3 className="text-sm font-semibold text-naio-text-primary leading-snug mb-1.5 group-hover:text-naio-cyan transition-colors">
        {item.headline}
      </h3>

      {/* Summary */}
      <p className="text-xs text-naio-text-secondary leading-relaxed line-clamp-2 mb-3">
        {item.summary}
      </p>

      {/* Bottom row: companies + region + drill-down hint */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {item.companies.slice(0, 3).map((c) => (
            <span
              key={c}
              className="px-2 py-0.5 rounded bg-naio-bg-surface text-[10px] text-naio-text-secondary"
            >
              {c}
            </span>
          ))}
          {item.companies.length > 3 && (
            <span className="text-[10px] text-naio-text-dim">
              +{item.companies.length - 3}
            </span>
          )}
          <span className="text-[10px] text-naio-text-dim ml-1">{item.region}</span>
        </div>
        <ChevronRight
          size={14}
          className="text-naio-text-dim group-hover:text-naio-cyan transition-colors"
        />
      </div>
    </button>
  );
}
