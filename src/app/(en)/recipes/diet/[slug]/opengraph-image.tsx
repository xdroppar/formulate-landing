import { dietByDietSlug, recipesByDiet } from "@/lib/recipes";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate recipes";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = dietByDietSlug(slug);
  const n = tag ? recipesByDiet(tag).length : 0;
  return renderOgImage({ topic: "Recipes", title: tag ? `${tag} recipes` : "Recipes", subtitle: n ? `${n} scored on real nutrition` : undefined });
}
