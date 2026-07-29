import AskLayout from "@/app/components/AskLayout";
import "./ask.css";

interface Props {
  searchParams: Promise<{ company?: string; q?: string }>;
}

export default async function AskPage({ searchParams }: Props) {
  const { company, q } = await searchParams;

  return (
    <div className="ask-page">
      <div className="ask-container">
        <header className="ask-hero">
          <span className="label">Intelligence layer</span>
          <h1>Ask Rachel</h1>
          <p className="hero-sub">
            Every answer is grounded in the knowledge base: earnings filings, vendor reports,
            strategy papers. No citation, no claim. If Rachel does not know, she says so.
          </p>
          {company && <span className="scope-tag">Scoped to {company}</span>}
        </header>

        <AskLayout accountId={company} initialQuestion={q} />
      </div>
    </div>
  );
}
