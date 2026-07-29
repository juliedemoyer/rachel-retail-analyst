import Link from "next/link";
import {
  CATEGORY_LABEL,
  promptsByCategory,
  type PromptCategory,
} from "@/lib/prompts/library";
import "../ask.css";

export const metadata = {
  title: "Ask Rachel — Prompt Library",
  description:
    "50 GTM and brand-exec questions Rachel is trained and evaluated on. One click to ask.",
};

const ORDER: PromptCategory[] = [
  "watchlist-factual",
  "vendor-footprint",
  "recent-earnings",
  "cross-company",
  "trend-topic",
  "unknown-refusal",
];

export default function PromptsPage() {
  const grouped = promptsByCategory();

  return (
    <div className="ask-page">
      <div className="ask-hero">
        <div className="inner">
          <div className="ask-eyebrow">Prompt library</div>
          <h1>What you can ask Rachel</h1>
          <p className="hero-sub">
            These 50 questions are what Rachel is built and weekly-evaluated on. Click any
            question to open the chat with it pre-filled. Every answer is grounded in cited
            sources. Each question costs under €0.02 against the account owner&apos;s Claude budget.
          </p>
        </div>
      </div>

      <div className="ask-body">
        <div className="ask-chat-frame" style={{ padding: "1.5rem" }}>
          {ORDER.map((cat) => {
            const items = grouped[cat] ?? [];
            if (items.length === 0) return null;
            return (
              <section key={cat} style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.1rem", margin: "0 0 0.75rem" }}>
                  {CATEGORY_LABEL[cat]}
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
                  {items.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/app/ask?q=${encodeURIComponent(p.question)}`}
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem",
                          borderRadius: 8,
                          border: "1px solid rgba(0,0,0,0.08)",
                          textDecoration: "none",
                          color: "inherit",
                          background: cat === "unknown-refusal" ? "#faf5f5" : "#fff",
                        }}
                      >
                        <span style={{ display: "block" }}>{p.question}</span>
                        <span style={{ display: "block", fontSize: 12, opacity: 0.6, marginTop: 4 }}>
                          {cat === "unknown-refusal"
                            ? "Rachel will refuse (out of scope)"
                            : `Cites: ${p.expectedCitationClasses.join(", ")}`}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
