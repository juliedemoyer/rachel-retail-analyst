/**
 * Missing-field rendering policy.
 *
 * Rule: never fabricate, never silently fill, always make the gap visible.
 * The UI is dumb; this formatter is the policy. Callers receive
 * `{ display, tone, hint? }` and render with their own components.
 *
 * Tones map to wireframe pill colours:
 *   "value"  → normal text
 *   "muted"  → grey, e.g. "Not stated"
 *   "amber"  → carried-forward warning
 *   "absent" → empty-state placeholder
 *   "italic" → faint italic line for missing prose (key earnings quote)
 */

export type FormatTone = "value" | "muted" | "amber" | "absent" | "italic";

export interface Formatted {
  display: string;
  tone: FormatTone;
  hint?: string;
}

// ── Money / numbers ───────────────────────────────────────────────────────────

export function formatMoney(
  value: number | null | undefined,
  currency: string,
): Formatted {
  if (value == null) return { display: "—", tone: "absent" };
  const sign = value < 0 ? "−" : "";
  const abs = Math.abs(value);
  const stripped = currency.replace(/B$/, "");
  return {
    display: `${sign}${stripped}${abs.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })}B`,
    tone: "value",
  };
}

export function formatPercent(
  value: number | null | undefined,
  opts: { signed?: boolean } = {},
): Formatted {
  if (value == null) return { display: "—", tone: "absent" };
  const sign = opts.signed && value > 0 ? "+" : "";
  return {
    display: `${sign}${value.toFixed(1)}%`,
    tone: "value",
  };
}

export function formatInt(value: number | null | undefined): Formatted {
  if (value == null) return { display: "—", tone: "absent" };
  return {
    display: value.toLocaleString(),
    tone: "value",
  };
}

// ── Booleans (e.g. dedicatedAISection.value, quantifiedROI.stated) ────────────

export function formatBooleanField(opts: {
  value?: boolean;
  hasSource: boolean;
}): Formatted {
  if (opts.value === undefined || opts.value === null) {
    return { display: "Not stated", tone: "muted" };
  }
  if (opts.value === true) {
    return { display: "Yes", tone: "value" };
  }
  // false + no source = inferred absence, render gently
  if (!opts.hasSource) {
    return { display: "Not stated", tone: "muted" };
  }
  return { display: "No", tone: "value" };
}

// ── Carried-forward (required scalars when this quarter's PDF is partial) ─────

export function formatCarriedForward(
  display: string,
  carriedForwardFrom?: string,
): Formatted {
  if (!carriedForwardFrom) return { display, tone: "value" };
  return {
    display,
    tone: "amber",
    hint: `Carried forward from ${carriedForwardFrom}`,
  };
}

// ── Optional text (key earnings quote etc.) ───────────────────────────────────

export function formatOptionalText(value?: string): Formatted {
  if (!value || !value.trim()) {
    return {
      display: "No board AI commentary this quarter.",
      tone: "italic",
    };
  }
  return { display: value, tone: "value" };
}

// ── Arrays (named tools, vendor partners, etc.) ───────────────────────────────

export function formatArray<T>(
  arr: readonly T[] | undefined,
  emptyMessage: string,
): { items: readonly T[]; empty: Formatted | null } {
  if (!arr || arr.length === 0) {
    return {
      items: [],
      empty: { display: emptyMessage, tone: "absent" },
    };
  }
  return { items: arr, empty: null };
}

// ── Evidence-tier pill copy ───────────────────────────────────────────────────

export function evidenceTierLabel(tier: "confirmed" | "estimated"): string {
  return tier === "confirmed" ? "Confirmed" : "Estimated";
}

export function evidenceTierTooltip(tier: "confirmed" | "estimated"): string {
  return tier === "confirmed"
    ? "Cited verbatim from a public earnings document."
    : "Inferred from secondary sources or sector pattern. Not in the company's own materials.";
}

// ── Quadrant copy ─────────────────────────────────────────────────────────────

import type { Quadrant } from "./schema";

export function quadrantSubtitle(q: Quadrant): string {
  return {
    performer: "High board rhetoric, high confirmed production.",
    narrative_led: "High board rhetoric, low confirmed production.",
    silent_builder: "Low board rhetoric, high confirmed production.",
    not_visible: "Low board rhetoric, low confirmed production.",
    native: "AI-native operating model. Off-matrix by design.",
  }[q];
}
