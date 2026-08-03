import type { Metadata } from "next";
import Link from "next/link";
import { brands, productsForBrand, scoreGrade, catalogReviewLabel } from "@/lib/products";
import { NewsletterSignup } from "@/components/newsletter-signup";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplement Brands Ranked by Quality`,
  description: `${brands.length} supplement brands graded on ingredient quality, dose accuracy, and third-party testing. See which brands consistently score well and which don't.`,
  alternates: { canonical: `${BASE}/brands` },
  openGraph: {
    title: `Supplement Brands Ranked by Quality`,
    description: `${brands.length} brands graded on ingredient quality, dose accuracy, and third-party testing.`,
    type: "website",
    url: `${BASE}/brands`,
  },
};

export default function BrandsIndex() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplement Brands Ranked by Quality",
    description: `${brands.length} supplement brands graded on ingredient quality.`,
    url: `${BASE}/brands`,
    hasPart: brands.map((b) => ({
      "@type": "Brand",
      name: b.name,
      url: `${BASE}/brands/${b.slug}`,
    })),
  };

  const ranked = [...brands].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const topBrand = ranked.find((b) => b.score !== null);
  const hubFaqs: { q: string; a: string }[] = [
    {
      q: "How are supplement brands graded?",
      a: `Each brand's grade is the weighted average of Formulate's ingredient-level product scores across that brand's lineup, rebalanced for ingredient transparency and third-party testing coverage. ${brands.length} brands are covered. It is not a paid or sponsored ranking.`,
    },
  ];
  if (topBrand && topBrand.score !== null) {
    hubFaqs.push({
      q: "Which supplement brand scores highest?",
      a: `${topBrand.name} is currently the highest-graded brand at ${topBrand.score}/100 (grade ${topBrand.grade ?? scoreGrade(topBrand.score).letter}), based on the quality of its full product lineup.`,
    });
  }
  hubFaqs.push({
    q: "Does Formulate accept payment from supplement brands?",
    a: "No. Brands cannot pay to be listed, scored higher, or ranked. Grades reflect only the formulas Formulate analyzes; affiliate links never affect a score.",
  });
  if (catalogReviewLabel) {
    hubFaqs.push({
      q: "When were these brand grades last updated?",
      a: `Brand grades are recomputed whenever the underlying product scores change. They were last reviewed ${catalogReviewLabel}.`,
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
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
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
          Supplement Brands, Ranked
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Every brand below has been graded by Formulate&apos;s automated rubric — the
          same ingredient-level analysis we apply to every product, aggregated across
          each brand&apos;s lineup. {brands.length} brands covered.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brands.map((b) => {
          const count = productsForBrand(b.slug).length;
          const g = scoreGrade(b.score ?? b.avg_score ?? null);
          return (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className="rounded-xl border border-border bg-white/[0.02] p-5 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-text mb-0.5 truncate">{b.name}</h2>
                  <p className="text-xs text-muted">
                    {count} {count === 1 ? "product" : "products"} scored
                  </p>
                </div>
                <div
                  className="text-sm font-bold px-3 py-1.5 rounded flex-shrink-0"
                  style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                >
                  {b.grade ?? g.letter}
                </div>
              </div>
              {b.score !== null && (
                <p className="text-xs text-muted">
                  Brand score: <span className="text-text font-semibold">{b.score}</span> / 100
                </p>
              )}
            </Link>
          );
        })}
      </div>

      <section className="mt-14">
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

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">How we grade brands.</strong> A brand&apos;s score is
        the weighted average of Formulate&apos;s product scores across that
        brand&apos;s lineup, rebalanced for ingredient transparency and third-party
        testing coverage. See the{" "}
        <Link href="/methodology" className="text-accent hover:underline">
          full methodology
        </Link>
        .
      </p>

      <NewsletterSignup source="brands-hub" />
    </main>
  );
}
