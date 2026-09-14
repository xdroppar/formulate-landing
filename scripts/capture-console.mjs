/**
 * Capture the console shot used by the landing hero.
 *
 * WHY A CAPTURE AND NOT AN IFRAME. The prototype embedded the running app in a
 * scaled iframe, on the sound principle that a hand-built miniature drifts the
 * first time either it or the app moves. That cannot work here for two reasons
 * that are not matters of taste:
 *
 *   1. app.formulate-health.app answers with `X-Frame-Options: DENY`. Not a
 *      slow load — a refusal, from every origin, permanently.
 *   2. /today is several MB of HTML. Even framed, that is megabytes fetched
 *      before a visitor sees the hero of a landing page.
 *
 * WHY THIS DRIVES CHROME INSTEAD OF ASKING IT FOR A SCREENSHOT. The first
 * version of this script was one `--screenshot` flag, and it worked until
 * /today was added to the onboarding entry paths. Then a fresh browser met the
 * six-step goal picker, and the script cheerfully captured THAT: exit 0, a
 * real PNG, a wrong picture, and a landing page advertising a questionnaire.
 * Nothing about the run looked wrong.
 *
 * So it does two things a flag cannot. It seeds the onboarding flags before
 * any page script runs, so the console is what loads. And it then ASKS THE
 * PAGE what it is showing, and refuses to write a file unless the console's
 * own markers are present and the onboarding overlay is not. A capture that
 * cannot tell you what it captured is not evidence of anything.
 *
 *     node scripts/capture-console.mjs
 *
 * Point it somewhere else with CONSOLE_SHOT_URL (a local dev server, say).
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The frame's own aspect ratio, in console.css. A mismatch letterboxes. */
const WIDTH = 1560;
const HEIGHT = 900;

const URL_ = process.env.CONSOLE_SHOT_URL || "https://app.formulate-health.app/today";
const OUT = join(ROOT, "public", "console-today.webp");
const PORT = Number(process.env.CONSOLE_SHOT_PORT || 9333);

/** The console is on screen when these exist. */
const WANT = [".fd-ringsvg", ".fd-header", ".fd-rail"];
/** ...and when none of these do. Text, because the overlay's classes are
 *  generated and its copy is the thing a reader would actually recognise. */
const REJECT = ["What do you want your", "Pick a goal to start", "STEP 1 OF"];

function findChrome() {
  const candidates = [
    process.env.CHROME,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  const hit = candidates.find((p) => existsSync(p));
  if (!hit) throw new Error(`Chrome not found. Tried:\n  ${candidates.join("\n  ")}`);
  return hit;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Minimal CDP client. One socket, one id counter, promises by id. */
function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  const pending = new Map();
  let id = 0;
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    const p = pending.get(msg.id);
    if (!p) return;
    pending.delete(msg.id);
    if (msg.error) p.reject(new Error(msg.error.message));
    else p.resolve(msg.result);
  });
  const ready = new Promise((res, rej) => {
    ws.addEventListener("open", res, { once: true });
    ws.addEventListener("error", () => rej(new Error("CDP socket failed")), { once: true });
  });
  return {
    ready,
    send(method, params = {}) {
      id += 1;
      const mine = id;
      return new Promise((resolve, reject) => {
        pending.set(mine, { resolve, reject });
        ws.send(JSON.stringify({ id: mine, method, params }));
      });
    },
    close: () => ws.close(),
  };
}

const work = mkdtempSync(join(tmpdir(), "console-shot-"));
let chrome;

try {
  chrome = spawn(
    findChrome(),
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${work}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "ignore"] },
  );

  // Wait for the debugger to answer rather than guessing at a sleep.
  let version = null;
  for (let i = 0; i < 60 && !version; i += 1) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) version = await r.json();
    } catch {
      await sleep(250);
    }
  }
  if (!version) throw new Error(`Chrome never opened a debugger on ${PORT}.`);

  const made = await fetch(`http://127.0.0.1:${PORT}/json/new?url=about:blank`, { method: "PUT" });
  const target = await made.json();
  const cdp = connect(target.webSocketDebuggerUrl);
  await cdp.ready;

  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
    mobile: false,
  });

  /* Before any page script runs. The console is what a returning user sees,
     and a returning user is what this picture is of — a visitor's first-run
     questionnaire is a different screen with a different argument. */
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `try {
      localStorage.setItem("formulate_onboarding_done", "1");
      localStorage.setItem("formulate_tour_done", "1");
      localStorage.setItem("formulate_companion_intro_seen", "1");
    } catch (e) {}`,
  });

  console.log(`capturing ${URL_} at ${WIDTH}x${HEIGHT}`);
  await cdp.send("Page.navigate", { url: URL_ });

  /* Poll the page for what it is actually showing. This is the whole point of
     the rewrite: the old script's only question was "did Chrome write a file". */
  const probe = `(() => ({
    want: ${JSON.stringify(WANT)}.map((s) => !!document.querySelector(s)),
    reject: ${JSON.stringify(REJECT)}.map((t) => document.body.innerText.includes(t)),
  }))()`;

  let state = null;
  for (let i = 0; i < 40; i += 1) {
    await sleep(500);
    const { result } = await cdp.send("Runtime.evaluate", {
      expression: probe,
      returnByValue: true,
    });
    state = result.value;
    if (state && state.want.every(Boolean) && !state.reject.some(Boolean)) break;
  }

  if (!state || !state.want.every(Boolean) || state.reject.some(Boolean)) {
    const missing = WANT.filter((_, i) => !state?.want?.[i]);
    const found = REJECT.filter((_, i) => state?.reject?.[i]);
    throw new Error(
      "The page never showed the console, so nothing was written.\n" +
        (missing.length ? `  missing: ${missing.join(", ")}\n` : "") +
        (found.length ? `  showing instead: ${found.join(" / ")}\n` : "") +
        "  If onboarding changed, update the seeded flags in this script.",
    );
  }

  const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
  const png = join(work, "shot.png");
  writeFileSync(png, Buffer.from(shot.data, "base64"));

  const meta = await sharp(png).metadata();
  if (meta.width !== WIDTH || meta.height !== HEIGHT) {
    throw new Error(`Captured ${meta.width}x${meta.height}, expected ${WIDTH}x${HEIGHT}.`);
  }

  await sharp(png).webp({ quality: 82 }).toFile(OUT);
  console.log(
    `wrote ${OUT}  ${(statSync(OUT).size / 1024).toFixed(0)} KB  ` +
      `(verified: ${WANT.join(" + ")} present, no onboarding)`,
  );
  cdp.close();
} finally {
  if (chrome) chrome.kill();
  /* Chrome does not release the profile directory the instant it is killed, and
     on Windows removing it too early throws EPERM — which would fail the script
     AFTER it had already written a good picture, reporting a success as a
     failure. Give it a moment, then treat a leftover temp directory as what it
     is: litter, not an error. */
  await sleep(600);
  try {
    rmSync(work, { recursive: true, force: true });
  } catch {
    console.log(`(left ${work} behind; Chrome still had it open)`);
  }
}
