import type { Metadata } from "next";
import Link from "next/link";
import { goalPages, goalEvidenceDateLabel } from "@/lib/goals";
import { conditions } from "@/lib/conditions";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: "Supplements by Goal: What Systematic Reviews Found",
  description:
    "Which supplements systematic reviews found help — and which they found do nothing — for blood pressure, cholesterol, blood sugar, muscle, sleep and more. Every finding quoted and linked.",
  alternates: { canonical: `${BASE}/supplements/for` },
};

export default function GoalsHub() {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <header className="mb-10">
        <p className="fm-eyebrow text-accent mb-3">Supplements by goal</p>
        <h1 className="fm-display text-[clamp(26px,3.5vw,var(--text-h-argument))] text-text mb-4">
          What the reviews found, goal by goal
        </h1>
        <p className="text-base text-muted leading-relaxed">
          For each goal: the supplements systematic reviews concluded help, the ones they concluded do nothing, and
          the ones they could not call — each with the review quoted and linked. Evidence last refreshed{" "}
          {goalEvidenceDateLabel}.
        </p>
      </header>

      <section className="mb-12">
        <div className="grid sm:grid-cols-2 gap-3">
          {goalPages.map((g) => (
            <Link
              key={g.slug}
              href={`/supplements/for/${g.slug}`}
              className="rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
            >
              <div className="text-sm font-bold text-text mb-1">{g.label}</div>
              <div className="text-xs text-muted">
                {g.helps.length + g.mixed.length} with a benefit · {g.noEffect.length} with no effect
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">Condition guides</h2>
        <div className="flex flex-wrap gap-2">
          {conditions.map((c) => (
            <Link
              key={c.slug}
              href={`/conditions/${c.slug}`}
              className="inline-flex items-center rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-text hover:border-accent/40 transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
