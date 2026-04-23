"""Fix broken internal /guides/<slug> links in guide content .tsx files.

Maps historical/variant slugs to their canonical destinations. Ambiguous or
genuinely-missing targets are reported, never silently rewritten.

Usage:
  python tools/fix_broken_guide_links.py              # dry-run (default)
  python tools/fix_broken_guide_links.py --write      # apply edits
  python tools/fix_broken_guide_links.py --report     # just print summary
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "src" / "app" / "guides" / "[slug]" / "content"

# Redirect map: broken slug -> canonical existing slug. Each mapping was
# verified against the parsed guides.ts slug set. Multiple old forms can
# point to the same canonical guide (slug drift during rewrites).
REDIRECTS: dict[str, str] = {
    # Supplement timing
    "supplement-timing": "supplement-timing-guide",
    # "How to read supplement labels" — 5 variants
    "reading-supplement-labels": "how-to-read-a-supplement-label",
    "supplement-label-reading": "how-to-read-a-supplement-label",
    "how-to-read-supplement-labels": "how-to-read-a-supplement-label",
    "supplement-label-guide": "how-to-read-a-supplement-label",
    "supplement-labels": "how-to-read-a-supplement-label",
    # Beginner longevity stack — 3 variants
    "beginner-longevity-stack": "beginner-longevity-supplement-stack",
    "beginners-longevity-stack": "beginner-longevity-supplement-stack",
    "longevity-stack": "beginner-longevity-supplement-stack",
    # Magnesium family
    "magnesium-deficiency": "signs-you-are-magnesium-deficient",
    "signs-of-magnesium-deficiency": "signs-you-are-magnesium-deficient",
    "magnesium-supplement-guide": "best-magnesium-supplements",
    "magnesium-glycinate": "magnesium-glycinate-vs-citrate-vs-oxide",
    "magnesium-forms-compared": "magnesium-glycinate-vs-citrate-vs-oxide",
    # Creatine
    "creatine-loading": "creatine-loading-phase",
    # Sleep
    "sleep-supplement-guide": "best-sleep-supplement-protocol",
    # Ingredient pages (canonical is the *-guide form)
    "ashwagandha": "ashwagandha-guide",
    "berberine": "berberine-guide",
    "berberine-supplements": "berberine-guide",
    "nac": "nac-guide",
    "vitamin-b12": "vitamin-b12-guide",
    "vitamin-b12-deficiency": "vitamin-b12-guide",
    # Vitamin D — route to roundup (best-vitamin-d-supplements) since it's
    # the highest-intent landing page for vitamin D topics.
    "vitamin-d": "best-vitamin-d-supplements",
    "vitamin-d-guide": "best-vitamin-d-supplements",
    "vitamin-d3-k2": "best-vitamin-d-supplements",
    # Omega-3
    "omega-3": "best-omega-3-supplements",
    "omega-3-dosing-guide": "best-omega-3-supplements",
    # Third-party testing (backlog cleared by shipping the combined guide)
    "usp-verified-supplements": "third-party-testing-supplements",
    # Backlog consolidations — redirect to existing canonical guides
    "vitamin-b12-supplement": "vitamin-b12-guide",
    "multivitamin": "do-you-need-a-multivitamin",
    "collagen-for-joints": "best-collagen-for-joints",
    "beta-alanine-supplements": "beta-alanine",
    # Residual baseline sweep (2026-04-22) — final broken-link cleanup
    "supplement-stacking": "how-to-build-a-supplement-stack",
    "supplement-stack-guide": "how-to-build-a-supplement-stack",
    "longevity-supplements": "beginner-longevity-supplement-stack",
    "best-sleep-supplements": "best-sleep-supplement-protocol",
    "magnesium-supplements": "best-magnesium-supplements",
    "b-vitamins-guide": "vitamin-b12-guide",
}

# Targets with no existing canonical guide — log as future content backlog.
# These are genuinely missing pages that should become new guides.
BACKLOG_TARGETS: list[str] = [
    # All 2026-04-21/2026-04-22 session backlog cleared. Entries kept here
    # commented for history:
    #   "supplement-drug-interactions"       # shipped 2026-04-21
    #   "supplement-safety"                  # shipped 2026-04-21
    #   "third-party-testing-supplements"    # shipped 2026-04-21
    #   "usp-verified-supplements"           # redirect
    #   "coq10-benefits"                     # shipped 2026-04-22
    #   "best-supplements-for-joint-pain"    # shipped 2026-04-22
    #   "methylfolate-vs-folic-acid"         # shipped 2026-04-22
    #   "best-vitamin-c-supplements"         # shipped 2026-04-22
    #   "protein-guide"                      # shipped 2026-04-22
    #   "how-to-read-supplement-research"    # shipped 2026-04-22
    #   "beta-alanine" / "beta-alanine-supplements"  # shipped 2026-04-22
    #   "multivitamin-comparison"            # shipped 2026-04-22
    #   "vitamin-b12-supplement"             # redirect
    #   "multivitamin"                       # redirect
    #   "collagen-for-joints"                # redirect

    # Residual genuinely-missing targets — would need new guides:
    "magnesium-and-kidney-function",
    "ibs-vs-ibd-differences",
]


def apply_redirects(text: str) -> tuple[str, list[tuple[str, str]]]:
    """Rewrite href="/guides/<old>" -> href="/guides/<new>" for each mapping.
    Returns (new_text, [(old_slug, new_slug), ...] of applied changes).
    Anchors and query strings are preserved."""
    applied: list[tuple[str, str]] = []
    for old, new in REDIRECTS.items():
        # Match href="/guides/<old>" with optional ?query or #anchor, followed
        # by closing quote or /. Use a raw regex to catch all forms.
        pattern = re.compile(
            rf'href="/guides/{re.escape(old)}(?=["/?#])'
        )
        matches = pattern.findall(text)
        if matches:
            text = pattern.sub(f'href="/guides/{new}', text)
            applied.extend([(old, new)] * len(matches))
    return text, applied


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true",
                        help="apply edits (default is dry-run)")
    parser.add_argument("--report", action="store_true",
                        help="print summary only, no file output")
    args = parser.parse_args()

    content_files = sorted(CONTENT_DIR.glob("*.tsx"))
    print(f"Scanning {len(content_files)} guide content files in {CONTENT_DIR.relative_to(ROOT)}")

    total_applied: dict[tuple[str, str], int] = {}
    changed_files: list[Path] = []

    for f in content_files:
        original = f.read_text(encoding="utf-8")
        rewritten, applied = apply_redirects(original)
        if applied:
            changed_files.append(f)
            for pair in applied:
                total_applied[pair] = total_applied.get(pair, 0) + 1
            if args.write and not args.report:
                f.write_text(rewritten, encoding="utf-8")

    if not args.report:
        print()
        mode = "WRITTEN" if args.write else "would fix"
        print(f"{mode}: {sum(total_applied.values())} links across {len(changed_files)} files")
        print()
        print("Rewrites applied:")
        for (old, new), count in sorted(total_applied.items(), key=lambda x: -x[1]):
            print(f"  {count:3d}  /guides/{old}  ->  /guides/{new}")

    print()
    print("Genuinely-missing guide targets (backlog — should become new guides):")
    for t in BACKLOG_TARGETS:
        print(f"  /guides/{t}")

    if not args.write:
        print()
        print("Dry run. Re-run with --write to apply.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
