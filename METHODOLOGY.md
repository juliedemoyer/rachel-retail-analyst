# Methodology

Every score in this repository is the mechanical output of the rubric below,
applied to cited public documents. Nothing here is a personal opinion about
any company, an investment view, or advice. If you disagree with a score, the
disagreement is auditable: check the anchors against the sources on the
profile, and if a fact is wrong, see [CORRECTIONS.md](CORRECTIONS.md).

## Sources

Only public materials are used, in this order of authority:

1. **Investor relations documents** — earnings releases, transcripts, annual
   reports, capital markets day presentations
2. **Official vendor case studies and press releases** — a company named by
   its own vendor in a published case study
3. **Industry press** — used for context, never as the sole basis for a
   `confirmed` field

No private information, no scraped content behind logins, no rumour. Where a
human-channel signal exists at all, it is quarantined at rumour tier, excluded
from every count, and never attached to a real company in this public
snapshot.

## Evidence tiers

Every extracted field carries one of three states:

- **Confirmed** — named in a filing, transcript, or official release. Carries
  the source URL.
- **Estimated** — strong indirect signal (a partner directory listing, a
  hiring pattern). Always labelled. Never rendered as confirmed.
- **No evidence** — looked for and not found. Recorded explicitly, because
  absence in the public record is itself a finding, and because a blank cell
  and a researched absence must never look the same.

## The two axes

**Rhetoric (1 to 5)** — how the board talks about AI in investor materials.

| Score | Observable test |
|---|---|
| 1 | No AI mention in the last earnings call or annual report |
| 2 | Passing mentions, no dedicated narrative |
| 3 | Dedicated AI commentary, no quantified commitment |
| 4 | Strategic AI narrative with named tools or partners |
| 5 | AI framed as core strategy, CEO-led, with quantified figures |

**Production (0 to 5+)** — how many named AI tools are publicly confirmed to
be in production. Not pilots, not roadmap items, not partnerships: named,
live, sourceable.

The anchors are written as observable tests, not adjectives, so two people
applying them to the same documents will mostly land on the same number.
Composite = (rhetoric + production) / 2, used for sort order only.

## The quadrants

| Quadrant | Meaning |
|---|---|
| **Performer** | High rhetoric, confirmed production |
| **Narrative-led** | High rhetoric, few confirmed cases |
| **Silent builder** | Low rhetoric, confirmed production |
| **Not yet visible** | Nothing about AI can be read from the public record |

The names are deliberately descriptive rather than evaluative. "Not yet
visible" means exactly that: the public record shows nothing, which can mean
a company is doing nothing, or doing plenty and disclosing none of it. The
framework measures disclosure against disclosure, and cannot see past it.
Businesses whose core product is itself a model render off-matrix, because
scoring them on the same axes as a grocer describes neither.

## Freshness and freezing

Every score is stamped with the filing date it derives from, and this public
repository is an **archival snapshot**: data frozen as of July 2026 and not
maintained. Companies keep filing; these files do not keep up. Read any score
here as "as of the cited document", never as "currently".

## Reproducing a score

1. Open the company's file in `data/companies/`.
2. Follow the source URL on each field.
3. Apply the anchor tables above to what the document actually says.
4. Where your reading differs, the anchors, the source, or the extraction is
   at fault — all three are inspectable, and corrections are welcome.

## What this is not

- Not investment advice, and not a buy/sell/hold signal of any kind
- Not affiliated with, endorsed by, or paid by any listed company or vendor
- Not a measure of how good a company's AI actually is — only of what its
  public record discloses, scored consistently
