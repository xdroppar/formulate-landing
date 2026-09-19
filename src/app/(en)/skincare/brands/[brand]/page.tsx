import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { listThumb } from "@/lib/thumbs";
import {
  skinBrands,
  skinBrandBySlug,
  skinTypeFor,
  rankInType,
  whyLine,
  priceLabel,
  retailerFor,
  SAFETY_FLOOR,
} from "@/lib/skincare";
import { amazonLinkFor } from "@/lib/amazon";
import { withUtm } from "@/lib/app-url";
import { ScoreMeter } from "@/components/score-meter";
import { SkincareBuyLinks } from "@/components/skincare-buy-links";

const BASE = "https://formulate-health.app";

export function generateStaticParams() {
  return skinBrands.map((b) => ({ brand: b.slug }));
}

type Params = Promise<{ brand: string }>;

function average(ns: number[]): number {
  return Math.round(ns.reduce((a, b) => a + b, 0) / ns.length);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brand: slug } = await params;
  const b = skinBrandBySlug(slug);
  if (!b) return { title: "Not found" };
  const top = b.products[0];
  const title = `Is ${b.name} Good? ${b.products.length} Products Scored by Ingredients`;
  const description =
    `${b.products.length} ${b.name} skincare products scored on their actives and checked for irritants and fragrance. ` +
    `Average ${average(b.products.map((p) => p.score))}/100; best: ${top.name} (${top.score}/100).`;
  const url = `${BASE}/skincare/brands/${slug}`;
  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title, description: description.slice(0, 200), type: "article", url },
  };
}

export default async function SkinBrandPage({ params }: { params: Params }) {
  const { brand: slug } = await params;
  const b = skinBrandBySlug(slug);
  if (!b) notFound();

  const url = `${BASE}/skincare/brands/${slug}`;
  const avg = average(b.products.map((p) => p.score));
  const fragranceFree = b.products.filter((p) => !p.flags.fragrance_present).length;
  const docked = b.products.filter((p) => p.safety_score < SAFETY_FLOOR).length;
  const leaders = b.products
    .map((p) => ({ p, rank: rankInType(p), type: skinTypeFor(p) }))
    .filter((x) => x.rank !== null && x.rank <= 10 && x.type);
  const source = `landing_skincare_brand:${slug}`;

  const faqs = [
    {
      q: `Is ${b.name} a good skincare brand?`,
      a: `Formulate scored ${b.products.length} ${b.name} products. They average ${avg}/100, from ${b.products[b.products.length - 1].score} to ${b.products[0].score}. ${fragranceFree} of ${b.products.length} contain no synthetic fragrance, and ${docked === 0 ? "none" : docked} lost points on the safety check.`,
    },
    {
      q: `What is the best ${b.name} product?`,
      a: `${b.products[0].name} scores highest at ${b.products[0].score}/100 (grade ${b.products[0].grade}). ${whyLine(b.products[0])}.`,
    },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Skincare", item: `${BASE}/skincare` },
      { "@type": "ListItem", position: 3, name: b.name, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/skincare" className="hover:text-text transition-colors">
          Skincare
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{b.name}</span>
      </nav>

      <header className="mb-8 flex items-start justify-between gap-6">
        <div>
          <p className="fm-eyebrow text-accent mb-3">Skincare brand</p>
          <h1 className="fm-display text-[clamp(26px,3.5vw,var(--text-h-argument))] text-text mb-4">{b.name}</h1>
          <p className="text-base text-muted leading-relaxed">
            {b.products.length} products scored on their ingredients. Average {avg}/100;{" "}
            {fragranceFree} of {b.products.length} fragrance-free.
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <ScoreMeter score={avg} size={72} strokeWidth={6} />
          <span className="text-xs text-muted">average</span>
        </div>
      </header>

      {leaders.length > 0 && (
        <section className="mb-8">
          <h2 className="fm-eyebrow mb-3">In the top 10 of its type</h2>
          <div className="flex flex-wrap gap-2">
            {leaders.map(({ p, rank, type }) => (
              <Link
                key={p.id}
                href={`/skincare/best/${type!.slug}`}
                className="inline-flex items-center rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-text hover:border-accent/40 transition-colors"
              >
                #{rank} {type!.plural.toLowerCase()}: {p.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <ol className="space-y-3">
          {b.products.map((p) => {
            const type = skinTypeFor(p);
            const price = priceLabel(p);
            return (
              <li key={p.id} className="rounded-xl border border-border bg-white/[0.02] p-4">
                <div className="flex flex-wrap sm:flex-nowrap items-start gap-3 sm:gap-4">
                  {p.image_url ? (
                    <div className="relative w-16 h-16 rounded-lg bg-white/[0.02] overflow-hidden flex-shrink-0">
                      <Image src={listThumb(p.image_url)} alt="" fill sizes="64px" className="object-contain p-1" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-white/[0.02] border border-border flex-shrink-0" />
                  )}
                  <div className="basis-full sm:basis-auto sm:flex-1 min-w-0 order-last sm:order-none">
                    <div className="text-xs text-muted mb-0.5">
                      {type ? type.singular : p.subcategory.replace(/_/g, " ")}
                      {price && <span className="ml-2">{price}</span>}
                    </div>
                    <div className="text-sm font-bold text-text leading-snug mb-1">{p.name}</div>
                    <p className="text-xs text-muted leading-relaxed mb-2">{whyLine(p)}</p>
                    <SkincareBuyLinks
                      productId={p.id}
                      amazonUrl={withUtm(amazonLinkFor(p), { source: "landing", campaign: "skincare_brand", content: p.id })}
                      retailer={retailerFor(p)}
                      source={source}
                    />
                  </div>
                  <div className="ml-auto sm:ml-0 flex flex-col items-center gap-1 flex-shrink-0">
                    <ScoreMeter score={p.score} size={48} strokeWidth={4} color={p.grade_color} />
                    <span className="text-xs font-bold" style={{ color: p.grade_color }}>
                      {p.grade}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">Frequently asked questions</h2>
        <div className="space-y-5">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-sm font-semibold text-text mb-1.5">{f.q}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Educational only.</strong> Scores rate a product&apos;s formula, not how it
        will suit your skin. Some links are affiliate links; they never affect a score.
      </p>
    </main>
  );
}
