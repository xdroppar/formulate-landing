import { academyCourseUrl, academyHubUrl } from "@/lib/app-url";

/**
 * Maps a guide/condition's tags to the single most relevant Formulate
 * Academy course, so high-authority landing pages can funnel readers (and
 * SEO link equity) into the deep course content on the webapp.
 *
 * We deliberately target ONLY the core courses that are verified-active and
 * have authored lesson content — linking to a dormant/empty course would
 * 404. Anything without a confident match falls back to the Academy hub,
 * which always resolves. Keep this list conservative: add a course here only
 * after confirming it renders a real page with lessons.
 */

export interface AcademyLink {
  /** course id, or null when we fall back to the hub */
  courseId: string | null;
  href: string;
  title: string;
  blurb: string;
}

interface CourseTarget {
  id: string;
  title: string;
  blurb: string;
  /** lowercase tag-keyword substrings that route to this course */
  match: string[];
}

// Ordered specific → general. First rule whose keyword appears in any tag wins,
// so a guide tagged ["Sleep", "Magnesium", "Supplement"] routes to Sleep, not
// the broader Supplements course.
const COURSE_TARGETS: CourseTarget[] = [
  {
    id: "sleep",
    title: "Sleep Mastery",
    blurb: "The deep science of sleep — circadian biology, sleep stages, and what actually moves the needle.",
    match: ["sleep", "circadian", "melatonin", "insomnia"],
  },
  {
    id: "stress",
    title: "Stress & Mind",
    blurb: "How the stress response works, good vs. bad stress, and the levers that build resilience.",
    match: ["stress", "cortisol", "anxiety", "adaptogen", "mood", "mental health", "hpa"],
  },
  {
    id: "brain",
    title: "Brain Health",
    blurb: "The neuroscience of memory, focus, and neuroplasticity — and how to protect cognition as you age.",
    match: ["brain", "cognit", "nootropic", "focus", "memory", "neuro"],
  },
  {
    id: "exercise",
    title: "Exercise Physiology",
    blurb: "How exercise works — energy systems, aerobic vs. strength adaptation, and recovery.",
    match: ["exercise", "muscle", "sports", "performance", "strength", "creatine", "fitness", "recovery", "workout"],
  },
  {
    id: "advanced",
    title: "Advanced Interventions",
    blurb: "The frontier of longevity science — the intervention landscape, senolytics, and measuring what works.",
    match: ["longevity", "aging", "anti-aging", "nad", "senolytic", "rapamycin", "metformin", "resveratrol", "frontier"],
  },
  {
    id: "nutrition",
    title: "Nutrition Science",
    blurb: "The real science of food and health — macro- and micronutrients, and how diet shapes aging.",
    match: ["nutrition", "diet", "protein", "vitamin", "mineral", "magnesium", "omega", "micronutrient", "food", "calcium", "iron", "zinc"],
  },
  {
    id: "supplements",
    title: "Supplements & Biohacking 101",
    blurb: "What supplements are, how they're regulated, how to read evidence, and how to build a stack that works.",
    match: ["supplement", "bioavailab", "stack", "dose", "dosage", "biohack", "form"],
  },
];

function norm(tags: string[]): string {
  return tags.join(" ").toLowerCase();
}

/**
 * Resolve the best Academy link for a set of tags. Always returns a link —
 * a matched course when confident, otherwise the Academy hub.
 */
export function academyLinkForTags(
  tags: string[] | undefined,
  source: string,
): AcademyLink {
  const hay = norm(tags ?? []);
  for (const t of COURSE_TARGETS) {
    if (t.match.some((kw) => hay.includes(kw))) {
      return {
        courseId: t.id,
        href: academyCourseUrl(t.id, source),
        title: t.title,
        blurb: t.blurb,
      };
    }
  }
  return {
    courseId: null,
    href: academyHubUrl(source),
    title: "The Formulate Academy",
    blurb: "Free, university-grade courses on longevity science — from cellular biology to building an evidence-based stack.",
  };
}
