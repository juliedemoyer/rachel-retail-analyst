import Link from "next/link";
import { Suspense } from "react";
import TrackEvent from "@/app/components/TrackEvent";
import { readAllProfiles } from "@/lib/profiles/store";
import { quadrantLabel, deriveComposite } from "@/lib/profiles/schema";
import type { CompanyProfile } from "@/lib/profiles/schema";
import { CountryFilter } from "./CountryFilter";

type Profile = CompanyProfile & { slug: string };

const SECTOR_COLORS: Record<string, string> = {
  "Luxury & Beauty":      "#b34e2a",
  "Grocery":              "#5e8a56",
  "Apparel & E-commerce": "#5a4e8a",
  "CPG":                  "#8b7e4e",
  "Sports & Outdoor":     "#4a7e8a",
  "Home & DIY":           "#8a4e6a",
};

const QUADRANT_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  performer:      { bg: "var(--color-rust-dim)",       text: "var(--color-rust)",        border: "var(--color-rust)" },
  narrative_led:         { bg: "rgba(196,138,42,0.12)",       text: "#C48A2A",                  border: "#C48A2A" },
  silent_builder: { bg: "rgba(45,106,79,0.10)",        text: "var(--color-green)",        border: "var(--color-green)" },
  not_visible:        { bg: "transparent",              text: "var(--color-text-dim)",    border: "var(--color-border)" },
  native:         { bg: "rgba(90,78,138,0.10)",     text: "var(--color-vendor-microsoft)", border: "var(--color-vendor-microsoft)" },
};

function ScoreDots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "3px", verticalAlign: "middle" }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            display: "inline-block",
            background: i < Math.round(value) ? "var(--color-rust)" : "transparent",
            border: i < Math.round(value) ? "none" : "1px solid var(--color-border-strong)",
          }}
        />
      ))}
    </span>
  );
}

function QuadrantBadge({ q }: { q: string }) {
  const s = QUADRANT_STYLES[q] ?? QUADRANT_STYLES.not_visible;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: "0.64rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "0.3rem 0.65rem",
        borderRadius: "var(--radius-pill)",
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        whiteSpace: "nowrap",
      }}
    >
      {quadrantLabel(q as never)}
    </span>
  );
}

function RankRow({ rank, profile }: { rank: number; profile: Profile }) {
  const composite = profile.aiPerception.score.composite ?? deriveComposite(profile.aiPerception.score);
  const q = profile.meta.isAINative ? "native" : profile.aiPerception.score.quadrant;
  const topTool = profile.aiPerception.namedProductionTools[0]?.name;
  const sectorColor = SECTOR_COLORS[profile.meta.sector] ?? "var(--color-text-dim)";

  return (
    <Link
      href={`/app/companies/${profile.slug}`}
      style={{
        display: "grid",
        gridTemplateColumns: "32px 1fr auto 80px",
        gap: "12px",
        padding: "12px 20px",
        borderBottom: "1px solid var(--color-border)",
        alignItems: "center",
        transition: "background 0.15s ease",
        textDecoration: "none",
        color: "inherit",
        position: "relative",
      }}
      className="lb-row lb-grid"
    >
      {/* Rank */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.82rem",
          color: "var(--color-text-dim)",
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {rank}
      </span>

      {/* Company + tool */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: sectorColor,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "0.92rem",
              letterSpacing: "-0.01em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {profile.meta.company}
          </span>
        </div>
        {topTool && (
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.64rem",
              letterSpacing: "0.08em",
              color: "var(--color-text-dim)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
              paddingLeft: "16px",
            }}
          >
            {topTool}
          </span>
        )}
      </div>

      {/* Quadrant badge */}
      <QuadrantBadge q={q} />

      {/* Score */}
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
          <ScoreDots value={composite} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: "0.95rem",
              fontVariantNumeric: "tabular-nums",
              color: "var(--color-text)",
            }}
          >
            {composite}
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.58rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-text-dim)",
          }}
        >
          composite
        </span>
      </div>
    </Link>
  );
}

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ countries?: string }>;
}) {
  const params = await searchParams;
  const selectedCountries = params.countries?.split(",").filter(Boolean) ?? [];

  const allProfiles = await readAllProfiles();

  // Collect all unique country codes, sorted alphabetically by label
  const allCountries = [...new Set(allProfiles.map((p: Profile) => p.meta.hq?.country).filter(Boolean) as string[])].sort();

  const filtered = selectedCountries.length > 0
    ? allProfiles.filter((p: Profile) => selectedCountries.includes(p.meta.hq?.country ?? ""))
    : allProfiles;

  const bySector = Object.groupBy(filtered, (p: Profile) => p.meta.sector) as Record<string, Profile[] | undefined>;
  const sectors = Object.keys(bySector).sort();

  for (const sector of sectors) {
    bySector[sector]?.sort((a: Profile, b: Profile) => {
      const ac = a.aiPerception.score.composite ?? deriveComposite(a.aiPerception.score);
      const bc = b.aiPerception.score.composite ?? deriveComposite(b.aiPerception.score);
      return bc - ac;
    });
  }

  return (
    <div className="lb-page" style={{ padding: "24px", maxWidth: "920px", margin: "0 auto" }}>
      <TrackEvent event="leaderboard_view" props={{ sector: "all" }} />
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
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
          Rankings
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
          Sector leaderboard
        </h1>
        <p style={{ fontSize: "0.92rem", color: "var(--color-text-mid)", margin: 0 }}>
          Who leads on AI in each retail sector. Composite score = (Rhetoric + Production) / 2.
        </p>
      </div>

      <style>{`
        .lb-row:hover { background: var(--color-surface-2) !important; }
        .lb-row:hover::after { transform: scaleX(1) !important; }
        .lb-row::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: var(--color-rust);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        @media (max-width: 640px) {
          .lb-page { padding: 16px 12px 48px !important; }
          .lb-page h1 { font-size: 1.6rem !important; }
          .lb-grid {
            grid-template-columns: 24px 1fr 76px !important;
            gap: 8px !important;
            padding-left: 14px !important;
            padding-right: 14px !important;
          }
          /* Hide the Quadrant column (3rd child of every grid row) */
          .lb-grid > :nth-child(3) { display: none !important; }
        }
      `}</style>

      <Suspense fallback={null}>
        <CountryFilter allCountries={allCountries} selected={selectedCountries} />
      </Suspense>

      {selectedCountries.length > 0 && filtered.length === 0 && (
        <p style={{ color: "var(--color-text-mid)", fontSize: "0.9rem", marginBottom: "20px" }}>
          No companies match the selected countries.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {sectors.map((sector) => {
          const companies = bySector[sector] ?? [];
          const sectorColor = SECTOR_COLORS[sector] ?? "var(--color-text-dim)";
          return (
            <div
              key={sector}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
              }}
            >
              {/* Sector header */}
              <div
                style={{
                  padding: "12px 20px",
                  borderBottom: "1px solid var(--color-border)",
                  background: "var(--color-surface-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: sectorColor, flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "0.92rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {sector}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.64rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-text-dim)",
                  }}
                >
                  {companies.length} {companies.length === 1 ? "company" : "companies"}
                </span>
              </div>

              {/* Table header */}
              <div
                className="lb-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr auto 80px",
                  gap: "12px",
                  padding: "7px 20px",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                {["#", "Company", "Quadrant", "Score"].map((h) => (
                  <span
                    key={h}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--color-text-dim)",
                      textAlign: h === "#" || h === "Score" ? "right" : "left",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              <div>
                {companies.map((p: Profile, i: number) => (
                  <RankRow key={p.slug} rank={i + 1} profile={p} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "24px",
          fontFamily: "var(--font-display)",
          fontSize: "0.64rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-text-dim)",
        }}
      >
        {filtered.length}{selectedCountries.length > 0 ? ` of ${allProfiles.length}` : ""} companies · ranked by composite AI Impression Score within sector
      </p>
    </div>
  );
}
