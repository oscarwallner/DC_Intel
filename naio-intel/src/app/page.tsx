"use client";

import { useState, useMemo } from "react";
import { seedData, calendarEvents, marketHeatmap, IntelligenceItem, Layer } from "@/data/seed";
import Sidebar from "@/components/Sidebar";
import StatsBar from "@/components/StatsBar";
import IntelCard from "@/components/IntelCard";
import DetailModal from "@/components/DetailModal";
import CalendarView from "@/components/CalendarView";
import HeatmapView from "@/components/HeatmapView";
import FilterBar from "@/components/FilterBar";

export type Tab = "dashboard" | "news" | "infrastructure" | "chip" | "energy" | "financing" | "supply_chain" | "calendar" | "heatmap";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [selectedItem, setSelectedItem] = useState<IntelligenceItem | null>(null);
  const [importanceFilter, setImportanceFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    let items = [...seedData];

    // Tab-based layer filtering
    if (activeTab !== "dashboard" && activeTab !== "news" && activeTab !== "calendar" && activeTab !== "heatmap") {
      items = items.filter(
        (i) => i.layer === activeTab || i.layer === "cross-layer"
      );
    }

    // Importance filter
    if (importanceFilter !== "all") {
      items = items.filter((i) => i.importance === importanceFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      items = items.filter((i) => i.type === typeFilter);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.headline.toLowerCase().includes(q) ||
          i.summary.toLowerCase().includes(q) ||
          i.companies.some((c) => c.toLowerCase().includes(q)) ||
          i.region.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort by date descending
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return items;
  }, [activeTab, importanceFilter, typeFilter, searchQuery]);

  const dashboardItems = useMemo(
    () => seedData.filter((i) => i.importance === "high").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Top accent bar */}
        <div className="accent-bar" />

        {/* Header */}
        <header className="px-6 py-4 border-b border-naio-border flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-naio-text-primary">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "news" && "News Feed"}
              {activeTab === "infrastructure" && "DC Infrastructure"}
              {activeTab === "chip" && "Chip / Compute"}
              {activeTab === "energy" && "Energy"}
              {activeTab === "financing" && "Financing & Credit"}
              {activeTab === "supply_chain" && "Supply Chain"}
              {activeTab === "calendar" && "Events & Earnings Calendar"}
              {activeTab === "heatmap" && "Market Heatmap"}
            </h1>
            <p className="text-xs text-naio-text-muted mt-0.5">
              {activeTab === "dashboard"
                ? "High-priority intelligence across all layers"
                : activeTab === "calendar"
                ? "Upcoming conferences, earnings, and regulatory deadlines"
                : activeTab === "heatmap"
                ? "Activity density by geographic market"
                : `${filteredItems.length} items`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[10px] text-naio-text-dim uppercase tracking-widest">
              Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="w-2 h-2 rounded-full bg-naio-green animate-pulse" title="Pipeline active" />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && (
            <div className="p-6">
              <StatsBar items={seedData} />
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-naio-text-secondary uppercase tracking-wider mb-4">
                  High Priority
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {dashboardItems.map((item) => (
                    <IntelCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-sm font-semibold text-naio-text-secondary uppercase tracking-wider mb-4">
                  Market Activity
                </h2>
                <HeatmapView data={marketHeatmap} />
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="p-6">
              <CalendarView events={calendarEvents} />
            </div>
          )}

          {activeTab === "heatmap" && (
            <div className="p-6">
              <HeatmapView data={marketHeatmap} />
            </div>
          )}

          {activeTab !== "dashboard" && activeTab !== "calendar" && activeTab !== "heatmap" && (
            <div className="p-6">
              <FilterBar
                importanceFilter={importanceFilter}
                setImportanceFilter={setImportanceFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {filteredItems.map((item) => (
                  <IntelCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
              {filteredItems.length === 0 && (
                <div className="text-center py-20 text-naio-text-muted">
                  <p className="text-lg">No intelligence items match your filters.</p>
                  <p className="text-sm mt-2">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
