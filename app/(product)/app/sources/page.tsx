const SOURCES_TABLE = [
  {
    name: "Earnings call transcripts",
    type: "Investor relations",
    tier: "Confirmed",
    cadence: "Quarterly",
    extracts: "Key quotes, AI framing, named tools, C-suite presenter, GenAI mentions",
  },
  {
    name: "Annual reports / URDs",
    type: "Investor relations",
    tier: "Confirmed",
    cadence: "Annual",
    extracts: "Dedicated AI section, capex disclosures, governance structure, strategy framing",
  },
  {
    name: "Investor day decks",
    type: "Investor relations",
    tier: "Confirmed",
    cadence: "Annual (varies)",
    extracts: "Multi-year AI roadmap, named platform commitments, ROI targets",
  },
  {
    name: "Company press releases",
    type: "Corporate comms",
    tier: "Confirmed",
    cadence: "Ongoing",
    extracts: "Product launches, partnership announcements, exec appointments",
  },
  {
    name: "Vendor case studies",
    type: "Third-party",
    tier: "Confirmed",
    cadence: "Ongoing",
    note: "Microsoft, Google, AWS, Anthropic, plus OpenAI, Mistral, AI-native start-ups",
    extracts: "Named production deployments and ROI figures, sourced from hyperscaler case studies and AI-native vendor references.",
  },
  {
    name: "Analyst notes",
    type: "Third-party",
    tier: "Estimated",
    cadence: "As published",
    note: "Bernstein, GS, JPM, Barclays",
    extracts: "Estimated AI capex, sector benchmarking, ROI modelling (tagged estimated, always)",
  },
  {
    name: "Regulatory filings",
    type: "Regulatory",
    tier: "Confirmed",
    cadence: "Annual",
    note: "CSRD sustainability statements",
    extracts: "AI governance structure, board oversight, data processor disclosures",
  },
  {
    name: "Retail newsletters · news & pulse",
    type: "Trade press",
    tier: "Signal",
    cadence: "Daily",
    note: "Retail Brew, Modern Retail by Digiday, Retail Dive, Jing Daily",
    extracts: "Feeds Industry Pulse. Named vendor moves, product launches, exec hires, DTC and retail-media shifts.",
  },
  {
    name: "Retail newsletters · strategic lens",
    type: "Trade press",
    tier: "Signal",
    cadence: "Weekly",
    note: "Future Commerce, 2PM, No Mercy / No Malice",
    extracts: "Feeds Smart Topics. Forward-looking structural trends, 3 to 5 year model shifts.",
  },
  {
    name: "AI newsletters · daily pulse",
    type: "Trade press",
    tier: "Signal",
    cadence: "Daily",
    note: "The Rundown AI, Superhuman AI, Bay Area Times",
    extracts: "Feeds Smart Topics. Vendor product launches, benchmark moves, exec-level AI framing.",
  },
  {
    name: "AI newsletters · depth",
    type: "Trade press",
    tier: "Signal",
    cadence: "Weekly",
    note: "The Batch by Andrew Ng, Import AI by Jack Clark, TLDR AI, AlphaSignal",
    extracts: "Feeds Smart Topics. Research-grade AI context, policy and safety signal, ML tooling depth.",
  },
  {
    name: "Conference floor & human insights",
    type: "Human channel",
    tier: "Rumour",
    cadence: "Continuous",
    note: "Shoptalk, NRF, Viva Tech, ChangeNOW, vendor advisory boards, partner Slack and Telegram channels",
    extracts: "Feeds the Rumours channel only. Off-record conversations, RFP intel, exec changes pre-announcement, vendor pricing rumours. Never auto-fed into Topics; requires 2+ independent corroborations before promotion to Estimated.",
  },
  {
    name: "Industry insider DMs",
    type: "Human channel",
    tier: "Rumour",
    cadence: "Continuous",
    note: "LinkedIn DMs, ex-employees, Rachel customer tips, anonymised submissions",
    extracts: "Tagged \"Rumour\" in Pulse. Always shows submitter type (insider / ex-employee / vendor / consultant) and a confidence band. Promoted to Estimated only when corroborated by a public source.",
  },
];

function EvidenceBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    Confirmed: "bg-[var(--color-rust-dim2)] text-[var(--color-rust)] border-[var(--color-rust)]",
    Estimated: "bg-[var(--color-surface-2)] text-[var(--color-text-mid)] border-[var(--color-border-strong)]",
    Signal: "bg-[var(--color-surface-2)] text-[var(--color-text-dim)] border-[var(--color-border)]",
    Rumour: "bg-[rgba(125,46,26,0.06)] text-[#a04030] border-[rgba(125,46,26,0.28)]",
  };
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded-[var(--radius-pill)] border font-medium ${styles[tier] ?? styles.Signal}`}>
      {tier}
    </span>
  );
}

export default function SourcesPage() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] mb-1">Methodology</div>
        <h1 className="font-display text-2xl font-semibold mb-1">Data sources</h1>
        <p className="text-sm text-[var(--color-text-mid)] max-w-[72ch] leading-relaxed">
          Every score, every field, every claim is traceable to a public source. This page shows you what Rachel reads, how often, and what is coming next.
        </p>
      </div>

      {/* Rachel vs ChatGPT comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-[var(--color-border-strong)] rounded-[var(--radius)] overflow-hidden mb-10">
        <div className="p-5 sm:p-6 bg-[var(--color-surface)]">
          <div className="font-display text-[11px] uppercase tracking-widest text-[var(--color-text-dim)] mb-3">
            Any search tool or ChatGPT
          </div>
          <ul className="m-0 pl-5 text-sm leading-8 text-[var(--color-text-mid)] space-y-0.5">
            <li>Returns web pages matching your query</li>
            <li>Summarises what it found</li>
            <li>No fixed data model per company</li>
            <li>Cannot tell you if a claim is confirmed or estimated</li>
            <li>Stale until you ask again</li>
            <li>Cannot compare two companies on the same axis</li>
          </ul>
        </div>
        <div className="p-5 sm:p-6 bg-[var(--color-bg,var(--color-surface-2))] border-t sm:border-t-0 sm:border-l border-[var(--color-border-strong)]">
          <div className="font-display text-[11px] uppercase tracking-widest text-[var(--color-rust)] mb-3">Rachel</div>
          <ul className="m-0 pl-5 text-sm leading-8 space-y-0.5">
            <li>Reads investor materials, scores them, and stores a <strong>structured position</strong> per company</li>
            <li>Returns a <strong>quadrant, a score, and a so-what</strong></li>
            <li>Same 10-field model for every company: directly comparable</li>
            <li>Every claim is tagged <strong>Confirmed</strong> or <strong>Estimated</strong>, with a source URL</li>
            <li>Updates on earnings day without being prompted</li>
            <li>Can show you who moved, and by how much, since last quarter</li>
          </ul>
        </div>
      </div>

      <p className="text-sm text-[var(--color-text-mid)] mb-8 max-w-[72ch] leading-relaxed">
        Most intelligence tells you what tech a company has installed. Rachel tells you what AI strategy the CEO{" "}
        <em>committed to on the last earnings call</em>. Installed vs. committed. That is the wedge.
      </p>

      {/* How sources feed Pulse vs Topics */}
      <h3 className="font-display text-[17px] font-semibold mb-2">How sources become Pulse or Smart Topics</h3>
      <p className="text-xs text-[var(--color-text-mid)] mb-4 max-w-[72ch] leading-relaxed">
        Rachel reads everything once, then routes each signal into one of two surfaces. The rule is hard: a Pulse item is one dated event, a Topic exists only when 3+ Pulse items form a pattern.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-display text-[11px] uppercase tracking-widest text-[var(--color-rust)]">Industry Pulse</span>
            <span className="text-[11px] text-[var(--color-text-dim)]">· your morning reader</span>
          </div>
          <p className="text-xs text-[var(--color-text-mid)] leading-relaxed mb-3">
            One dated event per card. Neutral voice. 40 words. Earnings drops, press releases, regulatory filings, vendor launches, exec hires.
          </p>
          <div className="font-display text-[10px] uppercase tracking-widest text-[var(--color-text-dim)] mb-2">Fed by</div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {["IR docs", "Press releases", "Retail Brew", "Modern Retail", "Retail Dive", "Jing Daily", "Regulatory filings"].map((s) => (
              <span key={s} className="text-[11px] px-2 py-0.5 border border-[var(--color-border)] rounded-[var(--radius-pill)] text-[var(--color-text-mid)] bg-[var(--color-surface-2)]">{s}</span>
            ))}
          </div>
          <p className="text-[11px] text-[var(--color-text-dim)]">
            <strong className="text-[var(--color-text-mid)]">Retention:</strong> 30 days rolling{" "}
            <strong className="text-[var(--color-text-mid)]">· Cadence:</strong> refreshed every 6h
          </p>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-display text-[11px] uppercase tracking-widest text-[var(--color-rust)]">Smart Topics</span>
            <span className="text-[11px] text-[var(--color-text-dim)]">· pre-meeting deck line</span>
          </div>
          <p className="text-xs text-[var(--color-text-mid)] leading-relaxed mb-3">
            One synthesis per card. Backed by 3+ Pulse items. Punchy voice. Ends with a "drop this in a meeting" quote.
          </p>
          <div className="font-display text-[10px] uppercase tracking-widest text-[var(--color-text-dim)] mb-2">Fed by</div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {["Pulse patterns (3+)", "Future Commerce", "2PM", "No Mercy / No Malice", "The Batch", "Import AI", "AlphaSignal", "Rundown AI", "TLDR AI", "Superhuman", "Bay Area Times"].map((s) => (
              <span key={s} className="text-[11px] px-2 py-0.5 border border-[var(--color-border)] rounded-[var(--radius-pill)] text-[var(--color-text-mid)] bg-[var(--color-surface-2)]">{s}</span>
            ))}
          </div>
          <p className="text-[11px] text-[var(--color-text-dim)]">
            <strong className="text-[var(--color-text-mid)]">Retention:</strong> until the pattern breaks{" "}
            <strong className="text-[var(--color-text-mid)]">· Cadence:</strong> re-ranked weekly
          </p>
        </div>
      </div>

      {/* The 3+ rule */}
      <div className="border-l-[3px] border-[var(--color-rust)] pl-4 py-2 mb-6 text-sm text-[var(--color-text-mid)] leading-relaxed max-w-[72ch]">
        <strong className="font-display text-[11px] uppercase tracking-widest text-[var(--color-text)] block mb-1">The 3+ rule</strong>
        A signal does not become a Smart Topic on day one. It must resurface across 3 or more Pulse items (different companies, different sources, or different dates) before Rachel lifts it into a Topic. This keeps Topics scarce and meeting-grade, and keeps Pulse honest as the raw stream. Every Topic card shows its source trail inline.
      </div>

      {/* The Rumours channel */}
      <h3 className="font-display text-[17px] font-semibold mb-1">Human insights &middot; the rumours channel</h3>
      <p className="text-xs text-[var(--color-text-mid)] mb-4 max-w-[72ch] leading-relaxed">
        Earnings calls, IR decks, and trade press cover what companies have <em>announced</em>. They miss what people <em>know</em>. The rumours channel is Rachel&apos;s explicit place for off-record intel: ex-employee tips, conference-floor conversations, vendor advisory chatter, anonymised submissions from Rachel customers. Tagged, ringfenced, never confused with confirmed evidence.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[var(--color-surface)] border border-[#7d2e1a] rounded-[var(--radius)] p-4">
          <div className="font-display text-[10px] uppercase tracking-widest text-[#7d2e1a] mb-2">01 &middot; Ingest</div>
          <p className="text-xs text-[var(--color-text-mid)] leading-relaxed m-0">
            A submission lands via the &quot;Send Rachel a tip&quot; form (Phase 2), a partner Slack DM, or a conference write-up. Recorded with submitter type (insider / ex-employee / vendor / consultant) and a confidence band 1&ndash;3.
          </p>
        </div>
        <div className="bg-[var(--color-surface)] border border-[#7d2e1a] rounded-[var(--radius)] p-4">
          <div className="font-display text-[10px] uppercase tracking-widest text-[#7d2e1a] mb-2">02 &middot; Tag</div>
          <p className="text-xs text-[var(--color-text-mid)] leading-relaxed m-0">
            Posted to Pulse with a <strong>red Rumour pill</strong>, source obscured to protect identity, and an italic caveat line. Never feeds Smart Topics. Never lifts a company score on its own.
          </p>
        </div>
        <div className="bg-[var(--color-surface)] border border-[#7d2e1a] rounded-[var(--radius)] p-4">
          <div className="font-display text-[10px] uppercase tracking-widest text-[#7d2e1a] mb-2">03 &middot; Promote</div>
          <p className="text-xs text-[var(--color-text-mid)] leading-relaxed m-0">
            When 2+ independent rumours corroborate, OR a public source confirms, Rachel promotes to Estimated and re-issues the item with the new tier. Original Rumour stays in the trail for honesty.
          </p>
        </div>
      </div>

      <div className="border-l-[3px] border-[#7d2e1a] pl-4 py-2 mb-10 text-sm text-[var(--color-text-mid)] leading-relaxed max-w-[72ch]">
        <strong className="font-display text-[11px] uppercase tracking-widest text-[var(--color-text)] block mb-1">Why bother with rumours at all?</strong>
        Two reasons. First, GTM users tell us the most useful intel often arrives 6&ndash;12 weeks before any earnings call mentions it: an RFP scope, a CTO leaving, a vendor losing the renewal. Pretending that signal doesn&apos;t exist leaves you behind your competitors who already heard it on Slack. Second, the alternative is for that intel to live in scattered DMs forever &mdash; ringfencing it on Rachel keeps it traceable, time-stamped, and promotable when corroboration arrives.
      </div>

      {/* Active sources table */}
      <h3 className="font-display text-[17px] font-semibold mb-1">
        Active sources{" "}
        <span className="text-xs font-normal text-[var(--color-text-dim)]">used today for all flagship companies</span>
      </h3>
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] overflow-hidden mb-10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="px-4 py-3 text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)]">Source</th>
              <th className="px-4 py-3 text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)]">Type</th>
              <th className="px-4 py-3 text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)]">Evidence tier</th>
              <th className="px-4 py-3 text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)]">Cadence</th>
              <th className="px-4 py-3 text-[10px] font-display uppercase tracking-widest text-[var(--color-text-dim)] hidden md:table-cell">What Rachel extracts</th>
            </tr>
          </thead>
          <tbody>
            {SOURCES_TABLE.map((s, i) => (
              <tr key={i} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-2)] transition-colors">
                <td className="px-4 py-3 text-sm font-medium">
                  {s.name}
                  {s.note && <span className="block text-[11px] font-normal text-[var(--color-text-dim)] mt-0.5">{s.note}</span>}
                </td>
                <td className="px-4 py-3 text-xs text-[var(--color-text-mid)]">{s.type}</td>
                <td className="px-4 py-3"><EvidenceBadge tier={s.tier} /></td>
                <td className="px-4 py-3 text-xs text-[var(--color-text-mid)]">{s.cadence}</td>
                <td className="px-4 py-3 text-xs text-[var(--color-text-mid)] leading-relaxed hidden md:table-cell">{s.extracts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roadmap */}
      <h3 className="font-display text-[17px] font-semibold mb-1">
        What&apos;s next{" "}
        <span className="text-xs font-normal text-[var(--color-text-dim)]">ranked by signal quality and build cost</span>
      </h3>
      <p className="text-xs text-[var(--color-text-mid)] mb-4 max-w-[72ch] leading-relaxed">
        No dates, sequence. What would <em>you</em> unlock first? Tell me in the interview, or mail me a one-line ranking.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-5">
          <div className="font-display text-[10px] uppercase tracking-widest text-[var(--color-rust)] mb-3">Ship next · highest impact</div>
          <ul className="pl-5 text-xs leading-7 text-[var(--color-text-mid)] space-y-2">
            <li>
              <strong className="text-[var(--color-text)]">Exec appointments tracker</strong>
              <br />
              <span className="text-[11px]">CAIO / CDO hires scraped from company press pages. Board-level signal = budget unlocking now.</span>
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Conference speaker rosters</strong>
              <br />
              <span className="text-[11px]">Shoptalk Europe, World Retail Congress, Viva Tech. Speaker = public commitment to a platform.</span>
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Consumer-facing tech stack</strong>
              <br />
              <span className="text-[11px]">Wappalyzer / BuiltWith on retailer domains. Reveals CDP, personalisation, commerce platform.</span>
            </li>
          </ul>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-5">
          <div className="font-display text-[10px] uppercase tracking-widest text-[var(--color-text-mid)] mb-3">Coming soon</div>
          <ul className="pl-5 text-xs leading-7 text-[var(--color-text-mid)] space-y-2">
            <li>
              <strong className="text-[var(--color-text)]">CSRD AI governance disclosures</strong>
              <br />
              <span className="text-[11px]">Wave 1 filers (Carrefour, L&apos;Oréal, LVMH, Kering, Unilever, Inditex). Annual, PDF-extracted.</span>
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Vendor case study pages</strong>
              <br />
              <span className="text-[11px]">Microsoft, Google, AWS, Anthropic, OpenAI, Mistral, Databricks. Named wins per EU account, searchable from the vendor side.</span>
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Ask Rachel</strong>
              <br />
              <span className="text-[11px]">Natural-language queries across the full knowledge base. Every answer cited to a source document.</span>
            </li>
          </ul>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-5">
          <div className="font-display text-[10px] uppercase tracking-widest text-[var(--color-text-dim)] mb-3">Exploratory</div>
          <ul className="pl-5 text-xs leading-7 text-[var(--color-text-mid)] space-y-2">
            <li>
              <strong className="text-[var(--color-text)]">Patent activity</strong>
              <br />
              <span className="text-[11px]">Google Patents + EPO API by assignee. R&D direction signal. Most useful for L&apos;Oréal, LVMH, Inditex.</span>
            </li>
            <li>
              <strong className="text-[var(--color-text)]">GitHub org activity</strong>
              <br />
              <span className="text-[11px]">ML repos = build-vs-buy tension. Zalando, ASOS, Ocado, H&M have active orgs worth watching.</span>
            </li>
            <li>
              <strong className="text-[var(--color-text)]">AI hiring signals</strong>
              <br />
              <span className="text-[11px]">Open AI roles by retailer: trend, volume, top keywords. Leading indicator of build-vs-buy decisions.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* What Rachel does not use */}
      <div className="border border-dashed border-[var(--color-border-strong)] rounded-[var(--radius)] p-4 text-sm text-[var(--color-text-mid)] leading-relaxed">
        <strong className="font-display text-[11px] uppercase tracking-widest text-[var(--color-text)]">What Rachel does not use</strong>
        <br />
        LinkedIn scraping (ToS risk), internal purchase-order data, dark web, proprietary datasets, or paywalled broker terminals. Everything Rachel reads is publicly available. If it requires a login we do not own, it is out of scope.
      </div>
    </div>
  );
}
