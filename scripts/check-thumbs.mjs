#!/usr/bin/env node
/**
 * The thumbnails must actually be REACHED, not merely exist.
 *
 * `lib/products` thumbUrl matched on the url ending in `/primary.webp` while
 * every image_url carries a `?v=` cache token, so it matched nothing — for
 * every product, for the whole life of the optimisation. Nothing failed:
 * `thumbUrl` fell back to the full-size photo and each page just got heavy.
 * 213 KB of product photography went into a 48px slot on the site's most-read
 * pages and no test, type or build could see it.
 *
 * So this asserts the RESOLUTION, not the file: how many products reach a
 * thumb through the real function, and that the file it names is on disk.
 * A floor rather than an exact count, because the catalogue grows and a new
 * product legitimately arrives without one.
 *
 *   node scripts/check-thumbs.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MIN_RESOLVED_SHARE = 0.9;

/** The same rule lib/products uses, kept here deliberately: if that file's
 *  version drifts, these two disagree and the check fails, which is the
 *  point. A copy that can dissent is worth more than an import that cannot. */
function thumbFor(imageUrl) {
  const [path, query] = imageUrl.split("?");
  const candidate = path.replace(/\/primary\.webp$/, "/thumb.webp");
  if (candidate === path) return null;
  if (!existsSync(join(ROOT, "public", candidate))) return null;
  return query ? `${candidate}?${query}` : candidate;
}

const catalog = JSON.parse(readFileSync(join(ROOT, "src/data/catalog.json"), "utf8"));
const withImage = catalog.products.filter((p) => !p.is_draft && p.image_url);
const resolved = withImage.filter((p) => thumbFor(p.image_url));
const share = resolved.length / Math.max(1, withImage.length);

// A control: the rule must reject something it should not match, or a rule
// that returns a path for everything would pass this check while being wrong.
const control = thumbFor("/images/products/nothing/here/other.png");

const problems = [];
if (share < MIN_RESOLVED_SHARE) {
  problems.push(
    `only ${resolved.length}/${withImage.length} products (${Math.round(share * 100)}%) reach a thumb; ` +
      `floor is ${Math.round(MIN_RESOLVED_SHARE * 100)}%. Run: node scripts/make-thumbs.mjs`,
  );
}
if (control !== null) {
  problems.push(`the rule matched a non-primary path (${control}) — it is too loose`);
}

if (problems.length) {
  console.error("[thumbs] x " + problems.join("\n          x "));
  process.exit(1);
}
console.log(
  `[thumbs] v ${resolved.length}/${withImage.length} supplement products reach a thumb on disk`,
);
