/**
 * Capture the console shot used by the landing hero.
 *
 * WHY A CAPTURE AND NOT AN IFRAME. The prototype embedded the running app in a
 * scaled iframe, on the sound principle that a hand-built miniature drifts the
 * first time either it or the app moves. That cannot work here for two reasons
 * that are not matters of taste:
 *
 *   1. app.formulate-health.app answers with `X-Frame-Options: DENY`. Not a
 *      slow load — a refusal, from every origin, permanently. The frame
 *      rendered as an empty grey box.
 *   2. /today is ~6 MB of HTML. Even framed, that is six megabytes fetched
 *      before a visitor sees the hero of a landing page.
 *
 * A capture keeps the principle that made the iframe right — the picture is
 * the real app, not a drawing of it — and pays neither cost. It drifts only if
 * nobody re-runs this, so re-run it whenever the console changes:
 *
 *     node scripts/capture-console.mjs
 *
 * Point it somewhere else with CONSOLE_SHOT_URL (a local dev server, say, to
 * see a change before it deploys).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The frame's own aspect ratio, in console.css. Both numbers live here and
 *  are referenced there in a comment; a mismatch shows up as letterboxing. */
const WIDTH = 1560;
const HEIGHT = 900;

const URL = process.env.CONSOLE_SHOT_URL || "https://app.formulate-health.app/today";
const OUT = join(ROOT, "public", "console-today.webp");

/** Chrome, wherever this machine keeps it. */
function findChrome() {
  const candidates = [
    process.env.CHROME,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  const hit = candidates.find((p) => existsSync(p));
  if (!hit) {
    throw new Error(
      `Chrome not found. Tried:\n  ${candidates.join("\n  ")}\nSet CHROME to its path.`,
    );
  }
  return hit;
}

const work = mkdtempSync(join(tmpdir(), "console-shot-"));
const png = join(work, "shot.png");

try {
  console.log(`capturing ${URL} at ${WIDTH}x${HEIGHT}`);
  execFileSync(
    findChrome(),
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      `--window-size=${WIDTH},${HEIGHT}`,
      `--screenshot=${png}`,
      // The console paints its rings and bars after hydration; a budget below
      // this captures the skeleton, which looks like a broken app.
      "--virtual-time-budget=9000",
      URL,
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );

  if (!existsSync(png)) throw new Error("Chrome exited without writing a screenshot.");

  /* A capture of the wrong size is the failure this catches: a Chrome that
     clamps the window (some builds floor the width) writes a real PNG at the
     wrong dimensions, and the only symptom downstream is a hero that looks
     subtly cropped. Better to fail here than to ship it. */
  const meta = await sharp(png).metadata();
  if (meta.width !== WIDTH || meta.height !== HEIGHT) {
    throw new Error(
      `Captured ${meta.width}x${meta.height}, expected ${WIDTH}x${HEIGHT}. ` +
        `Chrome clamped the window; the shot would be cropped in the frame.`,
    );
  }

  await sharp(png).webp({ quality: 82 }).toFile(OUT);
  const before = statSync(png).size;
  const after = statSync(OUT).size;
  console.log(
    `wrote ${OUT}  ${(after / 1024).toFixed(0)} KB  (from ${(before / 1024).toFixed(0)} KB png)`,
  );
} finally {
  rmSync(work, { recursive: true, force: true });
}
