import type { Metadata } from "next";
import Link from "next/link";
import { withUtm } from "@/lib/app-url";
import { PILLARS } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Methodology — How Formulate Scores Everything",
  description:
    "One transparent, evidence-based scoring engine for every domain of your health — supplements, foods, and nutrients today, with sleep, fitness and personal care coming. No sponsorships, just data.",
  alternates: { canonical: "https://formulate-health.app/methodology" },
  openGraph: {
    title: "How Formulate Scores Everything — Methodology",
    description:
      "Transparent, evidence-based scoring across every domain of your health. No sponsorships, no editorial favoritism.",
    type: "article",
  },
};

const PRINCIPLES = [
  {
    title: "Deterministic, not editorial",
    desc: "The same algorithm runs on every item. Two people running it get the same number — scores come from data and published weights, not opinion.",
  },
  {
    title: "No sponsorships, ever",
    desc: "No brand can pay to be listed, ranked, or featured. Affiliate links may earn a commission on purchases, but they never touch a score.",
  },
  {
    title: "Evidence-based & versioned",
    desc: "Scores are built on peer-reviewed research and reference data. The evidence base is versioned and re-evaluated as new studies land.",
  },
  {
    title: "Fully transparent",
    desc: "Every score breaks down into its components — you can always see exactly why something scored what it did.",
  },
];

const FAQS = [
  {
    q: "Do brands pay to be on Formulate?",
    a: "No. We do not accept payment to list, rank, or feature any product in any domain. We may earn affiliate commissions from qualifying purchases through outbound links, but this never affects scoring — the same algorithm runs on every item.",
  },
  {
    q: "Why score different domains separately?",
    a: "A supplement, a food, and your daily nutrient coverage are fundamentally different questions, so each has its own purpose-built methodology. What they share is the philosophy: transparent, evidence-based, and independent.",
  },
  {
    q: "What's coming next?",
    a: "Sleep, fitness, and personal care are in development — each will get the same transparent, evidence-based treatment. The framework is already here; we add a pillar when its scoring is rigorous enough to ship.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://formulate-health.app/methodology",
      url: "https://formulate-health.app/methodology",
      name: "How Formulate Scores Everything — Methodology",
      description:
        "One transparent, evidence-based scoring engine across every domain of your health.",
      isPartOf: { "@id": "https://formulate-health.app/#website" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function MethodologyHubPage() {
  return (
    <div id="main-content" className="pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[900px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-text transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-text/60">Methodology</span>
        </nav>

        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">How We Score</div>
        <h1 className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-1px] leading-[1.12] mb-4 max-w-[720px]">
          One transparent engine for everything you put in your body
        </h1>
        <p className="text-base text-muted leading-relaxed mb-12 max-w-[660px]">
          Formulate scores every domain of your health with the same principles —
          deterministic, evidence-based, and independent. Each domain has its own
          purpose-built methodology. Three are live today; three more are on the way.
        </p>

        {/* Pillars */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6">The pillars we score</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILLARS.map((p) => {
              const live = p.status === "live";
              const inner = (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-xl">
                      {p.icon}
                    </div>
                    {live ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Live</span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted/60 px-2 py-0.5 rounded-full border border-border">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <div className="text-base font-bold text-text mb-1">{p.title}</div>
                  <p className="text-sm text-muted leading-relaxed">{p.tagline}</p>
                  {live && (
                    <div className="mt-4 text-sm font-semibold text-accent inline-flex items-center gap-1.5">
                      How we score it →
                    </div>
                  )}
                </>
              );
              return live ? (
                <Link
                  key={p.slug}
                  href={`/methodology/${p.slug}`}
                  className="group bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 hover:-translate-y-1 transition-all"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={p.slug}
                  className="bg-surface/50 border border-border rounded-2xl p-6 opacity-70"
                  aria-disabled="true"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        {/* Shared principles */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6">The principles behind every score</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((pr) => (
              <div key={pr.title} className="p-5 rounded-xl bg-surface border border-border">
                <div className="text-sm font-bold text-text mb-2">{pr.title}</div>
                <p className="text-sm text-muted leading-relaxed">{pr.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="p-5 rounded-xl bg-surface border border-border">
                <h3 className="text-sm font-bold text-text mb-2">{f.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-surface border border-accent/20 text-center">
          <h3 className="text-lg font-bold mb-2">See it in action</h3>
          <p className="text-sm text-muted mb-5 max-w-[440px] mx-auto">
            Every product, food, and nutrient in the app shows its full score
            breakdown — free, no account needed to browse.
          </p>
          <a
            href={withUtm("https://app.formulate-health.app", {
              source: "landing",
              campaign: "methodology_hub_cta",
            })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
          >
            Open the app →
          </a>
        </div>
      </div>
    </div>
  );
}
