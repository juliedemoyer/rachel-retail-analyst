"use client";

import { useEffect, useState, useMemo } from "react";
import { routeModel } from "@/lib/agents/model-router";
import { SUGGESTED_PROMPTS } from "@/lib/prompts/library";

interface CoverageData {
  totalDocs: number;
  companiesCovered: number;
}

interface QuotaData {
  cap: { monthlyQuestions: number; monthlyUsd: number };
  questionsThisMonth: number;
  questionsToday: number;
  monthlyQuestionsRemaining: number;
  blocked: boolean;
  estCostPerQuestionEur: number;
}

interface EvalData {
  available: boolean;
  week: string | null;
  passRate: number | null;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius)",
        background: "var(--color-surface)",
        padding: "0.85rem 1rem",
      }}
    >
      <span
        className="label"
        style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.58rem" }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}

export default function AskSidebar({
  input,
  onPromptSelect,
  quota,
}: {
  input: string;
  onPromptSelect: (p: string) => void;
  quota: QuotaData | null;
}) {
  const [coverage, setCoverage] = useState<CoverageData | null>(null);
  const [evalStatus, setEvalStatus] = useState<EvalData | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/ask/coverage").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/ask/eval-status").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([cov, ev]) => {
        if (cancelled) return;
        setCoverage(cov);
        setEvalStatus(ev);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const predicted = useMemo(
    () => routeModel(input || "default lookup"),
    [input],
  );

  // Pick 5 diverse prompts for the sidebar
  const prompts = SUGGESTED_PROMPTS.slice(0, 5).map((p) => p.question);

  // Usage
  const used = quota?.questionsThisMonth ?? 0;
  const cap = quota?.cap.monthlyQuestions ?? 200;
  const pct = Math.min(100, Math.round((used / Math.max(cap, 1)) * 100));
  const warn = pct >= 80;

  return (
    <>
      {/* Try asking */}
      <Card title="Try asking">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => onPromptSelect(p)}
              style={{
                cursor: "pointer",
                background: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: "0.4rem 0.65rem",
                fontSize: "0.76rem",
                lineHeight: 1.45,
                color: "var(--color-text)",
                textAlign: "left",
                transition: "border-color 0.15s, background 0.15s",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border-strong)";
                e.currentTarget.style.background = "var(--color-surface-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {p}
            </button>
          ))}
        </div>
        <a
          href="/app/ask/prompts"
          style={{
            display: "block",
            marginTop: "0.6rem",
            fontSize: "0.72rem",
            color: "var(--color-text-dim)",
            textDecoration: "none",
          }}
        >
          See all prompts
        </a>
      </Card>

      {/* Knowledge base */}
      <Card title="Knowledge base">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.55rem" }}>
          {coverage ? (
            <>
              <span className="pill mono" style={{ fontSize: "0.62rem", color: "var(--color-text-mid)" }}>
                {coverage.companiesCovered} companies
              </span>
              <span className="pill mono" style={{ fontSize: "0.62rem", color: "var(--color-text-mid)" }}>
                {coverage.totalDocs} docs
              </span>
            </>
          ) : (
            <span className="pill mono" style={{ fontSize: "0.62rem", color: "var(--color-text-dim)", opacity: 0.5 }}>
              loading
            </span>
          )}
        </div>
        <ul
          style={{
            margin: "0 0 0.5rem 0.9rem",
            padding: 0,
            fontSize: "0.8rem",
            lineHeight: 1.65,
            color: "var(--color-text)",
          }}
        >
          <li>EMEA retail companies: IR filings, vendor footprints, last 30d pulse.</li>
          <li>AI vendor moves: Microsoft, Google, Anthropic in retail.</li>
          <li>Sectors: Grocery, Luxury, Apparel, CPG, E-commerce, Sports.</li>
        </ul>
        <p style={{ margin: 0, fontSize: "0.73rem", color: "var(--color-text-dim)", lineHeight: 1.5 }}>
          Non-watchlist companies, stock calls, and non-public information are out of scope.
          Every claim is cited.
        </p>
      </Card>

      {/* Model routing */}
      <Card title="Model">
        <div style={{ marginBottom: "0.5rem" }}>
          <span
            className="pill mono"
            title={`Routing reason: ${predicted.reason}`}
            style={{
              fontSize: "0.65rem",
              color: predicted.tier === "sonnet" ? "var(--color-rust)" : "var(--color-sage)",
              borderColor:
                predicted.tier === "sonnet" ? "var(--color-rust-dim)" : "var(--color-border)",
            }}
          >
            {predicted.tier === "sonnet" ? "Sonnet 4.6 · reasoning" : "Haiku 4.5 · fast lookup"}
          </span>
        </div>
        <p style={{ margin: "0 0 0.35rem", fontSize: "0.8rem", lineHeight: 1.6, color: "var(--color-text)" }}>
          Haiku for fast lookups (approx. 0.5 euro cents). Sonnet for reasoning and cross-company
          questions (approx. 2 euro cents). The badge updates as you type.
        </p>
        {evalStatus?.available && evalStatus.passRate !== null && (
          <p
            style={{
              margin: 0,
              fontSize: "0.73rem",
              color: evalStatus.passRate >= 0.98 ? "var(--color-sage)" : "var(--color-rust)",
            }}
          >
            Weekly eval: {(evalStatus.passRate * 100).toFixed(1)}% pass rate (target &gt;98%)
          </p>
        )}
      </Card>

      {/* Usage */}
      {quota && (
        <Card title="Usage this month">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.8rem",
              color: "var(--color-text-mid)",
              marginBottom: "0.4rem",
            }}
          >
            <span>
              {used} / {cap} questions
              {quota.questionsToday > 0 ? ` · ${quota.questionsToday} today` : ""}
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: warn ? "var(--color-rust)" : "var(--color-text-dim)",
              }}
            >
              {warn
                ? `${100 - pct}% left`
                : `~€${(used * quota.estCostPerQuestionEur).toFixed(2)} used`}
            </span>
          </div>
          <div
            style={{
              height: 3,
              width: "100%",
              background: "var(--color-surface-2)",
              borderRadius: 2,
              overflow: "hidden",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: warn ? "var(--color-rust)" : "var(--color-sage)",
              }}
            />
          </div>
          <p style={{ margin: 0, fontSize: "0.73rem", color: "var(--color-text-dim)", lineHeight: 1.5 }}>
            For unlimited access, install the{" "}
            <a href="/app/ask/help" style={{ color: "var(--color-rust)", textDecoration: "none" }}>
              MCP server
            </a>{" "}
            or use the CLI.
          </p>
        </Card>
      )}
    </>
  );
}
