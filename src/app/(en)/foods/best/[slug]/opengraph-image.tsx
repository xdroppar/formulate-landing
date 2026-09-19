import { groupByGroupSlug, foodsByGroup } from "@/lib/foods";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate food rankings";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const group = groupByGroupSlug(slug);
  const n = group ? foodsByGroup(group).length : 0;
  return renderOgImage({ topic: "Whole foods", title: group ? `Healthiest ${group}` : "Healthiest foods", subtitle: n ? `${n} ranked by nutrition score` : undefined });
}
