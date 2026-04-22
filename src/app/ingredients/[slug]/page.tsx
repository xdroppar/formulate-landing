import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ingredientBySlug,
  ingredients,
  relatedIngredients,
  EVIDENCE_GRADE_META,
  type Ingredient,
} from "@/lib/encyclopedia";
import { findSubstance, interactionsFor, SEVERITY_META } from "@/lib/interactions";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return ingredients.map((i) => ({ slug: i.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const ing = ingredientBySlug(slug);
  if (!ing) return { title: "Ingredient not found" };
  const uses = (ing.primary_uses ?? []).slice(0, 3).join(", ");
  const title = `${ing.name}: Uses, Dose, Evidence, Interactions — Formulate`;
  const description = (
    ing.summary ?? `${ing.name} — ${uses}. Evidence-graded supplement reference.`
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  const url = `${BASE}/ingredients/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${ing.name}: Uses, Dose, Evidence`,
      description,
      type: "article",
      url,
    },
    robots:
      ing.evidence_grade === "D" || ing.evidence_grade === null
        ? { index: true, follow: true }
        : undefined,
  };
}

function interactionPairSlug(aCanonical: string, bCanonical: string): string | null {
  const a = findSubstance(aCanonical);
  const b = findSubstance(bCanonical);
  if (!a || !b) return null;
  const [first, second] = [a.slug, b.slug].sort();
  return `${first}-and-${second}`;
}

export default async function IngredientPage({ params }: { params: Params }) {
  const { slug } = await params;
  const ing = ingredientBySlug(slug);
  if (!ing) notFound();

  const url = `${BASE}/ingredients/${slug}`;
  const grade = ing.evidence_grade;
  const gradeMeta = grade ? EVIDENCE_GRADE_META[grade] : null;
  const related = relatedIngredients(ing);

  // Try to surface Formulate interaction pages for this ingredient.
  const knownInteractionPages = interactionsFor(ing.name).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${ing.name}: Evidence-Graded Supplement Reference`,
    headline: `${ing.name} — Uses, Dose, Evidence, Interactions`,
    description: ing.summary,
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
    about: {
      "@type": "Substance",
      name: ing.name,
      alternateName: ing.aliases,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Ingredients", item: `${BASE}/ingredients` },
      { "@type": "ListItem", position: 3, name: ing.name, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/ingredients" className="hover:text-text transition-colors">
          Ingredients
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{ing.name}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
              {ing.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
              {ing.name}
            </h1>
            {ing.aliases.length > 0 && (
              <p className="text-xs text-muted mt-2">
                Also known as:{" "}
                <span className="text-text">{ing.aliases.slice(0, 4).join(", ")}</span>
              </p>
            )}
          </div>
          {gradeMeta && (
            <div
              className="text-center rounded-xl px-4 py-3 flex-shrink-0"
              style={{ backgroundColor: `${gradeMeta.color}1a`, color: gradeMeta.color }}
              title={gradeMeta.description}
            >
              <div className="text-2xl font-bold leading-none">{grade}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider mt-1 opacity-90">
                Evidence
              </div>
            </div>
          )}
        </div>
        <p className="text-base text-muted leading-relaxed mt-4">{ing.summary}</p>
      </header>

      {ing.primary_uses.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Primary uses</h2>
          <ul className="text-sm text-muted leading-relaxed space-y-2 list-disc pl-5">
            {ing.primary_uses.map((u, idx) => (
              <li key={idx}>{u}</li>
            ))}
          </ul>
        </section>
      )}

      {ing.mechanism_of_action.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">How it works</h2>
          <ul className="text-sm text-muted leading-relaxed space-y-2 list-disc pl-5">
            {ing.mechanism_of_action.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </section>
      )}

      {ing.dosage && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Dosage</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            {ing.dosage.typical_range && (
              <>
                <dt className="text-muted font-medium">Typical range</dt>
                <dd className="text-text">{ing.dosage.typical_range}</dd>
              </>
            )}
            {ing.dosage.timing && (
              <>
                <dt className="text-muted font-medium">Timing</dt>
                <dd className="text-text">{ing.dosage.timing}</dd>
              </>
            )}
            {ing.dosage.with_food && (
              <>
                <dt className="text-muted font-medium">With food</dt>
                <dd className="text-text">{ing.dosage.with_food}</dd>
              </>
            )}
            {ing.dosage.duration_notes && (
              <>
                <dt className="text-muted font-medium">Duration</dt>
                <dd className="text-text">{ing.dosage.duration_notes}</dd>
              </>
            )}
            {ing.dosage.special_populations && (
              <>
                <dt className="text-muted font-medium">Special populations</dt>
                <dd className="text-text">{ing.dosage.special_populations}</dd>
              </>
            )}
          </dl>
        </section>
      )}

      {ing.forms.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Forms</h2>
          <ul className="flex flex-wrap gap-2">
            {ing.forms.map((f, idx) => (
              <li
                key={idx}
                className="text-sm bg-white/[0.03] border border-border rounded-full px-3 py-1"
              >
                <span className="text-text font-semibold">{f.form}</span>
                {typeof f.score === "number" && (
                  <span className="text-muted ml-2">· {f.score}/100</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {ing.safety && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Safety</h2>
          {Array.isArray(ing.safety.common_side_effects) &&
            ing.safety.common_side_effects.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-text mb-2">Common side effects</h3>
                <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc pl-5 mb-4">
                  {ing.safety.common_side_effects.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </>
            )}
          {Array.isArray(ing.safety.serious_risks) && ing.safety.serious_risks.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-text mb-2">Serious risks</h3>
              <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc pl-5 mb-4">
                {ing.safety.serious_risks.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </>
          )}
          {Array.isArray(ing.safety.contraindications) &&
            ing.safety.contraindications.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-text mb-2">Contraindications</h3>
                <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc pl-5">
                  {ing.safety.contraindications.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </>
            )}
        </section>
      )}

      {knownInteractionPages.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Known interactions</h2>
          <ul className="space-y-2">
            {knownInteractionPages.map((i) => {
              const pairSlug = interactionPairSlug(i.substance_a, i.substance_b);
              if (!pairSlug) return null;
              const meta = SEVERITY_META[i.severity];
              return (
                <li key={i.pair_key}>
                  <Link
                    href={`/interactions/${pairSlug}`}
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
                        <span className="text-sm font-semibold text-text capitalize truncate">
                          with {i.substance_a.toLowerCase() === ing.name.toLowerCase() ? i.substance_b : i.substance_a}
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-0.5 line-clamp-1">{i.summary}</p>
                    </div>
                    <span className="text-muted text-sm" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {ing.evidence_notes && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Evidence notes</h2>
          <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
            {ing.evidence_notes}
          </p>
          {gradeMeta && (
            <p className="text-xs text-muted mt-3">
              <span className="font-semibold" style={{ color: gradeMeta.color }}>
                Grade {grade}:
              </span>{" "}
              {gradeMeta.description}
            </p>
          )}
        </section>
      )}

      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Related in {ing.category}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {related.map((r) => {
              const g = r.evidence_grade;
              const gm = g ? EVIDENCE_GRADE_META[g] : null;
              return (
                <li key={r.slug}>
                  <Link
                    href={`/ingredients/${r.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white/[0.02] hover:border-accent/40 transition-colors"
                  >
                    <span className="text-sm text-text flex-1 truncate">{r.name}</span>
                    {gm && (
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${gm.color}1a`, color: gm.color }}
                      >
                        {g}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Check a full stack
        </h2>
        <p className="text-sm text-text mb-4 leading-relaxed">
          Formulate&apos;s free interaction checker lets you paste in any combination of
          supplements and medications at once — every pairing flags severity, timing,
          and cited evidence.
        </p>
        <Link
          href="/interactions"
          className="inline-block px-4 py-2 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-[#00ffb3] transition-colors"
        >
          Open the checker
        </Link>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Medical disclaimer.</strong> This page is
        educational and does not replace advice from a qualified healthcare provider.
      </p>
    </main>
  );
}
