"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { quadrantLabel, deriveComposite } from "@/lib/profiles/schema";
import { track } from "@/app/components/PostHogProvider";
import type { CompanyProfile } from "@/lib/profiles/schema";

type Profile = CompanyProfile & { slug: string };

const QUADRANT_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  performer:      { bg: "var(--color-rust-dim)",    text: "var(--color-rust)",  border: "var(--color-rust)" },
  narrative_led:         { bg: "rgba(196,138,42,0.12)",    text: "#C48A2A",            border: "#C48A2A" },
  silent_builder: { bg: "rgba(45,106,79,0.10)",     text: "var(--color-green)", border: "var(--color-green)" },
  not_visible:        { bg: "transparent",              text: "var(--color-text-dim)", border: "var(--color-border)" },
  native:         { bg: "rgba(90,78,138,0.10)",     text: "#5a4e8a",            border: "#5a4e8a" },
};

function QuadrantPill({ q }: { q: string }) {
  const s = QUADRANT_BADGE[q] ?? QUADRANT_BADGE.not_visible;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontFamily: "var(--font-display)", fontWeight: 500,
      fontSize: "0.64rem", letterSpacing: "0.12em", textTransform: "uppercase",
      padding: "0.25rem 0.6rem", borderRadius: "var(--radius-pill)",
      background: s.bg, color: s.text, border: `1px solid ${s.border}`,
      whiteSpace: "nowrap",
    }}>
      {quadrantLabel(q as never)}
    </span>
  );
}

interface SavedComparison {
  id: string;
  name: string;
  slugs: string[];
  savedAt: string;
}

const STORAGE_KEY = "rachel:benchmark:saved";

function loadSaved(): SavedComparison[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTo(comparisons: SavedComparison[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comparisons));
}

// Detect signed-percent growth values like "+2.7%" or "-1.5%". When present,
// color positive growth green and negative growth rust (per vault
// 07_shared_design_system.md growth-coloring rule). All other diffing values keep the rust accent so the
// reader can still scan deviations from the baseline column at a glance.
function growthColor(raw: string | number | null): string | null {
  if (typeof raw !== "string") return null;
  const m = raw.trim().match(/^([+\-])(\d+(?:\.\d+)?)\s*%/);
  if (!m) return null;
  return m[1] === "+" ? "var(--color-green)" : "var(--color-rust)";
}

function DiffCell({ value, baseline, children }: { value: string | number | null; baseline: string | number | null; children: React.ReactNode }) {
  const growth = growthColor(value);
  // Only growth percentages get colour. All other values stay dark regardless of diff.
  const color = growth ?? "var(--color-text)";
  return (
    <td
      style={{
        padding: "10px 16px",
        fontSize: "0.85rem",
        color,
        fontWeight: growth ? 600 : 300,
        borderBottom: "1px solid var(--color-border)",
        verticalAlign: "top",
      }}
    >
      {children}
    </td>
  );
}

// ── Map ISO-2 country codes to flag emoji (and a few common aliases) ─────────
function flagEmoji(code: string): string {
  const c = code.trim().toUpperCase();
  // Common alias normalisation: schema stores "UK", regional indicators need GB
  const iso = c === "UK" ? "GB" : c.length === 2 ? c : "";
  if (iso.length !== 2) return "";
  return String.fromCodePoint(...iso.split("").map((ch) => 127397 + ch.charCodeAt(0)));
}

// Vendor → small dot accent (matches companies card vendor dots)
const VENDOR_ACCENTS: Record<string, string> = {
  microsoft: "#0078d4",
  azure:     "#0078d4",
  google:    "#34a853",
  gcp:       "#34a853",
  vertex:    "#34a853",
  anthropic: "#d97706",
  openai:    "#10a37f",
  aws:       "#ff9900",
};
function vendorAccent(name: string): string {
  const k = name.toLowerCase();
  for (const key of Object.keys(VENDOR_ACCENTS)) {
    if (k.includes(key)) return VENDOR_ACCENTS[key];
  }
  return "var(--color-text-dim)";
}

const PART1_ROWS: { label: string; getValue: (p: Profile) => string | number | null }[] = [
  { label: "Revenue",          getValue: (p) => `${p.investorSnapshot.revenue.absolute} ${p.investorSnapshot.revenue.currency}` },
  { label: "Revenue growth",   getValue: (p) => p.investorSnapshot.revenue.yoyOrganicPct != null ? `${p.investorSnapshot.revenue.yoyOrganicPct > 0 ? "+" : ""}${p.investorSnapshot.revenue.yoyOrganicPct}%` : p.investorSnapshot.revenue.yoyPublishedPct != null ? `${p.investorSnapshot.revenue.yoyPublishedPct > 0 ? "+" : ""}${p.investorSnapshot.revenue.yoyPublishedPct}%` : "—" },
  { label: "Operating margin", getValue: (p) => p.investorSnapshot.operatingProfit.marginPct != null ? `${p.investorSnapshot.operatingProfit.marginPct}%` : "—" },
  { label: "Operating profit", getValue: (p) => p.investorSnapshot.operatingProfit.absolute != null ? `${p.investorSnapshot.operatingProfit.absolute} ${p.investorSnapshot.revenue.currency}` : "—" },
  { label: "Net cash",         getValue: (p) => p.investorSnapshot.netCash?.absolute != null ? `${p.investorSnapshot.netCash.absolute} ${p.investorSnapshot.revenue.currency}` : "—" },
  { label: "Employees",        getValue: (p) => p.investorSnapshot.employees.headcount.toLocaleString() },
  { label: "Countries",        getValue: (p) => p.investorSnapshot.countries.count ?? "—" },
  { label: "Retail stores",    getValue: (p) => p.investorSnapshot.retailStores.total?.toLocaleString() ?? "—" },
  { label: "HQ",               getValue: (p) => {
      const flag = (() => {
        const c = p.meta.hq.country.trim().toUpperCase();
        const iso = c === "UK" ? "GB" : c.length === 2 ? c : "";
        if (iso.length !== 2) return "";
        return String.fromCodePoint(...iso.split("").map((ch) => 127397 + ch.charCodeAt(0)));
      })();
      return `${flag ? flag + " " : ""}${p.meta.hq.city}, ${p.meta.hq.country}`;
    } },
  { label: "EU AI Act scope",  getValue: (p) => p.meta.hq.aiActApplies ? "Yes" : "No" },
];

const PART2_ROWS: { label: string; getValue: (p: Profile) => string | number | null; render?: (p: Profile) => React.ReactNode }[] = [
  { label: "Composite score",     getValue: (p) => p.aiPerception.score.composite ?? deriveComposite(p.aiPerception.score) },
  { label: "Rhetoric score",      getValue: (p) => `${p.aiPerception.score.rhetoric}/5` },
  { label: "Production score",    getValue: (p) => `${p.aiPerception.score.production}/5` },
  { label: "Quadrant",            getValue: (p) => p.meta.isAINative ? "native" : p.aiPerception.score.quadrant,
                                  render: (p) => <QuadrantPill q={p.meta.isAINative ? "native" : p.aiPerception.score.quadrant} /> },
  { label: "AI framing",          getValue: (p) => p.aiPerception.aiFraming.value.replace(/_/g, " ") },
  { label: "GenAI mentioned",     getValue: (p) => p.aiPerception.genAIMentioned.value ? "Yes" : "No" },
  { label: "Quantified ROI",      getValue: (p) => p.aiPerception.quantifiedROI.stated ? (p.aiPerception.quantifiedROI.figure ?? "Yes") : "No" },
  { label: "Consumer AI product", getValue: (p) => p.aiPerception.consumerFacingAIProduct.exists ? (p.aiPerception.consumerFacingAIProduct.name ?? "Yes") : "No" },
  { label: "Named tools",         getValue: (p) => p.aiPerception.namedProductionTools.length > 0 ? p.aiPerception.namedProductionTools.map((t) => t.name).join(", ") : "None" },
  { label: "Vendor partners",     getValue: (p) => p.aiPerception.vendorPartners.length > 0 ? p.aiPerception.vendorPartners.map((v) => v.name).join(", ") : "None" },
];

function BenchmarkContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [picks, setPicks] = useState<[string, string, string]>(["", "", ""]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<SavedComparison[]>([]);
  const [saveLabel, setSaveLabel] = useState("");

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data) => setAllProfiles(Array.isArray(data) ? data : []));
    setSaved(loadSaved());
  }, []);

  const fetchBenchmark = useCallback(async (slugs: string[]) => {
    const active = slugs.filter(Boolean);
    if (active.length < 2) { setProfiles([]); return; }
    setLoading(true);
    track("benchmark_compare", { slugs: active });
    try {
      const res = await fetch(`/api/benchmark?slugs=${active.join(",")}`);
      const data = await res.json();
      setProfiles(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  // Populate pickers from URL on load; default to Tesco / Carrefour / Ocado
  useEffect(() => {
    const slugs = searchParams.get("slugs")?.split(",").filter(Boolean) ?? [];
    if (slugs.length === 0) {
      const defaults: [string, string, string] = ["tesco", "carrefour", "ocado"];
      setPicks(defaults);
      fetchBenchmark(defaults);
    } else {
      setPicks([slugs[0] ?? "", slugs[1] ?? "", slugs[2] ?? ""]);
    }
  }, [searchParams, fetchBenchmark]);

  function handleCompare() {
    const active = picks.filter(Boolean);
    router.replace(`/app/benchmark?slugs=${active.join(",")}`);
    fetchBenchmark(active);
  }

  function handleSave() {
    const active = picks.filter(Boolean);
    if (active.length < 2) return;
    const name = saveLabel.trim() || active.map((s) => allProfiles.find((p) => p.slug === s)?.meta.company ?? s).join(" vs ");
    const entry: SavedComparison = {
      id: Date.now().toString(),
      name,
      slugs: active,
      savedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    };
    const next = [entry, ...saved].slice(0, 10);
    setSaved(next);
    saveTo(next);
    setSaveLabel("");
  }

  function loadComparison(comp: SavedComparison) {
    const [a, b, c] = comp.slugs;
    const next: [string, string, string] = [a ?? "", b ?? "", c ?? ""];
    setPicks(next);
    router.replace(`/app/benchmark?slugs=${comp.slugs.join(",")}`);
    fetchBenchmark(comp.slugs);
  }

  function deleteComparison(id: string) {
    const next = saved.filter((s) => s.id !== id);
    setSaved(next);
    saveTo(next);
  }

  const activeCount = picks.filter(Boolean).length;
  const canCompare = activeCount >= 2;

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.55rem 0.65rem",
    border: "1px solid var(--color-border-strong)",
    background: "var(--color-bg)",
    fontFamily: "var(--font-display)",
    fontSize: "0.85rem",
    color: "var(--color-text)",
    borderRadius: "var(--radius)",
    outline: "none",
    cursor: "pointer",
  };

  return (
    <div className="bm-page" style={{ padding: "24px", maxWidth: "960px", margin: "0 auto" }}>
      <style>{`
        @media (max-width: 640px) {
          .bm-page { padding: 16px 12px 48px !important; }
          .bm-page h1 { font-size: 1.6rem !important; }
          .bm-picker-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .bm-picker-grid > * { width: 100% !important; }
          .bm-picker-grid select,
          .bm-picker-grid button { width: 100% !important; }
          .bm-save-row { flex-wrap: wrap !important; }
          .bm-save-row input { width: 100% !important; }
          .bm-table-scroll table { min-width: 540px; }
        }
      `}</style>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "28px" }}>
        <div>
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
            Head-to-head
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "2.25rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--color-text)",
              margin: "0 0 6px",
            }}
          >
            Benchmark companies
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-mid)", margin: 0 }}>
            Pick 2 or 3 brands and put them side by side. Differences highlighted in rust.
          </p>
        </div>
      </div>

      {/* Brand picker */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.64rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-text-mid)",
            marginBottom: "14px",
          }}
        >
          Choose brands, 2 minimum, 3 maximum
        </div>
        <div className="bm-picker-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "12px", alignItems: "end" }}>
          {[
            { label: "Brand 1", idx: 0, required: true },
            { label: "Brand 2", idx: 1, required: true },
            { label: "Brand 3 (optional)", idx: 2, required: false },
          ].map(({ label, idx, required }) => (
            <label key={idx} style={{ display: "block" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.64rem",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "var(--color-text-dim)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {label}{required && <span style={{ color: "var(--color-rust)", marginLeft: 2 }}>*</span>}
              </span>
              <select
                value={picks[idx as 0 | 1 | 2]}
                onChange={(e) => {
                  const next = [...picks] as [string, string, string];
                  next[idx as 0 | 1 | 2] = e.target.value;
                  setPicks(next);
                }}
                style={selectStyle}
              >
                <option value="">Select a company</option>
                {allProfiles.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.meta.company}</option>
                ))}
              </select>
            </label>
          ))}
          <button
            onClick={handleCompare}
            disabled={!canCompare}
            style={{
              height: "40px",
              padding: "0 20px",
              background: canCompare ? "var(--color-rust)" : "var(--color-border)",
              color: canCompare ? "#fff" : "var(--color-text-dim)",
              border: "none",
              borderRadius: "var(--radius-pill)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: canCompare ? "pointer" : "not-allowed",
              whiteSpace: "nowrap",
              transition: "background 0.15s",
            }}
          >
            Compare →
          </button>
        </div>
        {!canCompare && activeCount > 0 && (
          <p style={{ marginTop: "8px", fontSize: "0.75rem", color: "var(--color-rust)" }}>
            Select at least 2 brands to compare.
          </p>
        )}
      </div>

      {/* Save row */}
      {canCompare && (
        <div className="bm-save-row" style={{ display: "flex", gap: "8px", marginBottom: "24px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Name this comparison (optional)"
            value={saveLabel}
            onChange={(e) => setSaveLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            style={{
              padding: "0.5rem 0.85rem",
              border: "1px solid var(--color-border-strong)",
              borderRadius: "var(--radius)",
              background: "var(--color-bg)",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "var(--color-text)",
              outline: "none",
              width: "260px",
            }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid var(--color-border-strong)",
              borderRadius: "var(--radius-pill)",
              background: "transparent",
              fontFamily: "var(--font-display)",
              fontSize: "0.64rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-text-mid)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            ☆ Save comparison
          </button>
        </div>
      )}

      {/* Saved comparisons */}
      {saved.length > 0 && (
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.64rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-text-dim)",
              marginBottom: "10px",
            }}
          >
            Saved comparisons
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {saved.map((comp) => (
              <div
                key={comp.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0.35rem 0.75rem",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                <button
                  onClick={() => loadComparison(comp)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontFamily: "var(--font-display)",
                    fontSize: "0.72rem",
                    color: "var(--color-text)",
                    cursor: "pointer",
                  }}
                >
                  {comp.name}
                </button>
                <span style={{ fontSize: "0.6rem", color: "var(--color-text-dim)" }}>{comp.savedAt}</span>
                <button
                  onClick={() => deleteComparison(comp.id)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0 0 0 2px",
                    color: "var(--color-text-dim)",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    lineHeight: 1,
                  }}
                  aria-label="Remove saved comparison"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison table */}
      {profiles.length < 2 && !loading ? (
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-dim)" }}>
            Select 2 or 3 brands above and click Compare.
          </p>
        </div>
      ) : loading ? (
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.92rem", color: "var(--color-text-dim)" }}>Loading...</p>
        </div>
      ) : (
        <div className="bm-table-scroll" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border-strong)" }}>
                <th
                  style={{
                    padding: "12px 16px",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-text-dim)",
                    textAlign: "left",
                    width: "180px",
                    background: "var(--color-surface-2)",
                    borderBottom: "1px solid var(--color-border-strong)",
                  }}
                >
                  Field
                </th>
                {profiles.map((p) => {
                  const flag = flagEmoji(p.meta.hq.country);
                  const composite = p.aiPerception.score.composite ?? deriveComposite(p.aiPerception.score);
                  const lastUpdated = p.investorSnapshot.reporting?.latestReportDate;
                  const vendors = p.aiPerception.vendorPartners?.slice(0, 3) ?? [];
                  return (
                    <th
                      key={p.slug}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        background: "var(--color-surface-2)",
                        borderBottom: "1px solid var(--color-border-strong)",
                        verticalAlign: "top",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: 2 }}>
                        {flag && (
                          <span
                            aria-label={p.meta.hq.country}
                            title={`${p.meta.hq.city}, ${p.meta.hq.country}`}
                            style={{ fontSize: "1.1rem", lineHeight: 1 }}
                          >
                            {flag}
                          </span>
                        )}
                        <Link
                          href={`/app/companies/${p.slug}`}
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 600,
                            fontSize: "0.92rem",
                            color: "var(--color-text)",
                            textDecoration: "none",
                          }}
                        >
                          {p.meta.company}
                        </Link>
                      </div>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-display)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--color-text-dim)",
                          marginTop: 0,
                          fontWeight: 400,
                        }}
                      >
                        {p.meta.sector}
                      </span>

                      {/* Composite mini-bar — visual score at a glance */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                        <div
                          aria-hidden
                          style={{
                            position: "relative",
                            width: 64,
                            height: 4,
                            background: "var(--color-border)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              right: `${100 - Math.min(100, (composite / 5) * 100)}%`,
                              background: "var(--color-rust)",
                            }}
                          />
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-text-mid)" }}>
                          {composite.toFixed(1)}
                        </span>
                      </div>

                      {/* Vendor accent dots */}
                      {vendors.length > 0 && (
                        <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                          {vendors.map((v) => (
                            <span
                              key={v.name}
                              title={v.name}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                fontFamily: "var(--font-display)",
                                fontSize: "0.55rem",
                                letterSpacing: "0.06em",
                                color: "var(--color-text-mid)",
                                padding: "2px 6px",
                                background: "var(--color-surface)",
                                borderRadius: "var(--radius-pill)",
                                border: "1px solid var(--color-border)",
                              }}
                            >
                              <span style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: vendorAccent(v.name),
                              }} />
                              {v.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Last-updated chip */}
                      {lastUpdated && (
                        <div
                          style={{
                            marginTop: 6,
                            fontFamily: "var(--font-display)",
                            fontSize: "0.55rem",
                            letterSpacing: "0.10em",
                            textTransform: "uppercase",
                            color: "var(--color-text-dim)",
                          }}
                        >
                          Last earnings · {lastUpdated}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Part 1: Business */}
              <tr>
                <td
                  colSpan={profiles.length + 1}
                  style={{
                    padding: "8px 16px",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-rust)",
                    background: "var(--color-rust-dim2)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  Part 1 — Business
                </td>
              </tr>
              {PART1_ROWS.map(({ label, getValue }) => {
                const values = profiles.map(getValue);
                return (
                  <tr key={label} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontFamily: "var(--font-display)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.06em",
                        color: "var(--color-text-dim)",
                        borderBottom: "1px solid var(--color-border)",
                        background: "var(--color-surface-2)",
                        verticalAlign: "top",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </td>
                    {profiles.map((p, i) => (
                      <DiffCell key={p.slug} value={getValue(p)} baseline={i === 0 ? getValue(p) : values[0]}>
                        {getValue(p) ?? "—"}
                      </DiffCell>
                    ))}
                  </tr>
                );
              })}

              {/* Part 2: AI */}
              <tr>
                <td
                  colSpan={profiles.length + 1}
                  style={{
                    padding: "8px 16px",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-rust)",
                    background: "var(--color-rust-dim2)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  Part 2 — AI Impression
                </td>
              </tr>
              {PART2_ROWS.map(({ label, getValue, render }) => {
                const values = profiles.map(getValue);
                return (
                  <tr key={label} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontFamily: "var(--font-display)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.06em",
                        color: "var(--color-text-dim)",
                        borderBottom: "1px solid var(--color-border)",
                        background: "var(--color-surface-2)",
                        verticalAlign: "top",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {label}
                    </td>
                    {profiles.map((p, i) => (
                      <DiffCell key={p.slug} value={getValue(p)} baseline={i === 0 ? getValue(p) : values[0]}>
                        {render ? render(p) : (getValue(p) ?? "—")}
                      </DiffCell>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function BenchmarkPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: "24px", maxWidth: "960px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "2.25rem" }}>Benchmark</h1>
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", padding: "48px", textAlign: "center", marginTop: "24px" }}>
          <p style={{ color: "var(--color-text-dim)" }}>Loading...</p>
        </div>
      </div>
    }>
      <BenchmarkContent />
    </Suspense>
  );
}
