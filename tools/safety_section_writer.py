"""Generate inline "Who Should Talk to a Doctor First" / contraindication
sections for guides where the critic flagged blocking YMYL safety gaps.

Uses Opus because:
  - Medical content with real liability implications
  - Need careful phrasing (no new dose claims, no absolute medical advice)
  - Output must be consistent tone across guides

Reads guide_critic_report.json → blocking rebuttals → generates a TSX-ready
section per guide that can be inserted before "The Bottom Line" or "FAQ".

Safety rules for the LLM:
  - Only reference populations, medications, and conditions explicitly
    mentioned in the guide's critic findings
  - Never invent dose ceilings or safety thresholds not already in the guide
  - Never make absolute claims ("safe for X" / "dangerous for Y")
  - Use "consult a physician / registered dietitian" language
  - Keep each bullet to one sentence
  - 120-250 word section total

Output: tools/safety_sections_output.md (review-then-paste, NOT auto-applied)

Usage:
    ANTHROPIC_API_KEY=sk-... python tools/safety_section_writer.py
    # Estimated cost: ~$0.15 per guide × 20 guides = ~$3.00
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
CRITIC_JSON = ROOT / "guide_critic_report.json"
OUT_JSON = ROOT / "tools" / "safety_sections_output.json"
OUT_MD = ROOT / "tools" / "safety_sections_output.md"

MODEL = "claude-opus-4-6"

SYSTEM_PROMPT = """You write SAFE contraindication sections for consumer supplement/longevity guides on a YMYL (health) site.

Your output will appear in an article as a dedicated H2 section, typically placed before the FAQ at the bottom. The tone must match a professional health-content site — direct, informed, never alarmist or overpromising.

STRICT RULES:

1. NEVER invent specific doses, timings, or safety thresholds not already stated in the guide. Reference only what the guide establishes.
2. NEVER say something is "safe for" or "dangerous for" a population in absolute terms. Use consult-your-provider language.
3. NEVER recommend alternatives not already mentioned in the guide.
4. Each bullet in the section must reference a SPECIFIC population, condition, or medication flagged in the critic findings.
5. Use the phrase "Talk to your healthcare provider before..." or equivalent for every population — this is the load-bearing hedge.
6. 150–250 words total for the section (H2 heading + intro paragraph + 4–6 bullet callouts).
7. Match the guide's voice: informed, direct, slightly skeptical of marketing, respectful of reader intelligence.

STRUCTURE OUTPUT AS TSX-ready JSX for direct paste:

```tsx
<h2>Who Should Talk to a Doctor First</h2>
<p>
  [1–2 sentence intro framing the section — acknowledge that while [topic] is well-studied for healthy adults, specific populations need clinical input before starting.]
</p>

<Callout variant="warning" title="If you are pregnant or breastfeeding">
  [One-sentence population-specific callout. Reference gap directly — e.g., "Evidence in pregnancy is limited and not yet sufficient for a safety recommendation."]
</Callout>

<Callout variant="warning" title="If you have [specific condition from findings]">
  [One-sentence callout.]
</Callout>

[... 2–4 more callouts as needed, each for a distinct population from findings ...]

<p>
  None of the above is medical advice. Bring your full supplement list — including what you're considering — to your next provider visit.
</p>
```

The guide already uses `<Callout variant="warning" title="...">...</Callout>` — the component exists. Use it directly in JSX.

Output ONLY valid JSON:
{
  "section_jsx": "the full TSX block as a single string",
  "populations_covered": ["pregnant", "ckd", "teens", ...],
  "word_count": N,
  "placement_hint": "Where in the guide this should go — e.g., 'Before the FAQ section' or 'After The Bottom Line and before FAQ'"
}"""


def strip_jsx_light(src: str) -> str:
    src = re.sub(r"^import[\s\S]*?;\s*$", "", src, flags=re.M)
    src = re.sub(r"<[^>]+>", " ", src)
    src = re.sub(r"\{[^}]{0,200}\}", " ", src)
    for k, v in {"&mdash;": "—", "&ndash;": "–", "&rsquo;": "'", "&ldquo;": '"', "&rdquo;": '"'}.items():
        src = src.replace(k, v)
    src = re.sub(r"&[a-z]+;", " ", src)
    src = re.sub(r"[ \t]+", " ", src)
    src = re.sub(r"\n\s*\n+", "\n\n", src)
    return src.strip()


def main():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    critic_data = json.loads(CRITIC_JSON.read_text(encoding="utf-8"))
    client = Anthropic()

    results = []
    total_cost = 0.0

    for g in critic_data:
        slug = g["slug"]
        # extract blocking + important safety/audience related rebuttals
        blocking = [r for r in g.get("rebuttals", []) if r.get("severity") == "blocking"]
        audience_gaps = g.get("audience_gaps", [])

        if not blocking and not audience_gaps:
            continue

        content_path = CONTENT_DIR / f"{slug}.tsx"
        if not content_path.exists():
            continue

        content = strip_jsx_light(content_path.read_text(encoding="utf-8"))
        words = content.split()
        if len(words) > 4000:
            content = " ".join(words[:4000])

        findings_block = "BLOCKING REBUTTALS (safety issues):\n"
        for r in blocking:
            findings_block += f"- {r['claim']} :: {r['critique']}\n"
        findings_block += "\nAUDIENCE GAPS (populations not addressed):\n"
        for a in audience_gaps:
            findings_block += f"- {a['audience']} :: {a['missing_need']}\n"

        user_msg = (
            f"GUIDE SLUG: {slug}\n"
            f"TITLE: {g.get('title', '')}\n\n"
            f"CRITIC FINDINGS THIS SECTION MUST ADDRESS:\n{findings_block}\n\n"
            f"--- GUIDE CONTENT (for grounding) ---\n{content}\n--- END GUIDE ---"
        )

        print(f"[{slug}] ({len(blocking)} blocking, {len(audience_gaps)} gaps) ...", end=" ", flush=True)
        t0 = time.time()
        try:
            resp = client.messages.create(
                model=MODEL,
                max_tokens=2500,
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
            print(f"ERR parse. raw[:300]: {text[:300]!r}")
            continue

        # Opus pricing: $15/Mtok input, $75/Mtok output
        usage = resp.usage
        cost = (usage.input_tokens * 15 + usage.output_tokens * 75) / 1_000_000
        total_cost += cost

        results.append({
            "slug": slug,
            "title": g.get("title", ""),
            "section_jsx": parsed.get("section_jsx", ""),
            "populations_covered": parsed.get("populations_covered", []),
            "word_count": parsed.get("word_count", 0),
            "placement_hint": parsed.get("placement_hint", ""),
        })
        print(f"OK ({elapsed:.1f}s, ${cost:.4f})")

    OUT_JSON.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")

    lines = ["# Safety Section Output", f"\n{len(results)} guides. Total: ${total_cost:.3f}\n"]
    for r in results:
        lines.append(f"## {r['slug']}")
        lines.append(f"*{r['title']}*")
        lines.append(f"- **Populations covered:** {', '.join(r['populations_covered'])}")
        lines.append(f"- **Word count:** {r['word_count']}")
        lines.append(f"- **Placement:** {r['placement_hint']}")
        lines.append("")
        lines.append("```tsx")
        lines.append(r["section_jsx"])
        lines.append("```")
        lines.append("")
        lines.append("---")
        lines.append("")
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")

    print(f"\nDONE: {len(results)} sections, ${total_cost:.3f}")
    print(f"Output: {OUT_JSON.name} and {OUT_MD.name}")


if __name__ == "__main__":
    main()
