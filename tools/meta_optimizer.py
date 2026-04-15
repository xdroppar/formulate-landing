"""Rewrite titles + meta descriptions across all visible guides for better SERP CTR.

Reads each guide's current title/description/content, asks Claude to propose
replacements that:
  - Fit Google's recommended char lengths (title 50-60, description 150-160)
  - Include the year (2026) for freshness signal
  - Lead with an action verb or benefit
  - Include the target keyword exactly once
  - Sound natural (not stuffed)

Outputs a diff-style TypeScript patch for review, NOT auto-applied.
You paste approved changes into src/lib/guides.ts.

Cost: ~$0.03 per guide with Sonnet + prompt caching.

Usage:
    ANTHROPIC_API_KEY=sk-... python tools/meta_optimizer.py
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
OUT_JSON = ROOT / "tools" / "meta_optimizer_output.json"
OUT_MD = ROOT / "tools" / "meta_optimizer_output.md"

MODEL = "claude-sonnet-4-6"

SYSTEM_PROMPT = """You optimize SEO titles and meta descriptions for a health/supplement content site.

Rules:

TITLE:
- 50-60 characters total (hard limit: 65)
- Include the primary keyword exactly once, near the start
- Include "2026" for freshness
- Use an emotional or value trigger when it fits the guide tone (Ranked by / Backed by Science / No Sponsorships / Clinical Evidence / Evidence-Based)
- No clickbait, no false urgency
- Natural reading, not keyword-stuffed

META DESCRIPTION:
- 150-160 characters (hard limit: 165)
- Lead with the reader's benefit or outcome (what they'll learn/do)
- Include the primary keyword once
- End with a subtle call-to-value (not "click here")
- No duplicate of the title — complement it with specifics (numbers, mechanisms, stakes)

Output ONLY valid JSON:
{
  "title": "proposed title",
  "title_char_count": N,
  "description": "proposed description",
  "description_char_count": N,
  "reasoning": "1-2 sentences on what you changed and why"
}

If the current title/description is already excellent, return them unchanged and note "no change needed" in reasoning."""


def strip_jsx_light(src: str) -> str:
    src = re.sub(r"^import[\s\S]*?;\s*$", "", src, flags=re.M)
    src = re.sub(r"<[^>]+>", " ", src)
    src = re.sub(r"\{[^}]{0,200}\}", " ", src)
    src = re.sub(r"[ \t]+", " ", src)
    return src.strip()[:3000]  # first ~500 words is enough for meta optimization


def load_meta() -> dict[str, dict]:
    text = GUIDES_TS.read_text(encoding="utf-8")
    blocks = re.findall(r"\{\s*slug:\s*\"([^\"]+)\"(.*?)\n\s*\}", text, re.S)
    out = {}
    for slug, body in blocks:
        def grab(key):
            m = re.search(rf"{key}:\s*\"([^\"]*)\"", body)
            return m.group(1) if m else ""
        hidden = bool(re.search(r"hidden:\s*true", body))
        out[slug] = {
            "title": grab("title"),
            "description": grab("description"),
            "category": grab("category"),
            "hidden": hidden,
        }
    return out


def main():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    meta_all = load_meta()
    visible = {s: m for s, m in meta_all.items() if not m.get("hidden")}

    client = Anthropic()
    results = []
    total_cost = 0.0

    for slug, m in visible.items():
        content_path = CONTENT_DIR / f"{slug}.tsx"
        if not content_path.exists():
            continue
        opener = strip_jsx_light(content_path.read_text(encoding="utf-8"))

        user_msg = (
            f"GUIDE SLUG: {slug}\n"
            f"CATEGORY: {m['category']}\n\n"
            f"CURRENT TITLE ({len(m['title'])} chars):\n{m['title']}\n\n"
            f"CURRENT DESCRIPTION ({len(m['description'])} chars):\n{m['description']}\n\n"
            f"GUIDE OPENING (for context):\n{opener}"
        )

        print(f"[{slug}] ...", end=" ", flush=True)
        t0 = time.time()
        try:
            resp = client.messages.create(
                model=MODEL,
                max_tokens=1200,
                system=[{"type": "text", "text": SYSTEM_PROMPT, "cache_control": {"type": "ephemeral"}}],
                messages=[{"role": "user", "content": user_msg}],
            )
        except Exception as e:
            print(f"ERR api: {e}")
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
            # try grabbing first {...} object only
            mm = re.search(r"\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}", text)
            if mm:
                try:
                    parsed = json.loads(mm.group())
                except Exception:
                    pass
        if not parsed:
            print(f"ERR parse. raw[:200]: {text[:200]!r}")
            continue

        usage = resp.usage
        cost = (usage.input_tokens * 3 + usage.output_tokens * 15) / 1_000_000
        total_cost += cost

        results.append({
            "slug": slug,
            "current_title": m["title"],
            "current_description": m["description"],
            "proposed_title": parsed.get("title", ""),
            "proposed_description": parsed.get("description", ""),
            "title_chars": parsed.get("title_char_count", len(parsed.get("title", ""))),
            "description_chars": parsed.get("description_char_count", len(parsed.get("description", ""))),
            "reasoning": parsed.get("reasoning", ""),
        })
        print(f"OK (${cost:.4f}, {elapsed:.1f}s)")

    OUT_JSON.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")

    # diff-style markdown
    lines = ["# Meta Optimizer Output", f"\n{len(results)} guides processed. Total: ${total_cost:.3f}\n"]
    for r in results:
        lines.append(f"## {r['slug']}")
        lines.append("")
        lines.append(f"**Title** ({len(r['current_title'])} → {r['title_chars']} chars)")
        lines.append(f"- Current:  `{r['current_title']}`")
        lines.append(f"- Proposed: `{r['proposed_title']}`")
        lines.append("")
        lines.append(f"**Description** ({len(r['current_description'])} → {r['description_chars']} chars)")
        lines.append(f"- Current:  {r['current_description']}")
        lines.append(f"- Proposed: {r['proposed_description']}")
        lines.append("")
        lines.append(f"**Why:** {r['reasoning']}")
        lines.append("")
        lines.append("---")
        lines.append("")

    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nDONE: {len(results)} guides, ${total_cost:.3f}")
    print(f"Output: {OUT_JSON.name} and {OUT_MD.name}")


if __name__ == "__main__":
    main()
