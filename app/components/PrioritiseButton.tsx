"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWatchlist } from "@/lib/watchlist";

interface Props {
  slug: string;
  company: string;
}

export default function PrioritiseButton({ slug, company }: Props) {
  const router = useRouter();
  const { has, toggle } = useWatchlist();
  const [toast, setToast] = useState<string | null>(null);
  const watchlisted = has(slug);

  function onClick() {
    const nowAdded = toggle(slug);
    setToast(nowAdded ? `${company} added to watchlist` : `${company} removed from watchlist`);
    if (nowAdded) {
      setTimeout(() => router.push("/app/priority"), 600);
    } else {
      setTimeout(() => setToast(null), 1500);
    }
  }

  return (
    <>
      <button
        onClick={onClick}
        className={[
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-pill)] text-xs font-medium border transition-colors",
          watchlisted
            ? "bg-[var(--color-rust-dim)] text-[var(--color-rust)] border-[var(--color-rust)] hover:bg-[var(--color-rust-dim2)]"
            : "bg-[var(--color-rust)] text-white border-[var(--color-rust)] hover:bg-[var(--color-rust-deep)]",
        ].join(" ")}
        aria-pressed={watchlisted}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={watchlisted ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        {watchlisted ? "Remove from My Priority Watchlist" : "Add to My Priority Watchlist"}
      </button>
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-[var(--color-text)] text-[var(--color-surface)] text-sm rounded-[var(--radius)] shadow-lg animate-in fade-in slide-in-from-bottom-2"
        >
          {toast}
        </div>
      )}
    </>
  );
}
