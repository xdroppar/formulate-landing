import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppCtaCard } from "@/components/app-cta-card";
import { LessonBlock } from "@/components/lesson-blocks";
import { ReadingProgressBar } from "@/components/reading-progress-bar";
import {
  COURSES_REVIEWED,
  GROUP_META,
  courseById,
  courses,
  groupOf,
  lessonBySlug,
  lessonPath,
  lessonSlug,
  stripMd,
} from "@/lib/courses";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return courses.flatMap((c) => c.lessons.map((l) => ({ course: c.id, lesson: lessonSlug(c, l) })));
}

type Params = Promise<{ course: string; lesson: string }>;

function resolve(courseId: string, slug: string) {
  const c = courseById(courseId);
  const l = c ? lessonBySlug(c, slug) : undefined;
  return c && l ? { c, l } : null;
}

/** The first prose a lesson opens with, for a description that says more than the one-line summary. */
function lead(blocks: { type: string; body?: string }[]): string {
  const t = blocks.find((b) => b.type === "text" && b.body);
  return t?.body ? stripMd(t.body.split(/\n\s*\n/)[0]) : "";
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { course, lesson } = await params;
  const r = resolve(course, lesson);
  if (!r) return { title: "Not found" };
  const { c, l } = r;
  const url = `${BASE}${lessonPath(c, l)}`;
  const description = `${l.summary} ${lead(l.blocks)}`.trim().slice(0, 158);
  return {
    title: l.title,
    description,
    alternates: { canonical: url },
    openGraph: { title: l.title, description: l.summary, type: "article", url },
  };
}

export default async function LessonPage({ params }: { params: Params }) {
  const { course, lesson } = await params;
  const r = resolve(course, lesson);
  if (!r) notFound();
  const { c, l } = r;

  const url = `${BASE}${lessonPath(c, l)}`;
  const group = GROUP_META[groupOf(c.id)];
  const i = c.lessons.findIndex((x) => x.id === l.id);
  const prev = i > 0 ? c.lessons[i - 1] : null;
  const next = i < c.lessons.length - 1 ? c.lessons[i + 1] : null;
  const campaign = `course-${c.id}`;

  const quizzes = l.blocks.filter((b) => b.type === "quiz");
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: l.title,
    headline: l.title,
    description: l.summary,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-US",
    learningResourceType: "Lesson",
    educationalLevel: "Beginner",
    timeRequired: `PT${l.minutes || 5}M`,
    isAccessibleForFree: true,
    dateModified: COURSES_REVIEWED,
    isPartOf: { "@type": "Course", name: c.title, url: `${BASE}/courses/${c.id}` },
    author: { "@type": "Organization", name: "Formulate Team", url: BASE },
    publisher: { "@type": "Organization", name: "Formulate", url: BASE },
  };
  const quizLd = quizzes.length
    ? {
        "@context": "https://schema.org",
        "@type": "Quiz",
        name: `${l.title}: check yourself`,
        about: l.title,
        hasPart: quizzes.map((q) =>
          q.type === "quiz"
            ? {
                "@type": "Question",
                eduQuestionType: "Multiple choice",
                text: stripMd(q.question),
                acceptedAnswer: {
                  "@type": "Answer",
                  text: stripMd(q.options[q.correctIndex] ?? ""),
                  answerExplanation: { "@type": "Comment", text: stripMd(q.explanation) },
                },
              }
            : null,
        ),
      }
    : null;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Courses", item: `${BASE}/courses` },
      { "@type": "ListItem", position: 3, name: c.title, item: `${BASE}/courses/${c.id}` },
      { "@type": "ListItem", position: 4, name: l.title, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-[1100px] mx-auto px-6 md:px-8 pt-28 pb-20">
      <ReadingProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {quizLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-xs text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/courses" className="hover:text-accent">Courses</Link>
        <span className="mx-2">/</span>
        <Link href={`/courses/${c.id}`} className="hover:text-accent">{c.title}</Link>
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10">
        <article className="min-w-0 max-w-[760px]">
          <header className="mb-8">
            <p className="fm-eyebrow text-accent mb-3">
              {group.label} · lesson {i + 1} of {c.lessons.length}
            </p>
            <h1 className="fm-display text-[clamp(28px,4vw,var(--text-h-argument))] text-text mb-4">{l.title}</h1>
            <p className="text-base text-muted leading-relaxed mb-3">{l.summary}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              {l.minutes} min read · reviewed{" "}
              {new Date(COURSES_REVIEWED).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </header>

          {l.blocks
            /* "Your numbers" is a live panel in the app; here it can only be a
               link, and next to an "apply it" link it is the same card twice. */
            .filter((b) => b.type !== "yourNumbers" || !l.blocks.some((x) => x.type === "applyIt"))
            .map((b, k) => (
              <LessonBlock key={k} block={b} campaign={campaign} />
            ))}

          <nav className="mt-12 grid sm:grid-cols-2 gap-3" aria-label="Lessons">
            {prev ? (
              <Link
                href={lessonPath(c, prev)}
                className="rounded-xl border border-border p-4 hover:border-accent/40 transition-colors"
              >
                <div className="fm-eyebrow text-muted mb-1">← Previous</div>
                <div className="text-sm font-bold text-text">{prev.title}</div>
              </Link>
            ) : (
              <Link
                href={`/courses/${c.id}`}
                className="rounded-xl border border-border p-4 hover:border-accent/40 transition-colors"
              >
                <div className="fm-eyebrow text-muted mb-1">← Course</div>
                <div className="text-sm font-bold text-text">{c.title}</div>
              </Link>
            )}
            {next ? (
              <Link
                href={lessonPath(c, next)}
                className="rounded-xl border border-accent/30 bg-accent/[0.04] p-4 hover:border-accent/60 transition-colors sm:text-right"
              >
                <div className="fm-eyebrow text-accent mb-1">Next →</div>
                <div className="text-sm font-bold text-text">{next.title}</div>
              </Link>
            ) : (
              <Link
                href="/courses"
                className="rounded-xl border border-accent/30 bg-accent/[0.04] p-4 hover:border-accent/60 transition-colors sm:text-right"
              >
                <div className="fm-eyebrow text-accent mb-1">Course done →</div>
                <div className="text-sm font-bold text-text">Pick the next course</div>
              </Link>
            )}
          </nav>
        </article>

        <aside className="lg:sticky lg:top-28 self-start space-y-4">
          <AppCtaCard
            title="Turn it into a routine"
            sub={`Formulate scores your ${group.label.toLowerCase()} and shows what would move it most. Free.`}
            campaign={campaign}
            source="lesson_cta"
            path={group.appPath}
          />
          <div className="rounded-2xl border border-border p-4">
            <div className="fm-eyebrow text-muted mb-3">{c.title}</div>
            <ol className="space-y-1.5">
              {c.lessons.map((x, k) => (
                <li key={x.id} className="flex gap-2 text-[13px] leading-snug">
                  <span className="font-mono text-[10px] text-muted w-5 shrink-0 pt-[3px]">{k + 1}</span>
                  {x.id === l.id ? (
                    <span className="text-accent font-semibold" aria-current="page">{x.title}</span>
                  ) : (
                    <Link href={lessonPath(c, x)} className="text-text/80 hover:text-accent">
                      {x.title}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <p className="text-[11px] text-muted leading-relaxed">
            Education, not medical advice. Talk to your doctor before changing medication or starting something new.
          </p>
        </aside>
      </div>
    </main>
  );
}
