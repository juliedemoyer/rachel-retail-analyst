/**
 * Prune stale items from the Rachel pulse feed.
 *
 * Usage:
 *   tsx --env-file=.env.local scripts/prune-stale-pulse.ts            # dry run, show what would be removed
 *   tsx --env-file=.env.local scripts/prune-stale-pulse.ts --apply    # actually delete
 *   tsx --env-file=.env.local scripts/prune-stale-pulse.ts --apply --max-age-days 7
 *
 * Removes any pulse item whose effective date (ts ?? date) is older than
 * --max-age-days (default 7), plus any item flagged as agent-posted that
 * has no real ts (legacy items written before postPulseItem started
 * passing through originalPublishedAt).
 *
 * Safe to re-run.
 */

import { redis } from "../lib/redis";

interface PulseItem {
  id?: string;
  headline?: string;
  url?: string;
  ts?: string;
  date?: string;
  addedBy?: string;
  ingestedAt?: string;
}

function parseArgs() {
  const apply = process.argv.includes("--apply");
  const idx = process.argv.indexOf("--max-age-days");
  const maxAgeDays =
    idx >= 0 && process.argv[idx + 1] ? Number(process.argv[idx + 1]) : 7;
  return { apply, maxAgeDays };
}

function itemTs(it: PulseItem): number {
  const raw = it.ts ?? it.date;
  if (!raw) return 0;
  const t = new Date(raw).getTime();
  return Number.isFinite(t) ? t : 0;
}

async function main() {
  const { apply, maxAgeDays } = parseArgs();
  const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;

  const type = await redis.type("rachel:pulse");
  if (type !== "string") {
    console.error(
      `rachel:pulse is type "${type}", expected "string". Aborting.`,
    );
    process.exit(1);
  }

  const raw = await redis.get<string>("rachel:pulse");
  const items: PulseItem[] =
    typeof raw === "string"
      ? JSON.parse(raw)
      : Array.isArray(raw)
        ? (raw as PulseItem[])
        : [];

  const kept: PulseItem[] = [];
  const dropped: Array<{ reason: string; item: PulseItem }> = [];

  for (const it of items) {
    const t = itemTs(it);
    // Legacy agent-posted items used today's `date` regardless of source age,
    // so a missing real ts plus addedBy=rachel-agent is the smoking gun.
    if (!t && it.addedBy === "rachel-agent") {
      dropped.push({ reason: "legacy_agent_no_ts", item: it });
      continue;
    }
    if (t && t < cutoff) {
      dropped.push({ reason: `older_than_${maxAgeDays}d`, item: it });
      continue;
    }
    kept.push(it);
  }

  console.log(
    `pulse: ${items.length} total → keeping ${kept.length}, dropping ${dropped.length}`,
  );
  for (const d of dropped) {
    const when = d.item.ts ?? d.item.date ?? "(no date)";
    console.log(
      `  drop [${d.reason}] ${when} :: ${(d.item.headline ?? "").slice(0, 100)}`,
    );
  }

  if (!apply) {
    console.log("\nDry run. Pass --apply to write changes.");
    return;
  }
  if (dropped.length === 0) {
    console.log("\nNothing to remove.");
    return;
  }

  await redis.set("rachel:pulse", JSON.stringify(kept));
  console.log(`\nWrote ${kept.length} items to rachel:pulse.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
