import Link from "next/link";

const APP_URL = "https://app.formulate-health.app";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,229,160,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[100px] -right-[200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,109,250,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[13px] font-semibold mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Now live
        </div>

        <h1 className="text-[clamp(42px,7vw,80px)] font-black leading-[1.05] tracking-[-2px] max-w-[900px] mb-6">
          Your supplement stack,
          <br />
          <em className="not-italic text-accent">finally optimized.</em>
        </h1>

        <p className="text-[clamp(16px,2vw,20px)] text-muted max-w-[580px] leading-relaxed mb-10">
          Formulate scores every supplement against clinical research, flags
          unsafe doses, and builds your perfect longevity stack — so you stop
          guessing and start thriving.
        </p>

        <div className="flex flex-col items-center gap-4 mb-16 w-full">
          <div className="flex gap-3.5 flex-wrap justify-center">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
            >
              Download for Windows
            </Link>
            <a
              href={`${APP_URL}/catalog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
            >
              Browse Catalog
            </a>
          </div>
        </div>

        <div className="flex gap-12 flex-wrap justify-center">
          {[
            ["500+", "Products scored"],
            ["12+", "Top brands"],
            ["100%", "Evidence-based"],
            ["Free.", "Always"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-[28px] font-extrabold text-text">
                {num.replace(/[+%.]/g, "")}<span className="text-accent">{num.match(/[+%.]/)?.[0]}</span>
              </div>
              <div className="text-[13px] text-muted mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mockup */}
      <div className="px-6 pb-24 flex justify-center">
        <div className="w-full max-w-[900px] bg-surface border border-border rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="px-5 py-3.5 bg-surface2 border-b border-border flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
          </div>
          <div className="p-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { score: 94, name: "Creatine Monohydrate", brand: "Thorne", hex: "#10B981" },
              { score: 88, name: "Magnesium Glycinate", brand: "Thorne", hex: "#3B82F6" },
              { score: 73, name: "Tongkat Ali", brand: "Nootropics Depot", hex: "#F59E0B" },
              { score: 61, name: "Omega-3 Fish Oil", brand: "Nootropics Depot", hex: "#F97316" },
              { score: 54, name: "Daily Greens", brand: "Complement", hex: "#EF4444" },
            ].map((card) => (
              <div key={card.name} className="bg-surface2 border border-border rounded-[14px] p-5">
                <div className="text-4xl font-black mb-1" style={{ color: card.hex }}>{card.score}</div>
                <div className="text-[13px] font-semibold text-text mb-1">{card.name}</div>
                <div className="text-[11px] text-muted">{card.brand}</div>
                <div className="mt-3.5 h-1 bg-white/5 rounded-sm">
                  <div className="h-full rounded-sm" style={{ width: `${card.score}%`, backgroundColor: card.hex }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features">
        <div className="max-w-[1100px] mx-auto px-6 py-24">
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">Why Formulate</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[600px] mb-4">
            Not all supplements are created equal.
          </h2>
          <p className="text-muted text-[17px] max-w-[480px] leading-relaxed mb-14">
            We do the research so you don&apos;t have to. Every score is built on clinical evidence, third-party testing, and dose safety.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🔬", title: "Evidence-based scoring", desc: "Every product gets a score from 0–100 based on ingredient quality, dose accuracy, bioavailability, and clinical backing." },
              { icon: "⚠️", title: "Dose safety checks", desc: "We flag products with underdosed ingredients, dangerous upper limits, or misleading label claims before they reach your stack." },
              { icon: "🧬", title: "Your personal stack", desc: "Track what you take, see your stack score, and get recommendations tailored to your longevity goals." },
              { icon: "📦", title: "500+ products catalogued", desc: "Thorne, Nootropics Depot, Complement, Seed, and more — all scored, compared, and ranked in one place." },
              { icon: "🏆", title: "Brand trust ratings", desc: "Know which brands consistently deliver on their promises — and which ones don't. Brand scores are derived from product data, not ads." },
              { icon: "🌐", title: "Web app, no subscription", desc: "Browse the full catalog right here. No downloads, no monthly fee. Your data stays yours." },
            ].map((f) => (
              <div key={f.title} className="bg-surface border border-border rounded-2xl p-7 hover:border-accent/30 hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-[10px] bg-accent/10 border border-accent/20 flex items-center justify-center text-xl mb-4">{f.icon}</div>
                <div className="text-base font-bold mb-2">{f.title}</div>
                <div className="text-sm text-muted leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how" className="bg-surface border-t border-b border-border py-24 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">How it works</div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] max-w-[600px] mb-14">
            From confusion to clarity in minutes.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { num: "01", title: "Browse the catalog", desc: "Search 500+ products across 12+ brands. Filter by category, score, or ingredient." },
              { num: "02", title: "Compare scores", desc: "See exactly why each product scored the way it did — every component broken down." },
              { num: "03", title: "Build your stack", desc: "Add products to your personal stack. Track your overall stack score." },
              { num: "04", title: "Optimize & buy smart", desc: "See the best-value options for each category. One click takes you to the product." },
            ].map((s) => (
              <div key={s.num}>
                <div className="text-[56px] font-black text-accent/10 leading-none mb-3">{s.num}</div>
                <div className="text-lg font-bold mb-2">{s.title}</div>
                <div className="text-sm text-muted leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-24 px-6 text-center max-w-[640px] mx-auto flex flex-col items-center">
        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-4">Get started</div>
        <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-4">
          Start optimizing your stack.
        </h2>
        <p className="text-muted text-[17px] leading-relaxed mb-10">
          Download Formulate for free and take control of your supplement routine — backed by science, not marketing.
        </p>
        <div className="flex gap-3.5 flex-wrap justify-center">
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
          >
            Download for Windows
          </Link>
          <a
            href={APP_URL}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-transparent text-muted border border-border hover:border-accent hover:text-accent transition-all"
          >
            Open Web App
          </a>
        </div>
      </section>
    </>
  );
}
