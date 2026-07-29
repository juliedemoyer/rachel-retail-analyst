import Link from "next/link";
import { redis } from "@/lib/redis";

// Smart Topics are loaded from Redis on every request so AI-driven topic
// refreshes (and the new headline / phrases fields) propagate immediately
// without a Vercel rebuild.
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SmartTopic {
  id?: string | number;
  title?: string;
  headline?: string;
  punchline?: string;
  phrases?: string[];
  summary?: string;
  tldr?: string;
  drop_in_meeting?: string;
  dropLine?: string;
  signal?: string;
  category?: string;
  signals_count?: number;
  companies?: string[];
  tags?: string[];
  trend?: "rising" | "stable" | "fading";
  ts?: string;
  lastUpdated?: string;
  rank?: number;
  sources?: Array<{ date: string; headline: string; source: string; href?: string }>;
  why_this_matters?: string;
}

// Static fallback topics shown when Redis has no data
// Static fallback topics shown when Redis has no data. Drawn from the same
// fictional demo universe as ?demo=1 — real instances build topics from their
// own pulse via the weekly topics-proposer cron.
const STATIC_TOPICS: SmartTopic[] = [
  {
    id: "narrative-production-gap",
    title: "The gap between AI narrative and shipped production is widening",
    punchline: "Boards talk more. The shipped-tool count moves slower.",
    why_this_matters: "The two-axis model exists because rhetoric and production move independently. When the sector's average rhetoric score rises faster than its average production count, scores drift toward the narrative-led quadrant and the next earnings season decides who converts.",
    phrases: [
      "Rhetoric scores rose across the demo watchlist this season; confirmed tool counts mostly did not",
      "Northwind Apparel is the clearest case: strongest language in the set, one tool, still in beta",
      "Maison Lumière is the counter-example: the ROI figure was stated on the call, not briefed to press",
    ],
    category: "Methodology",
    signals_count: 4,
    tldr: "Across the fictional demo watchlist, board AI language strengthened this season while confirmed production counts barely moved. The companies to watch are the ones where the two lines cross.",
    sources: [
      { date: "11 Feb", headline: "Maison Lumi\u00e8re states 18% conversion uplift on results call", source: "Maison Lumi\u00e8re FY25 results" },
      { date: "4 Mar", headline: "Northwind Apparel CEO: 'every part of this business will be reimagined'", source: "Northwind Apparel FY26 release" },
      { date: "20 Mar", headline: "Verdant Grocers extends fresh-waste forecasting to all stores, no board mention", source: "Verdant Grocers trading update" },
    ],
  },
  {
    id: "silent-builders",
    title: "Silent builders: confirmed production with no board narrative",
    punchline: "The most informative quadrant is the quiet one.",
    why_this_matters: "A company shipping real tools without talking about them is invisible to any single-score ranking. Splitting rhetoric from production is what surfaces them, and watching for their first narrative move is the highest-signal event in the framework.",
    phrases: [
      "Verdant Grocers: four confirmed tools in production, rhetoric score of 2",
      "Halcyon Sportswear: two internal tools, disclosed once, in a sustainability appendix",
      "A silent builder's first capital-markets-day AI slide is the moment the quadrant call changes",
    ],
    category: "Methodology",
    signals_count: 3,
    tldr: "Two of the eight demo companies ship real production AI with almost no board narrative. The framework exists to catch exactly this profile.",
    sources: [
      { date: "20 Mar", headline: "Verdant Grocers fresh-waste forecasting reaches 1,900 stores", source: "Verdant Grocers trading update" },
      { date: "8 Jan", headline: "Halcyon Sportswear sustainability appendix names two internal models", source: "Halcyon Sportswear annual report" },
    ],
  },
];

async function getTopics(): Promise<SmartTopic[]> {
  try {
    const raw = await redis.get("rachel:topics");
    if (!raw) return [];
    let parsed: unknown = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && "value" in (parsed as object)) {
      const inner = (parsed as { value: unknown }).value;
      parsed = typeof inner === "string" ? JSON.parse(inner) : inner;
    }
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as SmartTopic[]) : [];
  } catch {
    return [];
  }
}

const CATEGORY_STYLES: Record<string, string> = {
  "Retail × AI": "bg-[var(--color-rust)] text-white border-[var(--color-rust)]",
  "Retail":      "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]",
  "AI":          "bg-[#2f7d32] text-white border-[#2f7d32]",
};

function CategoryChip({ cat }: { cat?: string }) {
  if (!cat) return null;
  const cls = CATEGORY_STYLES[cat] ?? "bg-[var(--color-surface-2)] text-[var(--color-text-dim)] border-[var(--color-border)]";
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-[var(--radius-pill)] border font-medium ${cls}`}>{cat}</span>
  );
}

export default async function TopicsPage() {
  const redisTopics = await getTopics();
  const topics = redisTopics.length > 0 ? redisTopics : STATIC_TOPICS;

  return (
    <div className="topics-page p-4 sm:p-6 max-w-3xl mx-auto">
      <style>{`
        @media (max-width: 640px) {
          .topics-page article {
            grid-template-columns: 1fr !important;
            padding: 1rem !important;
            gap: 0.75rem !important;
          }
          .topics-page article > :first-child {
            font-size: 32px !important;
          }
          .topics-page article h3 {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-6">
        <div>
          <div className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] mb-1">Smart Topics</div>
          <h1 className="font-display text-2xl font-semibold mb-1">Grab one before you walk into the meeting</h1>
          <p className="text-sm text-[var(--color-text)] mb-1 leading-relaxed font-medium">
            Patterns across 3+ events. The vocabulary you walk into the meeting with.
          </p>
          <p className="text-sm text-[var(--color-text-mid)] max-w-[60ch] leading-relaxed">
            Each topic surfaces only when 3 or more Pulse items confirm the same pattern across different companies or sources. Ranked by momentum.
          </p>
        </div>
        <div className="shrink-0 flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-1 flex-wrap">
          <span className="text-[11px] px-2 py-0.5 border border-[var(--color-border)] rounded-[var(--radius-pill)] text-[var(--color-text-dim)] bg-[var(--color-surface)]">Refreshes weekly</span>
          <span className="text-[11px] text-[var(--color-text-dim)]">3+ signals required</span>
        </div>
      </div>

      <div className="space-y-4">
        {topics.map((topic, i) => (
          <article
            key={topic.id ?? i}
            id={topic.id != null ? String(topic.id) : undefined}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-6 grid gap-5 scroll-mt-6"
            style={{ gridTemplateColumns: "72px 1fr auto" }}
          >
            {/* Number */}
            <div className="font-display text-[52px] leading-none text-[var(--color-rust)] font-bold select-none">
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Body */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <CategoryChip cat={topic.category} />
                {topic.signals_count && (
                  <span className="text-[11px] text-[var(--color-text-dim)]">{topic.signals_count} signals this week</span>
                )}
                {topic.trend === "rising" && <span className="text-[11px] text-[var(--color-green)]">↑ Rising</span>}
                {topic.trend === "fading" && <span className="text-[11px] text-[var(--color-negative)]">↓ Fading</span>}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "var(--color-text)",
                  margin: "0 0 14px",
                }}
              >
                {topic.punchline ?? topic.headline ?? topic.title}
              </h3>

              {topic.why_this_matters && (
                <div
                  style={{
                    background: "var(--color-surface-2)",
                    borderLeft: "3px solid var(--color-rust)",
                    paddingLeft: "12px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingRight: "12px",
                    marginBottom: "16px",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <p style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--color-text)", margin: 0, fontWeight: 500 }}>
                    {topic.why_this_matters}
                  </p>
                </div>
              )}

              {topic.phrases && topic.phrases.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                  {topic.phrases.map((p, j) => (
                    <span
                      key={j}
                      style={{
                        display: "inline-flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "13.5px",
                        lineHeight: 1.4,
                        color: "var(--color-text)",
                        background: "var(--color-surface-2)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius)",
                        padding: "8px 12px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "var(--color-rust)",
                          fontWeight: 700,
                          marginTop: "2px",
                          flexShrink: 0,
                        }}
                      >
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span>{p}</span>
                    </span>
                  ))}
                </div>
              )}

              {(topic.drop_in_meeting ?? topic.dropLine ?? topic.signal) && (
                <div
                  style={{
                    borderLeft: "3px solid var(--color-rust)",
                    paddingLeft: "12px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    marginBottom: "16px",
                  }}
                >
                  <p style={{ fontSize: "13px", fontStyle: "italic", lineHeight: 1.45, color: "var(--color-text-mid)", margin: 0 }}>
                    &ldquo;{topic.drop_in_meeting ?? topic.dropLine ?? topic.signal}&rdquo;
                  </p>
                </div>
              )}

              {(topic.tldr ?? topic.summary) && !topic.phrases && (
                <p style={{ fontSize: "14px", color: "var(--color-text-mid)", margin: "0 0 16px", lineHeight: 1.55 }}>
                  <strong>TLDR:</strong> {topic.tldr ?? topic.summary}
                </p>
              )}

              {topic.sources && topic.sources.length > 0 && (() => {
                const visible = topic.sources.slice(0, 5);
                const remaining = topic.sources.length - visible.length;
                return (
                  <div>
                    <p className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] mb-1.5">
                      Sources
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {visible.map((s, j) =>
                        s.href ? (
                          <a
                            key={j}
                            href={s.href}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-pill)] font-display text-[9px] tracking-[0.06em] text-[var(--color-text-mid)] hover:border-[var(--color-rust)] hover:text-[var(--color-rust)] transition-colors"
                            title={s.headline}
                          >
                            <span className="text-[var(--color-text)]">{s.date}</span>
                            <span className="opacity-40">·</span>
                            {s.source}
                          </a>
                        ) : (
                          <span
                            key={j}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-pill)] font-display text-[9px] tracking-[0.06em] text-[var(--color-text-mid)]"
                            title={s.headline}
                          >
                            <span className="text-[var(--color-text)]">{s.date}</span>
                            <span className="opacity-40">·</span>
                            {s.source}
                          </span>
                        )
                      )}
                      {remaining > 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 font-display text-[9px] tracking-[0.06em] text-[var(--color-text-dim)]">
                          + {remaining} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })()}

              {topic.companies && topic.companies.length > 0 && (() => {
                return (
                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "14px",
                      borderTop: "1px dashed var(--color-border)",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-text-dim)",
                        marginRight: "4px",
                      }}
                    >
                      Companies
                    </span>
                    {topic.companies.map((c) => (
                      <Link
                        key={c}
                        href={`/app/companies/${c}`}
                        style={{
                          fontSize: "12px",
                          padding: "3px 10px",
                          background: "var(--color-surface-2)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "100px",
                          color: "var(--color-text)",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 shrink-0">
              <Link href="/app/pulse" className="text-[11px] px-3 py-1.5 border border-[var(--color-border)] rounded-[var(--radius)] text-[var(--color-text-mid)] hover:border-[var(--color-border-strong)] transition-colors text-center">
                All sources
              </Link>
              <Link href="/app/matrix" className="text-[11px] px-3 py-1.5 border border-[var(--color-border)] rounded-[var(--radius)] text-[var(--color-text-mid)] hover:border-[var(--color-border-strong)] transition-colors text-center">
                Matrix
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
