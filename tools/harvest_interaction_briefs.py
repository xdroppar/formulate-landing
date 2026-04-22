"""Harvest completed interaction research briefs into the desktop INTERACTIONS
database. Each 06_decision.md contains a proposed `Interaction(...)` Python
block that supersedes the matching entry in interaction_service.py. This
tool extracts those blocks and writes them in place.

Usage:
  python tools/harvest_interaction_briefs.py                # dry-run
  python tools/harvest_interaction_briefs.py --write        # apply

Run `python tools/export_interactions.py` afterward to sync to landing JSON.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parent.parent
BRIEFS = LANDING_ROOT / "tools" / "briefs"
FORMULATE_ROOT = LANDING_ROOT.parent / "Formulate"
SERVICE_FILE = FORMULATE_ROOT / "app" / "services" / "interaction_service.py"


def extract_interaction_block(decision_md: str) -> str | None:
    """Find the last complete `Interaction(...)` block in 06_decision.md.
    The first block is the original being replaced; the last is the new entry."""
    # Split on lines that start with "Interaction(" at column 0
    # Find all start positions
    starts = [m.start() for m in re.finditer(r"^Interaction\(", decision_md, re.MULTILINE)]
    if not starts:
        return None
    # For each start, walk forward to find the matching `)` at column 0 on its own line
    blocks: list[str] = []
    for start in starts:
        # From `start`, find the next `^\)$` line.
        remainder = decision_md[start:]
        match = re.search(r"^\)\s*$", remainder, re.MULTILINE)
        if not match:
            continue
        blocks.append(remainder[: match.end()])
    if not blocks:
        return None
    return blocks[-1]


def reindent_block(block: str, spaces: int = 4) -> str:
    """Add leading spaces to each line. Brief entries are at col 0;
    INTERACTIONS list expects col 4 (Interaction() inside a list)."""
    pad = " " * spaces
    return "\n".join(pad + line if line else line for line in block.splitlines())


def find_existing_entry(source: str, substance_a: str, substance_b: str) -> tuple[int, int] | None:
    """Find the character range [start, end] of the existing Interaction() block
    in interaction_service.py matching the given substance pair. Matches in
    either order (A-B or B-A)."""
    # An entry looks like:
    #     Interaction(
    #         substance_a="...",
    #         substance_b="...",
    #         ...
    #     ),
    for match in re.finditer(r"^    Interaction\(", source, re.MULTILINE):
        start = match.start()
        # Find the closing `    ),` line at col 4
        rest = source[start:]
        close = re.search(r"^    \),?\s*$", rest, re.MULTILINE)
        if not close:
            continue
        entry_text = rest[: close.end()]
        a = re.search(r'substance_a="([^"]+)"', entry_text)
        b = re.search(r'substance_b="([^"]+)"', entry_text)
        if not a or not b:
            continue
        pair_set = {a.group(1).lower(), b.group(1).lower()}
        if pair_set == {substance_a.lower(), substance_b.lower()}:
            return start, start + close.end()
    return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true",
                        help="apply edits (default is dry-run)")
    args = parser.parse_args()

    if not SERVICE_FILE.exists():
        print(f"interaction_service.py not found at {SERVICE_FILE}", file=sys.stderr)
        return 1

    source = SERVICE_FILE.read_text(encoding="utf-8")
    original_source = source

    briefs = sorted(d for d in BRIEFS.iterdir() if d.is_dir())
    results: list[tuple[str, str]] = []  # (brief_name, status)

    for brief_dir in briefs:
        evidence = brief_dir / "02_evidence.json"
        decision = brief_dir / "06_decision.md"
        if not evidence.exists() or not decision.exists():
            results.append((brief_dir.name, "SKIP (missing 02_evidence.json or 06_decision.md)"))
            continue

        ev = json.loads(evidence.read_text(encoding="utf-8"))
        pair = ev.get("pair", {})
        a, b = pair.get("a"), pair.get("b")
        if not a or not b:
            results.append((brief_dir.name, "SKIP (no pair in evidence)"))
            continue

        decision_text = decision.read_text(encoding="utf-8")
        new_block = extract_interaction_block(decision_text)
        if not new_block:
            results.append((brief_dir.name, "SKIP (no Interaction() block in decision)"))
            continue

        # Apply list-context indentation and add the trailing comma the list needs.
        new_block_indented = reindent_block(new_block) + ","

        existing = find_existing_entry(source, a, b)
        if not existing:
            results.append((brief_dir.name, f"SKIP (no existing INTERACTIONS entry for {a} + {b})"))
            continue

        start, end = existing
        source = source[:start] + new_block_indented + source[end:]
        results.append((brief_dir.name, f"HARVESTED ({a} + {b})"))

    print("Harvest results:")
    for name, status in results:
        print(f"  [{status}] {name}")

    if source == original_source:
        print("\nNo changes.")
        return 0

    if args.write:
        SERVICE_FILE.write_text(source, encoding="utf-8")
        print(f"\nWrote {SERVICE_FILE.relative_to(FORMULATE_ROOT.parent)}")
        print("Next: python tools/export_interactions.py")
    else:
        print("\nDry run. Re-run with --write to apply.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
