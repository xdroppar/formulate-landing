/**
 * The Learning courses, published as indexed pages under /courses.
 *
 * Content is authored on the web app (`src/data/learning-tracks-content.json`,
 * rendered there as noindex lessons) and MIRRORED here byte-for-byte by
 * `scripts/sync-courses-from-web.mjs`. Never edit the JSON in this repo.
 *
 * The grouping below is this site's own presentation: which of the app's
 * eight scope pillars (onboarding's tiles) each course teaches, plus the
 * cross-pillar courses that explain how the body ties them together.
 */
import raw from "@/data/learning-tracks-content.json";

export type CourseBlock =
  | { type: "text"; heading?: string; body: string }
  | { type: "keyConcept"; title: string; body: string }
  | { type: "stat"; value: string; label: string; source?: string }
  | { type: "depth"; title?: string; simple: string; mechanism: string; studies: string }
  | {
      type: "predictReveal";
      prompt: string;
      min: number;
      max: number;
      step: number;
      unit: string;
      answer: number;
      answerLabel?: string;
      explanation: string;
    }
  | { type: "quiz"; question: string; options: string[]; correctIndex: number; explanation: string }
  | { type: "diagram"; title: string; nodes: { label: string; detail: string }[] }
  | { type: "checklist"; title?: string; items: string[] }
  | { type: "callout"; tone: "info" | "tip" | "warn"; body: string }
  | { type: "applyIt"; label: string; href: string; body?: string }
  | { type: "yourNumbers"; metric: "hydration" | "protein" | "routine" | "coverage"; title?: string; note?: string };

export interface CourseLesson {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  blocks: CourseBlock[];
}

export interface Course {
  id: string;
  title: string;
  intro: string;
  lessons: CourseLesson[];
}

export const COURSES_REVIEWED = "2026-10-07";

/** The eight things Formulate tracks, in onboarding's order, then the courses
 *  that cut across them. `appPath` is where that pillar lives in the app. */
export type CourseGroup =
  | "supplements"
  | "food"
  | "water"
  | "training"
  | "therapies"
  | "sleep"
  | "body"
  | "care"
  | "foundations";

export const GROUP_META: Record<CourseGroup, { label: string; line: string; appPath: string }> = {
  supplements: { label: "Supplements", line: "What a dose, a form and an evidence grade mean", appPath: "/catalog" },
  food: { label: "Food", line: "Macros, micronutrients and the diet patterns that hold up", appPath: "/meals" },
  water: { label: "Hydration", line: "A real daily target, and the electrolytes that make it work", appPath: "/stack/nutrients" },
  training: { label: "Training", line: "Zone 2, VO₂ max, strength and a week that covers them", appPath: "/fitness" },
  therapies: { label: "Therapies", line: "Sauna, cold, light: what the data actually show", appPath: "/therapies" },
  sleep: { label: "Sleep", line: "Duration, timing, light and what the gear can do", appPath: "/sleep" },
  body: { label: "Body", line: "The home numbers and blood markers worth tracking", appPath: "/body" },
  care: { label: "Personal care", line: "Sunscreen, actives, oral care, hair", appPath: "/skin" },
  foundations: { label: "How it fits together", line: "Stress, the brain, body systems and pathways", appPath: "/learning" },
};

export const GROUP_ORDER: CourseGroup[] = [
  "supplements",
  "food",
  "water",
  "training",
  "therapies",
  "sleep",
  "body",
  "care",
  "foundations",
];

const COURSE_GROUP: Record<string, CourseGroup> = {
  supplements: "supplements",
  nutrition: "food",
  nutrients: "food",
  diet: "food",
  hydration: "water",
  fitness: "training",
  therapies: "therapies",
  sleep: "sleep",
  body: "body",
  biomarkers: "body",
  "personal-care": "care",
  stress: "foundations",
  brain: "foundations",
  systems: "foundations",
  pathways: "foundations",
};

export const courses: Course[] = Object.values(raw as unknown as Record<string, Course>);

export function groupOf(courseId: string): CourseGroup {
  return COURSE_GROUP[courseId] ?? "foundations";
}

export function coursesIn(group: CourseGroup): Course[] {
  return courses.filter((c) => groupOf(c.id) === group);
}

export function courseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export const lessonCount = courses.reduce((n, c) => n + c.lessons.length, 0);

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[₀-₉]/g, (d) => String(d.charCodeAt(0) - 0x2080))
    .replace(/[⁺]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A lesson's URL slug: its title up to the first dash or colon ("Vitamin D —
 * the sunshine hormone…" → "vitamin-d"), which is the part people search
 * for. Falls back to the whole title when the short form would collide inside
 * its course or come out too short to mean anything.
 */
const SLUGS: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (const c of courses) {
    const short = c.lessons.map((l) => slugify(l.title.split(/\s[—–-]\s|:\s/)[0]));
    c.lessons.forEach((l, i) => {
      const s = short[i];
      const unique = short.filter((x) => x === s).length === 1;
      m.set(`${c.id}/${l.id}`, unique && s.length >= 4 ? s : slugify(l.title));
    });
  }
  return m;
})();

export function lessonSlug(course: Course, lesson: CourseLesson): string {
  return SLUGS.get(`${course.id}/${lesson.id}`) ?? slugify(lesson.title);
}

export function lessonBySlug(course: Course, slug: string): CourseLesson | undefined {
  return course.lessons.find((l) => lessonSlug(course, l) === slug);
}

export function lessonPath(course: Course, lesson: CourseLesson): string {
  return `/courses/${course.id}/${lessonSlug(course, lesson)}`;
}

/** Plain text of a block, for descriptions and FAQ schema. */
export function stripMd(s: string): string {
  return s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1$2").replace(/\s+/g, " ").trim();
}

export const APP_BASE = "https://app.formulate-health.app";
