/**
 * /api/cron — unified cron dispatcher.
 *
 * Vercel Cron calls this with a `?job=` query param. All cron jobs share
 * one handler so the vercel.json cron table stays readable.
 *
 * Jobs:
 *   ir-scrape       — smart-throttled IR page scraper (00:00 UTC daily)
 *                     Only scrapes companies within nextTradingUpdate +/- 14d / +30d window.
 *   ir-extract      — LLM field extraction to candidates queue (01:00 UTC daily + on-demand)
 *   rss-poll        — RSS feed poller (weekdays 07:00 UTC)
 *   vendor-diff     — vendor retail-stack diff (Monday 08:00 UTC)
 *   pulse-refresh   — grounded pulse generation (every 2nd day 07:00 UTC)
 *   bump-calendar   — Self-healing: bump any nextTradingUpdate that has slipped
 *                     into the past by +90d (or more, until future). Runs daily
 *                     ahead of ir-scrape so the scraper sees up-to-date windows.
 *   auto-approve-candidates — After ir-extract, auto-approves high-confidence
 *                     fields (evidenceTier=confirmed AND on the financial
 *                     allowlist), leaves the rest in the queue, and emails the
 *                     owner a review summary (no-op without RESEND_API_KEY).
 *   topics-proposer — Cluster last-7d pulse items, propose new Smart Topics
 *                     (Monday 06:00 UTC weekly). Output to rachel:topics:candidates.
 *   vault-to-pulse  — Read other agents' EOD vault snapshots from Redis,
 *                     surface Rachel-targeted signals into pulse (daily 06:30 UTC).
 *
 * Auth: CRON_SECRET header set by Vercel Cron runtime.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { scrapeAllAccounts } from "@/lib/sources/ir-scraper";
import { pollAllFeeds } from "@/lib/sources/rss";
import { diffAllVendorPages } from "@/lib/sources/vendor-scrape";
import { runIrExtract } from "@/lib/extract/ir-extract";
import { proposeTopics } from "@/lib/sources/topics-proposer";
import { runVaultToPulse } from "@/lib/sources/vault-bridge";
import {
  readAllProfiles,
  writeProfile,
  rebuildProfilesAll,
  readProfile,
  readPendingCandidates,
  updateCandidateStatus,
  writeSnapshot,
} from "@/lib/profiles/store";
import { redis } from "@/lib/redis";
import { SPRINT_BOARD_URL, OWNER_NAME } from "@/lib/config";

// ── Earnings-window throttle ───────────────────────────────────────────────────

interface CalendarEntry {
  slug: string;
  nextTradingUpdate?: string;
}

/**
 * Return slugs whose nextTradingUpdate falls within the scrape window:
 *   [today - BEFORE_DAYS, today + AFTER_DAYS]
 * This cuts ~85% of nightly scrapes while never missing an earnings drop.
 */
async function slugsInEarningsWindow(
  beforeDays = 14,
  afterDays = 30,
): Promise<string[] | null> {
  try {
    const raw = await readFile(
      join(process.cwd(), "data/earnings-calendar.json"),
      "utf-8",
    );
    const calendar = JSON.parse(raw) as { entries: CalendarEntry[] };
    const today = new Date();
    const lo = new Date(today); lo.setDate(lo.getDate() - beforeDays);
    const hi = new Date(today); hi.setDate(hi.getDate() + afterDays);

    const inWindow = calendar.entries
      .filter((e) => {
        if (!e.nextTradingUpdate) return false;
        const d = new Date(e.nextTradingUpdate);
        return d >= lo && d <= hi;
      })
      .map((e) => e.slug);

    return inWindow;
  } catch {
    // If calendar is missing, fall back to scraping all.
    console.warn("[cron] earnings-calendar.json not found — scraping all accounts");
    return null;
  }
}

export const maxDuration = 300;

function patchSprintRun(opts: {
  job: string;
  startedAt: number;
  status: "ok" | "error";
  note: string;
}): void {
  const secret = process.env.DASHBOARD_SECRET;
  if (!secret) return;
  fetch(`${SPRINT_BOARD_URL}/api/sprints`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "x-dashboard-secret": secret,
    },
    body: JSON.stringify({
      agent: "rachel",
      started_at: new Date(opts.startedAt).toISOString(),
      finished_at: new Date().toISOString(),
      status: opts.status,
      note: `[cron:${opts.job}] ${opts.note}`,
    }),
  }).catch(() => { /* non-fatal */ });
}

export async function GET(req: Request) {
  // Verify cron secret
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const job = url.searchParams.get("job");
  // Optional: ?slug=lvmh  or  ?slug=lvmh,kering  (ir-extract only)
  const slugParam = url.searchParams.get("slug") ?? undefined;

  const requestId = crypto.randomUUID();
  const t0 = Date.now();

  console.log(JSON.stringify({ level: "info", msg: "cron_start", job, requestId }));

  try {
    let result: unknown;

    switch (job) {
      case "ir-scrape": {
        // Smart-throttled: only scrape companies near their earnings date.
        // ?force=true bypasses the window check and scrapes everything.
        const force = url.searchParams.get("force") === "true";
        const window = force ? null : await slugsInEarningsWindow();
        if (window !== null && window.length === 0) {
          result = { total: 0, added: 0, errors: 0, skipped: "outside_window", slugs: [] };
        } else {
          result = await scrapeAllAccounts(window ?? undefined);
        }
        break;
      }
      case "rss-poll": {
        result = await pollAllFeeds();
        break;
      }
      case "vendor-diff": {
        result = await diffAllVendorPages();
        break;
      }
      case "ir-extract": {
        // Trigger LLM extraction for one company or all.
        // ?slug=lvmh           → extract single company
        // ?slug=lvmh,kering    → extract multiple
        // (no slug param)      → extract all companies in the manifest
        const slugs = slugParam
          ? slugParam.split(",").map((s) => s.trim()).filter(Boolean)
          : undefined;
        result = await runIrExtract({ slugs });
        break;
      }
      case "bump-calendar": {
        // Auto-heal stale nextTradingUpdate dates by adding +90d until the
        // value is in the future. Idempotent: dates already in the future
        // are left untouched.
        result = await autoBumpStaleEarningsDates();
        break;
      }
      case "auto-approve-candidates": {
        // Approve high-confidence financial fields automatically, leave
        // soft/subjective fields for the owner to review, email summary + users.
        result = await autoApproveCandidatesAndNotify();
        break;
      }
      case "topics-proposer": {
        // Cluster last-7d pulse items, propose new Smart Topics. Output
        // goes to rachel:topics:candidates for the owner to review or promote.
        result = await proposeTopics();
        break;
      }
      case "vault-to-pulse": {
        // Read other agents' latest EOD vault entries from Redis, parse
        // their "Signal for other agents" sections, push Rachel-targeted
        // signals into rachel:pulse.
        result = await runVaultToPulse("rachel");
        break;
      }
      default:
        return NextResponse.json({ error: `Unknown job: ${job}` }, { status: 400 });
    }

    console.log(
      JSON.stringify({ level: "info", msg: "cron_done", job, requestId, ms: Date.now() - t0 }),
    );
    patchSprintRun({ job: job!, startedAt: t0, status: "ok", note: "completed" });
    return NextResponse.json({ ok: true, job, result });
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error(JSON.stringify({ level: "error", msg: "cron_error", job, requestId, error, ms: Date.now() - t0 }));
    patchSprintRun({ job: job!, startedAt: t0, status: "error", note: error.slice(0, 200) });
    return NextResponse.json({ error }, { status: 500 });
  }
}

/* ------------------------------------------------------------------ */
/*  bump-calendar job                                                  */
/* ------------------------------------------------------------------ */

/**
 * Self-healing earnings calendar. Walks every profile, and for any whose
 * nextTradingUpdate has slipped into the past, adds 90 days until the date
 * is in the future. Companies report quarterly; if our cached date is past
 * we assume they have reported and the next event is +90d out.
 *
 * Idempotent. Future dates are left untouched. After bumping, the
 * denormalised rachel:profiles:all list is rebuilt so /api/profiles and
 * /api/earnings-calendar reflect the new dates immediately.
 *
 * Note: this is a fallback. The IR-extract pipeline should set the correct
 * nextTradingUpdate when it ingests an actual earnings PDF. This job only
 * fires when that didn't happen (scrape failed, vendor changed URL, etc.).
 */
async function autoBumpStaleEarningsDates() {
  const all = await readAllProfiles();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const bumped: Array<{ slug: string; from: string; to: string; jumps: number }> = [];

  for (const profile of all) {
    const current = profile.investorSnapshot?.reporting?.nextTradingUpdate;
    if (!current) continue;

    const original = new Date(current);
    if (Number.isNaN(original.getTime())) continue;
    if (original >= today) continue; // already future, leave alone

    let next = new Date(original);
    let jumps = 0;
    while (next < today && jumps < 8) {
      next.setDate(next.getDate() + 90);
      jumps++;
    }
    // Safety cap hit (company dark >2 years): park one year out rather than
    // leaving the date in the past, which would cause the scraper to retry it
    // every single nightly run, the opposite of the intended throttle.
    if (next < today) {
      next = new Date(today);
      next.setFullYear(next.getFullYear() + 1);
    }

    const nextIso = next.toISOString().slice(0, 10); // YYYY-MM-DD
    profile.investorSnapshot.reporting.nextTradingUpdate = nextIso;

    await writeProfile(profile);
    bumped.push({ slug: profile.slug, from: current, to: nextIso, jumps });
  }

  if (bumped.length > 0) {
    await rebuildProfilesAll();
  }

  return { scanned: all.length, bumped: bumped.length, changes: bumped };
}

/* ------------------------------------------------------------------ */
/*  auto-approve-candidates job                                        */
/* ------------------------------------------------------------------ */

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL        ?? "";
const FROM_EMAIL   = process.env.RESEND_FROM_EMAIL   ?? "onboarding@resend.dev";
const REPLY_TO     = process.env.RESEND_REPLY_TO     ?? NOTIFY_EMAIL;
const APP_URL      = process.env.NEXT_PUBLIC_APP_URL ?? "https://your-domain.example";

/**
 * Field paths that may auto-approve when the LLM marked them
 * evidenceTier === "confirmed". These are objective, hard-to-misread
 * financial numbers from public reports. Anything else (AI perception,
 * named tools, framing, quotes) needs human review.
 */
const AUTO_APPROVE_ALLOWLIST = new Set([
  "investorSnapshot.revenue",
  "investorSnapshot.operatingProfit",
  "investorSnapshot.netCash",
  "investorSnapshot.employees",
]);

interface AutoApproveResult {
  candidatesProcessed: number;
  totalAutoApproved:   number;
  totalReviewQueued:   number;
  bySlug: Array<{
    slug:           string;
    company:        string;
    earningsDate:   string;
    autoApproved:   string[];
    needsReview:    string[];
  }>;
  ownerEmailSent:   boolean;
}

async function autoApproveCandidatesAndNotify(): Promise<AutoApproveResult> {
  const candidates = await readPendingCandidates();
  const result: AutoApproveResult = {
    candidatesProcessed: 0,
    totalAutoApproved:   0,
    totalReviewQueued:   0,
    bySlug:              [],
    ownerEmailSent:       false,
  };

  if (candidates.length === 0) return result;

  for (const candidate of candidates) {
    const proposed = candidate.proposedFields ?? {};
    const fields   = Object.keys(proposed);
    const autoApproved: string[] = [];
    const needsReview:  string[] = [];

    for (const field of fields) {
      const value = proposed[field] as { evidenceTier?: string } | undefined;
      const tier  = value?.evidenceTier;
      if (AUTO_APPROVE_ALLOWLIST.has(field) && tier === "confirmed") {
        autoApproved.push(field);
      } else {
        needsReview.push(field);
      }
    }

    // Apply the auto-approved subset directly to the profile.
    if (autoApproved.length > 0) {
      const profile = await readProfile(candidate.slug);
      if (profile) {
        const merged = { ...profile } as Record<string, unknown>;
        for (const field of autoApproved) {
          const parts = field.split(".");
          if (parts.length === 2) {
            const [section, key] = parts;
            const sectionData = (merged[section] ?? {}) as Record<string, unknown>;
            merged[section] = { ...sectionData, [key]: proposed[field] };
          } else {
            merged[field] = proposed[field];
          }
        }
        await writeProfile(merged as Parameters<typeof writeProfile>[0]);
        await writeSnapshot(candidate.slug, candidate.earningsDate);
      }
    }

    // Mark the candidate as partial (or approved if everything cleared).
    const allCleared = needsReview.length === 0 && autoApproved.length > 0;
    await updateCandidateStatus(candidate.slug, candidate.ts, {
      status:         allCleared ? "approved" : (autoApproved.length > 0 ? "partial" : "pending"),
      approvedFields: autoApproved,
      reviewedAt:     new Date().toISOString(),
      reviewedBy:     "rachel-auto",
    });

    // Look up company display name from the freshly-merged profile.
    const profile = await readProfile(candidate.slug);
    const company = profile?.meta.company ?? candidate.slug;

    result.candidatesProcessed++;
    result.totalAutoApproved += autoApproved.length;
    result.totalReviewQueued += needsReview.length;
    result.bySlug.push({
      slug:         candidate.slug,
      company,
      earningsDate: candidate.earningsDate,
      autoApproved,
      needsReview,
    });
  }

  if (result.candidatesProcessed > 0) {
    await rebuildProfilesAll();
  }

  // Email the owner a summary if anything happened.
  if (result.candidatesProcessed > 0) {
    try {
      await sendAutoApproveSummaryToOwner(result);
      result.ownerEmailSent = true;
    } catch (err) {
      console.error("Failed to send owner summary email", err);
    }
  }

  return result;
}

async function sendAutoApproveSummaryToOwner(result: AutoApproveResult) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const resend = new Resend(apiKey);

  const rows = result.bySlug.map((s) => `
    <tr>
      <td style="padding:10px 12px;background:#E8E2D5;font-weight:500">${escapeHtml(s.company)}</td>
      <td style="padding:10px 12px;background:#E8E2D5;font-size:13px;color:#5A5347">${escapeHtml(s.earningsDate)}</td>
      <td style="padding:10px 12px;background:#E8E2D5;text-align:center;color:#3a7d44;font-weight:600">${s.autoApproved.length}</td>
      <td style="padding:10px 12px;background:#E8E2D5;text-align:center;color:#B34E2A;font-weight:600">${s.needsReview.length}</td>
    </tr>`).join("");

  const reviewUrl = `${APP_URL}/app/admin/candidates`;

  await resend.emails.send({
    from:    FROM_EMAIL,
    to:      NOTIFY_EMAIL,
    replyTo: REPLY_TO,
    subject: `${result.totalAutoApproved} fields auto-approved, ${result.totalReviewQueued} need your review`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1C1914;background:#F0EAE0">
        <p style="font-family:'Space Grotesk',sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#B34E2A;margin:0 0 8px">Earnings ingest</p>
        <h2 style="font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:600;margin:0 0 8px">Auto-approve summary</h2>
        <p style="font-size:13px;color:#5A5347;margin:0 0 20px">${result.candidatesProcessed} ${result.candidatesProcessed === 1 ? "candidate" : "candidates"} processed. Confirmed financials applied directly. Subjective fields below are queued for your review.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
          <thead><tr>
            <th style="padding:8px 12px;background:#13110F;color:#fff;text-align:left;font-size:11px;letter-spacing:.1em;text-transform:uppercase">Company</th>
            <th style="padding:8px 12px;background:#13110F;color:#fff;text-align:left;font-size:11px;letter-spacing:.1em;text-transform:uppercase">Date</th>
            <th style="padding:8px 12px;background:#13110F;color:#fff;text-align:center;font-size:11px;letter-spacing:.1em;text-transform:uppercase">Auto</th>
            <th style="padding:8px 12px;background:#13110F;color:#fff;text-align:center;font-size:11px;letter-spacing:.1em;text-transform:uppercase">Review</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <a href="${reviewUrl}" style="display:inline-block;background:#B34E2A;color:#fff;text-decoration:none;padding:10px 22px;border-radius:100px;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:600">Review queued fields</a>
        <p style="font-size:12px;color:#8A8278;margin:20px 0 0">Auto-approve allowlist: revenue, operating profit, net cash, employees. Anything else stays pending.</p>
      </div>
    `,
  });
}


function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

