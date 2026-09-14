#!/usr/bin/env node
/**
 * Does any class in console.css have two owners?
 *
 * WHAT THIS CAUGHT, TWICE. The console theme is one flat namespace, and CSS
 * settles a tie between two rules of equal specificity by taking the one
 * declared later. So a second rule for an existing class does not conflict
 * loudly; it silently wins, and the loser is whichever element was there
 * first.
 *
 *   - `.glass{position:relative}` beat `.fd-rail{position:fixed}` in the app's
 *     theme, and the log rail laid itself out down the left of the page.
 *   - `.cn-sub` was the hero's sub-headline. A card style added it a second
 *     time 180 lines further down, and the hero's paragraph — "What you take,
 *     eat, train and sleep..." — rendered as one clipped line of mono capitals
 *     on the live landing page.
 *
 * Neither is visible in review: both files are correct on their own, and the
 * diff that breaks the page does not mention the thing it breaks.
 *
 * Rules inside @media and @supports are exempt. Overriding a value at a
 * breakpoint is the mechanism working, not a collision — what this looks for
 * is two unconditional definitions of one name.
 *
 *     node scripts/check-console-css.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FILES = ["src/app/console.css"];

/** Strip every at-rule block, so only unconditional rules are compared. */
function stripAtBlocks(css) {
  let out = "";
  let i = 0;
  while (i < css.length) {
    const at = css.indexOf("@", i);
    if (at === -1) {
      out += css.slice(i);
      break;
    }
    const brace = css.indexOf("{", at);
    if (brace === -1) {
      out += css.slice(i);
      break;
    }
    out += css.slice(i, at);
    // walk to the matching close brace
    let depth = 0;
    let j = brace;
    for (; j < css.length; j += 1) {
      if (css[j] === "{") depth += 1;
      else if (css[j] === "}") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    i = j + 1;
  }
  return out;
}

let problems = 0;
let checked = 0;

for (const rel of FILES) {
  const css = stripAtBlocks(readFileSync(join(ROOT, rel), "utf8"));
  /* Selectors at the start of a line. A rule written on one line with its
     neighbours would be missed, which is why the count is printed: a sudden
     drop says the file's shape changed and this is no longer reading it. */
  const sels = [...css.matchAll(/^([.#][A-Za-z0-9_.\- ]+?)\s*\{/gm)].map((m) => m[1].trim());
  checked += sels.length;

  const seen = new Map();
  for (const s of sels) seen.set(s, (seen.get(s) ?? 0) + 1);
  for (const [sel, n] of [...seen].sort()) {
    if (n < 2) continue;
    problems += 1;
    console.error(
      `[console-css] x ${rel}: "${sel}" is defined ${n} times outside any @media.\n` +
        `              At equal specificity the last one wins, so whichever element\n` +
        `              got there first is now styled by a rule written for something\n` +
        `              else. Give one of them its own name.`,
    );
  }
}

/* A clean run over nothing looks exactly like a clean run, which is the shape
   of bug this file exists to catch. Say what was examined. */
if (checked < 30) {
  console.error(
    `[console-css] x only ${checked} selectors parsed — the file's shape must have\n` +
      `              changed, and this check is no longer reading it.`,
  );
  process.exit(1);
}

if (problems) process.exit(1);
console.log(`[console-css] v ${checked} selectors, none defined twice outside @media.`);
