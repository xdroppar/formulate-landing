import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ScoreBar } from "@/components/score-bar";

const APP_URL = "https://app.formulate-health.app";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[100px] -right-[200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,109,250,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="hero-animate inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[13px] font-semibold mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Now live — 230+ products scored
        </div>

        <h1 className="hero-animate-delay-1 text-[clamp(42px,7vw,80px)] font-black leading-[1.05] tracking-[-2px] max-w-[900px] mb-6">
          Stop guessing which
          <br />
          <em className="not-italic text-accent">supplements work.</em>
        </h1>

        <p className="hero-animate-delay-2 text-[clamp(16px,2vw,20px)] text-muted max-w-[560px] leading-relaxed mb-10">
          Every supplement scored 50–100 against clinical research. Check doses,
          compare brands, and build a stack you can actually trust.
        </p>

        <div className="hero-animate-delay-3 flex flex-col items-center gap-4 mb-16 w-full">
          <div className="flex gap-3.5 flex-wrap justify-center">
            <a
              href={`${APP_URL}/catalog`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
            >
              Browse Supplement Scores
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
            >
              Download Desktop App
            </Link>
          </div>
          <span className="text-[13px] text-muted/60">Free forever. No account required to browse.</span>
        </div>

        <div className="hero-animate-delay-4 flex gap-6 sm:gap-12 flex-wrap justify-center">
          {[
            ["230+", "Products scored"],
            ["12+", "Brands analyzed"],
            ["0", "Brand sponsorships"],
            ["Free", "Always"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-[28px] font-extrabold text-text">
                {num.replace(/[+%.]/g, "")}
                <span className="text-accent">{num.match(/[+%.]/)?.[0] ?? ""}</span>
              </div>
              <div className="text-[13px] text-muted mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product showcase */}
      <Reveal>
        <div className="px-6 pb-24 flex justify-center">
          <div className="w-full max-w-[1000px]">
            <p className="text-center text-sm text-muted mb-6">
              Real scores from the Formulate catalog
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
              {[
                { score: 94, name: "Creatine Monohydrate", brand: "Thorne", hex: "#10B981", img: "/images/products/thorne/thorne-creatine/primary.webp", slug: "thorne-creatine" },
                { score: 88, name: "Magnesium Bisglycinate", brand: "Thorne", hex: "#3B82F6", img: "/images/products/thorne/thorne-magnesium-bisglycinate/primary.webp", slug: "thorne-magnesium-bisglycinate" },
                { score: 82, name: "Vitamin D 5,000 IU", brand: "Thorne", hex: "#3B82F6", img: "/images/products/thorne/thorne-vitamin-d-5000/primary.webp", slug: "thorne-vitamin-d-5000" },
                { score: 73, name: "Tongkat Ali 10%", brand: "Nootropics Depot", hex: "#F59E0B", img: "/images/products/nootropics-depot/tongkat-ali/primary.jpg", slug: "nootropics-depot-tongkat-ali" },
                { score: 85, name: "L-Theanine", brand: "Nootropics Depot", hex: "#3B82F6", img: "/images/products/nootropics-depot/l-theanine/primary.jpg", slug: "nootropics-depot-l-theanine" },
              ].map((card, i) => (
                <a
                  key={card.name}
                  href={`${APP_URL}/catalog/${card.slug}`}
                  className={`bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:-translate-y-1 transition-all ${i >= 3 ? "hidden md:block" : ""} ${i === 2 ? "hidden sm:block" : ""}`}
                >
                  <div className="relative aspect-square bg-surface2 flex items-center justify-center p-4">
                    <Image src={card.img} alt={card.name} width={140} height={140} className="object-contain max-h-[120px]" />
                    <div
                      className="absolute top-2.5 right-2.5 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2"
                      style={{ color: card.hex, borderColor: card.hex, backgroundColor: `${card.hex}15` }}
                    >
                      {card.score}
                    </div>
                  </div>
                  <div className="p-3.5">
                    <div className="text-[13px] font-semibold text-text truncate" title={card.name}>{card.name}</div>
                    <div className="text-[11px] text-muted truncate">{card.brand}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="https://app.formulate-health.app/catalog" className="text-sm font-medium text-accent hover:underline">
                Browse all 230+ scored products →
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Problem section */}
      <Reveal>
        <section className="max-w-[800px] mx-auto px-6 py-24 text-center">
          <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold tracking-[-1px] mb-6">
            The supplement industry makes it <span className="text-danger">hard to know</span> what&apos;s actually good.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              { stat: "73%", desc: "of supplements have at least one misleading label claim" },
              { stat: "46%", desc: "of products tested don\u2019t match their label doses" },
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

      {/* Without vs With comparison */}
      <Reveal>
        <section className="max-w-[900px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Without */}
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
              <div className="text-xs font-bold tracking-[2px] uppercase text-danger/80 mb-5">✕ Without Formulate</div>
              <ul className="space-y-4">
                {[
                  "Hours reading Reddit threads and blog posts",
                  "No way to verify dose claims on labels",
                  "Trusting influencer recommendations",
                  "Buying based on Amazon star ratings",
                  "No idea if ingredients are bioavailable",
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
            {/* With */}
            <div className="bg-surface border border-accent/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute -top-[100px] -right-[100px] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.06)_0%,transparent_70%)] pointer-events-none" />
              <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-5">✓ With Formulate</div>
              <ul className="space-y-4">
                {[
                  "Every product scored in seconds, not hours",
                  "Dose accuracy verified against clinical data",
                  "Scores based on evidence, not sponsorships",
                  "Brand rankings from actual product analysis",
                  "Bioavailability and ingredient forms checked",
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

      {/* Brands strip */}
      <Reveal>
        <div className="max-w-[1000px] mx-auto px-6 pb-24">
          <p className="text-center text-xs font-bold tracking-[2px] uppercase text-muted/60 mb-8">Brands we score</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: "Thorne", src: "/images/brands/thorne.png" },
              { name: "Nootropics Depot", src: "/images/brands/nootropics-depot.png" },
              { name: "Momentous", src: "/images/brands/momentous.png" },
              { name: "Transparent Labs", src: "/images/brands/transparent-labs.png" },
              { name: "Seed", src: "/images/brands/seed.jpg" },
              { name: "Complement", src: "/images/brands/complement.png" },
            ].map((brand) => (
              <div key={brand.name} className="group flex flex-col items-center gap-3 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all py-4 px-3">
                <div className="h-10 flex items-center justify-center">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={100}
                    height={40}
                    className="object-contain max-h-[36px] w-auto opacity-50 group-hover:opacity-90 transition-opacity"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-muted/50 group-hover:text-muted transition-colors">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Features — value stories */}
      <div id="features">
        <div className="max-w-[1100px] mx-auto px-6 py-24">
          <Reveal>
            <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">What Formulate does</div>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[700px] mb-14">
              Clinical-grade analysis. <span className="text-muted">Instantly.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🔬",
                title: "Score any supplement in seconds",
                desc: "Every product is scored 50–100 across ingredient quality, dose accuracy, bioavailability, third-party testing, and clinical evidence. No guesswork.",
                example: "\"Is this magnesium actually dosed correctly?\" → Check the score.",
              },
              {
                icon: "⚠️",
                title: "Catch problems before you buy",
                desc: "We flag underdosed ingredients, dangerous upper limits, proprietary blends hiding weak doses, and misleading label claims.",
                example: "\"This pre-workout has 3x the safe daily limit of B6.\" → Flagged.",
              },
              {
                icon: "📊",
                title: "Compare brands with real data",
                desc: "Brand scores are calculated from their product data — not reviews, not ads, not influencer deals. See which brands consistently deliver.",
                example: "\"Thorne vs NOW vs Jarrow for magnesium?\" → Compared.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="bg-surface border border-border rounded-2xl p-7 hover:border-accent/30 hover:-translate-y-0.5 transition-all h-full">
                  <div className="w-11 h-11 rounded-[10px] bg-accent/10 border border-accent/20 flex items-center justify-center text-xl mb-4">{f.icon}</div>
                  <div className="text-base font-bold mb-2">{f.title}</div>
                  <div className="text-sm text-muted leading-relaxed mb-4">{f.desc}</div>
                  <div className="text-[13px] text-accent/80 italic">{f.example}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Sample score breakdown */}
      <Reveal>
        <section className="max-w-[900px] mx-auto px-6 py-24">
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4 text-center">Example score</div>
          <h2 className="text-[clamp(24px,4vw,36px)] font-extrabold tracking-[-1px] mb-12 text-center">
            What a score breakdown looks like
          </h2>
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            {/* Product header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 md:p-8 border-b border-border">
              <div className="w-20 h-20 rounded-xl bg-surface2 flex items-center justify-center flex-shrink-0">
                <Image src="/images/products/thorne/thorne-creatine/primary.webp" alt="Creatine Monohydrate" width={64} height={64} className="object-contain" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="text-lg font-bold">Creatine Monohydrate</div>
                <div className="text-sm text-muted">Thorne</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-5xl font-black text-[#10B981]">94</div>
                <div className="text-xs text-muted leading-tight">out of<br/>100</div>
              </div>
            </div>
            {/* Score bars */}
            <div className="p-6 md:p-8 space-y-5">
              {[
                { label: "Ingredient Quality", score: 96, desc: "Pure creatine monohydrate — the most studied form", color: "#EF4444" },
                { label: "Dose Accuracy", score: 95, desc: "5g per serving matches clinical effective dose", color: "#4CAF50" },
                { label: "Label Transparency", score: 98, desc: "Full disclosure, no proprietary blends", color: "#9C27B0" },
                { label: "Third-Party Testing", score: 90, desc: "NSF Certified for Sport", color: "#00BCD4" },
                { label: "Bioavailability", score: 92, desc: "Micronized for improved absorption", color: "#2196F3" },
              ].map((item) => (
                <ScoreBar key={item.label} {...item} />
              ))}
            </div>
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <a
                href={`${APP_URL}/catalog`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                See scores for 230+ products
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* How it works */}
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
              { num: "01", title: "Search any product", desc: "Look up any supplement by name, brand, or ingredient. 230+ products across top brands." },
              { num: "02", title: "Read the score breakdown", desc: "See exactly why it scored the way it did — dose accuracy, ingredient quality, clinical backing, and more." },
              { num: "03", title: "Build your stack", desc: "Add the best products to your personal stack. Track what you take and see your overall stack score." },
              { num: "04", title: "Buy with confidence", desc: "Know you're getting the best product for your goals and budget before you spend a dollar." },
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

      {/* Use cases */}
      <section className="max-w-[1100px] mx-auto px-6 py-24">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">Use cases</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[700px] mb-14">
            Built for anyone who takes supplements <span className="text-muted">seriously.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              emoji: "🏋️",
              who: "Athletes",
              what: "Check if your pre-workout is actually dosed or just caffeine with fairy dust",
            },
            {
              emoji: "🧬",
              who: "Longevity optimizers",
              what: "Build an evidence-based stack for healthspan — not a TikTok stack",
            },
            {
              emoji: "🤔",
              who: "Skeptical buyers",
              what: "See which brands are legit before spending $60 on a bottle of capsules",
            },
            {
              emoji: "👩‍⚕️",
              who: "Health practitioners",
              what: "Quick reference for ingredient quality and dose safety when advising clients",
            },
          ].map((uc, i) => (
            <Reveal key={uc.who} delay={i * 80}>
              <div className="bg-surface border border-border rounded-xl p-6 h-full">
                <div className="text-2xl mb-3">{uc.emoji}</div>
                <div className="text-sm font-bold mb-2">{uc.who}</div>
                <div className="text-sm text-muted leading-relaxed">{uc.what}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Methodology / Trust */}
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
            <a
              href={`${APP_URL}/methodology`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Read our full scoring methodology
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
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
                a: "Yes. The web app and desktop app are both free to use. We generate revenue through affiliate links when you choose to buy a product — but affiliate relationships never affect scores.",
              },
              {
                q: "How do you score supplements?",
                a: "Each product is evaluated across multiple factors including ingredient quality, dose accuracy, bioavailability, third-party testing, label transparency, and clinical evidence. Scores range from 50–100 — anything below 50 would indicate a potentially harmful product.",
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
                q: "What brands do you cover?",
                a: "We currently score 230+ products across brands including Thorne, Nootropics Depot, Momentous, Seed, and more. We're adding new brands regularly.",
              },
              {
                q: "Do I need an account?",
                a: "No. You can browse the full catalog and every product score without creating an account. An account is only needed if you want to build and save a personal stack.",
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

      {/* Featured Guides */}
      <section className="max-w-[1100px] mx-auto px-6 py-24">
        <Reveal>
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">Learn</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[700px] mb-4">
            Evidence-based supplement guides
          </h2>
          <p className="text-muted text-[17px] max-w-[560px] leading-relaxed mb-12">
            Deep-dives, best-of roundups, and stacking protocols — every recommendation backed by clinical research.
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
              slug: "best-creatine-supplements",
              category: "Roundup",
              title: "Best Creatine Supplements in 2026",
              desc: "We scored 8 creatine supplements on dose accuracy, purity, and bioavailability. No sponsorships, just data.",
              readTime: "8 min read",
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
                  <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-accent">
                    {guide.category}
                  </span>
                  <span className="text-[10px] text-muted">{guide.readTime}</span>
                </div>
                <h3 className="text-base font-bold leading-snug mb-2 group-hover:text-accent transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{guide.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-8">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Browse all guides
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <Reveal>
        <section className="py-24 px-6 text-center max-w-[640px] mx-auto flex flex-col items-center">
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-4">
            See how your supplements <span className="text-accent">actually</span> score.
          </h2>
          <p className="text-muted text-[17px] leading-relaxed mb-10">
            Search any product. Get the score. Make better decisions.
          </p>
          <div className="flex gap-3.5 flex-wrap justify-center">
            <a
              href={`${APP_URL}/catalog`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
            >
              Browse Supplement Scores
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
            >
              Download for Windows
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
