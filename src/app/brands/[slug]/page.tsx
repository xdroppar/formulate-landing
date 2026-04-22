import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  brands,
  brandBySlug,
  brandCategoryBreakdown,
  productsForBrand,
  scoreGrade,
  thumbUrl,
} from "@/lib/products";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const b = brandBySlug(slug);
  if (!b) return { title: "Brand not found" };
  const count = productsForBrand(slug).length;
  const title = `${b.name} Supplements Review: Brand Grade ${b.grade ?? "—"}, ${count} Products Scored`;
  const description =
    `Formulate graded ${count} ${b.name} supplement${count === 1 ? "" : "s"} on ingredient quality, ` +
    `dose accuracy, and third-party testing. Brand grade: ${b.grade ?? "—"} (${b.score ?? "—"}/100).`;
  const url = `${BASE}/brands/${slug}`;
  return {
    title: `${title} — Formulate`,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: description.slice(0, 200),
      type: "website",
      url,
    },
  };
}

export default async function BrandHub({ params }: { params: Params }) {
  const { slug } = await params;
  const b = brandBySlug(slug);
  if (!b) notFound();

  const lineup = productsForBrand(slug);
  const breakdown = brandCategoryBreakdown(slug);
  const topPicks = lineup.slice(0, 6);
  const url = `${BASE}/brands/${slug}`;
  const bg = scoreGrade(b.score ?? b.avg_score ?? null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: b.name,
    url,
    description:
      `${b.name} is a supplement brand graded ${b.grade ?? "—"} by Formulate across ` +
      `${lineup.length} product${lineup.length === 1 ? "" : "s"}.`,
    aggregateRating:
      b.score !== null
        ? {
            "@type": "AggregateRating",
            ratingValue: b.score,
            bestRating: 100,
            ratingCount: lineup.length,
          }
        : undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Brands", item: `${BASE}/brands` },
      { "@type": "ListItem", position: 3, name: b.name, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/brands" className="hover:text-text transition-colors">
          Brands
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{b.name}</span>
      </nav>

      <header className="mb-10 flex items-start justify-between gap-6 flex-wrap">
        <div className="min-w-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-3">
            {b.name}
          </h1>
          <p className="text-muted text-base leading-relaxed max-w-2xl">
            {lineup.length} {lineup.length === 1 ? "product" : "products"} scored by
            Formulate&apos;s ingredient-level rubric. Brand grade reflects a weighted
            average across the full lineup.
          </p>
        </div>
        <div
          className="text-3xl font-bold px-5 py-3 rounded-xl flex-shrink-0"
          style={{ backgroundColor: `${bg.color}1a`, color: bg.color }}
        >
          {b.grade ?? bg.letter}
          {b.score !== null && (
            <div className="text-xs font-normal opacity-80 mt-1">{b.score}/100</div>
          )}
        </div>
      </header>

      {breakdown.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">What {b.name} makes</h2>
          <ul className="flex flex-wrap gap-2">
            {breakdown.map((row) => (
              <li
                key={row.category}
                className="text-sm text-muted bg-white/[0.03] border border-border rounded-full px-3 py-1"
              >
                <span className="text-text font-semibold">{row.count}</span> {row.category}
              </li>
            ))}
          </ul>
        </section>
      )}

      {topPicks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">Top-scoring products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPicks.map((p) => {
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
                    <div className="text-sm font-semibold text-text leading-snug line-clamp-2">
                      {p.name}
                    </div>
                  </div>
                  <div
                    className="text-sm font-bold px-2.5 py-1 rounded flex-shrink-0"
                    style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                  >
                    {p.score}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {lineup.length > topPicks.length && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-4">
            All {b.name} products ({lineup.length})
          </h2>
          <ul className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {lineup.map((p) => {
              const g = scoreGrade(p.score);
              return (
                <li key={p.slug}>
                  <Link
                    href={`/supplements/${p.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-text line-clamp-1">{p.name}</span>
                      <span className="text-xs text-muted">{p.category}</span>
                    </div>
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

      <section className="rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          About the grading
        </h2>
        <p className="text-sm text-text leading-relaxed">
          Every {b.name} product above is scored on dose accuracy, ingredient form,
          certifications, transparency, and third-party testing. The brand grade
          aggregates those product scores — it isn&apos;t a marketing claim or a pay-for-play
          ranking. See the{" "}
          <Link href="/methodology" className="text-accent hover:underline">
            methodology page
          </Link>{" "}
          for the full rubric.
        </p>
      </section>
    </main>
  );
}
