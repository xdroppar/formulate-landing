import type { Metadata } from "next";
import Link from "next/link";
import { ingredients, ingredientsByCategory, EVIDENCE_GRADE_META } from "@/lib/encyclopedia";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplement Ingredients Encyclopedia — ${ingredients.length} Entries — Formulate`,
  description: `Evidence-graded summaries for ${ingredients.length} supplement ingredients. Dose ranges, mechanism of action, timing, safety, and interactions — grouped by category.`,
  alternates: { canonical: `${BASE}/ingredients` },
  openGraph: {
    title: `Supplement Ingredients Encyclopedia — ${ingredients.length} Entries`,
    description: `Evidence-graded summaries for ${ingredients.length} supplement ingredients.`,
    type: "website",
    url: `${BASE}/ingredients`,
  },
};

export default function IngredientsIndex() {
  const groups = ingredientsByCategory();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplement Ingredients Encyclopedia",
    description: `Evidence-graded summaries for ${ingredients.length} supplement ingredients.`,
    url: `${BASE}/ingredients`,
    numberOfItems: ingredients.length,
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Ingredients Encyclopedia
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Evidence-graded summaries for {ingredients.length} supplement ingredients.
          Every entry gives you the short answer on what it does, the dose range that
          actually matches the research, timing, safety watch-outs, and known
          interactions.
        </p>
      </header>

      <section className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["A", "B", "C", "D"] as const).map((g) => {
          const meta = EVIDENCE_GRADE_META[g];
          const count = ingredients.filter((i) => i.evidence_grade === g).length;
          return (
            <div
              key={g}
              className="rounded-xl border border-border bg-white/[0.02] px-4 py-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Grade {g}
                </span>
              </div>
              <div className="text-2xl font-bold text-text">{count}</div>
              <div className="text-xs text-muted mt-0.5">{meta.label}</div>
            </div>
          );
        })}
      </section>

      {groups.map(({ category, items }) => (
        <section key={category} className="mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-bold text-text">{category}</h2>
            <span className="text-xs text-muted">
              {items.length} {items.length === 1 ? "entry" : "entries"}
            </span>
          </div>
          <ul className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {items.map((ing) => {
              const grade = ing.evidence_grade;
              const gradeMeta = grade ? EVIDENCE_GRADE_META[grade] : null;
              return (
                <li key={ing.slug}>
                  <Link
                    href={`/ingredients/${ing.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-text truncate">
                        {ing.name}
                      </div>
                      <div className="text-xs text-muted line-clamp-1 mt-0.5">
                        {(ing.primary_uses ?? []).slice(0, 3).join(" · ")}
                      </div>
                    </div>
                    {gradeMeta && (
                      <div
                        className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                        style={{
                          backgroundColor: `${gradeMeta.color}1a`,
                          color: gradeMeta.color,
                        }}
                        title={gradeMeta.label}
                      >
                        {grade}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Evidence grades.</strong> Every ingredient above is
        graded A–D based on the strength of the human clinical trial record. A-grade
        ingredients have multiple well-designed RCTs converging on the same effect.
        D-grade ingredients are mostly pre-clinical with no published human efficacy
        data — they&apos;re listed for completeness, not endorsed. See the{" "}
        <Link href="/methodology" className="text-accent hover:underline">
          methodology page
        </Link>{" "}
        for details.
      </p>
    </main>
  );
}
