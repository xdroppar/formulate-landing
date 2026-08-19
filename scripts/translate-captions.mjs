#!/usr/bin/env node
/**
 * Generate the translated caption tracks for the walkthrough video.
 *
 * WHY CAPTIONS CARRY THIS VIDEO — hero-video.tsx says it in its own header:
 * "MUTED, WITH CAPTIONS ON. The whole video is narration and landing video is
 * watched muted far more often than not." So for a visitor on /zh, an English
 * caption track was the entire narration: the video played silently and told
 * them nothing about an app they had never seen.
 *
 * WHY SENTENCE-LEVEL AND NOT CUE-LEVEL. The source cues are split on ~2-second
 * timing boundaries, not on clauses, so they cut mid-sentence — "First, a" /
 * "few things we need to know about" / "you." Translating fragments like that
 * independently produces gibberish in any language, and catastrophically so in
 * Chinese, whose word order is nothing like the English.
 *
 * And there is no clean cue-to-sentence grouping to fall back on, because cues
 * cut ACROSS sentences too ("you. Start with your goals: longevity, fat"). The
 * first attempt at this assumed there was one and grouped 17 where there are 21.
 *
 * So the transcript is treated as a CHARACTER TIMELINE: each cue covers a
 * character range and a time range, which lets a sentence's character offsets
 * interpolate to a start and an end. Every timing therefore still derives from
 * the original recording — nothing is invented. That matters more here than for
 * a talking head: this is a screencast synced to UI actions, so a drifted
 * caption describes the goals screen while the recording is already on macros.
 *
 * Emitting whole sentences is also better captioning than the source: a reader
 * gets one complete thought rather than a fragment ending mid-clause.
 *
 *   node scripts/translate-captions.mjs           regenerate the .zh/.es tracks
 *   node scripts/translate-captions.mjs --check   fail if they are stale
 *
 * --check is part of `npm run verify`, because the failure mode is not writing
 * these files once — it is editing the English .vtt months later and leaving the
 * translations describing a video that no longer says that. Nothing else in the
 * build reads a .vtt, so nothing else would ever notice.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "scripts", "captions.i18n.json");
const VIDEO = join(ROOT, "public", "video");

const CHECK = process.argv.includes("--check");
const { locales, sources, sentences } = JSON.parse(readFileSync(DATA, "utf8"));

/**
 * NEWLINES ARE NOT INCIDENTAL HERE. These .vtt files are committed with CRLF
 * and Windows checkouts run core.autocrlf=true. Python text mode normalised
 * that on read; Node does not, so the first port of this script matched ZERO
 * cues and the transcript guard below fired — the guard working, but proof that
 * newlines have to be handled deliberately rather than assumed.
 *
 * Read normalised, write back whatever the SOURCE track uses, compare ignoring
 * the difference. That way --check never fails purely because a clone
 * materialised different line endings; a gate that cries wolf gets bypassed.
 */
const lf = (s) => s.replace(/\r\n/g, "\n");
const eolOf = (s) => (s.includes("\r\n") ? "\r\n" : "\n");

const CUE =
  /(\d+)\n(\d\d:\d\d:\d\d\.\d\d\d) --> (\d\d:\d\d:\d\d\.\d\d\d)\n([\s\S]+?)(?=\n\n|$)/g;

const seconds = (ts) => {
  const [h, m, rest] = ts.split(":");
  const [s, ms] = rest.split(".");
  return +h * 3600 + +m * 60 + +s + +ms / 1000;
};

const stamp = (sec) => {
  let ms = Math.round(sec * 1000);
  const h = Math.floor(ms / 3600000); ms -= h * 3600000;
  const m = Math.floor(ms / 60000);   ms -= m * 60000;
  const s = Math.floor(ms / 1000);    ms -= s * 1000;
  const p = (n, w = 2) => String(n).padStart(w, "0");
  return `${p(h)}:${p(m)}:${p(s)}.${p(ms, 3)}`;
};

/** Build one locale track from the English cues character timeline. */
function build(srcVtt, locale) {
  const cues = [...lf(srcVtt).matchAll(CUE)].map(([, , a, b, text]) => ({
    start: seconds(a),
    end: seconds(b),
    text: text.split(/\s+/).filter(Boolean).join(" "),
  }));

  // cue i covers characters [lo, hi] over time [start, end]
  const spans = [];
  let off = 0;
  for (const c of cues) {
    spans.push({ lo: off, hi: off + c.text.length, start: c.start, end: c.end });
    off += c.text.length + 1; // the space that joins cues
  }

  // The transcript MUST still be the one these sentences were written against.
  // If the video is re-recorded or re-cut, translated captions describing the
  // old narration are worse than no translation: they are wrong with authority.
  // Refuse rather than emit a confident mismatch.
  const joined = cues.map((c) => c.text).join(" ");
  const expected = sentences.map((s) => s.en).join(" ");
  if (joined !== expected) {
    let at = 0;
    while (at < joined.length && joined[at] === expected[at]) at += 1;
    const win = (s) => s.slice(Math.max(0, at - 40), at + 40);
    throw new Error(
      `transcript no longer matches scripts/captions.i18n.json` +
        ` (${cues.length} cues; first differs at char ${at})\n` +
        `  vtt:  ...${win(joined)}...\n` +
        `  json: ...${win(expected)}...\n` +
        `  The captions changed. Re-derive the sentences; do not ship a mismatch.`
    );
  }

  const timeAt = (pos) => {
    for (const { lo, hi, start, end } of spans) {
      if (pos <= hi) {
        const frac = hi === lo ? 0 : Math.min(1, Math.max(0, (pos - lo) / (hi - lo)));
        return start + (end - start) * frac;
      }
    }
    return spans[spans.length - 1].end;
  };

  const lines = ["WEBVTT", ""];
  let pos = 0;
  sentences.forEach((s, i) => {
    const start = timeAt(pos);
    pos += s.en.length;
    const end = timeAt(pos);
    pos += 1; // the joining space
    const text = s[locale];
    if (!text) throw new Error(`sentence ${i + 1} has no ${locale} translation`);
    lines.push(String(i + 1), `${stamp(start)} --> ${stamp(end)}`, text, "");
  });
  return lines.join(eolOf(srcVtt));
}

let stale = 0;
for (const base of sources) {
  const srcVtt = readFileSync(join(VIDEO, `${base}.vtt`), "utf8");
  for (const locale of locales) {
    const out = join(VIDEO, `${base}.${locale}.vtt`);
    const next = build(srcVtt, locale);
    if (CHECK) {
      let current = null;
      try {
        current = readFileSync(out, "utf8");
      } catch {
        /* missing counts as stale */
      }
      if (current === null || lf(current) !== lf(next)) {
        stale += 1;
        console.error(
          `  STALE  public/video/${base}.${locale}.vtt` +
            (current === null ? " (missing)" : "")
        );
      }
    } else {
      writeFileSync(out, next, "utf8");
      console.log(`  public/video/${base}.${locale}.vtt: ${sentences.length} cues`);
    }
  }
}

if (CHECK) {
  if (stale) {
    console.error(
      `\ncaption check FAILED: ${stale} track(s) do not match scripts/captions.i18n.json.\n` +
        `Run: node scripts/translate-captions.mjs\n`
    );
    process.exit(1);
  }
  console.log(
    `caption check passed: ${sources.length * locales.length} tracks current ` +
      `(${sentences.length} sentences x ${locales.join(", ")})`
  );
}
