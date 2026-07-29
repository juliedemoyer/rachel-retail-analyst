"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface State {
  open: boolean;
  what: string;
  screenshot: boolean;
  status: "idle" | "sending" | "sent" | "error";
}

export function FeedbackButton() {
  const pathname = usePathname();
  const { user } = useUser();
  const [state, setState] = useState<State>({ open: false, what: "", screenshot: false, status: "idle" });
  const textRef = useRef<HTMLTextAreaElement>(null);

  const slug = pathname.match(/\/companies\/([^/]+)/)?.[1] ?? undefined;
  const viewport = typeof window !== "undefined"
    ? `${window.innerWidth}x${window.innerHeight}`
    : undefined;

  async function submit() {
    if (!state.what.trim()) return;
    setState((s) => ({ ...s, status: "sending" }));

    let screenshotDataUrl: string | undefined;
    if (state.screenshot && typeof window !== "undefined") {
      try {
        // Dynamically import html2canvas only when needed
        const html2canvas = (await import("html2canvas" as never)).default as (el: HTMLElement) => Promise<HTMLCanvasElement>;
        const canvas = await html2canvas(document.body);
        screenshotDataUrl = canvas.toDataURL("image/jpeg", 0.6);
      } catch {
        // screenshot capture failed silently
      }
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          what: state.what,
          path: pathname,
          slug,
          viewport,
          screenshotDataUrl,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setState((s) => ({ ...s, status: "sent" }));
      setTimeout(() => setState({ open: false, what: "", screenshot: false, status: "idle" }), 1500);
    } catch {
      setState((s) => ({ ...s, status: "error" }));
    }
  }

  if (!user) return null;

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setState((s) => ({ ...s, open: true }))}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border-strong)] rounded-[var(--radius-pill)] text-xs text-[var(--color-text-mid)] shadow-[var(--shadow-float)] hover:text-[var(--color-text)] hover:border-[var(--color-rust)] transition-colors"
        aria-label="Send feedback"
      >
        <span>Spotted something off?</span>
      </button>

      {/* Modal */}
      {state.open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" role="dialog">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--color-text)]/20 backdrop-blur-sm"
            onClick={() => setState((s) => ({ ...s, open: false }))}
          />

          <div className="relative w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border-strong)] rounded-[var(--radius)] p-5 shadow-[var(--shadow-float)]">
            <h2 className="font-display text-sm font-semibold mb-0.5">Spotted something off?</h2>
            <p className="text-xs text-[var(--color-text-dim)] mb-3">
              Send Rachel a heads-up — she&apos;s still learning.
            </p>

            <textarea
              ref={textRef}
              value={state.what}
              onChange={(e) => setState((s) => ({ ...s, what: e.target.value }))}
              placeholder="What looks wrong? Be specific — page, company, field..."
              rows={4}
              maxLength={2000}
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-[var(--radius)] px-3 py-2 text-sm resize-none focus:outline-none focus:border-[var(--color-rust)] placeholder:text-[var(--color-text-dim)]"
              autoFocus
            />

            <label className="flex items-center gap-2 mt-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={state.screenshot}
                onChange={(e) => setState((s) => ({ ...s, screenshot: e.target.checked }))}
                className="accent-[var(--color-rust)]"
              />
              <span className="text-xs text-[var(--color-text-mid)]">Include screenshot</span>
            </label>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setState((s) => ({ ...s, open: false }))}
                className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={state.status === "sending" || state.status === "sent" || !state.what.trim()}
                className="px-4 py-1.5 bg-[var(--color-rust)] text-white text-xs font-medium rounded-[var(--radius)] disabled:opacity-50 hover:bg-[var(--color-rust-deep)] transition-colors"
              >
                {state.status === "sending" ? "Sending..." : state.status === "sent" ? "Sent!" : state.status === "error" ? "Try again" : "Send"}
              </button>
            </div>

            {/* Auto-captured context */}
            <p className="mt-3 text-[10px] text-[var(--color-text-dim)]">
              Auto-captured: {pathname}{slug ? ` · ${slug}` : ""}{viewport ? ` · ${viewport}` : ""}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
