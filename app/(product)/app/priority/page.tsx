"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CompanyProfile } from "@/lib/profiles/schema";
import { quadrantLabel } from "@/lib/profiles/schema";
import { useWatchlist } from "@/lib/watchlist";
import "./priority.css";

type Profile = CompanyProfile & { slug: string };

interface CalendarEntry {
  slug: string;
  company: string;
  sector?: string;
  country?: string;
  latestReportDate?: string;
  nextTradingUpdate?: string;
}

export default function PriorityPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [calendar, setCalendar] = useState<Record<string, CalendarEntry>>({});
  const [loading, setLoading] = useState(true);
  const { slugs, remove } = useWatchlist();

  useEffect(() => {
    Promise.all([
      fetch("/api/profiles").then((r) => r.json()).catch(() => []),
      fetch("/api/earnings-calendar").then((r) => r.json()).catch(() => ({ entries: [] })),
    ]).then(([profileData, calData]) => {
      setProfiles(Array.isArray(profileData) ? profileData : []);
      const cal: Record<string, CalendarEntry> = {};
      for (const e of calData?.entries ?? []) cal[e.slug] = e;
      setCalendar(cal);
      setLoading(false);
    });
  }, []);

  const items = profiles
    .filter((p) => slugs.includes(p.slug))
    .sort((a, b) => a.meta.company.localeCompare(b.meta.company));

  return (
    <div className="priority-page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Companies, filtered</div>
          <h1>Priority accounts</h1>
          <p style={{ color: "var(--color-text-mid)" }}>
            {loading
              ? "Loading…"
              : `${items.length} of ${slugs.length} priority compan${items.length === 1 ? "y" : "ies"}, sorted A-Z`}
          </p>
        </div>
        <Link className="btn btn-secondary" href="/app/companies">+ Add company</Link>
      </div>

      <div style={{ display: "flex", gap: ".5rem", marginBottom: "1.5rem" }}>
        <Link className="filter-pill" href="/app/companies" style={{ textDecoration: "none" }}>
          All companies
        </Link>
        <button className="filter-pill active" style={{ fontWeight: 600 }} type="button">
          Priority accounts ({slugs.length})
        </button>
      </div>

      {!loading && items.length === 0 && (
        <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
          <p style={{ color: "var(--color-text-mid)", marginBottom: ".75rem" }}>
            No companies on your priority watchlist yet.
          </p>
          <Link
            href="/app/companies"
            className="btn btn-primary"
            style={{ display: "inline-block" }}
          >
            Browse companies
          </Link>
        </div>
      )}

      {items.map((p) => {
        const composite = p.aiPerception.score.composite
          ?? Math.round(((p.aiPerception.score.rhetoric + Math.min(p.aiPerception.score.production, 5)) / 2) * 10) / 10;
        const q = p.meta.isAINative ? "native" : p.aiPerception.score.quadrant;
        const cal = calendar[p.slug];
        const nextEarnings = cal?.nextTradingUpdate ? formatEarnings(cal.nextTradingUpdate) : "Not scheduled";
        return (
          <div className="watchlist-row" key={p.slug}>
            <div>
              <span className="co-name">
                <Link href={`/app/companies/${p.slug}`}>{p.meta.company}</Link>
              </span>
              <div className="next-earnings">
                {quadrantLabel(q as never)} · {composite}/5 · Rhetoric {p.aiPerception.score.rhetoric} · Production {p.aiPerception.score.production}
              </div>
            </div>
            <div className="hide-mobile">
              <span className="next-earnings">Next earnings</span>
              <br />
              <strong style={{ fontFamily: "var(--font-display)" }}>{nextEarnings}</strong>
            </div>
            <div className="hide-mobile">
              <span className="next-earnings">Sector</span>
              <br />
              <strong style={{ fontFamily: "var(--font-display)" }}>{p.meta.sector}</strong>
            </div>
            <div style={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
              <Link className="btn btn-ghost btn-sm" href={`/app/companies/${p.slug}`}>
                View company card
              </Link>
              <button
                type="button"
                onClick={() => remove(p.slug)}
                title="Remove from priority watchlist"
                aria-label={`Remove ${p.meta.company} from watchlist`}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "var(--color-text-dim)",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: ".25rem .5rem",
                }}
              >
                ★
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatEarnings(isoDate: string): string {
  // Show absolute date plus "in Xd" / "Xd ago" so the row layout matches the
  // static wireframe (e.g. "29 Apr 2026 · in 6d").
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return isoDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const formatted = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  if (diffDays === 0) return `${formatted} · today`;
  if (diffDays > 0 && diffDays <= 30) return `${formatted} · in ${diffDays}d`;
  if (diffDays < 0 && diffDays >= -30) return `${formatted} · ${-diffDays}d ago`;
  return formatted;
}
