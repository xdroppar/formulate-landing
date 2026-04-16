"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { InteractionCard } from "@/components/interaction-card";
import {
  SEVERITY_META,
  checkStack,
  substances,
  type Interaction,
  type Severity,
  type Substance,
} from "@/lib/interactions";

const SEVERITY_ORDER: Severity[] = ["danger", "warning", "caution", "synergy", "info"];

function SubstancePicker({
  onPick,
  exclude,
}: {
  onPick: (s: Substance) => void;
  exclude: Set<string>;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored: { s: Substance; score: number }[] = [];
    for (const s of substances) {
      if (exclude.has(s.slug)) continue;
      if (s.canonical.toLowerCase().startsWith(q)) {
        scored.push({ s, score: 0 });
        continue;
      }
      if (s.display.toLowerCase().startsWith(q)) {
        scored.push({ s, score: 1 });
        continue;
      }
      if (s.canonical.toLowerCase().includes(q) || s.display.toLowerCase().includes(q)) {
        scored.push({ s, score: 2 });
        continue;
      }
      if (s.aliases.some((a) => a.toLowerCase().includes(q))) {
        scored.push({ s, score: 3 });
      }
    }
    scored.sort((a, b) => a.score - b.score || a.s.canonical.length - b.s.canonical.length);
    return scored.slice(0, 8).map((x) => x.s);
  }, [query, exclude]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const commit = (s: Substance) => {
    onPick(s);
    setQuery("");
    setActive(0);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        onKeyDown={(e) => {
          if (!matches.length) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, matches.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            commit(matches[active]);
          }
        }}
        placeholder="Add a supplement or medication (e.g. zinc, warfarin, curcumin)"
        className="w-full px-4 py-3 rounded-lg bg-black/30 border border-border focus:border-accent focus:outline-none text-text placeholder:text-muted text-sm"
        aria-label="Search for a supplement or medication"
        aria-autocomplete="list"
      />
      {focused && matches.length > 0 && (
        <ul
          className="absolute z-10 left-0 right-0 mt-1 rounded-lg border border-border bg-bg shadow-xl max-h-80 overflow-auto"
          role="listbox"
        >
          {matches.map((m, i) => (
            <li key={m.slug}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(m);
                }}
                onMouseEnter={() => setActive(i)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  i === active ? "bg-accent/15 text-text" : "text-text hover:bg-white/5"
                }`}
                role="option"
                aria-selected={i === active}
              >
                <span className="capitalize">{m.display}</span>
                {m.aliases.length > 0 && (
                  <span className="text-muted text-xs ml-2">
                    {m.aliases.slice(0, 3).join(", ")}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SummaryBar({ results }: { results: Interaction[] }) {
  const counts: Record<Severity, number> = {
    danger: 0,
    warning: 0,
    caution: 0,
    info: 0,
    synergy: 0,
  };
  for (const r of results) counts[r.severity]++;

  return (
    <div className="flex flex-wrap gap-2">
      {SEVERITY_ORDER.map((sev) => {
        const n = counts[sev];
        if (!n) return null;
        const meta = SEVERITY_META[sev];
        return (
          <span
            key={sev}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${meta.border} ${meta.bg} text-xs font-semibold ${meta.color}`}
          >
            <span aria-hidden>{meta.icon}</span>
            {n} {meta.label}
            {n === 1 ? "" : "s"}
          </span>
        );
      })}
    </div>
  );
}

export function InteractionChecker({
  initial = [],
}: {
  initial?: Substance[];
}) {
  const [picked, setPicked] = useState<Substance[]>(initial);

  const results = useMemo(
    () => checkStack(picked.map((s) => s.canonical)),
    [picked],
  );

  const excludeSet = useMemo(() => new Set(picked.map((s) => s.slug)), [picked]);

  const add = (s: Substance) => {
    setPicked((cur) => (cur.some((x) => x.slug === s.slug) ? cur : [...cur, s]));
  };

  const remove = (slug: string) => {
    setPicked((cur) => cur.filter((s) => s.slug !== slug));
  };

  const clear = () => setPicked([]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card/50 p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Your list
          </h2>
          {picked.length > 0 && (
            <button
              onClick={clear}
              className="text-xs text-muted hover:text-text transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {picked.length === 0 ? (
          <p className="text-sm text-muted">
            Add two or more substances below to check for interactions.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {picked.map((s) => (
              <li key={s.slug}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/40 text-sm text-text">
                  <span className="capitalize">{s.display}</span>
                  <button
                    onClick={() => remove(s.slug)}
                    aria-label={`Remove ${s.display}`}
                    className="text-muted hover:text-text leading-none text-base"
                  >
                    ×
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}

        <SubstancePicker onPick={add} exclude={excludeSet} />
      </div>

      {picked.length < 2 ? (
        <p className="text-sm text-muted text-center py-8">
          Add at least two items to see interactions.
        </p>
      ) : results.length === 0 ? (
        <div className="rounded-xl border border-border bg-card/30 p-6 text-center">
          <p className="text-text text-sm">
            No known interactions found between these {picked.length} items.
          </p>
          <p className="text-muted text-xs mt-2">
            Coverage is curated, not exhaustive. Always consult a healthcare provider for medications.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <SummaryBar results={results} />
          <div className="space-y-3">
            {results.map((r) => (
              <InteractionCard
                key={r.pair_key}
                interaction={r}
                defaultOpen={r.severity === "danger"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
