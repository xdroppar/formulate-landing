import type { Metadata } from "next";
import Link from "next/link";
import { GROUP_META, GROUP_ORDER, coursesIn, courses, lessonCount } from "@/lib/courses";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: "Free Health Courses: Supplements, Food, Hydration, Training, Sleep, Body & Care",
  description: `${courses.length} free courses, ${lessonCount} short lessons on the things that move your health: supplement doses, protein, hydration, zone 2, VO₂ max, sleep timing, blood pressure, sunscreen and more. Every claim sourced.`,
  alternates: { canonical: `${BASE}/courses` },
  openGraph: {
    title: "Free health courses, one lesson at a time",
    description: `${lessonCount} short, sourced lessons across every part of a longevity routine.`,
    url: `${BASE}/courses`,
    type: "website",
  },
};

/** Every course, grouped by the eight things Formulate tracks. */
export default function CoursesIndex() {
  const minutes = courses.reduce((n, c) => n + c.lessons.reduce((m, l) => m + (l.minutes || 0), 0), 0);
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Formulate courses",
    itemListElement: courses.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/courses/${c.id}`,
      name: c.title,
    })),
  };

  return (
    <main id="main-content" className="max-w-[1100px] mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      <header className="mb-10 max-w-[760px]">
        <p className="fm-eyebrow text-accent mb-3">Courses</p>
        <h1 className="fm-display text-[clamp(28px,4vw,var(--text-h-argument))] text-text mb-4">
          Why each part of your routine counts, and how much
        </h1>
        <p className="text-base text-muted leading-relaxed">
          {courses.length} free courses, {lessonCount} lessons, about {Math.round(minutes / 60)} hours in all. They
          explain the things Formulate scores: what a supplement dose means, how much protein and water you need,
          why zone 2 and strength both matter, what makes a night of sleep count. Each lesson is a few minutes,
          with the studies one tap away. Product questions live in{" "}
          <Link href="/learn" className="text-accent hover:underline">
            Products, explained
          </Link>
          .
        </p>
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Pillars">
          {GROUP_ORDER.map((g) => {
            const n = coursesIn(g).reduce((k, c) => k + c.lessons.length, 0);
            return n ? (
              <a
                key={g}
                href={`#${g}`}
                className="text-xs font-mono uppercase tracking-[0.12em] px-2.5 py-1.5 rounded-md border border-border text-muted hover:text-accent hover:border-accent/40"
              >
                {GROUP_META[g].label} <span className="opacity-60">{n}</span>
              </a>
            ) : null;
          })}
        </nav>
      </header>

      {GROUP_ORDER.map((g) => {
        const list = coursesIn(g);
        if (!list.length) return null;
        return (
          <section key={g} id={g} className="mb-12 scroll-mt-28">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
              <h2 className="fm-display text-[length:var(--text-h-section)] text-text">{GROUP_META[g].label}</h2>
              <p className="text-sm text-muted">{GROUP_META[g].line}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {list.map((c) => (
                <Link
                  key={c.id}
                  href={`/courses/${c.id}`}
                  className="rounded-xl border border-border bg-white/[0.02] p-4 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-bold text-text">{c.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted whitespace-nowrap">
                      {c.lessons.length} lessons
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{c.intro}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
