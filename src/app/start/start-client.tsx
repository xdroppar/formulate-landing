"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EVIDENCE_GRADE_META } from "@/lib/encyclopedia";
import {
  checkStack as checkInteractionStack,
  SEVERITY_META,
} from "@/lib/interactions";
import { withUtm } from "@/lib/app-url";
import { OnboardingAurora } from "@/components/landing/onboarding-aurora";
import { OnboardingScoreRing } from "@/components/landing/onboarding-score-ring";
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
const DOTS: Step[] = ["goals", "experience", "result"];

function titleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function StartClient({
  goalStacks,
  ingredientIndex,
}: {
  goalStacks: GoalStack[];
  ingredientIndex: IngredientMeta[];
}) {
  const router = useRouter();
  const reduce = useReducedMotion();

  const [step, setStep] = useState<Step>("goals");
  const [goalSlug, setGoalSlug] = useState<string | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
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
  }, [step, reduce]);

  function pickGoal(slug: string) {
    setGoalSlug(slug);
    setStep("experience");
  }
  function pickExperience(id: Experience) {
    setExperience(id);
    setStep("building");
  }
  function restart() {
    setGoalSlug(null);
    setExperience(null);
    setConfetti(false);
    setStep("goals");
  }

  const dotIdx = step === "goals" ? 0 : step === "experience" ? 1 : 2;

  return (
    <div className="fixed inset-0 z-[150] flex items-stretch justify-center">
      <OnboardingAurora />

      {/* Close → back to the landing site */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-muted hover:text-text grid place-items-center transition-colors"
        aria-label="Close and return to home"
      >
        ✕
      </button>

      {/* Progress dots */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {DOTS.map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full"
            animate={{
              width: i === dotIdx ? 26 : 7,
              backgroundColor: i <= dotIdx ? "var(--color-accent)" : "rgba(255,255,255,0.18)",
            }}
            transition={{ duration: 0.35, ease }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 flex flex-col overflow-y-auto py-14">
        <AnimatePresence mode="wait" initial={false}>
          {/* ── Step: goals ── */}
          {step === "goals" && (
            <motion.div
              key="goals"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease }}
              className="flex-1 flex flex-col justify-center text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[2px] text-accent mb-3">
                Build your stack — free
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
                What do you want your <span className="text-accent">body to do?</span>
              </h1>
              <p className="mt-3 text-sm text-muted max-w-md mx-auto">
                Pick your main goal. We&apos;ll build an evidence-based stack —
                every ingredient graded on real research, with dose and timing.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5 justify-center max-w-xl mx-auto">
                {goalStacks.map((s, i) => {
                  const m = GOAL_META[s.slug] ?? { label: s.name, emoji: "✨" };
                  return (
                    <motion.button
                      key={s.slug}
                      type="button"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.3, ease }}
                      whileHover={reduce ? undefined : { scale: 1.05 }}
                      whileTap={reduce ? undefined : { scale: 0.96 }}
                      onClick={() => pickGoal(s.slug)}
                      className="px-4 py-2.5 rounded-full text-sm font-semibold border border-white/10 bg-white/[0.04] text-text hover:border-accent/60 hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <span className="mr-1.5">{m.emoji}</span>
                      {m.label}
                    </motion.button>
                  );
                })}
              </div>
              <p className="mt-9 text-[11px] text-muted/60">
                No account needed yet · 2 quick questions
              </p>
            </motion.div>
          )}

          {/* ── Step: experience ── */}
          {step === "experience" && (
            <motion.div
              key="experience"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease }}
              className="flex-1 flex flex-col justify-center text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[2px] text-accent mb-3">
                {goal ? GOAL_META[goal.slug]?.label ?? goal.name : ""}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
                How much do you <span className="text-accent">take today?</span>
              </h1>
              <p className="mt-3 text-sm text-muted max-w-md mx-auto">
                We&apos;ll tailor how much of the stack to show you — from the
                bare essentials to the full protocol.
              </p>

              <div className="mt-8 space-y-3 max-w-md mx-auto w-full">
                {EXPERIENCE.map((e, i) => (
                  <motion.button
                    key={e.id}
                    type="button"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease }}
                    whileHover={reduce ? undefined : { scale: 1.02 }}
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    onClick={() => pickExperience(e.id)}
                    className="group w-full text-left rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:border-accent/60 hover:bg-accent/[0.06] transition-colors flex items-center gap-4"
                  >
                    <span className="text-2xl" aria-hidden>{e.emoji}</span>
                    <div className="flex-1">
                      <div className="text-base font-bold text-text group-hover:text-accent transition-colors">
                        {e.label}
                      </div>
                      <div className="text-xs text-muted mt-0.5">{e.sub}</div>
                    </div>
                    <span className="text-muted group-hover:text-accent transition-colors">→</span>
                  </motion.button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep("goals")}
                className="mt-7 text-xs text-muted hover:text-accent transition-colors"
              >
                ← Back
              </button>
            </motion.div>
          )}

          {/* ── Step: building ── */}
          {step === "building" && (
            <motion.div
              key="building"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <motion.div
                className="w-14 h-14 rounded-full border-2 border-white/10 border-t-accent"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
              <motion.p
                className="mt-6 text-lg font-bold text-text"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Building your {goal ? GOAL_META[goal.slug]?.label.toLowerCase() : ""} stack…
              </motion.p>
              <p className="mt-2 text-sm text-muted">
                Matching ingredients to real research
              </p>
            </motion.div>
          )}

          {/* ── Step: result ── */}
          {step === "result" && goal && (
            <motion.div
              key="result"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease }}
              className="flex-1"
            >
              {/* Headline + score ring */}
              <div className="flex flex-col items-center text-center mb-8">
                <OnboardingScoreRing score={evidenceScore} label="Evidence" />
                <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                  Your {goal.name}
                </h1>
                <p className="mt-2 text-sm text-muted max-w-lg">{goal.tagline}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[12px] text-muted">
                  <span className="font-bold text-text tabular-nums">{recommended.length}</span> ingredients
                  <span className="opacity-40">·</span>
                  avg research grade <span className="font-bold text-accent tabular-nums">{evidenceScore}</span>
                </div>
              </div>

              {/* Ingredients (staggered) */}
              <ul className="space-y-2 mb-6">
                {recommended.map((r, i) => {
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
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${g.color}1a`, color: g.color }}
                            title={g.label}
                          >
                            {r.grade}
                          </span>
                        )}
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-muted px-1.5 py-0.5 rounded bg-white/[0.05]">
                          {r.tier}
                        </span>
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

              {/* Evidence quality + interactions */}
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + recommended.length * 0.08 + 0.1 }}
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4 flex items-center gap-5 flex-wrap">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Evidence quality
                  </span>
                  {(["A", "B", "C", "D"] as const).map((gr) => {
                    const meta = EVIDENCE_GRADE_META[gr];
                    return (
                      <div key={gr} className="flex items-center gap-1.5">
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
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
                            <span className="text-base" aria-hidden>{meta.icon}</span>
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
                <h2 className="text-lg font-bold text-text mb-1.5">Take this stack into the app</h2>
                <p className="text-sm text-muted leading-relaxed mb-5">
                  Add it to your free stack, log what you take, and watch your
                  nutrient coverage and Stack Score fill in — with a quick guided
                  tour to get you set up.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={appUrl}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-accent text-bg hover:bg-[#00ffb3] hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_-8px_rgba(0,229,160,0.5)]"
                  >
                    Continue in the app — free →
                  </a>
                  <Link
                    href={builderUrl}
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

              <p className="text-[11px] text-muted/60 leading-relaxed mt-8 text-center max-w-xl mx-auto">
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
