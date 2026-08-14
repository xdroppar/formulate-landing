import type { Metadata } from "next";
import Link from "next/link";
import { withUtm } from "@/lib/app-url";

export const metadata: Metadata = {
  title: "Food Scoring Methodology — How Formulate Scores Foods",
  description:
    "Foods scored 0–100 on real nutritional quality — nutrient density, processing level, and beneficial compounds — so you can compare a whole food and a branded product on the same scale. Not calories.",
  alternates: { canonical: "https://formulate-health.app/methodology/foods" },
  openGraph: {
    title: "How Formulate Scores Foods",
    description:
      "Foods scored on nutritional quality, not calories — nutrient density, processing level, and beneficial compounds.",
    type: "article",
  },
};

const FACTORS = [
  {
    name: "Nutrient Density",
    color: "text-green-400",
    desc: "The headline factor. How much real nutrition — vitamins, minerals, fiber, quality protein — a food delivers relative to its calories. A food earns its score by what it gives you per calorie, not by being low-calorie.",
  },
  {
    name: "Processing Level",
    color: "text-blue-400",
    desc: "Whole and minimally-processed foods score high; ultra-processed foods (refined, reformulated, additive-heavy) are penalized. We use the food's processing classification, not marketing claims.",
  },
  {
    name: "Beneficial Compounds",
    color: "text-cyan-400",
    desc: "Bioactives with real evidence — omega-3s, polyphenols, carotenoids, glucosinolates, isoflavones — add points. These are the compounds whole foods carry that a calorie count can't see.",
  },
  {
    name: "Sourcing & Integrity",
    color: "text-amber-400",
    desc: "Verified organic and non-GMO status, and a short, clean ingredient list, are recognized. A single-ingredient whole food and a clean branded product can both score well.",
  },
  {
    name: "Added Sugar, Sodium & Additives",
    color: "text-red-400",
    desc: "Excess added sugar, high sodium, and unnecessary additives pull the score down — even on a food that's otherwise nutrient-dense.",
  },
];

const SCORE_BANDS = [
  { range: "85–100", label: "Excellent", color: "text-green-400", desc: "Nutrient-dense, minimally processed, rich in beneficial compounds. The foundation of a longevity diet." },
  { range: "70–84", label: "Good", color: "text-blue-400", desc: "Solid nutritional value with minor caveats — a little processing or a weaker nutrient profile." },
  { range: "55–69", label: "Moderate", color: "text-cyan-400", desc: "Fine in context, but watch the processing, added sugar, or sodium." },
  { range: "40–54", label: "Low", color: "text-amber-400", desc: "Heavily processed or nutrient-poor. Occasional, not foundational." },
  { range: "0–39", label: "Poor", color: "text-red-400", desc: "Ultra-processed and low in real nutrition. Minimal longevity value." },
];

const FAQS = [
  {
    q: "Why isn't this just about calories?",
    a: "Calories tell you about energy, not quality. Two foods with the same calories can have wildly different nutrition. Formulate scores the quality — what the food actually delivers for your long-term health — so a calorie-dense whole food can outscore a 'low-calorie' ultra-processed one.",
  },
  {
    q: "How can a branded product and a whole food share one scale?",
    a: "Because the factors are universal — nutrient density per calorie, processing level, beneficial compounds, additives. A clean branded food with a real nutrient profile can score as well as a whole food; an ultra-processed one won't.",
  },
  {
    q: "Where does the nutrition data come from?",
    a: "Whole-food data is drawn from established nutrition databases; branded foods use their published label and ingredient data. Beneficial-compound credit is tied to the evidence base, the same way supplement ingredients are evaluated.",
  },
  {
    q: "Do brands pay to score well?",
    a: "No. There are no sponsorships in any domain. The same algorithm runs on every food, and the score reflects the nutrition — not marketing or affiliate relationships.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://formulate-health.app/methodology/foods",
      url: "https://formulate-health.app/methodology/foods",
      name: "How Formulate Scores Foods",
      description:
        "Foods scored 0–100 on nutritional quality — nutrient density, processing level, and beneficial compounds.",
      isPartOf: { "@id": "https://formulate-health.app/#website" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://formulate-health.app" },
        { "@type": "ListItem", position: 2, name: "Methodology", item: "https://formulate-health.app/methodology" },
        { "@type": "ListItem", position: 3, name: "Foods", item: "https://formulate-health.app/methodology/foods" },
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

export default function FoodMethodologyPage() {
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
          <span className="text-text/60">Foods</span>
        </nav>

        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Food Scoring</div>
        <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] leading-[1.15] mb-4">
          Foods scored on quality — not calories
        </h1>
        <p className="text-base text-muted leading-relaxed mb-12 max-w-[640px]">
          Most apps count calories. Formulate scores how much a food actually
          supports your long-term health, on a 0–100 scale — so a whole food and a
          branded product can be compared on the same terms.
        </p>

        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6">What we weigh</h2>
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
          <h3 className="text-lg font-bold mb-2">See foods scored</h3>
          <p className="text-sm text-muted mb-5 max-w-[440px] mx-auto">
            Browse hundreds of whole foods and recipes, each scored on real
            nutritional quality — free, no account needed.
          </p>
          <Link
            href="/foods"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
          >
            Browse scored foods →
          </Link>
        </div>
      </div>
    </div>
  );
}
