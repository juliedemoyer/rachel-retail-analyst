# Make It Yours

Rachel ships configured for a fictional analyst covering a fictional market.
Before your first real run, answer the questions below. Every answer maps to a
field in `config/`, and nothing outside `config/` and `data/companies/` needs
editing.

One thing to understand before you start: the shipped `data/companies/`
dataset is a frozen, date-stamped snapshot (July 2026) of a European retail
watchlist, published as a worked example of the methodology. You can keep it,
delete it, or replace it with your own market; if you keep it, keep the date
stamps, because an undated score is a claim the sources do not support.

Work through them in order. Sections 1 to 3 take about thirty minutes and get
you a running instance. Section 4 is the one that takes real thought, and it is
the one that determines whether the output is worth reading.

## 1. Who does the agent work for? → `config/profile.json`

| Question | Field | Shipped example |
|---|---|---|
| What should the agent call itself? | `agentName` | `"Rachel"` |
| Whose name signs the outbound emails? | `ownerName` | `"Alex Rivera"` |
| What is that person's job, in one clause? | `ownerRole` | `"a principal-level AI and data strategy consultant advising large consumer and retail groups on their AI roadmaps"` |
| Who is the eventual reader? | `audience` | `"executives and board-level stakeholders"` |
| What geography? | `region` | `"EMEA"` |
| What beat? | `beat` | `"retail and consumer intelligence"` |
| Which vendors are in scope? | `vendors` | `["microsoft", "google", "anthropic"]` |
| Which company is the canonical out-of-scope example? | `outOfScopeExample` | `"Walmart"` |

`ownerRole` and `audience` are not decoration. They go straight into the system
prompt and they are what stops the agent writing like a press release. "A
principal-level consultant briefing a board" produces different sentences from
"a student researching an essay", and the difference shows up in every answer.

`outOfScopeExample` deserves a moment. It appears in the refusal example inside
the system prompt, so pick a company that is genuinely famous and genuinely
outside your coverage. If you pick something ambiguous, the model will hedge
about whether to refuse.

`ownerName` can also be overridden per-deployment with the `OWNER_NAME` env var,
which is useful if you fork the repo publicly but do not want your name in it.

## 2. Which companies? → `config/watchlist.json`

- **`companies`** is the full tracked list. Every slug here must have a matching
  `data/companies/{slug}.md` file. The shipped list is 50+ large European
  consumer and retail companies; delete it entirely and put your own market in.
- **`prioritySeed`** is the four companies pre-loaded into a new visitor's
  priority watchlist on first visit. Pick the four you would actually check
  every morning, because these also drive which headlines trigger a cross-agent
  sprint task when `SPRINT_BOARD_URL` is set.

Worked example: to swap the beat from European retail to North American
healthcare, you would empty `companies`, add your own slugs, author one
`data/companies/{slug}.md` per company following
[ADDING-A-COMPANY.md](ADDING-A-COMPANY.md), and change nothing in `app/` or
`lib/`. The sector enum in `lib/profiles/schema.ts` is the one exception: it is
a typed union, so a genuinely different industry means editing that list.

## 3. How do you run it? → environment and cron

- **Which of the optional services do you want?** Clerk (auth), Resend (email),
  PostHog (analytics), Sentry (errors) and the reranker keys are all optional.
  Every one of them is a no-op when its env var is unset, so start with none of
  them and add them when you miss them. Upstash Redis, Upstash Vector, Vercel
  Blob and `ANTHROPIC_API_KEY` are the four you actually need.
- **What time do the jobs run?** `vercel.json` ships with the scrape at 00:00
  UTC, extraction at 01:00, and the pulse refresh at 08:00. The gap between
  scrape and extract exists so extraction never races a half-finished download.
- **Is `CRON_SECRET` set?** If not, anyone who guesses `/api/cron?job=ir-scrape`
  can run your ingestion. Set it.
- **Email?** The only email surface is an owner-facing ingest summary after
  the nightly extraction. Leave `RESEND_API_KEY` unset and nothing is ever
  sent. See [EMAILS.md](EMAILS.md).

## 4. What does a good score mean in your market? → `config/scoring.json`

This is the opinionated part, and copying the shipped values without thinking
about them is the main way to end up with a database nobody trusts.

**The two axes.** Rachel scores rhetoric (1 to 5, how warmly the board talks
about AI) separately from production (0 to 5+, how many named tools are
confirmed live). They are never collapsed into one number except for sort
order. Ask yourself what the equivalent split is for your beat: the general
form is "what they say" against "what you can verify they shipped", and the
interesting companies are always the ones where those two disagree.

**The anchors.** The shipped rhetoric anchors run from "no mention in the last
earnings call" at 1 to "framed as a core moat, CEO-led, quantified" at 5. Write
your own anchors as observable tests, not adjectives. "Strategic AI narrative
with named tools or partners" is checkable by two different people who will
mostly agree. "Fairly committed to AI" is not.

**The quadrants.** Four names, four one-line definitions. The shipped set is
performer, narrative-led, silent builder, not yet visible. Keep whatever names make the
distinction land in your market. Silent builder is the one that earns its keep,
because a company doing real work and saying nothing is invisible to every
single-score ranking.

**The evidence classes.** `confirmed`, `estimated`, `noEvidence`. Do not merge
these. The shipped rule is that confirmed requires a named source URL from a
filing, transcript, or official release; estimated covers indirect signal like a
partner directory listing; and absence is recorded explicitly rather than left
blank. A blank cell and a researched "we looked and there is nothing" are
identical in the database and completely different in a conversation.

**The freshness windows.** `pulseMaxAgeDays` defaults to 7, and the agent hard
rejects any pulse item whose underlying article is older than that. If your beat
moves slower, raise it. `staleAccountDays` defaults to 30 and drives the "this
profile has not been updated" flag.

## 5. Sanity check

After configuring, run the eval harness before you trust anything:

```bash
npx tsx scripts/eval/run-eval.ts
```

It asks a fixed set of questions, including several the knowledge base cannot
answer, and scores whether the agent cited a real source or refused cleanly. If
it invents an answer for a question about a company you have not ingested, the
fix is almost always in the system prompt rules in `lib/agents/rachel.ts`, not
in the retrieval settings.

Then open `/app?demo=1` and compare it against your real instance. If the real
one looks emptier than the demo, you have not seeded profiles yet.
