import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { getMessages, translate } from "@/lib/i18n/messages";
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
type T = (key: string, vars?: Record<string, string | number>) => string;

function homeFaqs(t: T): { q: string; a: string }[] {
  return [
  {
    q: t("home.isFormulateReallyFree"),
    a: t("home.yesTheWebAppIs"),
  },
  {
    q: t("home.isThisJustForSupplements"),
    a: t("home.noFormulateStartedWithSupplement"),
  },
  {
    q: t("home.howDoYouScoreSupplements"),
    a: t("home.supplementsAreEvaluatedAcrossIngredient"),
  },
  {
    q: t("home.isThisMedicalAdvice"),
    a: t("home.noFormulateIsAnInformational"),
  },
  {
    q: t("home.canBrandsPayToChange"),
    a: t("home.noWeDoNotAccept"),
  },
  {
    q: t("home.doINeedAnAccount"),
    a: t("home.noYouCanBrowseThe"),
  },
  ];
}

/** FAQPage structured data, localised alongside the visible copy so the
 *  rich-result text can never disagree with what the page actually says. */
function homeFaqLd(t: T) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs(t).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

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

/**
 * Locale arrives as a PROP, not from a context or a cookie.
 *
 * This is a server component, so the translated copy has to be in the HTML the
 * server emits — a crawler never runs the client bundle, and Spanish injected
 * after hydration is Spanish Google will not index. Props are also what keeps
 * every page statically prerendered: no dynamic server API is touched.
 */
export default function Home({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const messages = getMessages(locale);
  const t: T = (key, vars) => translate(messages, key, vars);
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
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />{t("home.supplementsFoodNutrientsYourWhole")}</div>

            <h1 className="hero-animate-delay-1 text-[clamp(40px,6vw,68px)] font-black leading-[1.04] tracking-[-2px] mb-6">{t("home.knowExactlyWhatS")}<br />
              <span className="text-gradient">{t("home.workingInYourRoutine")}</span>
            </h1>

            <p className="hero-animate-delay-2 text-[clamp(16px,2vw,20px)] text-muted max-w-[520px] mx-auto lg:mx-0 leading-relaxed mb-9">
              {t("home.heroSub")}
            </p>

            <div className="hero-animate-delay-3 flex flex-col items-center lg:items-start gap-4">
              <div className="flex gap-3.5 flex-wrap justify-center lg:justify-start">
                <TrackedStartLink
                  source="home_hero"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_-8px_rgba(0,229,160,0.5)]"
                >{t("home.buildMyFreeStack")}<ArrowIcon />
                </TrackedStartLink>
                <TrackedAppLink
                  href={withUtm(`${APP_URL}`, { source: "landing", campaign: "home_hero_open" })}
                  source="home_hero"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
                >{t("home.openTheApp")}</TrackedAppLink>
              </div>
              {/* The iPhone app ships and out-converts the web signup roughly
                  2:1 on first run, but until now it appeared nowhere above the
                  footer. Sits under the primary CTAs rather than replacing
                  them: the hero has to work for desktop readers too. */}
              <MobileAppBadges source="home_hero" size="sm" />
              <span className="text-[13px] text-muted/60">{t("home.freeForeverNoAccountNeeded")}</span>
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
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent">{t("home.seeItIn53Seconds")}</div>
          <h2 className="text-[clamp(20px,3vw,30px)] font-extrabold tracking-[-0.5px] max-w-[620px]">{t("home.youBuildYourWholeStack")} <span className="text-gradient">{t("home.before")}</span>{" "}{t("home.youMakeAnAccount")}</h2>
          <HeroVideo />
        </div>
      </section>

      {/* ───────────────── Live score search (instant payoff) ───────────────── */}
      <Reveal>
        <section className="max-w-[760px] mx-auto px-6 pb-16 text-center">
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">{t("home.tryItNoSignupNeeded")}</div>
          <h2 className="text-[clamp(20px,3vw,30px)] font-extrabold tracking-[-0.5px] mb-6">{t("home.typeAnySupplementSeeIts")} <span className="text-gradient">{t("home.instantly")}</span>
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
              { node: <><AnimatedNumber value={600} />+</>, label: t("home.wholeFoodsMeals") },
              { node: <><AnimatedNumber value={26} />+</>, label: t("home.nutrientsTrackedDaily") },
              { node: <>$<AnimatedNumber value={0} /></>, label: t("home.costAlwaysFree") },
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
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">{t("home.realProductsRealScores")}</div>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-1px] max-w-[640px] mx-auto">{t("home.actualProductsFromTheCatalog")} <span className="text-muted">{t("home.scoredNotSponsored")}</span>
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
            >{t("home.browseAllScoredProducts", { count: SCORED_PRODUCTS_CLAIM })}<ArrowIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </Reveal>

      {/* ───────────────── Why you can trust the score ───────────────── */}
      <Reveal>
        <section className="max-w-[1100px] mx-auto px-6 pb-24">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">{t("home.whyYouCanTrustThe")}</div>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-1px] max-w-[700px] mx-auto mb-4">{t("home.builtOnTheStandardsA")} <span className="text-muted">{t("home.notSponsorships")}</span>
            </h2>
            <p className="text-muted text-[16px] max-w-[620px] mx-auto leading-relaxed">{t("home.everyProductRunsThroughThe")}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[
              { w: "25%", n: t("home.clinicalEvidence"), c: "text-green-400" },
              { w: "20%", n: t("home.manufacturing"), c: "text-blue-400" },
              { w: "20%", n: t("home.doseAccuracy"), c: "text-cyan-400" },
              { w: "15%", n: t("home.bioavailability"), c: "text-amber-400" },
              { w: "10%", n: t("home.transparency"), c: "text-purple-400" },
              { w: "10%", n: t("home.safety"), c: "text-red-400" },
            ].map((f) => (
              <div key={f.n} className="bg-surface border border-border rounded-2xl p-4 text-center">
                <div className={`text-2xl font-black ${f.c}`}>{f.w}</div>
                <div className="text-[12px] text-muted mt-1 leading-tight">{f.n}</div>
              </div>
            ))}
          </div>

          <div className="max-w-[760px] mx-auto rounded-2xl bg-surface border border-border p-6 text-center">
            <p className="text-[15px] text-text leading-relaxed mb-2">{t("home.weReadTheCredentialsThat")} <span className="font-semibold text-text">{t("home.nsf")}</span>,{" "}
              <span className="font-semibold text-text">{t("home.uspVerified")}</span>, <span className="font-semibold text-text">{t("home.informedSport")}</span>{t("home.thirdPartyCoasAlongsidePeer")}</p>
            <p className="text-[13px] text-muted">{t("home.noBrandPaysToBe")}</p>
            <Link
              href="/methodology/supplements"
              className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
            >{t("home.seeTheFullMethodology")}<ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </Reveal>

      {/* ───────────────── Platform pillars ───────────────── */}
      <section id="features" className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4 text-center">{t("home.thePlatform")}</div>
          <h2 className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-1px] text-center max-w-[760px] mx-auto mb-4">{t("home.oneAppForEverythingYou")}</h2>
          <p className="text-muted text-[17px] max-w-[600px] mx-auto text-center leading-relaxed mb-14">{t("home.mostAppsTrackCaloriesFormulate")}</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: "🔬", title: t("home.supplementScoring"), desc: t("home.everyProductScored50100") },
            { icon: "🍽️", title: t("home.foodMealTracking"), desc: t("home.logWholeFoodsBrandedItems") },
            { icon: "🎯", title: t("home.nutrientCoverage"), desc: t("home.seeExactlyWhichOf26") },
            { icon: "📊", title: t("home.yourStackScore"), desc: t("home.aSinglePersonalizedScoreFor") },
            { icon: "💧", title: t("home.hydrationHabits"), desc: t("home.trackWaterBuildStreaksAnd") },
            { icon: "🧬", title: t("home.progressJourney"), desc: t("home.levelUpAcrossHealthPillars") },
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
          eyebrow={t("home.supplementScores")}
          title={<>{t("home.stopGuessing")} <span className="text-muted">{t("home.seeTheRealScore")}</span></>}
          body={t("home.whetherADoseIsActually")}
          bullets={[
            t("home.doseAccuracyCheckedAgainstEffective"),
            t("home.ingredientFormsGradedForBioavailability"),
            t("home.underdosedBlendsAndUnsafeLimits"),
            t("home.brandScoresDerivedFromProduct"),
          ]}
          href={withUtm(`${APP_URL}/catalog`, { source: "landing", campaign: "spotlight_scores" })}
          cta={`Browse ${SCORED_PRODUCTS_CLAIM} scored products`}
          preview={<ScoreBreakdownPreview image={creatineImage} />}
        />
      </div>

      <div className="bg-surface border-t border-b border-border">
        <Spotlight
          flip
          eyebrow={t("home.nutrientCoverage")}
          title={<>{t("home.fillInTheGapsYour")} <span className="text-muted">{t("home.dietLeavesBehind")}</span></>}
          body={t("home.formulateCombinesWhatYouEat")}
          bullets={[
            t("home.26CoreNutrientsTrackedFrom"),
            t("home.targetsPersonalizedToYourAge"),
            t("home.clearGapsSurfacedWithThe"),
            t("home.noDoubleCountingBetweenYour"),
          ]}
          href={withUtm(`${APP_URL}/stack/nutrients`, { source: "landing", campaign: "spotlight_nutrients" })}
          cta={t("home.seeHowCoverageWorks")}
          preview={<NutrientCoveragePreview />}
        />
      </div>

      <Spotlight
        eyebrow={t("home.foodMeals")}
        title={<>{t("home.trackFoodBy")} <span className="text-muted">{t("home.qualityNotJustCalories")}</span></>}
        body={t("home.logWholeFoodsBrandedProducts")}
        bullets={[
          t("home.hundredsOfWholeFoodsAnd"),
          t("home.buildAndSaveCustomMeals"),
          t("home.macrosAndMicrosRollInto"),
          t("home.portionAwareScoringTooMuch"),
        ]}
        href={withUtm(`${APP_URL}/meals`, { source: "landing", campaign: "spotlight_meals" })}
        cta={t("home.exploreMealsRecipes")}
        preview={<MealLogPreview />}
      />

      {/* ───────────────── Foods & recipes scored (proof + internal links) ───────────────── */}
      <Reveal>
        <section className="max-w-[1100px] mx-auto px-6 pb-24">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">{t("home.foodsRecipesScoredToo")}</div>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold tracking-[-1px] max-w-[680px] mx-auto">{t("home.notJustSupplements")} <span className="text-muted">{t("home.yourWholePlateScored")}</span>
            </h2>
          </div>

          {/* recipes */}
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-lg font-bold text-text">{t("home.topScoringRecipes")}</h3>
            <a href="/recipes" className="text-sm font-semibold text-accent hover:gap-2.5 inline-flex items-center gap-1.5 transition-all">
              {t("home.browseNRecipes", { n: allRecipes.length })} <ArrowIcon className="w-3.5 h-3.5" />
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
            <h3 className="text-lg font-bold text-text">{t("home.highestScoringWholeFoods")}</h3>
            <a href="/foods" className="text-sm font-semibold text-accent hover:gap-2.5 inline-flex items-center gap-1.5 transition-all">
              {t("home.browseNFoods", { n: allFoods.length })} <ArrowIcon className="w-3.5 h-3.5" />
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
          eyebrow={t("home.progressJourney")}
          title={<>{t("home.buildMomentumThat")} <span className="text-muted">{t("home.actuallySticks")}</span></>}
          body={t("home.loggingConsistentlyIsTheHard")}
          bullets={[
            t("home.levelUpAcrossSupplementsDiet"),
            t("home.streaksAndAchievementsKeepYou"),
            t("home.weeklyAndMonthlyTrendCharts"),
            t("home.yourStackScoreClimbsAs"),
          ]}
          href={withUtm(`${APP_URL}`, { source: "landing", campaign: "spotlight_journey" })}
          cta={t("home.startYourJourney")}
          preview={<JourneyPreview />}
        />
      </div>

      {/* ───────────────── Problem stats (every claim sourced) ───────────────── */}
      <Reveal>
        <section className="max-w-[880px] mx-auto px-6 py-24 text-center">
          <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold tracking-[-1px] mb-4">{t("home.theSupplementIndustryMakesIt")} <span className="text-danger">{t("home.hardToKnow")}</span>{" "}{t("home.whatSActuallyGood")}</h2>
          <p className="text-muted text-[15px] max-w-[560px] mx-auto leading-relaxed mb-12">{t("home.notScareStatsVerifiableFacts")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                stat: "0",
                desc: t("home.safetyOrEffectivenessReviewsA"),
                source: "U.S. law — DSHEA, 1994",
              },
              {
                stat: "+478%",
                desc: t("home.overTheLabeledDoseSome"),
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
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">{t("home.howItWorks")}</div>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[600px] mb-14">{t("home.fromConfusionToClarityIn")}</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { num: "01", title: t("home.searchScore"), desc: t("home.lookUpAnySupplementOr") },
              { num: "02", title: t("home.buildYourStack"), desc: t("home.addTheBestProductsAnd") },
              { num: "03", title: t("home.logCoverGaps"), desc: t("home.logWhatYouTakeAnd") },
              { num: "04", title: t("home.trackProgress"), desc: t("home.levelUpKeepStreaksAnd") },
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
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">{t("home.ourMethodology")}</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[700px] mb-6">{t("home.transparentScoringNoBrandDeals")}</h2>
          <p className="text-muted text-[17px] max-w-[600px] leading-relaxed mb-12">{t("home.everyScoreIsDerivedFrom")}</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: t("home.ingredientQuality"), desc: t("home.areTheIngredientFormsClinically") },
            { label: t("home.doseAccuracy"), desc: t("home.doesEachIngredientMeetIts") },
            { label: t("home.labelTransparency"), desc: t("home.fullDisclosureOrProprietaryBlends") },
            { label: t("home.thirdPartyTesting"), desc: t("home.isTheProductIndependentlyTested") },
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
            <a href={`${APP_URL}/methodology`} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">{t("home.readOurFullScoringMethodology")}<ArrowIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ───────────────── Comparison ───────────────── */}
      <section id="compare" className="max-w-[960px] mx-auto px-6 py-24 scroll-mt-20">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4 text-center">{t("home.howFormulateCompares")}</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] text-center max-w-[640px] mx-auto mb-4">{t("home.builtToTellYouThe")}</h2>
          <p className="text-muted text-[17px] max-w-[560px] mx-auto text-center leading-relaxed mb-12">{t("home.calorieTrackersCountWhatYou")}</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full min-w-[620px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold text-muted px-5 py-4 w-[40%]">&nbsp;</th>
                  <th className="px-4 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 font-extrabold text-accent">
                      <span className="w-2 h-2 rounded-full bg-accent" />{" "}{t("home.formulate")}</span>
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-muted">{t("home.calorieTrackers")}</th>
                  <th className="px-4 py-4 text-center font-semibold text-muted">{t("home.influencerLists")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: t("home.scoresSupplementQualityDoseForm"), f: "yes", c: "no", i: "partial" },
                  { feat: t("home.scoresFoodOnQualityNot"), f: "yes", c: "partial", i: "no" },
                  { feat: t("home.tracksVitaminMineralCoverage"), f: "yes", c: "partial", i: "no" },
                  { feat: t("home.independentOfBrandSponsorships"), f: "yes", c: "partial", i: "no" },
                  { feat: t("home.transparentPublishedMethodology"), f: "yes", c: "no", i: "no" },
                  { feat: t("home.freeToUseNoPaywall"), f: "yes", c: "partial", i: "yes" },
                ].map((row, idx) => (
                  <tr key={row.feat} className={idx % 2 ? "bg-bg/30" : ""}>
                    <td className="px-5 py-4 text-text font-medium border-t border-border">{row.feat}</td>
                    {(["f", "c", "i"] as const).map((col) => {
                      const v = row[col];
                      const highlight = col === "f";
                      return (
                        <td key={col} className={`px-4 py-4 text-center border-t border-border ${highlight ? "bg-accent/[0.04]" : ""}`}>
                          {v === "yes" ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/15 text-accent" aria-label={t("home.yes")}>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </span>
                          ) : v === "partial" ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-warning/10 text-warning text-base font-black leading-none" aria-label={t("home.partial")}>–</span>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqLd(t)) }}
        />
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">{t("home.faq")}</div>
            <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-1px] mb-12">{t("home.commonQuestions")}</h2>
          </Reveal>
          <div className="space-y-8">
            {homeFaqs(t).map((item, i) => (
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
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4 text-center">{t("home.pricing")}</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] text-center max-w-[600px] mx-auto mb-4">{t("home.everythingForFree")}</h2>
          <p className="text-muted text-[17px] max-w-[540px] mx-auto text-center leading-relaxed mb-12">{t("home.noTiersNoTrialsNo")}</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="max-w-[460px] mx-auto rounded-2xl border border-accent/25 bg-surface p-8 relative overflow-hidden">
            <div className="absolute -top-[120px] -right-[120px] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.10)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[12px] font-bold mb-5">{t("home.freeForever")}</div>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-6xl font-black text-text leading-none">$0</span>
                <span className="text-muted text-sm mb-1.5">{t("home.forever")}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  `Browse ${SCORED_PRODUCTS_CLAIM} scored supplements — no account needed`,
                  t("home.trackFoodMealsNutrientCoverage"),
                  t("home.buildYourStackAndGet"),
                  t("home.hydrationStreaksAndProgressTracking"),
                  t("home.fullScoringMethodologyAlwaysTransparen"),
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
              >{t("home.getStartedFree")}<ArrowIcon />
              </TrackedAppLink>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────────── Featured Guides ───────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 py-24">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">{t("home.learn")}</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[700px] mb-4">{t("home.evidenceBasedHealthGuides")}</h2>
          <p className="text-muted text-[17px] max-w-[560px] leading-relaxed mb-12">{t("home.deepDivesBestOfRoundups")}</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              slug: "how-to-build-a-supplement-stack",
              category: "Guide",
              title: t("home.howToBuildASupplement"),
              desc: t("home.learnHowToPickSupplements"),
              readTime: t("home.12MinRead"),
            },
            {
              slug: "protein-guide",
              category: t("home.nutrition"),
              title: t("home.theCompleteGuideToProtein"),
              desc: t("home.howMuchProteinYouActually"),
              readTime: t("home.9MinRead"),
            },
            {
              slug: "best-sleep-supplement-protocol",
              category: t("home.protocol"),
              title: t("home.theBestSleepSupplementProtocol"),
              desc: t("home.magnesiumLTheanineAndGlycine"),
              readTime: t("home.10MinRead"),
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
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">{t("home.browseAllGuides")}<ArrowIcon className="w-3.5 h-3.5" />
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
          <h2 className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-1px] mb-4">{t("home.seeWhatS")} <span className="text-accent">{t("home.actuallyWorking")}</span>{" "}{t("home.inYourRoutine")}</h2>
          <p className="text-muted text-[17px] leading-relaxed mb-10">{t("home.scoreYourSupplementsTrackYour")}</p>
          <div className="flex gap-3.5 flex-wrap justify-center">
            <TrackedAppLink
              href={withUtm(`${APP_URL}`, { source: "landing", campaign: "home_footer_cta" })}
              source="home_footer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_-8px_rgba(0,229,160,0.5)]"
            >{t("home.openTheAppFree")}<ArrowIcon />
            </TrackedAppLink>
            <TrackedDownloadLink
              href="/download"
              source="landing_page_bottom"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
            >{t("home.requestDesktopAccess")}</TrackedDownloadLink>
          </div>
        </section>
      </Reveal>
      </div>
    </div>
  );
}
