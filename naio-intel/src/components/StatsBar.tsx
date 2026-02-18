"use client";

import { IntelligenceItem } from "@/data/seed";
import { TrendingUp, AlertTriangle, FileText, Handshake, Zap, Landmark } from "lucide-react";

export default function StatsBar({ items }: { items: IntelligenceItem[] }) {
  const highPriority = items.filter((i) => i.importance === "high").length;
  const deals = items.filter((i) => i.type === "deal_synopsis").length;
  const financing = items.filter((i) => i.type === "financing_event").length;
  const powerSignals = items.filter((i) => i.type === "power_demand_signal").length;
  const totalItems = items.length;

  const stats = [
    { label: "Total Items", value: totalItems, icon: <FileText size={16} />, color: "text-naio-cyan" },
    { label: "High Priority", value: highPriority, icon: <AlertTriangle size={16} />, color: "text-naio-red" },
    { label: "Deals", value: deals, icon: <Handshake size={16} />, color: "text-naio-blue-light" },
    { label: "Financing", value: financing, icon: <Landmark size={16} />, color: "text-naio-orange" },
    { label: "Power Signals", value: powerSignals, icon: <Zap size={16} />, color: "text-naio-green" },
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className={`${stat.color}`}>{stat.icon}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
