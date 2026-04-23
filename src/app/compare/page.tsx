import type { Metadata } from "next";
import Link from "next/link";
import { comparisons, comparisonSlug } from "@/lib/comparisons";
import { ingredientBySlug, EVIDENCE_GRADE_META } from "@/lib/encyclopedia";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplement Comparisons — Formulate`,
  description: `Side-by-side evidence-based comparisons of popular supplement pairs. When to pick each, when to combine, and what the research actually shows.`,
  alternates: { canonical: `${BASE}/compare` },
  openGraph: {
    title: `Supplement Comparisons`,
    description: `Side-by-side evidence-based comparisons of popular supplement pairs.`,
    type: "website",
    url: `${BASE}/compare`,
  },
};

export default function CompareIndex() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplement Comparisons",
    description: "Side-by-side evidence-based comparisons of popular supplement pairs.",
    url: `${BASE}/compare`,
    numberOfItems: comparisons.length,
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Supplement Comparisons
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Direct head-to-head answers for the most-asked supplement pair
          questions. Each comparison uses Formulate&apos;s ingredient database
          (evidence grades, dose ranges, mechanism) plus editorial guidance on
          when to pick one, when to pick the other, and whether to stack them.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisons.map((c) => {
          const a = ingredientBySlug(c.a);
          const b = ingredientBySlug(c.b);
          if (!a || !b) return null;
          const href = `/compare/${comparisonSlug(c)}`;
          const gA = a.evidence_grade ? EVIDENCE_GRADE_META[a.evidence_grade] : null;
          const gB = b.evidence_grade ? EVIDENCE_GRADE_META[b.evidence_grade] : null;
          return (
            <Link
              key={comparisonSlug(c)}
              href={href}
              className="rounded-xl border border-border bg-white/[0.02] p-5 hover:border-accent/40 transition-colors"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
                {c.topic}
              </p>
              <h2 className="text-lg font-bold text-text mb-2">
                {a.name}{" "}
                <span className="text-muted font-normal">vs</span>{" "}
                {b.name}
              </h2>
              <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">
                {c.bottom_line}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider">
                {gA && (
                  <span
                    className="px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${gA.color}1a`, color: gA.color }}
                  >
                    {a.evidence_grade} · {a.name.split(" ")[0]}
                  </span>
                )}
                {gB && (
                  <span
                    className="px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${gB.color}1a`, color: gB.color }}
                  >
                    {b.evidence_grade} · {b.name.split(" ")[0]}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        For deeper individual detail, see the{" "}
        <Link href="/ingredients" className="text-accent hover:underline">
          ingredients encyclopedia
        </Link>
        . For combinations with prescription medications, check the{" "}
        <Link href="/interactions" className="text-accent hover:underline">
          interaction checker
        </Link>
        .
      </p>
    </main>
  );
}
