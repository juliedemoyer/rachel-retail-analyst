# RACHEL · Your 24/7 Retail Intelligence Analyst

[![CI](https://img.shields.io/github/actions/workflow/status/juliedemoyer/rachel-retail-analyst/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/juliedemoyer/rachel-retail-analyst/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Built with Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-d97757?style=flat-square)](https://claude.com/claude-code)
[![Last commit](https://img.shields.io/github/last-commit/juliedemoyer/rachel-retail-analyst?style=flat-square&label=updated)](https://github.com/juliedemoyer/rachel-retail-analyst/commits/main)
[![Live](https://img.shields.io/badge/live-rachelretail.com-0b7285?style=flat-square)](https://www.rachelretail.com)

**Live at [www.rachelretail.com](https://www.rachelretail.com)**

> **Archival snapshot.** The shipped dataset (`data/companies/`) is frozen as
> of July 2026 and not maintained: every score is stamped with the filing it
> derives from and should be read "as of that document", never "currently".
> Scores are the mechanical output of the published rubric
> ([METHODOLOGY.md](METHODOLOGY.md)) applied to cited public sources, with a
> corrections process ([CORRECTIONS.md](CORRECTIONS.md)). The living part of
> this repo is the engine, not the snapshot.

An open-source, autonomous Claude agent that does the job of a sector research
analyst: it ingests investor documents the moment they publish, scores every
company it watches on a two-axis AI adoption model, answers questions with a
citation or refuses to answer at all, and posts a daily pulse of what actually
changed. It runs unattended on cron, and it is built so that an ungrounded
claim is a bug rather than a stylistic complaint.

It grew out of a real market-intelligence practice and is published here as a
reference implementation of a **grounded, citation-first RAG agent with
scheduled ingestion and a refusal contract**. "EMEA retail and consumer AI
adoption" is the concrete example, but the architecture (ingest → chunk →
embed → retrieve → score → refuse or cite) generalizes to any beat where you
need to be the best-briefed person in the room and cannot afford to be wrong.

**Try it without deploying anything:** clone the repo, `npm install`,
`npm run dev`, then open `http://localhost:3000/app?demo=1`. Demo mode skips
auth entirely, serves fictional companies from `config/demo-companies.json`,
and keeps every write in memory, so you can browse the matrix, open a profile,
and read the pulse feed with no Redis, no Clerk, and no API keys.

*All companies, figures, quotes and people in demo mode are invented.*

## Why this exists

Being the best-informed person in a room is mostly unglamorous work. Somebody
has to read the earnings transcript, find the one sentence where the CEO
actually commits to something, check whether the tool they named is live or a
pilot, and remember what the same company said nine months ago. That work does
not scale with ambition, it scales with hours, and the hours are not there.

So most people do the honest version of the shortcut. They read the headline,
skim an analyst summary, and repeat a claim they cannot source. It sounds fine
in the room, and it is wrong often enough to eventually cost something.

Rachel closes that gap by doing the reading. It watches the investor relations
pages of every company on your watchlist, pulls new filings within hours of
publication, extracts the structured fields, and holds the corpus so that when
you ask a question the answer comes back with the document and the date
attached. When there is no source, it says so and stops, which is the part
that took the longest to get right and the part that makes it useful.

It is not built to replace analysts, researchers, or your own judgment about
what a company is really doing. Scoring is a prompt for a conversation, not a
verdict. What it replaces is the reading you were never going to have time to
do, so the judgment you do apply is applied to better material.

And why publish it? Because grounded retrieval is talked about far more than it
is shipped, and most demonstrations quietly skip the hard part: what the system
does when it does not know. The refusal contract here is enforced in the system
prompt, tested in the eval harness, and visible in the code. If it helps your
own research practice, or becomes the skeleton of an agent for a completely
different beat, it has done its job.

## What it does

- **Ingests** investor documents automatically: a nightly scraper walks each
  company's IR page, detects new filings, and pushes PDFs through extraction
  into the knowledge base
- **Extracts** 27 structured fields per company (revenue, margin, headcount,
  named production tools, vendor partners, board AI language) with an evidence
  tier on every one: confirmed, estimated, or absent
- **Scores** each company on two independent axes and places it in a quadrant,
  so "talks a lot about AI" and "ships a lot of AI" never get conflated
- **Answers** questions through a grounded RAG loop that must call
  `searchKnowledgeBase` before making a claim, cites every answer, and refuses
  cleanly when the corpus has nothing
- **Publishes** a daily pulse of genuinely new signal, deduplicated across the
  RSS poller and the agent, with anything older than seven days rejected
- **Tracks** its own token cost per workflow against a daily budget

## Architecture

```
Vercel Cron
   │
   ├─► /api/cron?job=ir-scrape ────► walks IR pages, finds new filings → Blob
   │
   ├─► /api/cron?job=ir-extract ───► PDF → text → structured fields → candidates
   │                                  (soft fields queue for human approval)
   │
   ├─► /api/cron?job=rss-poll ─────► configured feeds → pulse candidates
   │
   └─► /api/pulse/refresh ─────────► the agent: searches the KB, posts only
                                      what it can cite
                                          │
                                          ▼
                            lib/agents/rachel.ts (tool loop)
                            searchKnowledgeBase, getWatchlist,
                            getAccount, postPulseItem
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    ▼                                           ▼
        Upstash Vector (KB index)                  Upstash Redis (all state)
        chunk → embed → hybrid search              profiles, snapshots, pulse,
        lexical + vector + rerank                  candidates, token log
                    └─────────────────────┬─────────────────────┘
                                          ▼
                            Next.js app (app/) — matrix, leaderboard,
                            company profiles, Ask Rachel, admin queue
```

State lives in Upstash. Documents live in Vercel Blob. There is no relational
database and no ORM. The knowledge base is a hybrid retriever (lexical BM25-ish
scoring unioned with vector search, then reranked) rather than pure embedding
similarity, because company names and ticker symbols are exactly the queries
embeddings handle worst.

## Quickstart

```bash
git clone https://github.com/juliedemoyer/rachel-retail-analyst.git
cd rachel-retail-analyst
npm install
npm run dev
```

Open `http://localhost:3000/app?demo=1` to browse with fictional data and no
backend at all. When you want the real thing:

1. Deploy to Vercel (import the repo, it deploys as-is).
2. Add Upstash Redis and Upstash Vector from the Storage tab, and Vercel Blob.
3. Set `ANTHROPIC_API_KEY` and `CRON_SECRET` in Vercel env vars. Clerk (a
   single admin sign-in), Resend, PostHog and Sentry are all optional and
   no-op when unset. There is no signup flow: this is a single-admin
   instance with a public read surface.
4. Answer the questions in **[docs/MAKE-IT-YOURS.md](docs/MAKE-IT-YOURS.md)**.
   They walk you through `config/profile.json` (who the agent works for),
   `config/watchlist.json` (which companies), and `config/scoring.json`
   (what the axes mean in your market).
5. Author one company file in `data/companies/` and run the seed script.
   [docs/ADDING-A-COMPANY.md](docs/ADDING-A-COMPANY.md) is the full walkthrough.

## Model routing

The scrapers and the RSS poller make no model calls. Extraction and Ask both
route through `lib/agents/model-router.ts`, which sends retrieval and field
extraction to Haiku and reserves Sonnet for synthesis. Two switches reduce the
nightly extraction pass further: `IR_EXTRACT_USE_BATCH=1` routes extraction
through the Message Batches API for a 50% discount, and `EXTRACT_MODEL` lets
you pin a cheaper model. Every model call is logged per workflow to
`rachel:tokens:*` and rendered in the admin usage view.

## Design decisions

Choices that shaped this more than they might look like at first glance:

- **Refusal is a feature with a test, not a disclaimer.** The system prompt
  forbids continuing after "I don't have a grounded source for that", and the
  eval harness in `scripts/eval/` scores exactly that behaviour. An agent that
  hedges its way past a knowledge gap is worse than useless in a briefing,
  because you cannot tell which sentences to trust.
- **Two axes, never one score.** Board rhetoric and confirmed production
  deployments are measured separately and only averaged for sort order. Every
  single-number AI maturity ranking quietly rewards companies with good
  investor relations writing. Splitting the axes is what surfaces the silent
  builders, and they are the interesting ones.
- **Evidence tiers on every field.** Each extracted value carries `confirmed`
  or `estimated`, and absence is recorded rather than left blank. A blank cell
  and a researched "no evidence" look identical in a database and mean
  completely different things in a conversation.
- **Hybrid retrieval, not pure vector.** Lexical and vector results are unioned
  and reranked. Embeddings are good at "companies reducing supply chain waste"
  and bad at "Bellamy" being a company rather than a word, and half of a
  research query is proper nouns.
- **Human approval on soft fields.** Numbers extracted from a filing land
  directly. Judgment fields (framing, quadrant, whether a tool is genuinely in
  production) queue in `rachel:candidates:*` for approval in the admin view.
  The model proposes, a person disposes.
- **Descriptive quadrant names, not verdicts.** The low-rhetoric/low-production
  quadrant is called "Not yet visible", not "laggard", because the framework
  measures disclosure, and an absence of disclosure is not an absence of work.
  A scoring system that editorialises its own labels invites exactly the
  headlines it should not.
- **A frozen dataset with a public methodology beats a stale opinion.** The
  snapshot is date-stamped, the rubric is reproducible, and corrections ship
  by issue. That combination is what lets a scored dataset about real
  companies live in a public repo at all.
- **Nothing personal in the code.** Every company, region, vendor, and person
  lives in `config/`. `lib/config.ts` is the only door between the JSON and the
  application, so a fork edits data and never touches logic.

## What's configurable vs. what's code

| File | Controls |
|---|---|
| `config/profile.json` | Who the agent works for, the beat, the region, vendors in scope |
| `config/watchlist.json` | Which brands are tracked (50+ shipped), which four seed the priority list |
| `config/scoring.json` | The two axes, their anchors, the quadrant definitions, freshness windows |
| `config/demo-companies.json` | The fictional dataset served in `?demo=1` |
| `data/companies/*.md` | One authored profile per company, YAML front-matter validated against `lib/profiles/schema.ts`. Licensed CC BY 4.0 as a dataset (`data/companies/LICENSE`) |

Nothing in `app/` or `lib/` needs editing for normal use.

## Security notes

- Demo mode (`?demo=1`) skips authentication by design. It also short-circuits
  every write, so nothing it does can reach your Redis instance. Do not extend
  it to touch real data.
- Write endpoints are gated by Clerk, configured as a single admin sign-in.
  There is no signup flow, no trial system, and no user management: the beta
  machinery this instance once ran has been removed from the public release.
  Admin routes re-fetch the user record rather than trusting the session JWT,
  because Clerk's default session claims do not carry `publicMetadata`.
- Cron endpoints check `CRON_SECRET`. Deploy without setting it and your
  ingestion jobs are open to anyone who guesses the path.
- All state lives in your own Upstash instance and your own Blob store.
  Nothing is sent to a third party except the Anthropic API and the IR pages
  and feeds you configure.
- **Responsible scraping.** The IR scraper reads public investor relations
  pages only: one pass per company per night, a descriptive user agent, no
  authentication circumvented, no personal data collected. Keep it that way.
- The knowledge base will contain documents you do not own the copyright to.
  Ingest for your own analysis, do not redistribute the corpus, and do not
  commit downloaded filings to the repo. `.gitignore` covers the obvious paths;
  the judgment is yours.

## Part of a multi-agent team (optional)

Rachel runs perfectly well standalone, but it was designed as one member of a
small team of domain agents, each with its own repo, data, and schedule. They
coordinate through two lightweight channels rather than a framework:

- **A shared sprint board.** Set `SPRINT_BOARD_URL` and Rachel starts posting
  tasks to `{SPRINT_BOARD_URL}/api/tasks`, tagged `collab:<agent>` when another
  agent should pick them up. Leave it unset and every call is a clean no-op.
- **Shared notes.** Each agent writes a short end-of-day note and reads the
  team's notes at session start. Plain Markdown files are enough.

An example handoff: Rachel's nightly extraction flags that a watchlist company
just named its first Chief AI Officer → it posts a task tagged `collab:careers`
→ the career agent folds that into its next morning briefing.

Sibling repos:

- [josh-career-agent](https://github.com/juliedemoyer/josh-career-agent) — a
  daily-autonomous career transition agent

## Docs

- [One-page overview](docs/Rachel-One-Pager.pdf) — two-page visual summary (PDF). Also served at `/one-pager` once deployed
- [METHODOLOGY.md](METHODOLOGY.md) — the rubric, the evidence tiers, and how to reproduce any score
- [CORRECTIONS.md](CORRECTIONS.md) — the right-of-reply process for listed companies
- [docs/MAKE-IT-YOURS.md](docs/MAKE-IT-YOURS.md) — the questions to answer before your first run
- [docs/AGENT.md](docs/AGENT.md) — who Rachel is, the scoring model, the refusal contract
- [docs/ADDING-A-COMPANY.md](docs/ADDING-A-COMPANY.md) — the full walkthrough for a new company
- [docs/EMAILS.md](docs/EMAILS.md) — the transactional email surface, and how to turn it off
- [CLAUDE.md.example](CLAUDE.md.example) — optional template if you also want to drive this
  interactively with Claude Code, separate from the deployed cron agent

## License

Code: MIT — see [LICENSE](LICENSE).
Dataset (`data/companies/`): CC BY 4.0 — see [data/companies/LICENSE](data/companies/LICENSE).
