"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deriveComposite } from "@/lib/profiles/schema";
import { track } from "@/app/components/PostHogProvider";
import type { CompanyProfile } from "@/lib/profiles/schema";

type Profile = CompanyProfile & { slug: string };

interface BubbleData {
  slug: string;
  company: string;
  sector: string;
  x: number;
  y: number;
  r: number;
  revenue: string;
  growth: string;
  margin: string;
}

const SECTOR_COLORS: Record<string, string> = {
  "Luxury & Beauty":      "#b34e2a",
  "Grocery":              "#5e8a56",
  "Apparel & E-commerce": "#5a4e8a",
  "CPG":                  "#8b7e4e",
  "Sports & Outdoor":     "#4a7e8a",
  "Home & DIY":           "#8a4e6a",
};

function fmt(n: number, sign = false) {
  return (sign && n > 0 ? "+" : "") + n + "%";
}

function initials(name: string): string {
  const words = name
    .replace(/[^A-Za-z0-9 &'-]/g, "")
    .split(/\s+/)
    .filter((w) => w && !["&", "of", "the", "and"].includes(w.toLowerCase()));
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function aiScoreColor(score: number): string {
  if (score >= 4) return "var(--color-rust)";
  if (score >= 3) return "var(--color-amber)";
  return "var(--color-text-dim)";
}

type SectorFilter = "all" | string;
type RevenueBand = "all" | "lt10" | "10to50" | "gt50";
type GrowthBand = "all" | "neg" | "0to10" | "gt10";

export default function FinancialsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  const [sectorFilter, setSectorFilter] = useState<SectorFilter>("all");
  const [revenueBand, setRevenueBand] = useState<RevenueBand>("all");
  const [growthBand, setGrowthBand] = useState<GrowthBand>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    track("financials_view");
    fetch("/api/profiles").then((r) => r.json()).then((data) => {
      setProfiles(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleBubbleClick = useCallback((slug: string) => {
    router.push(`/app/companies/${slug}`);
  }, [router]);

  const handleBubbleToggle = useCallback((slug: string) => {
    setActive((prev) => (prev === slug ? null : slug));
  }, []);

  const bubbles: BubbleData[] = profiles.map((p) => {
    const is = p.investorSnapshot;
    const x = is.revenue.yoyOrganicPct ?? is.revenue.yoyPublishedPct ?? 0;
    const y = is.operatingProfit.marginPct ?? 0;
    const r = Math.sqrt(is.revenue.absolute) * 4;
    const growthVal = is.revenue.yoyOrganicPct ?? is.revenue.yoyPublishedPct;
    return {
      slug: p.slug,
      company: p.meta.company,
      sector: p.meta.sector,
      x, y, r,
      revenue: `${is.revenue.absolute} ${is.revenue.currency}`,
      growth: growthVal != null ? fmt(growthVal, true) : "—",
      margin: y != null ? fmt(y) : "—",
    };
  }).filter((b) => b.x != null && b.y != null);

  function bubbleMatches(b: BubbleData, p?: Profile): boolean {
    if (sectorFilter !== "all" && b.sector !== sectorFilter) return false;
    if (revenueBand !== "all" && p) {
      const rev = p.investorSnapshot.revenue.absolute;
      if (revenueBand === "lt10" && rev >= 10) return false;
      if (revenueBand === "10to50" && (rev < 10 || rev > 50)) return false;
      if (revenueBand === "gt50" && rev <= 50) return false;
    }
    if (growthBand !== "all") {
      if (growthBand === "neg" && b.x >= 0) return false;
      if (growthBand === "0to10" && (b.x < 0 || b.x > 10)) return false;
      if (growthBand === "gt10" && b.x <= 10) return false;
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      if (!b.company.toLowerCase().includes(q)) return false;
    }
    return true;
  }

  const profileBySlug = new Map(profiles.map((p) => [p.slug, p]));
  const matchedSlugs = new Set(bubbles.filter((b) => bubbleMatches(b, profileBySlug.get(b.slug))).map((b) => b.slug));
  const anyFilter = sectorFilter !== "all" || revenueBand !== "all" || growthBand !== "all" || search.trim() !== "";
  const matchedCount = matchedSlugs.size;

  // Rankings: sort by revenue descending
  const ranked = [...profiles].sort((a, b) => b.investorSnapshot.revenue.absolute - a.investorSnapshot.revenue.absolute);

  const VW = 800; const VH = 440;
  const PAD = { l: 60, r: 20, t: 20, b: 40 };
  const xs = bubbles.map((b) => b.x);
  const ys = bubbles.map((b) => b.y);
  const xMin = Math.min(...xs, -5); const xMax = Math.max(...xs, 10);
  const yMin = Math.min(...ys, -5); const yMax = Math.max(...ys, 30);

  function toSVG(x: number, y: number) {
    const px = PAD.l + ((x - xMin) / (xMax - xMin)) * (VW - PAD.l - PAD.r);
    const py = PAD.t + ((yMax - y) / (yMax - yMin)) * (VH - PAD.t - PAD.b);
    return { px, py };
  }

  const activeBubble = active ? bubbles.find((b) => b.slug === active) : null;

  const thStyle: React.CSSProperties = {
    padding: "9px 14px",
    fontFamily: "var(--font-display)",
    fontSize: "0.58rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "var(--color-text-dim)",
    textAlign: "left" as const,
    borderBottom: "1px solid var(--color-border-strong)",
    background: "var(--color-surface-2)",
    whiteSpace: "nowrap" as const,
  };

  const tdStyle: React.CSSProperties = {
    padding: "9px 14px",
    fontSize: "0.85rem",
    color: "var(--color-text)",
    borderBottom: "1px solid var(--color-border)",
    verticalAlign: "middle",
    fontVariantNumeric: "tabular-nums",
  };

  return (
    <div className="fin-page" style={{ padding: "24px", maxWidth: "960px", margin: "0 auto" }}>
      <style>{`
        @media (max-width: 640px) {
          .fin-page { padding: 16px 12px 48px !important; }
          .fin-page h1 { font-size: 1.6rem !important; }
          .fin-page table { min-width: 620px; }
        }
      `}</style>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "0.66rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--color-text-mid)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "10px",
          }}
        >
          <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "currentColor" }} />
          AI Spend Capacity
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "2.25rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--color-text)",
            margin: "0 0 8px",
          }}
        >
          Two ways AI lands in retail budgets.
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--color-text-mid)", margin: "0 0 8px", lineHeight: 1.5 }}>
          Revenue growth × operating margin. Bubble size = revenue.
        </p>
        <p style={{ fontSize: "0.88rem", color: "var(--color-text-mid)", margin: 0, lineHeight: 1.55, maxWidth: "60ch" }}>
          <strong style={{ color: "var(--color-text)" }}>Top-right (growers):</strong> AI scales what already works. Personalisation, agentic commerce, ops productivity at scale.{" "}
          <strong style={{ color: "var(--color-text)" }}>Bottom-left (decliners):</strong> AI is the recovery thesis — labour deflection, automated marketing, agent-led service. Don&apos;t skip these accounts; they often have the urgency and the budget.
        </p>
      </div>

      {/* Filter chip row */}
      <FilterRow
        sectorFilter={sectorFilter} setSectorFilter={setSectorFilter}
        revenueBand={revenueBand} setRevenueBand={setRevenueBand}
        growthBand={growthBand} setGrowthBand={setGrowthBand}
        search={search} setSearch={setSearch}
        anyFilter={anyFilter} matchedCount={matchedCount} totalCount={bubbles.length}
        sectors={Object.keys(SECTOR_COLORS)}
      />

      {/* Bubble chart */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          position: "relative",
          marginBottom: "32px",
        }}
        onClick={(e) => {
          if ((e.target as SVGElement).closest("circle") == null) setActive(null);
        }}
      >
        {loading ? (
          <div style={{ height: "280px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "var(--color-text-dim)" }}>Loading...</div>
        ) : (
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            width="100%"
            style={{ display: "block" }}
            aria-label="Revenue growth vs operating margin bubble chart"
          >
            <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={VH - PAD.b} stroke="var(--color-border)" strokeWidth="1" />
            <line x1={PAD.l} y1={VH - PAD.b} x2={VW - PAD.r} y2={VH - PAD.b} stroke="var(--color-border)" strokeWidth="1" />
            {xMin < 0 && xMax > 0 && (() => {
              const { px } = toSVG(0, yMin);
              return <line x1={px} y1={PAD.t} x2={px} y2={VH - PAD.b} stroke="var(--color-border-strong)" strokeWidth="1" strokeDasharray="4,4" />;
            })()}
            <text x={PAD.l + (VW - PAD.l - PAD.r) / 2} y={VH - 6} textAnchor="middle" fill="var(--color-text-dim)" fontSize="10">Revenue growth (%)</text>
            <text x={14} y={PAD.t + (VH - PAD.t - PAD.b) / 2} textAnchor="middle" fill="var(--color-text-dim)" fontSize="10" transform={`rotate(-90, 14, ${PAD.t + (VH - PAD.t - PAD.b) / 2})`}>Operating margin (%)</text>
            {bubbles.map((b) => {
              const { px, py } = toSVG(b.x, b.y);
              const color = SECTOR_COLORS[b.sector] ?? "#8a8278";
              const isActive = active === b.slug;
              const radius = Math.max(b.r, 12);
              const initialsFontSize = Math.max(9, Math.min(16, radius * 0.55));
              const matched = matchedSlugs.has(b.slug);
              const dimmed = anyFilter && !matched;
              const fillOp = isActive ? 0.9 : dimmed ? 0.08 : 0.45;
              const strokeOp = dimmed ? 0.25 : 1;
              return (
                <g key={b.slug} opacity={dimmed ? 0.6 : 1}>
                  <circle
                    cx={px} cy={py} r={radius}
                    fill={color} fillOpacity={fillOp}
                    stroke={color} strokeWidth={isActive ? 2 : 1}
                    strokeOpacity={strokeOp}
                    style={{ cursor: "pointer", transition: "fill-opacity 0.15s, stroke-width 0.15s" }}
                    onMouseEnter={() => setActive(b.slug)}
                    onMouseLeave={() => setActive(null)}
                    onClick={(e) => { e.stopPropagation(); handleBubbleClick(b.slug); }}
                    onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); handleBubbleToggle(b.slug); }}
                    role="button"
                    aria-label={`${b.company}: revenue ${b.revenue}, growth ${b.growth}`}
                  />
                  <text
                    x={px}
                    y={py + initialsFontSize * 0.35}
                    textAnchor="middle"
                    fill="#fff"
                    fillOpacity={isActive ? 1 : dimmed ? 0.25 : 0.85}
                    fontSize={initialsFontSize}
                    fontWeight="700"
                    fontFamily="var(--font-display)"
                    letterSpacing="0.04em"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {initials(b.company)}
                  </text>
                  {isActive && (
                    <text x={px} y={py - radius - 6} textAnchor="middle" fill={color} fontSize="10" fontWeight="600" style={{ pointerEvents: "none", userSelect: "none" }}>
                      {b.company}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
        {activeBubble && (() => {
          const { px, py } = toSVG(activeBubble.x, activeBubble.y);
          const anchorRight = px / VW > 0.6;
          return (
            <div
              style={{
                position: "absolute",
                top: `calc(${(py / VH) * 100}% - 20px)`,
                ...(anchorRight
                  ? { right: `calc(${((VW - px) / VW) * 100}% + 12px)` }
                  : { left: `calc(${(px / VW) * 100}% + 12px)` }),
                background: "var(--color-surface)",
                border: "1px solid var(--color-border-strong)",
                borderRadius: "var(--radius)",
                padding: "10px 14px",
                boxShadow: "var(--shadow-float)",
                minWidth: "160px",
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.85rem", margin: "0 0 2px" }}>{activeBubble.company}</p>
              <p style={{ fontSize: "0.72rem", color: "var(--color-text-dim)", margin: "0 0 6px" }}>{activeBubble.sector}</p>
              <p style={{ fontSize: "0.78rem", margin: "2px 0" }}>Revenue: <strong>{activeBubble.revenue}</strong></p>
              <p style={{ fontSize: "0.78rem", margin: "2px 0" }}>Growth: <strong>{activeBubble.growth}</strong></p>
              <p style={{ fontSize: "0.78rem", margin: "2px 0 6px" }}>Op. margin: <strong>{activeBubble.margin}</strong></p>
              <Link href={`/app/companies/${activeBubble.slug}`} style={{ fontSize: "0.72rem", color: "var(--color-rust)" }}>
                View profile &rarr;
              </Link>
            </div>
          );
        })()}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 20px", marginBottom: "32px" }}>
        {Object.entries(SECTOR_COLORS).map(([sector, color]) => (
          <div key={sector} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.64rem", letterSpacing: "0.08em", color: "var(--color-text-dim)" }}>{sector}</span>
          </div>
        ))}
      </div>

      {/* Financial rankings table */}
      <div style={{ marginBottom: "8px" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "1.05rem",
            letterSpacing: "-0.01em",
            color: "var(--color-text)",
            margin: "0 0 14px",
          }}
        >
          Financial rankings
        </h3>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "36px", textAlign: "center" }}>#</th>
              <th style={thStyle}>Company</th>
              <th style={{ ...thStyle }}>Sector</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Revenue</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Growth YoY</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Op margin</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Employees</th>
              <th style={{ ...thStyle, textAlign: "right" }}>AI Score</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((p, i) => {
              const is = p.investorSnapshot;
              const growthRaw = is.revenue.yoyOrganicPct ?? is.revenue.yoyPublishedPct;
              const growth = growthRaw != null ? fmt(growthRaw, true) : "—";
              const margin = is.operatingProfit.marginPct != null ? fmt(is.operatingProfit.marginPct) : "—";
              const composite = p.aiPerception.score.composite ?? deriveComposite(p.aiPerception.score);
              const scoreColor = aiScoreColor(composite);
              const isPositive = growthRaw != null && growthRaw > 0;
              const isNegative = growthRaw != null && growthRaw < 0;

              return (
                <tr key={p.slug} style={{ transition: "background 0.15s" }} className="fin-row">
                  <td style={{ ...tdStyle, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-text-dim)" }}>
                    {i + 1}
                  </td>
                  <td style={{ ...tdStyle }}>
                    <Link
                      href={`/app/companies/${p.slug}`}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: "0.88rem",
                        color: "var(--color-text)",
                        textDecoration: "none",
                      }}
                    >
                      {p.meta.company}
                    </Link>
                  </td>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-display)", fontSize: "0.64rem", letterSpacing: "0.08em", color: "var(--color-text-dim)" }}>
                    {p.meta.sector}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                    {is.revenue.absolute} {is.revenue.currency}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.82rem",
                      color: isPositive ? "var(--color-sage)" : isNegative ? "var(--color-negative)" : "var(--color-text)",
                      fontWeight: growthRaw != null ? 500 : 300,
                    }}
                  >
                    {growth}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                    {margin}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
                    {is.employees.headcount.toLocaleString()}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <strong style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem", color: scoreColor }}>
                      {composite}
                    </strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style>{`.fin-row:hover { background: var(--color-surface-2) !important; }`}</style>

      <p style={{ marginTop: "12px", fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--color-text-dim)" }}>
        {profiles.length} companies · ranked by revenue · FY2025
      </p>
    </div>
  );
}

interface FilterRowProps {
  sectorFilter: SectorFilter; setSectorFilter: (s: SectorFilter) => void;
  revenueBand: RevenueBand; setRevenueBand: (b: RevenueBand) => void;
  growthBand: GrowthBand; setGrowthBand: (g: GrowthBand) => void;
  search: string; setSearch: (s: string) => void;
  anyFilter: boolean; matchedCount: number; totalCount: number;
  sectors: string[];
}

function FilterRow(props: FilterRowProps) {
  const { sectorFilter, setSectorFilter, revenueBand, setRevenueBand, growthBand, setGrowthBand, search, setSearch, anyFilter, matchedCount, totalCount, sectors } = props;
  const chipBase: React.CSSProperties = {
    fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.08em",
    textTransform: "uppercase" as const, padding: "0.32rem 0.7rem", borderRadius: "100px",
    border: "1px solid var(--color-border)", background: "var(--color-surface)",
    color: "var(--color-text-mid)", cursor: "pointer", transition: "all 0.15s",
  };
  const chipActive: React.CSSProperties = {
    ...chipBase, background: "var(--color-rust)", color: "#fff", borderColor: "var(--color-rust)",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.12em",
    textTransform: "uppercase" as const, color: "var(--color-text-dim)", marginRight: "0.45rem",
  };

  function chip(active: boolean, onClick: () => void, label: string) {
    return (
      <button type="button" onClick={onClick} style={active ? chipActive : chipBase}>
        {label}
      </button>
    );
  }

  return (
    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem 0.6rem" }}>
        <span style={labelStyle}>Sector</span>
        {chip(sectorFilter === "all", () => setSectorFilter("all"), `All`)}
        {sectors.map((s) => chip(sectorFilter === s, () => setSectorFilter(s), s))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem 0.6rem" }}>
        <span style={labelStyle}>Revenue</span>
        {chip(revenueBand === "all", () => setRevenueBand("all"), "Any")}
        {chip(revenueBand === "lt10", () => setRevenueBand("lt10"), "< €10B")}
        {chip(revenueBand === "10to50", () => setRevenueBand("10to50"), "€10–50B")}
        {chip(revenueBand === "gt50", () => setRevenueBand("gt50"), "> €50B")}
        <span style={{ ...labelStyle, marginLeft: "1rem" }}>Growth</span>
        {chip(growthBand === "all", () => setGrowthBand("all"), "Any")}
        {chip(growthBand === "neg", () => setGrowthBand("neg"), "Declining")}
        {chip(growthBand === "0to10", () => setGrowthBand("0to10"), "0–10%")}
        {chip(growthBand === "gt10", () => setGrowthBand("gt10"), "> 10%")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginTop: "4px" }}>
        <input
          type="search"
          placeholder="Search company name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 220px",
            padding: "0.5rem 0.8rem",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            background: "var(--color-surface)",
            color: "var(--color-text)",
            fontSize: "0.85rem",
            fontFamily: "var(--font-body)",
            outline: "none",
          }}
        />
        <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>
          {anyFilter ? `${matchedCount} of ${totalCount} match` : `${totalCount} companies`}
        </span>
        {anyFilter && (
          <button
            type="button"
            onClick={() => { setSectorFilter("all"); setRevenueBand("all"); setGrowthBand("all"); setSearch(""); }}
            style={{ ...chipBase, color: "var(--color-rust)", borderColor: "var(--color-rust)" }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
