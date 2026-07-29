/**
 * vault-bridge — Surface cross-agent EOD vault signals into rachel:pulse.
 *
 * Vault files live on your local filesystem, not accessible from Vercel.
 * Agents POST their EOD note content to /api/vault/sync after each EOD write,
 * which stores it in Redis under rachel:vault:{agent}:{date} + :latest.
 *
 * This module's runVaultToPulse() reads the latest snapshots, parses the
 * "Signal for other agents" section, and pushes any signals addressed to
 * Rachel into the pulse feed. Idempotent: same signal seen twice is deduped
 * by content hash.
 */

import { redis } from "../redis";

interface VaultEntry {
  agent: string;
  date: string;
  content: string;
  receivedAt: string;
}

interface ParsedSignal {
  forAgent: string;
  text: string;
}

const AGENTS = ["josh", "holy", "wally", "leonie", "rachel"] as const;
type AgentName = (typeof AGENTS)[number];

export function parseSignalsForAgent(content: string, targetAgent: string): ParsedSignal[] {
  const signals: ParsedSignal[] = [];
  const section = content.match(/## Signal for other agents([\s\S]*?)(?:\n## |\n---|$)/);
  if (!section) return signals;

  const lines = section[1].split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    if (!line.startsWith("-")) continue;
    const m = line.match(/^-\s*\*?\*?([A-Za-z]+)\*?\*?:\s*(.+)$/);
    if (!m) continue;
    const agent = m[1].toLowerCase();
    if (agent === targetAgent.toLowerCase()) {
      signals.push({ forAgent: agent, text: m[2].trim().replace(/\*\*/g, "") });
    }
  }
  return signals;
}

function hash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36).slice(0, 8);
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface VaultToPulseResult {
  surfaced: number;
  scanned_agents: string[];
  findings: Array<{ from: string; signal: string; date: string }>;
}

export async function runVaultToPulse(targetAgent: AgentName = "rachel"): Promise<VaultToPulseResult> {
  const findings: Array<{ from: string; signal: string; date: string }> = [];
  const scanned: string[] = [];

  for (const agent of AGENTS) {
    if (agent === targetAgent) continue;
    const raw = await redis.get<string>(`rachel:vault:${agent}:latest`);
    if (!raw) continue;
    scanned.push(agent);

    let entry: VaultEntry | null = null;
    try {
      entry = typeof raw === "string" ? JSON.parse(raw) : (raw as VaultEntry);
    } catch {
      continue;
    }
    if (!entry?.content) continue;

    const signals = parseSignalsForAgent(entry.content, targetAgent);
    for (const s of signals) {
      findings.push({ from: agent, signal: s.text, date: entry.date });
    }
  }

  if (findings.length === 0) {
    return { surfaced: 0, scanned_agents: scanned, findings: [] };
  }

  const pulseRaw = await redis.get("rachel:pulse");
  const pulse: Array<Record<string, unknown>> =
    typeof pulseRaw === "string"
      ? JSON.parse(pulseRaw)
      : Array.isArray(pulseRaw)
        ? (pulseRaw as Array<Record<string, unknown>>)
        : [];

  let added = 0;
  for (const f of findings) {
    const id = `vault-${f.from}-${f.date}-${hash(f.signal)}`;
    if (pulse.some((p) => p.id === id)) continue;

    const head = f.signal.length > 90 ? f.signal.slice(0, 90).trimEnd() + "…" : f.signal;
    pulse.unshift({
      id,
      headline: `${capitalize(f.from)} → Rachel: ${head}`,
      summary: f.signal,
      source: `${capitalize(f.from)} EOD vault note (${f.date})`,
      category: "cross_agent_signal",
      ts: new Date().toISOString(),
      priority: "MED",
      surfaced_via: [`${f.from}/latest.md`],
    });
    added++;
  }

  if (added > 0) {
    if (pulse.length > 100) pulse.length = 100;
    await redis.set("rachel:pulse", JSON.stringify(pulse));
  }

  return { surfaced: added, scanned_agents: scanned, findings };
}
