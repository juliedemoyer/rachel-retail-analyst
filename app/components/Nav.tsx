"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { useWatchlist } from "@/lib/watchlist";
import "./nav.css";


type LinkSpec = { href: string; label: string };

const INTRO: LinkSpec[] = [
  { href: "/app", label: "Home" },
  { href: "/app/today", label: "Today (90s scan)" },
];

const EXPLORE_TOP: LinkSpec[] = [
  { href: "/app/matrix", label: "Company Matrix" },
];

const EXPLORE_BOTTOM: LinkSpec[] = [
  { href: "/app/leaderboard",  label: "AI Leaderboard" },
  { href: "/app/benchmark",    label: "Benchmark" },
  { href: "/app/financials",   label: "AI Spend Capacity" },
];

const SIGNAL: LinkSpec[] = [
  { href: "/app/pulse",    label: "Industry Pulse" },
  { href: "/app/calendar", label: "Trading Calendar" },
  { href: "/app/topics",   label: "Smart Topics" },
];

const EXPORT: LinkSpec[] = [
  { href: "/app/export", label: "API & MCP" },
];

// "Ask Rachel" is intentionally hidden from the sidebar in Phase 1: the
// vector store doesn't yet cover all profile docs, so chat answers would
// be inconsistent. The card on the /app landing page below promotes it
// as "coming next" so the surface remains visible without inviting use.
const ANALYSE: LinkSpec[] = [];

const METHODOLOGY: LinkSpec[] = [
  { href: "/app/sources", label: "Data sources" },
  { href: "/app/impact",  label: "Rachel Impact" },
];

const ADMIN: LinkSpec[] = [
  { href: "/app/admin/candidates", label: "Candidates" },
];

// Companies sublist. Star markers are no longer hard-coded into the labels —
// the Nav component reads the priority watchlist from `useWatchlist()` and
// suffixes a ★ onto entries whose slug is currently flagged. This way the
// "Add to My Priority Watchlist" button on a profile page immediately lights
// up the corresponding sidebar entry without a refresh.
const COMPANIES: LinkSpec[] = [
  { href: "/app/companies/ab-inbev",          label: "AB InBev" },
  { href: "/app/companies/adidas",            label: "Adidas" },
  { href: "/app/companies/ahold-delhaize",    label: "Ahold Delhaize" },
  { href: "/app/companies/arla",              label: "Arla Foods" },
  { href: "/app/companies/asos",              label: "ASOS" },
  { href: "/app/companies/barilla",           label: "Barilla" },
  { href: "/app/companies/beiersdorf",        label: "Beiersdorf" },
  { href: "/app/companies/burberry",          label: "Burberry" },
  { href: "/app/companies/campari",           label: "Campari Group" },
  { href: "/app/companies/carlsberg",         label: "Carlsberg" },
  { href: "/app/companies/carrefour",         label: "Carrefour" },
  { href: "/app/companies/colruyt",           label: "Colruyt Group" },
  { href: "/app/companies/danone",            label: "Danone" },
  { href: "/app/companies/decathlon",         label: "Decathlon" },
  { href: "/app/companies/diageo",            label: "Diageo" },
  { href: "/app/companies/essity",            label: "Essity" },
  { href: "/app/companies/estee-lauder",      label: "Estée Lauder" },
  { href: "/app/companies/ferrero",           label: "Ferrero" },
  { href: "/app/companies/fnac-darty",        label: "Fnac Darty" },
  { href: "/app/companies/hm",                label: "H&M" },
  { href: "/app/companies/haleon",            label: "Haleon" },
  { href: "/app/companies/heineken",          label: "Heineken" },
  { href: "/app/companies/hellofresh",        label: "HelloFresh" },
  { href: "/app/companies/henkel",            label: "Henkel" },
  { href: "/app/companies/hermes",            label: "Hermès" },
  { href: "/app/companies/ikea",              label: "IKEA / Ingka" },
  { href: "/app/companies/inditex",           label: "Inditex" },
  { href: "/app/companies/jeronimo-martins",  label: "Jeronimo Martins" },
  { href: "/app/companies/kering",            label: "Kering" },
  { href: "/app/companies/kingfisher",        label: "Kingfisher" },
  { href: "/app/companies/loreal",            label: "L'Oréal" },
  { href: "/app/companies/lavazza",           label: "Lavazza" },
  { href: "/app/companies/lego",              label: "LEGO Group" },
  { href: "/app/companies/lotus-bakeries",    label: "Lotus Bakeries" },
  { href: "/app/companies/lvmh",              label: "LVMH" },
  { href: "/app/companies/mango",             label: "Mango" },
  { href: "/app/companies/marks-spencer",     label: "Marks & Spencer" },
  { href: "/app/companies/nespresso",         label: "Nespresso" },
  { href: "/app/companies/nestle",            label: "Nestlé" },
  { href: "/app/companies/ocado",             label: "Ocado" },
  { href: "/app/companies/on-running",        label: "On Running" },
  { href: "/app/companies/pernod-ricard",     label: "Pernod Ricard" },
  { href: "/app/companies/puig",              label: "Puig" },
  { href: "/app/companies/reckitt",           label: "Reckitt" },
  { href: "/app/companies/richemont",         label: "Richemont" },
  { href: "/app/companies/sainsburys",        label: "Sainsbury's" },
  { href: "/app/companies/sodexo",            label: "Sodexo" },
  { href: "/app/companies/tesco",             label: "Tesco" },
  { href: "/app/companies/unilever",          label: "Unilever" },
  { href: "/app/companies/zalando",           label: "Zalando" },
];

// Map a /app/companies/<slug> href to its slug, so we can cross-reference
// against the priority watchlist for star rendering.
function slugFromCompanyHref(href: string): string | null {
  const m = href.match(/^\/app\/companies\/([^/?#]+)$/);
  return m ? m[1] : null;
}

function isActive(pathname: string, href: string): boolean {
  if (href === pathname) return true;
  if (href === "/app") return pathname === "/app";
  if (href === "/app/companies") return pathname === "/app/companies";
  return pathname.startsWith(href + "/");
}

function NavLink({ href, label, pathname }: LinkSpec & { pathname: string }) {
  const active = isActive(pathname, href);
  return (
    <Link href={href} className={active ? "active" : undefined}>
      {label}
    </Link>
  );
}

// Same as NavLink, but renders an indent arrow + a trailing ★ when the
// company is on the user's priority watchlist. The watchlist set is passed
// in (rather than calling useWatchlist per-link) so we don't fan out the
// hook across 50 instances.
function CompanyNavLink({ href, label, pathname, prioritised }: LinkSpec & { pathname: string; prioritised: boolean }) {
  const active = isActive(pathname, href);
  return (
    <Link href={href} className={active ? "active" : undefined}>
      ↳ {label}
      {prioritised && <span aria-label="On your priority watchlist" style={{ color: "var(--rust)", marginLeft: ".35rem" }}>★</span>}
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const { user } = useUser();
  const isOwner = user?.publicMetadata?.role === "owner";
  const { slugs } = useWatchlist();
  const watchlistSet = new Set(slugs);

  // Show the indented Companies sublist when the user is on the companies
  // index or any company profile (matches app.html's #company-nav-group
  // visibility rule).
  const showCompanies = pathname.startsWith("/app/companies");

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Close the drawer on route change.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original;
    return () => { document.body.style.overflow = original; };
  }, [open]);

  const renderLink = (l: LinkSpec) => (
    <NavLink key={l.href} pathname={pathname} {...l} />
  );

  return (
    <>
      <button
        type="button"
        className="rachel-nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>
      {open && <div className="rachel-nav-scrim" onClick={close} aria-hidden="true" />}
      <aside className={`rachel-sidebar${open ? " is-open" : ""}`} onClick={(e) => {
        // Close drawer when a link inside is tapped (mobile).
        const target = e.target as HTMLElement;
        if (target.closest("a")) close();
      }}>
      <Link href="/app" className="brand" style={{ padding: 0, margin: 0 }}>Rachel Retail</Link>
      <div className="tag">Rachel · Open Source</div>

      <h5>Quick scan</h5>
      {INTRO.map(renderLink)}

      <h5>Companies</h5>
      {EXPLORE_TOP.map(renderLink)}
      {showCompanies && (
        <div className="sub">
          {COMPANIES.map((l) => {
            const slug = slugFromCompanyHref(l.href);
            const prioritised = slug != null && watchlistSet.has(slug);
            return <CompanyNavLink key={l.href} pathname={pathname} prioritised={prioritised} {...l} />;
          })}
        </div>
      )}
      {EXPLORE_BOTTOM.map(renderLink)}

      <h5>Live intel</h5>
      {SIGNAL.map(renderLink)}

      <h5>Integrations</h5>
      {EXPORT.map(renderLink)}

      <h5>About</h5>
      {METHODOLOGY.map(renderLink)}

      {isOwner && (
        <>
          <h5>Admin</h5>
          {ADMIN.map(renderLink)}
        </>
      )}

      <div className="user-row">
        <UserButton />
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress ?? ""}
        </span>
      </div>
      <Link
        href="/sign-out"
        style={{
          display: "block", marginTop: "0.5rem",
          fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--color-text-dim)",
          textDecoration: "none",
        }}
      >
        Sign out
      </Link>
      </aside>
    </>
  );
}
