import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  skinTypes,
  skinTypeBySlug,
  skinBrandFor,
  whyLine,
  priceLabel,
  retailerFor,
  BEST_LIMIT,
  SAFETY_FLOOR,
  APP_SKIN_URL,
  type SkinProduct,
} from "@/lib/skincare";
import { amazonLinkFor } from "@/lib/amazon";
import { withUtm } from "@/lib/app-url";
import { ScoreMeter } from "@/components/score-meter";
import { SkincareBuyLinks } from "@/components/skincare-buy-links";

const BASE = "https://formulate-health.app";

export function generateStaticParams() {
  return skinTypes.map((t) => ({ type: t.slug }));
}

type Params = Promise<{ type: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { type: slug } = await params;
  const t = skinTypeBySlug(slug);
  if (!t) return { title: "Not found" };
  const top = t.products.slice(0, BEST_LIMIT);
  const title = `Best ${t.plural}: Top ${top.length} Ranked by Ingredients`;
  const description =
    `The ${top.length} highest-scoring ${t.plural.toLowerCase()} of ${t.products.length} we scored, ranked on their actives, disclosed concentrations and research, with irritants and fragrance checked separately. ` +
    `Top pick: ${top[0].name} (${top[0].score}/100).`;
  const url = `${BASE}/skincare/best/${slug}`;
  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title, description: description.slice(0, 200), type: "article", url },
  };
}

function Row({ p, i, source }: { p: SkinProduct; i: number; source: string }) {
  const brand = skinBrandFor(p);
  const price = priceLabel(p);
  return (
    <li className="rounded-xl border border-border bg-white/[0.02] p-4">
      <div className="flex flex-wrap sm:flex-nowrap items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 w-6 sm:w-7 text-center text-lg font-extrabold text-muted pt-1">{i + 1}</div>
        {p.image_url ? (
          <div className="relative w-16 h-16 rounded-lg bg-white/[0.02] overflow-hidden flex-shrink-0">
            <Image src={p.image_url} alt="" fill sizes="64px" className="object-contain p-1" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-lg bg-white/[0.02] border border-border flex-shrink-0" />
        )}
        <div className="basis-full sm:basis-auto sm:flex-1 min-w-0 order-last sm:order-none">
          <div className="text-xs text-muted mb-0.5">
            {brand ? (
              <Link href={`/skincare/brands/${brand.slug}`} className="hover:text-text transition-colors">
                {p.brand}
              </Link>
            ) : (
              p.brand
            )}
            {price && <span className="ml-2">{price}</span>}
          </div>
          <div className="text-sm font-bold text-text leading-snug mb-1">{p.name}</div>
          <p className="text-xs text-muted leading-relaxed mb-2">{whyLine(p)}</p>
          {p.actives.length > 0 && (
            <p className="text-xs text-muted mb-2">
              <span className="text-text">Actives:</span> {p.actives.slice(0, 5).join(", ")}
            </p>
          )}
          <SkincareBuyLinks
            productId={p.id}
            amazonUrl={withUtm(amazonLinkFor(p), { source: "landing", campaign: "skincare_best", content: p.id })}
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
}

export default async function SkincareBestPage({ params }: { params: Params }) {
  const { type: slug } = await params;
  const t = skinTypeBySlug(slug);
  if (!t) notFound();

  const top = t.products.slice(0, BEST_LIMIT);
  const url = `${BASE}/skincare/best/${slug}`;
  const lower = t.plural.toLowerCase();
  const best = top[0];
  const fragranceFree = t.products.filter((p) => !p.flags.fragrance_present).length;
  const docked = t.products.filter((p) => p.safety_score < SAFETY_FLOOR).length;

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${t.plural}`,
    url,
    numberOfItems: top.length,
    itemListElement: top.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p.brand} ${p.name}` })),
  };

  const faqs = [
    {
      q: `What is the best ${t.singular}?`,
      a: `${best.name} by ${best.brand} scores highest of the ${t.products.length} ${lower} Formulate has scored, at ${best.score}/100 (grade ${best.grade}). ${whyLine(best)}.`,
    },
    {
      q: `How are these ${lower} ranked?`,
      a: `Each product is scored out of 100 on its formula: how well-researched its actives are, whether the label discloses their concentration, the research behind them, and how complete and well-built the formula is. Safety is checked separately — irritants, fragrance, EU-listed allergens, endocrine concerns and pore-clogging ingredients — and only costs points when it falls below ${SAFETY_FLOOR}. No brand pays to be listed.`,
    },
    {
      q: `Are these ${lower} fragrance-free?`,
      a: `${fragranceFree} of the ${t.products.length} ${lower} scored contain no synthetic fragrance. ${docked === 0 ? "None" : docked} lost points on the safety check.`,
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
      { "@type": "ListItem", position: 3, name: `Best ${t.plural}`, item: url },
    ],
  };

  const otherTypes = skinTypes.filter((x) => x.slug !== slug);
  const source = `landing_skincare_best:${slug}`;

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/skincare" className="hover:text-text transition-colors">
          Skincare
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Best {t.plural}</span>
      </nav>

      <header className="mb-8">
        <p className="fm-eyebrow text-accent mb-3">Ranked by ingredients</p>
        <h1 className="fm-display text-[clamp(26px,3.5vw,var(--text-h-argument))] text-text mb-4">Best {t.plural}</h1>
        <p className="text-base text-muted leading-relaxed">
          The {top.length} highest-scoring of the {t.products.length} {lower} we scored, ranked on what is in
          the bottle rather than what is on it. Every score comes from the product&apos;s own ingredient list;
          no brand pays to be here.
        </p>
      </header>

      <section className="mb-10">
        <ol className="space-y-3">
          {top.map((p, i) => (
            <Row key={p.id} p={p} i={i} source={source} />
          ))}
        </ol>
        {t.products.length > top.length && (
          <p className="text-sm text-muted mt-4">
            {t.products.length - top.length} more {lower} are scored in the{" "}
            <a
              href={withUtm(APP_SKIN_URL, { source: "landing", campaign: "skincare_best", content: slug })}
              className="text-accent hover:underline"
            >
              Formulate app
            </a>
            .
          </p>
        )}
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

      {otherTypes.length > 0 && (
        <section className="mb-10">
          <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">Best skincare by type</h2>
          <div className="flex flex-wrap gap-2">
            {otherTypes.map((x) => (
              <Link
                key={x.slug}
                href={`/skincare/best/${x.slug}`}
                className="inline-flex items-center rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-text hover:border-accent/40 transition-colors"
              >
                Best {x.plural}
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Educational only.</strong> Scores rate a product&apos;s formula, not how it
        will suit your skin. Patch-test new products, and see a dermatologist for persistent skin conditions.
        Some links are affiliate links; they never affect a score.
      </p>
    </main>
  );
}
