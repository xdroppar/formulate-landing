import { recipes } from "@/lib/recipes";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate";

export default function Image() {
  return renderOgImage({
    topic: "Recipes",
    title: `${recipes.length} recipes, scored on nutrition`,
    subtitle: "Scored on real portions, not calories alone",
  });
}
