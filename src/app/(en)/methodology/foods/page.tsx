import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Food Scoring Methodology — How Formulate Scores Whole Foods",
  description:
    "Whole foods scored 0–100 on seven weighted pillars — nutrient density, protein, fiber, fat quality, bioactives, glycemic impact, anti-nutrients — with the evidence behind each one cited.",
  alternates: { canonical: "https://formulate-health.app/methodology/foods" },
  openGraph: {
    title: "How Formulate Scores Whole Foods",
    description:
      "Seven weighted pillars, the exact grade bands, and a citation for every scoring decision.",
    type: "article",
  },
};

/**
 * These weights, bands and figures are the ones the scoring engine actually
 * uses (`whole_food_scoring_service.py`). This page previously described a
 * different rubric — processing level and sourcing, which whole foods do not
 * have — and published grade bands that disagreed with the app.
 *
 * If the engine changes, change this page in the SAME commit, and grep the
 * whole file: the basis moved to per-serving in 1.6.0 and the FAQ still said
 * "per 100 g" because only the pillar description was updated.
 */
const SCORE_VERSION = "1.6.0";

const PILLARS = [
  {
    name: "Nutrient Density",
    weight: 35,
    color: "text-green-400",
    desc:
      "Vitamins and minerals the food delivers, scored on two tracks — per studied serving and per 100 calories — so a calorie-dense food like nuts is not punished for its energy. Each nutrient is capped at 200% of its Daily Value so no single outlier can carry a food.",
    evidence:
      "Both the basis and the cap follow the published nutrient-profiling work. NRF9.3, validated against the Healthy Eating Index, is computed per serving and per 100 calories, and caps each nutrient to stop one outlier dominating. Scoring per 100 g instead is why dried herbs used to top this catalog — 100 g of dried parsley is fifty servings — and a per-100-calorie basis alone rates low-energy foods disproportionately high against the amounts people actually eat.",
    cite: "Drewnowski, J Nutr 2009 · Drewnowski & Maillot, Eur J Clin Nutr 2008",
    href: "https://www.nature.com/articles/ejcn200853",
  },
  {
    name: "Bioactive Compounds",
    weight: 15,
    color: "text-cyan-400",
    desc:
      "Polyphenols, flavonoids, carotenoids, glucosinolates and other compounds a calorie count cannot see. Where measured flavonoid content exists it is used directly; otherwise a food group baseline applies.",
    evidence:
      "In 56,048 adults followed 23 years, flavonoid intake was associated with lower all-cause and cardiovascular mortality, plateauing near 500 mg/day.",
    cite: "Bondonno, Nat Commun 2019",
    href: "https://www.nature.com/articles/s41467-019-11622-x",
  },
  {
    name: "Protein Quality",
    weight: 15,
    color: "text-indigo-400",
    desc:
      "Protein content and amino-acid completeness relative to the food's calories. Weighted toward complete proteins, which matters more with age than the plain RDA implies.",
    evidence:
      "Multiple consensus statements hold that the 0.8 g/kg/day RDA is inadequate for older adults; ~1.2 g/kg/day better preserves muscle.",
    cite: "Traylor & Phillips, Adv Nutr 2018",
    href: "https://pubmed.ncbi.nlm.nih.gov/29635313/",
  },
  {
    name: "Fiber Content",
    weight: 10,
    color: "text-emerald-400",
    desc: "Dietary fiber relative to calories, credited on absolute amount rather than a fiber-to-carb ratio.",
    evidence:
      "Across 185 prospective studies and 58 trials — nearly 135 million person-years — the highest fiber intakes carried 15–30% lower all-cause and cardiovascular mortality.",
    cite: "Reynolds, Lancet 2019",
    href: "https://www.thelancet.com/article/S0140-6736(18)31809-9/fulltext",
  },
  {
    name: "Fat Quality",
    weight: 10,
    color: "text-amber-400",
    desc:
      "Saturated fraction on a graded scale, monounsaturated and polyunsaturated fat credited separately rather than summed, trans fat penalised, and omega-3 credited on absolute amount. There is deliberately no omega-6 penalty and no omega-6:omega-3 ratio term.",
    evidence:
      "PREDIMED found a Mediterranean diet supplemented with olive oil or nuts cut major cardiovascular events in 7,216 high-risk adults. Separately, higher linoleic acid tracks with lower cardiovascular risk, which is why omega-6 is not penalised.",
    cite: "Estruch, NEJM 2018 · Marklund, Circulation 2019",
    href: "https://www.nejm.org/doi/full/10.1056/NEJMoa1800389",
  },
  {
    name: "Glycemic Impact",
    weight: 10,
    color: "text-blue-400",
    desc: "Sugar load and the fiber-to-carbohydrate relationship — how sharply the food's carbohydrate arrives.",
    evidence:
      "The same Lancet series covering fiber also examined glycemic index and load as measures of carbohydrate quality.",
    cite: "Reynolds, Lancet 2019",
    href: "https://www.thelancet.com/article/S0140-6736(18)31809-9/fulltext",
  },
  {
    name: "Anti-nutrients",
    weight: -5,
    color: "text-red-400",
    desc:
      "A deduction, not a pillar — very high saturated fat, and compounds such as oxalates and phytates that impair mineral absorption.",
    evidence:
      "This is the weakest-evidenced factor on the page, which is why it is capped at a 5-point deduction. Phytate in particular both reduces mineral absorption and carries plausible benefits, and the net effect in whole-food diets is genuinely unsettled.",
    cite: "Weakest evidence — smallest weight",
    href: null,
  },
];

const SCORE_BANDS = [
  { range: "90–100", label: "A+ · Optimal", color: "text-green-400", desc: "Nutrient-dense across several pillars at once. The foundation of a longevity diet." },
  { range: "75–89", label: "A · Excellent", color: "text-blue-400", desc: "Strong on the pillars that matter for this food group." },
  { range: "60–74", label: "B · Good", color: "text-cyan-400", desc: "Solid nutritional value with a weaker pillar or two." },
  { range: "40–59", label: "C · Neutral", color: "text-zinc-400", desc: "Fine in context; not doing much work for you." },
  { range: "20–39", label: "D · Low Value", color: "text-amber-400", desc: "Thin on nutrition relative to its calories." },
  { range: "0–19", label: "F · Minimal", color: "text-red-400", desc: "Little nutritional return. Occasional, not foundational." },
];

const FAQS = [
  {
    q: "Are branded products scored on this same scale?",
    a: "No — and that is deliberate. This page describes the whole-food scale. Branded packaged products are graded one tier harsher: an A there starts at 90, where a whole food scoring 90 earns an A+. The two are separate tables on purpose, so a packaged product cannot pick up a whole food's grade by matching its number.",
  },
  {
    q: "Why isn't this just about calories?",
    a: "Calories measure energy, not quality. Two foods with the same calories can differ enormously in what they deliver. Nutrient density is scored on two tracks — per studied serving and per 100 calories — precisely so that a calorie-dense whole food like walnuts is not penalised for its energy while a low-calorie food with little in it is not rewarded for emptiness.",
  },
  {
    q: "What serving are the nutrient figures based on?",
    a: "Percentages of Daily Value are shown per studied serving, not per 100 g — 28 g for nuts, 14 g for oils, 85 g for meat and fish, 140 g for fruit, 2 g for a spice. Per 100 g would mean about 65 Brazil nuts. Brazil nuts are a specific exception at 15 g, roughly three nuts, because a larger serving exceeds the tolerable upper intake for selenium.",
  },
  {
    q: "Do brands pay to score well?",
    a: "No. There are no sponsorships in any domain. The same algorithm runs on every food, and the score reflects the nutrition — not marketing or affiliate relationships.",
  },
  {
    q: "Where does the nutrition data come from?",
    a: "USDA FoodData Central composition data, including the full fatty-acid panel where USDA publishes it. Where a food's panel is incomplete the score reflects what is documented, and the app marks a score as estimated rather than measured when the underlying data is sparse.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://formulate-health.app/methodology/foods",
      url: "https://formulate-health.app/methodology/foods",
      name: "How Formulate Scores Whole Foods",
      description:
        "Whole foods scored 0–100 on seven weighted pillars, with the evidence behind each cited.",
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
          Seven pillars, and what each one rests on
        </h1>
        <p className="text-base text-muted leading-relaxed mb-4 max-w-[640px]">
          Every whole food is scored 0–100 by the same rubric. Below are the exact
          weights the engine uses, the grade bands it applies, and the published
          evidence behind each decision — including the one factor whose evidence
          is weak, and what we did about it.
        </p>
        <p className="text-xs font-mono text-muted mb-12">score_version {SCORE_VERSION}</p>

        <section className="mb-14">
          <h2 className="text-xl font-bold mb-2">What we weigh</h2>
          <p className="text-sm text-muted mb-6">Weights sum to 100, with anti-nutrients applied as a deduction.</p>
          <div className="space-y-3">
            {PILLARS.map((p) => (
              <div key={p.name} className="p-5 rounded-xl bg-surface border border-border">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <div className={`text-sm font-bold ${p.color}`}>{p.name}</div>
                  <div className="text-sm font-mono font-bold text-muted shrink-0">
                    {p.weight > 0 ? `${p.weight}%` : `−${Math.abs(p.weight)} pts`}
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-muted leading-relaxed">{p.evidence}</p>
                  <div className="mt-1.5 text-xs font-mono">
                    {p.href ? (
                      <a
                        href={p.href}
                        rel="noopener"
                        className="text-accent hover:underline"
                      >
                        {p.cite} →
                      </a>
                    ) : (
                      <span className="text-muted">{p.cite}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-bold mb-2">What the score means</h2>
          <p className="text-sm text-muted mb-6">
            These are the whole-food bands. Branded packaged products use a
            separate, harsher table.
          </p>
          <div className="rounded-xl bg-surface border border-border p-5 space-y-3">
            {SCORE_BANDS.map((b) => (
              <div key={b.range} className="flex items-start gap-4">
                <div className="shrink-0 w-28">
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
