"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CompanyProfile } from "@/lib/profiles/schema";
import { quadrantLabel, deriveComposite } from "@/lib/profiles/schema";
import { track } from "@/app/components/PostHogProvider";
import { useWatchlist } from "@/lib/watchlist";
import "./matrix.css";

type Profile = CompanyProfile & { slug: string };

interface MatrixChange {
  arrow: string;
  company: string;
  detail: string;
}

// ── Nuanced scoring ─────────────────────────────────────────────────────────
//
// Earlier version positioned chips purely from rhetoric (1–5) and production
// (0–10). With 50 companies and only ~25 unique (r, p) buckets, half stacked
// on top of each other. The new derivation widens the score using every
// AI-perception signal we already track per profile:
//
//   Rhetoric (x):   base rhetoric (×16) + framing/section/genAI/C-suite bumps
//   Production (y): base production (×8) + named tools / vendor partners /
//                   consumer product / quantified ROI / AI Act jurisdiction
//
// Both axes resolve to a 0–100 percentage. A small deterministic per-slug
// jitter (±2.5 pts) breaks any remaining ties so chips don't overlap.

function hash01(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  // 0..1
  return ((h >>> 0) % 10_000) / 10_000;
}

function clamp(v: number, lo = 0, hi = 100): number {
  return Math.min(hi, Math.max(lo, v));
}

function rhetoricScore(p: Profile): number {
  const ai = p.aiPerception;
  let s = (ai.score.rhetoric / 5) * 78;            // base 0..78
  if (ai.dedicatedAISection?.value) s += 6;
  if (ai.genAIMentioned?.value) {
    const m = ai.genAIMentioned.mentions ?? 1;
    s += Math.min(8, 2 + Math.log2(m + 1) * 1.6);  // up to +8 by mention volume
  }
  if (ai.aiFraming?.value === "moat") s += 6;
  else if (ai.aiFraming?.value === "efficiency") s += 3;
  if (ai.cSuiteAIPresenter?.exists) s += 4;
  if (ai.keyEarningsQuote?.text) s += 2;
  return s;
}

function productionScore(p: Profile): number {
  const ai = p.aiPerception;
  // Schema scores production on 0-5 (not 0-10). Scale base accordingly so
  // companies with production=4 land near 56 instead of 28 — without this
  // fix, every profile lands in the bottom half of the matrix and the
  // Silent Builder quadrant (low rhetoric, high production) ends up empty
  // even when the curated MD says a company belongs there.
  let s = (Math.min(5, ai.score.production) / 5) * 70;    // base 0..70
  s += Math.min(12, (ai.namedProductionTools?.length ?? 0) * 2.5);
  s += Math.min(8,  (ai.vendorPartners?.length ?? 0)       * 1.6);
  if (ai.consumerFacingAIProduct?.exists) s += 6;
  if (ai.quantifiedROI?.stated) s += 5;
  s += Math.min(4, (ai.aiAnalyticsStack?.length ?? 0) * 0.8);
  return s;
}

// Composite used for sidebar ranking (0–100 → /10 like the old 0–5 rubric)
function nuancedComposite(p: Profile): number {
  return Math.round(((rhetoricScore(p) + productionScore(p)) / 2) * 10) / 100;
}

function toXY(p: Profile): { x: number; y: number } {
  if (p.meta.isAINative) return { x: 95, y: 95 };
  // Deterministic ±2.5pt jitter per axis from slug hash
  const jx = (hash01(p.slug + ":x") - 0.5) * 5;
  const jy = (hash01(p.slug + ":y") - 0.5) * 5;
  return {
    x: clamp(rhetoricScore(p)   + jx),
    y: clamp(productionScore(p) + jy),
  };
}

const QUADRANT_LABELS = [
  { id: "narrative_led",         label: "Narrative-led",      x: "75%", y: "80%" },
  { id: "performer",      label: "AI Performer",   x: "75%", y: "20%" },
  { id: "not_visible",        label: "Not yet visible",     x: "25%", y: "80%" },
  { id: "silent_builder", label: "Silent Builder", x: "25%", y: "20%" },
];

const SECTOR_COLORS: Record<string, string> = {
  "Luxury & Beauty":      "#b34e2a",
  "Grocery":              "#5e8a56",
  "Apparel & E-commerce": "#5a4e8a",
  "CPG":                  "#8b7e4e",
  "Sports & Outdoor":     "#4a7e8a",
  "Home & DIY":           "#8a4e6a",
};

export default function MatrixPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [chipMode, setChipMode] = useState<"name" | "dot">("name");
  const [changes, setChanges] = useState<MatrixChange[]>([]);
  const router = useRouter();
  const { slugs } = useWatchlist();
  const watchlistSet = new Set(slugs);

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data) => {
        setProfiles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/matrix/changes")
      .then((r) => r.json())
      .then((data) => setChanges(Array.isArray(data) ? data : []))
      .catch(() => setChanges([]));
  }, []);

  // Names mode is the default; no auto-switch to dots (50 companies are legible at this scale).

  const filtered = activeSector
    ? profiles.filter((p) => p.meta.sector === activeSector)
    : profiles;

  const handleChipClick = useCallback((slug: string) => {
    const p = profiles.find((x) => x.slug === slug);
    track("matrix_chip_click", {
      slug,
      quadrant: p?.aiPerception.score.quadrant,
      sector: p?.meta.sector,
    });
    router.push(`/app/companies/${slug}`);
  }, [router, profiles]);

  const priorityAccounts = useMemo(() => {
    return profiles
      .filter((p) => watchlistSet.has(p.slug))
      .sort((a, b) => {
        const ac = a.aiPerception.score.composite ?? deriveComposite(a.aiPerception.score);
        const bc = b.aiPerception.score.composite ?? deriveComposite(b.aiPerception.score);
        return bc - ac;
      })
      .slice(0, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profiles, slugs.join(",")]);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-start">
      {/* Main */}
      <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="mb-6">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-text-dim)", marginBottom: "0.5rem" }}>
          <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: "currentColor", flexShrink: 0 }} />
          AI Matrix
        </div>
        <h1 className="font-display text-2xl font-semibold mb-1">AI Impression Matrix</h1>
        <p className="text-sm text-[var(--color-text-mid)]">
          Rhetoric (x-axis) vs. Production (y-axis), scored across 8 AI signals per company. Click any chip to open its profile.
        </p>
      </div>

      {/* Filter pills — by sector/category */}
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        {[
          { id: null, label: "All" },
          ...Object.keys(SECTOR_COLORS).map((s) => ({ id: s, label: s })),
        ].map(({ id, label }) => (
          <button
            key={String(id)}
            onClick={() => setActiveSector(id)}
            className={[
              "px-3 py-1 text-xs rounded-[var(--radius-pill)] border transition-colors",
              activeSector === id
                ? "bg-[var(--color-rust-dim)] border-[var(--color-rust)] text-[var(--color-rust)] font-medium"
                : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-mid)] hover:border-[var(--color-border-strong)]",
            ].join(" ")}
          >
            {label}
          </button>
        ))}

        <span className="ml-auto inline-flex items-center gap-1 border border-[var(--color-border)] rounded-[var(--radius-pill)] p-0.5 text-[10px]">
          {(["name", "dot"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setChipMode(m)}
              className={[
                "px-2 py-0.5 rounded-[var(--radius-pill)] uppercase tracking-widest",
                chipMode === m ? "bg-[var(--color-rust)] text-white" : "text-[var(--color-text-mid)]",
              ].join(" ")}
            >
              {m === "name" ? "Names" : "Dots"}
            </button>
          ))}
        </span>
      </div>

      {/* Matrix */}
      <div className="matrix-chart relative border border-[var(--color-border-strong)] bg-[var(--color-surface)] rounded-[var(--radius)] overflow-hidden" style={{ paddingBottom: "70%" }}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-text-dim)]">
            Loading...
          </div>
        ) : (
          <div className="absolute inset-0">
            {/* Quadrant backgrounds */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
              {["tl", "tr", "bl", "br"].map((q) => (
                <div key={q} className="border border-[var(--color-border)]" />
              ))}
            </div>

            {/* Axis labels */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[var(--color-text-dim)] font-medium uppercase tracking-widest pointer-events-none">
              AI Rhetoric (public claims)
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-[var(--color-text-dim)] font-medium uppercase tracking-widest rotate-[-90deg] origin-left pointer-events-none">
              AI Production (real use)
            </div>

            {/* Quadrant labels */}
            {QUADRANT_LABELS.map((q) => (
              <div
                key={q.id}
                className="absolute text-[10px] text-[var(--color-text-dim)] font-medium pointer-events-none"
                style={{ left: q.x, top: q.y, transform: "translate(-50%,-50%)" }}
              >
                {q.label}
              </div>
            ))}

            {/* Company chips */}
            {profiles.map((p) => {
              const { x, y } = toXY(p);
              const inFilter = !activeSector || filtered.includes(p);
              const isHovered = hovered === p.slug;
              const color = SECTOR_COLORS[p.meta.sector] ?? "#8a8278";
              const isNative = p.meta.isAINative;
              const isWatched = watchlistSet.has(p.slug);

              if (chipMode === "dot" && !isHovered) {
                return (
                  <button
                    key={p.slug}
                    onClick={() => handleChipClick(p.slug)}
                    onMouseEnter={() => setHovered(p.slug)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={p.meta.company}
                    className="absolute rounded-full border transition-all cursor-pointer"
                    style={{
                      left: `${x}%`,
                      top: `${100 - y}%`,
                      transform: "translate(-50%,-50%)",
                      width: isWatched ? 12 : 9,
                      height: isWatched ? 12 : 9,
                      backgroundColor: color,
                      borderColor: isWatched ? "#fff" : color,
                      opacity: inFilter ? 0.95 : 0.2,
                      boxShadow: isNative ? `0 0 0 2px ${color}` : isWatched ? "0 0 0 1.5px rgba(28,25,20,0.4)" : undefined,
                      zIndex: isHovered ? 20 : isWatched ? 5 : 1,
                    }}
                  />
                );
              }

              // Adjust transform so chips near edges stay readable inside the chart
              const tx = x < 8 ? "0%" : x > 92 ? "-100%" : "-50%";
              const ty = (100 - y) < 8 ? "0%" : (100 - y) > 92 ? "-100%" : "-50%";

              return (
                <button
                  key={p.slug}
                  onClick={() => handleChipClick(p.slug)}
                  onMouseEnter={() => setHovered(p.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className="absolute flex items-center gap-1 px-1.5 py-0.5 rounded-[var(--radius-pill)] border font-medium transition-all cursor-pointer whitespace-nowrap"
                  style={{
                    left: `${x}%`,
                    top: `${100 - y}%`,
                    transform: `translate(${tx},${ty})`,
                    fontSize: "10px",
                    opacity: inFilter ? 1 : 0.2,
                    backgroundColor: isHovered ? color : `${color}1A`,
                    borderColor: color,
                    color: isHovered ? "white" : color,
                    zIndex: isHovered ? 20 : isWatched ? 5 : 1,
                    boxShadow: isNative ? `0 0 0 2px ${color}` : undefined,
                  }}
                >
                  {(isNative || isWatched) && (
                    <span className="w-1 h-1 rounded-full bg-current" />
                  )}
                  {p.meta.company}
                </button>
              );
            })}

            {/* Tooltip */}
            {hovered && (() => {
              const p = profiles.find((x) => x.slug === hovered);
              if (!p) return null;
              const { x, y } = toXY(p);
              const composite = nuancedComposite(p);
              return (
                <div
                  className="absolute z-30 bg-[var(--color-surface)] border border-[var(--color-border-strong)] rounded-[var(--radius)] px-3 py-2 pointer-events-none shadow-[var(--shadow-float)] min-w-[180px]"
                  style={{
                    left: `${x}%`,
                    top: `${100 - y}%`,
                    transform: x > 70 ? "translate(-110%,-110%)" : "translate(10%,-110%)",
                  }}
                >
                  <p className="font-display text-xs font-semibold">{p.meta.company}</p>
                  <p className="text-[11px] text-[var(--color-text-dim)] mt-0.5">{p.meta.sector}</p>
                  <p className="text-[11px] mt-1">
                    <span className="text-[var(--color-text-mid)]">Rhetoric:</span>{" "}
                    <span className="font-mono">{p.aiPerception.score.rhetoric}/5</span>
                    {"  "}
                    <span className="text-[var(--color-text-mid)]">Production:</span>{" "}
                    <span className="font-mono">{p.aiPerception.score.production}/10</span>
                  </p>
                  <p className="text-[11px] mt-0.5 text-[var(--color-text-dim)]">
                    {quadrantLabel(p.aiPerception.score.quadrant)} · composite {composite.toFixed(1)}
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
        {Object.entries(SECTOR_COLORS).map(([sector, color]) => (
          <div key={sector} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[11px] text-[var(--color-text-dim)]">{sector}</span>
          </div>
        ))}
        <span className="ml-auto text-[11px] text-[var(--color-text-dim)]">
          {profiles.length} companies · ★ = on your watchlist
        </span>
      </div>

      {/* Score explanation */}
      <div className="mt-3 px-1 text-[11px] text-[var(--color-text-dim)] leading-relaxed border-t border-[var(--color-border)] pt-3">
        <span className="font-display font-medium text-[var(--color-text-mid)]">How scores are calculated: </span>
        <span className="font-display font-medium" style={{ color: "var(--color-text)" }}>Rhetoric (x-axis)</span> draws on 5 signals: stated rhetoric score, AI framing (moat / strategic / efficiency), GenAI mentions, dedicated AI section, and C-suite AI presenter.{" "}
        <span className="font-display font-medium" style={{ color: "var(--color-text)" }}>Production (y-axis)</span> draws on 5 signals: production score, named tools in deployment, vendor partnerships, consumer-facing AI product, and quantified ROI. Both axes are scaled 0-100 with a small per-company deterministic offset to reduce overlap.
      </div>
      </div>{/* end main */}

      {/* Sidebar */}
      <aside className="w-56 shrink-0 hidden lg:block">
        {/* Changes — only rendered when data exists in Redis */}
        {changes.length > 0 && (
          <>
            <h4 className="font-display text-[11px] uppercase tracking-widest text-[var(--color-text-dim)] mb-2">
              Changes since your last visit
            </h4>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-3 mb-5">
              <ul className="space-y-2">
                {changes.map((c, i) => (
                  <li key={i} className="text-xs flex gap-1.5 items-start">
                    <span className="text-[var(--color-rust)] font-bold shrink-0">{c.arrow}</span>
                    <span>
                      <strong className="text-[var(--color-text)]">{c.company}</strong>
                      <span className="text-[var(--color-text-mid)]">: {c.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <h4 className="font-display text-[11px] uppercase tracking-widest text-[var(--color-text-dim)] mb-2">
          Priority accounts ({priorityAccounts.length})
        </h4>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] overflow-hidden">
          {priorityAccounts.length === 0 ? (
            <p className="px-3 py-3 text-[11px] text-[var(--color-text-dim)]">
              No priority accounts yet. Add companies from their profile pages.
            </p>
          ) : (
            priorityAccounts.map((p) => {
              const composite = p.aiPerception.score.composite ?? deriveComposite(p.aiPerception.score);
              const q = p.meta.isAINative ? "AI Native" : quadrantLabel(p.aiPerception.score.quadrant);
              return (
                <Link
                  key={p.slug}
                  href={`/app/companies/${p.slug}`}
                  className="block px-3 py-2.5 border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-2)] transition-colors"
                >
                  <span className="font-display text-sm font-semibold block">{p.meta.company}</span>
                  <span className="font-display text-[10px] uppercase tracking-widest text-[var(--color-text-mid)]">
                    {q} · {composite}
                  </span>
                </Link>
              );
            })
          )}
          <Link
            href="/app/priority"
            className="block px-3 py-2 text-[11px] font-display uppercase tracking-widest text-[var(--color-rust)] hover:bg-[var(--color-surface-2)] transition-colors"
          >
            View / edit all priority accounts →
          </Link>
        </div>
      </aside>
    </div>
  );
}
