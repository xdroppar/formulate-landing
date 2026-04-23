"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  interactions,
  substances,
  SEVERITY_META,
  type Severity,
} from "@/lib/interactions";

type SeverityFilter = "all" | Severity;

const SEVERITY_ORDER: Severity[] = [
  "danger",
  "warning",
  "caution",
  "synergy",
  "info",
];

function pairRouteSlug(
  substanceA: string,
  substanceB: string,
): string | null {
  const a = substances.find(
    (s) => s.canonical.toLowerCase() === substanceA.toLowerCase(),
  );
  const b = substances.find(
    (s) => s.canonical.toLowerCase() === substanceB.toLowerCase(),
  );
  if (!a || !b) return null;
  const [first, second] = [a.slug, b.slug].sort();
  return `${first}-and-${second}`;
}

export function InteractionsBrowse() {
  const [filter, setFilter] = useState<SeverityFilter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const withRouteSlug = interactions
      .map((i) => ({
        i,
        slug: pairRouteSlug(i.substance_a, i.substance_b),
      }))
      .filter((x): x is { i: typeof interactions[0]; slug: string } =>
        Boolean(x.slug),
      );
    const severityFiltered =
      filter === "all"
        ? withRouteSlug
        : withRouteSlug.filter((x) => x.i.severity === filter);
    const queryFiltered = q
      ? severityFiltered.filter(
          (x) =>
            x.i.substance_a.toLowerCase().includes(q) ||
            x.i.substance_b.toLowerCase().includes(q) ||
            x.i.summary.toLowerCase().includes(q),
        )
      : severityFiltered;
    queryFiltered.sort((x, y) => {
      const sevDiff =
        SEVERITY_ORDER.indexOf(x.i.severity) -
        SEVERITY_ORDER.indexOf(y.i.severity);
      if (sevDiff !== 0) return sevDiff;
      return x.i.substance_a.localeCompare(y.i.substance_a);
    });
    return queryFiltered;
  }, [filter, query]);

  const counts = useMemo(() => {
    const c: Record<SeverityFilter, number> = {
      all: interactions.length,
      danger: 0,
      warning: 0,
      caution: 0,
      synergy: 0,
      info: 0,
    };
    for (const i of interactions) {
      c[i.severity] += 1;
    }
    return c;
  }, []);

  return (
    <section className="mt-12 pt-10 border-t border-border">
      <h2 className="text-lg font-bold text-text mb-1">
        Browse all {interactions.length} interactions
      </h2>
      <p className="text-sm text-muted mb-5">
        Filter by severity or search by substance name. Each entry links to
        the full page with mechanism, dose guidance, and cited sources.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
            filter === "all"
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted hover:text-text"
          }`}
        >
          All · {counts.all}
        </button>
        {SEVERITY_ORDER.map((sev) => {
          const meta = SEVERITY_META[sev];
          const active = filter === sev;
          return (
            <button
              key={sev}
              type="button"
              onClick={() => setFilter(sev)}
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors"
              style={
                active
                  ? {
                      borderColor: meta.color,
                      color: meta.color,
                      backgroundColor: `${meta.color}1a`,
                    }
                  : undefined
              }
            >
              <span style={{ color: active ? meta.color : undefined }}>
                {meta.icon} {meta.label} · {counts[sev]}
              </span>
            </button>
          );
        })}
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by substance (e.g. magnesium, warfarin, st johns wort)"
        className="w-full rounded-lg border border-border bg-white/[0.03] px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none mb-4"
      />

      {filtered.length === 0 ? (
        <p className="text-sm text-muted italic py-6 text-center">
          No interactions match those filters. Try clearing the search or
          picking a different severity.
        </p>
      ) : (
        <ul className="space-y-2">
          {filtered.map(({ i, slug }) => {
            const meta = SEVERITY_META[i.severity];
            return (
              <li key={i.pair_key}>
                <Link
                  href={`/interactions/${slug}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${meta.border} ${meta.bg} hover:bg-white/5 transition-colors`}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    {meta.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider ${meta.color}`}
                      >
                        {meta.label}
                      </span>
                      <span className="text-sm font-semibold text-text truncate">
                        <span className="capitalize">{i.substance_a}</span>
                        <span className="text-muted mx-1.5">+</span>
                        <span className="capitalize">{i.substance_b}</span>
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5 line-clamp-1">
                      {i.summary}
                    </p>
                  </div>
                  <span className="text-muted text-sm" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
