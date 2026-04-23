import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  brandComparisons,
  brandComparisonBySlug,
  brandComparisonSlug,
  type BrandComparison,
} from "@/lib/brand-comparisons";
import { brandBySlug, productsForBrand, scoreGrade, type BrandSummary } from "@/lib/products";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return brandComparisons.map((c) => ({ pair: brandComparisonSlug(c) }));
}

type Params = Promise<{ pair: string }>;

function resolveSides(c: BrandComparison): { a: BrandSummary; b: BrandSummary } | null {
  const ba = brandBySlug(c.a);
  const bb = brandBySlug(c.b);
  if (!ba || !bb) return null;
  const [first, second] = [ba, bb].sort((x, y) => x.slug.localeCompare(y.slug));
  return { a: first, b: second };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { pair } = await params;
  const c = brandComparisonBySlug(pair);
  if (!c) return { title: "Brand comparison not found" };
  const sides = resolveSides(c);
  if (!sides) return { title: "Brand comparison not found" };
  const { a, b } = sides;
  const title = `${a.name} vs ${b.name}: Which Supplement Brand Is Better?`;
  const description = c.bottom_line;
  const url = `${BASE}/brand-compare/${pair}`;
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

export default async function BrandComparePage({ params }: { params: Params }) {
  const { pair } = await params;
  const c = brandComparisonBySlug(pair);
  if (!c) notFound();
  const sides = resolveSides(c);
  if (!sides) notFound();

  const { a, b } = sides;
  const url = `${BASE}/brand-compare/${pair}`;

  const aLineup = productsForBrand(a.slug);
  const bLineup = productsForBrand(b.slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Brands", item: `${BASE}/brands` },
      { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}`, item: url },
    ],
  };

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
    ],
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/brands" className="hover:text-text transition-colors">
          Brands
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">
          {a.name} vs {b.name}
        </span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          Brand vs Brand
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
        {[
          { brand: a, lineup: aLineup },
          { brand: b, lineup: bLineup },
        ].map(({ brand, lineup }) => {
          const g = scoreGrade(brand.score ?? brand.avg_score ?? null);
          return (
            <div
              key={brand.slug}
              className="rounded-xl border border-border bg-white/[0.02] p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  {brand.standout && (
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-1">
                      {brand.standout}
                    </p>
                  )}
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="text-lg font-bold text-text hover:text-accent transition-colors"
                  >
                    {brand.name}
                  </Link>
                </div>
                <div
                  className="text-xl font-bold px-3 py-1.5 rounded flex-shrink-0"
                  style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                >
                  {brand.grade ?? g.letter}
                </div>
              </div>
              {brand.components && (
                <div className="space-y-1.5 mb-3">
                  {(
                    [
                      ["Integrity", brand.components.integrity],
                      ["Product Quality", brand.components.product_quality],
                      ["Transparency", brand.components.transparency],
                      ["Verification", brand.components.verification],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="text-[10px] text-muted w-24 flex-shrink-0">
                        {label}
                      </span>
                      <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(0, Math.min(100, value))}%`,
                            backgroundColor:
                              value >= 85
                                ? "#10B981"
                                : value >= 70
                                  ? "#3B82F6"
                                  : value >= 55
                                    ? "#F59E0B"
                                    : "#EF4444",
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-text font-semibold w-6 text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted">
                {lineup.length} {lineup.length === 1 ? "product" : "products"} scored ·{" "}
                overall {brand.score ?? "—"}/100
              </p>
              <Link
                href={`/brands/${brand.slug}`}
                className="inline-block text-xs text-accent hover:underline mt-3"
              >
                Full {brand.name} hub →
              </Link>
            </div>
          );
        })}
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">When to pick {a.name}</h2>
        <p className="text-sm text-muted leading-relaxed">{c.when_a}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-text mb-3">When to pick {b.name}</h2>
        <p className="text-sm text-muted leading-relaxed">{c.when_b}</p>
      </section>

      <section className="mb-10 rounded-2xl border border-accent/30 bg-accent/5 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
          Verdict
        </h2>
        <p className="text-sm text-text leading-relaxed">{c.verdict}</p>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Dig deeper
        </h2>
        <ul className="text-sm text-text space-y-2">
          <li>
            →{" "}
            <Link href={`/brands/${a.slug}`} className="hover:text-accent">
              {a.name}: full brand hub with product grid
            </Link>
          </li>
          <li>
            →{" "}
            <Link href={`/brands/${b.slug}`} className="hover:text-accent">
              {b.name}: full brand hub with product grid
            </Link>
          </li>
          <li>
            →{" "}
            <Link href="/brands" className="hover:text-accent">
              All supplement brands ranked by quality
            </Link>
          </li>
          <li>
            →{" "}
            <Link href="/methodology" className="hover:text-accent">
              How brand scoring works
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Scoring notes.</strong> Both brands are
        rated on Formulate&apos;s ingredient-level rubric aggregated across
        each brand&apos;s catalog. Grades reflect what the lineup actually
        delivers — not marketing claims or partnerships. Scores update as
        catalogs evolve.
      </p>
    </main>
  );
}
