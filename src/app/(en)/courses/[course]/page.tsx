import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppCtaCard } from "@/components/app-cta-card";
import { GROUP_META, courseById, courses, coursesIn, groupOf, lessonPath } from "@/lib/courses";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return courses.map((c) => ({ course: c.id }));
}

type Params = Promise<{ course: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { course: id } = await params;
  const c = courseById(id);
  if (!c) return { title: "Not found" };
  const url = `${BASE}/courses/${c.id}`;
  const title = `${c.title}: Free Course, ${c.lessons.length} Short Lessons`;
  return {
    title,
    description: c.intro.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title, description: c.intro, type: "website", url },
  };
}

export default async function CoursePage({ params }: { params: Params }) {
  const { course: id } = await params;
  const c = courseById(id);
  if (!c) notFound();

  const url = `${BASE}/courses/${c.id}`;
  const group = GROUP_META[groupOf(c.id)];
  const minutes = c.lessons.reduce((n, l) => n + (l.minutes || 0), 0);
  const siblings = coursesIn(groupOf(c.id)).filter((x) => x.id !== c.id);

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    description: c.intro,
    url,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    provider: { "@type": "Organization", name: "Formulate", sameAs: BASE },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${minutes}M`,
    },
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD", category: "Free" },
    syllabusSections: c.lessons.map((l) => ({
      "@type": "Syllabus",
      name: l.title,
      description: l.summary,
      url: `${BASE}${lessonPath(c, l)}`,
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Courses", item: `${BASE}/courses` },
      { "@type": "ListItem", position: 3, name: c.title, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-[1100px] mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-xs text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/courses" className="hover:text-accent">Courses</Link>
        <span className="mx-2">/</span>
        <Link href={`/courses#${groupOf(c.id)}`} className="hover:text-accent">{group.label}</Link>
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10">
        <div className="min-w-0 max-w-[760px]">
          <header className="mb-8">
            <p className="fm-eyebrow text-accent mb-3">{group.label} · free course</p>
            <h1 className="fm-display text-[clamp(28px,4vw,var(--text-h-argument))] text-text mb-4">{c.title}</h1>
            <p className="text-base text-muted leading-relaxed mb-3">{c.intro}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              {c.lessons.length} lessons · about {minutes} minutes
            </p>
          </header>

          <ol className="rounded-2xl border border-border divide-y divide-border">
            {c.lessons.map((l, i) => (
              <li key={l.id}>
                <Link
                  href={lessonPath(c, l)}
                  className="group flex gap-4 p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-mono text-xs text-muted w-6 shrink-0 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-text group-hover:text-accent">{l.title}</span>
                    <span className="block mt-1 text-xs leading-relaxed text-muted">{l.summary}</span>
                  </span>
                  <span className="font-mono text-[10px] text-muted whitespace-nowrap pt-1">{l.minutes} min</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-28 self-start space-y-4">
          <AppCtaCard
            title="Take it with you"
            sub={`The same course in the app, with quizzes, your own numbers, and a score for ${group.label.toLowerCase()}.`}
            campaign={`course-${c.id}`}
            source="course_cta"
            path={`/learning/track/${c.id}`}
          />
          {siblings.length > 0 && (
            <div className="rounded-2xl border border-border p-4">
              <div className="fm-eyebrow text-muted mb-3">Also in {group.label}</div>
              <ul className="space-y-2">
                {siblings.map((s) => (
                  <li key={s.id}>
                    <Link href={`/courses/${s.id}`} className="text-sm text-text hover:text-accent">
                      {s.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-[11px] text-muted leading-relaxed">Education, not medical advice.</p>
        </aside>
      </div>
    </main>
  );
}
