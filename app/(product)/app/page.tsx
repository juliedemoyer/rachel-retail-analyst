import Link from "next/link";
import CompaniesShell from "./companies/CompaniesShell";
import "./index.css";
import "./companies/companies.css";

export default function AppIndex() {
  return (
    <>
      <section className="index-hero">
        <div className="ix-inner">
          <span className="ix-eyebrow">Rachel · Open Source</span>
          <h1>EMEA retail AI, tracked.</h1>
          <div className="ix-ctas">
            <Link className="ix-cta-primary" href="/app/today">
              Today&apos;s 90-second scan <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div id="companies" style={{ scrollMarginTop: "1.5rem" }}>
        <CompaniesShell basePath="/app" />
      </div>
    </>
  );
}
