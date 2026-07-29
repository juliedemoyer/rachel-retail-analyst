"use client";

/**
 * SourcesBar — top-nav Sources button + modal (Pillar 3b-i).
 *
 * Three sections inside the modal:
 *   1. Companies being scraped — watchlist with IR status per company
 *   2. News & research sources — all RSS / vendor / IR / custom feeds
 *   3. Coverage map — tier counts + "why isn't X covered?" search
 *
 * Data: GET /api/sources → { sources: SourceRecord[], coverage: { 1,2,3 } }
 * Data: GET /api/ir/status → { statuses: IRStatus[] }
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { X, Plus, Radio, RefreshCw, AlertCircle, CheckCircle, Clock, ChevronRight } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SourceRecord {
  id: string;
  name: string;
  url: string;
  tier: 1 | 2 | 3;
  kind: "rss" | "ir" | "vendor_scrape" | "manual";
  cadence: string;
  addedBy: string;
  addedAt: string;
  lastPollAt?: string;
  lastPollStatus?: "ok" | "error" | "stale";
  itemsIngested?: number;
}

interface IRStatus {
  accountId: string;
  company: string;
  irUrl: string;
  lastScrapedAt?: string;
  lastScrapeStatus?: "ok" | "error" | "stale";
  latestReport?: { period: string; date: string; type: string };
  nextReport?: { expectedPeriod: string; expectedDate: string; confidence: "high" | "medium" | "low" };
  reportingPattern: string;
  ingestedCount: number;
}

interface CoverageCount {
  count: number;
}

interface SourcesData {
  sources: SourceRecord[];
  coverage: Record<1 | 2 | 3, CoverageCount>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function shortDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function HealthDot({ status }: { status?: "ok" | "error" | "stale" }) {
  if (status === "ok") return <CheckCircle size={11} strokeWidth={1.25} className="text-[var(--color-forest)] shrink-0" />;
  if (status === "error") return <AlertCircle size={11} strokeWidth={1.25} className="text-[var(--color-clay)] shrink-0" />;
  return <Clock size={11} strokeWidth={1.25} className="text-[var(--color-ink-muted)] shrink-0" />;
}

const KIND_LABEL: Record<SourceRecord["kind"], string> = {
  rss: "RSS",
  ir: "IR",
  vendor_scrape: "Vendor",
  manual: "Manual",
};

const TIER_LABEL: Record<1 | 2 | 3, string> = {
  1: "Strategy firms & IR",
  2: "Industry press & analysts",
  3: "Evergreen frameworks",
};

// ── Add Source Form ───────────────────────────────────────────────────────────

interface AddSourceFormProps {
  onAdded: () => void;
  onCancel: () => void;
}

function AddSourceForm({ onAdded, onCancel }: AddSourceFormProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [kind, setKind] = useState<SourceRecord["kind"]>("rss");
  const [tier, setTier] = useState<1 | 2 | 3>(2);
  const [cadence, setCadence] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url, kind, tier, cadence: cadence || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to add source");
      onAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 pt-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs text-[var(--color-ink-muted)] mb-1">Source name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Retail Dive"
            className="w-full text-sm border border-[var(--color-border)] rounded px-2 py-1.5 bg-[var(--color-canvas)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ochre)]"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs text-[var(--color-ink-muted)] mb-1">URL</label>
          <input
            required
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://feeds.retaildive.com/…"
            className="w-full text-sm border border-[var(--color-border)] rounded px-2 py-1.5 bg-[var(--color-canvas)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ochre)]"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--color-ink-muted)] mb-1">Kind</label>
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as SourceRecord["kind"])}
            className="w-full text-sm border border-[var(--color-border)] rounded px-2 py-1.5 bg-[var(--color-canvas)] focus:outline-none"
          >
            <option value="rss">RSS</option>
            <option value="ir">IR</option>
            <option value="vendor_scrape">Vendor scrape</option>
            <option value="manual">Manual</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-[var(--color-ink-muted)] mb-1">Tier</label>
          <select
            value={tier}
            onChange={(e) => setTier(Number(e.target.value) as 1 | 2 | 3)}
            className="w-full text-sm border border-[var(--color-border)] rounded px-2 py-1.5 bg-[var(--color-canvas)] focus:outline-none"
          >
            <option value={1}>Tier 1 — Strategy / IR</option>
            <option value={2}>Tier 2 — Industry press</option>
            <option value={3}>Tier 3 — Evergreen</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-xs text-[var(--color-ink-muted)] mb-1">Cadence (optional)</label>
          <input
            value={cadence}
            onChange={(e) => setCadence(e.target.value)}
            placeholder="Every 30 min (weekdays)"
            className="w-full text-sm border border-[var(--color-border)] rounded px-2 py-1.5 bg-[var(--color-canvas)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ochre)]"
          />
        </div>
      </div>
      {error && <p className="text-xs text-[var(--color-clay)]">{error}</p>}
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs px-3 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface)] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="text-xs px-3 py-1.5 rounded bg-[var(--color-ink)] text-[var(--color-canvas)] hover:bg-[var(--color-ink-secondary)] transition-colors disabled:opacity-50"
        >
          {submitting ? "Testing URL…" : "Add source"}
        </button>
      </div>
    </form>
  );
}

// ── Section: Companies ────────────────────────────────────────────────────────

function CompaniesSection({ irStatuses }: { irStatuses: IRStatus[] }) {
  return (
    <div className="space-y-1">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[var(--color-ink-muted)] border-b border-[var(--color-border)]">
            <th className="text-left font-normal pb-1.5">Company</th>
            <th className="text-left font-normal pb-1.5">Latest report</th>
            <th className="text-left font-normal pb-1.5">Next expected</th>
            <th className="text-left font-normal pb-1.5">Docs</th>
            <th className="text-left font-normal pb-1.5">Health</th>
          </tr>
        </thead>
        <tbody>
          {irStatuses.map((ir) => (
            <tr key={ir.accountId} className="border-b border-[var(--color-border)] border-opacity-40 hover:bg-[var(--color-surface)] transition-colors">
              <td className="py-2 pr-4 font-medium text-[var(--color-ink)]">
                <a
                  href={ir.irUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-2"
                >
                  {ir.company}
                </a>
              </td>
              <td className="py-2 pr-4 font-mono text-[var(--color-ink-secondary)]">
                {ir.latestReport
                  ? `${ir.latestReport.period} · ${shortDate(ir.latestReport.date)}`
                  : "—"}
              </td>
              <td className="py-2 pr-4 font-mono text-[var(--color-ink-secondary)]">
                {ir.nextReport
                  ? `${ir.nextReport.expectedPeriod} · ${shortDate(ir.nextReport.expectedDate)}`
                  : "—"}
              </td>
              <td className="py-2 pr-4 font-mono text-[var(--color-ink-secondary)]">
                {ir.ingestedCount}
              </td>
              <td className="py-2">
                <HealthDot status={ir.lastScrapeStatus} />
              </td>
            </tr>
          ))}
          {irStatuses.length === 0 && (
            <tr>
              <td colSpan={5} className="py-4 text-center text-[var(--color-ink-muted)]">
                No IR data yet — nightly cron runs at 00:00 UTC
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Section: Feeds ────────────────────────────────────────────────────────────

function FeedsSection({
  sources,
  onRefetch,
}: {
  sources: SourceRecord[];
  onRefetch: () => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const grouped: Record<string, SourceRecord[]> = {
    ir: sources.filter((s) => s.kind === "ir"),
    vendor_scrape: sources.filter((s) => s.kind === "vendor_scrape"),
    rss: sources.filter((s) => s.kind === "rss"),
    manual: sources.filter((s) => s.kind === "manual"),
  };

  const kindHeading: Record<string, string> = {
    ir: "Investor Relations",
    vendor_scrape: "Vendor stacks",
    rss: "RSS feeds",
    manual: "Manual / custom",
  };

  async function deleteSource(id: string) {
    setDeletingId(id);
    await fetch(`/api/sources?id=${id}`, { method: "DELETE" });
    setDeletingId(null);
    onRefetch();
  }

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([kind, items]) => {
        if (items.length === 0) return null;
        return (
          <div key={kind}>
            <p className="text-xs text-[var(--color-ink-muted)] uppercase tracking-wide mb-1.5">
              {kindHeading[kind]}
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[var(--color-ink-muted)] border-b border-[var(--color-border)]">
                  <th className="text-left font-normal pb-1.5">Source</th>
                  <th className="text-left font-normal pb-1.5">Tier</th>
                  <th className="text-left font-normal pb-1.5">Cadence</th>
                  <th className="text-left font-normal pb-1.5">Last poll</th>
                  <th className="text-left font-normal pb-1.5">Items (7d)</th>
                  <th className="text-left font-normal pb-1.5">Health</th>
                  <th className="pb-1.5" />
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-[var(--color-border)] border-opacity-40 hover:bg-[var(--color-surface)] transition-colors"
                  >
                    <td className="py-2 pr-4 font-medium text-[var(--color-ink)] max-w-[200px] truncate">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-2"
                        title={s.url}
                      >
                        {s.name}
                      </a>
                    </td>
                    <td className="py-2 pr-4 text-[var(--color-ink-secondary)]">{s.tier}</td>
                    <td className="py-2 pr-4 text-[var(--color-ink-secondary)]">{s.cadence}</td>
                    <td className="py-2 pr-4 font-mono text-[var(--color-ink-secondary)]">
                      {shortDate(s.lastPollAt)}
                    </td>
                    <td className="py-2 pr-4 font-mono text-[var(--color-ink-secondary)]">
                      {s.itemsIngested ?? "—"}
                    </td>
                    <td className="py-2 pr-4">
                      <HealthDot status={s.lastPollStatus} />
                    </td>
                    <td className="py-2">
                      {s.id.startsWith("custom-") && (
                        <button
                          onClick={() => deleteSource(s.id)}
                          disabled={deletingId === s.id}
                          className="text-[var(--color-ink-muted)] hover:text-[var(--color-clay)] transition-colors disabled:opacity-40"
                          title="Remove source"
                        >
                          <X size={11} strokeWidth={1.25} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}

      {/* Add source */}
      {showAddForm ? (
        <div className="rounded border border-[var(--color-border)] p-3">
          <p className="text-xs font-medium text-[var(--color-ink)] mb-2">Add a source</p>
          <AddSourceForm
            onAdded={() => {
              setShowAddForm(false);
              onRefetch();
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1.5 text-xs text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors"
        >
          <Plus size={12} strokeWidth={1.25} />
          Add source
        </button>
      )}
    </div>
  );
}

// ── Section: Coverage ─────────────────────────────────────────────────────────

function CoverageSection({
  coverage,
  sources,
}: {
  coverage: Record<1 | 2 | 3, CoverageCount>;
  sources: SourceRecord[];
}) {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  function runSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const match = sources.find(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.url.toLowerCase().includes(q),
    );
    if (match) {
      setAnswer(
        `"${match.name}" is covered — ${KIND_LABEL[match.kind]} · Tier ${match.tier} · ${match.cadence}`,
      );
    } else {
      setAnswer(
        `"${query}" is not covered yet. To add it, click "Add source" in the News & Research section and paste its RSS feed or URL.`,
      );
    }
  }

  // Count items this week per tier (rough 7d proxy using lastPollAt)
  const tierItems: Record<1 | 2 | 3, number> = { 1: 0, 2: 0, 3: 0 };
  for (const s of sources) {
    const t = s.tier as 1 | 2 | 3;
    tierItems[t] += s.itemsIngested ?? 0;
  }

  return (
    <div className="space-y-4">
      {/* Tier count chips */}
      <div className="flex flex-wrap gap-3">
        {([1, 2, 3] as const).map((t) => (
          <div
            key={t}
            className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs"
          >
            <p className="font-medium text-[var(--color-ink)] mb-0.5">
              Tier {t} — {TIER_LABEL[t]}
            </p>
            <p className="font-mono text-[var(--color-ink-secondary)]">
              {coverage[t]?.count ?? 0} sources · {tierItems[t]} items
            </p>
          </div>
        ))}
      </div>

      {/* Coverage search */}
      <div>
        <p className="text-xs text-[var(--color-ink-muted)] mb-2">
          Why isn&apos;t X covered?
        </p>
        <form onSubmit={runSearch} className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Financial Times, Reuters, Kantar…"
            className="flex-1 text-sm border border-[var(--color-border)] rounded px-2 py-1.5 bg-[var(--color-canvas)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ochre)]"
          />
          <button
            type="submit"
            className="text-xs px-3 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface)] transition-colors flex items-center gap-1"
          >
            <ChevronRight size={12} strokeWidth={1.25} />
            Check
          </button>
        </form>
        {answer && (
          <p className="mt-2 text-xs text-[var(--color-ink-secondary)] leading-relaxed">{answer}</p>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Tab = "companies" | "feeds" | "coverage";

export function SourcesBar() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("companies");
  const [sourcesData, setSourcesData] = useState<SourcesData | null>(null);
  const [irStatuses, setIrStatuses] = useState<IRStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<number>(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [srcRes, irRes] = await Promise.all([
        fetch("/api/sources"),
        fetch("/api/ir/status"),
      ]);
      const [srcData, irData] = await Promise.all([srcRes.json(), irRes.json()]);
      setSourcesData(srcData);
      setIrStatuses(irData.statuses ?? []);
      setLastFetched(Date.now());
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on first open, then only if stale (>5 min)
  useEffect(() => {
    if (!open) return;
    if (Date.now() - lastFetched < 5 * 60 * 1000) return;
    fetchData();
  }, [open, fetchData, lastFetched]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const totalSources = sourcesData?.sources.length ?? 0;
  const healthOk = sourcesData?.sources.filter((s) => s.lastPollStatus === "ok").length ?? 0;

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors"
        title="View all monitored sources"
      >
        <Radio size={14} strokeWidth={1.25} />
        Sources
        {totalSources > 0 && (
          <span className="font-mono text-xs text-[var(--color-ink-muted)]">
            {healthOk}/{totalSources}
          </span>
        )}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 backdrop-blur-sm pt-16 px-4">
          <div
            ref={dialogRef}
            className="w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-canvas)] shadow-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
              <div>
                <h2 className="font-serif text-lg text-[var(--color-ink)]">Sources</h2>
                <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                  What Rachel is watching and when she last checked
                </p>
              </div>
              <div className="flex items-center gap-3">
                {loading && (
                  <RefreshCw size={13} strokeWidth={1.25} className="text-[var(--color-ink-muted)] animate-spin" />
                )}
                <button
                  onClick={fetchData}
                  disabled={loading}
                  title="Refresh"
                  className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors disabled:opacity-40"
                >
                  <RefreshCw size={14} strokeWidth={1.25} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
                >
                  <X size={16} strokeWidth={1.25} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b border-[var(--color-border)] px-5">
              {(
                [
                  { id: "companies", label: "Companies" },
                  { id: "feeds", label: "News & Research" },
                  { id: "coverage", label: "Coverage" },
                ] as { id: Tab; label: string }[]
              ).map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`text-sm px-0 py-3 mr-6 border-b-2 transition-colors ${
                    tab === id
                      ? "border-[var(--color-ink)] text-[var(--color-ink)]"
                      : "border-transparent text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {!sourcesData && !loading ? (
                <p className="text-sm text-[var(--color-ink-muted)] text-center py-8">
                  Loading sources…
                </p>
              ) : (
                <>
                  {tab === "companies" && <CompaniesSection irStatuses={irStatuses} />}
                  {tab === "feeds" && (
                    <FeedsSection
                      sources={sourcesData?.sources ?? []}
                      onRefetch={fetchData}
                    />
                  )}
                  {tab === "coverage" && (
                    <CoverageSection
                      coverage={sourcesData?.coverage ?? { 1: { count: 0 }, 2: { count: 0 }, 3: { count: 0 } }}
                      sources={sourcesData?.sources ?? []}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
