"""Find unwritten interaction pairs, ranked by likely SEO value.

Given the 94 substances already in INTERACTIONS and the 530-alias substance
universe, enumerate C(n,2) possible pairs, strip the ones already documented,
and rank what's left by a cheap heuristic of search-intent popularity.

Popularity signal (no network calls — deliberate):
  - Manually curated `POPULARITY_TIER` for top ~40 supplements
  - Frequency of appearance in existing INTERACTIONS as a fallback signal
  - Bonus for medication pairs (huge, under-served query space)

Outputs:
  tools/interaction_gaps.md         — top 200 unwritten pairs, ranked
  tools/interaction_gaps.json       — full list for downstream tooling

Run from formulate-landing/:  python tools/interaction_gap_finder.py
"""
from __future__ import annotations

import itertools
import json
import sys
from collections import Counter
from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parents[1]
FORMULATE_ROOT = LANDING_ROOT.parent / "Formulate"
sys.path.insert(0, str(FORMULATE_ROOT))

from app.services.interaction_service import INTERACTIONS, SUBSTANCE_ALIASES  # noqa: E402

OUT_MD = LANDING_ROOT / "tools" / "interaction_gaps.md"
OUT_JSON = LANDING_ROOT / "tools" / "interaction_gaps.json"

# Search-volume proxy. Higher = more people Google it standalone.
# Hand-tuned from common-knowledge supplement search trends; refine with real
# keyword data when available.
POPULARITY_TIER: dict[str, int] = {
    "magnesium": 100, "vitamin d": 100, "vitamin d3": 100, "omega-3": 95,
    "fish oil": 95, "zinc": 90, "vitamin c": 90, "iron": 88,
    "calcium": 85, "vitamin b12": 85, "b12": 85, "turmeric": 85,
    "curcumin": 80, "ashwagandha": 85, "melatonin": 85, "caffeine": 90,
    "l-theanine": 75, "creatine": 85, "probiotics": 80, "collagen": 80,
    "vitamin k2": 70, "coq10": 70, "nac": 70, "glutathione": 65,
    "berberine": 75, "rhodiola": 65, "lions mane": 70, "lion's mane": 70,
    "reishi": 55, "selenium": 60, "potassium": 65, "copper": 50,
    "manganese": 45, "iodine": 55, "chromium": 55, "biotin": 60,
    "folate": 70, "folic acid": 70, "thiamine": 50, "riboflavin": 45,
    "niacin": 65, "vitamin b6": 60, "b6": 60, "vitamin e": 65,
    "vitamin a": 60, "vitamin k": 55, "glycine": 55, "taurine": 55,
    "quercetin": 55, "resveratrol": 65, "alpha lipoic acid": 55,
    "alpha-lipoic acid": 55, "ala": 50, "5-htp": 65, "gaba": 60,
    "sam-e": 55, "same": 55, "milk thistle": 60, "st johns wort": 70,
    "st. johns wort": 70, "st john's wort": 70,
    "ginkgo": 60, "ginger": 65, "garlic": 60, "green tea": 70,
    "egcg": 55, "spirulina": 55, "chlorella": 50, "maca": 55,
    "dhea": 55, "pregnenolone": 45, "lithium": 50, "boron": 40,
    "molybdenum": 35, "silica": 35, "strontium": 30,
}


def _tier(name: str) -> int:
    n = name.lower().strip()
    if n in POPULARITY_TIER:
        return POPULARITY_TIER[n]
    # fuzzy: contains any key?
    for k, v in POPULARITY_TIER.items():
        if k in n or n in k:
            return max(v - 10, 20)
    return 15  # unknown / niche


def _is_medication(name: str) -> bool:
    # Heuristic. Medication names in your DB currently include suffixes like
    # "(medication)", "warfarin", "ssri", "maoi", "statins", etc.
    n = name.lower()
    med_markers = (
        "medication", "warfarin", "ssri", "maoi", "statin", "anticoagulant",
        "aspirin", "metformin", "thyroid medication", "levothyroxine", "beta-blocker",
        "blood thinner", "antibiotic", "benzodiazepine", "lithium (medication)",
    )
    return any(m in n for m in med_markers)


def _pair_key(a: str, b: str) -> tuple[str, str]:
    x, y = sorted([a.lower().strip(), b.lower().strip()])
    return (x, y)


def main() -> None:
    # Existing pairs
    seen: set[tuple[str, str]] = set()
    substance_freq: Counter = Counter()
    for i in INTERACTIONS:
        seen.add(_pair_key(i.substance_a, i.substance_b))
        substance_freq[i.substance_a.lower()] += 1
        substance_freq[i.substance_b.lower()] += 1

    # Substance universe: canonicals that appear in INTERACTIONS or as alias targets
    universe: set[str] = set()
    for i in INTERACTIONS:
        universe.add(i.substance_a.lower())
        universe.add(i.substance_b.lower())
    for _alias, canonical in SUBSTANCE_ALIASES.items():
        universe.add(canonical.lower())

    universe_list = sorted(universe)
    all_pairs = list(itertools.combinations(universe_list, 2))
    gaps = [(a, b) for a, b in all_pairs if (a, b) not in seen]

    # Rank each gap
    ranked = []
    for a, b in gaps:
        ta, tb = _tier(a), _tier(b)
        base_score = ta + tb
        # Frequency bonus: both sides already appear in existing interactions
        freq_bonus = min(substance_freq[a], substance_freq[b]) * 3
        # Medication pair bonus
        med_bonus = 40 if (_is_medication(a) or _is_medication(b)) else 0
        # Both-medication = noise (not our domain); heavy penalty
        if _is_medication(a) and _is_medication(b):
            med_bonus = -100
        score = base_score + freq_bonus + med_bonus
        ranked.append({
            "a": a, "b": b,
            "tier_a": ta, "tier_b": tb,
            "freq_a": substance_freq[a], "freq_b": substance_freq[b],
            "is_medication_pair": _is_medication(a) or _is_medication(b),
            "score": score,
        })

    ranked.sort(key=lambda r: -r["score"])

    OUT_JSON.write_text(json.dumps(ranked[:1000], indent=2), encoding="utf-8")

    lines = []
    lines.append("# Interaction Gap Finder\n")
    lines.append(f"- Substance universe: **{len(universe_list)}**")
    lines.append(f"- Possible pairs C(n,2): **{len(all_pairs):,}**")
    lines.append(f"- Already documented: **{len(seen)}**")
    lines.append(f"- Unwritten gaps: **{len(gaps):,}**\n")

    lines.append("## Top 200 Gaps (by SEO-value score)\n")
    lines.append("| Rank | Pair | Score | Medication? | Existing freq (A/B) |")
    lines.append("|---|---|---|---|---|")
    for idx, r in enumerate(ranked[:200], 1):
        med = "yes" if r["is_medication_pair"] else ""
        lines.append(
            f"| {idx} | {r['a']} + {r['b']} | {r['score']} | {med} | "
            f"{r['freq_a']}/{r['freq_b']} |"
        )

    lines.append("\n## Notes\n")
    lines.append("- Score combines curated popularity tier + existing-interaction frequency + medication bonus.")
    lines.append("- 'Medication' pair detection is heuristic — review before committing to research.")
    lines.append("- A high-ranked pair is a candidate for research, not a guaranteed real interaction. Use the research brief tool next.")

    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT_MD}")
    print(f"Wrote {OUT_JSON}")
    print(f"\n{len(gaps):,} unwritten gaps out of {len(all_pairs):,} possible pairs.")
    print(f"Top 3: {[f'{r['a']}+{r['b']}' for r in ranked[:3]]}")


if __name__ == "__main__":
    main()
