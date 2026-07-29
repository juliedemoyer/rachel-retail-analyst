import Link from "next/link";
import PriorityButton from "./PriorityButton";
import NextEarningsChip from "./NextEarningsChip";
import "./profile.css";
import type {
  CompanyTemplateData,
  Source,
  Quote,
  AiPerceptionScore,
  AIActReadiness,
  Cadence,
  InvestorSnapshot,
  Narrative,
  Leadership,
  Production,
  VendorStack,
  ByMaison,
  RachelNote,
  PeerComparison,
} from "@/lib/profiles/template/schema";

// Server component. Renders the LVMH-style profile from a typed data
// record, skipping sections the company doesn't yet have. Hand-crafted
// inline styles preserve the rust/green/amber/blue/purple sub-section
// accents from the original LVMH page.

const ACCENT = {
  rust:   { line: "var(--rust)",    tint: "rgba(179,78,42,0.08)" },
  green:  { line: "var(--green)",   tint: "rgba(45,106,79,0.08)" },
  amber:  { line: "var(--amber)",   tint: "rgba(196,138,42,0.10)" },
  blue:   { line: "#3b6ba5",        tint: "rgba(59,107,165,0.08)" },
  purple: { line: "#7d4e87",        tint: "rgba(125,78,135,0.08)" },
} as const;

function SubheadStrip({
  code,
  title,
  blurb,
  variant,
}: {
  code: string;
  title: string;
  blurb?: string;
  variant: keyof typeof ACCENT;
}) {
  const a = ACCENT[variant];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: ".65rem",
        padding: ".55rem .85rem",
        margin: "1.75rem 0 .9rem",
        background: a.tint,
        borderLeft: `3px solid ${a.line}`,
        borderRadius: 3,
      }}
    >
      <span style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: a.line, fontWeight: 700 }}>
        {code}
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: "var(--text)", textTransform: "uppercase", letterSpacing: ".06em" }}>
        {title}
      </span>
      {blurb && (
        <span style={{ fontSize: 11, color: "var(--text-mid)", marginLeft: "auto", fontStyle: "italic" }}>
          {blurb}
        </span>
      )}
    </div>
  );
}

function SourceChip({ source, marginZero = false }: { source: Source; marginZero?: boolean }) {
  const style = marginZero ? { margin: 0 } : undefined;
  if (source.url) {
    return (
      <a className="source-chip" href={source.url} target="_blank" rel="noopener" style={style}>
        {source.label} ↗
      </a>
    );
  }
  return <span className="source-chip" style={style}>{source.label}</span>;
}

function PartHeader({ code, title, suffix }: { code: string; title: string; suffix?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: ".75rem", marginBottom: "1rem" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--rust)" }}>
        {code}
      </span>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: 0 }}>{title}</h2>
      {suffix && (
        <span style={{ fontSize: 12, color: "var(--text-dim)", marginLeft: "auto" }}>{suffix}</span>
      )}
    </div>
  );
}

function CadenceStripView({ cadence }: { cadence: Cadence }) {
  return (
    <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1rem", alignItems: "center" }}>
      {cadence.baseline && (
        <span style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "3px solid var(--text-dim)", borderRadius: 3, padding: ".45rem .8rem", fontSize: 12, color: "var(--text-mid)" }}>
          <strong style={{ fontFamily: "var(--font-display)", letterSpacing: ".05em", color: "var(--text)" }}>Baseline</strong> · {cadence.baseline.label} · {cadence.baseline.date}
        </span>
      )}
      {cadence.lastReported && (
        <span style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "3px solid var(--text)", borderRadius: 3, padding: ".45rem .8rem", fontSize: 12, color: "var(--text)" }}>
          <strong style={{ fontFamily: "var(--font-display)", letterSpacing: ".05em" }}>Last reported</strong> · {cadence.lastReported.label} · {cadence.lastReported.date}
        </span>
      )}
      {cadence.next && (
        <span style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "3px solid var(--rust)", borderRadius: 3, padding: ".45rem .8rem", fontSize: 12, color: "var(--text)" }}>
          <strong style={{ fontFamily: "var(--font-display)", letterSpacing: ".05em" }}>Next</strong> · {cadence.next.label} · {cadence.next.date}
        </span>
      )}
      {cadence.blurb && (
        <span style={{ fontSize: 11, color: "var(--text-dim)", marginLeft: "auto", maxWidth: 360, textAlign: "right", lineHeight: 1.4 }}>
          {cadence.blurb}
        </span>
      )}
    </div>
  );
}

function MetricCell({
  label,
  value,
  trailing,
  size = 22,
}: {
  label: string;
  value: string;
  trailing?: React.ReactNode;
  size?: number;
}) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: size, marginTop: ".15rem" }}>{value}</div>
      {trailing && <div style={{ fontSize: 12 }}>{trailing}</div>}
    </div>
  );
}

function InvestorSnapshotInner({ investor, isPrivate }: { investor: InvestorSnapshot; isPrivate?: boolean }) {
  const h = investor.headline ?? {};
  const oc = investor.operatingComplexity ?? {};
  const hasOC = oc.brands || oc.stores || oc.countries || oc.hq || oc.languages;
  return (
    <>
      {(h.revenue || h.opMargin || h.netDebt || h.employees) && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem 1.5rem" }}>
          {h.revenue && (
            <MetricCell
              label="Revenue"
              value={h.revenue.value}
              trailing={
                <>
                  {h.revenue.reported && <span style={{ color: "var(--rust)" }}>{h.revenue.reported}</span>}
                  {h.revenue.reported && h.revenue.organic && " · "}
                  {h.revenue.organic && <span style={{ color: "var(--green)" }}>{h.revenue.organic}</span>}
                </>
              }
            />
          )}
          {h.opMargin && (
            <MetricCell
              label="Operating margin"
              value={h.opMargin.value}
              trailing={
                <>
                  {h.opMargin.growth && (
                    <span style={{ color: h.opMargin.growth.pct?.startsWith("-") ? "var(--rust)" : "var(--green)" }}>
                      OP {h.opMargin.growth.pct ?? ""}
                      {h.opMargin.growth.absolute && ` (${h.opMargin.growth.absolute})`}
                      {h.opMargin.growth.basis && (
                        <span style={{ color: "var(--text-dim)" }}> {h.opMargin.growth.basis}</span>
                      )}
                      {h.opMargin.growth.estimated && (
                        <span style={{ color: "var(--text-dim)", fontStyle: "italic" }}> · est.</span>
                      )}
                    </span>
                  )}
                  {h.opMargin.growth && h.opMargin.note && " · "}
                  {h.opMargin.note && <span style={{ color: "var(--rust)" }}>{h.opMargin.note}</span>}
                </>
              }
            />
          )}
          {h.netDebt && <MetricCell label="Net debt" value={h.netDebt.value} trailing={h.netDebt.note && <span style={{ color: "var(--text-mid)" }}>{h.netDebt.note}</span>} />}
          {h.employees && <MetricCell label="Employees" value={h.employees.value} trailing={h.employees.note && <span style={{ color: "var(--text-mid)" }}>{h.employees.note}</span>} />}
        </div>
      )}

      {hasOC && (
        <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: ".5rem" }}>
            Operating complexity{" "}
            <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--text-mid)", fontFamily: "var(--font-body)" }}>
              — the variables that shape how hard AI rollout is
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem 1.5rem" }}>
            {oc.brands && <MetricCell label="Maisons / brands" value={oc.brands.value} trailing={oc.brands.note && <span style={{ color: "var(--text-mid)" }}>{oc.brands.note}</span>} size={20} />}
            {oc.stores && <MetricCell label="Retail stores" value={oc.stores.value} trailing={oc.stores.note && <span style={{ color: "var(--text-mid)" }}>{oc.stores.note}</span>} size={20} />}
            {oc.countries && <MetricCell label="Countries" value={oc.countries.value} trailing={oc.countries.note && <span style={{ color: "var(--text-mid)" }}>{oc.countries.note}</span>} size={20} />}
            {oc.hq && <MetricCell label="Headquarters" value={oc.hq.value} trailing={oc.hq.note && <span style={{ color: "var(--text-mid)" }}>{oc.hq.note}</span>} size={20} />}
            {oc.languages && <MetricCell label="Languages supported" value={oc.languages.value} trailing={oc.languages.note && <span style={{ color: "var(--text-mid)" }}>{oc.languages.note}</span>} size={20} />}
          </div>
          {investor.whyMatters && (
            <div style={{ marginTop: ".75rem", fontSize: 12, color: "var(--text-mid)", lineHeight: 1.5, padding: ".6rem .8rem", background: "var(--bg)", borderLeft: "2px solid var(--rust)", borderRadius: 2 }}>
              <strong style={{ color: "var(--text)" }}>Why this matters for AI:</strong> {investor.whyMatters}
            </div>
          )}
        </div>
      )}

      {investor.revenueStreams && investor.revenueStreams.length > 0 && (
        <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: ".5rem" }}>
            Biggest revenue streams
          </div>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", fontSize: 13 }}>
            {investor.revenueStreams.map((s, i) => (
              <span key={i} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 2, padding: ".3rem .6rem" }}>
                <strong>{s.label}</strong> {s.pct}
              </span>
            ))}
          </div>
        </div>
      )}

      {investor.source && (
        <div style={{ marginTop: ".75rem", fontSize: 11, color: "var(--text-dim)" }}>
          <SourceChip source={{ label: `Source: ${investor.source.label}`, url: investor.source.url }} marginZero />
        </div>
      )}

      {isPrivate && !investor.quarterlyUpdate && (
        <div style={{ marginTop: "1.25rem", padding: ".75rem 1rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 3, fontSize: 13, color: "var(--text-mid)", lineHeight: 1.55 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-dim)", display: "block", marginBottom: ".35rem" }}>Annual results only</span>
          Private company, no quarterly updates. Rachel tracks annual results, public case studies and news as they go live.
        </div>
      )}

      {investor.quarterlyUpdate && (
        <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "2px solid var(--rust)", background: "var(--bg)", borderRadius: 3, padding: ".9rem 1rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: ".6rem", marginBottom: ".6rem" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--rust)", fontWeight: 600 }}>
              {investor.quarterlyUpdate.label}
            </span>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>
              {investor.quarterlyUpdate.date}
              {investor.quarterlyUpdate.blurb && ` · ${investor.quarterlyUpdate.blurb}`}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: ".75rem 1.5rem" }}>
            {investor.quarterlyUpdate.metrics.map((m, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: ".08em" }}>{m.label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginTop: ".1rem" }}>{m.value}</div>
                {m.trend && <div style={{ fontSize: 12, color: m.trend.startsWith("-") ? "var(--rust)" : "var(--green)" }}>{m.trend}</div>}
              </div>
            ))}
          </div>
          {investor.quarterlyUpdate.reading && (
            <div style={{ marginTop: ".65rem", fontSize: 12, color: "var(--text-mid)", lineHeight: 1.5, padding: ".5rem .7rem", background: "var(--surface)", borderLeft: "2px solid var(--text-dim)", borderRadius: 2 }}>
              <strong style={{ color: "var(--text)" }}>Rachel&apos;s read:</strong> {investor.quarterlyUpdate.reading}
            </div>
          )}
          {investor.quarterlyUpdate.source && (
            <div style={{ marginTop: ".6rem", fontSize: 11, color: "var(--text-dim)" }}>
              <SourceChip source={{ label: `Source: ${investor.quarterlyUpdate.source.label}`, url: investor.quarterlyUpdate.source.url }} marginZero />
            </div>
          )}
        </div>
      )}
    </>
  );
}

function InvestorSnapshotView({ investor, isPrivate, hideHeader }: { investor: InvestorSnapshot; isPrivate?: boolean; hideHeader?: boolean }) {
  if (hideHeader) {
    return <InvestorSnapshotInner investor={investor} isPrivate={isPrivate} />;
  }
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, padding: "1.25rem 1.5rem", marginBottom: "2rem" }}>
      <PartHeader code="Part 1" title="Investor snapshot" suffix={investor.fiscalYearLabel} />
      <InvestorSnapshotInner investor={investor} isPrivate={isPrivate} />
    </div>
  );
}

function AiPerceptionView({ perception, hideHeader }: { perception: AiPerceptionScore; hideHeader?: boolean }) {
  return (
    <>
      {!hideHeader && (
        <div style={{ display: "flex", alignItems: "baseline", gap: ".75rem", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--rust)" }}>Part 2</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: 0 }}>AI perception</h2>
        </div>
      )}

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "3px solid var(--rust)", borderRadius: 3, padding: ".9rem 1rem", marginBottom: "1.25rem", display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text)", marginBottom: ".3rem" }}>Rhetoric (0-5)</div>
          <div style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.55 }}>What the board <em>says</em> about AI. Scored on investor calls, annual reports, public interviews.</div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text)", marginBottom: ".3rem" }}>Production (0-5+)</div>
          <div style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.55 }}>What the company actually <em>runs</em>. One point per named AI tool publicly confirmed.</div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text)", marginBottom: ".3rem" }}>The gap is the signal</div>
          <div style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.55 }}>Narrative-led companies ≠ builders. Silent builders are often the most fertile ground for vendor conversations.</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <span className={`score-pill ${quadrantClass(perception.quadrant)}`}>{perception.label}</span>
        <span style={{ fontSize: 13, color: "var(--text-mid)" }}>
          <strong style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>Rhetoric {perception.rhetoric}/5</strong>
          {" · "}
          <strong style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>Production {perception.production}/5</strong>
        </span>
        <span className={`evidence-tier ${perception.evidence}`}>{perception.evidence === "confirmed" ? "Confirmed" : "Estimated"}</span>
        {(perception.lastScored || perception.rubric) && (
          <span style={{ fontSize: 12, color: "var(--text-dim)", marginLeft: "auto" }}>
            {perception.lastScored && `Last scored ${perception.lastScored}`}
            {perception.lastScored && perception.rubric && " · "}
            {perception.rubric && `Rubric ${perception.rubric}`}
          </span>
        )}
      </div>

      {perception.trend && (perception.trend.rhetoric || perception.trend.production || perception.trend.tools || perception.trend.vendors) && (
        <div className="trend-strip">
          <span className="t-item"><strong>Q4 → Q1</strong></span>
          {perception.trend.rhetoric && <span className="t-item">Rhetoric <strong>{perception.trend.rhetoric}</strong></span>}
          {perception.trend.production && <span className="t-item">Production <strong className="up">{perception.trend.production}</strong></span>}
          {perception.trend.tools && <span className="t-item">Named tools <strong className="up">{perception.trend.tools}</strong></span>}
          {perception.trend.vendors && <span className="t-item">Vendor partners <strong className="up">{perception.trend.vendors}</strong></span>}
        </div>
      )}
    </>
  );
}

function quadrantClass(q: AiPerceptionScore["quadrant"]): string {
  switch (q) {
    case "performer": return "perf";
    case "narrative_led": return "narrative_led";
    case "silent": return "silent";
    default: return "";
  }
}

const AI_ACT_DEADLINE = new Date("2026-08-02T00:00:00Z");

const AI_ACT_STATUS_STYLE: Record<AIActReadiness["status"], { bg: string; line: string; label: string; dot: string }> = {
  ready:          { bg: "rgba(45,106,79,0.10)",  line: "#2d6a4f", label: "Ready",          dot: "#2d6a4f" },
  in_progress:    { bg: "rgba(196,138,42,0.12)", line: "#c48a2a", label: "In progress",    dot: "#c48a2a" },
  exposed:        { bg: "rgba(179,78,42,0.10)",  line: "#b34e2a", label: "Exposed",        dot: "#b34e2a" },
  limited:        { bg: "rgba(94,138,86,0.10)",  line: "#5e8a56", label: "Limited risk",   dot: "#5e8a56" },
  not_applicable: { bg: "rgba(120,120,120,0.08)", line: "#888",   label: "Not applicable", dot: "#888"   },
};

function daysUntilDeadline(): number {
  const now = new Date();
  return Math.ceil((AI_ACT_DEADLINE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function AIActReadinessView({ aiAct }: { aiAct: AIActReadiness }) {
  const style = AI_ACT_STATUS_STYLE[aiAct.status];
  const days = daysUntilDeadline();
  const deadlineLabel = days > 0 ? `${days} days to 2 Aug 2026 high-risk deadline` : `Past deadline (2 Aug 2026)`;

  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline", gap: ".75rem", marginBottom: "1rem" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: style.line }}>Part 2b</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: 0 }}>EU AI Act readiness</h2>
        <span style={{ fontSize: 12, color: "var(--text-dim)", marginLeft: "auto" }}>{deadlineLabel}</span>
      </div>

      <div
        style={{
          background: style.bg,
          border: "1px solid var(--border)",
          borderLeft: `3px solid ${style.line}`,
          borderRadius: 3,
          padding: "0.9rem 1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-display)",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: style.line,
              fontWeight: 700,
              padding: "0.3rem 0.7rem",
              border: `1px solid ${style.line}`,
              borderRadius: 100,
              background: "var(--surface)",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: style.dot }} />
            {style.label}
          </span>
          <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{aiAct.jurisdiction}</span>
        </div>

        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--text)", margin: "0 0 0.5rem" }}>
          {aiAct.oneLiner}
        </p>

        {aiAct.highRiskAreas && aiAct.highRiskAreas.length > 0 && (
          <div style={{ marginTop: "0.6rem", display: "flex", flexWrap: "wrap", gap: "0.35rem", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)", marginRight: "0.3rem" }}>
              High-risk surfaces
            </span>
            {aiAct.highRiskAreas.map((a, i) => (
              <span
                key={i}
                style={{
                  fontSize: 11,
                  padding: "0.2rem 0.55rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  color: "var(--text-mid)",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        )}

        {aiAct.source && <SourceChip source={aiAct.source} />}
      </div>
    </>
  );
}

function QuoteBlock({ quote }: { quote: Quote }) {
  return (
    <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
      <div style={{ fontSize: 10, fontFamily: "var(--font-display)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: ".4rem" }}>
        {quote.eyebrow}
      </div>
      <div className="f-value" style={{ fontStyle: "italic", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: `“${quote.htmlQuote}”` }} />
      <div style={{ fontSize: 12, color: "var(--text-mid)", marginTop: ".6rem" }}>{quote.speaker}</div>
      {quote.sources && quote.sources.length > 0 && (
        <div style={{ marginTop: ".6rem", display: "flex", gap: ".35rem", flexWrap: "wrap" }}>
          {quote.sources.map((s, i) => <SourceChip key={i} source={s} />)}
        </div>
      )}
    </div>
  );
}

function NarrativeView({ narrative }: { narrative: Narrative }) {
  if (!narrative.quoteLatest && !narrative.quoteAnnual && !narrative.framing && !narrative.dedicatedSection) return null;
  return (
    <>
      <SubheadStrip code="2A" title="The narrative" blurb="What the board says publicly" variant="rust" />
      {(narrative.quoteLatest || narrative.quoteAnnual) && (
        <div className="field-card">
          <div className="f-label">Key earnings quotes<span className="evidence-tier confirmed">Confirmed</span></div>
          {narrative.quoteLatest && <QuoteBlock quote={narrative.quoteLatest} />}
          {narrative.quoteAnnual && <QuoteBlock quote={narrative.quoteAnnual} />}
        </div>
      )}
      {narrative.framing && (
        <div className="field-card">
          <div className="f-label">AI framing<span className="evidence-tier confirmed">Confirmed</span></div>
          <div className="f-value"><strong>{narrative.framing.headline}</strong> {narrative.framing.body}</div>
        </div>
      )}
      {narrative.dedicatedSection && (
        <div className="field-card">
          <div className="f-label">Dedicated AI section in investor materials<span className="evidence-tier confirmed">Confirmed</span></div>
          <div className="f-value"><strong>{narrative.dedicatedSection.headline}</strong> {narrative.dedicatedSection.body}</div>
        </div>
      )}
    </>
  );
}

function LeadershipView({ leadership }: { leadership: Leadership }) {
  if (!leadership.presenter && (!leadership.sectorAppointments || !leadership.sectorAppointments.length)) return null;
  return (
    <>
      <SubheadStrip code="2B" title="Leadership" blurb="Who carries the AI story on stage" variant="green" />
      <div className="field-card">
        <div className="f-label">C-suite AI presenter<span className="evidence-tier confirmed">Confirmed</span></div>
        {leadership.presenter && (
          <>
            <div className="f-value" dangerouslySetInnerHTML={{ __html: leadership.presenter.html }} />
            {leadership.presenter.source && (
              <div style={{ marginTop: ".5rem" }}><SourceChip source={leadership.presenter.source} /></div>
            )}
          </>
        )}
        {leadership.sectorAppointments && leadership.sectorAppointments.length > 0 && (
          <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: ".5rem" }}>
              AI leadership appointments, sector
            </div>
            <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: 13, lineHeight: 1.6 }}>
              {leadership.sectorAppointments.map((a, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: a.html }} />
              ))}
            </ul>
            {leadership.appointmentsNote && (
              <div style={{ marginTop: ".5rem", fontSize: 11, color: "var(--text-dim)" }}>{leadership.appointmentsNote}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function ProductionView({ production }: { production: Production }) {
  const has = production.namedTools || production.consumerFacing || production.quantifiedROI || production.genAI || production.stackTable;
  if (!has) return null;
  return (
    <>
      <SubheadStrip code="2C" title="In production today" blurb="What's actually running, named and confirmed" variant="amber" />

      {production.namedTools && (
        <div className="field-card">
          <div className="f-label">Named production tools<span className="evidence-tier confirmed">Confirmed</span></div>
          <div className="f-value">
            <p><strong>{production.namedTools.tools.length} named tool{production.namedTools.tools.length === 1 ? "" : "s"} in production</strong></p>
            <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: 14 }}>
              {production.namedTools.tools.map((t, i) => (
                <li key={i} style={{ marginBottom: ".4rem" }}>
                  <span dangerouslySetInnerHTML={{ __html: t.html }} />
                  {t.source && (
                    <span style={{ marginLeft: ".4rem" }}>
                      <SourceChip source={t.source} marginZero />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {production.namedTools.sources && production.namedTools.sources.length > 0 && (
            <div style={{ marginTop: ".75rem" }}>
              {production.namedTools.sources.map((s, i) => <SourceChip key={i} source={s} />)}
            </div>
          )}
        </div>
      )}

      {production.consumerFacing && (
        <div className="field-card">
          <div className="f-label">Consumer-facing AI product<span className="evidence-tier confirmed">Confirmed</span></div>
          <div className="f-value" dangerouslySetInnerHTML={{ __html: production.consumerFacing }} />
        </div>
      )}

      {production.quantifiedROI && (
        <div className="field-card">
          <div className="f-label">Quantified ROI<span className="evidence-tier estimated">Estimated</span></div>
          <div className="f-value" dangerouslySetInnerHTML={{ __html: production.quantifiedROI.html }} />
          {production.quantifiedROI.source && (
            <div style={{ marginTop: ".5rem" }}><SourceChip source={production.quantifiedROI.source} /></div>
          )}
        </div>
      )}

      {production.genAI && (
        <div className="field-card">
          <div className="f-label">GenAI / LLM mentioned<span className="evidence-tier confirmed">Confirmed</span></div>
          <div className="f-value">
            <p>
              <strong>{production.genAI.mentioned ? "Yes." : "Not yet."}</strong>
              {production.genAI.mentionCount && ` "Generative AI" mentioned ${production.genAI.mentionCount} times in latest filings.`}
              {production.genAI.vendors && production.genAI.vendors.length > 0 && " Named vendors and startups:"}
            </p>
            {production.genAI.vendors && production.genAI.vendors.length > 0 && (
              <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", marginTop: ".5rem" }}>
                {production.genAI.vendors.map((v, i) =>
                  v.url ? (
                    <a key={i} className="source-chip" href={v.url} target="_blank" rel="noopener" style={{ background: "var(--bg)", border: "1px solid var(--border)", margin: 0 }}>
                      {v.name} ↗
                    </a>
                  ) : (
                    <span key={i} className="source-chip" style={{ background: "var(--bg)", border: "1px solid var(--border)", margin: 0 }}>{v.name}</span>
                  ),
                )}
              </div>
            )}
            {production.genAI.note && (
              <div style={{ marginTop: ".6rem", fontSize: 13, color: "var(--text-mid)" }}>{production.genAI.note}</div>
            )}
          </div>
        </div>
      )}

      {production.stackTable && production.stackTable.length > 0 && (
        <div className="field-card">
          <div className="f-label">AI &amp; analytics stack, double-click<span className="evidence-tier confirmed">Confirmed</span><span className="evidence-tier estimated" style={{ marginLeft: ".4rem" }}>Partial</span></div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--text-dim)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em" }}>
                <th style={{ padding: ".4rem .5rem", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>Layer</th>
                <th style={{ padding: ".4rem .5rem", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>Product</th>
                <th style={{ padding: ".4rem .5rem", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>Use</th>
                <th style={{ padding: ".4rem .5rem", borderBottom: "1px solid var(--border)", fontWeight: 500 }}>Source</th>
              </tr>
            </thead>
            <tbody>
              {production.stackTable.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: ".4rem .5rem", borderBottom: "1px solid var(--border)" }}>{row.layer}</td>
                  <td style={{ padding: ".4rem .5rem", borderBottom: "1px solid var(--border)" }}><strong>{row.product}</strong></td>
                  <td style={{ padding: ".4rem .5rem", borderBottom: "1px solid var(--border)" }}>{row.use}</td>
                  <td style={{ padding: ".4rem .5rem", borderBottom: "1px solid var(--border)" }}><SourceChip source={row.source} marginZero /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function VendorStackView({ vendorStack }: { vendorStack: VendorStack }) {
  if (!vendorStack.namedPartners || vendorStack.namedPartners.length === 0) return null;
  const featured = vendorStack.namedPartners.filter((p) => p.caseStudy);
  const others = vendorStack.namedPartners.filter((p) => !p.caseStudy);
  return (
    <>
      <SubheadStrip code="2D" title="The vendor stack" blurb="Who's behind the production tools" variant="blue" />
      <div className="field-card">
        <div className="f-label">Named AI vendor partners<span className="evidence-tier confirmed">Confirmed</span></div>

        {featured.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", marginBottom: others.length > 0 ? "1rem" : 0 }}>
            {featured.map((p, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid #3b6ba5",
                  borderRadius: 3,
                  padding: ".7rem .9rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: ".6rem", flexWrap: "wrap" }}>
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--text)" }}>{p.name}</strong>
                  {p.caseStudy && <SourceChip source={p.caseStudy} marginZero />}
                </div>
                {p.note && (
                  <div style={{ marginTop: ".4rem", fontSize: 13, color: "var(--text-mid)", lineHeight: 1.5 }}>{p.note}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div className="f-value" style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            {others.map((p, i) => (
              <span
                key={i}
                className="source-chip"
                style={{ background: "var(--bg)", border: "1px solid var(--border)", margin: 0 }}
                title={p.status === "absent" ? "No confirmed relationship" : undefined}
              >
                {p.name}
                {p.status === "absent" && <span style={{ color: "var(--text-dim)", marginLeft: ".3rem" }}>—</span>}
              </span>
            ))}
          </div>
        )}

        {vendorStack.partnersNote && (
          <div style={{ marginTop: ".75rem", fontSize: 13, color: "var(--text-mid)" }}>{vendorStack.partnersNote}</div>
        )}
      </div>
    </>
  );
}

function MaisonStripView({ byMaison, label }: { byMaison: ByMaison; label: string }) {
  if (!byMaison.maisons || byMaison.maisons.length === 0) return null;
  return (
    <>
      <SubheadStrip code="2E" title={label} blurb="Brand-by-brand AI footprint" variant="purple" />
      <div className="maison-strip">
        <h4>{label}</h4>
        {byMaison.maisons.map((m, i) => (
          <div key={i} className="maison">
            <span className="m-brand">{m.brand}</span>
            <span className="m-init">{m.description}</span>
            {m.source && <SourceChip source={m.source} />}
          </div>
        ))}
        {byMaison.note && (
          <div style={{ marginTop: ".75rem", fontSize: 11, color: "var(--text-dim)", fontStyle: "italic" }}>{byMaison.note}</div>
        )}
      </div>
    </>
  );
}

function FurtherReadingView({ items }: { items: Source[] }) {
  if (!items.length) return null;
  return (
    <div className="field-card" style={{ marginTop: "1rem" }}>
      <div className="f-label">Further reading</div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".4rem", marginTop: ".25rem" }}>
        {items.map((s, i) => <SourceChip key={i} source={s} />)}
      </div>
    </div>
  );
}

function MethodologyNote() {
  return (
    <div style={{ background: "var(--bg)", border: "1px dashed var(--border)", borderRadius: 4, padding: "1rem 1.25rem", marginTop: "1.5rem", fontSize: 12, color: "var(--text-mid)", lineHeight: 1.6 }}>
      <strong style={{ fontFamily: "var(--font-display)", color: "var(--text)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase" }}>Methodology note</strong>
      <br />
      Based on public data only: earnings calls, investor decks, annual reports, vendor press releases, regulatory filings. All lists are <strong>non-exhaustive</strong>: Rachel surfaces what companies publicly disclose. Private partnerships, unannounced pilots, and shadow-IT usage are out of scope. Every field carries an evidence tier (Confirmed / Estimated) and a source link.
    </div>
  );
}

function AsideRachelNotes({ notes }: { notes: RachelNote[] }) {
  return (
    <div className="card" style={{ marginBottom: "1rem", background: "linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-mid)", marginBottom: ".6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Rachel&apos;s notes <span className="evidence-tier estimated" style={{ fontSize: 9 }}>Editorial</span>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-mid)" }}>
        {notes.map((n, i) => (
          <p key={i} style={{ margin: i === notes.length - 1 ? 0 : "0 0 .5rem" }}>
            <strong style={{ color: "var(--text)" }}>{n.lead}</strong> {n.body}
          </p>
        ))}
      </div>
    </div>
  );
}

function AsidePeers({ peers }: { peers: PeerComparison[] }) {
  return (
    <div className="card" style={{ marginTop: "1rem" }}>
      <h4>Peer comparison</h4>
      <div style={{ fontSize: 12, color: "var(--text-mid)", lineHeight: 1.6, marginBottom: ".75rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
        {peers.map((p, i) => (
          <div key={i} style={{ padding: ".5rem .65rem", background: "var(--bg)", borderRadius: 3, borderLeft: `2px solid ${p.accent === "rust" ? "var(--rust)" : "var(--border)"}` }}>
            <strong style={{ fontSize: 11, color: "var(--text)" }}>vs {p.peer}</strong>
            <br />
            {p.note}
          </div>
        ))}
      </div>
    </div>
  );
}

function AsideSources({ sources }: { sources: Source[] }) {
  return (
    <div className="card" style={{ marginTop: "1rem" }}>
      <h4>Sources ({sources.length})</h4>
      <div style={{ fontSize: 12, color: "var(--text-mid)", display: "flex", flexDirection: "column", gap: ".4rem" }}>
        {sources.map((s, i) => <SourceChip key={i} source={s} />)}
      </div>
    </div>
  );
}

export default function CompanyProfile({ data }: { data: CompanyTemplateData }) {
  const breadcrumbs = data.sectorPath.length > 0 ? data.sectorPath : ["Companies", data.shortName];

  return (
    <div className="profile-page">
      <div className="page">
        <div className="profile-breadcrumbs">
          <Link href="/app/companies">Companies</Link>
          {breadcrumbs.slice(1).map((b, i) => (
            <span key={i}> → {b}</span>
          ))}
        </div>

        <div className="profile-header">
          <div>
            <h1 className="profile-title">{data.displayName}</h1>
          </div>
          <div className="profile-actions">
            <PriorityButton slug={data.slug} displayName={data.shortName} />
            <Link className="btn btn-secondary" href="/app/benchmark">Benchmark</Link>
          </div>
        </div>

        {data.cadence && <CadenceStripView cadence={data.cadence} />}

        {data.investor && (
          <details className="profile-accordion">
            <summary className="profile-accordion-summary">
              <span className="acc-chevron">▾</span>
              <span className="acc-code">Part 1</span>
              <span className="acc-title">Investor snapshot</span>
              {data.investor.fiscalYearLabel && (
                <span className="acc-suffix">{data.investor.fiscalYearLabel}</span>
              )}
            </summary>
            <div className="profile-accordion-body">
              <InvestorSnapshotView investor={data.investor} isPrivate={data.isPrivate} hideHeader />
            </div>
          </details>
        )}

        <details className="profile-accordion">
          <summary className="profile-accordion-summary">
            <span className="acc-chevron">▾</span>
            <span className="acc-code">Part 2</span>
            <span className="acc-title">AI perception</span>
            {data.aiPerception && (
              <span className={`score-pill ${quadrantClass(data.aiPerception.quadrant)}`} style={{ fontSize: 11, padding: ".3rem .75rem" }}>
                {data.aiPerception.label}
              </span>
            )}
          </summary>
          <div className="profile-accordion-body">
            {data.aiPerception && <AiPerceptionView perception={data.aiPerception} hideHeader />}
            {data.aiAct && <AIActReadinessView aiAct={data.aiAct} />}

            <div className="profile-grid">
              <div>
                {data.narrative && <NarrativeView narrative={data.narrative} />}
                {data.leadership && <LeadershipView leadership={data.leadership} />}
                {data.production && <ProductionView production={data.production} />}
                {data.vendorStack && <VendorStackView vendorStack={data.vendorStack} />}
                {data.byMaison && (
                  <MaisonStripView
                    byMaison={data.byMaison}
                    label={data.sectorPath.includes("Luxury") ? "Maison highlights" : "Brand highlights"}
                  />
                )}
                {data.furtherReading && <FurtherReadingView items={data.furtherReading} />}
                <MethodologyNote />
              </div>

              <aside>
                {data.rachelNotes && data.rachelNotes.length > 0 && <AsideRachelNotes notes={data.rachelNotes} />}
                {data.peerComparison && data.peerComparison.length > 0 && <AsidePeers peers={data.peerComparison} />}
                {data.sources && data.sources.length > 0 && <AsideSources sources={data.sources} />}
              </aside>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
