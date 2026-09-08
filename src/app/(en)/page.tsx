import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { getMessages, translate } from "@/lib/i18n/messages";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { TrackedDownloadLink } from "@/components/tracked-download-link";
import { TrackedAppLink } from "@/components/tracked-app-link";
import { MobileAppBadges } from "@/components/mobile-app-badges";
import {
  AnimatedNumber,
} from "@/components/landing/landing-visuals";
import { BackgroundTree } from "@/components/landing/background-tree";
import { FallingLeaves } from "@/components/landing/falling-leaves";
import { HeroStackBuilder, type ScoreItem } from "@/components/landing/hero-stack-builder";
import { SectionView, SectionDepthReporter } from "@/components/landing/section-view";
import { products as catalogProducts, type Product } from "@/lib/products";
import { foods as allFoods, foodColor } from "@/lib/foods";
import { recipes as allRecipes, recipeColor } from "@/lib/recipes";
import { withUtm } from "@/lib/app-url";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { SCORED_PRODUCTS_CLAIM } from "@/lib/catalog-size";
import { scoreTierColor, scoreTierWord } from "@/lib/score-tier-color";

// The stat bar hardcoded 260 while the hero, three CTAs and the spotlight all
// read SCORED_PRODUCTS_CLAIM ("290+") — two numbers for one thing on a single
// page, which is the exact failure catalog-size.ts was written to end. It just
// never reached this call site. Derived from the claim so it cannot drift again.
const SCORED_PRODUCTS_COUNT = Number(SCORED_PRODUCTS_CLAIM.replace(/[^0-9]/g, "")) || 0;
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

// Was a local five-band map in a palette the app does not use. Now the app's
// own table, so a score found in this page's search wears the same colour when
// the visitor opens it in the product.
const scoreHex = (s: number): string => scoreTierColor(s);

// Brand-diverse, top-scored products that have a real image — powers the
// "real products, real scores" proof strip. Selected at build time (SSG).
// Recognizable stack staples for the hero mockup rows (graceful fallback to
// Trimmed, build-time search index for the interactive "score your supplement"
// hero widget — name/brand/score only, so the full 2MB catalog never ships to
// the client. Sorted so the highest-scoring match surfaces first.
/**
 * The one line that explains a product's score, pulled from the component the
 * score actually turns on.
 *
 * Prefer the LOWEST-scoring weighted component's explanation — that is what a
 * reader wants to know and it is the only thing that separates products in a
 * catalog where 91% score 80+. If the product has nothing weak, fall back to
 * its strongest component, which reads as praise rather than a shrug.
 *
 * Only weighted components are considered. Transparency, Safety and
 * Manufacturing ship at weight 0 under the V3.23+ gated model — they gate and
 * penalise rather than contribute — so quoting them would explain a number they
 * did not move.
 */
function scoreWhy(p: Product): string {
  const parts = (p.score_components ?? []).filter(
    (c): c is NonNullable<typeof c> => !!c && (c.weight ?? 0) > 0,
  );
  if (!parts.length) return "Scored on evidence, dose and form.";
  const sorted = [...parts].sort((a, b) => (a.raw_score ?? 100) - (b.raw_score ?? 100));
  const weakest = sorted[0];
  const pick = (weakest.raw_score ?? 100) < 85 ? weakest : sorted[sorted.length - 1];
  // 236 of the 628 distinct explanation strings are enumerations rather than
  // findings — "1 clinical: Magnesium", "2 good: Beet root". They are the FIRST
  // entry on most components, so taking [0] handed the reader a machine noise
  // line where a real sentence ("Excellent form quality — premium bioavailable
  // forms") was sitting right behind it. Skip the enumerations, then prefer the
  // most specific line left.
  const findings = (pick.explanations ?? []).filter(
    (e) => e && e.length > 8 && !/^\d+\s+(clinical|good|other|fair|poor)\b/i.test(e),
  );
  const line = findings.sort((a, b) => b.length - a.length)[0];
  return line ? `${pick.name}: ${line}` : `${pick.name}: ${pick.raw_score}/100`;
}

const scoreSearchIndex: ScoreItem[] = catalogProducts
  .filter((p) => p.score != null)
  .map((p) => ({
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    score: p.score as number,
    color: scoreHex(p.score as number),
    word: scoreTierWord(p.score as number) ?? "",
    why: scoreWhy(p),
    image: cardImage(p),
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

export default function Home({ locale = DEFAULT_LOCALE }: { locale?: string }) {
  const messages = getMessages(locale);
  const t: T = (key, vars) => translate(messages, key, vars);
  return (
    <div className="relative overflow-hidden">
      <BackgroundTree />
      <FallingLeaves />
      <div className="relative z-10">

      <SectionDepthReporter total={12} />
      <SectionView id="hero" depth={1} />
      {/* ───────────────── Hero ─────────────────
          Restructured 2026-09-07. The old hero led with "Know exactly what's
          working in your routine" over two CTAs, and put the live score search
          THIRD — behind the hero and a 53-second video.

          That order asks before it gives. A visitor has to have a routine, care
          that it might be wrong, and then hand over an account, all before the
          product does anything for them. The search needs none of that: it is
          the entire value proposition in one interaction, and it works on
          someone who has never heard of us.

          So the search IS the hero now. The headline sets up a question the box
          immediately answers, and the CTAs drop to secondary — they are the
          next step for someone already convinced, not the ask. The page's own
          notes record that it runs ~15 screens and that entry pages equal exit
          pages in the funnel; anything that has to be seen belongs here. */}
      <section className="relative overflow-hidden px-6 pt-24 md:pt-28 pb-14">
        {/* One soft ground wash. The old hero ran two animated radial blobs in
            mint and violet; on the warm ground they read as a screensaver. */}
        <div className="absolute -top-[220px] left-1/2 -translate-x-1/2 w-[900px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(99,201,138,0.07)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-[820px] mx-auto text-center">
          <div className="hero-animate fm-eyebrow mb-6">
            {SCORED_PRODUCTS_CLAIM} {t("home.supplementsScored")} <span className="opacity-40">·</span> {t("home.nobodyPaysToRank")}
          </div>

          <h1 className="hero-animate-delay-1 fm-display text-[clamp(34px,5.2vw,var(--text-h-hero))] mb-5">
            {t("home.heroTitleA")}<br />
            <span className="text-muted">{t("home.heroTitleB")}</span>
          </h1>

          <p className="hero-animate-delay-2 text-[17px] text-muted max-w-[560px] mx-auto leading-relaxed mb-9">
            {t("home.heroSubNew")}
          </p>

          {/* The payoff, in the first screen. */}
          <div className="hero-animate-delay-3">
            <HeroStackBuilder
              index={scoreSearchIndex}
              appUrl={APP_URL}
              /* The key is not decoration: React renders this element inside
                 the builder's children and, because it was CREATED here in Home
                 rather than there, it lands in a list position and warns
                 without one. Verified — the homepage was throwing a key error
                 on every load and is now clean. */
              emptyFooter={
                <div key="hero-empty-footer" className="hero-animate-delay-4 mt-8 flex flex-col items-center gap-4">
                  <p className="text-[12px] text-muted/70">{t("home.heroSearchNote")}</p>
                  <div className="flex gap-3 flex-wrap justify-center">
                    <TrackedStartLink
                      source="home_hero"
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[16px] font-semibold bg-accent text-bg hover:brightness-110 hover:-translate-y-0.5 transition-all"
                    >
                      {t("home.buildMyFreeStack")}
                      <ArrowIcon />
                    </TrackedStartLink>
                    <TrackedAppLink
                      href={withUtm(`${APP_URL}`, { source: "landing", campaign: "home_hero_open" })}
                      source="home_hero"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[16px] font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
                    >
                      {t("home.openTheApp")}
                    </TrackedAppLink>
                  </div>
                  {/* The iPhone app ships and out-converts the web signup
                      roughly 2:1 on first run, so it stays above the footer. */}
                  <MobileAppBadges source="home_hero" size="sm" />
                  <span className="text-[12px] text-muted/60">{t("home.freeForeverNoAccountNeeded")}</span>
                </div>
              }
            />
          </div>
        </div>
      </section>

      <SectionView id="problem" depth={2} />
      {/* ───────────────── Problem stats (every claim sourced) ─────────────────
          Moved up 2026-09-07, from screen 11 to screen 2. "Zero safety or
          effectiveness reviews are required before a supplement is sold" is a
          sourced fact about US law and the most arresting line on the page, and
          it sat below the fold-line this page's own funnel notes say nobody
          reaches. It is the reason to CARE, so it now runs before the reason
          to TRUST. */}
      <Reveal>
        <section className="max-w-[880px] mx-auto px-6 py-24 text-center">
          <h2 className="fm-display text-[clamp(24px,3.5vw,var(--text-h-argument))] mb-4">{t("home.theSupplementIndustryMakesIt")} <span className="text-danger">{t("home.hardToKnow")}</span>{" "}{t("home.whatSActuallyGood")}</h2>
          <p className="text-muted text-[16px] max-w-[560px] mx-auto leading-relaxed mb-12">{t("home.notScareStatsVerifiableFacts")}</p>
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

      <SectionView id="trust" depth={3} />
      {/* ───────────────── Why you can trust the score ─────────────────
          Moved up 2026-09-07, from below the proof strip to directly under the
          hero. The search hands a visitor a number in the first screen; the very
          next question a sceptical person asks is "says who?" — and the answer
          to it was six screens down, past the fold-line the page's own funnel
          notes say nobody reaches. Scoring criteria and "no brand pays" are the
          only claims here a competitor cannot copy, so they lead. */}
      <Reveal>
        <section className="max-w-[1100px] mx-auto px-6 pb-24">
          <div className="text-center mb-10">
            <div className="fm-eyebrow mb-3">{t("home.whyYouCanTrustThe")}</div>
            <h2 className="fm-display text-[clamp(24px,3.5vw,var(--text-h-argument))] max-w-[700px] mx-auto mb-4">{t("home.builtOnTheStandardsA")} <span className="text-muted">{t("home.notSponsorships")}</span>
            </h2>
            <p className="text-muted text-[16px] max-w-[620px] mx-auto leading-relaxed">{t("home.everyProductRunsThroughThe")}</p>
          </div>

          {/* Corrected 2026-09-07 against the shipped catalog: this block used
             to advertise 25/20/20/15/10/10 across six weighted factors, while
             all 303 scored products at score_version 3.23/3.24 actually run
             Evidence 40 / Dose 35 / Form 25, with Manufacturing, Transparency
             and Safety at weight ZERO because V3.23 made them gates that deduct
             (23 products carry a score_gate_penalty).

             The first correction rendered those three as the word "gate", which
             is our vocabulary, not a reader's — six cards where three showed a
             percentage and three showed a word that looks like a missing value.
             Split into two labelled groups instead: the split IS the
             explanation, so no jargon has to carry it. */}
          <div className="space-y-6 mb-8">
            <div>
              <div className="fm-eyebrow mb-2.5">{t("home.scoredFactors")}</div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { w: "40%", n: t("home.clinicalEvidence") },
                  { w: "35%", n: t("home.doseAccuracy") },
                  { w: "25%", n: t("home.bioavailability") },
                ].map((f) => (
                  <div key={f.n} className="fm-panel p-4 text-center">
                    <div className="fm-figure text-accent">{f.w}</div>
                    <div className="text-[12px] text-muted mt-1.5 leading-tight">{f.n}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="fm-eyebrow mb-2.5">{t("home.gateFactors")}</div>
              <div className="grid grid-cols-3 gap-3">
                {[t("home.manufacturing"), t("home.transparency"), t("home.safety")].map((n) => (
                  <div key={n} className="fm-panel p-4 text-center">
                    {/* Name first here, not a number: these have no number, and
                        inverting the hierarchy is what stops the card looking
                        like a percentage that failed to load. */}
                    <div className="text-[16px] font-semibold text-text leading-tight">{n}</div>
                    <div className="text-[11px] text-muted/70 mt-1.5">{t("home.mustPass")}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-[760px] mx-auto rounded-2xl bg-surface border border-border p-6 text-center">
            <p className="text-[16px] text-text leading-relaxed mb-2">{t("home.weReadTheCredentialsThat")} <span className="font-semibold text-text">{t("home.nsf")}</span>,{" "}
              <span className="font-semibold text-text">{t("home.uspVerified")}</span>, <span className="font-semibold text-text">{t("home.informedSport")}</span>{t("home.thirdPartyCoasAlongsidePeer")}</p>
            <p className="text-[12px] text-muted">{t("home.noBrandPaysToBe")}</p>
            <Link
              href="/methodology/supplements"
              className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
            >{t("home.seeTheFullMethodology")}<ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </Reveal>


      <SectionView id="stats" depth={4} />
      {/* ───────────────── Animated stat bar ───────────────── */}
      <Reveal>
        <div className="max-w-[1000px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border">
            {[
              { node: <><AnimatedNumber value={SCORED_PRODUCTS_COUNT} />+</>, label: "Supplements scored" },
              { node: <><AnimatedNumber value={600} />+</>, label: t("home.wholeFoodsMeals") },
              { node: <><AnimatedNumber value={26} />+</>, label: t("home.nutrientsTrackedDaily") },
              { node: <>$<AnimatedNumber value={0} /></>, label: t("home.costAlwaysFree") },
            ].map((s) => (
              <div key={s.label} className="bg-surface px-4 py-7 text-center">
                <div className="text-[clamp(26px,4vw,38px)] font-black text-text">
                  {s.node}
                </div>
                <div className="text-[12px] md:text-[12px] text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <SectionView id="platform" depth={5} />
      {/* ───────────────── Platform pillars ───────────────── */}
      <section id="features" className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="fm-eyebrow mb-4 text-center">{t("home.thePlatform")}</div>
          <h2 className="fm-display text-[clamp(24px,3.5vw,var(--text-h-argument))] text-center max-w-[760px] mx-auto mb-4">{t("home.oneAppForEverythingYou")}</h2>
          <p className="text-muted text-[17px] max-w-[600px] mx-auto text-center leading-relaxed mb-14">{t("home.mostAppsTrackCaloriesFormulate")}</p>
        </Reveal>
        {/* Six emoji in accent-tinted rounded squares, each scaling on hover,
            was the loudest remaining piece of the old page — the same
            kids-app register the app itself has been moving away from, and a
            layout indistinguishable from every other SaaS feature grid. The
            content is unchanged; it is now set in the app's own primitives, so
            a visitor crossing from here into the product sees one language. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: t("home.supplementScoring"), desc: t("home.everyProductScored50100") },
            { title: t("home.foodMealTracking"), desc: t("home.logWholeFoodsBrandedItems") },
            { title: t("home.nutrientCoverage"), desc: t("home.seeExactlyWhichOf26") },
            { title: t("home.yourStackScore"), desc: t("home.aSinglePersonalizedScoreFor") },
            { title: t("home.hydrationHabits"), desc: t("home.trackWaterBuildStreaksAnd") },
            { title: t("home.progressJourney"), desc: t("home.levelUpAcrossHealthPillars") },
          ].map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90}>
              <div className="fm-panel p-6 h-full transition-colors hover:border-accent/25">
                <div className="fm-eyebrow mb-3">{String(i + 1).padStart(2, "0")}</div>
                <div className="fm-display text-[length:var(--text-title)] mb-2">{f.title}</div>
                <div className="text-[14px] text-muted leading-relaxed">{f.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionView id="foods" depth={6} />
      {/* ───────────────── Foods & recipes scored (proof + internal links) ───────────────── */}
      <Reveal>
        <section className="max-w-[1100px] mx-auto px-6 pb-24">
          <div className="text-center mb-10">
            <div className="fm-eyebrow mb-3">{t("home.foodsRecipesScoredToo")}</div>
            <h2 className="fm-display text-[clamp(24px,3.5vw,var(--text-h-argument))] max-w-[680px] mx-auto">{t("home.notJustSupplements")} <span className="text-muted">{t("home.yourWholePlateScored")}</span>
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
      </div>

      <SectionView id="how_it_works" depth={7} />
      {/* ───────────────── How it works ───────────────── */}
      <div id="how" className="bg-surface border-t border-b border-border py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <div className="fm-eyebrow mb-4">{t("home.howItWorks")}</div>
            <h2 className="fm-display text-[clamp(24px,3.5vw,var(--text-h-argument))] max-w-[600px] mb-14">{t("home.fromConfusionToClarityIn")}</h2>
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

      <SectionView id="comparison" depth={8} />
      {/* ───────────────── Comparison ───────────────── */}
      <section id="compare" className="max-w-[960px] mx-auto px-6 py-24 scroll-mt-20">
        <Reveal>
          <div className="fm-eyebrow mb-4 text-center">{t("home.howFormulateCompares")}</div>
          <h2 className="fm-display text-[clamp(24px,3.5vw,var(--text-h-argument))] text-center max-w-[640px] mx-auto mb-4">{t("home.builtToTellYouThe")}</h2>
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

      <SectionView id="faq" depth={9} />
      {/* ───────────────── FAQ ───────────────── */}
      <section className="bg-surface border-t border-b border-border py-24 px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqLd(t)) }}
        />
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <div className="fm-eyebrow mb-4">{t("home.faq")}</div>
            <h2 className="fm-display text-[clamp(20px,2.6vw,var(--text-h-section))] mb-10">{t("home.commonQuestions")}</h2>
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

      <SectionView id="pricing" depth={10} />
      {/* ───────────────── Pricing ───────────────── */}
      <section id="pricing" className="max-w-[1100px] mx-auto px-6 py-24 scroll-mt-20">
        <Reveal>
          <div className="fm-eyebrow mb-4 text-center">{t("home.pricing")}</div>
          <h2 className="fm-display text-[clamp(20px,2.6vw,var(--text-h-section))] text-center max-w-[600px] mx-auto mb-10">{t("home.everythingForFree")}</h2>

        </Reveal>
        <Reveal delay={120}>
          <div className="max-w-[460px] mx-auto rounded-2xl border border-accent/25 bg-surface p-8 relative overflow-hidden">
            <div className="absolute -top-[120px] -right-[120px] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.10)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[12px] font-bold mb-5">{t("home.freeForever")}</div>
              <div className="flex items-end gap-2 mb-6">
                <span className="fm-figure text-[length:var(--text-display)] leading-none">$0</span>
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

      <SectionView id="guides" depth={11} />
      {/* ───────────────── Featured Guides ───────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 py-24">
        <Reveal>
          <div className="fm-eyebrow mb-4">{t("home.learn")}</div>
          <h2 className="fm-display text-[clamp(20px,2.6vw,var(--text-h-section))] max-w-[700px] mb-10">{t("home.evidenceBasedHealthGuides")}</h2>

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
                  <span className="text-[11px] font-bold tracking-[1.5px] uppercase text-accent">{guide.category}</span>
                  <span className="text-[11px] text-muted">{guide.readTime}</span>
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

      <SectionView id="final_cta" depth={12} />
      {/* ───────────────── Final CTA ───────────────── */}
      <Reveal>
        <section className="py-24 px-6 text-center max-w-[680px] mx-auto flex flex-col items-center">
          <h2 className="fm-display text-[clamp(24px,3.5vw,var(--text-h-argument))] mb-4">{t("home.seeWhatS")} <span className="text-accent">{t("home.actuallyWorking")}</span>{" "}{t("home.inYourRoutine")}</h2>
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
