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
import { ingredients as encyclopediaIngredients } from "@/lib/encyclopedia";
import { scoreGrade, thumbUrl } from "@/lib/products";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return CORE_NUTRIENTS.map((n) => ({ slug: n.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const n = nutrientBySlug(slug);
  if (!n) return { title: "Nutrient not found" };
  const ulFragment =
    n.upper_limit != null ? `, upper limit ${n.upper_limit} ${n.unit}` : "";
  const description = `${n.name} daily target ${n.daily_value} ${n.unit}${ulFragment}. Best forms, food sources, and supplements ranked by Formulate's ingredient scoring.`;
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
