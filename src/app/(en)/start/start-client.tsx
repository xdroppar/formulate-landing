"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EVIDENCE_GRADE_META } from "@/lib/encyclopedia";
import {
  checkStack as checkInteractionStack,
  SEVERITY_META,
} from "@/lib/interactions";
import { withUtm } from "@/lib/app-url";
import { trackEvent } from "@/lib/analytics";
import { OnboardingAurora } from "@/components/landing/onboarding-aurora";
import { OnboardingConfetti } from "@/components/landing/onboarding-confetti";

const APP_URL = "https://app.formulate-health.app";
const ease = [0.16, 1, 0.3, 1] as const;

type Grade = "A" | "B" | "C" | "D";
type Tier = "core" | "supporting" | "optional";

type GoalIngredient = { slug: string; role: string; dose: string; tier: Tier };
type GoalStack = {
  slug: string;
  name: string;
  tagline: string;
  tags: string[];
  ingredients: GoalIngredient[];
};
type IngredientMeta = { slug: string; name: string; evidence_grade: Grade | null };

/** Friendly goal labels + emoji, keyed by the curated stack slug. */
const GOAL_META: Record<string, { label: string; emoji: string }> = {
  sleep: { label: "Sleep", emoji: "🌙" },
  cognitive: { label: "Focus & Brain", emoji: "🧠" },
  longevity: { label: "Longevity", emoji: "🚀" },
  recovery: { label: "Muscle & Recovery", emoji: "💪" },
  immunity: { label: "Immunity", emoji: "🛡️" },
  "gut-health": { label: "Gut Health", emoji: "🦠" },
  mood: { label: "Mood & Calm", emoji: "🧘" },
  cardiovascular: { label: "Heart", emoji: "❤️" },
  metabolic: { label: "Blood Sugar", emoji: "🩸" },
  testosterone: { label: "Testosterone", emoji: "⚡" },
};

// Grade → 0-100 midpoint (matches the desktop GRADE_SCORES band midpoints).
const GRADE_SCORE: Record<Grade, number> = { A: 95, B: 85, C: 75, D: 65 };

type Experience = "new" | "some" | "experienced";
const EXPERIENCE: {
  id: Experience;
  label: string;
  sub: string;
  emoji: string;
  tiers: Tier[];
}[] = [
  { id: "new", label: "I'm just starting", sub: "Show me only the essentials", emoji: "🌱", tiers: ["core"] },
  { id: "some", label: "I take a few things", sub: "Core plus proven add-ons", emoji: "📈", tiers: ["core", "supporting"] },
  { id: "experienced", label: "I know my stuff", sub: "Give me the full protocol", emoji: "🧪", tiers: ["core", "supporting", "optional"] },
];

type Step = "goals" | "experience" | "building" | "result";

function titleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}


/**
 * Step motion, in one place.
 *
 * Was four copies of `{opacity:0,y:18} -> {y:0} -> {y:-18}` at 0.4s each. With
 * AnimatePresence mode="wait" that is 0.4 out plus 0.4 in — 800ms of dead time
 * between screens, on a three-screen wizard, which is most of a second spent
 * watching nothing three times. Now 220ms out, 320ms in, and the axis is
 * horizontal and DIRECTIONAL so going back reads as going back.
 */
function stepMotion(dir: 1 | -1, reduce: boolean) {
  if (reduce) {
    return {
      initial: false as const,
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, transition: { duration: 0.1 } },
      transition: { duration: 0.12 },
    };
  }
  return {
    initial: { opacity: 0, x: dir * 28 },
    animate: { opacity: 1, x: 0 },
    // Leaving is faster than arriving. An exit is dead time — the reader has
    // already decided — while the entrance is the thing they are waiting for.
    exit: { opacity: 0, x: dir * -28, transition: { duration: 0.18, ease } },
    transition: { duration: 0.3, ease },
  };
}


/**
 * The goal's tagline, minus any count it states.
 *
 * Nine taglines open with a number — "Four evidence-backed supplements that
 * improve sleep quality…" — and they are correct on /conditions, which shows
 * the whole stack. Here the list is FILTERED by the experience answer, so
 * picking "I take a few things" rendered "Four evidence-backed supplements"
 * directly above three cards and a chip reading "3 ingredients". The page
 * contradicted itself on the one screen that has to be believed.
 *
 * Dropping the leading count keeps the useful half of the sentence — what the
 * stack is FOR — and lets the chip underneath be the only thing that counts,
 * which is the one that is computed rather than written.
 */
function taglineWithoutCount(t: string): string {
  const m = /^(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten)\s+(\S)([\s\S]*)$/.exec(t);
  return m ? m[2].toUpperCase() + m[3] : t;
}


/**
 * The three tiers, phrased as the decision they represent.
 *
 * A reader does not need to be told an ingredient is "supporting"; they need to
 * be told whether to buy it this week. The tier already encodes that and the
 * old design spent it on a badge.
 */
const TIER_BANDS: { tier: Tier; title: string; note: string }[] = [
  { tier: "core", title: "Start here", note: "the evidence is strongest for these" },
  { tier: "supporting", title: "Add when ready", note: "real evidence, smaller effect" },
  { tier: "optional", title: "Only if it fits you", note: "situational — skip unless the reason applies" },
];

export function StartClient({
  goalStacks,
  ingredientIndex,
}: {
  goalStacks: GoalStack[];
  ingredientIndex: IngredientMeta[];
}) {
  const router = useRouter();
  const reduce = useReducedMotion();

  const [step, setStepRaw] = useState<Step>("result");
  /**
   * Which way the wizard is moving.
   *
   * Every step animated identically in both directions: going BACK slid the
   * old panel up and the new one in from below, exactly as going forward did.
   * That reads as "another new screen" rather than "returning", which is the
   * one thing a back button has to communicate. Forward enters from the right,
   * back from the left.
   */
  const [dir, setDir] = useState<1 | -1>(1);
  const ORDER: Step[] = ["goals", "experience", "building", "result"];
  const go = useCallback((next: Step) => {
    setStepRaw((cur) => {
      setDir(ORDER.indexOf(next) >= ORDER.indexOf(cur) ? 1 : -1);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setStep = go;
  /**
   * The wizard opens ON a stack, not on a question.
   *
   * It used to gate everything behind two questions and a 1.3s "building"
   * animation — a toll before anything of value appeared, on the screen someone
   * reaches by clicking "Build my stack". Landing on a real, complete stack
   * makes the goal a CONTROL rather than a gate: the chips sit above the stack
   * and switching one re-forms it in place. Longevity is the default because it
   * is the platform's own framing.
   */
  const [goalSlug, setGoalSlug] = useState<string | null>("longevity");
  const [experience, setExperience] = useState<Experience | null>("experienced");
  const [confetti, setConfetti] = useState(false);

  const ingredientMap = useMemo(
    () => new Map(ingredientIndex.map((i) => [i.slug, i])),
    [ingredientIndex],
  );
  const goal = useMemo(
    () => goalStacks.find((s) => s.slug === goalSlug) ?? null,
    [goalStacks, goalSlug],
  );
  const tiers = useMemo(
    () => EXPERIENCE.find((e) => e.id === experience)?.tiers ?? ["core"],
    [experience],
  );

  const recommended = useMemo(() => {
    if (!goal) return [];
    return goal.ingredients
      .filter((i) => tiers.includes(i.tier))
      .map((i) => {
        const meta = ingredientMap.get(i.slug);
        return {
          slug: i.slug,
          name: meta?.name ?? titleCaseSlug(i.slug),
          grade: meta?.evidence_grade ?? null,
          dose: i.dose,
          role: i.role,
          tier: i.tier,
          known: Boolean(meta),
        };
      });
  }, [goal, tiers, ingredientMap]);

  // Average research-grade across the stack, 0-100 — drives the count-up ring.
  const evidenceScore = useMemo(() => {
    const graded = recommended.filter((r) => r.grade);
    if (graded.length === 0) return 70;
    const sum = graded.reduce((a, r) => a + GRADE_SCORE[r.grade as Grade], 0);
    return Math.round(sum / graded.length);
  }, [recommended]);

  const gradeTally = useMemo(() => {
    const t: Record<Grade, number> = { A: 0, B: 0, C: 0, D: 0 };
    for (const r of recommended) if (r.grade) t[r.grade] += 1;
    return t;
  }, [recommended]);

  const interactions = useMemo(() => {
    const names = recommended.filter((r) => r.known).map((r) => r.name);
    if (names.length < 2) return [];
    return checkInteractionStack(names);
  }, [recommended]);
  const riskCount = interactions.filter(
    (i) => i.severity === "danger" || i.severity === "warning",
  ).length;

  const knownSlugs = recommended.filter((r) => r.known).map((r) => r.slug);
  const stackParam = knownSlugs.join(",");

  const appUrl = (() => {
    const base = withUtm(`${APP_URL}/?reset_onboarding=1`, {
      source: "landing",
      campaign: "start_wizard",
      content: goalSlug ?? undefined,
    });
    const url = new URL(base);
    if (goalSlug) url.searchParams.set("goal", goalSlug);
    if (stackParam) url.searchParams.set("stack", stackParam);
    return url.toString();
  })();
  const builderUrl = stackParam
    ? `/tools/stack-builder?stack=${encodeURIComponent(stackParam)}`
    : "/tools/stack-builder";

  // Funnel instrumentation.
  //
  // This wizard is the main conversion path off the SEO pages and fired NO
  // events at all, so the only observable points were `start_click` (they
  // clicked in) and `auth_complete` (they signed up, on the app side). With
  // nothing in between, "100 in, 2 out" is unattributable: bounced on question
  // one, finished the quiz and never clicked through, and clicked through then
  // bailed in app onboarding are three different problems with three different
  // fixes. Each step below is a step in that funnel:
  //
  //   start_view -> start_goal -> start_experience -> start_result -> start_handoff
  //
  // `once` guards the view/result events because both fire from effects that
  // re-run (StrictMode double-invokes in dev, and `step` is in the deps).
  const fired = useRef<Set<string>>(new Set());
  const once = (name: string, props?: Record<string, string | number | boolean | null>) => {
    if (fired.current.has(name)) return;
    fired.current.add(name);
    trackEvent(name, props);
  };

  useEffect(() => {
    once("start_view");
  }, []);

  /**
   * Move focus to the new step's heading.
   *
   * AnimatePresence unmounts the old panel, so the focused button disappears
   * and focus falls back to <body>. A keyboard or screen-reader user then has
   * to tab from the top of the document on every step — three times through a
   * three-step wizard — and hears nothing announced when the screen changes.
   * Focusing the heading both announces the new step and puts the next Tab
   * exactly where the options are.
   */
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);
  const focusStepHeading = useCallback(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    panelRef.current?.querySelector<HTMLElement>("h1")?.focus();
  }, []);

  // "Building your stack" beat → reveal + confetti.
  useEffect(() => {
    if (step !== "building") return;
    const delay = reduce ? 250 : 1300;
    const t = setTimeout(() => {
      setStep("result");
      if (!reduce) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 1700);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [step, reduce, setStep]);

  // Reaching the result is the moment the quiz has "paid off" — the ratio of
  // this to start_view is the completion rate, and the ratio of start_handoff
  // to this is how well the payoff converts.
  useEffect(() => {
    if (step !== "result") return;
    once("start_result", {
      goal: goalSlug,
      experience,
      stack_size: recommended.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  /**
   * Switch the stack in place.
   *
   * This used to advance to the next question, because the goal WAS a gate.
   * Now the chips sit above a live stack, so choosing one re-forms what is
   * already on screen — which is the point: a visitor can compare Sleep against
   * Longevity in two clicks instead of restarting a wizard to see the second
   * one.
   */
  function pickGoal(slug: string) {
    if (slug === goalSlug) return;
    trackEvent("start_goal", { goal: slug });
    setGoalSlug(slug);
  }

  function restart() {
    trackEvent("start_restart", { goal: goalSlug });
    setGoalSlug(null);
    setExperience(null);
    setConfetti(false);
    setStep("goals");
  }


  return (
    <div className="fixed inset-0 z-[150] flex items-stretch justify-center overflow-y-auto overscroll-contain">
      <OnboardingAurora />

      {/* Close → back to wherever they came from (usually the guide they were
          reading), falling back to home on a cold direct arrival. Pushing "/"
          unconditionally used to eject readers out of the article. */}
      <button
        onClick={() => {
          if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
          } else {
            router.push("/");
          }
        }}
        className="fixed top-4 right-4 z-20 w-9 h-9 rounded-full bg-surface hover:bg-surface2 border border-border text-muted hover:text-text grid place-items-center transition-colors"
        aria-label="Close and return to home"
      >
        ✕
      </button>


      <div ref={panelRef} className="relative z-10 w-full max-w-3xl mx-auto px-5 flex flex-col py-14">
        <AnimatePresence mode="wait" initial={false}>



          {/* ── Step: result ── */}
          {step === "result" && goal && (
            <motion.div
              key="result"
              {...stepMotion(dir, !!reduce)}
              onAnimationComplete={focusStepHeading}
              className="flex-1"
            >
              {/* The goal is a CONTROL now, not a question that was already
                  answered and disappeared. It sits above the stack, always
                  visible, and switching it re-forms the stack in place — so a
                  visitor can compare goals instead of restarting a wizard. */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {goalStacks.map((g) => {
                  const on = g.slug === goalSlug;
                  return (
                    <button
                      key={g.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => pickGoal(g.slug)}
                      className={
                        "px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-colors " +
                        (on
                          ? "border-accent/60 text-accent bg-accent/10"
                          : "border-border bg-surface text-muted hover:text-text hover:border-accent/30")
                      }
                    >
                      {(GOAL_META[g.slug] ?? { label: g.name }).label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col items-center text-center mb-8">
                <h1 tabIndex={-1} className="fm-display text-[clamp(24px,3vw,var(--text-h-section))] text-text outline-none">
                  Your {goal.name}
                </h1>
                <p className="mt-2 text-sm text-muted max-w-lg">{taglineWithoutCount(goal.tagline)}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[12px] text-muted">
                  <span className="font-bold text-text tabular-nums">{recommended.length}</span> ingredients
                  <span className="opacity-40">·</span>
                  avg research grade <span className="font-bold text-accent tabular-nums">{evidenceScore}</span>
                </div>
              </div>

              {/* Ingredients, banded by tier — the band IS the guidance. */}
              {TIER_BANDS.filter((band) => recommended.some((r) => r.tier === band.tier)).map((band) => (
                <div key={band.tier} className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="fm-eyebrow">{band.title}</span>
                    <span className="text-[12px] text-muted/70">{band.note}</span>
                  </div>
              <ul className="space-y-2">
                {recommended.filter((r) => r.tier === band.tier).map((r, i) => {
                  const g = r.grade ? EVIDENCE_GRADE_META[r.grade] : null;
                  return (
                    <motion.li
                      key={r.slug}
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.35, ease }}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        {r.known ? (
                          <Link
                            href={`/ingredients/${r.slug}`}
                            className="text-sm font-semibold text-text hover:text-accent transition-colors"
                          >
                            {r.name}
                          </Link>
                        ) : (
                          <span className="text-sm font-semibold text-text">{r.name}</span>
                        )}
                        {g && (
                          <span
                            className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                            title={g.label}
                          >
                            {r.grade}
                          </span>
                        )}
                        {/* The band above already says what the tier is, so
                            repeating it on every row is noise — and blanking
                            the label left an empty pill floating beside the
                            grade. The badge is gone entirely now. */}
                      </div>
                      <p className="text-xs text-text/80 leading-relaxed mb-1.5">{r.role}</p>
                      <p className="text-xs text-muted">
                        <span className="font-semibold uppercase tracking-wider text-[9px]">Dose:</span>{" "}
                        {r.dose}
                      </p>
                    </motion.li>
                  );
                })}
              </ul>
                </div>
              ))}

              {/* Evidence quality + interactions */}
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + recommended.length * 0.08 + 0.1 }}
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4 flex items-center gap-5 flex-wrap">
                  <span className="fm-eyebrow">
                    Evidence quality
                  </span>
                  {(["A", "B", "C", "D"] as const).map((gr) => {
                    const meta = EVIDENCE_GRADE_META[gr];
                    return (
                      <div key={gr} className="flex items-center gap-1.5">
                        <span
                          className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
                        >
                          {gr}
                        </span>
                        <span className="text-sm text-text font-semibold tabular-nums">{gradeTally[gr]}</span>
                      </div>
                    );
                  })}
                </div>

                {interactions.length > 0 ? (
                  <div className="mb-6">
                    <h2 className="text-sm font-bold text-text mb-2">
                      Interactions to know
                      {riskCount > 0 && (
                        <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                          {riskCount} to watch
                        </span>
                      )}
                    </h2>
                    <ul className="space-y-2">
                      {interactions.slice(0, 4).map((i) => {
                        const meta = SEVERITY_META[i.severity];
                        return (
                          <li
                            key={i.pair_key}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border ${meta.border} ${meta.bg}`}
                          >
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-text capitalize">
                                {i.substance_a} + {i.substance_b}
                              </span>
                              <p className="text-xs text-muted mt-0.5 line-clamp-1">{i.summary}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : recommended.length >= 2 ? (
                  <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/5 px-4 py-2.5">
                    <p className="text-xs text-text">
                      <span className="text-green-400 font-semibold">No interactions found</span>{" "}
                      between these ingredients in our database.
                    </p>
                  </div>
                ) : null}
              </motion.div>

              {/* Handoff CTA */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + recommended.length * 0.08 + 0.25, duration: 0.4, ease }}
                className="rounded-2xl border border-accent/30 bg-accent/[0.07] p-6"
              >
                <h2 className="text-[length:var(--text-title)] font-semibold text-text mb-1.5">Take this stack into the app</h2>
                <p className="text-sm text-muted leading-relaxed mb-5">
                  Add it to your free stack, log what you take, and watch your
                  nutrient coverage and Stack Score fill in — with a quick guided
                  tour to get you set up.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={appUrl}
                    onClick={() =>
                      trackEvent("start_handoff", {
                        goal: goalSlug,
                        experience,
                        stack_size: recommended.length,
                        destination: "app",
                      })
                    }
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_-8px_rgba(0,229,160,0.5)]"
                  >
                    Continue in the app →
                  </a>
                  <Link
                    href={builderUrl}
                    onClick={() =>
                      trackEvent("start_handoff", {
                        goal: goalSlug,
                        experience,
                        stack_size: recommended.length,
                        destination: "builder",
                      })
                    }
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border border-white/15 text-text hover:border-accent hover:text-accent transition-all"
                  >
                    Refine in Stack Builder
                  </Link>
                </div>
                <p className="text-[12px] text-muted/70 mt-4">
                  Free forever · No account needed to start · No brand sponsorships
                </p>
              </motion.div>

              <div className="flex items-center justify-center gap-5 mt-6">
                <button type="button" onClick={restart} className="text-xs text-muted hover:text-accent transition-colors">
                  ↺ Start over
                </button>
                <button type="button" onClick={() => setStep("experience")} className="text-xs text-muted hover:text-accent transition-colors">
                  ← Change level
                </button>
              </div>

              <p className="text-[12px] text-muted/60 leading-relaxed mt-8 text-center max-w-xl mx-auto">
                <strong className="text-text/80">Educational only.</strong> Evidence-based
                starting points, not medical advice. Run any stack by a pharmacist
                or clinician if you take prescription medication.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {confetti && <OnboardingConfetti />}
    </div>
  );
}
