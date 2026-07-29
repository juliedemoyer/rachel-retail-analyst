"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Persona = "gtm" | "retail" | null;

const STORAGE_KEY = "rachel:persona";

export default function PersonaSplitter() {
  const [persona, setPersona] = useState<Persona>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "gtm" || saved === "retail") setPersona(saved);
    } catch (_e) { /* localStorage unavailable (SSR or private browsing) */ }
  }, []);

  function pick(p: Persona) {
    setPersona(p);
    try {
      if (p) localStorage.setItem(STORAGE_KEY, p);
      else localStorage.removeItem(STORAGE_KEY);
    } catch (_e) { /* localStorage unavailable (SSR or private browsing) */ }
  }

  return (
    <div className="index-section persona-section">
      <div className="ix-section-head">
        <div className="lead">
          <div className="eyebrow">§ 00 · Who are you</div>
          <h2>Pick the lens you walk in with.</h2>
          <p className="sub">Two paths through the same database. Choose once, we&apos;ll remember.</p>
        </div>
      </div>

      <div className="persona-grid">
        <div className={`persona-card ${persona === "gtm" ? "is-active" : ""}`}>
          <button
            type="button"
            onClick={() => pick("gtm")}
            className="persona-pick"
            aria-pressed={persona === "gtm"}
          >
            <span className="persona-eyebrow">For GTM &amp; System Integrators</span>
            <h3>I sell AI to retail.</h3>
            <p>See which companies disclose real AI production, which lead with narrative, and what the filings commit to. Vendor footprints, AI maturity, earnings commitments, mapped from public sources.</p>
            <span className="persona-promise">First account brief in under 2 minutes.</span>
          </button>
          <div className="persona-links">
            <Link href="/app/financials">AI Spend Capacity →</Link>
            <Link href="/app/matrix">AI Matrix →</Link>
            <Link href="/app/benchmark">Benchmark accounts →</Link>
            <Link href="/app/today">Today scan →</Link>
          </div>
        </div>

        <div className={`persona-card ${persona === "retail" ? "is-active" : ""}`}>
          <button
            type="button"
            onClick={() => pick("retail")}
            className="persona-pick"
            aria-pressed={persona === "retail"}
          >
            <span className="persona-eyebrow">For Consumer &amp; Retail professionals</span>
            <h3>I work in retail or CPG.</h3>
            <p>Where does your brand sit in the sector distribution? See what your peers are disclosing, what the AI Act will surface at the next board meeting, and which vendors keep showing up.</p>
            <span className="persona-promise">Build a watchlist of 5 to 50 in your daily digest.</span>
          </button>
          <div className="persona-links">
            <Link href="/app/topics">Smart Topics →</Link>
            <Link href="/app/pulse">Industry Pulse →</Link>
            <Link href="/app/companies">Browse profiles →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
