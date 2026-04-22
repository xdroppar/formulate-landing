import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TrackedDownloadLink } from "@/components/tracked-download-link";
import {
  products,
  productBySlug,
  relatedProducts,
  scoreGrade,
  thumbUrl,
  formatIngredientAmount,
  type Product,
} from "@/lib/products";
import { withUtm } from "@/lib/app-url";
import { SupplementBuyButtons } from "@/components/supplement-buy-buttons";

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

  const url = `${BASE}/supplements/${slug}`;
  const ogImage = p.image_url ? `${BASE}${p.image_url}` : undefined;

  return {
    title: `${title} — Formulate`,
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
                  <span className="ml-2 text-xs font-normal text-muted">
                    weight {Math.round(c.weight * 100)}%
                  </span>
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
            {ingredients.map((ing, i) => (
              <tr
                key={`${ing.name}-${i}`}
                className={i < ingredients.length - 1 ? "border-b border-border" : ""}
              >
                <td className="px-4 py-3 text-text">
                  {ing.name}
                  {ing.form_details && (
                    <span className="block text-xs text-muted mt-0.5">{ing.form_details}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-muted whitespace-nowrap">
                  {formatIngredientAmount(ing) || "—"}
                </td>
                <td className="px-4 py-3 text-right text-muted hidden sm:table-cell">
                  {ing.daily_value_pct !== null ? `${ing.daily_value_pct}%` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function stripHtml(text: string | null): string {
  if (!text) return "";
  return text
    .replace(/\s+/g, " ")
    .trim();
}

function FAQ({ product }: { product: Product }) {
  const qs: { q: string; a: string }[] = [];
  const nameLower = product.name.toLowerCase();

  if (product.score !== null) {
    const grade = scoreGrade(product.score);
    qs.push({
      q: `What is ${product.brand} ${product.name}'s Formulate score?`,
      a: `${product.brand} ${product.name} scores ${product.score} out of 100 (grade ${grade.letter}) on Formulate's ingredient-level rubric, which weighs evidence quality, dose accuracy, bioavailability, transparency, safety, and manufacturing practices.`,
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

  if (product.certifications.length) {
    qs.push({
      q: `Is ${product.brand} ${product.name} third-party tested?`,
      a: `${product.brand} lists the following certifications and testing for this product: ${product.certifications.join(", ")}.`,
    });
  }

  if (!qs.length) return null;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-text mb-4">Frequently Asked Questions</h2>
      <div className="space-y-5">
        {qs.map((item) => (
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

  const productLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category || undefined,
    description: stripHtml(product.overview ?? product.description ?? product.explanation).slice(0, 500) || undefined,
    image: product.image_url ? `${BASE}${product.image_url}` : undefined,
    url,
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
      datePublished: "2026-04-21",
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

  const faqPairs: { q: string; a: string }[] = [];
  if (product.score !== null) {
    faqPairs.push({
      q: `What is ${product.brand} ${product.name}'s Formulate score?`,
      a: `${product.brand} ${product.name} scores ${product.score} out of 100 (grade ${grade.letter}).`,
    });
  }
  if (product.certifications.length) {
    faqPairs.push({
      q: `Is ${product.brand} ${product.name} third-party tested?`,
      a: `Certifications listed: ${product.certifications.join(", ")}.`,
    });
  }
  const faqLd = faqPairs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqPairs.map((p) => ({
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
            <div
              className="flex flex-col items-center justify-center rounded-xl px-5 py-3 font-bold"
              style={{
                backgroundColor: `${grade.color}1a`,
                color: grade.color,
                border: `1px solid ${grade.color}33`,
              }}
            >
              <span className="text-2xl leading-none">{product.score}</span>
              <span className="text-[10px] uppercase tracking-wider mt-1">Score</span>
            </div>
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

      <FAQ product={product} />

      {related.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text mb-4">Related Supplements</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => {
              const rg = scoreGrade(r.score);
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
                    <div
                      className="text-sm font-bold px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${rg.color}1a`,
                        color: rg.color,
                      }}
                    >
                      {r.score}
                    </div>
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
          The Formulate desktop app lets you build a personalized supplement stack, flag
          dose overlaps and interactions, and keep every product scored against the
          latest evidence.
        </p>
        <div className="flex flex-wrap gap-3">
          <TrackedDownloadLink
            href="/download"
            source={`supplement:${slug}`}
            className="px-4 py-2 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-[#00ffb3] transition-colors"
          >
            Get the desktop app
          </TrackedDownloadLink>
          <Link
            href="/supplements"
            className="px-4 py-2 rounded-lg border border-border text-text font-semibold text-sm hover:border-accent transition-colors"
          >
            Browse all supplements
          </Link>
        </div>
      </section>

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
