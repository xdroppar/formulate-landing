import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { listThumb } from "@/lib/thumbs";
import {
  sleepCategories,
  sleepCategoryBySlug,
  sleepPriceLabel,
  makerLink,
  BEST_LIMIT,
  type SleepProduct,
} from "@/lib/sleep";
import { amazonLinkFor } from "@/lib/amazon";
import { withUtm } from "@/lib/app-url";
import { ScoreMeter } from "@/components/score-meter";
import { SleepBuyLinks } from "@/components/sleep-buy-links";

const BASE = "https://formulate-health.app";

export function generateStaticParams() {
  return sleepCategories.map((c) => ({ category: c.slug }));
}

type Params = Promise<{ category: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category: slug } = await params;
  const c = sleepCategoryBySlug(slug);
  if (!c) return { title: "Not found" };
  const top = c.peers[0].products[0];
  const title = `Best ${c.name}: ${c.products.length} Compared on What Makers Declare`;
  const description =
    `${c.products.length} ${c.name.toLowerCase()} scored only against their own kind, on the materials, support, cooling and certifications their makers state. ` +
    `Top: ${top.brand} ${top.name} (${top.quality}/100).`;
  const url = `${BASE}/sleep/best/${slug}`;
  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title, description: description.slice(0, 200), type: "article", url },
  };
}

function Row({ p, i, source }: { p: SleepProduct; i: number; source: string }) {
  const price = sleepPriceLabel(p);
  return (
    <li className="rounded-xl border border-border bg-white/[0.02] p-4">
      <div className="flex flex-wrap sm:flex-nowrap items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 w-6 sm:w-7 text-center text-lg font-extrabold text-muted pt-1">{i + 1}</div>
        {p.image_url ? (
          <div className="relative w-16 h-16 rounded-lg bg-white/[0.02] overflow-hidden flex-shrink-0">
            <Image src={listThumb(p.image_url)} alt="" fill sizes="64px" className="object-contain p-1" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-lg bg-white/[0.02] border border-border flex-shrink-0" />
        )}
        <div className="basis-full sm:basis-auto sm:flex-1 min-w-0 order-last sm:order-none">
          <div className="text-xs text-muted mb-0.5">
            {p.brand}
            {price && <span className="ml-2">{price}</span>}
          </div>
          <div className="text-sm font-bold text-text leading-snug mb-1">{p.name}</div>
          {p.attributes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {p.attributes.slice(0, 4).map((a) => (
                <span key={a} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
                  {a}
                </span>
              ))}
            </div>
          )}
          {p.cautions.length > 0 && (
            <p className="text-xs text-orange-400 mb-2">{p.cautions.join(" · ")}</p>
          )}
          <SleepBuyLinks
            productId={p.id}
            amazonUrl={withUtm(amazonLinkFor(p), { source: "landing", campaign: "sleep_best", content: p.id })}
            maker={makerLink(p)}
            source={source}
          />
        </div>
        <div className="ml-auto sm:ml-0 flex flex-col items-center gap-1 flex-shrink-0">
          <ScoreMeter score={p.quality} size={48} strokeWidth={4} />
          <span className="text-xs font-bold text-muted">{p.grade}</span>
        </div>
      </div>
    </li>
  );
}

export default async function SleepBestPage({ params }: { params: Params }) {
  const { category: slug } = await params;
  const c = sleepCategoryBySlug(slug);
  if (!c) notFound();

  const url = `${BASE}/sleep/best/${slug}`;
  const lower = c.name.toLowerCase();
  const split = c.peers.length > 1;
  const top = c.peers[0].products[0];
  const source = `landing_sleep_best:${slug}`;

  const faqs = [
    {
      q: `What are the best ${lower}?`,
      a: `${top.brand} ${top.name} scores highest of the ${c.peers[0].products.length} ${c.peers[0].label} we compared, at ${top.quality}/100 (grade ${top.grade}).${
        split ? ` ${c.name} are compared in ${c.peers.length} separate groups — ${c.peers.map((s) => s.label).join(" and ")} — because they are different products.` : ""
      }`,
    },
    {
      q: `How are these ${lower} scored?`,
      a: `On declared quality: what each maker states about materials, support, cooling, function, certification and durability, weighted for this kind of product and compared only with the same kind. It is not a lab test. Products that state too little to grade are not ranked.`,
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
      { "@type": "ListItem", position: 2, name: "Sleep", item: `${BASE}/sleep` },
      { "@type": "ListItem", position: 3, name: `Best ${c.name}`, item: url },
    ],
  };
  const others = sleepCategories.filter((x) => x.slug !== slug);

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/sleep" className="hover:text-text transition-colors">
          Sleep
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">Best {c.name}</span>
      </nav>

      <header className="mb-8">
        <p className="fm-eyebrow text-accent mb-3">Compared like with like</p>
        <h1 className="fm-display text-[clamp(26px,3.5vw,var(--text-h-argument))] text-text mb-4">Best {c.name}</h1>
        <p className="text-base text-muted leading-relaxed">
          {c.products.length} {lower} scored on what their makers declare — materials, support, cooling,
          certifications — and compared only with {split ? "their own kind" : `other ${c.peers[0].label}`}. No brand pays
          to be here.
        </p>
      </header>

      {c.peers.map((peer) => (
        <section key={peer.label} className="mb-10">
          {split && (
            <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4 capitalize">
              {peer.label}
            </h2>
          )}
          <ol className="space-y-3">
            {peer.products.slice(0, BEST_LIMIT).map((p, i) => (
              <Row key={p.id} p={p} i={i} source={source} />
            ))}
          </ol>
          {peer.products.length > BEST_LIMIT && (
            <p className="text-sm text-muted mt-3">
              {peer.products.length - BEST_LIMIT} more {peer.label} are scored in the{" "}
              <a
                href={withUtm("https://app.formulate-health.app/sleep", { source: "landing", campaign: "sleep_best", content: slug })}
                className="text-accent hover:underline"
              >
                Formulate app
              </a>
              .
            </p>
          )}
        </section>
      ))}

      <section className="mb-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="fm-eyebrow mb-3">What the score means</h2>
        <p className="text-sm text-muted leading-relaxed">
          Declared quality: built from what each maker states about materials, thermal behaviour, support, function,
          certification and durability, weighted for {lower}. It rewards products that say specifically what they are
          and what they are made of. It is not a lab test, and a product whose maker states too little to grade is not
          ranked rather than ranked low. Scores compare {split ? "each group" : `${c.peers[0].label}`} only with itself —
          never a mattress with a pair of earplugs.
        </p>
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

      <section className="mb-10">
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">More sleep gear</h2>
        <div className="flex flex-wrap gap-2">
          {others.map((x) => (
            <Link
              key={x.slug}
              href={`/sleep/best/${x.slug}`}
              className="inline-flex items-center rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-text hover:border-accent/40 transition-colors"
            >
              {x.name}
            </Link>
          ))}
        </div>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Scores rate what a product declares, not how it will suit you.</strong> Persistent
        sleep problems are worth raising with a clinician. Some links are affiliate links; they never affect a score.
      </p>
    </main>
  );
}
