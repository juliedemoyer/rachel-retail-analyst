import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

interface FeedbackEntry {
  what: string;
  path: string;
  slug?: string;
  viewport?: string;
  userId?: string | null;
  ts?: string;
  ip?: string;
  screenshotDataUrl?: string;
}

async function getFeedback(): Promise<FeedbackEntry[]> {
  try {
    const raw = await redis.lrange("rachel:feedback", 0, 99);
    return (raw ?? []).map((item) =>
      typeof item === "string" ? JSON.parse(item) : item
    ) as FeedbackEntry[];
  } catch {
    return [];
  }
}

function timeAgo(ts?: string): string {
  if (!ts) return "";
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default async function AdminFeedbackPage() {
  const gate = await requireAdmin();
  if (!gate.ok) redirect(gate.reason === "unauthenticated" ? "/sign-in" : "/app/matrix");

  const feedback = await getFeedback();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold mb-1">Feedback</h1>
        <p className="text-sm text-[var(--color-text-mid)]">{feedback.length} submissions (latest 100)</p>
      </div>

      {feedback.length === 0 ? (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-8 text-center">
          <p className="text-sm text-[var(--color-text-dim)]">No feedback yet. That&apos;s either very good or very quiet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {feedback.map((entry, i) => (
            <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] px-2 py-0.5 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-[var(--radius-pill)] font-mono">
                    {entry.path}
                  </span>
                  {entry.viewport && (
                    <span className="text-[10px] text-[var(--color-text-dim)]">{entry.viewport}</span>
                  )}
                  {entry.userId && (
                    <span className="text-[10px] font-mono text-[var(--color-text-dim)] truncate max-w-[120px]">{entry.userId}</span>
                  )}
                </div>
                <span className="text-[10px] text-[var(--color-text-dim)] shrink-0">{timeAgo(entry.ts)}</span>
              </div>
              <p className="text-sm leading-relaxed">{entry.what}</p>
              {entry.screenshotDataUrl && (
                <details className="mt-3">
                  <summary className="text-xs text-[var(--color-rust)] cursor-pointer hover:underline">View screenshot</summary>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={entry.screenshotDataUrl} alt="Screenshot" className="mt-2 rounded-[var(--radius)] border border-[var(--color-border)] max-w-full" />
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
