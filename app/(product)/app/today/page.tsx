import Link from "next/link";
import { redis } from "@/lib/redis";
import { EVENTS, type IndustryEvent } from "@/data/events-calendar";
import "./today.css";

// /app/today — single-page morning scan that replaces the "open five tabs"
// ritual. Pulls pulse items from the last 48h, watchlist earnings from
// today ±5 days, and the most-recently-updated Smart Topics. Server
// component; force-dynamic so each request hits fresh Redis.

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PulseItem {
  id?: string;
  headline: string;
  summary?: string;
  category?: string;
  ts?: string;
  date?: string;
  priority?: "HIGH" | "MED" | "LOW";
  watchlist?: string;
  vendor?: string;
  url?: string;
  drop_in_meeting?: string;
  topic_id?: string;
  company_slug?: string;
}

interface SmartTopic {
  id?: string | number;
  headline?: string;
  punchline?: string;
  title?: string;
  dropLine?: string;
  drop_in_meeting?: string;
  rank?: number;
  lastUpdated?: string;
}

interface CalendarEntry {
  slug: string;
  company: string;
  sector: string;
  last_earnings: string;
  next_earnings_date: string;
  is_tbc?: boolean;
  ir_url?: string | null;
}

async function getPulse(): Promise<PulseItem[]> {
  try {
    const type = await redis.type("rachel:pulse");
    if (type === "list") {
      const raw = await redis.lrange("rachel:pulse", 0, 49);
      return (raw ?? []).map((it) => (typeof it === "string" ? JSON.parse(it) : it)) as PulseItem[];
    }
    if (type === "string") {
      const raw = await redis.get("rachel:pulse");
      if (!raw) return [];
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      return Array.isArray(parsed) ? (parsed as PulseItem[]).slice(0, 50) : [];
    }
  } catch {
    /* fall through */
  }
  return [];
}

async function getTopics(): Promise<SmartTopic[]> {
  try {
    const raw = await redis.get("rachel:topics");
    if (!raw) return [];
    let parsed: unknown = typeof raw === "string" ? JSON.parse(raw) : raw;
    // Upstash sometimes wraps stored JSON strings in {value: "..."}
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && "value" in (parsed as object)) {
      const inner = (parsed as { value: unknown }).value;
      parsed = typeof inner === "string" ? JSON.parse(inner) : inner;
    }
    return Array.isArray(parsed) ? (parsed as SmartTopic[]) : [];
  } catch {
    return [];
  }
}

async function getCalendar(): Promise<CalendarEntry[]> {
  try {
    const raw = await redis.get("rachel:calendar");
    if (!raw) return [];
    let parsed: unknown = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const obj = parsed as Record<string, unknown>;
      if ("value" in obj) parsed = typeof obj.value === "string" ? JSON.parse(obj.value as string) : obj.value;
      if ((parsed as Record<string, unknown>).entries !== undefined) parsed = (parsed as { entries: unknown }).entries;
    }
    return Array.isArray(parsed) ? (parsed as CalendarEntry[]) : [];
  } catch {
    return [];
  }
}

function daysFromToday(dateString: string | null | undefined): number | null {
  if (!dateString) return null;
  const t = new Date(dateString).getTime();
  if (!Number.isFinite(t)) return null;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return Math.round((t - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatRelativeDate(d: number | null): string {
  if (d == null) return "—";
  if (d === 0) return "today";
  if (d === 1) return "tomorrow";
  if (d === -1) return "yesterday";
  if (d > 0) return `in ${d} days`;
  return `${Math.abs(d)} days ago`;
}

function priorityLabel(p?: string): { label: string; color: string } | null {
  if (p === "HIGH") return { label: "HIGH", color: "#d44b2d" };
  if (p === "MED") return { label: "MED", color: "#d4a44b" };
  return null;
}

function formatPulseDate(item: { ts?: string; date?: string }): string {
  const raw = item.ts ?? item.date;
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default async function TodayPage() {
  const [pulse, topics, calendarEntries] = await Promise.all([getPulse(), getTopics(), getCalendar()]);

  const itemTs = (it: PulseItem) => {
    const raw = it.ts ?? it.date;
    if (!raw) return 0;
    const t = new Date(raw).getTime();
    return Number.isFinite(t) ? t : 0;
  };

  // Pulse: last 48h. If nothing in that window, fall back to the 3 most
  // recent items so the section is never blank.
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const sorted = [...pulse].sort((a, b) => itemTs(b) - itemTs(a));
  const recent48h = sorted.filter((p) => itemTs(p) >= cutoff);
  const recentPulseItems = recent48h.length > 0 ? recent48h : sorted.slice(0, 3);
  const pulseIsFallback = recent48h.length === 0 && sorted.length > 0;

  // Earnings: last 7 days (by last_earnings) + next 7 days (by next_earnings_date).
  // Source: rachel:calendar in Redis, synced from 07_shared_sources.md §3.
  type EarningsRow = CalendarEntry & { days: number };
  const pastEarnings: EarningsRow[] = calendarEntries
    .map((e) => ({ ...e, days: daysFromToday(e.last_earnings) ?? 9999 }))
    .filter((e) => e.days >= -7 && e.days < 0);
  const upcomingEarnings: EarningsRow[] = calendarEntries
    .map((e) => ({ ...e, days: daysFromToday(e.next_earnings_date) ?? 9999 }))
    .filter((e) => e.days >= 0 && e.days <= 7);
  const earnings = [...pastEarnings, ...upcomingEarnings].sort((a, b) => a.days - b.days);

  // Industry events within next 14 days
  const upcomingEvents: (IndustryEvent & { days: number })[] = EVENTS
    .map((e) => ({ ...e, days: daysFromToday(e.startDate) ?? 9999 }))
    .filter((e) => e.days >= 0 && e.days <= 14)
    .sort((a, b) => a.days - b.days);

  // Topics updated this month, falling back to top-ranked if none this month.
  const currentMonth = new Date().toISOString().slice(0, 7);
  const topicsByRank = [...topics].sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));
  const thisMonthTopics = topicsByRank.filter((t) => t.lastUpdated?.startsWith(currentMonth));
  const freshTopics = (thisMonthTopics.length > 0 ? thisMonthTopics : topicsByRank).slice(0, 3);
  const topicsIsFallback = thisMonthTopics.length === 0 && topicsByRank.length > 0;

  const todayLabel = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="today-page" style={{ padding: "24px", maxWidth: "920px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--color-text-mid)",
            marginBottom: "10px",
          }}
        >
          Today · {todayLabel}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.25rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 8px",
            color: "var(--color-text)",
          }}
        >
          The 90-second scan.
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--color-text-mid)", margin: 0 }}>
          Everything that moved on the watchlist in the last 48 hours, the earnings on deck, and the topics shaping the conversation. Read it once, walk into the meeting.
        </p>
      </div>

      {/* Earnings last 7 days + next 7 days */}
      <section style={{ marginBottom: "32px" }}>
        <SectionHeader code="01" title="Earnings: last 7 days and next 7 days" count={earnings.length} />
        {earnings.length === 0 ? (
          <EmptyCard>No watchlist earnings in the last or next 7 days.</EmptyCard>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {earnings.map((e, i) => {
              const isPast = e.days < 0;
              const tone =
                isPast ? { color: "var(--color-text-dim)", weight: 400 } :
                e.days === 0 ? { color: "#b34e2a", weight: 700 } :
                e.days <= 3 ? { color: "#c48a2a", weight: 600 } :
                { color: "var(--color-text-mid)", weight: 500 };
              return (
                <Link
                  key={`${e.slug}-${i}`}
                  href={`/app/companies/${e.slug}`}
                  className="today-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr auto",
                    alignItems: "center",
                    gap: "16px",
                    padding: "10px 14px",
                    background: isPast ? "var(--color-surface-2)" : "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderLeft: `3px solid ${tone.color}`,
                    borderRadius: "var(--radius)",
                    textDecoration: "none",
                    color: isPast ? "var(--color-text-mid)" : "var(--color-text)",
                    opacity: isPast ? 0.8 : 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      color: tone.color,
                      fontWeight: tone.weight,
                    }}
                  >
                    {formatRelativeDate(e.days)}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: isPast ? 400 : 600 }}>
                    {e.company}
                    {isPast && (
                      <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "var(--color-text-dim)", marginLeft: "8px" }}>
                        reported
                      </span>
                    )}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-text-dim)",
                    }}
                  >
                    {e.sector}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Pulse last 48h (with fallback to most recent) */}
      <section style={{ marginBottom: "32px" }}>
        <SectionHeader
          code="02"
          title={pulseIsFallback ? "Industry Pulse · most recent" : "Last 48 hours · Industry Pulse"}
          count={recentPulseItems.length}
        />
        {pulseIsFallback && (
          <p style={{ fontSize: "11px", color: "var(--color-text-dim)", marginBottom: "10px", fontStyle: "italic" }}>
            No items in the last 48h. Showing most recent from the feed.
          </p>
        )}
        {recentPulseItems.length === 0 ? (
          <EmptyCard>No pulse items yet. Browse the full feed at <Link href="/app/pulse" style={{ color: "var(--color-rust)" }}>Industry Pulse →</Link></EmptyCard>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {recentPulseItems.slice(0, 6).map((item, i) => {
              const p = priorityLabel(item.priority);
              const dateStr = formatPulseDate(item);
              return (
                <article
                  key={item.id ?? i}
                  style={{
                    padding: "14px 16px",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                    {dateStr && (
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-text-mid)",
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: 3,
                          background: "var(--color-surface-2)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        {dateStr}
                      </span>
                    )}
                    {p && (
                      <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: p.color, color: "#fff" }}>
                        {p.label}
                      </span>
                    )}
                    {item.watchlist && (
                      <span style={{ fontSize: "11px", color: "var(--color-text-mid)" }}>
                        <strong style={{ color: "var(--color-text-dim)", fontSize: "9.5px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, marginRight: 4 }}>Watchlist</strong>
                        <span style={{ color: "var(--color-rust)", fontWeight: 600 }}>{item.watchlist}</span>
                      </span>
                    )}
                    {item.vendor && (
                      <span style={{ fontSize: "11px", color: "var(--color-text-mid)" }}>
                        <strong style={{ color: "var(--color-text-dim)", fontSize: "9.5px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, marginRight: 4 }}>Vendor</strong>
                        {item.vendor}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 600, margin: "0 0 4px", lineHeight: 1.3 }}>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text)", textDecoration: "none" }}>
                        {item.headline}
                      </a>
                    ) : (
                      item.headline
                    )}
                  </h3>
                  {item.drop_in_meeting && (
                    <p style={{ fontSize: "12.5px", fontStyle: "italic", color: "var(--color-text-mid)", borderLeft: "3px solid var(--color-rust)", paddingLeft: "10px", margin: "8px 0 0", lineHeight: 1.45 }}>
                      &ldquo;{item.drop_in_meeting}&rdquo;
                    </p>
                  )}
                </article>
              );
            })}
            {recentPulseItems.length > 6 && (
              <Link
                href="/app/pulse"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-rust)",
                  textDecoration: "none",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                See all {recentPulseItems.length} pulse items →
              </Link>
            )}
          </div>
        )}
      </section>

      {/* Industry events on deck */}
      {upcomingEvents.length > 0 && (
        <section style={{ marginBottom: "32px" }}>
          <SectionHeader code="03" title="Events on deck — next 14 days" count={upcomingEvents.length} />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {upcomingEvents.map((e) => {
              const tone =
                e.days <= 3 ? { color: "#b34e2a", weight: 700 } :
                e.days <= 7 ? { color: "#c48a2a", weight: 600 } :
                { color: "var(--color-text-mid)", weight: 500 };
              return (
                <a
                  key={e.id}
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="today-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr auto",
                    alignItems: "center",
                    gap: "16px",
                    padding: "10px 14px",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderLeft: `3px solid ${tone.color}`,
                    borderRadius: "var(--radius)",
                    textDecoration: "none",
                    color: "var(--color-text)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: tone.color, fontWeight: tone.weight }}>
                    {formatRelativeDate(e.days)}
                  </span>
                  <span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 600, display: "block" }}>{e.name}</span>
                    <span style={{ fontSize: "11px", color: "var(--color-text-mid)" }}>{e.city}, {e.country}</span>
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-dim)" }}>
                    {e.category.replace("_", " / ")}
                  </span>
                </a>
              );
            })}
            <Link
              href="/app/calendar?view=events"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-rust)",
                textDecoration: "none",
                textAlign: "center",
                padding: "8px",
              }}
            >
              All events →
            </Link>
          </div>
        </section>
      )}

      {/* Smart Topics */}
      <section style={{ marginBottom: "32px" }}>
        <SectionHeader code="03" title="Walk into the meeting with these" count={freshTopics.length} />
        {topicsIsFallback && (
          <p style={{ fontSize: "11px", color: "var(--color-text-dim)", marginBottom: "10px", fontStyle: "italic" }}>
            No topic refreshes this month yet. Showing top-ranked topics.
          </p>
        )}
        {freshTopics.length === 0 ? (
          <EmptyCard>No Smart Topics yet. Browse the full list at <Link href="/app/topics" style={{ color: "var(--color-rust)" }}>Smart Topics →</Link></EmptyCard>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {freshTopics.map((t, i) => (
              <Link
                key={t.id ?? i}
                href={`/app/topics#${String(t.id ?? "")}`}
                style={{
                  display: "block",
                  padding: "14px 16px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderLeft: "3px solid var(--color-rust)",
                  borderRadius: "var(--radius)",
                  textDecoration: "none",
                  color: "var(--color-text)",
                }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, margin: "0 0 4px", lineHeight: 1.25 }}>
                  {t.punchline ?? t.headline ?? t.title}
                </p>
                {(t.dropLine ?? t.drop_in_meeting) && (
                  <p style={{ fontSize: "12.5px", fontStyle: "italic", color: "var(--color-text-mid)", margin: 0, lineHeight: 1.45 }}>
                    &ldquo;{t.dropLine ?? t.drop_in_meeting}&rdquo;
                  </p>
                )}
              </Link>
            ))}
            <Link
              href="/app/topics"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-rust)",
                textDecoration: "none",
                textAlign: "center",
                padding: "8px",
              }}
            >
              All Smart Topics →
            </Link>
          </div>
        )}
      </section>

      {/* Quick links */}
      <section>
        <SectionHeader code="04" title="Go deeper" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "10px",
          }}
        >
          {[
            { href: "/app/financials", label: "AI Spend Capacity" },
            { href: "/app/matrix", label: "AI Matrix" },
            { href: "/app/companies", label: "Companies" },
            { href: "/app/calendar", label: "Trading calendar" },
            { href: "/app/topics", label: "Smart Topics" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "12px 14px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                textDecoration: "none",
                color: "var(--color-text)",
                fontFamily: "var(--font-display)",
                fontSize: "12px",
                letterSpacing: "0.06em",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {l.label} →
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ code, title, count }: { code: string; title: string; count?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", marginBottom: "12px" }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-rust)",
          fontWeight: 700,
        }}
      >
        § {code}
      </span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.05rem",
          fontWeight: 600,
          margin: 0,
          color: "var(--color-text)",
        }}
      >
        {title}
      </h2>
      {count != null && (
        <span style={{ fontSize: "12px", color: "var(--color-text-dim)", marginLeft: "auto", fontFamily: "var(--font-mono)" }}>
          {count}
        </span>
      )}
    </div>
  );
}

function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "16px",
        background: "var(--color-surface-2)",
        border: "1px dashed var(--color-border)",
        borderRadius: "var(--radius)",
        fontSize: "13px",
        color: "var(--color-text-mid)",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}
