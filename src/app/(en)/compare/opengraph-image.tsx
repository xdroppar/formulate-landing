import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate";

export default function Image() {
  return renderOgImage({
    topic: "Compare",
    title: "Supplement comparisons, side by side",
    subtitle: "When to pick each, and what the research shows",
  });
}
