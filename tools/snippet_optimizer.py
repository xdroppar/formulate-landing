"""Rewrite each guide's opening so it's eligible for Google Featured Snippets.

A featured-snippet-eligible opener:
  - Directly answers the query implied by the H1, rephrased as a question
  - 40–60 words (Google's sweet spot for paragraph snippets)
  - Factual, no fluff, no editorializing
  - Leads with a direct answer in the first sentence
  - Follows with 1–2 supporting sentences

This tool reads each guide's current opening paragraph(s), proposes a
replacement that meets those criteria while preserving the guide's voice,
and outputs a diff-style report for human review (NOT auto-applied).

Because the opening paragraph is the single most-rendered piece of prose
in SERP, CTR, and AI Overview, this is high-ROI surgical work.

Uses Opus because:
  - Rewrite must preserve specific factual claims without adding or dropping
  - Tone matching with the rest of the guide matters
  - Single-paragraph output — tokens are cheap per guide

Cost: ~$0.05 per guide × 25 = ~$1.25

Usage:
    ANTHROPIC_API_KEY=sk-... python tools/snippet_optimizer.py
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

try:
    from anthropic import Anthropic
except ImportError:
    print("ERROR: pip install anthropic", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "src" / "app" / "guides" / "[slug]" / "content"
GUIDES_TS = ROOT / "src" / "lib" / "guides.ts"
OUT_JSON = ROOT / "tools" / "snippet_optimizer_output.json"
OUT_MD = ROOT / "tools" / "snippet_optimizer_output.md"

MODEL = "claude-opus-4-6"

SYSTEM_PROMPT = """You rewrite the opening paragraph of a health/supplement guide to make it eligible for Google Featured Snippets.

CONSTRAINTS:

1. LENGTH: 40–60 words total for the rewritten opening paragraph. Count carefully.
2. FORMAT: First sentence must be a direct, self-contained factual answer to the question implied by the guide's title. Remaining 1–2 sentences should support it with specifics (numbers, mechanisms, sources).
3. TONE: Match the guide's voice — informed, direct, slightly skeptical, respectful of reader intelligence. No marketing fluff. No "In today's world..." openings.
4. CLAIMS: Only use claims already present in the current guide. Don't invent numbers or studies.
5. KEYWORDS: The primary keyword (from the title) should appear naturally in the first sentence.
6. NO HEDGING: Avoid "may", "could", "might" in the first sentence if the guide itself is more definitive. Avoid "while [hedge], [claim]" constructions — lead with the claim.

WHAT TO AVOID:
- Listy openings ("Here are 5 things..."). Google prefers paragraph snippets for this content type.
- Questions as openings ("Ever wonder why..."). Snippet extractors skip these.
- Personal anecdotes. SERP doesn't render them.
- Self-referential openings ("In this guide..."). Skip meta.

Output ONLY valid JSON:
{
  "current_opening": "extracted current opening paragraph(s) from the guide",
  "current_word_count": N,
  "proposed_opening": "the rewritten paragraph",
  "proposed_word_count": N,
  "snippet_query": "the implied query this will try to win — e.g., 'what is the best creatine supplement?'",
  "reasoning": "1-2 sentences on what changed and why this improves snippet eligibility",
  "keep_sentence_if_snippet_fails": "optional: if the current opening has a sentence worth preserving as the NEXT sentence (after the proposed opener), paste it here. Empty string if not needed."
}"""


def strip_jsx(src: str) -> str:
    src = re.sub(r"^import[\s\S]*?;\s*$", "", src, flags=re.M)
    src = re.sub(r"^export function[^{]*\{", "", src, flags=re.M)
    src = re.sub(r"<h2[^>]*>", "\n\n## ", src)
    src = re.sub(r"<p[^>]*>", "\n", src)
    src = re.sub(r"</p>", "", src)
    src = re.sub(r"<[^>]+>", " ", src)
    src = re.sub(r"\{[^}]{0,200}\}", " ", src)
    for k, v in {"&mdash;": "—", "&ndash;": "–", "&rsquo;": "'", "&ldquo;": '"', "&rdquo;": '"'}.items():
        src = src.replace(k, v)
    src = re.sub(r"&[a-z]+;", " ", src)
    src = re.sub(r"[ \t]+", " ", src)
    src = re.sub(r"\n\s*\n+", "\n\n", src)
    return src.strip()


def get_opening(content: str) -> str:
    """Return the first ~200 words before any H2."""
    # cut at first H2
    parts = content.split("\n\n## ", 1)
    opening = parts[0]
    words = opening.split()
    return " ".join(words[:250])


def load_meta() -> dict[str, dict]:
    text = GUIDES_TS.read_text(encoding="utf-8")
    blocks = re.findall(r"\{\s*slug:\s*\"([^\"]+)\"(.*?)\n\s*\}", text, re.S)
    out = {}
    for slug, body in blocks:
        def grab(key):
            m = re.search(rf"{key}:\s*\"([^\"]*)\"", body)
            return m.group(1) if m else ""
        hidden = bool(re.search(r"hidden:\s*true", body))
        out[slug] = {"title": grab("title"), "hidden": hidden}
    return out


def main():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    meta_all = load_meta()
    visible_slugs = [s for s, m in meta_all.items() if not m.get("hidden")]
    client = Anthropic()

    results = []
    total_cost = 0.0

    for slug in visible_slugs:
        content_path = CONTENT_DIR / f"{slug}.tsx"
        if not content_path.exists():
            continue

        full_content = strip_jsx(content_path.read_text(encoding="utf-8"))
        opening = get_opening(full_content)

        user_msg = (
            f"GUIDE SLUG: {slug}\n"
            f"TITLE: {meta_all[slug]['title']}\n\n"
            f"CURRENT OPENING (before first H2):\n{opening}\n\n"
            f"Rewrite the opening to be featured-snippet-eligible per the rules."
        )

        print(f"[{slug}] ...", end=" ", flush=True)
        t0 = time.time()
        try:
            resp = client.messages.create(
                model=MODEL,
                max_tokens=1500,
                system=[{"type": "text", "text": SYSTEM_PROMPT, "cache_control": {"type": "ephemeral"}}],
                messages=[{"role": "user", "content": user_msg}],
            )
        except Exception as e:
            print(f"ERR: {e}")
            continue
        elapsed = time.time() - t0

        text = resp.content[0].text.strip()
        if text.startswith("```"):
            text = re.sub(r"^```[a-z]*\n?", "", text)
            text = re.sub(r"\n?```$", "", text)

        parsed = None
        try:
            parsed = json.loads(text)
        except json.JSONDecodeError:
            mm = re.search(r"\{[\s\S]*\}", text)
            if mm:
                try:
                    parsed = json.loads(mm.group())
                except Exception:
                    pass
        if not parsed:
            print(f"ERR parse. raw[:200]: {text[:200]!r}")
            continue

        usage = resp.usage
        cost = (usage.input_tokens * 15 + usage.output_tokens * 75) / 1_000_000
        total_cost += cost

        results.append({"slug": slug, "title": meta_all[slug]["title"], **parsed})
        print(f"OK ({elapsed:.1f}s, ${cost:.4f})")

    OUT_JSON.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")

    lines = ["# Featured Snippet Optimizer Output", f"\n{len(results)} guides. Total: ${total_cost:.3f}\n"]
    for r in results:
        lines.append(f"## {r['slug']}")
        lines.append(f"*{r['title']}*")
        lines.append(f"- **Target snippet query:** {r.get('snippet_query', '—')}")
        lines.append(f"- **Word count:** {r.get('current_word_count', '?')} → {r.get('proposed_word_count', '?')}")
        lines.append("")
        lines.append("**Current opening:**")
        lines.append(f"> {r.get('current_opening', '').strip()}")
        lines.append("")
        lines.append("**Proposed opening:**")
        lines.append(f"> {r.get('proposed_opening', '').strip()}")
        lines.append("")
        lines.append(f"**Why:** {r.get('reasoning', '')}")
        if r.get("keep_sentence_if_snippet_fails"):
            lines.append("")
            lines.append(f"**Keep as follow-up sentence:** {r['keep_sentence_if_snippet_fails']}")
        lines.append("")
        lines.append("---")
        lines.append("")
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")

    print(f"\nDONE: {len(results)} openings, ${total_cost:.3f}")


if __name__ == "__main__":
    main()
