/**
 * Capture every picture the console landing uses.
 *
 * WHAT THESE ARE PICTURES OF. The demo at /v2 — the prototype, deployed on
 * this same origin, with the authored account the design was drawn around.
 * Not the live app: there are no accounts in it yet, so a picture of it is a
 * picture of an empty product, which argues against the page it sits on. The
 * page labels every one of these as a demo, and /v2 carries its own
 * disclosures on the invented numbers.
 *
 * Same origin matters twice: nothing leaves the site to be captured, and the
 * catalog photographs inside the shots resolve against this origin's own
 * public/images.
 *
 * WHY THIS DRIVES CHROME INSTEAD OF ASKING IT FOR A SCREENSHOT. The first
 * version was one `--screenshot` flag, and it worked until /today was added to
 * the app's onboarding entry paths. A fresh browser then met the six-step goal
 * picker and the script cheerfully captured THAT: exit 0, a real PNG, a wrong
 * picture, a landing page advertising a questionnaire. Nothing about the run
 * looked wrong, because the only question it asked was "did Chrome write a
 * file".
 *
 * So every shot declares what must be on screen before it may be written, and
 * what must not. A capture that cannot tell you what it captured is not
 * evidence of anything.
 *
 *     node scripts/capture-console.mjs            all of them
 *     node scripts/capture-console.mjs today      just one, by name
 *
 * The demo has to be reachable: run `next start` (or `next dev`) first, or set
 * CONSOLE_SHOT_ORIGIN to a deployed one.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN =
  process.env.CONSOLE_SHOT_ORIGIN ||
  `http://127.0.0.1:${process.env.CONSOLE_SHOT_SERVE_PORT || 3421}`;
const PORT = Number(process.env.CONSOLE_SHOT_PORT || 9333);

/**
 * Every shot, with the evidence it must produce.
 *
 * `want` are selectors and `wantText` is copy the screen has to be showing.
 * Both exist because some of these screens are identified by structure and
 * some by what they say; a phone screenshot has no id worth asserting on.
 *
 * The sizes are not arbitrary — each matches the aspect-ratio its CSS box
 * reserves, so a shot cannot arrive letterboxed.
 */
const SHOTS = [
  {
    name: "today",
    out: "console-today.webp",
    url: "/v2/app.html",
    width: 1560,
    height: 900,
    want: ["#ring", "#meter", "#prows"],
  },
  {
    /* The day ledger, in its own panel. Clipped to the panel that contains it
       — `#ledger` is the <tbody>, and a tbody's box is the rows without the
       heading that says what they are. */
    name: "ledger",
    out: "console-ledger.webp",
    url: "/v2/app.html?embed=1&screen=record",
    width: 1394,
    height: 760,
    want: ["#ledger"],
    clipTo: "#ledger",
    clipAncestor: ".rcol",
  },
  {
    /* The 148-day line on its own. Clipped to the element that draws it rather
       than to numbers measured off a screenshot: a hand-typed crop box is
       right until any padding above it changes, and then it is quietly wrong. */
    name: "streak",
    out: "console-streak.webp",
    url: "/v2/app.html?embed=1&screen=record",
    width: 1394,
    height: 760,
    want: ["#recbox"],
    clipTo: "#recbox",
  },
  {
    name: "mobile",
    out: "console-mobile.webp",
    url: "/v2/ios.html?live=1&screen=today2",
    width: 393,
    height: 852,
    wantText: ["Wake up", "Bedtime"],
  },
];

/** Never acceptable in any shot: the live app's onboarding, and its empty state. */
const REJECT = [
  "What do you want your",
  "Pick a goal to start",
  "It needs your logs and your stack",
];

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

const only = process.argv[2];
const shots = only ? SHOTS.filter((s) => s.name === only) : SHOTS;
if (only && !shots.length) {
  console.error(`No shot named "${only}". Have: ${SHOTS.map((s) => s.name).join(", ")}`);
  process.exit(1);
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
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "ignore"] },
  );

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
  const cdp = connect((await made.json()).webSocketDebuggerUrl);
  await cdp.ready;
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  /* Before any page script runs, so the live app's first-run flow can never be
     what gets photographed. Harmless on the static demo. */
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `try {
      localStorage.setItem("formulate_onboarding_done", "1");
      localStorage.setItem("formulate_tour_done", "1");
      localStorage.setItem("formulate_companion_intro_seen", "1");
    } catch (e) {}`,
  });

  for (const shot of shots) {
    const url = ORIGIN + shot.url;
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: shot.width,
      height: shot.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url });

    const want = shot.want ?? [];
    const wantText = shot.wantText ?? [];
    const probe = `(() => ({
      want: ${JSON.stringify(want)}.map((s) => !!document.querySelector(s)),
      wantText: ${JSON.stringify(wantText)}.map((t) => document.body.innerText.includes(t)),
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
      if (
        state &&
        state.want.every(Boolean) &&
        state.wantText.every(Boolean) &&
        !state.reject.some(Boolean)
      ) {
        break;
      }
    }

    const ok =
      state &&
      state.want.every(Boolean) &&
      state.wantText.every(Boolean) &&
      !state.reject.some(Boolean);
    if (!ok) {
      const missing = [
        ...want.filter((_, i) => !state?.want?.[i]),
        ...wantText.filter((_, i) => !state?.wantText?.[i]).map((t) => `text "${t}"`),
      ];
      const found = REJECT.filter((_, i) => state?.reject?.[i]);
      throw new Error(
        `"${shot.name}" never showed what it should, so nothing was written.\n` +
          `  url: ${url}\n` +
          (missing.length ? `  missing: ${missing.join(", ")}\n` : "") +
          (found.length ? `  showing instead: ${found.join(" / ")}\n` : ""),
      );
    }

    const png = join(work, `${shot.name}.png`);
    let clip;
    if (shot.clipTo) {
      const { result } = await cdp.send("Runtime.evaluate", {
        expression: `(() => {
          let el = document.querySelector(${JSON.stringify(shot.clipTo)});
          ${shot.clipAncestor ? `el = el && el.closest(${JSON.stringify(shot.clipAncestor)});` : ""}
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height }; })()`,
        returnByValue: true,
      });
      if (!result.value) {
        throw new Error(
          `"${shot.name}" could not find ${shot.clipTo}` +
            `${shot.clipAncestor ? ` inside ${shot.clipAncestor}` : ""} to clip to.`,
        );
      }
      clip = { ...result.value, scale: 1 };
      if (clip.width < 40 || clip.height < 20) {
        throw new Error(
          `"${shot.name}" clip ${shot.clipTo} measured ${Math.round(clip.width)}x` +
            `${Math.round(clip.height)} — too small to be the thing it names.`,
        );
      }
    }
    const cap = await cdp.send("Page.captureScreenshot", { format: "png", ...(clip ? { clip } : {}) });
    writeFileSync(png, Buffer.from(cap.data, "base64"));

    const meta = await sharp(png).metadata();
    const wantW = clip ? Math.round(clip.width) : shot.width;
    const wantH = clip ? Math.round(clip.height) : shot.height;
    if (Math.abs(meta.width - wantW) > 1 || Math.abs(meta.height - wantH) > 1) {
      throw new Error(
        `"${shot.name}" captured ${meta.width}x${meta.height}, expected ${wantW}x${wantH}.`,
      );
    }

    const out = join(ROOT, "public", shot.out);
    await sharp(png).webp({ quality: 82 }).toFile(out);
    const proof = [...want, ...wantText.map((t) => `"${t}"`)].join(" + ");
    console.log(
      `  ${shot.name.padEnd(8)} ${String(Math.round(statSync(out).size / 1024)).padStart(4)} KB  ` +
        `${meta.width}x${meta.height}  verified: ${proof}${clip ? ` (clipped to ${shot.clipTo})` : ""}`,
    );
  }

  cdp.close();
  console.log(`wrote ${shots.length} shot(s) from ${ORIGIN}/v2`);
} finally {
  if (chrome) chrome.kill();
  /* Chrome does not release the profile directory the instant it is killed, and
     on Windows removing it too early throws EPERM — which would fail the script
     AFTER it had written good pictures, reporting success as failure. */
  await sleep(600);
  try {
    rmSync(work, { recursive: true, force: true });
  } catch {
    console.log(`(left ${work} behind; Chrome still had it open)`);
  }
}
