"use client";

import { Tab } from "@/app/page";
import {
  LayoutDashboard,
  Newspaper,
  Building2,
  Cpu,
  Zap,
  Landmark,
  Truck,
  CalendarDays,
  Map,
} from "lucide-react";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "news", label: "News Feed", icon: <Newspaper size={18} /> },
  { id: "infrastructure", label: "Infrastructure", icon: <Building2 size={18} /> },
  { id: "chip", label: "Chip / Compute", icon: <Cpu size={18} /> },
  { id: "energy", label: "Energy", icon: <Zap size={18} /> },
  { id: "financing", label: "Financing", icon: <Landmark size={18} /> },
  { id: "supply_chain", label: "Supply Chain", icon: <Truck size={18} /> },
  { id: "calendar", label: "Calendar", icon: <CalendarDays size={18} /> },
  { id: "heatmap", label: "Market Heat", icon: <Map size={18} /> },
];

export default function Sidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <aside className="w-56 bg-naio-bg-deep border-r border-naio-border flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-naio-border">
        <div className="flex items-center gap-2">
          <div className="h-[3px] w-5 bg-naio-cyan rounded-full" />
          <span className="text-sm font-bold tracking-[0.35em] text-naio-text-primary">
            N A I O
          </span>
        </div>
        <p className="text-[10px] text-naio-text-muted mt-1.5 tracking-wider uppercase">
          Market Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-150 ${
              activeTab === tab.id
                ? "bg-naio-bg-card text-naio-cyan border border-naio-border"
                : "text-naio-text-secondary hover:text-naio-text-primary hover:bg-naio-bg-card/50"
            }`}
          >
            <span className={activeTab === tab.id ? "text-naio-cyan" : "text-naio-text-muted"}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-naio-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-naio-green animate-pulse" />
          <span className="text-[10px] text-naio-text-muted">Pipeline active</span>
        </div>
        <p className="text-[10px] text-naio-text-dim mt-1">
          Powered by Claude API
        </p>
      </div>
    </aside>
  );
}
