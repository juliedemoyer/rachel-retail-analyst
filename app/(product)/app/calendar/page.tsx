import Link from "next/link";
import { readAllProfiles } from "@/lib/profiles/store";
import type { CompanyProfile } from "@/lib/profiles/schema";
import { EVENTS, type IndustryEvent, type EventCategory } from "@/data/events-calendar";
import "./calendar.css";

type Profile = CompanyProfile & { slug: string };

export const revalidate = 86_400;

export const metadata = {
  title: "Trading Calendar · Rachel Retail",
  description: "Upcoming earnings, trading updates and industry events across the EMEA retail watchlist.",
};

const EVENT_CATEGORY_COLOR: Record<EventCategory, string> = {
  retail: "var(--color-rust)",
  luxury: "var(--color-rust)",
  tech_ai: "var(--color-vendor-google)",
  vendor_day: "var(--color-vendor-microsoft)",
  marketing: "#7d4e87",
  policy: "#3b6ba5",
  sustainability: "var(--color-green)",
};

const EVENT_CATEGORY_LABEL: Record<EventCategory, string> = {
  retail: "Retail",
  luxury: "Luxury",
  tech_ai: "Tech / AI",
  vendor_day: "Vendor day",
  marketing: "Marketing",
  policy: "Policy",
  sustainability: "Sustainability",
};

const SECTOR_COLORS: Record<string, string> = {
  "Luxury & Beauty": "var(--color-rust)",
  Grocery: "var(--color-green)",
  "Apparel & E-commerce": "var(--color-vendor-microsoft)",
  CPG: "var(--color-vendor-google)",
  "Sports & Outdoor": "#4a7e8a",
  "Home & DIY": "#8a4e6a",
};

const DAY_FMT  = new Intl.DateTimeFormat("en-GB", { day: "2-digit" });
const MON_FMT  = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });
const LAST_FMT = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" });
const MONTH_LABEL_FMT = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });

function monthKey(iso: string) { return iso.slice(0, 7); }

function daysUntil(iso: string, today: Date) {
  return Math.round((new Date(iso + "T00:00:00Z").getTime() - today.getTime()) / 86_400_000);
}

interface Row {
  slug: string;
  company: string;
  sector: string;
  country: string;
  nextTradingUpdate: string;
  latestReportDate: string;
}

interface CalendarPageProps {
  searchParams?: Promise<{ view?: string }>;
}

export default async function CalendarPage(props: CalendarPageProps) {
  const { view: viewParam } = (await props.searchParams) ?? {};
  const view: "earnings" | "events" = viewParam === "events" ? "events" : "earnings";

  const all = (await readAllProfiles()) as Profile[];

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayIso = today.toISOString().slice(0, 10);
  const windowEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 3, 1));
  const windowEndIso = windowEnd.toISOString().slice(0, 10);

  const rows: Row[] = all
    .filter((p) => p.investorSnapshot?.reporting?.nextTradingUpdate)
    .map((p) => ({
      slug: p.slug,
      company: p.meta.company,
      sector: p.meta.sector,
      country: p.meta.hq.country,
      nextTradingUpdate: p.investorSnapshot.reporting.nextTradingUpdate as string,
      latestReportDate: p.investorSnapshot.reporting.latestReportDate,
    }))
    .filter((r) => r.nextTradingUpdate >= todayIso && r.nextTradingUpdate < windowEndIso)
    .sort((a, b) => a.nextTradingUpdate.localeCompare(b.nextTradingUpdate));

  const months: string[] = [];
  for (let i = 0; i < 3; i++) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + i, 1));
    months.push(d.toISOString().slice(0, 7));
  }
  const byMonth = new Map<string, Row[]>(months.map((m) => [m, []]));
  for (const row of rows) byMonth.get(monthKey(row.nextTradingUpdate))?.push(row);

  const upcoming14 = rows.filter((r) => daysUntil(r.nextTradingUpdate, today) <= 14).length;

  // Events: keep events from 14 days ago onward, sort, group by month.
  const eventCutoff = new Date(today.getTime() - 14 * 86_400_000).toISOString().slice(0, 10);
  const events: IndustryEvent[] = [...EVENTS]
    .filter((e) => e.startDate >= eventCutoff)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const eventMonths: string[] = [];
  for (const e of events) {
    const k = monthKey(e.startDate);
    if (!eventMonths.includes(k)) eventMonths.push(k);
  }
  const eventsByMonth = new Map<string, IndustryEvent[]>(eventMonths.map((m) => [m, []]));
  for (const e of events) eventsByMonth.get(monthKey(e.startDate))?.push(e);
  const upcomingEvents14 = events.filter((e) => {
    const d = daysUntil(e.startDate, today);
    return d >= 0 && d <= 14;
  }).length;

  return (
    <div className="cal-page">
      <div className="cal-wrap">

        {/* Header */}
        <div className="cal-eyebrow">Trading Calendar</div>
        <h1>{view === "events" ? "Industry events on deck" : "Upcoming earnings & trading updates"}</h1>
        <p className="cal-sub">
          {view === "events"
            ? "Curated list of retail, AI, vendor and policy events worth a flight or a calendar block. Hand-maintained — refreshes annually with monthly tweaks. Past events stay visible for 14 days."
            : "Rolling 3-month view across the EMEA watchlist. Dates roll off once filings publish; new dates rotate in as IR calendars confirm."}
        </p>

        {/* View tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", marginTop: "12px" }}>
          <Link
            href="/app/calendar"
            style={{
              padding: "6px 14px",
              borderRadius: "100px",
              fontFamily: "var(--font-display)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              border: `1px solid ${view === "earnings" ? "var(--color-rust)" : "var(--color-border)"}`,
              background: view === "earnings" ? "var(--color-rust)" : "var(--color-surface)",
              color: view === "earnings" ? "#fff" : "var(--color-text-mid)",
            }}
          >
            Earnings ({rows.length})
          </Link>
          <Link
            href="/app/calendar?view=events"
            style={{
              padding: "6px 14px",
              borderRadius: "100px",
              fontFamily: "var(--font-display)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              border: `1px solid ${view === "events" ? "var(--color-rust)" : "var(--color-border)"}`,
              background: view === "events" ? "var(--color-rust)" : "var(--color-surface)",
              color: view === "events" ? "#fff" : "var(--color-text-mid)",
            }}
          >
            Events ({events.length})
          </Link>
        </div>

        {/* Stats */}
        <div className="cal-stats">
          {view === "earnings" ? (
            <>
              <span><span className="s-val">{rows.length}</span> dates in window</span>
              <span><span className="s-val hot">{upcoming14}</span> in next 14 days</span>
            </>
          ) : (
            <>
              <span><span className="s-val">{events.length}</span> events tracked</span>
              <span><span className="s-val hot">{upcomingEvents14}</span> in next 14 days</span>
            </>
          )}
        </div>

        {/* Events view */}
        {view === "events" && (
          <div className="cal-months">
            {eventMonths.length === 0 && (
              <p className="cal-empty">No upcoming events tracked.</p>
            )}
            {eventMonths.map((m) => {
              const monthEvents = eventsByMonth.get(m) ?? [];
              const monthLabel = MONTH_LABEL_FMT.format(new Date(m + "-01T00:00:00Z"));
              return (
                <section key={m} className="cal-section">
                  <header className="cal-section-head">
                    <h2>{monthLabel}</h2>
                    <span className="cal-count">
                      {monthEvents.length} {monthEvents.length === 1 ? "event" : "events"}
                    </span>
                  </header>
                  {monthEvents.map((e) => {
                    const startObj = new Date(e.startDate + "T00:00:00Z");
                    const endObj = e.endDate ? new Date(e.endDate + "T00:00:00Z") : null;
                    const dayNum = DAY_FMT.format(startObj);
                    const monYr = MON_FMT.format(startObj);
                    const dateLabel = endObj
                      ? `${DAY_FMT.format(startObj)}–${DAY_FMT.format(endObj)}`
                      : dayNum;
                    const days = daysUntil(e.startDate, today);
                    const soonLabel =
                      days === 0 ? "today"
                      : days === 1 ? "tomorrow"
                      : days > 0 && days <= 14 ? `in ${days}d`
                      : days < 0 ? `${Math.abs(days)}d ago`
                      : null;
                    const soonClass = days <= 3 && days >= 0 ? "soon urgent" : days < 0 ? "soon" : "soon near";
                    const catColor = EVENT_CATEGORY_COLOR[e.category];
                    return (
                      <a
                        key={e.id}
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cal-row"
                        style={{ opacity: days < 0 ? 0.55 : 1 }}
                      >
                        <div className="cal-date">
                          <div className="d">{dateLabel}</div>
                          <div className="m">{monYr}</div>
                          {soonLabel && <div className={soonClass}>{soonLabel}</div>}
                        </div>

                        <div className="cal-co">
                          {e.name}
                          <div className="cal-last">
                            {e.city}, {e.country}
                            {e.vendors && e.vendors.length > 0 && (
                              <> &middot; Anchored by {e.vendors.slice(0, 3).join(", ")}{e.vendors.length > 3 ? "…" : ""}</>
                            )}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--color-text-mid)", marginTop: 4, lineHeight: 1.5 }}>
                            {e.whyMatters}
                          </div>
                        </div>

                        <div className="cal-ev">
                          <span
                            className="sector-chip"
                            style={{
                              background: catColor,
                              color: "#fff",
                              borderColor: catColor,
                              fontWeight: 600,
                            }}
                          >
                            {EVENT_CATEGORY_LABEL[e.category]}
                          </span>
                          <span className="country">{e.country}</span>
                        </div>
                      </a>
                    );
                  })}
                </section>
              );
            })}
          </div>
        )}

        {/* Month sections (earnings) */}
        {view === "earnings" && (
        <div className="cal-months">
          {months.map((m) => {
            const monthRows = byMonth.get(m) ?? [];
            const monthLabel = MONTH_LABEL_FMT.format(new Date(m + "-01T00:00:00Z"));

            return (
              <section key={m} className="cal-section">
                <header className="cal-section-head">
                  <h2>{monthLabel}</h2>
                  <span className="cal-count">
                    {monthRows.length} {monthRows.length === 1 ? "company" : "companies"}
                  </span>
                </header>

                {monthRows.length === 0 && (
                  <p className="cal-empty">No trading updates scheduled this month</p>
                )}

                {monthRows.map((row) => {
                  const days = daysUntil(row.nextTradingUpdate, today);
                  const dateObj = new Date(row.nextTradingUpdate + "T00:00:00Z");
                  const lastObj = new Date(row.latestReportDate + "T00:00:00Z");
                  const dayNum = DAY_FMT.format(dateObj);
                  const monYr  = MON_FMT.format(dateObj);
                  const soonLabel =
                    days === 0 ? "today"
                    : days === 1 ? "tomorrow"
                    : days <= 14 ? `in ${days}d`
                    : null;
                  const soonClass = days <= 3 ? "soon urgent" : "soon near";
                  const sectorColor = SECTOR_COLORS[row.sector] ?? "var(--color-text-mid)";

                  return (
                    <Link key={row.slug} href={`/app/companies/${row.slug}`} className="cal-row">
                      <div className="cal-date">
                        <div className="d">{dayNum}</div>
                        <div className="m">{monYr}</div>
                        {soonLabel && <div className={soonClass}>{soonLabel}</div>}
                      </div>

                      <div className="cal-co">
                        {row.company}
                        <div className="cal-last">Last reported {LAST_FMT.format(lastObj)}</div>
                      </div>

                      <div className="cal-ev">
                        <span
                          className="sector-chip"
                          style={{
                            background: sectorColor,
                            color: "#fff",
                            borderColor: sectorColor,
                            fontWeight: 600,
                          }}
                        >
                          {row.sector}
                        </span>
                        <span className="country">{row.country}</span>
                      </div>
                    </Link>
                  );
                })}
              </section>
            );
          })}
        </div>
        )}

        <p className="cal-footer">
          {view === "events"
            ? "Source: hand-curated list maintained in data/events-calendar.ts. Refreshed annually each November, with monthly tweaks."
            : "Source: per-company investorSnapshot.reporting. Refreshed daily. Cross-check with each company’s IR calendar before relying on a date."}
        </p>
      </div>
    </div>
  );
}
