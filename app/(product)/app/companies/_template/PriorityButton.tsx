"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWatchlist } from "@/lib/watchlist";

// Generic priority toggle — same UX as the LVMH bespoke version, but takes
// the company slug + display name as props so every profile can reuse it.
export default function PriorityButton({ slug, displayName }: { slug: string; displayName: string }) {
  const router = useRouter();
  const { has, toggle } = useWatchlist();
  const [toast, setToast] = useState<string | null>(null);
  const watchlisted = has(slug);

  function onClick() {
    const nowAdded = toggle(slug);
    setToast(nowAdded ? `${displayName} added to watchlist` : `${displayName} removed from watchlist`);
    if (nowAdded) {
      setTimeout(() => router.push("/app/priority"), 600);
    } else {
      setTimeout(() => setToast(null), 1500);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={watchlisted ? "btn btn-secondary is-priority" : "btn btn-secondary"}
        aria-pressed={watchlisted}
      >
        <span aria-hidden="true">{watchlisted ? "★" : "☆"}</span>
        {watchlisted ? "Remove from My Priority Watchlist" : "Add to My Priority Watchlist"}
      </button>
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 50,
            padding: ".65rem 1rem",
            background: "#1C1914",
            color: "#EDE7D9",
            fontSize: "13px",
            borderRadius: "4px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
}
