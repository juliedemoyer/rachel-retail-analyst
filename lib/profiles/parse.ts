/**
 * Markdown front-matter → CompanyProfile.
 *
 * Each `data/companies/{slug}.md` file is the human-edited source of truth.
 * Front-matter holds the 27-field structured payload; the prose body becomes
 * `aiPerception.notes` (Markdown, free-form, never snapshotted).
 *
 * Validates strictly with Zod. Returns `{ ok: true, profile }` or
 * `{ ok: false, error, issues }` so callers can render diff-friendly errors
 * in CI / the seed script.
 */

import matter from "gray-matter";
import { readFile, readdir } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import { z } from "zod";
import {
  CompanyProfile,
  deriveComposite,
  deriveQuadrant,
  type CompanyProfile as TCompanyProfile,
} from "./schema";

export interface ParseResult {
  ok: boolean;
  profile?: TCompanyProfile;
  error?: string;
  issues?: z.ZodIssue[];
  filePath: string;
}

/**
 * Parse a single markdown profile file.
 *
 * Expects front-matter shape:
 *   slug: string  (or derived from filename)
 *   meta: { ... }
 *   investorSnapshot: { ... }
 *   aiPerception: { ... }   (without `notes` — that comes from the body)
 */
export async function parseProfileFile(filePath: string): Promise<ParseResult> {
  let raw: string;
  try {
    raw = await readFile(filePath, "utf8");
  } catch (e) {
    return {
      ok: false,
      filePath,
      error: `Could not read ${filePath}: ${(e as Error).message}`,
    };
  }

  const { data, content } = matter(raw);

  // YAML parses `2026-01-30` as a Date object; the schema expects ISO strings
  // (so authors can write natural unquoted dates). Coerce all Date values to
  // YYYY-MM-DD strings recursively before handing to Zod.
  const coerced = coerceDates(data);

  const slugFromFilename = basename(filePath, extname(filePath))
    .replace(/\.notes$/, "")
    .toLowerCase();

  // Inject defaults so authors don't have to repeat themselves
  const candidate = {
    slug: coerced.slug ?? slugFromFilename,
    meta: coerced.meta,
    investorSnapshot: coerced.investorSnapshot,
    aiPerception: {
      ...(coerced.aiPerception ?? {}),
      // Body of the markdown file = Rachel's notes (#11). Mutable, never snapshotted.
      notes: content.trim(),
    },
  };

  // Auto-derive composite + quadrant if author left them off.
  if (
    candidate.aiPerception?.score &&
    typeof candidate.aiPerception.score.rhetoric === "number" &&
    typeof candidate.aiPerception.score.production === "number"
  ) {
    const s = candidate.aiPerception.score;
    if (typeof s.composite !== "number") {
      s.composite = deriveComposite(s);
    }
    if (!s.quadrant) {
      s.quadrant = deriveQuadrant(s, candidate.meta?.isAINative ?? false);
    }
  }

  const parsed = CompanyProfile.safeParse(candidate);
  if (!parsed.success) {
    return {
      ok: false,
      filePath,
      error: `Schema validation failed for ${filePath}`,
      issues: parsed.error.issues,
    };
  }
  return { ok: true, profile: parsed.data, filePath };
}

/**
 * Parse every `*.md` file in `data/companies/`. Skips `*.notes.md` files
 * (those are the legacy Obsidian intel notes loaded separately as the
 * `intel.md` system-prompt prefix for Ask Rachel).
 */
export async function parseAllProfiles(
  companiesDir: string,
): Promise<ParseResult[]> {
  let files: string[];
  try {
    files = await readdir(companiesDir);
  } catch (e) {
    throw new Error(
      `Could not read companies directory ${companiesDir}: ${(e as Error).message}`,
    );
  }

  const profileFiles = files.filter(
    (f) => f.endsWith(".md") && !f.endsWith(".notes.md"),
  );

  return Promise.all(
    profileFiles.map((f) => parseProfileFile(join(companiesDir, f))),
  );
}

/**
 * Load a company's free-form Obsidian intel notes (the `{slug}.notes.md`
 * mirror file). Loaded as a system-prompt prefix when Ask Rachel is scoped
 * to one company. <2KB per company in practice — cheap to inline.
 *
 * Returns "" if the file doesn't exist (most companies).
 */
export async function loadCompanyIntel(
  companiesDir: string,
  slug: string,
): Promise<string> {
  const intelPath = join(companiesDir, `${slug}.notes.md`);
  try {
    const raw = await readFile(intelPath, "utf8");
    // Strip front-matter if any; intel files are usually pure prose.
    const { content } = matter(raw);
    return content.trim();
  } catch {
    return "";
  }
}

/** Pretty-print Zod issues for CLI output. */
export function formatIssues(issues: z.ZodIssue[]): string {
  return issues
    .map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
    .join("\n");
}

/**
 * Recursively walk an object and convert any `Date` values to ISO `YYYY-MM-DD`
 * strings. YAML 1.1 parses `2026-01-30` as a Date object; the schema expects
 * strings so authors can keep dates unquoted.
 */
type Coercible = unknown;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function coerceDates(value: Coercible): any {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (Array.isArray(value)) {
    return value.map(coerceDates);
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = coerceDates(v);
    }
    return out;
  }
  return value;
}
