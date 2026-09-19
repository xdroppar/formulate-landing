import type { Metadata } from "next";
import Link from "next/link";
import { ACTIVE_CLASS_LABEL, LEVEL_TEXT, activeEntries, slugOf } from "@/lib/shelf-library";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: "Skincare, Sunscreen & Oral-Care Ingredients: What Each One Does",
  description:
    "Zinc oxide, avobenzone, niacinamide, retinol, fluoride and more — what each active ingredient does, at what strength, what the evidence supports and who should be careful.",
  alternates: { canonical: `${BASE}/care-ingredients` },
};

/** Every personal-care active the app's labels name, grouped by kind. */
export default function CareIngredientsIndex() {
  const classes = Object.keys(ACTIVE_CLASS_LABEL).filter((c) => activeEntries.some((e) => e.class === c));
  return (
    <main id="main-content" className="max-w-[1100px] mx-auto px-6 md:px-8 pt-28 pb-20">
      <header className="mb-10 max-w-[760px]">
        <p className="fm-eyebrow text-accent mb-3">Care ingredients</p>
        <h1 className="fm-display text-[clamp(28px,4vw,var(--text-h-argument))] text-text mb-4">
          {activeEntries.length} ingredients on sunscreen, skincare, hair and toothpaste labels
        </h1>
        <p className="text-base text-muted leading-relaxed">
          What each active does, at what strength, and how strong the evidence is — the same idea as the{" "}
          <Link href="/ingredients" className="text-accent hover:underline">supplement ingredient pages</Link>, for
          the things you put on your skin, hair and teeth.
        </p>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Kinds">
          {classes.map((c) => (
            <a
              key={c}
              href={`#${c}`}
              className="text-xs font-mono uppercase tracking-[0.12em] px-2.5 py-1.5 rounded-md border border-border text-muted hover:text-accent hover:border-accent/40"
            >
              {ACTIVE_CLASS_LABEL[c]}
            </a>
          ))}
        </nav>
      </header>

      {classes.map((c) => (
        <section key={c} id={c} className="mb-12 scroll-mt-28">
          <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">{ACTIVE_CLASS_LABEL[c]}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {activeEntries
              .filter((e) => e.class === c)
              .map((e) => (
                <Link
                  key={e.id}
                  href={`/care-ingredients/${slugOf(e.id)}`}
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
      ))}
    </main>
  );
}
