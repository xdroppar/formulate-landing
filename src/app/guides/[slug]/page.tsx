import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides, getGuideBySlug, getAllGuideSlugs } from "@/lib/guides";
import { ArticleLayout } from "@/components/article-layout";

/* ---------- article content map ---------- */
import { BestCreatine } from "./content/best-creatine-supplements";
import { BestMagnesium } from "./content/best-magnesium-supplements";
import { BestOmega3 } from "./content/best-omega-3-supplements";
import { BestVitaminD } from "./content/best-vitamin-d-supplements";
import { BestSleepProtocol } from "./content/best-sleep-supplement-protocol";
import { BestPreWorkoutProtocol } from "./content/best-pre-workout-supplement-protocol";
import { HowToBuildStack } from "./content/how-to-build-a-supplement-stack";

const contentMap: Record<string, React.ComponentType> = {
  "best-creatine-supplements": BestCreatine,
  "best-magnesium-supplements": BestMagnesium,
  "best-omega-3-supplements": BestOmega3,
  "best-vitamin-d-supplements": BestVitaminD,
  "best-sleep-supplement-protocol": BestSleepProtocol,
  "best-pre-workout-supplement-protocol": BestPreWorkoutProtocol,
  "how-to-build-a-supplement-stack": HowToBuildStack,
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
