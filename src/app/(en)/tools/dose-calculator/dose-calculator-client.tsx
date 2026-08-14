"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EVIDENCE_GRADE_META } from "@/lib/encyclopedia";

type Option = {
  slug: string;
  name: string;
  category: string;
  evidence_grade: "A" | "B" | "C" | "D" | null;
  summary: string;
  dosage: {
    typical_range?: string | null;
    timing?: string | null;
    with_food?: string | null;
    duration_notes?: string | null;
    special_populations?: string | null;
    [k: string]: unknown;
  } | null;
  forms: { form: string; score: number | null }[];
};

type BWScale = {
  low: number;
  high: number;
  unit: string;
  note: string;
};

/** Ingredients where bodyweight meaningfully shifts the recommended dose.
 * Most vitamins and minerals are flat-dose; a few performance/protein
 * compounds scale with body mass. Keep this intentionally small. */
const BW_SCALING: Record<string, BWScale> = {
  creatine: {
    low: 0.03,
    high: 0.05,
    unit: "g/kg",
    note: "Post-loading maintenance. ~5 g for a 70 kg adult.",
  },
  "whey-protein": {
    low: 1.6,
    high: 2.2,
    unit: "g/kg/day total protein",
    note: "For muscle building. 2.0–2.4 g/kg if in a calorie deficit.",
  },
  "casein-protein": {
    low: 1.6,
    high: 2.2,
    unit: "g/kg/day total protein",
    note: "Daily protein target; casein is one contributor.",
  },
  caffeine: {
    low: 3,
    high: 6,
    unit: "mg/kg",
    note: "Performance dose range. General alertness: 100–200 mg flat works fine.",
  },
  "beta-alanine": {
    low: 0.04,
    high: 0.09,
    unit: "g/kg/day",
    note: "Approximate scaling — 3.2–6.4 g/day is the standard flat range.",
  },
  "alpha-lipoic-acid": {
    low: 4,
    high: 9,
    unit: "mg/kg",
    note: "300–600 mg/day is the standard flat range for most adults.",
  },
};

function DosageRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 py-2 border-b border-border last:border-0">
      <dt className="text-xs text-muted font-medium uppercase tracking-wider">
        {label}
      </dt>
      <dd className="text-sm text-text">{value}</dd>
    </div>
  );
}

function computeBodyweightDose(
  slug: string,
  weightKg: number | null,
): { low: string; high: string; note: string } | null {
  const scale = BW_SCALING[slug];
  if (!scale || !weightKg) return null;
  const lowVal = scale.low * weightKg;
  const highVal = scale.high * weightKg;
  const fmt = (n: number) => {
    if (n >= 100) return Math.round(n).toString();
    if (n >= 10) return n.toFixed(1);
    return n.toFixed(2);
  };
  return {
    low: `${fmt(lowVal)} ${scale.unit.split("/")[0]}`,
    high: `${fmt(highVal)} ${scale.unit.split("/")[0]}`,
    note: scale.note,
  };
}

export function DoseCalculatorClient({ ingredients }: { ingredients: Option[] }) {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<"kg" | "lb">("lb");

  const selected = useMemo(
    () => ingredients.find((i) => i.slug === selectedSlug) ?? null,
    [ingredients, selectedSlug],
  );

  // Filter options by query. Cap at 12 so the dropdown doesn't overwhelm.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Option[];
    return ingredients
      .filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.slug.includes(q.replace(/\s+/g, "-")),
      )
      .slice(0, 12);
  }, [ingredients, query]);

  const weightKg = useMemo(() => {
    const n = parseFloat(weight);
    if (!Number.isFinite(n) || n <= 0) return null;
    return unit === "kg" ? n : n * 0.453592;
  }, [weight, unit]);

  const bwDose = useMemo(
    () => (selected ? computeBodyweightDose(selected.slug, weightKg) : null),
    [selected, weightKg],
  );

  const gradeMeta = selected?.evidence_grade
    ? EVIDENCE_GRADE_META[selected.evidence_grade]
    : null;

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <header className="mb-10 max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          Interactive Tool
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Dose Calculator
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Look up evidence-based dose ranges for any of the 969 supplement
          ingredients in our encyclopedia. For bodyweight-scaled compounds
          (creatine, protein, caffeine, a few others), enter your weight to
          get a personalized range.
        </p>
      </header>

      <section className="mb-8">
        <label htmlFor="ingredient-search" className="block text-sm font-semibold text-text mb-2">
          1. Pick an ingredient
        </label>
        <input
          id="ingredient-search"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedSlug(null);
          }}
          placeholder="e.g. creatine, magnesium, ashwagandha"
          className="w-full rounded-lg border border-border bg-white/[0.03] px-4 py-3 text-text placeholder:text-muted focus:border-accent focus:outline-none"
          autoComplete="off"
        />
        {filtered.length > 0 && !selectedSlug && (
          <ul className="mt-2 rounded-lg border border-border bg-card/30 overflow-hidden divide-y divide-border">
            {filtered.map((opt) => {
              const g = opt.evidence_grade ? EVIDENCE_GRADE_META[opt.evidence_grade] : null;
              return (
                <li key={opt.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSlug(opt.slug);
                      setQuery(opt.name);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/[0.03] transition-colors flex items-center gap-3"
                  >
                    <span className="flex-1 min-w-0 truncate text-sm text-text">
                      {opt.name}
                    </span>
                    <span className="text-[10px] text-muted">{opt.category}</span>
                    {g && (
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${g.color}1a`, color: g.color }}
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

      {selected && BW_SCALING[selected.slug] && (
        <section className="mb-8">
          <label className="block text-sm font-semibold text-text mb-2">
            2. Your bodyweight (optional — {selected.name} is bodyweight-scaled)
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === "kg" ? "70" : "154"}
              min="0"
              step="1"
              className="w-32 rounded-lg border border-border bg-white/[0.03] px-4 py-3 text-text placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["lb", "kg"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`px-3 py-3 text-sm font-semibold transition-colors ${
                    unit === u ? "bg-accent text-bg" : "text-muted hover:text-text"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {selected && (
        <section className="rounded-2xl border border-border bg-white/[0.02] p-6">
          <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
            <div className="min-w-0">
              <Link
                href={`/ingredients/${selected.slug}`}
                className="text-xl font-bold text-text hover:text-accent transition-colors"
              >
                {selected.name}
              </Link>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mt-1">
                {selected.category}
              </p>
            </div>
            {gradeMeta && (
              <div
                className="text-center rounded-xl px-4 py-2 flex-shrink-0"
                style={{
                  backgroundColor: `${gradeMeta.color}1a`,
                  color: gradeMeta.color,
                }}
                title={gradeMeta.description}
              >
                <div className="text-lg font-bold leading-none">
                  {selected.evidence_grade}
                </div>
                <div className="text-[10px] uppercase tracking-wider mt-0.5">
                  Evidence
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-muted leading-relaxed mb-5">
            {selected.summary}
          </p>

          {bwDose && (
            <div className="mb-5 rounded-xl border border-accent/30 bg-accent/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                Your bodyweight-adjusted range
              </p>
              <p className="text-xl font-bold text-text mb-1">
                {bwDose.low} – {bwDose.high}
              </p>
              <p className="text-xs text-muted leading-relaxed">{bwDose.note}</p>
            </div>
          )}

          <dl className="mb-5">
            <DosageRow
              label="Typical range"
              value={selected.dosage?.typical_range ?? null}
            />
            <DosageRow label="Timing" value={selected.dosage?.timing ?? null} />
            <DosageRow
              label="With food?"
              value={selected.dosage?.with_food ?? null}
            />
            <DosageRow
              label="Duration"
              value={selected.dosage?.duration_notes ?? null}
            />
            <DosageRow
              label="Special populations"
              value={selected.dosage?.special_populations ?? null}
            />
          </dl>

          {selected.forms.length > 0 && (
            <div className="mb-5">
              <p className="text-xs text-muted font-medium uppercase tracking-wider mb-2">
                Forms
              </p>
              <ul className="flex flex-wrap gap-2">
                {selected.forms.map((f, idx) => (
                  <li
                    key={idx}
                    className="text-xs bg-white/[0.03] border border-border rounded-full px-3 py-1"
                  >
                    <span className="text-text font-semibold">{f.form}</span>
                    {typeof f.score === "number" && (
                      <span className="text-muted ml-2">· {f.score}/100</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            <Link
              href={`/ingredients/${selected.slug}`}
              className="inline-flex items-center gap-2 text-xs text-accent hover:underline"
            >
              Full profile (mechanism, safety, evidence) →
            </Link>
            <span className="text-muted mx-1">·</span>
            <Link
              href="/interactions"
              className="inline-flex items-center gap-2 text-xs text-accent hover:underline"
            >
              Check interactions →
            </Link>
          </div>
        </section>
      )}

      {!selected && (
        <section className="rounded-2xl border border-border bg-card/30 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
            How to use it
          </h2>
          <ol className="text-sm text-text space-y-2 list-decimal pl-5">
            <li>Type an ingredient name in the search box above.</li>
            <li>Pick a result from the dropdown.</li>
            <li>
              If the ingredient is bodyweight-scaled (creatine, protein, caffeine,
              a few others), enter your weight to get a personalized range.
            </li>
            <li>
              The full ingredient profile link shows mechanism, safety notes,
              evidence summary, and interactions.
            </li>
          </ol>
          <p className="text-xs text-muted mt-5 leading-relaxed">
            <strong className="text-text">Educational only.</strong> Dose
            ranges come from published research and are not medical advice.
            Discuss any supplement plan with your clinician — especially if
            you take prescription medication.
          </p>
        </section>
      )}
    </main>
  );
}
