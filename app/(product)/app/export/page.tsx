const EXPORT_OPTIONS = [
  {
    id: "api",
    label: "Read API",
    desc: "A simple HTTPS endpoint that returns Rachel's full picture of any company — score, profile, vendor stack, last earnings delta — as JSON. Drop it into your CRM. The Salesforce side will write it onto the Account record.",
    code: "GET /v1/score/lvmh\nAuthorization: Bearer rr_****",
  },
  {
    id: "mcp",
    label: "MCP server",
    desc: "Plug Rachel into any AI assistant that speaks Model Context Protocol. Your Claude or GPT now has live access to every profile, pulse item, and Smart Topic. Same data the Salesforce sync uses — just for your agent.",
    code: 'mcp install rachel-retail\n→ "Ask Rachel for the Carrefour briefing"',
  },
  {
    id: "cli",
    label: "Command-line tool",
    desc: "A small npm package for the engineers in the room. Pull profiles, pulse items, and topics into a build script, a slide pipeline, or a Notion sync. Stays out of your way.",
    code: "npx rachel pulse --since=24h\nnpx rachel score lvmh --json",
  },
];

export default function ExportPage() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] mb-1">Export · take it out</div>
        <h1 className="font-display text-2xl font-semibold mb-1">Three ways to plug Rachel into your stack.</h1>
        <p className="text-sm text-[var(--color-text-mid)] max-w-[60ch]">
          One read API for any system. One MCP server for any AI assistant. One CLI for the engineers.
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-widest bg-[var(--color-rust-dim2)] text-[var(--color-rust)] px-3 py-1 rounded-full font-medium">
          Phase 2 · bear with us
        </span>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-4 mb-6 flex items-center gap-3">
        <span className="text-lg">🔒</span>
        <p className="text-sm text-[var(--color-text-mid)] m-0 leading-relaxed">
          Export ships in <strong className="text-[var(--color-text)]">Phase 2</strong>. All three integrations below are on the roadmap. Reply to any Rachel email to vote on which ships first.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {EXPORT_OPTIONS.map((opt) => (
          <div
            key={opt.id}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-5 relative"
          >
            <div className="font-display text-[10px] uppercase tracking-widest text-[var(--color-rust)] mb-2">Phase 2</div>
            <h4 className="font-display text-base font-semibold text-[var(--color-text)] mb-2">{opt.label}</h4>
            <p className="text-xs text-[var(--color-text-mid)] leading-relaxed mb-3">{opt.desc}</p>
            {opt.code && (
              <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded p-3 font-mono text-[11px] text-[var(--color-text-dim)] whitespace-pre overflow-x-auto">
                {opt.code}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-[var(--color-text-dim)]">
        Reply to any Rachel email if there&apos;s an integration you&apos;d want first.
      </p>
    </div>
  );
}
