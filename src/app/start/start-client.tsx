"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EVIDENCE_GRADE_META } from "@/lib/encyclopedia";
import {
  checkStack as checkInteractionStack,
  SEVERITY_META,
} from "@/lib/interactions";
import { withUtm } from "@/lib/app-url";

const APP_URL = "https://app.formulate-health.app";

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
  sleep: { label: "Sleep better", emoji: "😴" },
  cognitive: { label: "Focus & memory", emoji: "🧠" },
  longevity: { label: "Longevity & healthspan", emoji: "⏳" },
  recovery: { label: "Train & recover", emoji: "💪" },
  immunity: { label: "Immune support", emoji: "🛡️" },
  "gut-health": { label: "Gut health", emoji: "🌱" },
  mood: { label: "Mood support", emoji: "☀️" },
  cardiovascular: { label: "Heart health", emoji: "❤️" },
  metabolic: { label: "Blood sugar & metabolic", emoji: "🩸" },
  testosterone: { label: "Testosterone (men's)", emoji: "⚡" },
};

type Experience = "new" | "some" | "experienced";
const EXPERIENCE: { id: Experience; label: string; sub: string; tiers: Tier[] }[] = [
  {
    id: "new",
    label: "I'm just starting",
    sub: "Show me only the essentials",
    tiers: ["core"],
  },
  {
    id: "some",
    label: "I take a few things",
    sub: "Core plus proven add-ons",
    tiers: ["core", "supporting"],
  },
  {
    id: "experienced",
    label: "I know my stuff",
    sub: "Give me the full stack",
    tiers: ["core", "supporting", "optional"],
  },
];

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
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [goalSlug, setGoalSlug] = useState<string | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);

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

  // Recommended ingredients filtered by the user's experience level,
  // enriched with the encyclopedia's research grade + display name.
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
          // Only encyclopedia-backed slugs deep-link cleanly elsewhere.
          known: Boolean(meta),
        };
      });
  }, [goal, tiers, ingredientMap]);

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

  // Handoff URLs. The webapp launches its own onboarding tour via
  // ?reset_onboarding=1; we also pass goal + stack so a future webapp
  // build can pre-seed the stack (harmless if ignored today).
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

  function pickGoal(slug: string) {
    setGoalSlug(slug);
    setStep(1);
  }

  function pickExperience(id: Experience) {
    setExperience(id);
    setStep(2);
  }

  function restart() {
    setGoalSlug(null);
    setExperience(null);
    setStep(0);
  }

  return (
    <main
      id="main-content"
      className="max-w-3xl mx-auto px-6 md:px-8 pt-28 pb-24"
    >
      {/* Progress + heading */}
      <header className="mb-8 max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          {step === 2 ? "Your starter stack" : `Step ${step + 1} of 2`}
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          {step === 0 && "What do you want to improve?"}
          {step === 1 && "How much do you take today?"}
          {step === 2 && goal?.name}
        </h1>
        <p className="text-base text-muted leading-relaxed">
          {step === 0 &&
            "Pick your main goal. We'll build an evidence-based stack — every ingredient graded on real research, with dose and timing."}
          {step === 1 &&
            "We'll tailor how much of the stack to show you, from just the essentials to the full protocol."}
          {step === 2 && goal?.tagline}
        </p>
      </header>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-white/[0.06] mb-10 overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${((step + 1) / 3) * 100}%` }}
        />
      </div>

      {/* ── Step 0: goal ── */}
      {step === 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {goalStacks.map((s) => {
            const m = GOAL_META[s.slug] ?? { label: s.name, emoji: "✨" };
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => pickGoal(s.slug)}
                className="group text-left rounded-2xl border border-border bg-card/30 p-5 hover:border-accent/50 hover:bg-white/[0.03] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-2xl" aria-hidden>
                    {m.emoji}
                  </span>
                  <span className="text-base font-bold text-text group-hover:text-accent transition-colors">
                    {m.label}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {s.tagline}
                </p>
              </button>
            );
          })}
        </section>
      )}

      {/* ── Step 1: experience ── */}
      {step === 1 && (
        <section className="space-y-3">
          {EXPERIENCE.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => pickExperience(e.id)}
              className="group w-full text-left rounded-2xl border border-border bg-card/30 p-5 hover:border-accent/50 hover:bg-white/[0.03] transition-all flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-base font-bold text-text group-hover:text-accent transition-colors">
                  {e.label}
                </div>
                <div className="text-xs text-muted mt-0.5">{e.sub}</div>
              </div>
              <span className="text-muted group-hover:text-accent transition-colors">
                →
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStep(0)}
            className="text-xs text-muted hover:text-accent transition-colors mt-2"
          >
            ← Back
          </button>
        </section>
      )}

      {/* ── Step 2: result ── */}
      {step === 2 && goal && (
        <>
          <section className="mb-8">
            <ul className="space-y-2">
              {recommended.map((r) => {
                const g = r.grade ? EVIDENCE_GRADE_META[r.grade] : null;
                return (
                  <li
                    key={r.slug}
                    className="rounded-xl border border-border bg-white/[0.02] p-4"
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
                        <span className="text-sm font-semibold text-text">
                          {r.name}
                        </span>
                      )}
                      {g && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${g.color}1a`,
                            color: g.color,
                          }}
                          title={g.label}
                        >
                          {r.grade}
                        </span>
                      )}
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-muted px-1.5 py-0.5 rounded bg-white/[0.04]">
                        {r.tier}
                      </span>
                    </div>
                    <p className="text-xs text-text/80 leading-relaxed mb-1.5">
                      {r.role}
                    </p>
                    <p className="text-xs text-muted">
                      <span className="font-semibold uppercase tracking-wider text-[9px]">
                        Dose:
                      </span>{" "}
                      {r.dose}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Evidence quality */}
          <section className="mb-8 rounded-xl border border-border bg-white/[0.02] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
              Evidence quality in this stack
            </h2>
            <div className="flex flex-wrap gap-4">
              {(["A", "B", "C", "D"] as const).map((g) => {
                const meta = EVIDENCE_GRADE_META[g];
                return (
                  <div key={g} className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${meta.color}1a`,
                        color: meta.color,
                      }}
                    >
                      {g}
                    </span>
                    <span className="text-sm text-text font-semibold">
                      {gradeTally[g]}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Interaction check */}
          {interactions.length > 0 && (
            <section className="mb-8">
              <h2 className="text-base font-bold text-text mb-3">
                Interactions to know
                {riskCount > 0 && (
                  <span className="ml-3 text-xs font-semibold uppercase tracking-wider text-red-400">
                    {riskCount} to watch
                  </span>
                )}
              </h2>
              <ul className="space-y-2">
                {interactions.map((i) => {
                  const meta = SEVERITY_META[i.severity];
                  return (
                    <li
                      key={i.pair_key}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${meta.border} ${meta.bg}`}
                    >
                      <span className="text-lg" aria-hidden>
                        {meta.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider ${meta.color}`}
                          >
                            {meta.label}
                          </span>
                          <span className="text-sm font-semibold text-text capitalize">
                            {i.substance_a} + {i.substance_b}
                          </span>
                        </div>
                        <p className="text-xs text-muted mt-0.5 line-clamp-1">
                          {i.summary}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Handoff CTAs */}
          <section className="rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 mb-6">
            <h2 className="text-lg font-bold text-text mb-1.5">
              Take this stack into the app
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-5">
              Add it to your free stack, log what you take, and watch your
              nutrient coverage and Stack Score fill in — plus a quick guided
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
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border border-border text-text hover:border-accent hover:text-accent transition-all"
              >
                Refine in Stack Builder
              </Link>
            </div>
            <p className="text-[12px] text-muted/70 mt-4">
              Free forever · No account needed to start · No brand sponsorships
            </p>
          </section>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={restart}
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              ↺ Start over
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              ← Change experience level
            </button>
          </div>

          <p className="text-xs text-muted/70 leading-relaxed mt-10 border-t border-border pt-6">
            <strong className="text-text/80">Educational only.</strong> These
            are evidence-based starting points, not medical advice. Always run a
            supplement stack by a pharmacist or clinician if you take
            prescription medication or have a health condition.
          </p>
        </>
      )}
    </main>
  );
}
