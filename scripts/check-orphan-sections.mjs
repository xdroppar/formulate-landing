#!/usr/bin/env node
/**
 * Fails when the sitemap advertises a section that nothing site-wide links to.
 *
 * WHY THIS EXISTS. A section can be perfectly built, serve 200 to Googlebot,
 * carry a self-canonical and still never be indexed, because "crawlable" and
 * "discoverable" are different properties. Google files a URL it has only ever
 * seen in a sitemap as "Discovered - currently not indexed" and deprioritises
 * fetching it; in August it was holding 1,611 of this site's URLs in exactly
 * that state. A sitemap entry is a request, an internal link is a reason.
 *
 * Measured 2026-10-02 - four sections, 157 pages, advertised in the sitemap and
 * linked from NO chrome surface at all:
 *
 *   /learn             73 pages   product-type guides
 *   /care-ingredients  76 pages   skincare / sunscreen / oral-care actives
 *   /brand-compare      7 pages   linked from nothing in the repo but sitemap.ts
 *   /app                1 page    the iPhone download page, at priority 0.9
 *
 * /app is the one that stung: site-surfaces labelled /download "iPhone app"
 * while /download is the web app plus a Windows desktop waitlist, so the
 * homepage's only iPhone link pointed at the wrong page and the real one was
 * reachable only from in-body conversion blocks.
 *
 * This is the second time this shape has been paid for here: the console
 * homepage dropped the old mega-nav and took the site's internal linking with
 * it, which is the whole reason lib/site-surfaces.ts exists. That fix added
 * the links that were missing THAT DAY. This gate is the part that keeps the
 * next section from going quiet - the artifact was corrected, the generator
 * was not.
 *
 * HOW IT READS BOTH SIDES. Sections come from literal `${baseUrl}/<section>`
 * templates in the sitemap generator, so the gate asks the same file Google
 * does. Links come from the four surfaces that render on every page or on the
 * homepage. A section counts as linked when any of them points at `/section`
 * or into `/section/...`.
 *
 * Run: node scripts/check-orphan-sections.mjs   (also part of `npm run verify`)
 */
import { readFileSync } from "node:fs";

const SITEMAP = "src/app/sitemap.ts";

/** Surfaces that link site-wide (or from the homepage, which has the most authority to). */
const CHROME = [
  "src/lib/site-surfaces.ts",
  "src/components/footer.tsx",
  "src/components/footer-explore.tsx",
  "src/components/nav.tsx",
];

/**
 * Sections deliberately NOT in chrome. A section belongs here only with a
 * reason, so the next orphan is a decision someone made rather than one
 * nobody noticed.
 */
const DELIBERATE = {
  reports:
    "single long-form report, linked in-body from /supplements/for/[goal] and ingredient-reviews; a chrome slot would outrank its one page",
};

const sitemapSrc = readFileSync(SITEMAP, "utf8");

// Only literal sections: `${baseUrl}/${l.code}` and `${baseUrl}` itself must not match.
const advertised = new Set(
  [...sitemapSrc.matchAll(/\$\{baseUrl\}\/([a-z][a-z0-9-]*)/g)].map((m) => m[1]),
);
if (advertised.size === 0) {
  console.error(
    `check-orphan-sections: parsed 0 sections out of ${SITEMAP}. The template or variable name changed; fix this gate rather than trusting it.`,
  );
  process.exit(1);
}

const hrefs = new Set();
for (const file of CHROME) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/["'`](\/[a-z][a-z0-9\-/]*)["'`]/g)) hrefs.add(m[1]);
}
if (hrefs.size === 0) {
  console.error("check-orphan-sections: found 0 chrome hrefs. The gate is broken, not the site.");
  process.exit(1);
}

const linked = (section) =>
  hrefs.has(`/${section}`) || [...hrefs].some((h) => h.startsWith(`/${section}/`));

const orphans = [...advertised].filter((s) => !linked(s) && !(s in DELIBERATE)).sort();

if (orphans.length) {
  console.error("Sections in the sitemap that nothing site-wide links to:\n");
  for (const s of orphans) console.error(`  /${s}`);
  console.error(
    `\nGoogle files a sitemap-only URL as "Discovered - currently not indexed" and stops fetching it.` +
      `\nAdd each one to src/lib/site-surfaces.ts (the homepage list, and where llms.txt reads its counts) and` +
      `\nsrc/components/footer-explore.tsx (every page) - or, if it is meant to stay out of` +
      `\nchrome, add it to DELIBERATE in this file with the reason.`,
  );
  process.exit(1);
}

console.log(
  `check-orphan-sections: ${advertised.size} sitemap sections, all linked site-wide` +
    `${Object.keys(DELIBERATE).length ? ` (${Object.keys(DELIBERATE).length} deliberately in-body only)` : ""}.`,
);
