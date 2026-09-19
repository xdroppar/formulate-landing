import { goalBySlug } from "@/lib/goals";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate evidence by goal";

export default async function Image({ params }: { params: Promise<{ goal: string }> }) {
  const { goal } = await params;
  const g = goalBySlug(goal);
  return renderOgImage({
    topic: "What systematic reviews found",
    title: g ? `Supplements for ${g.label}` : "Supplements by goal",
    subtitle: g ? `${g.helps.length + g.mixed.length} with a benefit · ${g.noEffect.length} with no effect · every review quoted` : undefined,
  });
}
