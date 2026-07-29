# Email

One email surface remains, and it is a no-op when `RESEND_API_KEY` is unset.

## Owner ingest summary

| | |
|---|---|
| Trigger | `auto-approve-candidates` cron, after a nightly extraction run that processed at least one candidate |
| Code path | `app/api/cron/route.ts` → `sendAutoApproveSummaryToOwner()` |
| Recipient | `NOTIFY_EMAIL` env |
| Body | Per-company table of auto-approved versus review-queued fields, with a link to `/app/admin/candidates` |

Confirmed financials (revenue, operating profit, net cash, employees) apply
directly. Judgment fields queue for review, and this email is how you find out
there is something to review.

## What was removed

Earlier versions of this codebase ran a private beta with a signup flow,
welcome emails, per-user earnings notifications, trial-expiry reminders, and a
broadcast-report sender. All of it has been removed from this public release:
the app is a single-admin instance with a public read surface. If you want a
multi-user product on top of this, that is a fork, not a flag.

## Editing the remaining template

The HTML lives inline in `app/api/cron/route.ts`. To preview, copy the string
into an `.html` file and open it in a browser.

Turning email off entirely: leave `RESEND_API_KEY` unset. Nothing else changes.
