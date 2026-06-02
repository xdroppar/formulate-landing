import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { TrackedDownloadLink } from "@/components/tracked-download-link";
import { NewsletterSignup } from "@/components/newsletter-signup";
import {
  AnimatedNumber,
  HeroPreview,
  ScoreBreakdownPreview,
  NutrientCoveragePreview,
  MealLogPreview,
  JourneyPreview,
} from "@/components/landing/landing-visuals";
import { withUtm } from "@/lib/app-url";

const APP_URL = "https://app.formulate-health.app";

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
    <>
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
              Supplements · Food · Nutrients — all in one app
            </div>

            <h1 className="hero-animate-delay-1 text-[clamp(40px,6vw,68px)] font-black leading-[1.04] tracking-[-2px] mb-6">
              Know exactly what&apos;s
              <br />
              <span className="text-gradient">working in your body.</span>
            </h1>

            <p className="hero-animate-delay-2 text-[clamp(16px,2vw,20px)] text-muted max-w-[520px] mx-auto lg:mx-0 leading-relaxed mb-9">
              Score your supplements against clinical research, track your food and meals,
              and watch your nutrient coverage fill in — all in one free app built for
              longevity, not marketing.
            </p>

            <div className="hero-animate-delay-3 flex flex-col items-center lg:items-start gap-4">
              <div className="flex gap-3.5 flex-wrap justify-center lg:justify-start">
                <a
                  href={withUtm(`${APP_URL}`, { source: "landing", campaign: "home_hero" })}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_-8px_rgba(0,229,160,0.5)]"
                >
                  Open the app — free
                  <ArrowIcon />
                </a>
                <a
                  href={withUtm(`${APP_URL}/catalog`, { source: "landing", campaign: "home_hero_catalog" })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
                >
                  Browse supplement scores
                </a>
              </div>
              <span className="text-[13px] text-muted/60">Free forever · No account needed to browse · No brand sponsorships</span>
            </div>
          </div>

          {/* animated preview */}
          <div className="hero-animate-delay-4">
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* ───────────────── Animated stat bar ───────────────── */}
      <Reveal>
        <div className="max-w-[1000px] mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border">
            {[
              { node: <><AnimatedNumber value={230} />+</>, label: "Supplements scored" },
              { node: <><AnimatedNumber value={600} />+</>, label: "Whole foods & meals" },
              { node: <><AnimatedNumber value={31} /></>, label: "Nutrients tracked daily" },
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
            { icon: "🎯", title: "Nutrient coverage", desc: "See exactly which of 31 key nutrients you hit each day — combining your supplements and your diet." },
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
          body="Every supplement is scored 50–100 across five factors that actually determine whether it works. No star ratings, no influencer hype — just clinical data."
          bullets={[
            "Dose accuracy checked against effective clinical ranges",
            "Ingredient forms graded for bioavailability",
            "Underdosed blends and unsafe limits flagged automatically",
            "Brand scores derived from product data — never sponsorships",
          ]}
          href={withUtm(`${APP_URL}/catalog`, { source: "landing", campaign: "spotlight_scores" })}
          cta="Browse 230+ scored products"
          preview={<ScoreBreakdownPreview />}
        />
      </div>

      <div className="bg-surface border-t border-b border-border">
        <Spotlight
          flip
          eyebrow="Nutrient coverage"
          title={<>Fill in the gaps your <span className="text-muted">diet leaves behind.</span></>}
          body="Formulate combines what you eat and what you supplement into one live picture of your daily nutrition — so you know exactly where you're covered and where you're short."
          bullets={[
            "31 key nutrients tracked from supplements + meals together",
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

      {/* ───────────────── Problem stats ───────────────── */}
      <Reveal>
        <section className="max-w-[800px] mx-auto px-6 py-24 text-center">
          <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold tracking-[-1px] mb-6">
            The wellness industry makes it <span className="text-danger">hard to know</span> what&apos;s actually good.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              { stat: "73%", desc: "of supplements have at least one misleading label claim" },
              { stat: "46%", desc: "of products tested don’t match their label doses" },
              { stat: "84%", desc: "of brand recommendations online are paid sponsorships" },
            ].map((item) => (
              <Reveal key={item.stat} delay={100}>
                <div className="bg-surface border border-border rounded-xl p-6">
                  <div className="text-3xl font-black text-accent mb-2">{item.stat}</div>
                  <div className="text-sm text-muted leading-relaxed">{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ───────────────── Without vs With ───────────────── */}
      <Reveal>
        <section className="max-w-[900px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
              <div className="text-xs font-bold tracking-[2px] uppercase text-danger/80 mb-5">✕ Without Formulate</div>
              <ul className="space-y-4">
                {[
                  "Hours reading Reddit threads and blog posts",
                  "No way to verify dose claims on labels",
                  "Counting calories with no idea about quality",
                  "Guessing which nutrients you're missing",
                  "Trusting influencer recommendations",
                  "Overpaying for underdosed products",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                    <svg className="w-4 h-4 text-danger/60 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface border border-accent/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute -top-[100px] -right-[100px] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.06)_0%,transparent_70%)] pointer-events-none" />
              <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-5">✓ With Formulate</div>
              <ul className="space-y-4">
                {[
                  "Every product scored in seconds, not hours",
                  "Dose accuracy verified against clinical data",
                  "Food scored on quality, not just calorie count",
                  "Live nutrient coverage from supps + diet",
                  "Scores based on evidence, not sponsorships",
                  "Best value per category clearly identified",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text leading-relaxed">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ───────────────── Brands marquee ───────────────── */}
      <Reveal>
        <div className="max-w-[1100px] mx-auto px-6 pb-24">
          <p className="text-center text-xs font-bold tracking-[2px] uppercase text-muted/60 mb-8">Brands we score — objectively</p>
          <div className="marquee-mask overflow-hidden">
            <div className="marquee-track gap-3">
              {[
                { name: "Momentous", src: "/images/brands/momentous.png" },
                { name: "Transparent Labs", src: "/images/brands/transparent-labs.png" },
                { name: "AG1", src: "/images/brands/ag1.png" },
                { name: "Nordic Naturals", src: "/images/brands/nordic-naturals.png" },
                { name: "Ritual", src: "/images/brands/ritual.png" },
                { name: "Garden of Life", src: "/images/brands/garden-of-life.png" },
                { name: "Solgar", src: "/images/brands/solgar.png" },
              ].concat([
                { name: "Momentous", src: "/images/brands/momentous.png" },
                { name: "Transparent Labs", src: "/images/brands/transparent-labs.png" },
                { name: "AG1", src: "/images/brands/ag1.png" },
                { name: "Nordic Naturals", src: "/images/brands/nordic-naturals.png" },
                { name: "Ritual", src: "/images/brands/ritual.png" },
                { name: "Garden of Life", src: "/images/brands/garden-of-life.png" },
                { name: "Solgar", src: "/images/brands/solgar.png" },
              ]).map((brand, idx) => (
                <div key={`${brand.name}-${idx}`} className="shrink-0 w-[180px] flex flex-col items-center gap-3 rounded-xl bg-surface border border-border py-4 px-3">
                  <div className="h-10 flex items-center justify-center">
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      width={100}
                      height={40}
                      className="object-contain max-h-[36px] w-auto opacity-50"
                      style={{ filter: "brightness(0) invert(1)", mixBlendMode: "screen" }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-muted/50">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">FAQ</div>
            <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-1px] mb-12">
              Common questions
            </h2>
          </Reveal>
          <div className="space-y-8">
            {[
              {
                q: "Is Formulate really free?",
                a: "Yes. The web app is completely free to use — score supplements, track food, and build your stack. We generate revenue through affiliate links when you choose to buy a product, but affiliate relationships never affect scores.",
              },
              {
                q: "Is this just for supplements?",
                a: "No. Formulate started with supplement scoring but is now a full nutrition platform: track whole foods and meals, monitor 31 key nutrients across your diet and supplements, log hydration, and watch your progress over time.",
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
            ].map((item, i) => (
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
                  "Browse 230+ scored supplements — no account needed",
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
              <a
                href={withUtm(`${APP_URL}`, { source: "landing", campaign: "home_pricing" })}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
              >
                Get started — free
                <ArrowIcon />
              </a>
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
            <a
              href={withUtm(`${APP_URL}`, { source: "landing", campaign: "home_footer_cta" })}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_-8px_rgba(0,229,160,0.5)]"
            >
              Open the app — free
              <ArrowIcon />
            </a>
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
    </>
  );
}
