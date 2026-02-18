"use client";

import { CalendarEvent } from "@/data/seed";
import { formatDate } from "@/lib/utils";
import { Calendar, BarChart3, Scale, Landmark, Globe } from "lucide-react";

const typeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  conference: { icon: <Globe size={14} />, color: "text-naio-cyan" },
  earnings: { icon: <BarChart3 size={14} />, color: "text-naio-orange" },
  regulatory_deadline: { icon: <Scale size={14} />, color: "text-naio-red" },
  bond_maturity: { icon: <Landmark size={14} />, color: "text-naio-purple" },
  ipo: { icon: <Landmark size={14} />, color: "text-naio-green" },
  other: { icon: <Calendar size={14} />, color: "text-naio-text-muted" },
};

export default function CalendarView({ events }: { events: CalendarEvent[] }) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );

  // Group by month
  const grouped: Record<string, CalendarEvent[]> = {};
  sorted.forEach((e) => {
    const month = new Date(e.start_date + "T00:00:00").toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(e);
  });

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([month, events]) => (
        <div key={month}>
          <h2 className="text-sm font-semibold text-naio-text-secondary uppercase tracking-wider mb-3">
            {month}
          </h2>
          <div className="space-y-2">
            {events.map((event) => {
              const cfg = typeConfig[event.event_type] || typeConfig.other;
              return (
                <div key={event.id} className="glass-card-hover p-4 flex items-start gap-4">
                  {/* Date block */}
                  <div className="w-14 text-center flex-shrink-0">
                    <p className="text-2xl font-bold text-naio-text-primary">
                      {new Date(event.start_date + "T00:00:00").getDate()}
                    </p>
                    <p className="text-[10px] text-naio-text-muted uppercase">
                      {new Date(event.start_date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cfg.color}>{cfg.icon}</span>
                      <span className="text-[10px] uppercase tracking-wider text-naio-text-dim">
                        {event.event_type.replace(/_/g, " ")}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-naio-text-primary">
                      {event.title}
                    </h3>
                    <p className="text-xs text-naio-text-muted mt-0.5">
                      {event.description}
                      {event.location && ` — ${event.location}`}
                    </p>
                    {event.end_date && event.end_date !== event.start_date && (
                      <p className="text-[10px] text-naio-text-dim mt-1">
                        {formatDate(event.start_date)} – {formatDate(event.end_date)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
