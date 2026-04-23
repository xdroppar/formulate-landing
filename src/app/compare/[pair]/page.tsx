import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  comparisons,
  comparisonBySlug,
  comparisonSlug,
  type Comparison,
} from "@/lib/comparisons";
import {
  ingredientBySlug,
  EVIDENCE_GRADE_META,
  type Ingredient,
} from "@/lib/encyclopedia";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return comparisons.map((c) => ({ pair: comparisonSlug(c) }));
}

type Params = Promise<{ pair: string }>;

function resolveSides(c: Comparison): { a: Ingredient; b: Ingredient } | null {
  const ia = ingredientBySlug(c.a);
  const ib = ingredientBySlug(c.b);
  if (!ia || !ib) return null;
  // Sort deterministically for display — matches URL slug order.
  const [first, second] = [ia, ib].sort((x, y) => x.slug.localeCompare(y.slug));
  return { a: first, b: second };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { pair } = await params;
  const c = comparisonBySlug(pair);
  if (!c) return { title: "Comparison not found" };
  const sides = resolveSides(c);
  if (!sides) return { title: "Comparison not found" };
  const { a, b } = sides;
  const title = `${a.name} vs ${b.name}: ${c.topic}`;
  const description = `${c.bottom_line} Side-by-side dose ranges, mechanism, evidence grade, and when to pick each.`;
  const url = `${BASE}/compare/${pair}`;
  return {
    title: `${title} — Formulate`,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title, description: description.slice(0, 200), type: "article", url },
  };
}

export default async function ComparePage({ params }: { params: Params }) {
  const { pair } = await params;
  const c = comparisonBySlug(pair);
  if (!c) notFound();
  const sides = resolveSides(c);
  if (!sides) notFound();

  const { a, b } = sides;
  const url = `${BASE}/compare/${pair}`;
  const gA = a.evidence_grade ? EVIDENCE_GRADE_META[a.evidence_grade] : null;
  const gB = b.evidence_grade ? EVIDENCE_GRADE_META[b.evidence_grade] : null;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${a.name} vs ${b.name}: which is better?`,
        acceptedAnswer: { "@type": "Answer", text: c.bottom_line },
      },
      {
        "@type": "Question",
        name: `When should I pick ${a.name}?`,
        acceptedAnswer: { "@type": "Answer", text: c.when_a },
      },
      {
        "@type": "Question",
        name: `When should I pick ${b.name}?`,
        acceptedAnswer: { "@type": "Answer", text: c.when_b },
      },
      {
        "@type": "Question",
        name: `Can I take ${a.name} and ${b.name} together?`,
        acceptedAnswer: { "@type": "Answer", text: c.combine },
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${BASE}/compare` },
      { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}`, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/compare" className="hover:text-text transition-colors">
          Compare
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">
          {a.name} vs {b.name}
        </span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          {c.topic}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3">
          {a.name} <span className="text-muted font-normal">vs</span> {b.name}
        </h1>
        <p className="text-base text-muted leading-relaxed">{c.bottom_line}</p>
      </header>

      <section className="mb-10">
        <p className="text-sm text-text leading-relaxed">{c.why_compare}</p>
      </section>

      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[a, b].map((ing, idx) => {
          const g = ing.evidence_grade ? EVIDENCE_GRADE_META[ing.evidence_grade] : null;
          return (
            <div
              key={ing.slug}
              className="rounded-xl border border-border bg-white/[0.02] p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <Link
                  href={`/ingredients/${ing.slug}`}
                  className="text-lg font-bold text-text hover:text-accent transition-colors"
                >
                  {ing.name}
                </Link>
                {g && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                    style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                    title={g.description}
                  >
                    {ing.evidence_grade}
                  </span>
                )}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
                {ing.category}
              </p>
              <p className="text-sm text-muted leading-relaxed mb-3">
                {ing.summary}
              </p>
              {ing.dosage?.typical_range && (
                <p className="text-xs text-text">
                  <span className="text-muted font-semibold uppercase tracking-wider text-[10px]">
                    Typical dose:
                  </span>{" "}
                  {ing.dosage.typical_range}
                </p>
              )}
              {ing.primary_uses.length > 0 && (
                <p className="text-xs text-muted mt-2 line-clamp-2">
                  <span className="text-muted font-semibold uppercase tracking-wider text-[10px]">
                    Main uses:
                  </span>{" "}
                  {ing.primary_uses.slice(0, 3).join(" · ")}
                </p>
              )}
              <Link
                href={`/ingredients/${ing.slug}`}
                className="inline-block text-xs text-accent hover:underline mt-3"
              >
                Full {ing.name} profile →
              </Link>
            </div>
          );
        })}
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">
          When to pick {a.name}
        </h2>
        <p className="text-sm text-muted leading-relaxed">{c.when_a}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">
          When to pick {b.name}
        </h2>
        <p className="text-sm text-muted leading-relaxed">{c.when_b}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">
          Can you take them together?
        </h2>
        <p className="text-sm text-muted leading-relaxed">{c.combine}</p>
      </section>

      {c.also_consider && (() => {
        const other = ingredientBySlug(c.also_consider.slug);
        if (!other) return null;
        return (
          <section className="mb-10 rounded-2xl border border-border bg-card/20 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
              Also worth considering
            </p>
            <Link
              href={`/ingredients/${other.slug}`}
              className="text-base font-semibold text-text hover:text-accent transition-colors"
            >
              {other.name}
            </Link>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {c.also_consider.note}
            </p>
          </section>
        );
      })()}

      <section className="mb-10">
        <h2 className="text-lg font-bold text-text mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-text mb-1">
              {a.name} vs {b.name}: which is better?
            </h3>
            <p className="text-sm text-muted leading-relaxed">{c.bottom_line}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text mb-1">
              Is {a.name} safer than {b.name}?
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Both have well-characterized safety profiles at the doses above.
              See each ingredient&apos;s dedicated page for specific
              contraindications. Always check the{" "}
              <Link href="/interactions" className="text-accent hover:underline">
                interaction checker
              </Link>{" "}
              before combining either with prescription medication.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text mb-1">
              Can I combine {a.name} and {b.name}?
            </h3>
            <p className="text-sm text-muted leading-relaxed">{c.combine}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Dig deeper
        </h2>
        <ul className="text-sm text-text space-y-2">
          <li>
            →{" "}
            <Link href={`/ingredients/${a.slug}`} className="hover:text-accent">
              {a.name}: dose, mechanism, evidence
            </Link>
          </li>
          <li>
            →{" "}
            <Link href={`/ingredients/${b.slug}`} className="hover:text-accent">
              {b.name}: dose, mechanism, evidence
            </Link>
          </li>
          <li>
            →{" "}
            <Link href="/interactions" className="hover:text-accent">
              Check a full stack for interactions
            </Link>
          </li>
          <li>
            →{" "}
            <Link href="/compare" className="hover:text-accent">
              Browse all supplement comparisons
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Educational only.</strong> This comparison
        is not medical advice. Discuss any new supplement with your clinician,
        especially if you take prescription medication or have a chronic
        condition.
      </p>
    </main>
  );
}
