"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

const COUNTRY_NAMES: Record<string, string> = {
  AT: "Austria",
  BE: "Belgium",
  CH: "Switzerland",
  DE: "Germany",
  DK: "Denmark",
  ES: "Spain",
  FI: "Finland",
  FR: "France",
  GB: "UK",
  IE: "Ireland",
  IT: "Italy",
  NL: "Netherlands",
  NO: "Norway",
  PT: "Portugal",
  SE: "Sweden",
  UK: "UK",
};

function countryLabel(code: string): string {
  return COUNTRY_NAMES[code] ?? code;
}

export function CountryFilter({ allCountries, selected }: { allCountries: string[]; selected: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggle = useCallback(
    (code: string) => {
      const next = new URLSearchParams(searchParams.toString());
      const current = next.get("countries")?.split(",").filter(Boolean) ?? [];
      const updated = current.includes(code)
        ? current.filter((c) => c !== code)
        : [...current, code];
      if (updated.length === 0) {
        next.delete("countries");
      } else {
        next.set("countries", updated.join(","));
      }
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const clearAll = useCallback(() => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("countries");
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.62rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-text-dim)",
            fontWeight: 600,
          }}
        >
          Filter by country
        </span>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-rust)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Clear
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {allCountries.map((code) => {
          const active = selected.includes(code);
          return (
            <button
              key={code}
              type="button"
              onClick={() => toggle(code)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.72rem",
                fontWeight: active ? 600 : 400,
                letterSpacing: "0.04em",
                padding: "4px 12px",
                borderRadius: "var(--radius-pill)",
                border: `1px solid ${active ? "var(--color-rust)" : "var(--color-border)"}`,
                background: active ? "var(--color-rust-dim2)" : "var(--color-surface)",
                color: active ? "var(--color-rust)" : "var(--color-text-mid)",
                cursor: "pointer",
                transition: "border-color 0.15s, color 0.15s, background 0.15s",
              }}
            >
              {countryLabel(code)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
