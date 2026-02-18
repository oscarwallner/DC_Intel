"use client";

import { IntelligenceItem } from "@/data/seed";
import { getLayerLabel, getTypeLabel, formatDate, importanceDot } from "@/lib/utils";
import { X, ExternalLink, Calendar, MapPin, Building2, Tag } from "lucide-react";

export default function DetailModal({
  item,
  onClose,
}: {
  item: IntelligenceItem;
  onClose: () => void;
}) {
  const fd = item.full_data;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-2xl h-full bg-naio-bg-deep border-l border-naio-border overflow-y-auto animate-slide-in">
        <div className="accent-bar" />

        {/* Header */}
        <div className="sticky top-0 bg-naio-bg-deep/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-naio-border">
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`layer-badge layer-${item.layer}`}>
                  {getLayerLabel(item.layer)}
                </span>
                <span className="text-[11px] text-naio-text-muted">
                  {getTypeLabel(item.type)}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full ${importanceDot(item.importance)}`} />
                <span className="text-[11px] text-naio-text-dim capitalize">
                  {item.importance} priority
                </span>
              </div>
              <h2 className="text-lg font-semibold text-naio-text-primary leading-snug">
                {item.headline}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-naio-bg-card text-naio-text-muted hover:text-naio-text-primary transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-xs text-naio-text-muted">
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {formatDate(item.date)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {item.region}
            </span>
            <span className="flex items-center gap-1">
              <Building2 size={12} /> {item.companies.join(", ")}
            </span>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-xs font-semibold text-naio-cyan uppercase tracking-wider mb-2">
              Summary
            </h3>
            <p className="text-sm text-naio-text-secondary leading-relaxed">
              {item.summary}
            </p>
          </div>

          {/* Importance rationale */}
          <div className="glass-card p-4">
            <h3 className="text-xs font-semibold text-naio-orange uppercase tracking-wider mb-2">
              Why This Matters
            </h3>
            <p className="text-sm text-naio-text-secondary">
              {item.importance_rationale}
            </p>
          </div>

          {/* Type-specific details */}
          {item.type === "deal_synopsis" && fd.parties && (
            <div>
              <h3 className="text-xs font-semibold text-naio-cyan uppercase tracking-wider mb-2">
                Deal Details
              </h3>
              <div className="space-y-2">
                <DetailRow label="Deal Type" value={fd.deal_type} />
                <DetailRow label="Value" value={fd.deal_value} />
                {fd.capacity_mw && <DetailRow label="Capacity" value={`${fd.capacity_mw} MW`} />}
                <div className="mt-3">
                  <p className="text-[10px] text-naio-text-muted uppercase tracking-wider mb-1">Parties</p>
                  <div className="flex flex-wrap gap-2">
                    {fd.parties.map((p: any, i: number) => (
                      <span key={i} className="px-2 py-1 rounded bg-naio-bg-card text-xs text-naio-text-secondary border border-naio-border">
                        {p.name} <span className="text-naio-text-dim">({p.role})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {item.type === "financing_event" && (
            <div>
              <h3 className="text-xs font-semibold text-naio-cyan uppercase tracking-wider mb-2">
                Terms
              </h3>
              <div className="space-y-2">
                <DetailRow label="Type" value={fd.event_subtype} />
                <DetailRow label="Amount" value={fd.amount} />
                <DetailRow label="Tenor" value={fd.tenor_maturity} />
                <DetailRow label="Coupon" value={fd.coupon_rate} />
                <DetailRow label="Spread" value={fd.spread} />
                {fd.rating && (
                  <div className="mt-3 glass-card p-3">
                    <p className="text-[10px] text-naio-text-muted uppercase tracking-wider mb-2">Credit Ratings</p>
                    <div className="flex gap-4">
                      {fd.rating.moodys && <RatingBadge agency="Moody's" rating={fd.rating.moodys} />}
                      {fd.rating.sp && <RatingBadge agency="S&P" rating={fd.rating.sp} />}
                      {fd.rating.fitch && <RatingBadge agency="Fitch" rating={fd.rating.fitch} />}
                    </div>
                    {fd.rating.outlook && (
                      <p className="text-xs text-naio-text-muted mt-2">
                        Outlook: <span className="text-naio-text-secondary capitalize">{fd.rating.outlook}</span>
                      </p>
                    )}
                  </div>
                )}
                <DetailRow label="Use of Proceeds" value={fd.use_of_proceeds} />
                {fd.lead_arrangers && (
                  <DetailRow label="Lead Arrangers" value={fd.lead_arrangers.join(", ")} />
                )}
              </div>
            </div>
          )}

          {item.type === "capex_announcement" && fd.breakdown && (
            <div>
              <h3 className="text-xs font-semibold text-naio-cyan uppercase tracking-wider mb-2">
                Capex Breakdown
              </h3>
              <div className="space-y-2">
                <DetailRow label="Total Spend" value={fd.announced_spend} />
                <DetailRow label="Time Horizon" value={fd.time_horizon} />
                <DetailRow label="Self-Build" value={fd.breakdown.self_build} />
                <DetailRow label="Colo / Leasing" value={fd.breakdown.colo_leasing} />
                <DetailRow label="Funding Source" value={fd.funding_source} />
              </div>
              {fd.colo_signal && (
                <div className="mt-3 glass-card p-3 border-l-2 border-naio-orange">
                  <p className="text-[10px] text-naio-orange uppercase tracking-wider mb-1">Colo Signal</p>
                  <p className="text-xs text-naio-text-secondary">{fd.colo_signal}</p>
                </div>
              )}
            </div>
          )}

          {item.type === "earnings_intelligence" && fd.key_metrics && (
            <div>
              <h3 className="text-xs font-semibold text-naio-cyan uppercase tracking-wider mb-2">
                Key Metrics — {fd.period}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(fd.key_metrics).map(([key, val]: [string, any]) =>
                  val ? (
                    <div key={key} className="glass-card p-3">
                      <p className="text-[10px] text-naio-text-muted uppercase">{key.replace(/_/g, " ")}</p>
                      <p className="text-sm text-naio-text-primary font-medium mt-0.5">{val}</p>
                    </div>
                  ) : null
                )}
              </div>
              {fd.demand_signals && (
                <div className="mt-3">
                  <DetailRow label="Demand Signals" value={fd.demand_signals} />
                </div>
              )}
              {fd.geographic_color && (
                <div className="mt-2">
                  <DetailRow label="Geographic Color" value={fd.geographic_color} />
                </div>
              )}
            </div>
          )}

          {item.type === "power_demand_signal" && (
            <div>
              <h3 className="text-xs font-semibold text-naio-cyan uppercase tracking-wider mb-2">
                Power Demand Details
              </h3>
              <div className="space-y-2">
                <DetailRow label="Utility / Grid" value={fd.utility_or_grid_operator} />
                <DetailRow label="Signal Type" value={fd.signal_type} />
                {fd.requested_capacity_mw && <DetailRow label="Capacity" value={`${fd.requested_capacity_mw} MW`} />}
                <DetailRow label="DC Operator" value={fd.associated_dc_operator || fd.dc_operator} />
                <DetailRow label="Timeline" value={fd.timeline} />
              </div>
              {fd.utility_opportunity && (
                <div className="mt-3 glass-card p-3 border-l-2 border-naio-green">
                  <p className="text-[10px] text-naio-green uppercase tracking-wider mb-1">Utility Opportunity</p>
                  <p className="text-xs text-naio-text-secondary">{fd.utility_opportunity}</p>
                </div>
              )}
            </div>
          )}

          {item.type === "regulatory_update" && (
            <div>
              <h3 className="text-xs font-semibold text-naio-cyan uppercase tracking-wider mb-2">
                Regulatory Details
              </h3>
              <div className="space-y-2">
                <DetailRow label="Jurisdiction" value={fd.jurisdiction} />
                <DetailRow label="Body" value={fd.regulatory_body} />
                <DetailRow label="Action" value={fd.action_type} />
                <DetailRow label="Status" value={fd.status} />
                {fd.affected_capacity_mw && <DetailRow label="Affected Capacity" value={`${fd.affected_capacity_mw} MW`} />}
              </div>
            </div>
          )}

          {/* Implications / comparable context */}
          {fd.implications && (
            <div>
              <h3 className="text-xs font-semibold text-naio-cyan uppercase tracking-wider mb-2">
                Market Implications
              </h3>
              <p className="text-sm text-naio-text-secondary leading-relaxed">
                {fd.implications}
              </p>
            </div>
          )}

          {fd.comparable_context && (
            <div className="glass-card p-4 border-l-2 border-naio-blue">
              <h3 className="text-xs font-semibold text-naio-blue-light uppercase tracking-wider mb-2">
                Comparable Context
              </h3>
              <p className="text-sm text-naio-text-secondary leading-relaxed">
                {fd.comparable_context}
              </p>
            </div>
          )}

          {fd.credit_commentary && (
            <div>
              <h3 className="text-xs font-semibold text-naio-cyan uppercase tracking-wider mb-2">
                Credit Commentary
              </h3>
              <p className="text-sm text-naio-text-secondary leading-relaxed">
                {fd.credit_commentary}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-naio-border">
            <Tag size={12} className="text-naio-text-dim" />
            {item.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-naio-bg-card text-[10px] text-naio-text-muted border border-naio-border">
                {tag}
              </span>
            ))}
          </div>

          {/* Source */}
          <div className="flex items-center gap-2 text-xs text-naio-text-dim">
            <ExternalLink size={12} />
            <span>Source: {item.source_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="text-[11px] text-naio-text-muted w-28 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-naio-text-secondary">{value}</span>
    </div>
  );
}

function RatingBadge({ agency, rating }: { agency: string; rating: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-naio-text-dim">{agency}</p>
      <p className="text-sm font-bold text-naio-text-primary">{rating}</p>
    </div>
  );
}
