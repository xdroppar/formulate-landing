"""Generate a complete new "spoke" guide from a brief, via Opus.

Reads a briefs JSON file, produces TSX-ready full guides. Each guide includes:
  - Properly imported components (TLDRBox, Callout, EvidenceBadge, ComparisonTable, etc.)
  - ~2000-3000 word body
  - Featured-snippet-eligible opening
  - Multiple H2 sections
  - FAQ section
  - "Who Should Talk to a Doctor First" section
  - Cross-links to existing guides

Output: tools/spoke_guides_output/{slug}.tsx — ready to drop into
src/app/guides/[slug]/content/

Usage:
    ANTHROPIC_API_KEY=sk-... python tools/spoke_guide_writer.py

Cost: ~$0.30 per guide with Opus.
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
import os as _os
BRIEFS_FILE = ROOT / "tools" / (_os.environ.get("SPOKE_BRIEFS") or "spoke_briefs.json")
OUT_DIR = ROOT / "tools" / "spoke_guides_output"
OUT_DIR.mkdir(exist_ok=True)

MODEL = "claude-opus-4-6"

SYSTEM_PROMPT = """You write complete long-form health/supplement guides for Formulate, an evidence-based supplement scoring platform. Your output is TSX-ready React component code that drops directly into the app.

REQUIRED FILE STRUCTURE:

```tsx
import {
  TLDRBox,
  Callout,
  ProductCallout,
  ComparisonTable,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";

export function PascalCaseName() {
  return (
    <>
      <TLDRBox
        readTime="N min read"
        takeaways={[
          "4-6 short punchy takeaways",
          "Each one a complete thought",
          "Specific numbers/claims where possible",
        ]}
      />

      <p>
        [OPENING PARAGRAPH — 40-60 words, snippet-eligible, leads with direct factual answer to the implied query, includes primary keyword in first sentence]
      </p>

      [6-10 <h2> sections with <p>, <Callout>, lists as appropriate]

      <h2>Frequently Asked Questions</h2>
      <h3>[Question]</h3>
      <p>[Answer — 60-120 words]</p>
      [4-6 FAQs]

      <h2>Who Should Talk to a Doctor First</h2>
      <p>[Intro framing]</p>
      <Callout variant="warning" title="If you [population]">[brief clinical guidance]</Callout>
      [3-5 callouts for relevant populations]
      <p>None of the above is medical advice. Bring your full supplement list to your next provider visit.</p>

      <h2>The Bottom Line</h2>
      <p>[250-400 word synthesis + clear action]</p>

      <p>
        <a href="https://app.formulate-health.app/catalog?q=KEYWORD">
          Browse KEYWORD supplements in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
```

VOICE & STYLE:
- Informed, direct, slightly skeptical of marketing. Second person ("you").
- Short paragraphs (40-80 words). No filler.
- Active voice. Specific numbers over qualifiers.
- Name studies with author+year inline. Use <EvidenceBadge level="strong|moderate|emerging" /> after citations.
- HTML entities: &mdash; for —, &ndash; for –, &rsquo; for ', &ldquo;/&rdquo; for ""

MEDICAL SAFETY:
- Never invent doses or safety thresholds.
- Use "evidence suggests" not "research proves"
- For specific populations (pregnant, medicated), default to "consult your healthcare provider"
- If something is unsettled or controversial, say so explicitly

CROSS-LINKING RULES:
- Link to 3-5 existing guides using <a href="/guides/slug">text</a>
- Use the cross-link list provided in the brief
- Natural first-mention only — don't over-link

COMPONENTS:
- <TLDRBox readTime="N min read" takeaways={[...]} />
- <Callout variant="info|warning|tip|evidence" title="...">body</Callout>
- <EvidenceBadge level="strong|moderate|emerging" />
- <EvidenceBadge level="strong" studiesId="registry-key" /> when citing a specific paper
- <ComparisonTable products={[...]} columns={[...]} data={{...}} /> if comparing 3+ products
- <ProductCallout product={PRODUCTS["slug"]} /> when recommending a specific product

Output ONLY valid JSON with NO markdown fences:
{
  "file_content": "the complete .tsx file content as a string",
  "pascal_case_name": "the exported function name",
  "word_count": N,
  "internal_links_used": ["slug1", "slug2"],
  "suggested_catalog_link": "the catalogLink URL to use in guides.ts"
}"""


def main():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    briefs = json.loads(BRIEFS_FILE.read_text(encoding="utf-8"))
    client = Anthropic()

    results = []
    total_cost = 0.0

    for i, brief in enumerate(briefs, 1):
        slug = brief["slug"]
        print(f"[{i}/{len(briefs)}] {slug} ...", end=" ", flush=True)

        user_msg = json.dumps(brief, indent=2, ensure_ascii=False)
        t0 = time.time()
        try:
            resp = client.messages.create(
                model=MODEL,
                max_tokens=10000,
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
            print(f"ERR parse")
            continue

        # Save guide TSX
        tsx_path = OUT_DIR / f"{slug}.tsx"
        tsx_path.write_text(parsed.get("file_content", ""), encoding="utf-8")

        usage = resp.usage
        cost = (usage.input_tokens * 15 + usage.output_tokens * 75) / 1_000_000
        total_cost += cost

        results.append({
            "slug": slug,
            "pascal": parsed.get("pascal_case_name", ""),
            "word_count": parsed.get("word_count", 0),
            "internal_links": parsed.get("internal_links_used", []),
            "catalog_link": parsed.get("suggested_catalog_link", ""),
            "brief": brief,
        })
        print(f"OK ({parsed.get('word_count', '?')} words, ${cost:.4f}, {elapsed:.1f}s)")

    meta_path = OUT_DIR / "_metadata.json"
    meta_path.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"\nDONE: {len(results)} guides, ${total_cost:.3f}")
    print(f"Output dir: {OUT_DIR}")


if __name__ == "__main__":
    main()
