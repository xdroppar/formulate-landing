/**
 * IngredientLink — inline link from guide prose to an ingredient's
 * encyclopedia page on the webapp. The `id` must be a canonical
 * lc-supplements id (kebab-case, e.g. "magnesium-glycinate", "vitamin-d3",
 * "ashwagandha"). Children render as the visible link text so authors can
 * use any phrasing ("magnesium glycinate", "Mg glycinate", etc.) while still
 * pointing at the correct entry.
 *
 * Adds UTM attribution automatically so traffic from guides → encyclopedia
 * is measurable in analytics.
 */

import { ingredientLearnUrl } from "@/lib/app-url";

interface IngredientLinkProps {
  id: string;
  source?: string;
  children: React.ReactNode;
}

export function IngredientLink({ id, source = "guide", children }: IngredientLinkProps) {
  return (
    <a
      href={ingredientLearnUrl(id, source)}
      className="text-accent hover:underline decoration-dotted underline-offset-2"
      title={`Learn about ${typeof children === "string" ? children : id}`}
    >
      {children}
    </a>
  );
}
