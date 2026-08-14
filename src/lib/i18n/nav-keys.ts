/**
 * href -> catalog key for the nav menus.
 *
 * Keyed on href rather than on the English title because two different menu
 * entries legitimately share the title "How we score it" (supplements, foods
 * and nutrients each have their own methodology page). Keying on the visible
 * string would collapse all three onto one translation and quietly give the
 * foods menu the supplements description.
 */
const NAV_KEYS: Record<string, string> = {
  "/supplements": "supplements",
  "/brands": "brands",
  "/interactions": "interactions",
  "/tools/dose-calculator": "doseCalculator",
  "/tools/stack-builder": "stackBuilder",
  "/methodology/supplements": "methodologySupplements",
  "/foods": "foods",
  "/recipes": "recipes",
  "/methodology/foods": "methodologyFoods",
  "/nutrients": "nutrients",
  "/methodology/nutrients": "methodologyNutrients",
  "/guides": "guides",
  "/ingredients": "ingredients",
  "/research": "research",
  "/conditions": "conditions",
  "/compare": "compare",
  "/synergies": "synergies",
};

type T = (key: string) => string;

function lookup(t: T, href: string, field: "title" | "desc", fallback: string) {
  const key = NAV_KEYS[href];
  if (!key) return fallback;
  const path = `nav.items.${key}.${field}`;
  const out = t(path);
  // translate() echoes the key path when a key is missing; never render that.
  return out === path ? fallback : out;
}

export function navTitle(t: T, href: string, fallback: string) {
  return lookup(t, href, "title", fallback);
}

export function navDesc(t: T, href: string, fallback: string) {
  return lookup(t, href, "desc", fallback);
}
