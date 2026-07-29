"use client";

import { useEffect, useState } from "react";

interface Candidate {
  id: string;
  slug: string;
  ts: string;
  earningsDate?: string;
  proposedFields: Record<string, unknown>;
  citations: Record<string, string>;
  status: "pending" | "approved" | "rejected" | "partial";
  reviewedAt?: string;
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function AdminCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/candidates").then((r) => r.json()).then((data) => {
      setCandidates(Array.isArray(data.candidates) ? data.candidates : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function action(candidateId: string, decision: "approved" | "rejected", approvedFields?: string[]) {
    setActioning(candidateId);
    await fetch("/api/candidates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateId, decision, approvedFields }),
    });
    setCandidates((prev) =>
      prev.map((c) => c.id === candidateId ? { ...c, status: decision } : c)
    );
    setActioning(null);
  }

  const pending = candidates.filter((c) => c.status === "pending" || c.status === "partial");
  const reviewed = candidates.filter((c) => c.status === "approved" || c.status === "rejected");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold mb-1">Candidate Queue</h1>
        <p className="text-sm text-[var(--color-text-mid)]">
          LLM-proposed field updates awaiting approval. Approve to write an immutable snapshot.
        </p>
      </div>

      {/* Admin links */}
      <div className="flex flex-wrap gap-3 mb-6">
        <a
          href="https://dashboard.clerk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] hover:border-[var(--color-border-strong)] transition-colors"
        >
          Clerk dashboard →
        </a>
        <a
          href="https://dashboard.clerk.com/last-active?path=users"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] hover:border-[var(--color-border-strong)] transition-colors"
        >
          Manage users →
        </a>
        <a
          href="https://dashboard.clerk.com/last-active?path=invitations"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] hover:border-[var(--color-border-strong)] transition-colors"
        >
          Invitations →
        </a>
      </div>

      {loading ? (
        <div className="text-sm text-[var(--color-text-dim)] py-12 text-center">Loading...</div>
      ) : pending.length === 0 && reviewed.length === 0 ? (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-8 text-center">
          <p className="text-sm text-[var(--color-text-dim)] mb-2">No candidates yet.</p>
          <p className="text-xs text-[var(--color-text-dim)]">Run <code className="font-mono bg-[var(--color-surface-2)] px-1.5 py-0.5 rounded">tsx scripts/ir-extract.ts</code> to generate proposals from the latest earnings docs.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <div>
              <h2 className="font-display text-sm font-semibold mb-3 text-[var(--color-rust)]">Pending ({pending.length})</h2>
              <div className="space-y-3">
                {pending.map((c) => (
                  <CandidateCard key={c.id} candidate={c} actioning={actioning} onAction={action} />
                ))}
              </div>
            </div>
          )}

          {reviewed.length > 0 && (
            <div>
              <h2 className="font-display text-sm font-semibold mb-3 text-[var(--color-text-dim)]">Recently reviewed</h2>
              <div className="space-y-2">
                {reviewed.slice(0, 10).map((c) => (
                  <div key={c.id} className="flex items-center gap-3 px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)]">
                    <span className={`text-[10px] px-2 py-0.5 rounded-[var(--radius-pill)] border font-medium ${c.status === "approved" ? "border-[var(--color-green)] text-[var(--color-green)] bg-[var(--color-green-dim)]" : "border-[var(--color-border)] text-[var(--color-text-dim)]"}`}>
                      {c.status}
                    </span>
                    <span className="font-mono text-xs font-medium">{c.slug}</span>
                    {c.earningsDate && <span className="text-xs text-[var(--color-text-dim)]">{c.earningsDate}</span>}
                    <span className="text-xs text-[var(--color-text-dim)] ml-auto">{timeAgo(c.reviewedAt ?? c.ts)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CandidateCard({ candidate: c, actioning, onAction }: {
  candidate: Candidate;
  actioning: string | null;
  onAction: (id: string, decision: "approved" | "rejected", approvedFields?: string[]) => void;
}) {
  const fieldKeys = Object.keys(c.proposedFields);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-display text-sm font-semibold">{c.slug}</p>
          <p className="text-[11px] text-[var(--color-text-dim)]">
            {c.earningsDate && `${c.earningsDate} · `}{timeAgo(c.ts)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onAction(c.id, "rejected")}
            disabled={actioning === c.id}
            className="px-3 py-1.5 text-xs border border-[var(--color-border)] text-[var(--color-text-mid)] rounded-[var(--radius)] hover:border-[var(--color-border-strong)] disabled:opacity-50 transition-colors"
          >
            Reject all
          </button>
          <button
            onClick={() => onAction(c.id, "approved", fieldKeys)}
            disabled={actioning === c.id}
            className="px-3 py-1.5 text-xs bg-[var(--color-rust)] text-white rounded-[var(--radius)] hover:bg-[var(--color-rust-deep)] disabled:opacity-50 transition-colors font-medium"
          >
            {actioning === c.id ? "Saving..." : "Approve all"}
          </button>
        </div>
      </div>

      {/* Field diffs */}
      <div className="space-y-2">
        {fieldKeys.map((field) => (
          <div key={field} className="flex items-start gap-3 text-xs">
            <span className="font-mono text-[var(--color-text-dim)] shrink-0 w-36 truncate">{field}</span>
            <span className="text-[var(--color-text-mid)] break-all">
              {JSON.stringify(c.proposedFields[field])}
            </span>
            {c.citations[field] && (
              <a href={c.citations[field]} target="_blank" rel="noopener noreferrer"
                className="text-[var(--color-rust)] hover:underline shrink-0">src</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
