import type { Metadata } from "next";
import Link from "next/link";
import {
  PILLAR_META,
  PILLAR_ORDER,
  LEVEL_TEXT,
  activeEntries,
  shelfEntries,
  slugOf,
} from "@/lib/shelf-library";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: "Products, Explained: Sleep Gear, Therapies, Devices, Fitness & Personal Care",
  description:
    "Does a sauna, red-light panel, weighted blanket, smart scale or sunscreen actually do what it claims? Evidence-rated guides to every kind of product, with what to look for and who should be careful.",
  alternates: { canonical: `${BASE}/learn` },
};

/** The index of product-type guides, grouped by the app's shelves. */
export default function LearnIndex() {
  return (
    <main id="main-content" className="max-w-[1100px] mx-auto px-6 md:px-8 pt-28 pb-20">
      <header className="mb-10 max-w-[760px]">
        <p className="fm-eyebrow text-accent mb-3">Products, explained</p>
        <h1 className="fm-display text-[clamp(28px,4vw,var(--text-h-argument))] text-text mb-4">
          {shelfEntries.length} kinds of product, checked against the evidence
        </h1>
        <p className="text-base text-muted leading-relaxed">
          What each thing does, how sure anyone can be, what to look for when you buy one, and who should be
          careful. &ldquo;No real evidence&rdquo; is an answer these pages give often, on purpose. For the
          ingredients on sunscreen, skincare and toothpaste labels, see{" "}
          <Link href="/care-ingredients" className="text-accent hover:underline">
            {activeEntries.length} care ingredients
          </Link>
          .
        </p>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Shelves">
          {PILLAR_ORDER.map((p) => {
            const n = shelfEntries.filter((e) => e.pillar === p).length;
            return n ? (
              <a
                key={p}
                href={`#${p}`}
                className="text-xs font-mono uppercase tracking-[0.12em] px-2.5 py-1.5 rounded-md border border-border text-muted hover:text-accent hover:border-accent/40"
              >
                {PILLAR_META[p].label} <span className="opacity-60">{n}</span>
              </a>
            ) : null;
          })}
        </nav>
      </header>

      {PILLAR_ORDER.map((p) => {
        const rows = shelfEntries.filter((e) => e.pillar === p);
        if (!rows.length) return null;
        return (
          <section key={p} id={p} className="mb-12 scroll-mt-28">
            <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">{PILLAR_META[p].label}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {rows.map((e) => (
                <Link
                  key={e.id}
                  href={`/learn/${slugOf(e.id)}`}
                  className="rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-bold text-text">{e.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted whitespace-nowrap">
                      {LEVEL_TEXT[e.evidence.level]}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{e.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
