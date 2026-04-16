"""
Export supplement-interaction data from the Formulate desktop codebase into a
static JSON the landing site can ship with its Next.js bundle.

Run whenever the interaction database in the desktop repo changes.

Output:
    src/data/interactions.json
    src/data/substance-aliases.json
"""

from __future__ import annotations

import json
import sys
from dataclasses import asdict
from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parents[1]
FORMULATE_ROOT = LANDING_ROOT.parent / "Formulate"
if str(FORMULATE_ROOT) not in sys.path:
    sys.path.insert(0, str(FORMULATE_ROOT))

from app.services.interaction_service import (  # noqa: E402
    INTERACTIONS,
    SUBSTANCE_ALIASES,
)

DATA_DIR = LANDING_ROOT / "src" / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)


def _slugify(name: str) -> str:
    out = []
    for ch in name.lower().strip():
        if ch.isalnum():
            out.append(ch)
        elif out and out[-1] != "-":
            out.append("-")
    return "".join(out).strip("-")


def _serialize_interaction(i) -> dict:
    d = asdict(i)
    d["severity"] = i.severity.value
    d["interaction_type"] = i.interaction_type.value
    a, b = sorted([i.substance_a.lower(), i.substance_b.lower()])
    d["pair_key"] = f"{_slugify(a)}--{_slugify(b)}"
    return d


def main() -> None:
    interactions = [_serialize_interaction(i) for i in INTERACTIONS]

    substances: dict[str, set[str]] = {}
    for i in interactions:
        substances.setdefault(i["substance_a"].lower(), set()).add(i["substance_a"])
        substances.setdefault(i["substance_b"].lower(), set()).add(i["substance_b"])
    for alias, canonical in SUBSTANCE_ALIASES.items():
        substances.setdefault(canonical.lower(), set()).add(canonical)

    substance_index = []
    for canonical_lower in sorted(substances.keys()):
        display = sorted(substances[canonical_lower], key=len)[0]
        aliases = sorted({
            a for a, c in SUBSTANCE_ALIASES.items() if c.lower() == canonical_lower
        })
        substance_index.append({
            "slug": _slugify(canonical_lower),
            "canonical": canonical_lower,
            "display": display,
            "aliases": aliases,
        })

    (DATA_DIR / "interactions.json").write_text(
        json.dumps(interactions, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    (DATA_DIR / "substance-aliases.json").write_text(
        json.dumps(substance_index, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    print(f"Exported {len(interactions)} interactions")
    print(f"Exported {len(substance_index)} canonical substances")
    print(f"Output: {DATA_DIR}")


if __name__ == "__main__":
    main()
