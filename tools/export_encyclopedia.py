"""Export the desktop supplement encyclopedia (data/learning/supplements.ndjson)
into a static JSON the landing site ships with its Next.js bundle.

968 entries, each with summary/primary_uses/mechanism/dosage/safety/interactions.
Strips desktop-only scoring internals (quality_flags, auto_generated) to keep
the bundle lean. Run whenever encyclopedia content changes on the desktop side.

Output:
    src/data/encyclopedia.json
"""

from __future__ import annotations

import json
from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parent.parent
FORMULATE_ROOT = LANDING_ROOT.parent / "Formulate"
SOURCE = FORMULATE_ROOT / "data" / "learning" / "supplements.ndjson"
DEST = LANDING_ROOT / "src" / "data" / "encyclopedia.json"

# Fields dropped from each record — desktop-internal, not useful for SEO pages.
DROP_FIELDS = {"auto_generated", "quality_flags"}

# Keep entries with these grades indexable; D-graded (very-low evidence) still
# ships for the "what we know and don't know" value but the renderer should
# flag them clearly.
KEEP_GRADES = {"A", "B", "C", "D", None}


def slugify(name: str) -> str:
    out = []
    for ch in name.lower().strip():
        if ch.isalnum():
            out.append(ch)
        elif out and out[-1] != "-":
            out.append("-")
    return "".join(out).strip("-")


def main() -> None:
    entries: list[dict] = []
    with SOURCE.open(encoding="utf-8") as f:
        for line in f:
            rec = json.loads(line)
            if rec.get("evidence_grade") not in KEEP_GRADES:
                continue
            for k in DROP_FIELDS:
                rec.pop(k, None)
            # Normalize id into a clean kebab-case slug if the source id drifts.
            rec["slug"] = slugify(rec.get("id") or rec.get("name", ""))
            entries.append(rec)

    # Sort deterministically so JSON diffs stay small between runs.
    entries.sort(key=lambda r: r["slug"])

    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(
        json.dumps(entries, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    print(f"Exported {len(entries)} encyclopedia entries to {DEST.relative_to(LANDING_ROOT)}")
    from collections import Counter
    grades = Counter(r.get("evidence_grade") for r in entries)
    print(f"  Evidence grades: {dict(grades)}")
    size_kb = DEST.stat().st_size // 1024
    print(f"  File size: {size_kb} KB")


if __name__ == "__main__":
    main()
