import { notFound } from "next/navigation";
import CompanyProfile from "../_template/CompanyProfile";
import TrackEvent from "@/app/components/TrackEvent";
import { getProfile } from "@/lib/profiles/template/data";

interface Ctx {
  params: Promise<{ slug: string }>;
}

// /app/companies/[slug] renders the LVMH-style template from the per-slug
// data record. LVMH is the canonical example with every section populated;
// the other records ship with header-level data only and fill in over
// time as Rachel does the research.
export default async function CompanyProfilePage({ params }: Ctx) {
  const { slug } = await params;
  const data = getProfile(slug);
  if (!data) notFound();
  return (
    <>
      <TrackEvent event="profile_view" props={{ slug }} />
      <CompanyProfile data={data} />
      {/* Methodology disclaimer — rendered on every profile. See METHODOLOGY.md. */}
      <footer
        style={{
          maxWidth: "56rem",
          margin: "2.5rem auto 3rem",
          padding: "1rem 1.25rem",
          fontSize: "12px",
          lineHeight: 1.6,
          color: "var(--color-text-dim, #8A8278)",
          borderTop: "1px solid var(--color-border, rgba(28,25,20,0.12))",
        }}
      >
        Point-in-time analysis of public filings under the published rubric
        (see METHODOLOGY.md), frozen as of July 2026 and not maintained.
        Scores are the mechanical output of the rubric applied to the cited
        sources, with evidence tiers disclosed per field. Not affiliated with
        any listed company or vendor. Not investment advice. Corrections with
        a source are welcome via the repository issue tracker
        (CORRECTIONS.md).
      </footer>
    </>
  );
}

export async function generateStaticParams() {
  // Pre-render all known profiles at build time; new slugs added to the
  // data module are picked up on the next deploy.
  const { listProfileSlugs } = await import("@/lib/profiles/template/data");
  return listProfileSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Ctx) {
  const { slug } = await params;
  const data = getProfile(slug);
  if (!data) return { title: "Company not found · Rachel Retail" };
  return {
    title: `${data.shortName} · Rachel Retail`,
    description: `AI Impression Score and investor snapshot for ${data.shortName}, derived from cited public filings under a published rubric.`,
  };
}
