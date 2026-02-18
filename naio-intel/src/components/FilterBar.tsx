"use client";

import { Search } from "lucide-react";

export default function FilterBar({
  importanceFilter,
  setImportanceFilter,
  typeFilter,
  setTypeFilter,
  searchQuery,
  setSearchQuery,
}: {
  importanceFilter: string;
  setImportanceFilter: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-naio-text-dim" />
        <input
          type="text"
          placeholder="Search companies, regions, tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-naio-bg-card border border-naio-border rounded-md text-sm text-naio-text-primary placeholder-naio-text-dim focus:outline-none focus:border-naio-cyan/50 transition-colors"
        />
      </div>

      {/* Importance */}
      <select
        value={importanceFilter}
        onChange={(e) => setImportanceFilter(e.target.value)}
        className="px-3 py-2 bg-naio-bg-card border border-naio-border rounded-md text-sm text-naio-text-secondary focus:outline-none focus:border-naio-cyan/50 appearance-none cursor-pointer"
      >
        <option value="all">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* Type */}
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="px-3 py-2 bg-naio-bg-card border border-naio-border rounded-md text-sm text-naio-text-secondary focus:outline-none focus:border-naio-cyan/50 appearance-none cursor-pointer"
      >
        <option value="all">All Types</option>
        <option value="news_summary">News</option>
        <option value="deal_synopsis">Deals</option>
        <option value="capex_announcement">Capex</option>
        <option value="financing_event">Financing</option>
        <option value="earnings_intelligence">Earnings</option>
        <option value="regulatory_update">Regulatory</option>
        <option value="power_demand_signal">Power Demand</option>
        <option value="executive_move">Executive Moves</option>
        <option value="supply_chain_signal">Supply Chain</option>
      </select>
    </div>
  );
}
