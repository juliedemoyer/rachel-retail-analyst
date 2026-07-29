import Link from "next/link";

// /app/rumours — the human-channel surface designed on /app/sources.
// Insider tips, ex-employee notes, vendor advisory chatter. Tagged red,
// confidence-banded 1-3, never feeds Smart Topics, never lifts a score.
// When a rumour is corroborated by a public source or a 2nd independent
// channel, it gets promoted to Pulse with evidence_tier="confirmed" and
// the original entry is kept in the trail with a "Promoted" stamp.

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Rumour {
  id: string;
  headline: string;
  body: string;
  drop_in_meeting?: string;
  what_it_means?: string;
  date: string; // ISO
  company_slug?: string;
  watchlist?: string;
  source_type: "insider" | "ex-employee" | "vendor" | "consultant" | "conference floor";
  confidence: 1 | 2 | 3;
  promotion_criteria: string;
}

// Example item from the fictional demo universe (config/demo-companies.json).
// The rumours channel is a WORKFLOW demo: single-source human intel is held
// here, clearly tiered, until it either gets corroborated and promoted to
// Pulse or dies. Nothing about a real company or a real person ships in this
// file — if you run this channel for real, that discipline is the point.
const STATIC_RUMOURS: Rumour[] = [
  {
    id: "r-demo-northwind-cdo",
    headline: "Northwind Apparel's digital chief, sponsor of the Fit Finder programme, said to be leaving",
    body:
      "A single conference-floor conversation places the executive sponsor of Fit Finder on the way out. No filing, no press release, no profile change. Recorded here at rumour tier, excluded from all counts, pending corroboration.",
    what_it_means:
      "Fit Finder is the company's only confirmed production tool and it is sponsor-shaped. If the sponsor leaves before it exits beta, the narrative-led gap widens. If a successor ships it, the quadrant call changes. Either way, the next results release settles it.",
    date: "2027-03-01",
    company_slug: "northwind-apparel",
    watchlist: "Northwind Apparel",
    source_type: "conference floor",
    confidence: 1,
    promotion_criteria:
      "Promotes to Pulse (Estimated tier) on: (a) a company announcement, (b) a public profile change, (c) a second independent corroboration.",
  },
];

const SOURCE_TYPE_LABELS: Record<Rumour["source_type"], string> = {
  insider: "Insider",
  "ex-employee": "Ex-employee",
  vendor: "Vendor",
  consultant: "Consultant",
  "conference floor": "Conference floor",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function RumoursPage() {
  // In Phase 2 this also reads `rachel:rumours` from Redis. For now,
  // the static list is the source of truth.
  const items = STATIC_RUMOURS;

  return (
    <div style={{ padding: "24px", maxWidth: "880px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#7d2e1a",
            marginBottom: "10px",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7d2e1a" }} />
          Rumours channel · ringfenced
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.1rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 8px",
            color: "var(--color-text)",
          }}
        >
          What people know, not what companies have announced.
        </h1>
        <p style={{ fontSize: "0.93rem", color: "var(--color-text-mid)", margin: 0, maxWidth: "62ch", lineHeight: 1.5 }}>
          Insider tips, ex-employee notes, vendor advisory chatter. Tagged red, confidence-banded, never auto-fed into Smart Topics. When a rumour is corroborated by a public source or a 2nd independent channel, Rachel promotes it to Pulse and keeps the original here in the trail. Read more on{" "}
          <Link href="/app/sources" style={{ color: "var(--color-rust)" }}>Data sources</Link>.
        </p>
      </div>

      {/* Rumours list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        {items.map((r) => (
          <article
            key={r.id}
            style={{
              padding: "16px 18px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderLeft: "3px solid #7d2e1a",
              borderRadius: "var(--radius)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "var(--font-display)",
                  fontSize: "9.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "100px",
                  background: "#7d2e1a",
                  color: "#fff",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
                Rumour · {r.confidence}/3
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "9.5px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-dim)",
                  padding: "3px 8px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "100px",
                  background: "var(--color-surface-2)",
                }}
              >
                {SOURCE_TYPE_LABELS[r.source_type]}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--color-text-mid)",
                  fontWeight: 600,
                }}
              >
                {formatDate(r.date)}
              </span>
              {r.watchlist && (
                <span style={{ fontSize: "11px", color: "var(--color-text-mid)", marginLeft: "auto" }}>
                  <strong style={{ color: "var(--color-text-dim)", fontSize: "9.5px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, marginRight: "4px" }}>
                    Watchlist
                  </strong>
                  <span style={{ color: "var(--color-rust)", fontWeight: 600 }}>{r.watchlist}</span>
                </span>
              )}
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: 600,
                margin: "0 0 8px",
                lineHeight: 1.3,
                color: "var(--color-text)",
              }}
            >
              {r.headline}
            </h3>

            <p style={{ fontSize: "13px", color: "var(--color-text-mid)", margin: "0 0 10px", lineHeight: 1.55 }}>
              {r.body}
            </p>

            {r.drop_in_meeting && (
              <div
                style={{
                  borderLeft: "3px solid #7d2e1a",
                  paddingLeft: "12px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  marginBottom: "10px",
                }}
              >
                <p style={{ fontSize: "12.5px", fontStyle: "italic", lineHeight: 1.45, color: "var(--color-text-mid)", margin: 0 }}>
                  &ldquo;{r.drop_in_meeting}&rdquo;
                </p>
              </div>
            )}

            {r.what_it_means && (
              <div
                style={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  padding: "10px 12px",
                  marginBottom: "10px",
                  fontSize: "12.5px",
                  color: "var(--color-text-mid)",
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ fontFamily: "var(--font-display)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-dim)", display: "block", marginBottom: "4px" }}>
                  Why it matters
                </strong>
                {r.what_it_means}
              </div>
            )}

            <p style={{ fontSize: "11px", color: "var(--color-text-dim)", margin: 0, lineHeight: 1.5 }}>
              <strong style={{ color: "var(--color-text-mid)" }}>Promotes when:</strong> {r.promotion_criteria}
            </p>

            {r.company_slug && (
              <Link
                href={`/app/companies/${r.company_slug}`}
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  fontFamily: "var(--font-display)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-rust)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Open profile →
              </Link>
            )}
          </article>
        ))}
      </div>

      <div
        style={{
          background: "var(--color-surface-2)",
          border: "1px dashed var(--color-border)",
          borderRadius: "var(--radius)",
          padding: "12px 14px",
          fontSize: "12px",
          color: "var(--color-text-mid)",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        Got intel that should be in the trail? Reply to any Rachel email or DM. Submission form ships in Phase 2 with end-to-end source-protection.
      </div>
    </div>
  );
}
