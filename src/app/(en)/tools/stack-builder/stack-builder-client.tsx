"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EVIDENCE_GRADE_META } from "@/lib/encyclopedia";
import {
  checkStack as checkInteractionStack,
  findSubstance,
  SEVERITY_META,
} from "@/lib/interactions";

type Option = {
  slug: string;
  name: string;
  category: string;
  evidence_grade: "A" | "B" | "C" | "D" | null;
  typical_range: string | null;
  timing: string | null;
};

function encodeStack(slugs: string[]): string {
  return slugs.join(",");
}

function decodeStack(param: string | null): string[] {
  if (!param) return [];
  return param
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function StackBuilderClient({ ingredients }: { ingredients: Option[] }) {
  const bySlug = useMemo(
    () => new Map(ingredients.map((i) => [i.slug, i])),
    [ingredients],
  );

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  // Initialize from URL on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const fromUrl = decodeStack(params.get("stack"))
      .filter((slug) => bySlug.has(slug))
      .slice(0, 12); // Cap at 12 to keep UI readable
    if (fromUrl.length > 0) setSelectedSlugs(fromUrl);
    // Only run once on mount — stack changes update URL below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync URL when stack changes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (selectedSlugs.length === 0) {
      url.searchParams.delete("stack");
    } else {
      url.searchParams.set("stack", encodeStack(selectedSlugs));
    }
    // Use replaceState so back-button isn't polluted
    window.history.replaceState(null, "", url.toString());
  }, [selectedSlugs]);

  const selected = useMemo(
    () =>
      selectedSlugs
        .map((s) => bySlug.get(s))
        .filter((v): v is Option => v !== undefined),
    [selectedSlugs, bySlug],
  );

  // Filter ingredient picker by query + exclude already-added.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Option[];
    const selectedSet = new Set(selectedSlugs);
    return ingredients
      .filter(
        (i) =>
          !selectedSet.has(i.slug) &&
          (i.name.toLowerCase().includes(q) ||
            i.slug.includes(q.replace(/\s+/g, "-"))),
      )
      .slice(0, 10);
  }, [ingredients, query, selectedSlugs]);

  // Auto-check interactions across selected ingredients.
  const interactions = useMemo(() => {
    const names = selected
      .map((s) => bySlug.get(s.slug)?.name)
      .filter((n): n is string => typeof n === "string");
    return checkInteractionStack(names);
  }, [selected, bySlug]);

  // Quality breakdown — how many grade A/B/C/D in the stack.
  const qualityBreakdown = useMemo(() => {
    const tally: Record<"A" | "B" | "C" | "D", number> = { A: 0, B: 0, C: 0, D: 0 };
    for (const s of selected) {
      if (s.evidence_grade) tally[s.evidence_grade] += 1;
    }
    return tally;
  }, [selected]);

  function addIngredient(slug: string) {
    setSelectedSlugs((cur) => {
      if (cur.includes(slug)) return cur;
      if (cur.length >= 12) return cur; // cap
      return [...cur, slug];
    });
    setQuery("");
  }

  function removeIngredient(slug: string) {
    setSelectedSlugs((cur) => cur.filter((s) => s !== slug));
  }

  function clearAll() {
    setSelectedSlugs([]);
  }

  async function copyShareLink() {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      // Clipboard API not available; fall back silently.
    }
  }

  // Count danger/warning for quick visual banner
  const riskCount = interactions.filter(
    (i) => i.severity === "danger" || i.severity === "warning",
  ).length;

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <header className="mb-8 max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          Interactive Tool
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Stack Builder
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Pick ingredients from our 969-entry encyclopedia. The builder
          auto-checks for interactions between everything you add, shows
          typical dose and timing for each, and generates a shareable URL
          so you can bookmark or send the stack.
        </p>
      </header>

      <section className="mb-6">
        <label
          htmlFor="ingredient-add"
          className="block text-sm font-semibold text-text mb-2"
        >
          Add ingredient
        </label>
        <input
          id="ingredient-add"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. creatine, magnesium, l-theanine"
          className="w-full rounded-lg border border-border bg-white/[0.03] px-4 py-3 text-text placeholder:text-muted focus:border-accent focus:outline-none"
          autoComplete="off"
          disabled={selectedSlugs.length >= 12}
        />
        {selectedSlugs.length >= 12 && (
          <p className="text-xs text-muted mt-2">
            Cap reached — remove one to add another.
          </p>
        )}
        {filtered.length > 0 && (
          <ul className="mt-2 rounded-lg border border-border bg-card/30 overflow-hidden divide-y divide-border">
            {filtered.map((opt) => {
              const g = opt.evidence_grade
                ? EVIDENCE_GRADE_META[opt.evidence_grade]
                : null;
              return (
                <li key={opt.slug}>
                  <button
                    type="button"
                    onClick={() => addIngredient(opt.slug)}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/[0.03] transition-colors flex items-center gap-3"
                  >
                    <span className="flex-1 min-w-0 truncate text-sm text-text">
                      {opt.name}
                    </span>
                    <span className="text-[10px] text-muted">{opt.category}</span>
                    {g && (
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${g.color}1a`,
                          color: g.color,
                        }}
                      >
                        {opt.evidence_grade}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {selected.length === 0 ? (
        <section className="rounded-2xl border border-border bg-card/30 p-6 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
            Your stack is empty
          </h2>
          <p className="text-sm text-text leading-relaxed mb-4">
            Start typing an ingredient name above to add it. Common picks
            to try: creatine, magnesium glycinate, L-theanine, vitamin D,
            omega-3, ashwagandha, CoQ10.
          </p>
          <p className="text-xs text-muted">
            Prefer a pre-built evidence-based stack?{" "}
            <Link href="/stacks" className="text-accent hover:underline">
              Browse goal-based stacks
            </Link>
            .
          </p>
        </section>
      ) : (
        <>
          <section className="mb-8">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-xl font-bold text-text">
                Your stack ({selected.length})
              </h2>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-muted hover:text-accent transition-colors"
              >
                Clear all
              </button>
            </div>
            <ul className="space-y-2">
              {selected.map((s) => {
                const g = s.evidence_grade
                  ? EVIDENCE_GRADE_META[s.evidence_grade]
                  : null;
                return (
                  <li
                    key={s.slug}
                    className="rounded-xl border border-border bg-white/[0.02] p-4 flex items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Link
                          href={`/ingredients/${s.slug}`}
                          className="text-sm font-semibold text-text hover:text-accent transition-colors"
                        >
                          {s.name}
                        </Link>
                        {g && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${g.color}1a`,
                              color: g.color,
                            }}
                          >
                            {s.evidence_grade}
                          </span>
                        )}
                        <span className="text-[10px] text-muted">{s.category}</span>
                      </div>
                      {s.typical_range && (
                        <p className="text-xs text-muted mt-0.5">
                          <span className="font-semibold uppercase tracking-wider text-[9px]">
                            Dose:
                          </span>{" "}
                          {s.typical_range}
                        </p>
                      )}
                      {s.timing && (
                        <p className="text-xs text-muted mt-0.5">
                          <span className="font-semibold uppercase tracking-wider text-[9px]">
                            Timing:
                          </span>{" "}
                          {s.timing}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeIngredient(s.slug)}
                      className="text-xs text-muted hover:text-red-400 transition-colors px-2 py-1"
                      aria-label={`Remove ${s.name}`}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {interactions.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-text mb-3">
                Interactions between your picks
                {riskCount > 0 && (
                  <span className="ml-3 text-xs font-semibold uppercase tracking-wider text-red-400">
                    {riskCount} high-risk
                  </span>
                )}
              </h2>
              <ul className="space-y-2">
                {interactions.map((i) => {
                  const meta = SEVERITY_META[i.severity];
                  const a = findSubstance(i.substance_a);
                  const b = findSubstance(i.substance_b);
                  if (!a || !b) return null;
                  const [first, second] = [a.slug, b.slug].sort();
                  const href = `/interactions/${first}-and-${second}`;
                  return (
                    <li key={i.pair_key}>
                      <Link
                        href={href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${meta.border} ${meta.bg} hover:bg-white/5 transition-colors`}
                      >
                        <span className="text-lg" aria-hidden>
                          {meta.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wider ${meta.color}`}
                            >
                              {meta.label}
                            </span>
                            <span className="text-sm font-semibold text-text capitalize">
                              {i.substance_a} + {i.substance_b}
                            </span>
                          </div>
                          <p className="text-xs text-muted mt-0.5 line-clamp-1">
                            {i.summary}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {interactions.length === 0 && selected.length >= 2 && (
            <section className="mb-8 rounded-xl border border-green-500/30 bg-green-500/5 p-4">
              <p className="text-sm text-text">
                <span className="text-green-400 font-semibold">
                  No interactions found
                </span>{" "}
                between the {selected.length} ingredients you&apos;ve added —
                based on Formulate&apos;s database of {
                  // interactions.length is on the data, not the filtered set
                  105
                }{" "}
                documented pairs. This isn&apos;t a guarantee of safety —
                absence from our database doesn&apos;t mean absence of any
                interaction. Run by a pharmacist if you&apos;re on
                prescription medication.
              </p>
            </section>
          )}

          {selected.length > 0 && (
            <section className="mb-8 rounded-xl border border-border bg-white/[0.02] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
                Evidence quality in this stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {(["A", "B", "C", "D"] as const).map((g) => {
                  const meta = EVIDENCE_GRADE_META[g];
                  const count = qualityBreakdown[g];
                  return (
                    <div key={g} className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${meta.color}1a`,
                          color: meta.color,
                        }}
                      >
                        {g}
                      </span>
                      <span className="text-sm text-text font-semibold">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="mb-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyShareLink}
              className="px-4 py-2 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-[#00ffb3] transition-colors"
            >
              {shareState === "copied" ? "✓ Copied!" : "Copy share link"}
            </button>
            <Link
              href="/interactions"
              className="px-4 py-2 rounded-lg border border-border text-text font-semibold text-sm hover:border-accent transition-colors"
            >
              Full interaction checker
            </Link>
          </section>
        </>
      )}

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          How to use the builder
        </h2>
        <ol className="text-sm text-text space-y-2 list-decimal pl-5 mb-4">
          <li>Type an ingredient name in the add box above.</li>
          <li>Pick a result from the dropdown to add it to your stack.</li>
          <li>
            The builder auto-checks for documented interactions between
            every pair in your stack (against our 105-pair database).
          </li>
          <li>
            Quality summary shows evidence-grade distribution across your picks.
          </li>
          <li>
            &ldquo;Copy share link&rdquo; generates a URL encoding your stack
            — bookmark or send to someone.
          </li>
        </ol>
        <p className="text-xs text-muted leading-relaxed">
          <strong className="text-text">Educational only.</strong> This
          tool doesn&apos;t replace clinical review. Always run a supplement
          stack by a pharmacist or clinician if you take prescription
          medication.
        </p>
      </section>
    </main>
  );
}
