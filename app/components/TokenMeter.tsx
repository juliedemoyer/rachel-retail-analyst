"use client";

/**
 * TokenMeter — top-nav token usage chip.
 *
 * Polls /api/tokens/today every 60 s. Shows:
 *   Today's tokens: 142k in · 38k out · $0.83
 * Clicking opens a mini-dashboard drawer with per-workflow breakdown
 * and a daily cap progress bar.
 *
 * Design: rachel-v2 tokens throughout. Bar turns rust at 75%, deep rust at 100%.
 * Pillar 3b-ii.
 */

import { useState, useEffect, useRef } from "react";

interface WorkflowStats {
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  calls: number;
}

interface TokenData {
  totalCostUsd: number;
  budgetUsd: number;
  pct: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  byWorkflow: Record<string, WorkflowStats>;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(n);
}

function fmtWorkflow(key: string): string {
  return key.replace(/_/g, " ");
}

export default function TokenMeter() {
  const [data, setData] = useState<TokenData | null>(null);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  async function fetchData() {
    try {
      const res = await fetch("/api/tokens/today");
      if (res.ok) {
        const json = await res.json() as TokenData;
        setData(json);
      }
    } catch {
      // silent — meter is non-critical
    }
  }

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60_000);
    return () => clearInterval(id);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!data) {
    return (
      <span
        className="mono"
        style={{ fontSize: "0.62rem", color: "var(--color-text-dim)", letterSpacing: "0.1em" }}
      >
        —
      </span>
    );
  }

  const barColor =
    data.pct >= 100
      ? "var(--color-rust)"
      : data.pct >= 75
        ? "var(--color-rust)"
        : "var(--color-sage)";

  const barBg = data.pct >= 75 ? "var(--color-rust-dim)" : "var(--color-surface-2)";

  const sortedWorkflows = Object.entries(data.byWorkflow).sort(
    ([, a], [, b]) => b.costUsd - a.costUsd,
  );

  return (
    <div style={{ position: "relative" }} ref={drawerRef}>
      {/* Chip */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="mono"
        style={{
          background: "none",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-sm)",
          padding: "0.2rem 0.55rem",
          cursor: "pointer",
          fontSize: "0.62rem",
          color: "var(--color-text-mid)",
          letterSpacing: "0.08em",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "var(--color-text-dim)" }}>tokens</span>
        <span>
          {fmt(data.totalInputTokens)} in · {fmt(data.totalOutputTokens)} out ·{" "}
          <span style={{ color: data.pct >= 75 ? "var(--color-rust)" : "var(--color-text)" }}>
            ${data.totalCostUsd.toFixed(2)}
          </span>
        </span>
      </button>

      {/* Drawer */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 0.5rem)",
            right: 0,
            width: "22rem",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            padding: "1rem",
            zIndex: 50,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
            <span className="label">Token usage today</span>
            <span className="mono" style={{ fontSize: "0.62rem", color: "var(--color-text-dim)" }}>
              {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </span>
          </div>

          {/* Budget bar */}
          <div style={{ marginBottom: "0.85rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.3rem",
              }}
            >
              <span className="mono" style={{ fontSize: "0.6rem", color: "var(--color-text-dim)" }}>
                daily cap ${data.budgetUsd.toFixed(0)}
              </span>
              <span
                className="mono"
                style={{
                  fontSize: "0.6rem",
                  color: data.pct >= 75 ? "var(--color-rust)" : "var(--color-text-mid)",
                  fontWeight: 600,
                }}
              >
                {data.pct}%
              </span>
            </div>
            <div
              style={{
                height: "3px",
                background: barBg,
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${data.pct}%`,
                  background: barColor,
                  borderRadius: "2px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* By workflow */}
          {sortedWorkflows.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <span
                className="mono"
                style={{
                  fontSize: "0.58rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--color-text-dim)",
                  marginBottom: "0.15rem",
                }}
              >
                by workflow
              </span>
              {sortedWorkflows.map(([wf, stats]) => (
                <div
                  key={wf}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.25rem 0",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <span
                    style={{ fontSize: "0.75rem", color: "var(--color-text-mid)" }}
                  >
                    {fmtWorkflow(wf)}
                  </span>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <span className="mono" style={{ fontSize: "0.65rem", color: "var(--color-text-dim)" }}>
                      {fmt(stats.inputTokens + stats.outputTokens)} tok
                    </span>
                    <span className="mono" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                      ${stats.costUsd.toFixed(3)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-dim)", textAlign: "center", padding: "0.75rem 0" }}>
              No calls yet today.
            </p>
          )}

          {/* Totals */}
          <div
            style={{
              marginTop: "0.75rem",
              paddingTop: "0.6rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span className="mono" style={{ fontSize: "0.65rem", color: "var(--color-text-dim)" }}>
              {fmt(data.totalInputTokens)} in · {fmt(data.totalOutputTokens)} out
            </span>
            <span
              className="mono"
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: data.pct >= 75 ? "var(--color-rust)" : "var(--color-text)",
              }}
            >
              ${data.totalCostUsd.toFixed(2)} / ${data.budgetUsd.toFixed(0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
