import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  brands,
  products,
  scoreGrade,
  thumbUrl,
  catalogReviewLabel,
  categorySlug,
  bestCategorySlugSet,
  type Product,
} from "@/lib/products";
import { ScoreMeter } from "@/components/score-meter";
import { NewsletterSignup } from "@/components/newsletter-signup";

const BASE = "https://formulate-health.app";

// Short editorial intro per category — turns a bare product grid into indexable,
// citable content. Keyed by lowercased category; categories without an entry
// simply render no blurb. Educational only, not medical advice.
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  vitamins:
    "Vitamins are essential micronutrients your body can't make in sufficient amounts. Formulate scores each product on whether it uses bioavailable forms (e.g. methylfolate over folic acid, D3 over D2) at doses backed by clinical evidence.",
  minerals:
    "Minerals like magnesium, zinc, and iron vary widely in absorption depending on their form. Scores reward chelated and well-absorbed forms (bisglycinate, citrate) at meaningful doses over cheap oxides and carbonates.",
  "amino acids":
    "Amino acids underpin muscle, neurotransmitters, and recovery. Formulate checks that each product delivers a clinically useful dose in a stable, absorbable form — not a fairy-dusted sprinkle.",
  protein:
    "Protein powders are scored on protein per serving, source quality, amino acid completeness, and what else is in the tub — added sugars, fillers, and proprietary blends pull the score down.",
  nootropics:
    "Nootropics target focus, memory, and cognition. Because the category is full of underdosed blends, scores weigh whether each active hits its researched dose and uses an evidence-backed form.",
  probiotics:
    "Probiotics are scored on strain specificity, CFU count at end of shelf life, and whether the strains have human evidence for the claimed benefit — not just total bacteria count.",
  "omega-3":
    "Omega-3 products are graded on EPA/DHA content (not total fish oil), form (triglyceride vs ethyl ester), and third-party testing for oxidation and purity.",
  herbs:
    "Herbal supplements are scored on standardized active content, extract ratio, and dose versus the clinical literature — a named extract at the studied dose beats a raw-powder 'blend'.",
  adaptogens:
    "Adaptogens like ashwagandha and rhodiola are graded on standardized extract, the specific researched form (e.g. KSM-66), and whether the dose matches trials.",
};

export const metadata: Metadata = {
  title: "Supplement Reviews & Scores — Formulate",
  description: `Ingredient-level scores for ${products.length}+ supplements. Every product graded on dose accuracy, form, transparency, and third-party testing.`,
  alternates: { canonical: `${BASE}/supplements` },
  openGraph: {
    title: "Supplement Reviews & Scores — Formulate",
    description: `Ingredient-level scores for ${products.length}+ supplements.`,
    type: "website",
    url: `${BASE}/supplements`,
  },
};

function byCategory(list: Product[]): Record<string, Product[]> {
  const map: Record<string, Product[]> = {};
  for (const p of list) {
    const key = p.category || "Other";
    (map[key] ??= []).push(p);
  }
  for (const k of Object.keys(map)) {
    map[k].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }
  return map;
}

export default function SupplementsHub() {
  const sorted = [...products].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const grouped = byCategory(sorted);
  const categories = Object.keys(grouped).sort(
    (a, b) => grouped[b].length - grouped[a].length,
  );
  const bestSlugs = bestCategorySlugSet();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplement Reviews & Scores",
    description: `Ingredient-level scores for ${products.length} supplements.`,
    url: `${BASE}/supplements`,
    // No AggregateRating here: a single editorial score emitted as ratingCount:1
    // gets rejected by Google as "too few ratings" and can suppress rich results
    // (same reason the product-page Product schema omits it).
    hasPart: sorted.slice(0, 20).map((p) => ({
      "@type": "Product",
      name: `${p.brand} ${p.name}`,
      brand: { "@type": "Brand", name: p.brand },
      url: `${BASE}/supplements/${p.slug}`,
    })),
  };

  const topProduct = sorted[0];
  const hubFaqs: { q: string; a: string }[] = [
    {
      q: "How does Formulate score supplements?",
      a: `Every supplement is graded 0–100 by an automated rubric covering evidence quality, dose accuracy, bioavailability (ingredient form), label transparency, safety, and manufacturing practices. The same rubric is applied to all ${products.length} products — no human picks favorites.`,
    },
    {
      q: "Are these supplement reviews sponsored?",
      a: "No. Formulate takes no payment from brands to score or rank a product. Scores reflect the formula on the label, not advertising spend, and affiliate links never influence a grade.",
    },
  ];
  if (topProduct && topProduct.score !== null) {
    hubFaqs.push({
      q: "What is the highest-scoring supplement?",
      a: `${topProduct.brand} ${topProduct.name} is currently the highest-scoring product at ${topProduct.score}/100 (grade ${scoreGrade(topProduct.score).letter}).`,
    });
  }
  if (catalogReviewLabel) {
    hubFaqs.push({
      q: "How often are the scores updated?",
      a: `Scores are recomputed whenever the underlying evidence or product data changes. This catalog was last reviewed ${catalogReviewLabel}.`,
    });
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hubFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Supplement Scores
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Every product below has been graded by Formulate&apos;s automated rubric:
          evidence quality, dose accuracy, bioavailability, transparency, safety,
          and manufacturing practices. {products.length} supplements indexed.
        </p>
      </header>

      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Browse by brand
          </h2>
          <Link
            href="/brands"
            className="text-xs text-muted hover:text-accent transition-colors"
          >
            All brands →
          </Link>
        </div>
        <ul className="flex flex-wrap gap-2">
          {brands.map((b) => {
            const g = scoreGrade(b.score ?? b.avg_score ?? null);
            return (
              <li key={b.slug}>
                <Link
                  href={`/brands/${b.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] pl-3 pr-2 py-1.5 hover:border-accent/40 transition-colors"
                >
                  <span className="text-sm font-semibold text-text">{b.name}</span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                  >
                    {b.grade ?? g.letter}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {categories.map((cat) => (
        <section key={cat} className="mb-14">
          <div className="flex items-baseline justify-between mb-3 gap-3">
            <h2 className="text-xl font-bold text-text">{cat}</h2>
            <div className="flex items-baseline gap-3 flex-shrink-0">
              {bestSlugs.has(categorySlug(cat)) && (
                <Link
                  href={`/supplements/best/${categorySlug(cat)}`}
                  className="text-xs font-semibold text-accent hover:underline whitespace-nowrap"
                >
                  Best {cat} →
                </Link>
              )}
              <span className="text-xs text-muted">{grouped[cat].length} products</span>
            </div>
          </div>
          {CATEGORY_DESCRIPTIONS[cat.toLowerCase()] && (
            <p className="text-sm text-muted leading-relaxed mb-5 max-w-3xl">
              {CATEGORY_DESCRIPTIONS[cat.toLowerCase()]}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grouped[cat].map((p) => {
              const g = scoreGrade(p.score);
              return (
                <Link
                  key={p.slug}
                  href={`/supplements/${p.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
                >
                  {p.image_url ? (
                    <div className="relative w-14 h-14 rounded-lg bg-white/[0.02] overflow-hidden flex-shrink-0">
                      <Image
                        src={thumbUrl(p) ?? p.image_url}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-white/[0.02] border border-border flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted mb-0.5 truncate">{p.brand}</div>
                    <div className="text-sm font-semibold text-text leading-snug line-clamp-2">
                      {p.name}
                    </div>
                  </div>
                  <ScoreMeter score={p.score} size={40} strokeWidth={4} />
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mt-4">
        <h2 className="text-2xl font-bold text-text mb-6">Frequently asked questions</h2>
        <div className="space-y-5 max-w-3xl">
          {hubFaqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-base font-semibold text-text mb-1.5">{f.q}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterSignup source="supplements-hub" />
    </main>
  );
}
