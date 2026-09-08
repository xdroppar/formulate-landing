import type { Metadata } from "next";
import Link from "next/link";
import { withUtm } from "@/lib/app-url";
import { products } from "@/lib/products";
import { SCORE_TIER_BANDS } from "@/lib/score-tier-color";
import { PageHeader, SectionHeader } from "@/components/landing/page-header";

/** Lowest score actually in the catalog. Derived, not written down: a
 *  hardcoded figure here becomes wrong the next time the catalog is synced. */
const LOWEST_SCORE = Math.min(
  ...products.map((p) => p.score).filter((s): s is number => typeof s === "number"),
);

export const metadata: Metadata = {
  title: "Supplement Scoring Methodology — How Formulate Scores Supplements",
  description:
    "How every supplement is scored: evidence, manufacturing, dose, bioavailability, transparency, and safety. No sponsorships, just data.",
  alternates: { canonical: "https://formulate-health.app/methodology/supplements" },
  openGraph: {
    title: "How Formulate Scores Supplements",
    description:
      "Every supplement scored 50–100: three weighted factors, three gates. Transparent, evidence-based, no sponsorships.",
    type: "article",
  },
};

/**
 * Corrected 2026-09-08 against the shipped catalog.
 *
 * This table published 25/20/20/15/10/10 across six weighted factors. Measured
 * over all 303 scored products at score_version 3.23/3.24, the engine runs
 * Evidence 40 / Dose 35 / Form 25, and Manufacturing, Transparency and Safety
 * carry weight ZERO in 303 of 303 — V3.23 turned them into gates that deduct
 * rather than contribute (23 products carry a score_gate_penalty).
 *
 * This is the page whose whole claim is that the weights are public, so it was
 * the worst place on the site for the number to be wrong. The homepage and
 * /supplements were corrected first; this is the third and last copy.
 *
 * `weighted: false` renders as a gate rather than a percentage — the word
 * "gate" is our vocabulary and reads as a missing value, so the grouping does
 * the explaining instead.
 */
const FACTORS = [
  {
    weight: "40%",
    weighted: true,
    name: "Clinical Evidence",
    desc: "Quality and quantity of peer-reviewed human research supporting the ingredient, its dose, and its claimed outcome. Meta-analyses and RCTs score higher than animal studies or anecdote.",
  },
  {
    weight: "35%",
    weighted: true,
    name: "Dose Accuracy",
    desc: "Does the serving actually match the evidence-based range for the claimed benefit? Underdosed and overdosed products both lose points. Thresholds come from position stands where they exist — creatine is scored against 3–5 g/day, not against whatever the label rounds to.",
    cite: "ISSN position stand, Kreider 2017",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/",
  },
  {
    weight: "25%",
    weighted: true,
    name: "Bioavailability",
    desc: "Form, chelation, and delivery method. Magnesium citrate is measurably better absorbed than magnesium oxide, and the two are not scored alike. Not every form difference is this well established — glycinate versus oxide is genuinely mixed in the literature — so forms are scored on the strength of their own evidence rather than on marketing.",
    cite: "Lindberg, J Am Coll Nutr 1990",
    href: "https://pubmed.ncbi.nlm.nih.gov/2407766/",
  },
  {
    weight: "",
    weighted: false,
    name: "Manufacturing Quality",
    desc: "Third-party certifications (NSF, USP, Informed Sport), facility audits, and batch-level testing. A product is only as good as its factory. Checked separately: it can cost a product points, never add them.",
  },
  {
    weight: "",
    weighted: false,
    name: "Label Transparency",
    desc: "Full ingredient disclosure, no proprietary blends hiding doses, verified COAs on request. If a brand won't tell you what's in it, we penalize it.",
  },
  {
    weight: "",
    weighted: false,
    name: "Safety Profile",
    desc: "Known interactions, contraindications, heavy-metal testing, and exposure to fillers or allergens. A supplement that works but hurts still loses points.",
  },
];


/**
 * Derived from the app's own band table rather than restated.
 *
 * This page documented FIVE bands — Exceptional / Strong / Decent / Below
 * Average / Weak — while the product ships FOUR. A 65 read "Solid" in the app
 * and "Below Average" on the page explaining the app. The 70-79 band was folded
 * into Solid deliberately (the grade words a reader sees break at 60/80/90, so
 * the colours break there too); this page still described the pre-fold scale.
 *
 * Only the prose lives here now. The range, the word and the colour come from
 * the shared table, so they cannot drift again.
 */
const BAND_NOTES: Record<string, string> = {
  Elite: "Best-in-class on every factor. Evidence-backed, rigorously manufactured, transparent.",
  Strong: "Solid across the board with minor gaps. Safe default choices.",
  Solid: "Works, but has room to improve — often a weaker form, a lighter dose, or less transparency.",
  Building: "Real concerns: wrong form, low dose, or a poor manufacturing track record. Consider alternatives.",
};

const SCORE_BANDS = SCORE_TIER_BANDS.map((b) => ({
  range: b.range,
  label: b.word,
  color: b.color,
  desc: BAND_NOTES[b.word] ?? "",
}));


const FAQS = [
  {
    q: "Why doesn't anything score below 50?",
    a: `Because 50 is a hard floor in the scoring itself, not a screening outcome. Two things put a product there: having too little information to score, and hiding its doses — if more than half the scorable ingredients don't disclose an amount, which is what a proprietary blend does, the score is capped at 50 no matter how the other factors came out. So a 50 means the label didn't tell us enough, not that we assessed the product and judged it weak. No product currently in the catalog sits at the floor; the lowest is ${LOWEST_SCORE}.`,
  },
  {
    q: "Is price part of the score?",
    a: "No. Cost-efficiency is calculated and shown, but it is deliberately kept out of the product score, so an expensive well-made supplement and a cheap well-made one score the same on quality. Price is information for you to weigh, not a thumb on the scale.",
  },
  {
    q: "Do brands pay to be on Formulate?",
    a: "No. We do not accept payment to list, rank, or feature any product. We may earn affiliate commissions from qualifying purchases through outbound links, but this does not affect scoring. The same algorithm runs on every product in the catalog.",
  },
  {
    q: "How often are scores updated?",
    a: "Ingredient evidence is re-evaluated quarterly based on new meta-analyses and clinical trials. Product-specific data (formulation changes, new certifications, recalls) triggers an immediate rescore when detected.",
  },
  {
    q: "Why does one supplement score higher than another with identical ingredients?",
    a: "Two products can have the same active ingredients but very different scores because of form (e.g., magnesium glycinate vs oxide), dose accuracy, third-party testing, and manufacturing transparency. Our methodology weighs these explicitly.",
  },
  {
    q: "Can I see the raw scoring data?",
    a: "Yes. Every product page shows the full score breakdown by factor, the specific evidence tier for each claimed benefit, and the reasoning behind dose and form scores. Full transparency is non-negotiable.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://formulate-health.app/methodology/supplements",
      url: "https://formulate-health.app/methodology/supplements",
      name: "How Formulate Scores Supplements",
      description:
        "How every supplement is scored: evidence, manufacturing, dose, bioavailability, transparency, and safety.",
      isPartOf: { "@id": "https://formulate-health.app/#website" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://formulate-health.app" },
        { "@type": "ListItem", position: 2, name: "Methodology", item: "https://formulate-health.app/methodology" },
        { "@type": "ListItem", position: 3, name: "Supplements", item: "https://formulate-health.app/methodology/supplements" },
      ],
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

export default function SupplementMethodologyPage() {
  return (
    <div id="main-content" className="pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[820px] mx-auto">
        <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-text transition-colors">Home</Link>
          <span>/</span>
          <Link href="/methodology" className="hover:text-text transition-colors">Methodology</Link>
          <span>/</span>
          <span className="text-text/60">Supplements</span>
        </nav>

        <PageHeader
          eyebrow="Supplement scoring"
          title="How every supplement is scored"
          lead="Formulate scores are deterministic and transparent. The same algorithm runs on every product, the weights are public, and the evidence base is versioned. No sponsorships, no editorial favoritism."
        />

        <section className="mb-14">
          <SectionHeader
            title="What the score is made of"
            description="Three factors carry the score. The other three are checked separately and can only cost a product points, never add them."
          />
          <div className="space-y-3">
            {FACTORS.map((p) => (
              <div key={p.name} className="flex items-start gap-4 p-5 rounded-xl bg-surface border border-border">
                <div className="shrink-0 w-20 text-center">
                  {p.weighted ? (
                    <div className="fm-figure text-accent">{p.weight}</div>
                  ) : (
                    // No number, because there is no number — an empty slot
                    // where the other rows show a percentage reads as a value
                    // that failed to load.
                    <div className="text-[12px] text-muted leading-tight">
                      checked
                      <br />
                      separately
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-text mb-1">{p.name}</div>
                  <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                  {p.cite && p.href && (
                    <a
                      href={p.href}
                      rel="noopener"
                      className="inline-block mt-2 text-xs font-mono text-accent hover:underline"
                    >
                      {p.cite} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="What the score means" />
          <div className="rounded-xl bg-surface border border-border p-5 space-y-3">
            {SCORE_BANDS.map((b) => (
              <div key={b.range} className="flex items-start gap-4">
                <div className="shrink-0 w-24">
                  <div className="font-mono font-bold text-[12px]" style={{ color: b.color }}>{b.range}</div>
                  <div className="text-[12px] font-semibold" style={{ color: b.color }}>{b.label}</div>
                </div>
                <p className="text-sm text-muted leading-relaxed flex-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionHeader title="Frequently asked questions" />
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="p-5 rounded-xl bg-surface border border-border">
                <h3 className="text-sm font-bold text-text mb-2">{f.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="p-8 rounded-2xl bg-surface border border-accent/20 text-center">
          <h3 className="text-lg font-bold mb-2">See it in action</h3>
          <p className="text-sm text-muted mb-5 max-w-[440px] mx-auto">
            Every product page shows the full factor breakdown, the evidence tier for each claim, and the exact reasoning behind the number.
          </p>
          <a
            href={withUtm("https://app.formulate-health.app/catalog", {
              source: "landing",
              campaign: "methodology_supplements_cta",
            })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
          >
            Browse scored supplements →
          </a>
        </div>
      </div>
    </div>
  );
}
