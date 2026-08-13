"""Short-form video scripts, generated FROM the interaction data.

Sits alongside the rest of the content pipeline (`content_section_writer.py`,
`spoke_guide_writer.py`, `critic_guides.py`). Same philosophy, different output
format.

WHY THIS IS A SELECTOR AND NOT A WRITER. The expensive part of content is not
prose — a model writes prose. The expensive part is deciding what is worth
saying, and that decision is what separates content that could only come from
this product from content anyone could produce with the same prompt. So this
reads `src/data/interactions.json` and every line it emits traces back to a
named field. Nothing here invents a fact; there is no model call in this file at
all, which is deliberate. A model can polish the wording afterwards without ever
being in a position to make something up.

THREE RULES, all inherited from the anti-slop section of the distribution plan:

  1. Data in, never a topic. "Make a video about zinc" produces slop. "Make a
     video about THIS record, and here are its fields" cannot.
  2. The generator may return NOTHING. A record without a mechanism, a source or
     a stated limit does not become a video — it becomes a skip with a reason.
     A machine that must fill a quota fills it with nothing.
  3. Every claim is falsifiable and attributed. Each beat carries the field it
     came from, so a wrong video is traceable to a wrong row rather than to a
     hallucination nobody can locate.

Run:
    python tools/video_script_writer.py            # top 5, with provenance
    python tools/video_script_writer.py --count 10
    python tools/video_script_writer.py --show-skipped
"""
from __future__ import annotations

import argparse
import json
import textwrap
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DATA = REPO / "src" / "data" / "interactions.json"

# Severity drives attention. A thing that can hurt you earns a viewer's 30
# seconds in a way a neutral pairing does not.
SEVERITY_WEIGHT = {
    "danger": 5.0,
    "avoid": 5.0,
    "warning": 4.0,
    "caution": 4.0,
    "monitor": 2.5,
    "timing": 2.0,
    "info": 1.0,
    "synergy": 2.0,
}

# Evidence quality is a multiplier, not a bonus. A dramatic claim on thin
# evidence is exactly the content this product exists to argue against, so weak
# evidence pulls a record DOWN the queue rather than leaving it unaffected.
EVIDENCE_WEIGHT = {
    "strong": 1.3,
    "moderate": 1.0,
    "preliminary": 0.6,
    "limited": 0.6,
    "theoretical": 0.4,
    "weak": 0.4,
}

REQUIRED = ("summary", "details", "recommendation")


def load() -> list[dict]:
    with DATA.open(encoding="utf-8") as fh:
        return json.load(fh)


def _txt(row: dict, key: str) -> str:
    v = row.get(key)
    if isinstance(v, list):
        v = " ".join(str(x) for x in v)
    return (v or "").strip() if isinstance(v, str) else ""


def assess(row: dict) -> tuple[float, list[str]]:
    """Score a record for how much it can carry a video, and why not if it can't.

    Returns (score, blockers). A non-empty blocker list means skip — the record
    is not bad, it is simply not enough to say something specific about, and
    saying something unspecific is the failure mode being avoided.
    """
    blockers: list[str] = []
    for field in REQUIRED:
        if not _txt(row, field):
            blockers.append(f"no {field}")

    mechanism = _txt(row, "mechanism") or _txt(row, "interaction_type")
    if not mechanism:
        blockers.append("no mechanism — would be an assertion with no 'because'")
    if not row.get("sources"):
        blockers.append("no source — unattributable claim")

    sev = _txt(row, "severity").lower()
    score = SEVERITY_WEIGHT.get(sev, 1.0)
    score *= EVIDENCE_WEIGHT.get(_txt(row, "evidence_quality").lower(), 0.8)

    # The differentiators. Stating a dose threshold and stating your own limits
    # are both rare in this category, and both are the reason a viewer would
    # trust the next one.
    if any(ch.isdigit() for ch in _txt(row, "details")):
        score += 1.2  # carries an actual number
    if _txt(row, "what_we_dont_know"):
        score += 1.5
    if _txt(row, "timing_advice"):
        score += 0.5
    if _txt(row, "populations"):
        score += 0.4

    return round(score, 2), blockers


# Narration budget. ~2.6 words/second is a comfortable read for this register —
# faster than that and a viewer stops absorbing a dose threshold, which is the
# one thing these scripts exist to deliver.
WORDS_PER_SEC = 2.6
ON_SCREEN_WORDS = 8

# Acronyms and possessives that `.title()` destroys. It produced "Ssri + St
# Johns Wort" on the first run — a competence signal failing in the first three
# seconds of a video about pharmacology.
_ACRONYMS = {"ssri", "ssris", "maoi", "maois", "nsaid", "nsaids", "snri", "snris",
             "coq10", "gaba", "dhea", "mao", "tsh", "t3", "t4", "hrt", "ppi", "ppis"}
_POSSESSIVE = {"johns": "John's", "st": "St"}


def pretty(name: str) -> str:
    out = []
    for word in name.split():
        low = word.lower()
        if low in _ACRONYMS:
            out.append(word.upper())
        elif low in _POSSESSIVE:
            out.append(_POSSESSIVE[low])
        else:
            out.append(word[:1].upper() + word[1:])
    return " ".join(out)


def _sentences(text: str) -> list[str]:
    parts, buf = [], ""
    for ch in text:
        buf += ch
        if ch in ".!?" and len(buf.strip()) > 12:
            parts.append(buf.strip())
            buf = ""
    if buf.strip():
        parts.append(buf.strip())
    return parts


def fit(text: str, seconds: float) -> tuple[str, int]:
    """Trim to what fits in the slot, on sentence boundaries. Returns (text, dropped_words).

    Truncating mid-sentence would produce a script that reads as broken; cutting
    at a sentence keeps every line sayable. The dropped count is REPORTED rather
    than swallowed, because a beat that lost 200 words is a signal that the
    source record wants a longer format, not a signal that the trim worked.
    """
    budget = int(seconds * WORDS_PER_SEC)
    total = len(text.split())
    if total <= budget:
        return text, 0
    kept, used = [], 0
    for s in _sentences(text):
        n = len(s.split())
        if used + n > budget and kept:
            break
        kept.append(s)
        used += n
    if not kept:  # a single sentence longer than the whole slot
        kept = [" ".join(text.split()[:budget]) + "…"]
        used = budget
    return " ".join(kept), total - used


def headline(text: str) -> str:
    """On-screen text is read at a glance, not parsed."""
    words = text.split()
    return " ".join(words[:ON_SCREEN_WORDS]) + ("…" if len(words) > ON_SCREEN_WORDS else "")


def beat(seconds: str, label: str, on_screen: str, voice: str, field: str,
         duration: float) -> dict:
    fitted, dropped = fit(voice.strip(), duration)
    return {
        "t": seconds,
        "label": label,
        "on_screen": headline(on_screen),
        "voice": fitted,
        "from_field": field,
        "dropped_words": dropped,
    }


def script_for(row: dict) -> dict:
    a, b = pretty(_txt(row, "substance_a")), pretty(_txt(row, "substance_b"))
    sev = _txt(row, "severity").lower()
    mechanism = _txt(row, "mechanism") or _txt(row, "interaction_type")
    unknown = _txt(row, "what_we_dont_know")

    beats = [
        beat("0:00–0:03", "HOOK", f"{a} + {b}", _txt(row, "summary"), "summary", 3),
        beat("0:03–0:10", "WHAT HAPPENS", sev.upper() if sev else "INTERACTION",
             _txt(row, "details"), "details", 7),
        # No trailing period appended — the source field already ends in one, and
        # the first run rendered "…eliminate the risk.." on screen.
        beat("0:10–0:18", "WHY", mechanism, f"The mechanism: {mechanism}", "mechanism", 8),
        beat("0:18–0:28", "WHAT TO DO", "What to do",
             _txt(row, "recommendation"), "recommendation", 10),
    ]
    if _txt(row, "timing_advice"):
        beats.append(beat("0:28–0:33", "TIMING", "Timing",
                          _txt(row, "timing_advice"), "timing_advice", 5))
    if unknown:
        # The beat that is hard to copy. A competitor can restate a fact; saying
        # plainly where the evidence stops is a policy, not a line of script.
        beats.append(beat("0:33–0:40", "WHAT WE DON'T KNOW", "What we don't know",
                          unknown, "what_we_dont_know", 7))
    beats.append(
        beat("0:40–0:45", "CTA", "Check your own stack — free",
             "Check your whole stack for interactions like this one. Free, no account needed.",
             "(fixed)", 5)
    )

    return {
        "pair": f"{a} + {b}",
        "severity": sev,
        "evidence": _txt(row, "evidence_quality"),
        "sources": row.get("sources") or [],
        "beats": beats,
    }


def render(script: dict, score: float) -> str:
    out = [
        "─" * 74,
        f"{script['pair']}   [{script['severity'] or 'n/a'} · evidence: {script['evidence'] or 'unstated'} · score {score}]",
        "─" * 74,
    ]
    for b in script["beats"]:
        out.append(f"  {b['t']}  {b['label']}")
        out.append(f"      ON SCREEN : {b['on_screen']}")
        for i, line in enumerate(textwrap.wrap(b["voice"], 62)):
            out.append(f"      {'VOICE     : ' if i == 0 else '            '}{line}")
        note = f"      ← {b['from_field']}"
        if b["dropped_words"]:
            # Reported, never silent. A beat that dropped 200 words is telling
            # you this record wants a long-form treatment, not that the trim
            # succeeded.
            note += f"   [{b['dropped_words']} words did not fit — record is richer than the slot]"
        out.append(note)
        out.append("")
    if script["sources"]:
        out.append(f"  SOURCES: {len(script['sources'])} on the record — cite on screen at the claim")
    return "\n".join(out)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--count", type=int, default=5)
    ap.add_argument("--show-skipped", action="store_true")
    ap.add_argument("--selftest", action="store_true",
                    help="prove the refusal gate can actually fire")
    ap.add_argument("--json", action="store_true",
                    help="emit scripts as JSON for a renderer to consume")
    args = ap.parse_args()

    if args.selftest:
        # THE CONTROL. On the first run all 105 records passed, which means the
        # refusal gate reported green from the slot a real check would occupy —
        # a guard that has never rejected anything is indistinguishable from a
        # guard that cannot. So plant the mistakes and require each to be caught.
        planted = [
            ({"substance_a": "a", "substance_b": "b"}, "no summary"),
            ({"substance_a": "a", "substance_b": "b", "summary": "x", "details": "y",
              "recommendation": "z", "sources": ["s"]}, "no mechanism"),
            ({"substance_a": "a", "substance_b": "b", "summary": "x", "details": "y",
              "recommendation": "z", "mechanism": "m"}, "no source"),
        ]
        failures = 0
        for row, expect in planted:
            _score, blockers = assess(row)
            hit = any(expect in b for b in blockers)
            print(f"  {'PASS' if hit else 'FAIL'}  planted [{expect}] -> {blockers or 'NOTHING CAUGHT'}")
            failures += 0 if hit else 1
        # And the inverse: a complete record must NOT be refused, or the gate is
        # simply rejecting everything and would look equally 'working'.
        good = {"substance_a": "a", "substance_b": "b", "summary": "x", "details": "y",
                "recommendation": "z", "mechanism": "m", "sources": ["s"]}
        _s, blockers = assess(good)
        print(f"  {'PASS' if not blockers else 'FAIL'}  complete record -> {blockers or 'accepted'}")
        failures += 1 if blockers else 0
        print(f"\n{'gate proven' if not failures else f'{failures} CONTROL FAILURES'}")
        return 1 if failures else 0

    rows = load()
    scored, skipped = [], []
    for row in rows:
        score, blockers = assess(row)
        (skipped if blockers else scored).append((score, row, blockers))
    scored.sort(key=lambda t: t[0], reverse=True)

    if args.json:
        # The seam between the half that decides and the half that renders.
        # `beats` carries its own timings and durations, so a renderer never has
        # to re-derive them and the two halves cannot drift on the one thing
        # they both depend on.
        payload = {
            "generated_from": str(DATA.relative_to(REPO)),
            "total_records": len(rows),
            "eligible": len(scored),
            "refused": len(skipped),
            "scripts": [
                {"score": score, **script_for(row)} for score, row, _ in scored[: args.count]
            ],
        }
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return 0

    print(f"\n{len(rows)} interactions on file.")
    print(f"{len(scored)} carry enough to say something specific; {len(skipped)} refused.\n")

    for score, row, _ in scored[: args.count]:
        print(render(script_for(row), score))

    if args.show_skipped and skipped:
        print("\nREFUSED (a skip with a reason beats a video with nothing in it):\n")
        for _, row, blockers in skipped[:15]:
            pair = f"{_txt(row, 'substance_a')} + {_txt(row, 'substance_b')}"
            print(f"  {pair:<38} {'; '.join(blockers)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
