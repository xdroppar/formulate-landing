import type { Metadata } from "next";
import Link from "next/link";
import { withUtm } from "@/lib/app-url";

export const metadata: Metadata = {
  title: "Nutrient Coverage Methodology — How Formulate Tracks Nutrients",
  description:
    "Formulate tracks your daily coverage of key nutrients against targets personalized to your age, sex, and life stage — combining food and supplements, surfacing gaps, and flagging upper limits.",
  alternates: { canonical: "https://formulate-health.app/methodology/nutrients" },
  openGraph: {
    title: "How Formulate Tracks Nutrient Coverage",
    description:
      "Daily nutrient coverage against personalized targets — combining food and supplements, with gaps and upper limits.",
    type: "article",
  },
};

const FACTORS = [
  {
    name: "Personalized Targets",
    color: "text-green-400",
    desc: "Coverage is measured against your target, not a generic number. Reference intakes (RDA/AI) are adjusted for age, sex, and life stage — pregnancy, for example, raises folate and iron targets substantially.",
  },
  {
    name: "Combined Intake",
    color: "text-blue-400",
    desc: "Your coverage sums what you get from both food and supplements into one daily picture, so you're never punished for getting a nutrient from your diet instead of a pill — and the two aren't double-counted.",
  },
  {
    name: "Gaps Surfaced",
    color: "text-cyan-400",
    desc: "The system shows exactly which nutrients you're short on, and the specific foods or supplements that would fill each gap — turning a number into an action.",
  },
  {
    name: "Upper Limits",
    color: "text-amber-400",
    desc: "More isn't always better. When your intake approaches a nutrient's tolerable upper limit (UL), it's flagged — so coverage means 'enough,' not 'as much as possible.'",
  },
  {
    name: "Core Nutrients, Expandable",
    color: "text-purple-400",
    desc: "Over two dozen key nutrients are tracked by default — the vitamins, minerals, and compounds that matter most for long-term health — and you can add more anytime.",
  },
];

const FAQS = [
  {
    q: "Why are my targets different from the number on a label?",
    a: "Label values use a single generic reference. Formulate adjusts your target to your age, sex, and life stage, so your coverage reflects what your body actually needs — not an average across everyone.",
  },
  {
    q: "Does food or supplements count more?",
    a: "Neither. A nutrient is a nutrient regardless of source. Coverage combines food and supplements into one total, so a well-built diet and a well-built stack are valued the same — and the goal is to fill real gaps, not to add pills.",
  },
  {
    q: "Can I be over-covered?",
    a: "Yes, and it matters. For nutrients with a tolerable upper limit, the system flags when you're approaching it. Coverage is about hitting 'enough' across the board, not maxing out any single nutrient.",
  },
  {
    q: "How do I close a gap?",
    a: "Every gap comes with the foods and supplements that fill it, scored on the same evidence-based methodology as the rest of the platform — so closing a gap also means choosing a quality source.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://formulate-health.app/methodology/nutrients",
      url: "https://formulate-health.app/methodology/nutrients",
      name: "How Formulate Tracks Nutrient Coverage",
      description:
        "Daily nutrient coverage against personalized targets, combining food and supplements, with gaps and upper limits.",
      isPartOf: { "@id": "https://formulate-health.app/#website" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://formulate-health.app" },
        { "@type": "ListItem", position: 2, name: "Methodology", item: "https://formulate-health.app/methodology" },
        { "@type": "ListItem", position: 3, name: "Nutrients", item: "https://formulate-health.app/methodology/nutrients" },
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

export default function NutrientMethodologyPage() {
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
          <span className="text-text/60">Nutrients</span>
        </nav>

        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Nutrient Coverage</div>
        <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] leading-[1.15] mb-4">
          Coverage measured against your targets — not a generic label
        </h1>
        <p className="text-base text-muted leading-relaxed mb-12 max-w-[640px]">
          Formulate combines your food and your supplements into one live picture
          of daily nutrient coverage, measured against targets personalized to you —
          so you know exactly where you're covered and where you're short.
        </p>

        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6">How coverage is calculated</h2>
          <div className="space-y-3">
            {FACTORS.map((p) => (
              <div key={p.name} className="p-5 rounded-xl bg-surface border border-border">
                <div className={`text-sm font-bold mb-1 ${p.color}`}>{p.name}</div>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
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
          <h3 className="text-lg font-bold mb-2">See your coverage</h3>
          <p className="text-sm text-muted mb-5 max-w-[440px] mx-auto">
            Track your daily nutrient coverage from food and supplements, with gaps
            and the sources that fill them — free in the app.
          </p>
          <a
            href={withUtm("https://app.formulate-health.app/stack/nutrients", {
              source: "landing",
              campaign: "methodology_nutrients_cta",
            })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
          >
            See how coverage works →
          </a>
        </div>
      </div>
    </div>
  );
}
