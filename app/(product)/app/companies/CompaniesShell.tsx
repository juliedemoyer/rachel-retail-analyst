"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useWatchlist } from "@/lib/watchlist";
import { sectionHtml } from "./_section";

// Hydrates the static #companies markup with working search, filters, and
// priority toggles. The card markup itself stays as static HTML (rendered
// via dangerouslySetInnerHTML) so the visual port from app.html keeps full
// fidelity. Filter chrome and the priority pill counter are React-rendered
// here, on top of the static grid, so they always reflect live state.

type Mode = "all" | "priority";

const QUADRANT_OPTIONS = [
  { value: "all",      label: "AI Quadrant" },
  { value: "performer", label: "Performer" },
  { value: "narrative_led",    label: "Narrative-led" },
  { value: "silent",    label: "Silent Builder" },
  { value: "not_visible",   label: "Not yet visible" },
  { value: "native",    label: "AI Native" },
];

const SECTOR_OPTIONS = [
  { value: "all",       label: "Category" },
  { value: "grocery",   label: "Grocery" },
  { value: "luxury",    label: "Luxury & Beauty" },
  { value: "apparel",   label: "Apparel & Home" },
  { value: "cpg",       label: "CPG / FMCG" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "sports",    label: "Sports & Outdoor" },
];

export default function CompaniesShell({ basePath = "/app/companies" }: { basePath?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { slugs, toggle } = useWatchlist();
  const watchlistSet = useMemo(() => new Set(slugs), [slugs]);

  const [mode, setMode] = useState<Mode>("all");
  const [search, setSearch] = useState("");
  const [quadrant, setQuadrant] = useState("all");
  const [sector, setSector] = useState("all");

  const [totalCards, setTotalCards] = useState(0);

  // Hydrate filter state from URL on mount only. Read via window.location
  // (not useSearchParams) so this component does not require a Suspense
  // boundary or force-dynamic — both of which were causing the
  // dangerouslySetInnerHTML card grid to remount mid-keystroke and wipe
  // our filter display:none state.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const qd = params.get("quadrant");
    const sc = params.get("sector");
    if (q) setSearch(q);
    if (qd) setQuadrant(qd);
    if (sc) setSector(sc);
  }, []);

  // Push filter state into URL via raw History API — bypasses Next's router
  // reactivity so the page does not re-render on every keystroke.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (quadrant !== "all") params.set("quadrant", quadrant);
    if (sector !== "all") params.set("sector", sector);
    const qs = params.toString();
    const next = qs ? `${basePath}?${qs}` : basePath;
    if (next !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, "", next);
    }
  }, [search, quadrant, sector]);

  // ── Wire delegated card click for the per-card priority toggle ────────────
  // Cards live inside dangerouslySetInnerHTML, so we attach a single
  // delegated click listener on the inner root.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>(".company-card");
    setTotalCards(cards.length);

    function onPriorityToggle(e: Event) {
      const target = (e.target as HTMLElement).closest<HTMLElement>(".priority-toggle");
      if (!target) return;
      const card = target.closest<HTMLAnchorElement>("a.company-card");
      if (!card) return;
      e.preventDefault();
      e.stopPropagation();
      const slug = slugFromHref(card.getAttribute("href"));
      if (!slug) return;
      toggle(slug);
    }

    root.addEventListener("click", onPriorityToggle, true);
    return () => {
      root.removeEventListener("click", onPriorityToggle, true);
    };
    // toggle is stable; we only want this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Apply filter / search / mode to the static cards via display:none ────
  // useLayoutEffect runs synchronously after DOM mutations and before paint
  // so users never see the wrong cards flash. Re-runs on every state change.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = search.trim().toLowerCase();
    const cards = root.querySelectorAll<HTMLElement>(".company-card");
    cards.forEach((card) => {
      const name = (card.querySelector<HTMLElement>(".c-name")?.textContent || "").toLowerCase();
      const cardQuad = card.dataset.quadrant || "";
      const cardSect = card.dataset.sector || "";
      const slug = slugFromHref(card.getAttribute("href"));
      const isPriority = slug != null && watchlistSet.has(slug);

      const matchSearch = !q || name.includes(q);
      const matchQuad   = quadrant === "all" || cardQuad === quadrant;
      const matchSect   = sector   === "all" || cardSect === sector;
      const matchMode   = mode === "all" || isPriority;

      const visible = matchSearch && matchQuad && matchSect && matchMode;
      card.style.setProperty("display", visible ? "" : "none", "important");
    });
  }, [search, quadrant, sector, mode, watchlistSet]);

  // ── Reflect priority state on each card's star toggle ────────────────────
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLAnchorElement>("a.company-card").forEach((card) => {
      const slug = slugFromHref(card.getAttribute("href"));
      const toggleEl = card.querySelector<HTMLElement>(".priority-toggle");
      if (!slug || !toggleEl) return;
      const on = watchlistSet.has(slug);
      toggleEl.classList.toggle("is-priority", on);
      toggleEl.textContent = on ? "★ Priority account" : "☆ Add to priority";
    });
  }, [watchlistSet]);

  return (
    <div ref={rootRef} className="companies-page">
      {/* Header chrome — React-rendered so filter pills and the priority
          counter always reflect live state. */}
      <div className="page" style={{ paddingBottom: 0 }}>
        <div className="page-header">
          <div>
            <div className="eyebrow">Watchlist</div>
            <h1>50+ retailers &amp; consumer brands, tracked on AI maturity.</h1>
          </div>
          <div style={{ display: "flex", gap: ".5rem", alignItems: "flex-start", paddingTop: ".25rem" }}>
            <button
              className={`filter-pill${mode === "all" ? " active" : ""}`}
              style={{ fontWeight: 600 }}
              onClick={() => setMode("all")}
            >
              All ({totalCards || 50})
            </button>
            <Link
              href="/app/priority"
              className="filter-pill"
              style={{ textDecoration: "none" }}
            >
              Priority ({slugs.length})
            </Link>
          </div>
        </div>

        <div className="filters" style={{ alignItems: "center", gap: ".75rem" }}>
          <input
            className="search-input"
            placeholder="Search companies…"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="filter-select"
            value={quadrant}
            onChange={(e) => setQuadrant(e.target.value)}
          >
            {QUADRANT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            {SECTOR_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {(quadrant !== "all" || sector !== "all" || search) && (
            <button
              className="filter-pill"
              onClick={() => { setQuadrant("all"); setSector("all"); setSearch(""); }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Static cards grid: card markup is preserved verbatim from app.html
          for visual fidelity. Filter logic is applied via display:none above.
          Financial deltas are post-processed to colour signed percentages. */}
      {/* Wrap in .page so the cards align with the header above — gridOnlyHtml
          strips the original .page container, leaving the flex grid unpadded. */}
      <div className="page" style={{ paddingTop: "0.5rem" }} dangerouslySetInnerHTML={{ __html: colorizeFinancials(gridOnlyHtml(sectionHtml)) }} />
    </div>
  );
}

function slugFromHref(href: string | null): string | null {
  if (!href) return null;
  const m = href.match(/\/app\/companies\/([^/?#]+)/);
  return m ? m[1] : null;
}

// Strip the page header / filter chrome from sectionHtml so the React-rendered
// chrome above is the only one visible. Keeps the card grid + surrounding
// container intact.
function gridOnlyHtml(html: string): string {
  // Cut everything before the first <div style="display:flex;gap:1.5rem (the
  // grid wrapper) — that block is where the cards live in _section.ts.
  const marker = `<div style="display:flex;gap:1.5rem`;
  const idx = html.indexOf(marker);
  return idx >= 0 ? html.slice(idx) : html;
}

// Wrap signed percentages in colour-coded spans. +X% / +X.X% becomes green,
// -X% / -X.X% becomes rust. Plain percentages without a sign (e.g. an
// absolute op margin like 23.1%) stay neutral since they don't signal a
// delta. Negative absolute margins (-1.8% op margin) read as a loss and
// pick up rust styling, which is the right call for a financials scan.
function colorizeFinancials(html: string): string {
  return html.replace(/([+-])(\d+(?:\.\d+)?\s*%)/g, (_match, sign: string, number: string) => {
    const cls = sign === "+" ? "fin-pos" : "fin-neg";
    return `<span class="${cls}">${sign}${number}</span>`;
  });
}
