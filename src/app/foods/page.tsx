import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { foods, foodCount, foodGroups, foodsByGroup, foodColor, BEST_GROUP_MIN } from "@/lib/foods";
import { ScoreMeter } from "@/components/score-meter";
import { NewsletterSignup } from "@/components/newsletter-signup";

const BASE = "https://formulate-health.app";

// Short editorial intro per food group — turns a bare grid into indexable,
// citable content. Keyed by exact group name. Educational only, not medical advice.
const GROUP_DESCRIPTIONS: Record<string, string> = {
  Vegetable:
    "Vegetables score highest when they pack micronutrients, fiber, and beneficial plant compounds into few calories. Formulate grades each on nutrient density, fiber, bioactive content, and glycemic impact.",
  Fruit:
    "Fruit is graded on nutrient and polyphenol density against its natural sugar — berries and other low-glycemic, antioxidant-rich fruit score above sweeter varieties.",
  Seafood:
    "Seafood is scored on protein quality, omega-3 (EPA/DHA) content, and micronutrients like selenium, iodine, and B12 — fatty fish lead the category.",
  Meat:
    "Meat is graded on protein quality and micronutrient density (iron, zinc, B12) balanced against saturated fat and processing — lean, unprocessed cuts score best.",
  "Nuts & Seeds":
    "Nuts and seeds are scored on healthy fats, protein, fiber, and minerals like magnesium — whole, unsalted forms outscore roasted-and-salted versions.",
  Legume:
    "Legumes earn high marks for plant protein, fiber, and minerals at a low glycemic load — among the most nutrient-dense, affordable foods you can eat.",
  Grain:
    "Grains are graded on fiber, micronutrients, and glycemic impact — intact whole grains beat refined flours by a wide margin.",
  Dairy:
    "Dairy is scored on protein quality, calcium, and bioactives versus saturated fat and added sugar — plain, higher-protein options score best.",
  Eggs:
    "Eggs are graded on complete protein, choline, and fat-soluble vitamins — one of the most bioavailable whole-food protein sources.",
  "Herbs & Spices":
    "Herbs and spices punch far above their weight on bioactive compounds — concentrated polyphenols and antioxidants give many of them top scores per gram.",
  "Oils & Fats":
    "Oils and fats are scored on fatty-acid profile and bioactive content — cold-pressed, monounsaturated- and omega-3-rich oils lead; highly refined and tropical oils trail.",
  Beverages:
    "Beverages are graded on micronutrients and beneficial compounds against sugar — unsweetened, polyphenol-rich drinks score highest.",
};

export const metadata: Metadata = {
  title: "Whole Food Scores — Nutrition & Health Ratings | Formulate",
  description: `Health scores for ${foodCount}+ whole foods, graded on nutrient density, protein, fiber, healthy fats, and beneficial plant compounds. See how your food actually stacks up.`,
  alternates: { canonical: `${BASE}/foods` },
  openGraph: {
    title: "Whole Food Scores — Nutrition & Health Ratings | Formulate",
    description: `Health scores for ${foodCount}+ whole foods, graded on real nutritional quality.`,
    type: "website",
    url: `${BASE}/foods`,
  },
};

export default function FoodsHub() {
  const groups = foodGroups();
  const top = [...foods].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Whole Food Scores",
    description: `Health scores for ${foodCount} whole foods.`,
    url: `${BASE}/foods`,
  };
  const faqs: { q: string; a: string }[] = [
    {
      q: "How does Formulate score whole foods?",
      a: `Every food is graded 0–100 on nutrient density, protein quality, fiber, healthy fats, beneficial plant compounds, and glycemic impact — with a penalty for anti-nutrients. The same rubric is applied to all ${foodCount} foods.`,
    },
    {
      q: "Are these food scores about calories?",
      a: "No. The score measures nutritional quality per serving, not calorie count. A handful of nuts and a soda can have similar calories but land at opposite ends of the scale.",
    },
  ];
  if (top && top.score != null) {
    faqs.push({
      q: "What is the highest-scoring whole food?",
      a: `${top.name} currently scores ${top.score}/100 (grade ${top.grade}).`,
    });
  }
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">Whole Food Scores</h1>
        <p className="text-base text-muted leading-relaxed">
          Every food below is graded on real nutritional quality — nutrient density, protein, fiber,
          healthy fats, beneficial plant compounds, and glycemic impact — not just calories.{" "}
          {foodCount} whole foods indexed.
        </p>
      </header>

      {/* group jump links */}
      <ul className="flex flex-wrap gap-2 mb-12">
        {groups.map((g) => (
          <li key={g.slug}>
            <a
              href={`#${g.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] pl-3 pr-2 py-1.5 hover:border-accent/40 transition-colors"
            >
              <span className="text-sm font-semibold text-text">{g.group}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-muted">{g.count}</span>
            </a>
          </li>
        ))}
      </ul>

      {groups.map(({ group, slug }) => (
        <section key={slug} id={slug} className="mb-14 scroll-mt-24">
          <div className="flex items-baseline justify-between mb-3 gap-3">
            <h2 className="text-xl font-bold text-text">{group}</h2>
            <div className="flex items-baseline gap-3 flex-shrink-0">
              {foodsByGroup(group).length >= BEST_GROUP_MIN && (
                <Link href={`/foods/best/${slug}`} className="text-xs font-semibold text-accent hover:underline whitespace-nowrap">
                  Healthiest {group} →
                </Link>
              )}
              <span className="text-xs text-muted">{foodsByGroup(group).length} foods</span>
            </div>
          </div>
          {GROUP_DESCRIPTIONS[group] && (
            <p className="text-sm text-muted leading-relaxed mb-5 max-w-3xl">{GROUP_DESCRIPTIONS[group]}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodsByGroup(group).map((f) => {
              const color = foodColor(f);
              return (
                <Link
                  key={f.base_id}
                  href={`/foods/${f.base_id}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
                >
                  <div className="relative w-14 h-14 rounded-lg bg-white/[0.02] overflow-hidden flex-shrink-0">
                    {f.image_url ? (
                      <Image src={f.image_url} alt="" fill sizes="56px" className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-2xl">{f.icon ?? "🍽️"}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    {f.subgroup && <div className="text-xs text-muted mb-0.5 truncate">{f.subgroup}</div>}
                    <div className="text-sm font-semibold text-text leading-snug line-clamp-2">{f.name}</div>
                  </div>
                  <ScoreMeter score={f.score} size={40} strokeWidth={4} color={color} />
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mt-4">
        <h2 className="text-2xl font-bold text-text mb-6">Frequently asked questions</h2>
        <div className="space-y-5 max-w-3xl">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-base font-semibold text-text mb-1.5">{f.q}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterSignup source="foods-hub" />
    </main>
  );
}
