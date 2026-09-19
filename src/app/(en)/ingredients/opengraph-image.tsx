import { ingredients } from "@/lib/encyclopedia";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate";

export default function Image() {
  return renderOgImage({
    topic: "Encyclopedia",
    title: `${ingredients.length} ingredients, evidence-graded`,
    subtitle: "Uses, dose, evidence and interactions",
  });
}
