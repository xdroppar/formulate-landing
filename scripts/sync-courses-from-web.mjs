#!/usr/bin/env node
/**
 * Mirror the Learning course content from the web app into the landing.
 *
 * The 15 courses (172 lessons) are authored on web as pure data in
 * `src/data/learning-tracks-content.json`. The app renders them under
 * /learning/track/<id> as noindex; this site publishes them as the indexed
 * /courses pages. Landing never edits the file — edit it on web, then run this.
 *
 * Reads web at its SHIPPING ref (`origin/master` by default), never the
 * working tree: the local formulate-web checkout routinely sits on an old
 * branch, and copying from disk would publish whatever that branch had.
 *
 *   node scripts/sync-courses-from-web.mjs           # write the mirror
 *   node scripts/sync-courses-from-web.mjs --check   # exit 1 if it drifted
 *
 * Env: FORMULATE_WEB_DIR (default ../formulate-web from the main checkout),
 *      FORMULATE_WEB_REF (default origin/master).
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const LANDING_ROOT = resolve(SCRIPT_DIR, "..");
const DEST = join(LANDING_ROOT, "src", "data", "learning-tracks-content.json");
const SRC_PATH = "src/data/learning-tracks-content.json";
const REF = process.env.FORMULATE_WEB_REF || "origin/master";
const CHECK = process.argv.includes("--check");

function die(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

/** A worktree lives outside clawd/, so find web as a sibling of the MAIN checkout. */
function webRoot() {
  if (process.env.FORMULATE_WEB_DIR) return process.env.FORMULATE_WEB_DIR;
  const common = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], {
    cwd: LANDING_ROOT,
    encoding: "utf8",
  }).trim();
  return resolve(dirname(common), "..", "formulate-web");
}

const WEB = webRoot();
if (!existsSync(WEB)) die(`formulate-web not found at ${WEB} (set FORMULATE_WEB_DIR)`);

let raw;
try {
  raw = execFileSync("git", ["-C", WEB, "show", `${REF}:${SRC_PATH}`], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
} catch (e) {
  die(`could not read ${REF}:${SRC_PATH} in ${WEB} — fetch web first? ${e.message}`);
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  die(`web ${SRC_PATH} at ${REF} is not valid JSON: ${e.message}`);
}
const tracks = Object.values(data);
const lessons = tracks.reduce((n, t) => n + (Array.isArray(t.lessons) ? t.lessons.length : 0), 0);
if (tracks.length < 1 || lessons < 1) die(`web ${SRC_PATH} holds no lessons — refusing to mirror it.`);

// Normalise to LF so a CRLF checkout can't make --check fail on line endings alone.
const out = raw.replace(/\r\n/g, "\n");

if (CHECK) {
  const have = existsSync(DEST) ? readFileSync(DEST, "utf8").replace(/\r\n/g, "\n") : "";
  if (have !== out) {
    console.error(
      `[courses] DRIFT: src/data/learning-tracks-content.json differs from web ${REF}. ` +
        `Run: node scripts/sync-courses-from-web.mjs`,
    );
    process.exit(1);
  }
  console.log(`[courses] in sync with web ${REF}: ${tracks.length} courses, ${lessons} lessons`);
  process.exit(0);
}

writeFileSync(DEST, out);
console.log(`[courses] mirrored web ${REF}: ${tracks.length} courses, ${lessons} lessons -> ${DEST}`);
