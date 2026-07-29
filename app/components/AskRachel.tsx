"use client";

/**
 * AskRachel — streaming chat UI.
 *
 * Wires into /api/ask via AI SDK v6 useChat + DefaultChatTransport.
 * Renders text parts, tool-call states, and citation chips.
 * Every assistant message ends with the "So what:" line from the agent.
 *
 * Design: rachel-v2 tokens throughout. No inline colour values —
 * everything via CSS vars from theme.css.
 */

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";
import { track } from "./PostHogProvider";

// ── Citation chip ─────────────────────────────────────────────────────────────

function CitationChip({
  title,
  source,
  tier,
  url,
  date,
}: {
  title: string;
  source: string;
  tier?: number;
  url?: string | null;
  date?: string | null;
}) {
  const tierLabel = tier === 1 ? "T1" : tier === 2 ? "T2" : "T3";
  const label = `${tierLabel} · ${title}${date ? ` · ${date.slice(0, 7)}` : ""}`;

  const chip = (
    <span
      className="pill"
      style={{
        fontSize: "0.58rem",
        borderColor: "var(--color-rust-dim)",
        color: "var(--color-rust)",
        gap: "0.3rem",
      }}
    >
      {label}
    </span>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {chip}
      </a>
    );
  }
  return chip;
}

// ── Tool call card ────────────────────────────────────────────────────────────

function ToolCallCard({
  toolName,
  state,
  output,
}: {
  toolName: string;
  state: string;
  output?: unknown;
}) {
  const label =
    toolName === "searchKnowledgeBase"
      ? "Searching knowledge base"
      : toolName === "getWatchlist"
        ? "Reading watchlist"
        : toolName === "getAccount"
          ? "Looking up account"
          : toolName === "postPulseItem"
            ? "Adding to pulse feed"
            : toolName;

  if (state === "output-available" && output) {
    const data = output as Record<string, unknown>;
    const resultCount =
      Array.isArray(data.results) ? data.results.length : data.found === false ? 0 : null;

    return (
      <div
        className="mono"
        style={{
          fontSize: "0.65rem",
          color: "var(--color-text-dim)",
          padding: "0.35rem 0.6rem",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-surface-2)",
        }}
      >
        {label}
        {resultCount !== null && (
          <span style={{ color: "var(--color-rust)", marginLeft: "0.4rem" }}>
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="mono"
      style={{
        fontSize: "0.65rem",
        color: "var(--color-text-dim)",
        padding: "0.35rem 0.6rem",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        background: "var(--color-surface-2)",
        opacity: 0.7,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "0.5rem",
          height: "0.5rem",
          borderRadius: "50%",
          background: "var(--color-rust)",
          marginRight: "0.4rem",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      {label}…
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────

function MessageBubble({
  role,
  parts,
}: {
  role: "user" | "assistant";
  parts: Array<{ type: string; [key: string]: unknown }>;
}) {
  const isUser = role === "user";

  // Collect citations from all tool outputs in this message
  const citations: Array<{
    title: string;
    source: string;
    tier?: number;
    url?: string | null;
    date?: string | null;
  }> = [];

  for (const part of parts) {
    if (part.type.startsWith("tool-") && part.state === "output-available" && part.output) {
      const output = part.output as Record<string, unknown>;
      if (Array.isArray(output.results)) {
        for (const r of output.results as Array<{
          citation?: { title: string; source: string; tier?: number; url?: string; publishedAt?: string };
        }>) {
          if (r.citation) {
            citations.push({
              title: r.citation.title,
              source: r.citation.source,
              tier: r.citation.tier,
              url: r.citation.url,
              date: r.citation.publishedAt,
            });
          }
        }
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        gap: "0.4rem",
      }}
    >
      {/* Role label */}
      <span
        className="mono"
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isUser ? "var(--color-text-dim)" : "var(--color-sage)",
        }}
      >
        {isUser ? "You" : "Rachel"}
      </span>

      {/* Tool calls (assistant only, shown above the text) */}
      {!isUser && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.1rem" }}>
          {parts
            .filter((p) => p.type.startsWith("tool-"))
            .map((p, i) => (
              <ToolCallCard
                key={i}
                toolName={p.type.replace("tool-", "")}
                state={p.state as string}
                output={p.output}
              />
            ))}
        </div>
      )}

      {/* Text content */}
      {parts
        .filter((p) => p.type === "text" && typeof p.text === "string" && (p.text as string).trim())
        .map((p, i) => {
          const text = p.text as string;
          // Split on "So what:" to style it distinctly
          const soWhatIndex = text.lastIndexOf("So what:");
          const body = soWhatIndex > 0 ? text.slice(0, soWhatIndex).trim() : text;
          const soWhat = soWhatIndex > 0 ? text.slice(soWhatIndex) : null;

          return (
            <div key={i} style={{ width: "100%" }}>
              <div
                style={{
                  background: isUser ? "var(--color-rust-dim2)" : "transparent",
                  borderLeft: isUser ? "none" : "2px solid var(--color-sage)",
                  border: isUser ? "1px solid var(--color-rust-dim)" : undefined,
                  borderRadius: isUser ? "var(--radius)" : 0,
                  padding: isUser ? "0.7rem 0.95rem" : "0.1rem 0 0.1rem 0.85rem",
                  maxWidth: "100%",
                  fontSize: "0.92rem",
                  lineHeight: "1.65",
                  color: "var(--color-text)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {body}
              </div>

              {soWhat && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    background: "var(--color-rust-dim2)",
                    borderLeft: "3px solid var(--color-rust)",
                    borderRadius: "var(--radius)",
                    padding: "0.55rem 0.8rem",
                    maxWidth: "100%",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--color-rust-deep)",
                  }}
                >
                  {soWhat}
                </div>
              )}
            </div>
          );
        })}

      {/* Citation chips */}
      {citations.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.15rem" }}>
          {citations.map((c, i) => (
            <CitationChip key={i} {...c} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── PDF citation card ─────────────────────────────────────────────────────────

type PdfCitation = {
  title: string;
  excerpt: string;
  url?: string;
  blobKey?: string;
  publishedAt?: string;
  passageIndex: number;
};

function PdfCitationCard({ c }: { c: PdfCitation }) {
  const inner = (
    <div
      style={{
        padding: "0.5rem 0.7rem",
        border: "1px solid var(--color-border)",
        borderLeft: "3px solid var(--color-text-dim)",
        borderRadius: "var(--radius-sm)",
        background: "var(--color-surface-2)",
        fontSize: "0.72rem",
        lineHeight: "1.5",
        color: "var(--color-text-mid)",
      }}
    >
      <p
        style={{
          fontWeight: 600,
          color: "var(--color-text)",
          marginBottom: "0.25rem",
          fontSize: "0.68rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        Passage {c.passageIndex}{c.publishedAt ? ` · ${c.publishedAt.slice(0, 7)}` : ""}
      </p>
      <p style={{ fontStyle: "italic", marginBottom: "0.3rem" }}>&ldquo;{c.excerpt}{c.excerpt.length >= 300 ? "…" : ""}&rdquo;</p>
      <p style={{ color: "var(--color-text-dim)", fontSize: "0.65rem" }}>{c.title}</p>
    </div>
  );
  if (c.url) {
    return (
      <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {inner}
      </a>
    );
  }
  return inner;
}

// ── PDF result block ──────────────────────────────────────────────────────────

function PdfResultBlock({
  loading,
  text,
  citations,
}: {
  loading: boolean;
  text: string;
  citations: PdfCitation[];
}) {
  return (
    <div
      style={{
        marginTop: "0.75rem",
        borderTop: "1px dashed var(--color-border)",
        paddingTop: "0.75rem",
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-text-dim)",
          marginBottom: "0.5rem",
        }}
      >
        From investor documents
      </p>

      {(loading || text) && (
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            padding: "0.75rem 1rem",
            fontSize: "0.875rem",
            lineHeight: "1.7",
            color: "var(--color-text)",
            whiteSpace: "pre-wrap",
            maxWidth: "48rem",
          }}
        >
          {text || (
            <span style={{ opacity: 0.4 }}>Searching investor documents…</span>
          )}
          {loading && text && <span style={{ opacity: 0.4 }}> ▌</span>}
        </div>
      )}

      {!loading && citations.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            marginTop: "0.6rem",
            maxWidth: "48rem",
          }}
        >
          {citations.map((c) => (
            <PdfCitationCard key={c.passageIndex} c={c} />
          ))}
        </div>
      )}

      {!loading && citations.length === 0 && text && (
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--color-text-dim)",
            marginTop: "0.5rem",
            fontStyle: "italic",
          }}
        >
          No indexed IR filings found for this company.
        </p>
      )}
    </div>
  );
}

// ── Handoff card (quota exhausted) ────────────────────────────────────────────

function HandoffCard() {
  return (
    <div
      style={{
        padding: "1rem 1.1rem",
        border: "1px solid var(--color-rust-dim)",
        background: "var(--color-rust-dim2)",
        borderRadius: "var(--radius)",
        fontSize: "0.85rem",
        lineHeight: 1.6,
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>
        You&apos;ve used your 200 free questions this month.
      </p>
      <p style={{ margin: "0.4rem 0 0.6rem", color: "var(--color-text-mid)" }}>
        Free usage runs from the account owner&apos;s Claude budget. For unlimited access, install one of:
      </p>
      <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--color-text)" }}>
        <li>
          <strong>MCP server:</strong> add <code>rachel-retail</code> to Claude Desktop —{" "}
          <a href="/app/ask/help" style={{ color: "var(--color-rust)" }}>
            setup guide
          </a>
        </li>
        <li>
          <strong>CLI:</strong> <code>npx rachel-retail ask &quot;your question&quot;</code>
        </li>
      </ul>
      <p style={{ margin: "0.6rem 0 0", fontSize: "0.78rem", color: "var(--color-text-dim)" }}>
        Both query the same brain Rachel uses here, with no monthly cap.
      </p>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface QuotaData {
  cap: { monthlyQuestions: number; monthlyUsd: number };
  questionsThisMonth: number;
  questionsToday: number;
  monthlyQuestionsRemaining: number;
  blocked: boolean;
  estCostPerQuestionEur: number;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AskRachel({
  accountId,
  initialQuestion,
  input: inputProp,
  onInputChange,
  quota,
}: {
  accountId?: string;
  initialQuestion?: string;
  input?: string;
  onInputChange?: (v: string) => void;
  quota?: QuotaData | null;
} = {}) {
  const isControlled = inputProp !== undefined;
  const [inputState, setInputState] = useState(initialQuestion ?? "");

  const input = isControlled ? (inputProp as string) : inputState;
  const setInput = useCallback(
    (v: string) => {
      if (!isControlled) setInputState(v);
      onInputChange?.(v);
    },
    [isControlled, onInputChange],
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  const [pdfResult, setPdfResult] = useState<{
    loading: boolean;
    text: string;
    citations: PdfCitation[];
  } | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ask",
      body: accountId ? { accountId } : undefined,
    }),
  });

  const isStreaming = status === "streaming" || status === "submitted";

  // Auto-scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pdfResult]);

  // Reset PDF result whenever a new question is sent
  useEffect(() => {
    setPdfResult(null);
  }, [messages.length]);

  // ── PDF investor-document search ──────────────────────────────────────────
  const searchInvestorDocs = useCallback(async () => {
    if (!accountId) return;

    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    const question =
      (
        (lastUserMsg?.parts ?? []) as Array<{ type: string; text?: string }>
      ).find((p) => p.type === "text")?.text ?? "";

    if (!question) return;

    setPdfResult({ loading: true, text: "", citations: [] });

    try {
      const res = await fetch("/api/ask/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, accountId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        setPdfResult({
          loading: false,
          text: `Could not search investor documents: ${err.error ?? res.statusText}`,
          citations: [],
        });
        return;
      }

      const rawCitations = res.headers.get("X-Rachel-PDF-Citations");
      const citations: PdfCitation[] = rawCitations
        ? (JSON.parse(rawCitations) as PdfCitation[])
        : [];

      const reader = res.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setPdfResult({ loading: true, text: accumulated, citations });
      }

      accumulated += decoder.decode();
      setPdfResult({ loading: false, text: accumulated, citations });
    } catch (err) {
      setPdfResult({
        loading: false,
        text: "Failed to search investor documents. Please try again.",
        citations: [],
      });
      console.error("[AskRachel] PDF search error:", err);
    }
  }, [accountId, messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;
    track("ask_rachel_query", { slug: accountId, query_length: text.length });
    setInput("");
    sendMessage({ text });
  }

  // Track completed answers
  const lastTrackedMsgId = useRef<string | null>(null);
  useEffect(() => {
    if (isStreaming) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant" || last.id === lastTrackedMsgId.current) return;

    let sources = 0;
    for (const part of (last.parts ?? []) as Array<{ type: string; state?: string; output?: unknown }>) {
      if (part.type.startsWith("tool-") && part.state === "output-available" && part.output) {
        const output = part.output as Record<string, unknown>;
        if (Array.isArray(output.results)) {
          for (const r of output.results as Array<{ citation?: unknown }>) {
            if (r.citation) sources++;
          }
        }
      }
    }
    track("ask_rachel_answer", { slug: accountId, sources_count: sources });
    lastTrackedMsgId.current = last.id;
  }, [isStreaming, messages, accountId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "60vh",
      }}
    >
      {/* Message list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem 0 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Empty state */}
        {messages.length === 0 && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem 0",
              gap: "0.5rem",
              color: "var(--color-text-dim)",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-text-mid)" }}>
              Ask Rachel anything — every answer is cited.
            </p>
            {accountId && (
              <span className="pill" style={{ fontSize: "0.62rem", color: "var(--color-rust)", borderColor: "var(--color-rust-dim)" }}>
                Scoped to {accountId}
              </span>
            )}
            <p style={{ margin: "0.3rem 0 0", fontSize: "0.78rem" }}>
              Pick a prompt from the panel, or type your own.
            </p>
          </div>
        )}

        {messages.map((m, idx) => {
          const isLastAssistant =
            m.role === "assistant" && idx === messages.length - 1;
          const showPdfButton =
            isLastAssistant &&
            !isStreaming &&
            !!accountId &&
            !pdfResult;

          return (
            <div key={m.id}>
              <MessageBubble
                role={m.role as "user" | "assistant"}
                parts={(m.parts ?? []) as Array<{ type: string; [key: string]: unknown }>}
              />

              {showPdfButton && (
                <div style={{ marginTop: "0.5rem", paddingLeft: "0.1rem" }}>
                  <button
                    onClick={searchInvestorDocs}
                    className="pill"
                    style={{
                      cursor: "pointer",
                      fontSize: "0.72rem",
                      color: "var(--color-text-mid)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    Search investor documents instead
                  </button>
                </div>
              )}

              {isLastAssistant && pdfResult && (
                <PdfResultBlock
                  loading={pdfResult.loading}
                  text={pdfResult.text}
                  citations={pdfResult.citations}
                />
              )}
            </div>
          );
        })}

        {/* Streaming indicator */}
        {isStreaming && messages[messages.length - 1]?.role === "user" && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span
              className="mono"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-sage)",
              }}
            >
              Rachel
            </span>
            <div style={{ display: "flex", gap: "0.2rem", alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: "0.3rem",
                    height: "0.3rem",
                    borderRadius: "50%",
                    background: "var(--color-sage)",
                    opacity: 0.6,
                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quota exhausted */}
      {quota?.blocked ? <HandoffCard /> : null}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        hidden={Boolean(quota?.blocked)}
        className="ask-composer"
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: "0.85rem",
          paddingBottom: "0.85rem",
          display: "flex",
          gap: "0.6rem",
          alignItems: "flex-end",
          background: "var(--color-bg)",
          position: "sticky",
          bottom: 0,
          zIndex: 5,
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent);
            }
          }}
          placeholder="Ask Rachel anything — every answer is cited…"
          rows={2}
          disabled={isStreaming}
          style={{
            flex: 1,
            resize: "none",
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            padding: "0.65rem 0.85rem",
            fontSize: "0.875rem",
            color: "var(--color-text)",
            fontFamily: "var(--font-body)",
            outline: "none",
            transition: "border-color 0.15s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border-strong)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
          }}
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="btn btn-primary"
          style={{ opacity: isStreaming || !input.trim() ? 0.5 : 1 }}
        >
          {isStreaming ? "Thinking…" : "Ask"}
        </button>
      </form>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .ask-composer {
          padding-bottom: calc(0.85rem + env(safe-area-inset-bottom, 0px));
        }
        @media (max-width: 640px) {
          .ask-composer textarea { font-size: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
