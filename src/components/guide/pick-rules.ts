/**
 * What each guide ranks, as a rule over the catalog. Shared by the live
 * top-picks list and by the counts in the guides' own sentences, so the
 * number a guide prints and the list it shows can never disagree.
 *
 * Each rule was checked against the live catalog when written (2026-09-18):
 * category alone admits pre-workouts as multivitamins and milk thistle as an
 * adaptogen, so every rule says what it means in the product's own terms.
 */

import type { PickRule } from "./catalog-top-picks";

export const PICK_RULES = {
  /** Creatine on its own — no blends, no "+ Alpha GPC", no gummies. */
  creatine: { nameAny: [/creatine/i], nameNone: [/\+|alpha|hmb|beta|gumm/i], maxActives: 1 },
  /** A single magnesium compound — no cal-mag, no ZMA. */
  magnesium: { nameAny: [/magnesium/i], nameNone: [/calcium|zinc|zma/i], maxActives: 1 },
  omega3: {
    categories: ["Fish Oil & Omegas"],
    nameAny: [/omega|epa|dha|fish oil|krill|alga|cod liver/i],
    nameNone: [/testosterone|prenatal/i],
  },
  vitaminD: { categories: ["Vitamin D"] },
  collagen: { categories: ["Collagen"] },
  /** A real multi: fifteen or more dosed nutrients, adult formulas. */
  multivitamin: { categories: ["Multivitamins"], nameNone: [/prenatal|kid|child|gumm|teen|mediclear|shake|protein/i], minActives: 15 },
  probiotic: { categories: ["Probiotics"] },
  /** The three adaptogens the stress guide actually covers. */
  adaptogens: { nameAny: [/ashwagandha|rhodiola|reishi/i] },
  berberine: { nameAny: [/berberine/i], maxActives: 1 },
  nac: { nameAny: [/\bnac\b|n-acetyl/i], maxActives: 1 },
  b12: { nameAny: [/\bb-?12\b|methylcobalamin|cobalamin/i], maxActives: 2 },
} satisfies Record<string, PickRule>;
