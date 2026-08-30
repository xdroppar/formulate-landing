import type { Metadata } from "next";
import Link from "next/link";
import { withUtm } from "@/lib/app-url";
import { products } from "@/lib/products";

/** Lowest score actually in the catalog. Derived, not written down: a
 *  hardcoded figure here becomes wrong the next time the catalog is synced. */
const LOWEST_SCORE = Math.min(
  ...products.map((p) => p.score).filter((s): s is number => typeof s === "number"),
);

export const metadata: Metadata = {
  title: "Supplement Scoring Methodology — How Formulate Scores Supplements",
  description:
    "Every supplement scored 50–100 across six factors: evidence, manufacturing, dose, bioavailability, transparency, and safety. No sponsorships, just data.",
  alternates: { canonical: "https://formulate-health.app/methodology/supplements" },
  openGraph: {
    title: "How Formulate Scores Supplements",
    description:
      "Every supplement scored 50–100 across six factors. Transparent, evidence-based, no sponsorships.",
    type: "article",
  },
};

const FACTORS = [
  {
    weight: "25%",
    color: "text-green-400",
    name: "Clinical Evidence",
    desc: "Quality and quantity of peer-reviewed human research supporting the ingredient, its dose, and its claimed outcome. Meta-analyses and RCTs score higher than animal studies or anecdote.",
  },
  {
    weight: "20%",
    color: "text-blue-400",
    name: "Manufacturing Quality",
    desc: "Third-party certifications (NSF, USP, Informed Sport), facility audits, and batch-level testing. A product is only as good as its factory.",
  },
  {
    weight: "20%",
    color: "text-cyan-400",
    name: "Dose Accuracy",
    desc: "Does the serving actually match the evidence-based range for the claimed benefit? Underdosed and overdosed products both lose points. Thresholds come from position stands where they exist — creatine is scored against 3–5 g/day, not against whatever the label rounds to.",
    cite: "ISSN position stand, Kreider 2017",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/",
  },
  {
    weight: "15%",
    color: "text-amber-400",
    name: "Bioavailability",
    desc: "Form, chelation, and delivery method. Magnesium citrate is measurably better absorbed than magnesium oxide, and the two are not scored alike. Not every form difference is this well established — glycinate versus oxide is genuinely mixed in the literature — so forms are scored on the strength of their own evidence rather than on marketing.",
    cite: "Lindberg, J Am Coll Nutr 1990",
    href: "https://pubmed.ncbi.nlm.nih.gov/2407766/",
  },
  {
    weight: "10%",
    color: "text-purple-400",
    name: "Label Transparency",
    desc: "Full ingredient disclosure, no proprietary blends hiding doses, verified COAs on request. If a brand won't tell you what's in it, we penalize it.",
  },
  {
    weight: "10%",
    color: "text-red-400",
    name: "Safety Profile",
    desc: "Known interactions, contraindications, heavy-metal testing, and exposure to fillers or allergens. A supplement that works but hurts still loses points.",
  },
];

const SCORE_BANDS = [
  { range: "90–100", label: "Exceptional", color: "text-green-400", desc: "Best-in-class on every factor. Evidence-backed, rigorously manufactured, transparent." },
  { range: "80–89", label: "Strong", color: "text-blue-400", desc: "Solid across the board with minor gaps. Safe default choices." },
  { range: "70–79", label: "Decent", color: "text-cyan-400", desc: "Works, but has room to improve. Often a weaker form or less transparency." },
  { range: "60–69", label: "Below Average", color: "text-amber-400", desc: "Real concerns — wrong form, low dose, or poor manufacturing track record." },
  { range: "50–59", label: "Weak", color: "text-red-400", desc: "Meaningful problems with the product. Consider alternatives." },
];

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
        "Every supplement scored 50–100 across six factors: evidence, manufacturing, dose, bioavailability, transparency, and safety.",
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

        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Supplement Scoring</div>
        <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] leading-[1.15] mb-4">
          Every supplement scored 50–100 across six factors
        </h1>
        <p className="text-base text-muted leading-relaxed mb-12 max-w-[640px]">
          Formulate scores are deterministic and transparent. The same algorithm
          runs on every product, the weights are public, and the evidence base is
          versioned. No sponsorships, no editorial favoritism.
        </p>

        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6">The six factors</h2>
          <div className="space-y-3">
            {FACTORS.map((p) => (
              <div key={p.name} className="flex items-start gap-4 p-5 rounded-xl bg-surface border border-border">
                <div className="shrink-0 w-16 text-center">
                  <div className={`text-xl font-black ${p.color}`}>{p.weight}</div>
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
          <h2 className="text-xl font-bold mb-6">What the score means</h2>
          <div className="rounded-xl bg-surface border border-border p-5 space-y-3">
            {SCORE_BANDS.map((b) => (
              <div key={b.range} className="flex items-start gap-4">
                <div className="shrink-0 w-24">
                  <div className={`font-mono font-bold text-sm ${b.color}`}>{b.range}</div>
                  <div className={`text-xs font-semibold ${b.color}`}>{b.label}</div>
                </div>
                <p className="text-sm text-muted leading-relaxed flex-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

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
