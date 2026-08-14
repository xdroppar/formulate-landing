import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { TrackedDownloadLink } from "@/components/tracked-download-link";
import { TrackedAppLink } from "@/components/tracked-app-link";
import { MobileAppBadges } from "@/components/mobile-app-badges";
import { NewsletterSignup } from "@/components/newsletter-signup";
import {
  AnimatedNumber,
  HeroPreview,
  ScoreBreakdownPreview,
  NutrientCoveragePreview,
  MealLogPreview,
  JourneyPreview,
} from "@/components/landing/landing-visuals";
import { BackgroundTree } from "@/components/landing/background-tree";
import { FallingLeaves } from "@/components/landing/falling-leaves";
import { LiveScoreSearch, type ScoreItem } from "@/components/landing/live-score-search";
import { HeroVideo } from "@/components/hero-video";
import { products as catalogProducts, productBySlug, type Product } from "@/lib/products";
import { foods as allFoods, foodColor } from "@/lib/foods";
import { recipes as allRecipes, recipeColor } from "@/lib/recipes";
import { withUtm } from "@/lib/app-url";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { SCORED_PRODUCTS_CLAIM } from "@/lib/catalog-size";
import { TrackedStartLink } from "@/components/tracked-start-link";

const APP_URL = "https://app.formulate-health.app";

// Single source of truth for the homepage FAQ — rendered on-page AND emitted as
// FAQPage JSON-LD. Google rejects FAQ schema that doesn't match visible copy, so
// these must stay unified.
const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "Is Formulate really free?",
    a: "Yes. The web app is completely free to use — score supplements, track food, and build your stack. We generate revenue through affiliate links when you choose to buy a product, but affiliate relationships never affect scores.",
  },
  {
    q: "Is this just for supplements?",
    a: "No. Formulate started with supplement scoring but is now a full nutrition platform: track whole foods and meals, monitor 26 key nutrients by default (add more anytime) across your diet and supplements, log hydration, and watch your progress over time.",
  },
  {
    q: "How do you score supplements and foods?",
    a: "Supplements are evaluated across ingredient quality, dose accuracy, bioavailability, third-party testing, label transparency, and clinical evidence (50–100 scale). Foods are scored on real nutritional quality — nutrient density, processing level, and beneficial compounds — not just calories.",
  },
  {
    q: "Is this medical advice?",
    a: "No. Formulate is an informational tool that aggregates clinical research to help you make more informed decisions. It is not a substitute for professional medical advice. Always consult your healthcare provider before starting any supplement.",
  },
  {
    q: "Can brands pay to change their score?",
    a: "No. We do not accept brand sponsorships, paid placements, or any form of compensation that would influence scores. Our methodology is fully transparent.",
  },
  {
    q: "Do I need an account?",
    a: "No. You can browse the full catalog and every product score without an account. An account is only needed to build and save your personal stack, track food, and follow your progress.",
  },
];

const HOME_FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Prefer the pre-generated ~256px thumb when it exists on disk (the catalog
 *  image_url often carries a `?v=` cache token that defeats the lib's thumb
 *  swap), else fall back to the full image. Server-only (SSG). */
function fileSize(publicPath: string): number {
  try {
    return statSync(join(process.cwd(), "public", publicPath)).size;
  } catch {
    return Infinity;
  }
}

function cardImage(p: Product): string {
  const raw = p.image_url ?? "";
  if (!raw) return p.gallery_images?.[0] ?? "";
  const [path] = raw.split("?");
  // Some products only have a placeholder "template" primary (a tiny rendered
  // card, not a real photo, e.g. Ritual Essential Prenatal). Detect it by size
  // and fall back to the first real gallery photo.
  if (fileSize(path) < 8000 && p.gallery_images?.[0]) return p.gallery_images[0];
  const thumb = path.replace(/\/[^/]+\.(webp|jpg|jpeg|png)$/i, "/thumb.webp");
  if (thumb !== path && existsSync(join(process.cwd(), "public", thumb))) return thumb;
  return raw;
}

function scoreHex(s: number): string {
  return s >= 90 ? "#10B981" : s >= 80 ? "#3B82F6" : s >= 70 ? "#F59E0B" : s >= 60 ? "#F97316" : "#EF4444";
}

// Brand-diverse, top-scored products that have a real image — powers the
// "real products, real scores" proof strip. Selected at build time (SSG).
const featuredProducts: Product[] = (() => {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const p of [...catalogProducts].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))) {
    if (!p.image_url || p.score == null) continue;
    if (seen.has(p.brand_slug)) continue;
    seen.add(p.brand_slug);
    out.push(p);
    if (out.length >= 10) break;
  }
  return out;
})();

// Recognizable stack staples for the hero mockup rows (graceful fallback to
// the featured set if a slug ever drops out of the catalog).
const heroRows = (() => {
  const staples = [
    "nootropics-depot-creatine-monohydrate-powder",
    "megafood-magnesium",
    "bulksupplements-l-theanine-powder",
  ]
    .map(productBySlug)
    .filter((p): p is Product => !!p);
  const list = staples.length >= 3 ? staples : featuredProducts;
  return list.slice(0, 3).map((p, i) => ({
    name: p.name,
    brand: p.brand,
    score: p.score ?? 0,
    image: cardImage(p),
    logged: i < 2,
  }));
})();

const creatineImage = (() => {
  const p = productBySlug("thorne-creatine");
  return p ? cardImage(p) : undefined;
})();

// Trimmed, build-time search index for the interactive "score your supplement"
// hero widget — name/brand/score only, so the full 2MB catalog never ships to
// the client. Sorted so the highest-scoring match surfaces first.
const scoreSearchIndex: ScoreItem[] = catalogProducts
  .filter((p) => p.score != null)
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    score: p.score as number,
    color: scoreHex(p.score as number),
  }));

// Top-scored foods + recipes for the homepage "whole plate, scored too" strip
// (surfaces the food/recipe SEO surface + internal-links the hubs & details).
const topFoods = [...allFoods].sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 12);
const topRecipes = (() => {
  // a little category diversity so it isn't six breakfasts
  const seen = new Set<string>();
  const out: typeof allRecipes = [];
  for (const r of [...allRecipes].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))) {
    if (!r.image_url) continue;
    const cat = r.category ?? "";
    if (seen.has(cat) && out.length < 6) continue;
    seen.add(cat);
    out.push(r);
    if (out.length >= 6) break;
  }
  return out;
})();

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

/** Alternating text + animated-preview feature block. */
function Spotlight({
  eyebrow,
  title,
  body,
  bullets,
  href,
  cta,
  preview,
  flip = false,
}: {
  eyebrow: string;
  title: ReactNode;
  body: string;
  bullets: string[];
  href: string;
  cta: string;
  preview: ReactNode;
  flip?: boolean;
}) {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal className={flip ? "lg:order-2" : ""}>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">{eyebrow}</div>
          <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold tracking-[-1px] mb-5 leading-[1.1]">{title}</h2>
          <p className="text-muted text-[16px] leading-relaxed mb-6 max-w-[480px]">{body}</p>
          <ul className="space-y-3 mb-8">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-text leading-relaxed">
                <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <a href={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all">
            {cta}
            <ArrowIcon className="w-3.5 h-3.5" />
          </a>
        </Reveal>
        <Reveal delay={120} className={flip ? "lg:order-1" : ""}>
          {preview}
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundTree />
      <FallingLeaves />
      <div className="relative z-10">

      {/* ───────────────── Hero ───────────────── */}
      <section className="relative overflow-hidden px-6 pt-28 md:pt-32 pb-16">
        {/* animated glow blobs */}
        <div className="absolute -top-[180px] left-[10%] w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.10)_0%,transparent_70%)] pointer-events-none animate-blob" />
        <div className="absolute top-[200px] right-[5%] w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(124,109,250,0.09)_0%,transparent_70%)] pointer-events-none animate-blob" style={{ animationDelay: "-6s" }} />

        <div className="relative max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* copy */}
          <div className="text-center lg:text-left">
            <div className="hero-animate inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[13px] font-semibold mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Supplements · Food · Nutrients — your whole routine, scored
            </div>

            <h1 className="hero-animate-delay-1 text-[clamp(40px,6vw,68px)] font-black leading-[1.04] tracking-[-2px] mb-6">
              Know exactly what&apos;s
              <br />
              <span className="text-gradient">working in your routine.</span>
            </h1>

            <p className="hero-animate-delay-2 text-[clamp(16px,2vw,20px)] text-muted max-w-[520px] mx-auto lg:mx-0 leading-relaxed mb-9">
              Score your supplements against clinical research, track your food and meals,
              and watch your nutrient coverage fill in — all in one free app built for
              longevity, not marketing.
            </p>

            <div className="hero-animate-delay-3 flex flex-col items-center lg:items-start gap-4">
              <div className="flex gap-3.5 flex-wrap justify-center lg:justify-start">
                <TrackedStartLink
                  source="home_hero"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_-8px_rgba(0,229,160,0.5)]"
                >
                  Build my free stack
                  <ArrowIcon />
                </TrackedStartLink>
                <TrackedAppLink
                  href={withUtm(`${APP_URL}`, { source: "landing", campaign: "home_hero_open" })}
                  source="home_hero"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
                >
                  Open the app
                </TrackedAppLink>
              </div>
              {/* The iPhone app ships and out-converts the web signup roughly
                  2:1 on first run, but until now it appeared nowhere above the
                  footer. Sits under the primary CTAs rather than replacing
                  them: the hero has to work for desktop readers too. */}
              <MobileAppBadges source="home_hero" size="sm" />
              <span className="text-[13px] text-muted/60">Free forever · No account needed to browse · No brand sponsorships</span>
            </div>
          </div>

          {/* animated preview */}
          <div className="hero-animate-delay-4">
            <HeroPreview products={heroRows} />
          </div>
        </div>
      </section>

      {/* ───────────────── What it actually is, in 53 seconds ─────────────────
          Directly under the hero on purpose. This page is ~15 screens tall and
          entry pages equal exit pages in the funnel — the CTAs at 13 and 14
          screens are effectively unseen. Anything meant to be watched has to be
          in the first screen or two. */}
      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent">
            See it in 53 seconds
          </div>
          <h2 className="text-[clamp(20px,3vw,30px)] font-extrabold tracking-[-0.5px] max-w-[620px]">
            You build your whole stack <span className="text-gradient">before</span> you make an account.
          </h2>
          <HeroVideo />
        </div>
      </section>

      {/* ───────────────── Live score search (instant payoff) ───────────────── */}
      <Reveal>
        <section className="max-w-[760px] mx-auto px-6 pb-16 text-center">
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Try it — no signup needed</div>
          <h2 className="text-[clamp(20px,3vw,30px)] font-extrabold tracking-[-0.5px] mb-6">
            Type any supplement. See its real score, <span className="text-gradient">instantly.</span>
          </h2>
          <LiveScoreSearch index={scoreSearchIndex} appUrl={APP_URL} />
        </section>
      </Reveal>

      {/* ───────────────── Animated stat bar ───────────────── */}
      <Reveal>
        <div className="max-w-[1000px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border">
            {[
              { node: <><AnimatedNumber value={260} />+</>, label: "Supplements scored" },
              { node: <><AnimatedNumber value={600} />+</>, label: "Whole foods & meals" },
              { node: <><AnimatedNumber value={26} />+</>, label: "Nutrients tracked daily" },
              { node: <>$<AnimatedNumber value={0} /></>, label: "Cost — always free" },
            ].map((s) => (
              <div key={s.label} className="bg-surface px-4 py-7 text-center">
                <div className="text-[clamp(26px,4vw,38px)] font-black text-text">
                  {s.node}
                </div>
                <div className="text-[12px] md:text-[13px] text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ───────────────── Real products proof strip ───────────────── */}
      <Reveal>
        <section className="max-w-[1100px] mx-auto px-6 pb-24">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Real products · real scores</div>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-1px] max-w-[640px] mx-auto">
              Actual products from the catalog — <span className="text-muted">scored, not sponsored.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {featuredProducts.slice(0, 10).map((p, i) => (
              <a
                key={p.slug}
                href={withUtm(`${APP_URL}/catalog/${p.slug}`, { source: "landing", campaign: "home_proof_strip" })}
                className={`group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:-translate-y-1 transition-all ${i >= 6 ? "hidden lg:block" : ""} ${i >= 4 && i < 6 ? "hidden sm:block" : ""}`}
              >
                <div className="relative aspect-square bg-surface2 flex items-center justify-center p-4">
                  <Image src={cardImage(p)} alt={`${p.brand} ${p.name}`} width={150} height={150} className="object-contain max-h-[120px] w-auto group-hover:scale-105 transition-transform" />
                  <div
                    className="absolute top-2.5 right-2.5 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 bg-bg/80 backdrop-blur"
                    style={{ color: scoreHex(p.score ?? 0), borderColor: scoreHex(p.score ?? 0) }}
                  >
                    {p.score}
                  </div>
                </div>
                <div className="p-3.5">
                  <div className="text-[13px] font-semibold text-text truncate" title={p.name}>{p.name}</div>
                  <div className="text-[11px] text-muted truncate">{p.brand}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={withUtm(`${APP_URL}/catalog`, { source: "landing", campaign: "home_proof_strip_all" })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
            >
              Browse all {SCORED_PRODUCTS_CLAIM} scored products
              <ArrowIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </Reveal>

      {/* ───────────────── Why you can trust the score ───────────────── */}
      <Reveal>
        <section className="max-w-[1100px] mx-auto px-6 pb-24">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Why you can trust the score</div>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-1px] max-w-[700px] mx-auto mb-4">
              Built on the standards a pharmacist would check — <span className="text-muted">not sponsorships.</span>
            </h2>
            <p className="text-muted text-[16px] max-w-[620px] mx-auto leading-relaxed">
              Every product runs through the same six-factor algorithm, weighted by what actually
              predicts quality. The weights are public and the evidence base is versioned.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[
              { w: "25%", n: "Clinical evidence", c: "text-green-400" },
              { w: "20%", n: "Manufacturing", c: "text-blue-400" },
              { w: "20%", n: "Dose accuracy", c: "text-cyan-400" },
              { w: "15%", n: "Bioavailability", c: "text-amber-400" },
              { w: "10%", n: "Transparency", c: "text-purple-400" },
              { w: "10%", n: "Safety", c: "text-red-400" },
            ].map((f) => (
              <div key={f.n} className="bg-surface border border-border rounded-2xl p-4 text-center">
                <div className={`text-2xl font-black ${f.c}`}>{f.w}</div>
                <div className="text-[12px] text-muted mt-1 leading-tight">{f.n}</div>
              </div>
            ))}
          </div>

          <div className="max-w-[760px] mx-auto rounded-2xl bg-surface border border-border p-6 text-center">
            <p className="text-[15px] text-text leading-relaxed mb-2">
              We read the credentials that actually mean something — <span className="font-semibold text-text">NSF</span>,{" "}
              <span className="font-semibold text-text">USP Verified</span>, <span className="font-semibold text-text">Informed Sport</span>,
              third-party COAs — alongside peer-reviewed human research for every ingredient.
            </p>
            <p className="text-[13px] text-muted">
              No brand pays to be listed, ranked, or featured. The same algorithm scores every product in the catalog.
            </p>
            <Link
              href="/methodology/supplements"
              className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
            >
              See the full methodology
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </Reveal>

      {/* ───────────────── Platform pillars ───────────────── */}
      <section id="features" className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4 text-center">The platform</div>
          <h2 className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-1px] text-center max-w-[760px] mx-auto mb-4">
            One app for everything you put in your body.
          </h2>
          <p className="text-muted text-[17px] max-w-[600px] mx-auto text-center leading-relaxed mb-14">
            Most apps track calories. Formulate scores quality — every supplement, every food, every
            nutrient — so you can build a routine that actually moves the needle.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: "🔬", title: "Supplement scoring", desc: "Every product scored 50–100 on dose accuracy, ingredient quality, bioavailability, testing & evidence." },
            { icon: "🍽️", title: "Food & meal tracking", desc: "Log whole foods, branded items and custom meals — each scored for nutritional quality, not just calories." },
            { icon: "🎯", title: "Nutrient coverage", desc: "See exactly which of 26 key nutrients you hit each day — combining your supplements and your diet, with more you can add anytime." },
            { icon: "📊", title: "Your Stack Score", desc: "A single, personalized score for how complete and high-quality your supplement stack really is." },
            { icon: "💧", title: "Hydration & habits", desc: "Track water, build streaks, and log everything in seconds with per-time-slot scheduling." },
            { icon: "🧬", title: "Progress & journey", desc: "Level up across health pillars, earn achievements, and watch your trends improve over time." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90}>
              <div className="group bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 hover:-translate-y-1 transition-all h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <div className="text-base font-bold mb-2">{f.title}</div>
                <div className="text-sm text-muted leading-relaxed">{f.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────── Feature spotlights ───────────────── */}
      <div className="border-t border-border">
        <Spotlight
          eyebrow="Supplement scores"
          title={<>Stop guessing. <span className="text-muted">See the real score.</span></>}
          body="Whether a dose is actually effective or a form is well-absorbed isn't on the label — it's in the clinical research. We've gone through it for every supplement and scored each 50–100 across the five factors that determine whether it works. No star ratings, no hype — you just read the number."
          bullets={[
            "Dose accuracy checked against effective clinical ranges",
            "Ingredient forms graded for bioavailability",
            "Underdosed blends and unsafe limits flagged automatically",
            "Brand scores derived from product data — never sponsorships",
          ]}
          href={withUtm(`${APP_URL}/catalog`, { source: "landing", campaign: "spotlight_scores" })}
          cta={`Browse ${SCORED_PRODUCTS_CLAIM} scored products`}
          preview={<ScoreBreakdownPreview image={creatineImage} />}
        />
      </div>

      <div className="bg-surface border-t border-b border-border">
        <Spotlight
          flip
          eyebrow="Nutrient coverage"
          title={<>Fill in the gaps your <span className="text-muted">diet leaves behind.</span></>}
          body="Formulate combines what you eat and what you supplement into one live picture of your daily nutrition — so you know exactly where you're covered and where you're short."
          bullets={[
            "26 core nutrients tracked from supplements + meals — add more anytime",
            "Targets personalized to your age, sex and goals",
            "Clear gaps surfaced with the foods or supplements that fill them",
            "No double-counting between your stack and your plate",
          ]}
          href={withUtm(`${APP_URL}/stack/nutrients`, { source: "landing", campaign: "spotlight_nutrients" })}
          cta="See how coverage works"
          preview={<NutrientCoveragePreview />}
        />
      </div>

      <Spotlight
        eyebrow="Food & meals"
        title={<>Track food by <span className="text-muted">quality, not just calories.</span></>}
        body="Log whole foods, branded products and your own custom meals. Each one is scored for real nutritional value, and your macros roll up automatically across the day."
        bullets={[
          "Hundreds of whole foods and branded items, already scored",
          "Build and save custom meals and recipes once, log them in a tap",
          "Macros and micros roll into your daily targets",
          "Portion-aware scoring — too much butter actually lowers the score",
        ]}
        href={withUtm(`${APP_URL}/meals`, { source: "landing", campaign: "spotlight_meals" })}
        cta="Explore meals & recipes"
        preview={<MealLogPreview />}
      />

      {/* ───────────────── Foods & recipes scored (proof + internal links) ───────────────── */}
      <Reveal>
        <section className="max-w-[1100px] mx-auto px-6 pb-24">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">Foods & recipes · scored too</div>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-1px] max-w-[680px] mx-auto">
              Not just supplements — <span className="text-muted">your whole plate, scored.</span>
            </h2>
          </div>

          {/* recipes */}
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-lg font-bold text-text">Top-scoring recipes</h3>
            <a href="/recipes" className="text-sm font-semibold text-accent hover:gap-2.5 inline-flex items-center gap-1.5 transition-all">
              Browse {allRecipes.length}+ recipes <ArrowIcon className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-12">
            {topRecipes.map((r) => {
              const color = recipeColor(r);
              return (
                <a key={r.id} href={`/recipes/${r.id}`} className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:-translate-y-1 transition-all">
                  <div className="relative aspect-square bg-surface2">
                    {r.image_url && <Image src={r.image_url} alt={r.name} fill sizes="180px" className="object-cover group-hover:scale-105 transition-transform" />}
                    <span className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 bg-bg/80 backdrop-blur" style={{ color, borderColor: color }}>{r.score}</span>
                  </div>
                  <div className="p-2.5 text-[12px] font-semibold text-text leading-snug line-clamp-2">{r.name}</div>
                </a>
              );
            })}
          </div>

          {/* whole foods */}
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-lg font-bold text-text">Highest-scoring whole foods</h3>
            <a href="/foods" className="text-sm font-semibold text-accent hover:gap-2.5 inline-flex items-center gap-1.5 transition-all">
              Browse {allFoods.length}+ foods <ArrowIcon className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {topFoods.map((f) => {
              const color = foodColor(f);
              return (
                <a key={f.base_id} href={`/foods/${f.base_id}`} className="group flex items-center gap-2.5 bg-surface border border-border rounded-xl p-2.5 hover:border-accent/30 transition-all">
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-surface2 flex-shrink-0">
                    {f.image_url && <Image src={f.image_url} alt={f.name} fill sizes="36px" className="object-cover" />}
                  </div>
                  <span className="text-[12px] font-semibold text-text leading-tight line-clamp-2 flex-1 min-w-0">{f.name}</span>
                  <span className="text-[11px] font-black flex-shrink-0" style={{ color }}>{f.score}</span>
                </a>
              );
            })}
          </div>
        </section>
      </Reveal>

      <div className="bg-surface border-t border-b border-border">
        <Spotlight
          flip
          eyebrow="Progress & journey"
          title={<>Build momentum that <span className="text-muted">actually sticks.</span></>}
          body="Logging consistently is the hard part. Formulate turns it into progress you can see — streaks, levels across health pillars, achievements, and trends that prove it's working."
          bullets={[
            "Level up across Supplements, Diet and Nutrition pillars",
            "Streaks and achievements keep you consistent",
            "Weekly and monthly trend charts for every metric",
            "Your Stack Score climbs as your routine improves",
          ]}
          href={withUtm(`${APP_URL}`, { source: "landing", campaign: "spotlight_journey" })}
          cta="Start your journey"
          preview={<JourneyPreview />}
        />
      </div>

      {/* ───────────────── Problem stats (every claim sourced) ───────────────── */}
      <Reveal>
        <section className="max-w-[880px] mx-auto px-6 py-24 text-center">
          <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold tracking-[-1px] mb-4">
            The supplement industry makes it <span className="text-danger">hard to know</span> what&apos;s actually good.
          </h2>
          <p className="text-muted text-[15px] max-w-[560px] mx-auto leading-relaxed mb-12">
            Not scare stats — verifiable facts, each one sourced. The same standard we hold every product to.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                stat: "0",
                desc: "Safety or effectiveness reviews a supplement must pass before it's legally sold to you.",
                source: "U.S. law — DSHEA, 1994",
              },
              {
                stat: "+478%",
                desc: "Over the labeled dose some melatonin products tested at — others ran 83% under, and ~1 in 4 contained unlisted serotonin.",
                source: "2017, J. Clinical Sleep Medicine",
              },
              {
                stat: "0mg",
                desc: "The per-ingredient amount a brand must disclose inside a \"proprietary blend.\"",
                source: "FDA labeling rules",
              },
            ].map((item) => (
              <Reveal key={item.stat} delay={100}>
                <div className="bg-surface border border-border rounded-xl p-6 h-full flex flex-col">
                  <div className="text-4xl font-black text-accent mb-3">{item.stat}</div>
                  <div className="text-sm text-text leading-relaxed mb-4 flex-1">{item.desc}</div>
                  <div className="text-[11px] text-muted/60 font-semibold tracking-wide uppercase">{item.source}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ───────────────── How it works ───────────────── */}
      <div id="how" className="bg-surface border-t border-b border-border py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">How it works</div>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[600px] mb-14">
              From confusion to clarity in minutes.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { num: "01", title: "Search & score", desc: "Look up any supplement or food. See exactly how it scores and why — dose, quality, evidence, and more." },
              { num: "02", title: "Build your stack", desc: "Add the best products and foods. Get one personalized Stack Score for the whole routine." },
              { num: "03", title: "Log & cover gaps", desc: "Log what you take and eat. Watch your nutrient coverage fill in and your gaps shrink." },
              { num: "04", title: "Track progress", desc: "Level up, keep streaks, and see trends prove your routine is actually working." },
            ].map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <div>
                  <div className="text-[40px] md:text-[56px] font-black text-accent leading-none mb-3">{s.num}</div>
                  <div className="text-lg font-bold mb-2">{s.title}</div>
                  <div className="text-sm text-muted leading-relaxed">{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ───────────────── Methodology / Trust ───────────────── */}
      <section id="methodology" className="max-w-[1100px] mx-auto px-6 py-24">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">Our methodology</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[700px] mb-6">
            Transparent scoring. No brand deals.
          </h2>
          <p className="text-muted text-[17px] max-w-[600px] leading-relaxed mb-12">
            Every score is derived from a multi-factor model built on publicly available clinical research. We don&apos;t accept brand sponsorships, and no company can pay to change their score.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Ingredient quality", desc: "Are the ingredient forms clinically studied and bioavailable?" },
            { label: "Dose accuracy", desc: "Does each ingredient meet its clinically effective dose?" },
            { label: "Label transparency", desc: "Full disclosure or proprietary blends hiding weak ingredients?" },
            { label: "Third-party testing", desc: "Is the product independently tested for purity and potency?" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div className="bg-surface border border-border rounded-xl p-6 h-full">
                <div className="text-sm font-bold text-accent mb-2">{item.label}</div>
                <div className="text-sm text-muted leading-relaxed">{item.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-8">
            <a href={`${APP_URL}/methodology`} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              Read our full scoring methodology
              <ArrowIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ───────────────── Comparison ───────────────── */}
      <section id="compare" className="max-w-[960px] mx-auto px-6 py-24 scroll-mt-20">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4 text-center">How Formulate compares</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] text-center max-w-[640px] mx-auto mb-4">
            Built to tell you the truth.
          </h2>
          <p className="text-muted text-[17px] max-w-[560px] mx-auto text-center leading-relaxed mb-12">
            Calorie trackers count what you eat. Influencer lists are paid placements. Formulate
            scores quality against research — and answers to no one but you.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full min-w-[620px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold text-muted px-5 py-4 w-[40%]">&nbsp;</th>
                  <th className="px-4 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 font-extrabold text-accent">
                      <span className="w-2 h-2 rounded-full bg-accent" /> Formulate
                    </span>
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-muted">Calorie trackers</th>
                  <th className="px-4 py-4 text-center font-semibold text-muted">Influencer lists</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: "Scores supplement quality (dose, form, evidence)", f: "yes", c: "no", i: "partial" },
                  { feat: "Scores food on quality — not just calories", f: "yes", c: "partial", i: "no" },
                  { feat: "Tracks vitamin & mineral coverage", f: "yes", c: "partial", i: "no" },
                  { feat: "Independent of brand sponsorships", f: "yes", c: "partial", i: "no" },
                  { feat: "Transparent, published methodology", f: "yes", c: "no", i: "no" },
                  { feat: "Free to use, no paywall", f: "yes", c: "partial", i: "yes" },
                ].map((row, idx) => (
                  <tr key={row.feat} className={idx % 2 ? "bg-bg/30" : ""}>
                    <td className="px-5 py-4 text-text font-medium border-t border-border">{row.feat}</td>
                    {(["f", "c", "i"] as const).map((col) => {
                      const v = row[col];
                      const highlight = col === "f";
                      return (
                        <td key={col} className={`px-4 py-4 text-center border-t border-border ${highlight ? "bg-accent/[0.04]" : ""}`}>
                          {v === "yes" ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/15 text-accent" aria-label="Yes">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </span>
                          ) : v === "partial" ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-warning/10 text-warning text-base font-black leading-none" aria-label="Partial">–</span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-muted/50" aria-label="No">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section className="bg-surface border-t border-b border-border py-24 px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_LD) }}
        />
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">FAQ</div>
            <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-1px] mb-12">
              Common questions
            </h2>
          </Reveal>
          <div className="space-y-8">
            {HOME_FAQS.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <div className="border-b border-border pb-8 last:border-b-0 last:pb-0">
                  <h3 className="text-base font-bold mb-3">{item.q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Pricing ───────────────── */}
      <section id="pricing" className="max-w-[1100px] mx-auto px-6 py-24 scroll-mt-20">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4 text-center">Pricing</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] text-center max-w-[600px] mx-auto mb-4">
            Everything, for free.
          </h2>
          <p className="text-muted text-[17px] max-w-[540px] mx-auto text-center leading-relaxed mb-12">
            No tiers, no trials, no upsells. Formulate is funded by optional affiliate links — never by
            charging you or by changing a score.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="max-w-[460px] mx-auto rounded-2xl border border-accent/25 bg-surface p-8 relative overflow-hidden">
            <div className="absolute -top-[120px] -right-[120px] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.10)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[12px] font-bold mb-5">
                Free forever
              </div>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-6xl font-black text-text leading-none">$0</span>
                <span className="text-muted text-sm mb-1.5">/ forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  `Browse ${SCORED_PRODUCTS_CLAIM} scored supplements — no account needed`,
                  "Track food, meals & nutrient coverage",
                  "Build your stack and get your Stack Score",
                  "Hydration, streaks, and progress tracking",
                  "Full scoring methodology, always transparent",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text leading-relaxed">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <TrackedAppLink
                href={withUtm(`${APP_URL}`, { source: "landing", campaign: "home_pricing" })}
                source="home_pricing"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
              >
                Get started — free
                <ArrowIcon />
              </TrackedAppLink>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────────── Featured Guides ───────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 py-24">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">Learn</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[700px] mb-4">
            Evidence-based health guides
          </h2>
          <p className="text-muted text-[17px] max-w-[560px] leading-relaxed mb-12">
            Deep-dives, best-of roundups, nutrition explainers, and protocols — every recommendation backed by clinical research.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              slug: "how-to-build-a-supplement-stack",
              category: "Guide",
              title: "How to Build a Supplement Stack",
              desc: "Learn how to pick supplements that actually work, avoid redundancy, and build a stack tailored to your goals.",
              readTime: "12 min read",
            },
            {
              slug: "protein-guide",
              category: "Nutrition",
              title: "The Complete Guide to Protein",
              desc: "How much protein you actually need, the best whole-food sources, and how to hit your daily target from food and supplements.",
              readTime: "9 min read",
            },
            {
              slug: "best-sleep-supplement-protocol",
              category: "Protocol",
              title: "The Best Sleep Supplement Protocol",
              desc: "Magnesium, L-theanine, and glycine — how to combine sleep supplements backed by clinical trials.",
              readTime: "10 min read",
            },
          ].map((guide, i) => (
            <Reveal key={guide.slug} delay={i * 80}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group block bg-surface border border-border rounded-2xl p-7 hover:border-accent/30 hover:-translate-y-0.5 transition-all h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-accent">{guide.category}</span>
                  <span className="text-[10px] text-muted">{guide.readTime}</span>
                </div>
                <h3 className="text-base font-bold leading-snug mb-2 group-hover:text-accent transition-colors">{guide.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{guide.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-8">
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              Browse all guides
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ───────────────── Newsletter ───────────────── */}
      <Reveal>
        <section className="px-6 max-w-[640px] mx-auto">
          <NewsletterSignup source="home" />
        </section>
      </Reveal>

      {/* ───────────────── Final CTA ───────────────── */}
      <Reveal>
        <section className="py-24 px-6 text-center max-w-[680px] mx-auto flex flex-col items-center">
          <h2 className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-1px] mb-4">
            See what&apos;s <span className="text-accent">actually working</span> in your routine.
          </h2>
          <p className="text-muted text-[17px] leading-relaxed mb-10">
            Score your supplements, track your food, cover your gaps. Free, forever.
          </p>
          <div className="flex gap-3.5 flex-wrap justify-center">
            <TrackedAppLink
              href={withUtm(`${APP_URL}`, { source: "landing", campaign: "home_footer_cta" })}
              source="home_footer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_-8px_rgba(0,229,160,0.5)]"
            >
              Open the app — free
              <ArrowIcon />
            </TrackedAppLink>
            <TrackedDownloadLink
              href="/download"
              source="landing_page_bottom"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
            >
              Request desktop access
            </TrackedDownloadLink>
          </div>
        </section>
      </Reveal>
      </div>
    </div>
  );
}
