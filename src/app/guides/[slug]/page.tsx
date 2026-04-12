import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/guides";
import { ArticleLayout } from "@/components/article-layout";

/* ---------- article content map ---------- */
import { BestCreatine } from "./content/best-creatine-supplements";
import { BestMagnesium } from "./content/best-magnesium-supplements";
import { BestOmega3 } from "./content/best-omega-3-supplements";
import { BestVitaminD } from "./content/best-vitamin-d-supplements";
import { BestSleepProtocol } from "./content/best-sleep-supplement-protocol";
import { BestPreWorkoutProtocol } from "./content/best-pre-workout-supplement-protocol";
import { HowToBuildStack } from "./content/how-to-build-a-supplement-stack";
import { SupplementTimingGuide } from "./content/supplement-timing-guide";
import { HowToReadSupplementLabel } from "./content/how-to-read-a-supplement-label";
import { MagnesiumDeficiency } from "./content/signs-you-are-magnesium-deficient";
import { DoYouNeedMultivitamin } from "./content/do-you-need-a-multivitamin";
import { WhatToLookForInProbiotic } from "./content/what-to-look-for-in-a-probiotic";
import { BeginnerLongevityStack } from "./content/beginner-longevity-supplement-stack";
import { CreatineLoadingPhase } from "./content/creatine-loading-phase";
import { ZincGuide } from "./content/zinc-guide";
import { LionsManeGuide } from "./content/lions-mane-guide";
import { NACGuide } from "./content/nac-guide";
import { AshwagandhaGuide } from "./content/ashwagandha-guide";
import { CollagenGuide } from "./content/collagen-guide";
import { VitaminB12Guide } from "./content/vitamin-b12-guide";
import { BerberineGuide } from "./content/berberine-guide";
import { ElectrolytesGuide } from "./content/electrolytes-guide";
import { TaurineGuide } from "./content/taurine-guide";
import { IronGuide } from "./content/iron-guide";
import { NootropicsGuide } from "./content/nootropics-guide";
import { StrengthTrainingFrequencyLongevity } from "./content/strength-training-frequency-longevity";
import { BestLongevityExercises } from "./content/best-longevity-exercises";
import { Zone2CardioLongevity } from "./content/zone-2-cardio-longevity";
import { MinimumEffectiveDoseStrengthTraining } from "./content/minimum-effective-dose-strength-training";
import { WeeklyLongevityTrainingPlan } from "./content/weekly-longevity-training-plan";
import { VO2MaxLongevity } from "./content/vo2-max-longevity";
import { GripStrengthLongevity } from "./content/grip-strength-longevity";
import { HowToTrainAfter50 } from "./content/how-to-train-after-50";
import { SetsPerMusclePerWeek } from "./content/sets-per-muscle-per-week";
import { BestExercisesForLegs } from "./content/best-exercises-for-legs";
import { BestExercisesForBack } from "./content/best-exercises-for-back";
import { Zone2VsHiit } from "./content/zone-2-vs-hiit";
import { WalkingVsRunningLongevity } from "./content/walking-vs-running-longevity";
import { ProteinIntakeMuscleAfter40 } from "./content/protein-intake-muscle-after-40";
import { SarcopeniaReverseMuscleLoss } from "./content/sarcopenia-reverse-muscle-loss";

const contentMap: Record<string, React.ComponentType> = {
  "best-creatine-supplements": BestCreatine,
  "best-magnesium-supplements": BestMagnesium,
  "best-omega-3-supplements": BestOmega3,
  "best-vitamin-d-supplements": BestVitaminD,
  "best-sleep-supplement-protocol": BestSleepProtocol,
  "best-pre-workout-supplement-protocol": BestPreWorkoutProtocol,
  "how-to-build-a-supplement-stack": HowToBuildStack,
  "supplement-timing-guide": SupplementTimingGuide,
  "how-to-read-a-supplement-label": HowToReadSupplementLabel,
  "signs-you-are-magnesium-deficient": MagnesiumDeficiency,
  "do-you-need-a-multivitamin": DoYouNeedMultivitamin,
  "what-to-look-for-in-a-probiotic": WhatToLookForInProbiotic,
  "beginner-longevity-supplement-stack": BeginnerLongevityStack,
  "creatine-loading-phase": CreatineLoadingPhase,
  "zinc-guide": ZincGuide,
  "lions-mane-guide": LionsManeGuide,
  "nac-guide": NACGuide,
  "ashwagandha-guide": AshwagandhaGuide,
  "collagen-guide": CollagenGuide,
  "vitamin-b12-guide": VitaminB12Guide,
  "berberine-guide": BerberineGuide,
  "electrolytes-guide": ElectrolytesGuide,
  "taurine-guide": TaurineGuide,
  "iron-guide": IronGuide,
  "nootropics-guide": NootropicsGuide,
  "strength-training-frequency-longevity": StrengthTrainingFrequencyLongevity,
  "best-longevity-exercises": BestLongevityExercises,
  "zone-2-cardio-longevity": Zone2CardioLongevity,
  "minimum-effective-dose-strength-training": MinimumEffectiveDoseStrengthTraining,
  "weekly-longevity-training-plan": WeeklyLongevityTrainingPlan,
  "vo2-max-longevity": VO2MaxLongevity,
  "grip-strength-longevity": GripStrengthLongevity,
  "how-to-train-after-50": HowToTrainAfter50,
  "sets-per-muscle-per-week": SetsPerMusclePerWeek,
  "best-exercises-for-legs": BestExercisesForLegs,
  "best-exercises-for-back": BestExercisesForBack,
  "zone-2-vs-hiit": Zone2VsHiit,
  "walking-vs-running-longevity": WalkingVsRunningLongevity,
  "protein-intake-muscle-after-40": ProteinIntakeMuscleAfter40,
  "sarcopenia-reverse-muscle-loss": SarcopeniaReverseMuscleLoss,
};

/* ---------- static params ---------- */
export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

/* ---------- dynamic metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `https://formulate-health.app/guides/${guide.slug}`,
    },
    robots: guide.hidden ? { index: false, follow: false } : undefined,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      tags: guide.tags,
    },
  };
}

/* ---------- page ---------- */
export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const Content = contentMap[slug];
  if (!Content) notFound();

  return (
    <ArticleLayout guide={guide}>
      <Content />
    </ArticleLayout>
  );
}
