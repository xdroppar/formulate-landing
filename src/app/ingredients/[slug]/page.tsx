import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ingredientBySlug,
  ingredients,
  relatedIngredients,
  EVIDENCE_GRADE_META,
  type Ingredient,
} from "@/lib/encyclopedia";
import { findSubstance, interactionsFor, SEVERITY_META } from "@/lib/interactions";
import { products, scoreGrade, thumbUrl, type Product } from "@/lib/products";

const BASE = "https://formulate-health.app";

/** Normalize a product-label ingredient name down to the base substance.
 * Product labels contain amounts, forms, source, and percentages —
 * "Vitamin D [as cholecalciferol (D3)]", "Magnesium (as Albion DiMagnesium
 * Malate)", "Tongkat Ali Extract (Eurycoma longifolia) (root)". Strip all
 * parenthetical/bracketed content, trim, lowercase. */
function normalizeIngredientLabel(name: string): string {
  return name
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b(extract|powder|complex)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** Find products that list this ingredient, ranked by product score desc.
 *
 * Matching is conservative: we only use the canonical encyclopedia name,
 * not the aliases (alias strings include parentheticals and short tokens
 * that produced false positives — e.g. alias "Ashwagandha (Thyroid Support)"
 * vs a DHA ingredient name, where "dha" is substring-inside "ashwagandha").
 * Word-boundary regex ensures "magnesium" matches "Magnesium Bisglycinate"
 * but doesn't bleed into unrelated tokens.
 */
function productsContaining(ing: Ingredient, limit = 4): Product[] {
  // Build normalized needles from canonical name + aliases. Normalization
  // strips parentheticals so "Ashwagandha (Thyroid Support)" becomes just
  // "ashwagandha" — that also neutralizes the false-positive vector that
  // killed an earlier pass (alias-substring match had "ashwagandha"
  // matching DHA because "dha" is inside "ashwagandha"). Word-boundary
  // regex ensures that doesn't happen. ≥3 char minimum rejects the
  // ultra-short slugs that would otherwise hit random tokens.
  const rawNeedles = [ing.name, ...(ing.aliases ?? [])];
  const needles = Array.from(
    new Set(
      rawNeedles
        .map((n) => normalizeIngredientLabel(n))
        .filter((n) => n.length >= 3),
    ),
  );
  if (needles.length === 0) return [];

  const regexes = needles.map((n) => {
    const escaped = n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`);
  });

  const hits: Product[] = [];
  for (const p of products) {
    for (const row of p.ingredients) {
      const normalized = normalizeIngredientLabel(row.name);
      if (regexes.some((re) => re.test(normalized))) {
        hits.push(p);
        break;
      }
    }
  }
  return hits
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

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

  // Products containing this ingredient — top-scored only.
  const matchingProducts = productsContaining(ing, 4);

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

      {matchingProducts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Products containing {ing.name}
          </h2>
          <p className="text-xs text-muted mb-4">
            Top-scoring supplements in our catalog that list {ing.name} on
            the label. Each product is graded on Formulate&apos;s ingredient-level
            rubric — dose accuracy, form, transparency, and third-party testing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {matchingProducts.map((p) => {
              const g = scoreGrade(p.score);
              return (
                <Link
                  key={p.slug}
                  href={`/supplements/${p.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-3 hover:border-accent/40 transition-colors"
                >
                  {p.image_url ? (
                    <div className="relative w-12 h-12 rounded-lg bg-white/[0.02] overflow-hidden flex-shrink-0">
                      <Image
                        src={thumbUrl(p) ?? p.image_url}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-white/[0.02] border border-border flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted mb-0.5 truncate">{p.brand}</div>
                    <div className="text-xs font-semibold text-text leading-snug line-clamp-2">
                      {p.name}
                    </div>
                  </div>
                  <div
                    className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                    style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                  >
                    {p.score ?? "—"}
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            href={`/supplements?q=${encodeURIComponent(ing.name)}`}
            className="inline-block text-xs text-accent hover:underline mt-3"
          >
            See all products →
          </Link>
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
