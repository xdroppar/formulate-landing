#!/usr/bin/env node
/**
 * Catalog integrity gate for the message files in src/lib/i18n/messages/.
 *
 * `tsc` cannot see any of this: the catalogs are JSON, and every failure below
 * renders as plausible-looking text rather than an error. Each check exists
 * because the exact bug happened.
 *
 *   1. ORPHAN KEYS — a locale defines a key en.json doesn't. getMessages()
 *      deep-merges the locale OVER English, so an orphan can never be reached
 *      by t(); it is dead weight that looks like coverage. Two sat in es.json
 *      for weeks reading as "es has more keys than en".
 *
 *   2. HTML ENTITIES — JSX decodes `&apos;` in source, but a catalog value is
 *      a string React escapes on the way out, so `&apos;` in a catalog renders
 *      LITERALLY on the page. This shipped: "Today&apos;s schedule" was visible
 *      in production, and it recurred on the webapp after being fixed on
 *      landing because the fix was applied to the artifact, not the generator.
 *
 *   3. PLACEHOLDER LOSS — if en has "{count} products" and a translation drops
 *      {count}, that language silently loses the number. Interpolated strings
 *      are the one class tx() can never reach, so they are always t() with vars,
 *      and a missing placeholder is invisible until someone reads that locale.
 *
 *   4. DIVERGENT DUPLICATES — translateText() is a reverse index keyed on the
 *      English string, so if two keys share an English value, ONE of them wins
 *      and decides what every tx() call site renders. That is harmless while
 *      the translations agree (nav.products and app.products are both "产品"),
 *      and a bug the moment they don't: nav.protocols was 方案 while
 *      app.protocols2 was 协议 — and 方案 is what "My Stack" uses, so the
 *      Chinese Protocols tab read as a different feature.
 *
 *      Only DIVERGENCE is flagged. Flagging every shared value would have
 *      failed on 31 harmless pairs, and a gate that cries wolf gets bypassed.
 *
 * Partial locales are expected and NOT flagged: de/fr/pt/it/nl deliberately
 * carry chrome only, and missing keys fall through to English by design. This
 * gate is about catalogs being WRONG, not about them being incomplete.
 *
 * Run: node scripts/i18n-check.mjs        (also part of `npm run verify`)
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/lib/i18n/messages";
const ENTITY = /&(?:[a-zA-Z]+|#\d+);/;
const PLACEHOLDER = /\{(\w+)\}/g;

const load = (f) => JSON.parse(readFileSync(join(DIR, f), "utf8"));
const flatten = (obj, prefix = "") => {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === "object" && !Array.isArray(v)) Object.assign(out, flatten(v, `${prefix}${k}.`));
    else if (typeof v === "string") out[`${prefix}${k}`] = v;
  }
  return out;
};

const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
if (!files.includes("en.json")) {
  console.error("[i18n] en.json missing from " + DIR);
  process.exit(1);
}

const en = flatten(load("en.json"));
const enKeys = new Set(Object.keys(en));

// CONTROL: an empty result is the likeliest output of a broken check, so prove
// the loader actually produced a catalog before trusting any "0 problems".
if (enKeys.size < 100) {
  console.error(`[i18n] en.json flattened to only ${enKeys.size} keys — the loader is wrong, not the catalog.`);
  process.exit(1);
}

const problems = [];

const catalogs = new Map(files.map((f) => [f.replace(/\.json$/, ""), flatten(load(f))]));

// 4. duplicate English values whose translations DISAGREE
const byValue = new Map();
for (const [k, v] of Object.entries(en)) {
  if (v.trim().length < 3) continue; // "×", "Lv" and friends are legitimately repeated
  if (!byValue.has(v)) byValue.set(v, []);
  byValue.get(v).push(k);
}
for (const [value, keys] of byValue) {
  if (keys.length < 2) continue;
  for (const [locale, cat] of catalogs) {
    if (locale === "en") continue;
    const seen = new Map();
    for (const k of keys) if (k in cat) seen.set(cat[k], k);
    if (seen.size > 1) {
      const shown = [...seen].map(([tr, k]) => `${k}=${JSON.stringify(tr)}`).join(" vs ");
      problems.push(
        `${locale}.json: ${JSON.stringify(value.slice(0, 40))} is translated two ways — ${shown}. ` +
        `tx() serves only one of them, at every call site.`,
      );
    }
  }
}

for (const file of files) {
  const locale = file.replace(/\.json$/, "");
  const cat = catalogs.get(locale);

  for (const [key, value] of Object.entries(cat)) {
    // 1. orphan keys
    if (!enKeys.has(key)) {
      problems.push(`${file}: key "${key}" is not in en.json — unreachable, deep-merge drops it`);
      continue;
    }
    // 2. html entities
    if (ENTITY.test(value)) {
      problems.push(`${file}: "${key}" contains an HTML entity (${value.match(ENTITY)[0]}) — renders literally`);
    }
    // 3. placeholder loss
    if (locale !== "en") {
      const want = [...en[key].matchAll(PLACEHOLDER)].map((m) => m[0]).sort();
      const got = [...value.matchAll(PLACEHOLDER)].map((m) => m[0]).sort();
      const missing = want.filter((p) => !got.includes(p));
      if (missing.length) {
        problems.push(`${file}: "${key}" lost ${missing.join(", ")} — that value vanishes in ${locale}`);
      }
    }
  }
}

const counts = files.map((f) => `${f.replace(/\.json$/, "")}=${Object.keys(flatten(load(f))).length}`).join(" ");
if (problems.length) {
  console.error(`[i18n] ✗ ${problems.length} problem(s) across ${files.length} catalogs (${counts})`);
  for (const p of problems.slice(0, 40)) console.error("       " + p);
  if (problems.length > 40) console.error(`       … and ${problems.length - 40} more`);
  process.exit(1);
}
console.log(`[i18n] ✓ ${files.length} catalogs clean (${counts})`);
