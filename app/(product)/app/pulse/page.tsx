"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import demoData from "@/config/demo-companies.json";

interface PulseItem {
  id?: string;
  headline: string;
  summary?: string;
  source?: string;
  url?: string;
  category?: string;
  ts?: string;
  date?: string;
  relevance?: string;
  drop_in_meeting?: string;
  topic_id?: string;
  priority?: "HIGH" | "MED" | "LOW";
  /** "rumour" tags an item as unverified human-channel intel. Renders a
   *  red Rumour pill on the card and (per the rumours-channel design on
   *  /app/sources) is excluded from Smart Topic source counts. */
  evidence_tier?: "confirmed" | "rumour";
  /** Insider type for rumour-tier items: "insider" | "ex-employee" |
   *  "vendor" | "consultant". Source is obscured to protect identity; only
   *  the type and confidence band are surfaced. */
  rumour_source_type?: string;
  /** 1 = single source, 2 = two corroborating, 3 = ready to promote */
  rumour_confidence?: 1 | 2 | 3;
  watchlist?: string;
  vendor?: string;
  surfaced_via?: string[];
  company_slug?: string;
}

// Topic id → title map. Keep in sync with topics page STATIC_TOPICS so the
// "Part of:" link on a Pulse card can resolve to a readable topic name. If a
// topic is loaded only from Redis, the link still works — we just show the id.
const TOPIC_TITLES: Record<string, string> = {
  "narrative-production-gap": "The gap between AI narrative and shipped production is widening",
  "silent-builders": "Silent builders: confirmed production with no board narrative",
};

// Static fallback items shown when Redis has no data. Drawn from the same
// fictional demo dataset as ?demo=1 (config/demo-companies.json) so an empty
// instance never renders stale editorial commentary about real companies.
const STATIC_ITEMS: PulseItem[] = demoData.pulse.map((d, i) => {
  const ts = new Date(Date.now() - d.ageHours * 3600e3).toISOString();
  return {
    id: `demo-pulse-${i}`,
    headline: d.headline,
    summary: d.soWhat,
    category: d.category,
    ts,
    date: ts.slice(0, 10),
    priority: i === 0 ? "HIGH" : "MED",
    source: d.source,
    watchlist: d.relevantAccounts?.[0],
    company_slug: d.relevantAccounts?.[0],
  } satisfies PulseItem;
});

const CATEGORIES = [
  { id: "all",            label: "All" },
  { id: "ai_retail",     label: "AI in retail" },
  { id: "ai_models",     label: "Model releases" },
  { id: "transformation",label: "Transformation" },
  { id: "regulation",    label: "Regulation" },
  { id: "macro",         label: "Macro" },
  { id: "disruption",    label: "Disruption" },
  { id: "jargon",        label: "Jargon watch" },
];

const VENDORS = ["All", "Microsoft", "Google", "Anthropic", "OpenAI", "AWS", "Salesforce"];

const CATEGORY_COLORS: Record<string, string> = {
  ai_retail:      "text-[var(--color-rust)]",
  ai_models:      "text-[var(--color-vendor-microsoft,#0078d4)]",
  transformation: "text-[var(--color-green)]",
  regulation:     "text-[var(--color-text-mid)]",
  macro:          "text-[var(--color-text-dim)]",
  disruption:     "text-[var(--color-rust-deep,var(--color-rust))]",
  jargon:         "text-[var(--color-text-dim)]",
};

// Solid colour pills per design-system rules: rust for retail × AI signals,
// blue for model/vendor releases, green for transformation, neutral for
// regulation / macro / jargon. Background is the tinted hex; foreground white
// or dark depending on tint.
function categoryPillBg(c?: string): string {
  switch (c) {
    case "ai_retail":      return "var(--color-rust)";
    case "ai_models":      return "#3b6ba5";
    case "transformation": return "#2d6a4f";
    case "regulation":     return "var(--color-surface-2)";
    case "disruption":     return "#7d2e1a";
    case "macro":          return "var(--color-surface-2)";
    case "jargon":         return "var(--color-surface-2)";
    default:               return "var(--color-rust)";
  }
}
function categoryPillFg(c?: string): string {
  switch (c) {
    case "regulation":
    case "macro":
    case "jargon":
      return "var(--color-text-mid)";
    default:
      return "#fff";
  }
}

function categoryLabel(id?: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id ?? "";
}

function PriorityBadge({ priority }: { priority?: string }) {
  if (!priority) return null;
  const styles: Record<string, string> = {
    HIGH: "bg-[#d44b2d] text-white",
    MED:  "bg-[#d4a44b] text-[#1C1914]",
    LOW:  "bg-[var(--color-border)] text-[var(--color-text-mid)]",
  };
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${styles[priority] ?? styles.LOW}`}>
      {priority}
    </span>
  );
}

function RumourBadge({ tier, confidence }: { tier?: string; confidence?: number }) {
  if (tier !== "rumour") return null;
  return (
    <span
      title={
        confidence
          ? `Rumour, confidence ${confidence}/3. Promotes to Estimated when corroborated by a public source or a 2nd independent channel.`
          : "Rumour — see /app/sources for how this channel works"
      }
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontFamily: "var(--font-display)",
        fontSize: "9px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontWeight: 700,
        padding: "3px 7px",
        borderRadius: "100px",
        background: "#7d2e1a",
        color: "#fff",
        border: "1px solid #7d2e1a",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
      Rumour{confidence ? ` · ${confidence}/3` : ""}
    </span>
  );
}

function formatDate(ts?: string) {
  if (!ts) return "";
  const d = new Date(ts);
  if (isNaN(d.getTime())) return ts;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatTime(ts?: string) {
  if (!ts) return "";
  // If the input is a date-only string (no time component), don't fabricate
  // a time of day. Items written by the RSS poller carry full ISO ts; items
  // written by the agent carry plain "YYYY-MM-DD".
  if (/^\d{4}-\d{2}-\d{2}$/.test(ts)) return "";
  const d = new Date(ts);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function pulseTs(item: PulseItem): string | undefined {
  return item.ts ?? item.date;
}

function matchesVendor(item: PulseItem, vendor: string) {
  if (vendor === "All") return true;
  const haystack = `${item.vendor ?? ""} ${item.surfaced_via?.join(" ") ?? ""} ${item.headline} ${item.summary ?? ""}`.toLowerCase();
  return haystack.includes(vendor.toLowerCase());
}

const REFRESH_QUIPS = [
  "Scanning 14 industry feeds so you don't have to...",
  "Checking if LVMH said anything interesting this week...",
  "Reading Retail Brew. Still no L'Oréal admission of AI dependency.",
  "Filtering out the noise. (There is so much noise.)",
  "Cross-referencing headlines against the watchlist...",
  "Asking Claude Haiku to sanity-check these signals...",
  "Deduplicating. Because you don't need to read it twice.",
  "Checking Modern Retail for anything Zalando-shaped...",
  "Scanning BoF. Still no luxury AI mea culpa.",
  "Running grounded refresh pass. This is the slow bit.",
  "Almost there. Ranking items by relevance...",
  "Pruning anything older than 96 hours...",
];

interface RefreshResult {
  added: number;
  rssFeeds?: number;
  error?: string;
}

function RefreshModal({
  onDone,
  result,
}: {
  onDone: () => void;
  result: RefreshResult | null;
}) {
  const [elapsed, setElapsed] = useState(0);
  const [quipIdx, setQuipIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ESTIMATED_DURATION = 52; // seconds

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed((e) => Math.min(e + 1, ESTIMATED_DURATION));
    }, 1000);
    const quipTimer = setInterval(() => {
      setQuipIdx((i) => (i + 1) % REFRESH_QUIPS.length);
    }, 3200);
    return () => {
      clearInterval(timerRef.current!);
      clearInterval(quipTimer);
    };
  }, []);

  useEffect(() => {
    if (result !== null) {
      setElapsed(ESTIMATED_DURATION);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [result]);

  const progress = Math.round((elapsed / ESTIMATED_DURATION) * 100);
  const remaining = Math.max(0, ESTIMATED_DURATION - elapsed);
  const isDone = result !== null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "16px",
          padding: "36px 40px",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-rust)",
              marginBottom: "8px",
            }}
          >
            {isDone ? "Refresh complete" : "Refreshing feed"}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--color-text)",
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {isDone
              ? result?.error
                ? "Something went wrong."
                : `${result?.added ?? 0} new item${result?.added === 1 ? "" : "s"} added.`
              : "Rachel is on it."}
          </h2>
          {!isDone && (
            <p
              style={{
                fontSize: "13px",
                color: "var(--color-text-mid)",
                marginTop: "6px",
                marginBottom: 0,
              }}
            >
              Polling RSS feeds, running grounded refresh. ~{remaining}s left.
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: "4px",
            background: "var(--color-border)",
            borderRadius: "100px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: isDone
                ? result?.error
                  ? "#d44b2d"
                  : "var(--color-rust)"
                : "var(--color-rust)",
              borderRadius: "100px",
              transition: "width 0.9s linear",
            }}
          />
        </div>

        {/* Status message */}
        {!isDone ? (
          <div
            style={{
              background: "var(--color-surface-2)",
              borderRadius: "10px",
              padding: "14px 18px",
              minHeight: "52px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "var(--color-text-mid)",
                margin: 0,
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              &ldquo;{REFRESH_QUIPS[quipIdx]}&rdquo;
            </p>
          </div>
        ) : (
          <div
            style={{
              background: "var(--color-surface-2)",
              borderRadius: "10px",
              padding: "14px 18px",
            }}
          >
            {result?.error ? (
              <p style={{ fontSize: "12px", color: "#d44b2d", margin: 0, fontFamily: "var(--font-mono)" }}>
                {result.error.slice(0, 160)}
              </p>
            ) : (
              <p style={{ fontSize: "13px", color: "var(--color-text-mid)", margin: 0 }}>
                {(result?.added ?? 0) > 0
                  ? `Feed is current. Check the list above for the latest items.`
                  : `No new items found. Feeds may be up to date, or all candidates were filtered as stale (older than 7 days).`}
              </p>
            )}
          </div>
        )}

        {/* Close button — only when done */}
        {isDone && (
          <button
            onClick={onDone}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              background: "var(--color-rust)",
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              fontFamily: "var(--font-display)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default function PulsePage() {
  const [items, setItems] = useState<PulseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshResult, setRefreshResult] = useState<RefreshResult | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeVendor, setActiveVendor] = useState("All");
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "owner";

  function loadItems() {
    return fetch("/api/pulse/items")
      .then((r) => r.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : (data.items ?? []);
        if (arr.length > 0) {
          setItems(arr);
          setUsingFallback(false);
        } else {
          setItems(STATIC_ITEMS);
          setUsingFallback(true);
        }
      })
      .catch(() => { setItems(STATIC_ITEMS); setUsingFallback(true); });
  }

  useEffect(() => {
    loadItems().finally(() => setLoading(false));
  }, []);

  async function refreshNow() {
    setRefreshing(true);
    setRefreshResult(null);
    try {
      const res = await fetch("/api/pulse/refresh", { method: "POST" });
      const json = await res.json().catch(() => ({}));
      const added =
        (json?.grounded?.added ?? 0) +
        (json?.rss?.reduce(
          (sum: number, r: { ingested?: number }) => sum + (r.ingested ?? 0),
          0
        ) ?? 0);
      setRefreshResult({
        added,
        rssFeeds: json?.rss?.length,
        error: res.ok ? undefined : (json?.error ?? "Refresh failed"),
      });
      await loadItems();
    } catch (e) {
      setRefreshResult({ added: 0, error: e instanceof Error ? e.message : "Network error" });
    } finally {
      setRefreshing(false);
    }
  }

  // Pulse only renders published events. Rumours live on /app/rumours
  // (separate surface, separate confidence rules). Defense-in-depth dedupe
  // by URL (case-insensitive) and normalised headline so a single event
  // surfaced by both the RSS poller and the agent doesn't show twice.
  // Then sort by publication date descending so the freshest item is
  // always at the top — older RSS resurfacings (e.g. the Nespresso
  // case study from June 2025) sink to the bottom.
  const seen = new Set<string>();
  const displayed = items
    .filter((item) => {
      if (item.evidence_tier === "rumour") return false;
      const catOk = activeCategory === "all" || item.category === activeCategory;
      const vendorOk = matchesVendor(item, activeVendor);
      if (!catOk || !vendorOk) return false;
      const url = (item.url ?? "").trim().toLowerCase();
      const norm = (item.headline ?? "").replace(/[^\w\s]/g, "").toLowerCase().replace(/\s+/g, " ").trim().slice(0, 80);
      const key = url || norm;
      if (key && seen.has(key)) return false;
      if (key) seen.add(key);
      return true;
    })
    .sort((a, b) => {
      const ta = new Date(a.ts ?? a.date ?? 0).getTime();
      const tb = new Date(b.ts ?? b.date ?? 0).getTime();
      return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0);
    });

  const countFor = (catId: string) =>
    catId === "all"
      ? items.length
      : items.filter((i) => i.category === catId).length;

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Refresh modal — shown while refreshing and until dismissed after completion */}
      {(refreshing || refreshResult !== null) && (
        <RefreshModal
          result={refreshResult}
          onDone={() => setRefreshResult(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-6">
        <div>
          <div className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] mb-1">Industry Pulse</div>
          <h1 className="font-display text-2xl font-semibold mb-1">Your morning news reader for EMEA retail × AI</h1>
          <p className="text-sm text-[var(--color-text)] mb-1 leading-relaxed font-medium">
            Single events. Yesterday and today. Read once and close.
          </p>
          <p className="text-sm text-[var(--color-text-mid)] max-w-[60ch] leading-relaxed">
            Earnings releases, vendor press, analyst notes, regulatory filings. For the patterns behind these events, see{" "}
            <Link href="/app/topics" className="text-[var(--color-rust)] hover:underline">Smart Topics</Link>.
          </p>
        </div>
        <div className="shrink-0 text-left sm:text-right flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-1 flex-wrap">
          <span className="text-xs text-[var(--color-text-dim)]">{items.length} items</span>
          <span className="text-[11px] text-[var(--color-text-dim)]">refreshes every 48h</span>
          {usingFallback && (
            <span className="text-[10px] uppercase tracking-widest font-display text-[var(--color-rust)]">
              Showing static fallback
            </span>
          )}
          {isAdmin && (
            <button
              onClick={refreshNow}
              disabled={refreshing}
              className="mt-1 px-3 py-1 text-[11px] font-display uppercase tracking-widest rounded-[var(--radius-pill)] border border-[var(--color-rust)] text-[var(--color-rust)] hover:bg-[var(--color-rust)] hover:text-white transition-colors disabled:opacity-50"
            >
              Refresh now
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {CATEGORIES.map((cat) => {
          const count = countFor(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={[
                "px-3 py-1 text-xs rounded-[var(--radius-pill)] border transition-colors",
                activeCategory === cat.id
                  ? "bg-[var(--color-rust-dim)] border-[var(--color-rust)] text-[var(--color-rust)] font-medium"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-mid)] hover:border-[var(--color-border-strong)]",
              ].join(" ")}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Vendor filter */}
      <div className="flex flex-wrap gap-1.5 items-center mb-6">
        <span className="text-[11px] text-[var(--color-text-dim)] font-display uppercase tracking-widest mr-1">Vendor:</span>
        {VENDORS.map((v) => (
          <button
            key={v}
            onClick={() => setActiveVendor(v)}
            className={[
              "px-2.5 py-0.5 text-[11px] rounded-[var(--radius-pill)] border transition-colors",
              activeVendor === v
                ? "bg-[var(--color-rust)] text-white border-[var(--color-rust)]"
                : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-mid)] hover:border-[var(--color-border-strong)]",
            ].join(" ")}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Items */}
      {loading ? (
        <div className="text-sm text-[var(--color-text-dim)] text-center py-12">Loading...</div>
      ) : displayed.length === 0 ? (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-8 text-center">
          <p className="text-sm text-[var(--color-text-dim)]">No pulse items match this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((item, i) => (
            <article
              key={item.id ?? i}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-5 grid gap-4 hover:border-[var(--color-border-strong)] transition-colors"
              style={{ gridTemplateColumns: "90px 1fr auto" }}
            >
              {/* Left: category pill / date / priority */}
              <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-display)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "100px",
                    background: categoryPillBg(item.category),
                    color: categoryPillFg(item.category),
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {categoryLabel(item.category)}
                </span>
                <span style={{ fontSize: "12px", color: "var(--color-text)", fontWeight: 600, textAlign: "center", fontFamily: "var(--font-mono)" }}>
                  {formatDate(pulseTs(item)) || "—"}
                </span>
                {formatTime(pulseTs(item)) && (
                  <span style={{ fontSize: "10px", color: "var(--color-text-dim)", textAlign: "center", fontFamily: "var(--font-mono)" }}>
                    {formatTime(pulseTs(item))}
                  </span>
                )}
                <PriorityBadge priority={item.priority} />
                <RumourBadge tier={item.evidence_tier} confidence={item.rumour_confidence} />
              </div>

              {/* Center: headline, summary, meta */}
              <div>
                <h3 className="font-display text-[15px] font-semibold mb-1 leading-snug">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-rust)] transition-colors">
                      {item.headline}
                    </a>
                  ) : item.headline}
                </h3>

                {item.summary && (
                  <p className="text-xs text-[var(--color-text-mid)] mb-2 leading-relaxed">{item.summary}</p>
                )}

                <div className="flex flex-wrap gap-2 items-center text-xs">
                  {item.source && (
                    <span className="px-2 py-0.5 border border-[var(--color-border)] rounded-[var(--radius-pill)] text-[var(--color-text-mid)] bg-[var(--color-surface-2)] text-[11px]">
                      {item.source}
                    </span>
                  )}
                  {item.watchlist && (
                    <span style={{ fontSize: "11px", color: "var(--color-text-mid)" }}>
                      <strong style={{ color: "var(--color-text-dim)", fontWeight: 500, fontSize: "9.5px", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "4px" }}>Watchlist</strong>
                      <span style={{ color: "var(--color-rust)", fontWeight: 600 }}>{item.watchlist}</span>
                    </span>
                  )}
                  {item.vendor && (
                    <span style={{ fontSize: "11px", color: "var(--color-text-mid)" }}>
                      <strong style={{ color: "var(--color-text-dim)", fontWeight: 500, fontSize: "9.5px", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "4px" }}>Vendor</strong>
                      {item.vendor}
                    </span>
                  )}
                </div>

                {item.drop_in_meeting && (
                  <div className="mt-2 border-l-[3px] border-[var(--color-rust)] pl-3 py-1">
                    <p className="text-[12px] italic leading-snug text-[var(--color-text-mid)]">&ldquo;{item.drop_in_meeting}&rdquo;</p>
                  </div>
                )}

                {item.relevance && !item.drop_in_meeting && (
                  <p className="text-xs text-[var(--color-sage)] mt-2 leading-relaxed">
                    <span className="font-medium">Rachel:</span> {item.relevance}
                  </p>
                )}

                {item.topic_id && (
                  <p className="text-[11px] text-[var(--color-text-dim)] mt-2">
                    Part of:{" "}
                    <Link
                      href={`/app/topics#${item.topic_id}`}
                      className="text-[var(--color-rust)] hover:underline"
                    >
                      {TOPIC_TITLES[item.topic_id] ?? item.topic_id} →
                    </Link>
                  </p>
                )}

                {item.surfaced_via && item.surfaced_via.length > 0 && (
                  <p className="text-[11px] text-[var(--color-text-dim)] mt-1.5">
                    Surfaced via: {item.surfaced_via.map((s, j) => (
                      <span key={j} className="text-[var(--color-text-mid)]">{j > 0 ? ", " : ""}{s}</span>
                    ))}
                  </p>
                )}
              </div>

              {/* Right: actions */}
              <div className="flex flex-col gap-2 shrink-0">
                {item.company_slug && (
                  <Link
                    href={`/app/companies/${item.company_slug}`}
                    className="text-[11px] px-3 py-1.5 border border-[var(--color-border)] rounded-[var(--radius)] text-[var(--color-text-mid)] hover:border-[var(--color-border-strong)] transition-colors text-center whitespace-nowrap"
                  >
                    Profile
                  </Link>
                )}
                <Link
                  href="/app/topics"
                  className="text-[11px] px-3 py-1.5 border border-[var(--color-border)] rounded-[var(--radius)] text-[var(--color-text-mid)] hover:border-[var(--color-border-strong)] transition-colors text-center whitespace-nowrap"
                >
                  Topics
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
