import type { Metadata } from "next";

// Revalidate the whole page once a week. The cumulative counters grow daily
// and the benchmark estimates are reviewed manually on the same cadence.
export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Rachel Impact",
  description: "What changes when an analyst has an AI layer.",
};

const GO_LIVE = new Date("2026-01-06");

const TIME_BREAKDOWN = [
  { activity: "Morning intel brief, 50 companies + 4 newsletters", manual: 150, withRachel: 3 },
  { activity: "Earnings press release read + profile update", manual: 60, withRachel: 5 },
  { activity: "Newsletter curation, extract relevant items", manual: 40, withRachel: 1 },
  { activity: "Sprint planning + cross-agent coordination", manual: 20, withRachel: 1 },
  { activity: "Company profile deep update", manual: 45, withRachel: 5 },
];

// Daily saved: brief + newsletter + coordination (most common daily pattern)
const DAILY_HOURS_SAVED = (150 - 3 + 40 - 1 + 20 - 1) / 60; // ~3.4h

async function fetchPulseCount(): Promise<number> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://your-deployment.vercel.app";
    const res = await fetch(`${base}/api/pulse/items`, { next: { revalidate: 604800 } });
    if (!res.ok) return 0;
    const data = await res.json();
    const arr = Array.isArray(data) ? data : (data.items ?? []);
    return arr.length;
  } catch {
    return 0;
  }
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)]">
      <div className="font-display text-[10px] uppercase tracking-widest text-[var(--color-text-dim)] mb-2">
        {label}
      </div>
      <div
        className="font-display text-3xl font-semibold"
        style={{ color: "var(--color-rust)" }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-xs text-[var(--color-text-dim)] mt-1">{sub}</div>
      )}
    </div>
  );
}

export default async function ImpactPage() {
  const pulseCount = await fetchPulseCount();

  const today = new Date();
  const lastUpdated = today.toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
  const daysSinceLive = Math.max(
    1,
    Math.floor((today.getTime() - GO_LIVE.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const totalHoursSaved = Math.round(daysSinceLive * DAILY_HOURS_SAVED);
  const briefsDelivered = Math.round(daysSinceLive * 0.8);
  const earningsDigested = Math.round(daysSinceLive / 90 * 50); // ~50 companies, quarterly

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <div className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] mb-1">Methodology</div>
        <h1 className="font-display text-2xl font-semibold mb-1">Rachel Impact</h1>
        <p className="text-sm text-[var(--color-text-mid)] max-w-[72ch] leading-relaxed">
          Rachel is not just faster, it changes what is possible. This page tracks time saved on
          routine analyst work, the coverage gap between a solo analyst and an AI-assisted one,
          and the volume of intel output produced since go-live.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)]">
            Updated weekly
          </span>
          <span className="text-[var(--color-border-strong)]">·</span>
          <span className="text-[10px] text-[var(--color-text-dim)]">last rendered {lastUpdated}</span>
        </div>
      </div>

      {/* Section 1: Hours reclaimed */}
      <div className="mb-10">
        <h2 className="font-display text-[11px] uppercase tracking-widest text-[var(--color-text-dim)] mb-4">
          Hours reclaimed
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <StatCard
            label="Total since go-live"
            value={`${totalHoursSaved}h`}
            sub={`across ${daysSinceLive} days`}
          />
          <StatCard
            label="Saved per brief day"
            value="~3.4h"
            sub="brief + newsletters + coordination"
          />
          <StatCard
            label="Per earnings refresh"
            value="~55 min"
            sub="IR read, profile update, pulse item"
          />
        </div>

        {/* Time breakdown table */}
        <div className="border border-[var(--color-border)] rounded-[var(--radius)] overflow-hidden">
          <div className="grid grid-cols-[1fr_80px_80px_80px] gap-0 bg-[var(--color-surface-2)] border-b border-[var(--color-border)] px-4 py-2">
            <span className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)]">Activity</span>
            <span className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] text-right">Manual</span>
            <span className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] text-right">With Rachel</span>
            <span className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] text-right">Saved</span>
          </div>
          {TIME_BREAKDOWN.map((row, i) => (
            <div
              key={row.activity}
              className={`grid grid-cols-[1fr_80px_80px_80px] gap-0 px-4 py-3 ${i < TIME_BREAKDOWN.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
              style={{ background: i % 2 === 0 ? "var(--color-surface)" : "transparent" }}
            >
              <span className="text-sm text-[var(--color-text)]">{row.activity}</span>
              <span className="text-sm text-[var(--color-text-mid)] text-right">{row.manual} min</span>
              <span className="text-sm text-[var(--color-text-mid)] text-right">{row.withRachel} min</span>
              <span
                className="text-sm font-medium text-right"
                style={{ color: "var(--color-rust)" }}
              >
                {row.manual - row.withRachel} min
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Coverage you couldn't have otherwise */}
      <div className="mb-10">
        <h2 className="font-display text-[11px] uppercase tracking-widest text-[var(--color-text-dim)] mb-1">
          Coverage you couldn&apos;t have otherwise
        </h2>
        <p className="text-xs text-[var(--color-text-dim)] mb-4">
          A solo analyst can track 6-8 companies in depth. Rachel monitors 50.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-[var(--color-border-strong)] rounded-[var(--radius)] overflow-hidden">
          <div className="p-5 bg-[var(--color-surface)]">
            <div className="font-display text-[10px] uppercase tracking-widest text-[var(--color-text-dim)] mb-3">
              Without AI
            </div>
            <ul className="m-0 pl-5 text-sm leading-8 text-[var(--color-text-mid)] space-y-0.5 list-disc">
              <li>6-8 companies tracked in depth</li>
              <li>1 sector in focus at a time</li>
              <li>Earnings read 2-3 days after print</li>
              <li>Cross-agent signals over Slack or email</li>
              <li>Newsletter backlog accumulates</li>
            </ul>
          </div>
          <div className="p-5 bg-[var(--color-surface-2)]">
            <div
              className="font-display text-[10px] uppercase tracking-widest mb-3"
              style={{ color: "var(--color-rust)" }}
            >
              With Rachel
            </div>
            <ul className="m-0 pl-5 text-sm leading-8 text-[var(--color-text)] space-y-0.5 list-disc">
              <li>50 companies monitored daily</li>
              <li>6 sectors tracked simultaneously</li>
              <li>Earnings profile refreshed same day</li>
              <li>Cross-agent signals posted to sprint board automatically</li>
              <li>4 newsletters ingested and filtered every morning</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 3: Intel output */}
      <div className="mb-6">
        <h2 className="font-display text-[11px] uppercase tracking-widest text-[var(--color-text-dim)] mb-4">
          Intel output since go-live
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Briefs delivered"
            value={String(briefsDelivered)}
            sub="~5 per working week"
          />
          <StatCard
            label="Pulse items surfaced"
            value={pulseCount > 0 ? String(pulseCount) : "—"}
            sub="live from Redis"
          />
          <StatCard
            label="Companies maintained"
            value="50"
            sub="across 6 sectors"
          />
          <StatCard
            label="Earnings digested"
            value={`~${earningsDigested}`}
            sub="since Jan 2026"
          />
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] mb-1">Live</div>
            <p className="text-xs text-[var(--color-text-mid)] leading-relaxed">Pulse item count, fetched from Redis and refreshed with the page.</p>
          </div>
          <div>
            <div className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] mb-1">Calculated</div>
            <p className="text-xs text-[var(--color-text-mid)] leading-relaxed">Cumulative hours, briefs, and earnings figures. Recalculated from the go-live date each time the page renders.</p>
          </div>
          <div>
            <div className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] mb-1">Estimated</div>
            <p className="text-xs text-[var(--color-text-mid)] leading-relaxed">Time benchmarks in the breakdown table. Based on timed sessions with a small group of early testers, senior EMEA retail analysts working without specialist tools. Individual results vary.</p>
          </div>
        </div>
        <p className="text-[11px] text-[var(--color-text-dim)]">
          Page last rendered {lastUpdated}. Benchmark estimates reviewed manually on the same weekly cadence.
        </p>
      </div>

    </div>
  );
}
