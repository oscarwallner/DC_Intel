import { Layer, IntelType, Importance } from "@/data/seed";

export function getLayerLabel(layer: Layer): string {
  const labels: Record<Layer, string> = {
    infrastructure: "Infrastructure",
    chip: "Chip / Compute",
    energy: "Energy",
    financing: "Financing",
    supply_chain: "Supply Chain",
    "cross-layer": "Cross-Layer",
  };
  return labels[layer] || layer;
}

export function getTypeLabel(type: IntelType): string {
  const labels: Record<IntelType, string> = {
    news_summary: "News",
    deal_synopsis: "Deal",
    capex_announcement: "Capex",
    financing_event: "Financing",
    earnings_intelligence: "Earnings",
    regulatory_update: "Regulatory",
    power_demand_signal: "Power Demand",
    executive_move: "Executive Move",
    supply_chain_signal: "Supply Chain",
    briefing: "Briefing",
  };
  return labels[type] || type;
}

export function getTypeIcon(type: IntelType): string {
  const icons: Record<IntelType, string> = {
    news_summary: "Newspaper",
    deal_synopsis: "Handshake",
    capex_announcement: "TrendingUp",
    financing_event: "Landmark",
    earnings_intelligence: "BarChart3",
    regulatory_update: "Scale",
    power_demand_signal: "Zap",
    executive_move: "UserCheck",
    supply_chain_signal: "Truck",
    briefing: "FileText",
  };
  return icons[type] || "FileText";
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function relativeDate(dateStr: string): string {
  const now = new Date();
  const d = new Date(dateStr + "T00:00:00");
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return formatDate(dateStr);
}

export function importanceDot(importance: Importance): string {
  switch (importance) {
    case "high": return "bg-naio-red";
    case "medium": return "bg-naio-orange";
    case "low": return "bg-naio-text-muted";
  }
}
