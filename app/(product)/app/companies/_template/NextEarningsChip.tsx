"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface CalendarEntry {
  slug: string;
  nextTradingUpdate: string | null;
}

interface CalendarResponse {
  entries: CalendarEntry[];
}

const DAY_FMT = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" });

export default function NextEarningsChip({ slug }: { slug: string }) {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/earnings-calendar")
      .then((r) => r.json() as Promise<CalendarResponse>)
      .then((data) => {
        if (cancelled) return;
        const match = data.entries.find((e) => e.slug === slug);
        setDate(match?.nextTradingUpdate ?? null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!date) return null;

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const target = new Date(date + "T00:00:00Z");
  const days = Math.round((target.getTime() - today.getTime()) / 86_400_000);
  if (days < 0) return null;

  const label = DAY_FMT.format(target);
  const suffix = days === 0 ? "today" : days === 1 ? "tomorrow" : days <= 14 ? `in ${days}d` : null;
  const urgent = days <= 3;

  return (
    <Link
      href="/app/calendar"
      title="View full trading calendar"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".4rem",
        padding: ".35rem .7rem",
        fontSize: 12,
        fontFamily: "var(--font-body)",
        color: urgent ? "var(--rust)" : "var(--text-mid)",
        background: "var(--surface)",
        border: `1px solid ${urgent ? "var(--rust)" : "var(--border)"}`,
        borderRadius: "var(--radius-pill, 999px)",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-dim)" }}>
        Next trading update
      </span>
      <span style={{ fontFamily: "var(--font-mono, ui-monospace)", fontWeight: 500 }}>{label}</span>
      {suffix && <span style={{ fontSize: 11, opacity: 0.85 }}>· {suffix}</span>}
    </Link>
  );
}
