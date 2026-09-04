import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  products,
  productBySlug,
  canonicalSlugFor,
  relatedProducts,
  scoreGrade,
  thumbUrl,
  formatIngredientAmount,
  catalogUpdatedAt,
  catalogReviewLabel,
  type Product,
} from "@/lib/products";
import { withUtm } from "@/lib/app-url";
import { SupplementBuyButtons } from "@/components/supplement-buy-buttons";
import { ScoreMeter } from "@/components/score-meter";
import { findIngredientByName } from "@/lib/encyclopedia";
import {
  evidenceProfileFor,
  evidenceSummary,
  pubmedSearchUrl,
  pubmedAbstractUrl,
  topOutcomes,
  directionLabel,
} from "@/lib/evidence-profiles";
import { PageConversion } from "@/components/page-conversion";
import { AppCtaCard } from "@/components/app-cta-card";

const BASE = "https://formulate-health.app";
const APP_URL = "https://app.formulate-health.app";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return { title: "Product not found" };

  const grade = scoreGrade(p.score);
  const title = `${p.brand} ${p.name} Review: Score ${p.score}/100 (${grade.letter})`;
  const description = (
    p.explanation ??
    p.overview ??
    `${p.brand} ${p.name} scored ${p.score}/100 by Formulate — ingredient-level analysis of dose, form, transparency, and third-party testing.`
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  // A duplicate copy of another product points at the real record instead of
  // itself, so the two stop competing in search. See canonicalSlugFor.
  const url = `${BASE}/supplements/${canonicalSlugFor(slug)}`;
  const ogImage = p.image_url ? `${BASE}${p.image_url}` : undefined;

  return {
    title: title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

function ScoreBreakdown({ components }: { components: Product["score_components"] }) {
  if (!components.length) return null;
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-text mb-4">Score Breakdown</h2>
      <p className="text-sm text-muted mb-6 leading-relaxed">
        Formulate scores every product across six weighted dimensions. Each dimension
        is graded independently — hover or tap to see what drove each component.
      </p>
      <div className="space-y-4">
        {components.map((c) => {
          const pct = Math.max(0, Math.min(100, c.raw_score));
          const color =
            c.raw_score >= 85
              ? "#10B981"
              : c.raw_score >= 70
                ? "#3B82F6"
                : c.raw_score >= 55
                  ? "#F59E0B"
                  : "#EF4444";
          return (
            <div key={c.name}>
              <div className="flex items-baseline justify-between mb-1.5">
                <div className="text-sm font-semibold text-text">
                  {c.name}
                  {/* A zero-weight component is a GATE (V3.23): it adds nothing
                      and instead deducts when the score falls below its floor.
                      Showing that as "weight 0%" reads as a bug. */}
                  {c.gate_floor !== undefined && c.weight === 0 ? (
                    <span
                      className={`ml-2 text-xs font-normal ${
                        c.raw_score < c.gate_floor ? "text-amber-500" : "text-muted"
                      }`}
                    >
                      {c.raw_score < c.gate_floor
                        ? `gate · below ${c.gate_floor}`
                        : "gate · pass"}
                    </span>
                  ) : (
                    <span className="ml-2 text-xs font-normal text-muted">
                      weight {Math.round(c.weight * 100)}%
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold" style={{ color }}>
                  {c.raw_score}
                  <span className="text-xs font-normal text-muted ml-1">/ 100</span>
                </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function IngredientTable({ ingredients }: { ingredients: Product["ingredients"] }) {
  if (!ingredients.length) return null;
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-text mb-4">Ingredients per Serving</h2>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02]">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-text">Ingredient</th>
              <th className="text-right px-4 py-3 font-semibold text-text">Amount</th>
              <th className="text-right px-4 py-3 font-semibold text-text hidden sm:table-cell">
                % Daily Value
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing, i) => {
              const enc = findIngredientByName(ing.name);
              return (
              <tr
                key={`${ing.name}-${i}`}
                className={i < ingredients.length - 1 ? "border-b border-border" : ""}
              >
                <td className="px-4 py-3 text-text">
                  {enc ? (
                    <Link
                      href={`/ingredients/${enc.slug}`}
                      className="hover:text-accent transition-colors underline-offset-4 hover:underline"
                    >
                      {ing.name}
                    </Link>
                  ) : (
                    ing.name
                  )}
                  {ing.form_details && (
                    <span className="block text-xs text-muted mt-0.5">{ing.form_details}</span>
                  )}
                  {(() => {
                    // How much human literature exists for this ingredient, with
                    // the search that found it. Counts, never a verdict — see
                    // lib/evidence-profiles.ts for why the two cannot be mixed.
                    const p = evidenceProfileFor(ing.name);
                    if (!p) return null;
                    const summary = evidenceSummary(p);
                    if (!summary) return null;
                    const none = p.counts.all === 0;
                    return (
                      <a
                        href={pubmedSearchUrl(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block text-xs mt-1 underline-offset-4 hover:underline ${
                          none ? "text-amber-500/80" : "text-muted"
                        }`}
                        title={`PubMed, human supplementation research${
                          p.fetched_at ? ` — checked ${p.fetched_at.slice(0, 10)}` : ""
                        }`}
                      >
                        {summary}
                      </a>
                    );
                  })()}
                  {(() => {
                    // What those reviews CONCLUDED, per outcome. The counts
                    // above cannot say this: an ingredient is never good or bad
                    // on its own, it is effective FOR something, and the same
                    // substance earns different verdicts on different outcomes.
                    // Each row links the abstract its quote came from.
                    const p = evidenceProfileFor(ing.name);
                    const outs = p ? topOutcomes(p) : [];
                    if (!outs.length) return null;
                    return (
                      <ul className="mt-1.5 space-y-0.5">
                        {outs.map((o) => (
                          <li key={`${o.outcome}-${o.quote_pmid}`} className="text-xs leading-snug">
                            <a
                              href={pubmedAbstractUrl(o.quote_pmid)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-4 hover:underline"
                              title={o.quote}
                            >
                              <span
                                className={
                                  o.direction === "benefit"
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : o.direction === "harm"
                                      ? "text-rose-600 dark:text-rose-400"
                                      : o.direction === "no_effect"
                                        ? "text-amber-600 dark:text-amber-400"
                                        : "text-muted"
                                }
                              >
                                {directionLabel(o.direction)}
                              </span>
                              <span className="text-muted"> · {o.outcome}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    );
                  })()}
                </td>
                <td className="px-4 py-3 text-right text-muted whitespace-nowrap">
                  {formatIngredientAmount(ing) || "—"}
                </td>
                <td className="px-4 py-3 text-right text-muted hidden sm:table-cell">
                  {ing.daily_value_pct !== null ? `${ing.daily_value_pct}%` : "—"}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function stripHtml(text: string | null): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Single source of truth for FAQs — rendered on-page AND emitted as FAQPage
// schema. Google flags FAQ schema that doesn't match visible content, so these
// must stay unified (previously the on-page list and the JSON-LD diverged).
function productFaqs(product: Product): { q: string; a: string }[] {
  const qs: { q: string; a: string }[] = [];
  const nameLower = product.name.toLowerCase();

  if (product.score !== null) {
    const grade = scoreGrade(product.score);
    qs.push({
      q: `What is ${product.brand} ${product.name}'s Formulate score?`,
      a: `${product.brand} ${product.name} scores ${product.score} out of 100 (grade ${grade.letter}) on Formulate's ingredient-level rubric, which weighs evidence quality, dose accuracy, bioavailability, transparency, safety, and manufacturing practices.`,
    });

    const s = product.score;
    const verdict =
      s >= 80
        ? `That puts it in Formulate's top tier: its ingredient doses, forms, and label transparency hold up against the clinical evidence${product.certifications.length ? ", and it carries credible third-party testing" : ""}.`
        : s >= 67
          ? `That's an above-average result — most of its doses and ingredient forms are well-chosen, with only minor gaps in dosing, transparency, or testing.`
          : s >= 53
            ? `That's a middling result — it has real shortcomings in dose, ingredient form, or transparency that pull it below stronger options in the same category.`
            : `That's a below-average result — meaningful gaps in dosing, ingredient forms, or testing make it hard to recommend over higher-scoring alternatives in its category.`;
    qs.push({
      q: `Is ${product.brand} ${product.name} worth it?`,
      a: `${product.brand} ${product.name} scores ${product.score}/100 (grade ${grade.letter}). ${verdict} Formulate grades every product with the same automated rubric, so the score reflects the formula — not marketing or sponsorships.`,
    });
  }

  if (product.ingredients.length) {
    const ingList = product.ingredients
      .slice(0, 4)
      .map((i) => `${i.name}${i.amount ? ` (${formatIngredientAmount(i)})` : ""}`)
      .join(", ");
    qs.push({
      q: `What's in ${product.brand} ${product.name}?`,
      a: `Each serving contains ${ingList}${product.ingredients.length > 4 ? ", and more" : ""}. ${product.serving_size ? `Serving size: ${product.serving_size}.` : ""} ${product.servings_per_container ? `${product.servings_per_container} servings per container.` : ""}`.trim(),
    });
  }

  if (product.recommended_use) {
    qs.push({
      q: `How do I take ${nameLower}?`,
      a: stripHtml(product.recommended_use).slice(0, 500),
    });
  }

  qs.push({
    q: `Who makes ${product.name}?`,
    a: `${product.name} is made by ${product.brand}. See Formulate's full grade and product lineup for ${product.brand} on its brand page.`,
  });

  if (product.certifications.length) {
    qs.push({
      q: `Is ${product.brand} ${product.name} third-party tested?`,
      a: `${product.brand} lists the following certifications and testing for this product: ${product.certifications.join(", ")}.`,
    });
  }

  return qs;
}

function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-text mb-4">Frequently Asked Questions</h2>
      <div className="space-y-5">
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="text-sm font-semibold text-text mb-1.5">{item.q}</h3>
            <p className="text-sm text-muted leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function SupplementPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const grade = scoreGrade(product.score);
  const url = `${BASE}/supplements/${slug}`;
  const related = relatedProducts(product, 3);

  const reviewDateIso = catalogUpdatedAt.slice(0, 10);
  const reviewDateLabel = catalogReviewLabel;

  const productLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category || undefined,
    description: stripHtml(product.overview ?? product.description ?? product.explanation).slice(0, 500) || undefined,
    image: product.image_url ? `${BASE}${product.image_url}` : undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  if (product.score !== null) {
    // No AggregateRating: a single editorial score with ratingCount:1 gets
    // rejected by Google as "too few ratings" and suppresses rich results.
    // A richer Review is star-eligible in Google's review-snippet track.
    productLd.review = {
      "@type": "Review",
      name: `Formulate Review: ${product.brand} ${product.name}`,
      author: {
        "@type": "Organization",
        name: "Formulate",
        url: BASE,
      },
      datePublished: reviewDateIso,
      dateModified: reviewDateIso,
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.score,
        bestRating: 100,
        worstRating: 0,
      },
      reviewBody:
        stripHtml(product.explanation ?? product.overview ?? "").slice(0, 500) ||
        `${product.brand} ${product.name} scored ${product.score}/100 (Grade ${grade.letter}) on Formulate's ingredient-level rubric covering dose, form, bioavailability, transparency, safety, and manufacturing.`,
    };
  }
  if (product.price_usd && product.url) {
    productLd.offers = {
      "@type": "Offer",
      price: product.price_usd.toFixed(2),
      priceCurrency: "USD",
      url: product.url,
      availability: "https://schema.org/InStock",
    };
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Supplements", item: `${BASE}/supplements` },
      { "@type": "ListItem", position: 3, name: `${product.brand} ${product.name}`, item: url },
    ],
  };

  const faqs = productFaqs(product);
  const faqLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((p) => ({
          "@type": "Question",
          name: p.q,
          acceptedAnswer: { "@type": "Answer", text: p.a },
        })),
      }
    : null;

  const amazonUrl = product.amazon_url
    ? withUtm(product.amazon_url, { source: "landing", campaign: "supplement_page", content: product.slug })
    : null;
  const iherbUrl = product.iherb_url
    ? withUtm(product.iherb_url, { source: "landing", campaign: "supplement_page", content: product.slug })
    : null;
  const appUrl = withUtm(`${APP_URL}/catalog/${product.slug}`, {
    source: "landing",
    campaign: "supplement_page",
    content: product.slug,
  });

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
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
        <Link href="/supplements" className="hover:text-text transition-colors">
          Supplements
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">
          {product.brand} {product.name}
        </span>
      </nav>

      <header className="grid md:grid-cols-[240px_1fr] gap-8 mb-10">
        <div className="flex items-start justify-center md:justify-start">
          {product.image_url ? (
            <div className="relative w-full max-w-[240px] aspect-square rounded-2xl bg-white/[0.02] border border-border overflow-hidden">
              <Image
                src={product.image_url}
                alt={`${product.brand} ${product.name}`}
                fill
                sizes="240px"
                className="object-contain p-4"
                priority
              />
            </div>
          ) : (
            <div className="w-full max-w-[240px] aspect-square rounded-2xl bg-white/[0.02] border border-border flex items-center justify-center text-muted text-sm">
              No image
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-medium text-muted mb-2">
            <Link
              href={`/brands/${product.brand_slug}`}
              className="hover:text-accent transition-colors"
            >
              {product.brand}
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-4 leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-5">
            <ScoreMeter score={product.score} size={78} strokeWidth={6} showGrade />
            <div className="text-sm text-muted leading-relaxed">
              Grade <span className="font-bold text-text">{grade.letter}</span>
              {product.form && (
                <>
                  {" · "}
                  <span className="capitalize">{product.form}</span>
                </>
              )}
              {product.servings_per_container && (
                <>
                  {" · "}
                  {product.servings_per_container} servings
                </>
              )}
              {product.price_usd && (
                <>
                  {" · "}
                  <span className="text-text font-medium">${product.price_usd.toFixed(2)}</span>
                </>
              )}
            </div>
          </div>
          {product.explanation && (
            <p className="text-muted text-base leading-relaxed mb-5">{product.explanation}</p>
          )}
          <SupplementBuyButtons
            product_slug={product.slug}
            product_id={product.id ?? null}
            amazon_url={amazonUrl}
            iherb_url={iherbUrl}
            app_url={appUrl}
          />
          {/* The ask belongs HERE, not at the foot of the page. Readers spend ~35s
              on this route and leave from it; the end-of-page PageConversion sits
              ~200 lines below where they stop. They have just been given one
              product's score, so the next question is their own stack — offer that
              while the question is live. Tracked automatically by AppLinkTracker. */}
          <AppCtaCard
            className="mt-5"
            title={`Add ${product.name} to your stack — free`}
            sub="Get one number for what your supplements actually cover, and what they miss."
            campaign="supplement_inline_cta"
            path={`/catalog/${product.slug}`}
          />
          {reviewDateLabel && (
            <p className="text-xs text-muted mt-4 leading-relaxed">
              Scored by the{" "}
              <Link
                href="/methodology"
                className="hover:text-accent transition-colors underline-offset-4 hover:underline"
              >
                Formulate Research Team
              </Link>{" "}
              · Last reviewed {reviewDateLabel}
            </p>
          )}
        </div>
      </header>

      {product.category_tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {product.category && (
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
              {product.category}
            </span>
          )}
          {product.category_tags
            .filter((t) => t.toLowerCase() !== product.category.toLowerCase())
            .slice(0, 5)
            .map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/[0.03] border border-border text-muted text-xs font-medium capitalize"
              >
                {tag}
              </span>
            ))}
        </div>
      )}

      {product.overview &&
        stripHtml(product.overview) !== stripHtml(product.explanation) && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-text mb-4">
              Overview: {product.brand} {product.name}
            </h2>
            <p className="text-base text-muted leading-relaxed">
              {stripHtml(product.overview)}
            </p>
          </section>
        )}

      <ScoreBreakdown components={product.score_components} />

      <IngredientTable ingredients={product.ingredients} />

      {product.certifications.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Certifications & Testing</h2>
          <div className="flex flex-wrap gap-2">
            {product.certifications.map((c) => (
              <span
                key={c}
                className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-border text-sm text-text"
              >
                {c}
              </span>
            ))}
          </div>
        </section>
      )}

      {product.other_ingredients.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-3">Other Ingredients</h2>
          <p className="text-sm text-muted leading-relaxed">
            {product.other_ingredients.join(", ")}
          </p>
        </section>
      )}

      {(product.recommended_use || product.warnings) && (
        <section className="mb-12 grid md:grid-cols-2 gap-6">
          {product.recommended_use && (
            <div className="rounded-xl border border-border bg-white/[0.02] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-2">
                Recommended Use
              </h2>
              <p className="text-sm text-text leading-relaxed">
                {stripHtml(product.recommended_use).slice(0, 400)}
              </p>
            </div>
          )}
          {product.warnings && (
            <div className="rounded-xl border border-border bg-white/[0.02] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-2">
                Warnings
              </h2>
              <p className="text-sm text-text leading-relaxed">
                {stripHtml(product.warnings).slice(0, 400)}
              </p>
            </div>
          )}
        </section>
      )}

      <FAQ faqs={faqs} />

      {related.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Related Supplements</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => {
              return (
                <Link
                  key={r.slug}
                  href={`/supplements/${r.slug}`}
                  className="block rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {r.image_url && (
                      <div className="relative w-12 h-12 rounded-lg bg-white/[0.02] overflow-hidden flex-shrink-0">
                        <Image
                          src={thumbUrl(r) ?? r.image_url}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      </div>
                    )}
                    <ScoreMeter score={r.score} size={40} strokeWidth={4} />
                  </div>
                  <div className="text-xs text-muted mb-0.5">{r.brand}</div>
                  <div className="text-sm font-semibold text-text leading-snug line-clamp-2">
                    {r.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card/30 p-6 mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Track {product.name.toLowerCase()} in your stack
        </h2>
        <p className="text-sm text-text mb-4 leading-relaxed">
          Build a personalized supplement stack free in your browser — no install. Flag
          dose overlaps and interactions, and keep every product scored against the
          latest evidence.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={appUrl}
            className="px-4 py-2 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-[#00ffb3] transition-colors"
          >
            Add to your free stack →
          </a>
          <Link
            href="/supplements"
            className="px-4 py-2 rounded-lg border border-border text-text font-semibold text-sm hover:border-accent transition-colors"
          >
            Browse all supplements
          </Link>
        </div>
      </section>

      <PageConversion kind="supplement" slug={slug} subject={product.name} />

      <p className="text-xs text-muted pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Disclosure.</strong> Formulate may earn a commission
        from purchases made through links on this page. Commissions never influence
        scores — every product is graded by the same automated rubric. This page is for
        educational purposes only and does not replace advice from a qualified healthcare
        provider.
      </p>
    </main>
  );
}
