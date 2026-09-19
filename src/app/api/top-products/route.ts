import { NextResponse } from "next/server";
import { ingredients } from "@/lib/encyclopedia";
import { topProductForIngredient } from "@/lib/ingredient-products";

/**
 * ingredient slug → the one product to offer for it, for the tools that let
 * someone build a stack out of INGREDIENTS.
 *
 * The stack builder and /start deal in ingredients ("magnesium"), while the
 * app's stack holds products. Carrying a built stack across needs that
 * mapping, and the rule for it is stated once in lib/ingredient-products:
 * the highest-scored product NAMED for the ingredient, a single-ingredient
 * one where it exists.
 *
 * Served rather than passed as props: the builder ships all 968 ingredients
 * to the browser already, and a product per ingredient would put ~87 KB more
 * into the page for a map most readers never use. Fetched once, on the first
 * pick, and cached by the CDN.
 */
export const dynamic = "force-static";

export function GET() {
  const map: Record<string, string> = {};
  for (const ing of ingredients) {
    const product = topProductForIngredient(ing);
    if (product && product.score != null) map[ing.slug] = product.slug;
  }
  return NextResponse.json(
    { map },
    { headers: { "cache-control": "public, max-age=3600, s-maxage=86400" } },
  );
}
