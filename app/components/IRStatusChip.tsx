"use client";

/**
 * IRStatusChip — compact investor-relations status badge.
 *
 * Shows the latest scraped report period + date and the predicted next report.
 * Clicking expands to a mini-drawer with the full IR health snapshot.
 *
 * Usage:
 *   <IRStatusChip accountId="carrefour" />
 *
 * Props are fetched from /api/ir/status on mount (shared across all chips via
 * a simple module-level promise so the request fires once per page render).
 */

import { useEffect, useState, useCallback } from "react";
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

// ── Types (mirror lib/sources/ir-scraper.ts) ────────────────────────────────

interface IRStatus {
  accountId: string;
  company: string;
  irUrl: string;
  lastScrapedAt?: string;
  lastScrapeStatus?: "ok" | "error" | "stale";
  latestReport?: {
    period: string;
    type: string;
    date: string;
    url?: string;
    docId?: string;
  };
  nextReport?: {
    expectedPeriod: string;
    expectedDate: string;
    confidence: "high" | "medium" | "low";
  };
  reportingPattern: string;
  ingestedCount: number;
}

// ── Module-level cache (one fetch per page load) ─────────────────────────────

let statusCache: IRStatus[] | null = null;
let fetchPromise: Promise<IRStatus[]> | null = null;

function fetchAllStatuses(): Promise<IRStatus[]> {
  if (statusCache) return Promise.resolve(statusCache);
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/api/ir/status")
    .then((r) => r.json())
    .then((data: { statuses?: IRStatus[] }) => {
      statusCache = data.statuses ?? [];
      return statusCache;
    })
    .catch(() => {
      statusCache = [];
      return [];
    });

  return fetchPromise;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatShortDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" });
}

function confidenceLabel(confidence: "high" | "medium" | "low"): string {
  return confidence === "high" ? "" : confidence === "medium" ? "~" : "?";
}

// ── Component ────────────────────────────────────────────────────────────────

interface IRStatusChipProps {
  accountId: string;
  /** If true, shows a more compact single-line format */
  compact?: boolean;
}

export function IRStatusChip({ accountId, compact = false }: IRStatusChipProps) {
  const [status, setStatus] = useState<IRStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchAllStatuses().then((statuses) => {
      const match = statuses.find((s) => s.accountId === accountId);
      setStatus(match ?? null);
      setLoading(false);
    });
  }, [accountId]);

  const toggle = useCallback(() => setExpanded((e) => !e), []);

  if (loading) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-[var(--color-ink-muted)] animate-pulse">
        <Clock size={11} strokeWidth={1.25} />
        Loading IR…
      </span>
    );
  }

  if (!status) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-[var(--color-ink-muted)]">
        <AlertCircle size={11} strokeWidth={1.25} />
        No IR data
      </span>
    );
  }

  const healthColor =
    status.lastScrapeStatus === "ok"
      ? "text-[var(--color-forest)]"
      : status.lastScrapeStatus === "error"
        ? "text-[var(--color-clay)]"
        : "text-[var(--color-ink-muted)]";

  const HealthIcon =
    status.lastScrapeStatus === "ok"
      ? CheckCircle
      : status.lastScrapeStatus === "error"
        ? AlertCircle
        : Clock;

  const latestLabel = status.latestReport
    ? `${status.latestReport.period} · ${formatShortDate(status.latestReport.date)}`
    : "No report yet";

  const nextLabel = status.nextReport
    ? `Next: ${confidenceLabel(status.nextReport.confidence)}${status.nextReport.expectedPeriod} · ${formatShortDate(status.nextReport.expectedDate)}`
    : null;

  if (compact) {
    return (
      <span
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
        className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-mono text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors"
        title={nextLabel ?? ""}
      >
        <HealthIcon size={10} strokeWidth={1.25} className={healthColor} />
        {latestLabel}
        {nextLabel && (
          <>
            <span className="opacity-40">·</span>
            <span className="opacity-70">{nextLabel}</span>
          </>
        )}
      </span>
    );
  }

  return (
    <div className="w-full">
      {/* Chip row */}
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors w-full text-left"
      >
        <HealthIcon size={10} strokeWidth={1.25} className={healthColor} />
        <span>{latestLabel}</span>
        {nextLabel && (
          <>
            <span className="opacity-40 mx-0.5">→</span>
            <span className="opacity-70">{nextLabel}</span>
          </>
        )}
        {expanded ? (
          <ChevronUp size={10} strokeWidth={1.25} className="ml-auto opacity-50" />
        ) : (
          <ChevronDown size={10} strokeWidth={1.25} className="ml-auto opacity-50" />
        )}
      </button>

      {/* Expanded drawer */}
      {expanded && (
        <div className="mt-2 rounded border border-[var(--color-border)] bg-[var(--color-canvas)] p-3 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[var(--color-ink-muted)]">IR page</span>
            <a
              href={status.irUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink-secondary)] underline underline-offset-2 hover:text-[var(--color-ink)]"
            >
              {new URL(status.irUrl).hostname}
            </a>
          </div>

          {status.latestReport && (
            <div className="flex justify-between">
              <span className="text-[var(--color-ink-muted)]">Latest</span>
              <span className="font-mono">
                {status.latestReport.period} · {status.latestReport.type} ·{" "}
                {formatShortDate(status.latestReport.date)}
              </span>
            </div>
          )}

          {status.nextReport && (
            <div className="flex justify-between">
              <span className="text-[var(--color-ink-muted)]">Expected next</span>
              <span className="font-mono">
                {status.nextReport.expectedPeriod} · {formatShortDate(status.nextReport.expectedDate)}
                {status.nextReport.confidence !== "high" && (
                  <span className="ml-1 opacity-50">({status.nextReport.confidence})</span>
                )}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-[var(--color-ink-muted)]">Cadence</span>
            <span className="font-mono capitalize">{status.reportingPattern}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[var(--color-ink-muted)]">Docs ingested</span>
            <span className="font-mono">{status.ingestedCount}</span>
          </div>

          {status.lastScrapedAt && (
            <div className="flex justify-between">
              <span className="text-[var(--color-ink-muted)]">Last scraped</span>
              <span className="font-mono">{formatShortDate(status.lastScrapedAt)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
