import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  conditions,
  conditionBySlug,
  type ConditionIngredient,
} from "@/lib/conditions";
import { ingredientBySlug, EVIDENCE_GRADE_META } from "@/lib/encyclopedia";
import { stackBySlug } from "@/lib/stacks";
import { nutrientForSupplementSlug } from "@/lib/nutrients";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const c = conditionBySlug(slug);
  if (!c) return { title: "Condition not found" };
  const title = `Supplements for ${c.name}: Evidence-Based Picks`;
  const description = c.tagline;
  const url = `${BASE}/conditions/${slug}`;
  return {
    title: `${title} — Formulate`,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: description.slice(0, 200),
      type: "article",
      url,
    },
  };
}

function tierLabel(tier: ConditionIngredient["tier"]): string {
  return tier === "strong"
    ? "Strong evidence"
    : tier === "moderate"
      ? "Moderate evidence"
      : "Preliminary evidence";
}

function tierColor(tier: ConditionIngredient["tier"]): string {
  return tier === "strong" ? "#10B981" : tier === "moderate" ? "#3B82F6" : "#F59E0B";
}

export default async function ConditionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const c = conditionBySlug(slug);
  if (!c) notFound();

  const url = `${BASE}/conditions/${slug}`;
  const relatedStack = c.related_stack ? stackBySlug(c.related_stack) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `Supplements for ${c.name}`,
    headline: `Supplements for ${c.name}: Evidence-Based Picks`,
    description: c.tagline,
    url,
    mainEntityOfPage: url,
    medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
    inLanguage: "en-US",
    author: { "@type": "Organization", name: "Formulate Team", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Formulate",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png`, width: 512, height: 512 },
    },
    about: { "@type": "MedicalCondition", name: c.name },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Conditions", item: `${BASE}/conditions` },
      { "@type": "ListItem", position: 3, name: c.name, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/conditions" className="hover:text-text transition-colors">
          Conditions
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{c.name}</span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          Supplement Support
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-4">
          Supplements for {c.name}
        </h1>
        <p className="text-base text-muted leading-relaxed">{c.tagline}</p>
      </header>

      <section className="mb-10">
        <p className="text-sm text-text leading-relaxed">{c.overview}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-4">Evidence-rated supplements</h2>
        <div className="space-y-3">
          {c.supplements.map((s) => {
            const ing = ingredientBySlug(s.slug);
            const encGrade = ing?.evidence_grade;
            const encMeta = encGrade ? EVIDENCE_GRADE_META[encGrade] : null;
            const tColor = tierColor(s.tier);
            return (
              <div
                key={s.slug}
                className="rounded-xl border border-border bg-white/[0.02] p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${tColor}1a`, color: tColor }}
                      >
                        {tierLabel(s.tier)}
                      </span>
                      {encMeta && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${encMeta.color}1a`,
                            color: encMeta.color,
                          }}
                          title={encMeta.description}
                        >
                          Encyc. {encGrade}
                        </span>
                      )}
                    </div>
                    {ing ? (
                      <Link
                        href={`/ingredients/${ing.slug}`}
                        className="text-lg font-bold text-text hover:text-accent transition-colors"
                      >
                        {ing.name}
                      </Link>
                    ) : (
                      <span className="text-lg font-bold text-text">{s.slug}</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">{s.evidence}</p>
                <p className="text-xs text-text">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-muted">
                    Dose:
                  </span>{" "}
                  {s.dose}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                  {ing && (
                    <Link
                      href={`/ingredients/${ing.slug}`}
                      className="text-xs text-accent hover:underline"
                    >
                      Full {ing.name} profile →
                    </Link>
                  )}
                  {(() => {
                    const matchedNutrient = nutrientForSupplementSlug(s.slug);
                    return matchedNutrient ? (
                      <Link
                        href={`/nutrients/${matchedNutrient.slug}`}
                        className="text-xs text-accent hover:underline"
                      >
                        {matchedNutrient.name} daily target & UL →
                      </Link>
                    ) : null;
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">Lifestyle context</h2>
        <p className="text-sm text-muted leading-relaxed">{c.lifestyle}</p>
      </section>

      <section className="mb-10 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-400 mb-3">
          When to see a clinician
        </h2>
        <p className="text-sm text-text leading-relaxed">{c.red_flags}</p>
      </section>

      {relatedStack && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Related stack</h2>
          <Link
            href={`/stacks/${relatedStack.slug}`}
            className="block rounded-xl border border-border bg-white/[0.02] p-5 hover:border-accent/40 transition-colors"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
              Ready-to-take protocol
            </p>
            <p className="text-base font-bold text-text mb-1">{relatedStack.name}</p>
            <p className="text-sm text-muted line-clamp-2">{relatedStack.tagline}</p>
          </Link>
        </section>
      )}

      {c.related_guides && c.related_guides.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Related reading</h2>
          <ul className="space-y-2">
            {c.related_guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="block rounded-lg border border-border bg-white/[0.02] px-4 py-3 hover:border-accent transition-colors"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-1">
                    Guide
                  </p>
                  <p className="text-sm font-semibold text-text">{g.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Next steps
        </h2>
        <ul className="text-sm text-text space-y-2">
          <li>
            →{" "}
            <Link href="/interactions" className="hover:text-accent">
              Check any picks against your prescription medications
            </Link>
          </li>
          <li>
            →{" "}
            <Link href="/conditions" className="hover:text-accent">
              Browse supplements by other conditions
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Educational only.</strong> This page
        is not medical advice. Discuss any supplement plan with your
        clinician — especially if you take prescription medication or have
        a chronic condition.
      </p>
    </main>
  );
}
