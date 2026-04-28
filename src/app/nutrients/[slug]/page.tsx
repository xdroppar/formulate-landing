import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CORE_NUTRIENTS,
  CATEGORY_META,
  nutrientBySlug,
  relatedNutrients,
  productsContainingNutrient,
  referenceTypeLabel,
  formatTarget,
} from "@/lib/nutrients";
import { nutrientContent } from "@/lib/nutrient_content";
import { ingredients as encyclopediaIngredients } from "@/lib/encyclopedia";
import { scoreGrade, thumbUrl } from "@/lib/products";
import { studiesForIngredient } from "@/lib/research";
import { conditionsForNutrient } from "@/lib/conditions";
import { getGuidesForSubstances } from "@/lib/guides";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return CORE_NUTRIENTS.map((n) => ({ slug: n.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const n = nutrientBySlug(slug);
  if (!n) return { title: "Nutrient not found" };
  const content = nutrientContent(n.key);
  const ulFragment =
    n.upper_limit != null ? `, upper limit ${n.upper_limit} ${n.unit}` : "";
  const topFoods = content?.food_sources
    .slice(0, 3)
    .map((f) => f.food.replace(/\s*\(.+?\)\s*/g, ""))
    .join(", ");
  const description = topFoods
    ? `${n.name}: daily target ${n.daily_value} ${n.unit}${ulFragment}. Top food sources: ${topFoods}. Deficiency signs, best forms, and ranked supplements.`
    : `${n.name} daily target ${n.daily_value} ${n.unit}${ulFragment}. Best forms, food sources, and supplements ranked by Formulate's ingredient scoring.`;
  const url = `${BASE}/nutrients/${slug}`;
  return {
    title: `${n.name}: Daily Target, Upper Limit, Best Form & Supplements — Formulate`,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      title: `${n.name}: Daily Target, Upper Limit, Best Form`,
      description: description.slice(0, 160),
      type: "article",
      url,
    },
  };
}

/** Try to find an /ingredients/[slug] entry that matches this nutrient by
 *  name or any of the nutrient's synonyms. Cross-link target — only emitted
 *  when a hit exists. */
function matchEncyclopediaIngredient(name: string, synonyms: string[]) {
  const candidates = [name.toLowerCase(), ...synonyms.map((s) => s.toLowerCase())];
  return encyclopediaIngredients.find((ing) => {
    const ingNames = [ing.name.toLowerCase(), ...(ing.aliases ?? []).map((a) => a.toLowerCase())];
    return ingNames.some((n) => candidates.includes(n));
  });
}

export default async function NutrientPage({ params }: { params: Params }) {
  const { slug } = await params;
  const n = nutrientBySlug(slug);
  if (!n) notFound();

  const meta = CATEGORY_META[n.category];
  const url = `${BASE}/nutrients/${slug}`;
  const productHits = productsContainingNutrient(n, 8);
  const cleanProducts = productHits.filter((h) => !h.low_absorb);
  const lowAbsorbProducts = productHits.filter((h) => h.low_absorb);
  const related = relatedNutrients(n, 6);
  const ingredientMatch = matchEncyclopediaIngredient(n.name, n.synonyms);
  const content = nutrientContent(n.key);
  const studies = studiesForIngredient(n.name, n.synonyms, 5);
  const conditionMatches = conditionsForNutrient(n);
  const relatedGuides = getGuidesForSubstances([n.name, ...n.synonyms], 5);

  /** Stable, deterministic FAQ derived from registry + content. Drives both
   *  the visible FAQ section and the FAQPage JSON-LD. */
  const faqItems: { q: string; a: string }[] = [];
  faqItems.push({
    q: `What is the daily target for ${n.name}?`,
    a: `The ${referenceTypeLabel(n.reference_type).toLowerCase()} for ${n.name} is ${n.daily_value} ${n.unit} per day for adults. ${
      n.upper_limit != null
        ? `The Tolerable Upper Intake Level is ${n.upper_limit} ${n.unit}/day from food and supplements combined.`
        : "No Tolerable Upper Intake Level has been established."
    }`,
  });
  if (content?.food_sources.length) {
    const topFoods = content.food_sources
      .slice(0, 3)
      .map((f) => `${f.food} (${f.amount} per ${f.serving})`)
      .join("; ");
    faqItems.push({
      q: `What foods are highest in ${n.name}?`,
      a: `${topFoods}. See the food sources section below for the full list.`,
    });
  }
  if (content?.best_form) {
    faqItems.push({
      q: `What is the best form of ${n.name} to supplement?`,
      a: content.best_form,
    });
  }
  if (content?.deficiency_signs.length) {
    faqItems.push({
      q: `What are the signs of ${n.name} deficiency?`,
      a: content.deficiency_signs.slice(0, 3).join("; ") + ".",
    });
  }
  if (content?.who_needs_more.length) {
    faqItems.push({
      q: `Who is most at risk for low ${n.name}?`,
      a: content.who_needs_more.slice(0, 3).join("; ") + ".",
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${n.name}: Daily Target, Upper Limit, and Supplement Forms`,
    headline: `${n.name} — ${n.role}`,
    description: n.description,
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
      name: n.name,
      alternateName: n.synonyms,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Nutrients", item: `${BASE}/nutrients` },
      { "@type": "ListItem", position: 3, name: n.name, item: url },
    ],
  };

  const faqLd = faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

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
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/nutrients" className="hover:text-text transition-colors">
          Nutrients
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{n.name}</span>
      </nav>

      <header className="mb-8">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
          style={{ color: meta.color }}
        >
          {meta.label}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3">
          {n.name}
        </h1>
        <p className="text-sm text-muted mb-4">{n.role}</p>
        <p className="text-base text-muted leading-relaxed">{n.description}</p>
      </header>

      <section className="mb-10 grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-white/[0.02] px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
            Daily target
          </div>
          <div className="text-2xl font-bold text-text tabular-nums">
            {formatTarget(n)}
          </div>
          <div className="text-xs text-muted mt-0.5">{referenceTypeLabel(n.reference_type)}</div>
        </div>

        <div className="rounded-xl border border-border bg-white/[0.02] px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
            Upper limit
          </div>
          <div className="text-2xl font-bold text-text tabular-nums">
            {n.upper_limit != null ? `${n.upper_limit} ${n.unit}` : "None"}
          </div>
          <div className="text-xs text-muted mt-0.5">
            {n.upper_limit != null ? "Tolerable Upper Intake" : "No UL established"}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white/[0.02] px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
            Catalog matches
          </div>
          <div className="text-2xl font-bold text-text tabular-nums">
            {productHits.length}
          </div>
          <div className="text-xs text-muted mt-0.5">supplements in our catalog</div>
        </div>
      </section>

      {n.upper_limit != null && (
        <section className="mb-10 rounded-xl border border-warning/30 bg-warning/[0.05] p-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-warning mb-2">
            Upper-limit caution
          </h2>
          <p className="text-sm text-text leading-relaxed">
            The Tolerable Upper Intake Level for {n.name} is{" "}
            <strong>{n.upper_limit} {n.unit}</strong> per day. Routine intakes
            above this level — counting food + supplements — raise the risk of
            adverse effects. Multivitamins, fortified foods, and standalone
            supplements stack faster than people expect.
          </p>
        </section>
      )}

      {content?.key_facts && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            What {n.name} does
          </h2>
          <p className="text-base text-text leading-relaxed">
            {content.key_facts}
          </p>
        </section>
      )}

      {content?.food_sources && content.food_sources.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Food sources of {n.name}
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Approximate {n.name} content per serving. Whole-food intake counts
            toward your daily total alongside any supplemental dose.
          </p>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] border-b border-border">
                  <th className="text-left font-semibold text-muted uppercase text-xs tracking-wider px-4 py-2">
                    Food
                  </th>
                  <th className="text-left font-semibold text-muted uppercase text-xs tracking-wider px-4 py-2">
                    Serving
                  </th>
                  <th className="text-right font-semibold text-muted uppercase text-xs tracking-wider px-4 py-2">
                    {n.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.food_sources.map((f, i) => (
                  <tr
                    key={`${f.food}-${i}`}
                    className={i % 2 === 1 ? "bg-white/[0.01]" : ""}
                  >
                    <td className="px-4 py-2.5 text-text">{f.food}</td>
                    <td className="px-4 py-2.5 text-muted">{f.serving}</td>
                    <td className="px-4 py-2.5 text-right text-text font-semibold tabular-nums">
                      {f.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {content?.deficiency_signs && content.deficiency_signs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Signs of {n.name} deficiency
          </h2>
          <ul className="space-y-2">
            {content.deficiency_signs.map((s, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-text leading-relaxed"
              >
                <span className="text-warning flex-shrink-0 mt-1">●</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {content?.who_needs_more && content.who_needs_more.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Who needs more {n.name}
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Groups and situations where {n.name} requirements rise or status
            commonly runs low:
          </p>
          <ul className="space-y-2">
            {content.who_needs_more.map((s, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-text leading-relaxed"
              >
                <span className="text-accent flex-shrink-0 mt-1">●</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {n.low_bioavail_forms.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">Forms to avoid</h2>
          <p className="text-sm text-muted leading-relaxed mb-3">
            Not all {n.name} forms absorb equally well. The following forms
            are commonly used because they&apos;re cheap, but their
            bioavailability is materially lower than alternatives — watch for
            them on supplement labels:
          </p>
          <ul className="flex flex-wrap gap-2">
            {n.low_bioavail_forms.map((f) => (
              <li
                key={f}
                className="text-xs font-semibold bg-warning/10 border border-warning/30 text-warning rounded-full px-3 py-1 capitalize"
              >
                {f}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted mt-3 leading-relaxed">
            Formulate&apos;s product scoring penalizes these forms when they
            appear as the primary {n.name} source — see the{" "}
            <Link href="/methodology" className="text-accent hover:underline">
              methodology page
            </Link>{" "}
            for the rubric.
          </p>
        </section>
      )}

      {n.synonyms.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            How {n.name} appears on labels
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-3">
            Supplement labels list {n.name} under several names depending on
            the chemical form used. Any of these on an ingredients panel counts
            toward your {n.name} intake:
          </p>
          <ul className="flex flex-wrap gap-2">
            {n.synonyms.map((s) => (
              <li
                key={s}
                className="text-xs bg-white/[0.03] border border-border rounded-full px-3 py-1 text-text capitalize"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {cleanProducts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Best supplements for {n.name}
          </h2>
          <p className="text-xs text-muted mb-4">
            Top-scoring supplements in our catalog that list {n.name} on the
            label. Each product is graded on Formulate&apos;s ingredient-level
            rubric — dose accuracy, form, transparency, and third-party testing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cleanProducts.map(({ product: p }) => {
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
        </section>
      )}

      {lowAbsorbProducts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Products using a low-absorption {n.name} form
          </h2>
          <p className="text-xs text-muted mb-4">
            These supplements list {n.name} but use one of the low-bioavailability
            forms above. Listed for transparency — they&apos;re not necessarily
            bad products, but the {n.name} portion will under-deliver compared
            to better-formulated alternatives.
          </p>
          <ul className="space-y-2">
            {lowAbsorbProducts.map(({ product: p }) => {
              const g = scoreGrade(p.score);
              return (
                <li key={p.slug}>
                  <Link
                    href={`/supplements/${p.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-border bg-white/[0.02] px-3 py-2 hover:border-warning/40 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted mb-0.5 truncate">{p.brand}</div>
                      <div className="text-xs font-semibold text-text leading-snug line-clamp-1">
                        {p.name}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-warning/10 text-warning px-1.5 py-0.5 rounded flex-shrink-0">
                      Low abs
                    </span>
                    <div
                      className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                      style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                    >
                      {p.score ?? "—"}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {ingredientMatch && (
        <section className="mb-10 rounded-2xl border border-border bg-card/30 p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-2">
            Deep dive
          </h2>
          <p className="text-sm text-text leading-relaxed mb-3">
            For mechanism of action, dosing protocols, evidence grade, and
            interaction warnings on {n.name}, see the full encyclopedia entry:
          </p>
          <Link
            href={`/ingredients/${ingredientMatch.slug}`}
            className="inline-block text-sm font-semibold text-accent hover:underline"
          >
            {ingredientMatch.name} encyclopedia entry →
          </Link>
        </section>
      )}

      {conditionMatches.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Conditions where {n.name} has evidence
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-4">
            {n.name} appears on the supplement list for the following
            condition pages — each links to the full evidence summary, dose,
            and lifestyle context.
          </p>
          <ul className="space-y-2">
            {conditionMatches.map(({ condition, supplement }) => {
              const tColor =
                supplement.tier === "strong"
                  ? "#10B981"
                  : supplement.tier === "moderate"
                    ? "#3B82F6"
                    : "#F59E0B";
              const tLabel =
                supplement.tier === "strong"
                  ? "Strong"
                  : supplement.tier === "moderate"
                    ? "Moderate"
                    : "Preliminary";
              return (
                <li key={condition.slug}>
                  <Link
                    href={`/conditions/${condition.slug}`}
                    className="block rounded-lg border border-border bg-white/[0.02] px-4 py-3 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
                      <span className="text-sm font-semibold text-text">
                        {condition.name}
                      </span>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${tColor}1a`, color: tColor }}
                      >
                        {tLabel} evidence
                      </span>
                    </div>
                    <div className="text-xs text-muted">
                      Dose: <span className="text-text">{supplement.dose}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {studies.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Research on {n.name}
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Peer-reviewed studies in our research database that reference{" "}
            {n.name}. Each entry links to a detailed methodology review.
          </p>
          <ul className="space-y-2">
            {studies.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/research/${s.slug}`}
                  className="block rounded-lg border border-border bg-white/[0.02] px-4 py-3 hover:border-accent/40 transition-colors"
                >
                  <div className="text-xs text-muted mb-1 tabular-nums">
                    {s.authors}
                    {s.year ? `, ${s.year}` : ""}
                    {s.journal ? ` · ${s.journal}` : ""}
                    {s.methodology
                      ? ` · Grade ${s.methodology.grade}`
                      : ""}
                  </div>
                  <div className="text-sm font-semibold text-text leading-snug">
                    {s.title}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {relatedGuides.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Guides covering {n.name}
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Long-form articles in our guide library that go deeper on{" "}
            {n.name} — comparisons, protocols, and reviews.
          </p>
          <ul className="space-y-2">
            {relatedGuides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="block rounded-lg border border-border bg-white/[0.02] px-4 py-3 hover:border-accent/40 transition-colors"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-1">
                    {g.categoryLabel} · {g.readTime}
                  </div>
                  <div className="text-sm font-semibold text-text leading-snug">
                    {g.title}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {faqItems.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-white/[0.02] open:bg-white/[0.03]"
              >
                <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3 text-sm font-semibold text-text hover:text-accent transition-colors">
                  <span>{f.q}</span>
                  <span
                    className="text-muted text-xs transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </summary>
                <div className="px-4 pb-4 text-sm text-muted leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Related {meta.label.toLowerCase()}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/nutrients/${r.slug}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white/[0.02] hover:border-accent/40 transition-colors"
                >
                  <span className="text-sm text-text flex-1 truncate">{r.name}</span>
                  <span className="text-xs text-muted tabular-nums flex-shrink-0">
                    {formatTarget(r)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Track your full intake
        </h2>
        <p className="text-sm text-text mb-4 leading-relaxed">
          Formulate&apos;s free desktop app aggregates {n.name} (and ~40 other
          nutrients) across every supplement in your stack — flagging
          underdoses, overlaps, and upper-limit overshoots in one view.
        </p>
        <Link
          href="/download"
          className="inline-block px-4 py-2 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-[#00ffb3] transition-colors"
        >
          Get the app
        </Link>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Medical disclaimer.</strong> This page is
        educational and does not replace advice from a qualified healthcare
        provider. Targets and upper limits are general adult reference values;
        individual needs vary by age, sex, pregnancy status, and clinical context.
      </p>
    </main>
  );
}
