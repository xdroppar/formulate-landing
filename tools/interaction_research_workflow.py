"""Generate a 6-stage research workflow per interaction pair.

Replaces the single-file brief with a structured multi-stage process that
mirrors systematic-review methodology. Every claim must be extracted from a
named source (Stage 2), drafted with evidence tags (Stage 3), actively
red-teamed (Stage 4), GRADE-scored (Stage 5), and pass a ship-decision
checklist (Stage 6) before it can be added to INTERACTIONS.

Usage:
    python tools/interaction_research_workflow.py "magnesium" "ashwagandha"
    python tools/interaction_research_workflow.py --top 10
    python tools/interaction_research_workflow.py --rewrite "zinc" "copper"  # existing pair

Output:
    tools/briefs/<slug-a>--<slug-b>/
        01_search_strategy.md
        02_evidence.json
        03_draft.md
        04_adversarial.md
        05_grade_scoring.md
        06_decision.md

Then run:
    python tools/interaction_workflow_validate.py <slug-a>--<slug-b>
to check completeness before shipping.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parents[1]
FORMULATE_ROOT = LANDING_ROOT.parent / "Formulate"
sys.path.insert(0, str(FORMULATE_ROOT))

DEFAULT_OUT = LANDING_ROOT / "tools" / "briefs"
GAPS_JSON = LANDING_ROOT / "tools" / "interaction_gaps.json"


def _slug(s: str) -> str:
    out = []
    for ch in s.lower().strip():
        if ch.isalnum():
            out.append(ch)
        elif out and out[-1] != "-":
            out.append("-")
    return "".join(out).strip("-")


# =============================================================================
# STAGE 1 — SEARCH STRATEGY
# =============================================================================

SEARCH_STRATEGY = """# Stage 1 — Search Strategy

Pair: **{A}** + **{B}**

## Rationale

Real evidence requires a structured search, not a vibe check. Do each of the
queries below, in order. Record what you found in `02_evidence.json`.

## 1. PubMed (primary)

**Broad:** `("{A}"[MeSH Terms] OR "{A}"[Title/Abstract]) AND ("{B}"[MeSH Terms] OR "{B}"[Title/Abstract])`

**Filtered to high-quality evidence:**
- Add: `AND ("randomized controlled trial"[Publication Type] OR "meta-analysis"[Publication Type] OR "systematic review"[Publication Type])`
- Date filter: last 15 years (older is fine if seminal)
- Species: `AND "humans"[MeSH Terms]` (unless mechanism justifies animal data)

**Interaction-specific terms to include:**
- `AND ("drug interactions"[MeSH] OR "absorption" OR "bioavailability" OR "pharmacokinetics")`
- For synergy: `OR "synergism"[MeSH] OR "combined"`

## 2. NIH Office of Dietary Supplements

- https://ods.od.nih.gov/factsheets/ — check both A and B fact sheets
- Look for the "Interactions with Medications" and "Interactions with Supplements" sections
- These are physician-authored and citable

## 3. Memorial Sloan Kettering Integrative Medicine

- https://www.mskcc.org/cancer-care/integrative-medicine/herbs
- Search each substance. Look at "Adverse Reactions" and "Herb-Drug Interactions."
- MSK reviews are the most physician-oriented source for herb/supplement data.

## 4. Examine.com

- https://examine.com/supplements/{AS}/ and /{BS}/
- Look at the "Caution / Adverse" and "Combines with" sections
- Examine is exhaustive but commercial — cross-check their citations

## 5. Cochrane Library (for top-tier evidence)

- https://www.cochranelibrary.com — systematic reviews only
- Use for big-effect claims; empty result = noted absence (worth recording)

## 6. Cross-database checks

- **RxNorm** (if A or B is a drug): check the NIH RxNav Interaction API
- **Retraction Watch**: search each PMID you cite. Retracted papers must be dropped.

## 7. Negative-result recording

If searches return **no** direct-pair evidence:
- Record queries and dates in `02_evidence.json` under `searches_with_no_results`
- Decide: drop the pair (no page) vs write a "no documented interaction" page
- Default: drop. A no-result page has low SEO value unless the pair is high-volume.

## Output of this stage

In `02_evidence.json`, populate `searches_performed[]` with each query you ran,
the database, date, and result count. This makes the research reproducible and
lets a reviewer spot missed queries.
""".replace("{AS}", "{A_SLUG}").replace("{BS}", "{B_SLUG}")


# =============================================================================
# STAGE 2 — EVIDENCE EXTRACTION (JSON SCHEMA)
# =============================================================================

EVIDENCE_SCHEMA = {
    "pair": {"a": None, "b": None},
    "structured_rendering": {
        "mechanism": None,
        "populations": [],
        "what_we_dont_know": None,
        "severity_rationale": None,
        "evidence_quality": None,  # high | moderate | low | very-low
    },
    "searches_performed": [
        {
            "database": "pubmed | ods | msk | examine | cochrane | other",
            "query": "",
            "date_run": "YYYY-MM-DD",
            "results_count": 0,
            "notes": "",
        }
    ],
    "searches_with_no_results": [],
    "sources": [
        {
            "id": "S1",
            "type": "rct | meta-analysis | systematic-review | observational | case-report | fact-sheet | monograph | in-vitro | animal",
            "pmid": "",
            "doi": "",
            "url": "",
            "title": "",
            "year": None,
            "n_humans": None,
            "population": "e.g. healthy adults, postmenopausal women",
            "design_notes": "blinding, duration, dose tested",
            "key_findings": "one paragraph, verbatim from abstract where possible",
            "limitations": "stated by authors + reviewer's own",
            "retracted_check": {"checked": False, "retracted": False, "date_checked": ""},
            "quality_grade": "high | moderate | low | very-low",
        }
    ],
    "claims": [
        {
            "claim_id": "C1",
            "statement": "short declarative sentence",
            "supporting_source_ids": ["S1", "S2"],
            "contradicting_source_ids": [],
            "corroboration_count": 0,
            "strength": "strong | moderate | weak | absent",
            "population_scope": ["adults"],
            "population_exclusions": ["pregnancy: not studied", "pediatrics: not studied"],
            "dose_threshold": {
                "a": "interaction becomes clinically meaningful at dose X",
                "b": "same",
                "notes": "if unknown, write 'unknown'"
            },
        }
    ],
    "contradictions": [
        {
            "topic": "e.g. severity of absorption impairment",
            "source_ids": ["S1", "S3"],
            "resolution": "how the contradiction was resolved — or flagged unresolved",
        }
    ],
    "final_severity_proposed": "danger | warning | caution | synergy | info",
    "final_interaction_type_proposed": "absorption | competition | synergy | potentiation | antagonism | metabolism | timing | medication",
    "reviewer_notes": "",
    "last_reviewed": "YYYY-MM-DD",
    "re_review_due": "YYYY-MM-DD (12 months out)",
}


# =============================================================================
# STAGE 3 — DRAFT TEMPLATE
# =============================================================================

DRAFT_TEMPLATE = """# Stage 3 — Draft

Pair: **{A}** + **{B}**

> Every factual sentence below must end with `[strength, S#]` pointing to
> a source in `02_evidence.json`. Claims without tags are dropped in Stage 4.

## Summary (<= 120 chars, one line)

<write here>

## Details (400-800 words)

### Mechanism
<what's happening at the physiological level — only if stated in a source. If
unclear, write exactly: "The mechanism is not established in current human
literature." [absent]>

### Evidence quality
<what's the best evidence we have? RCT in healthy adults? Meta-analysis?
In-vitro only? Be specific.>

### Clinical relevance
<how big is the effect in practice — magnitude, not just direction. Include
effect sizes from sources when available.>

### Dose considerations
<at what dose does this become clinically meaningful? Reference the dose
thresholds in `02_evidence.json > claims[].dose_threshold`.>

### Populations to watch
<who should be more careful — elderly, pregnant, renal impairment, hepatic
impairment, specific genotypes. If a population was explicitly NOT studied,
say so — that's useful information.>

### What we don't know
<be explicit about evidence gaps. This is a credibility signal, not a
weakness. "No RCTs in pregnancy" is a valid sentence.>

## Recommendation

<specific and actionable. "Take 2+ hours apart" is a recommendation.
"Consult your doctor" is not.>

## Timing advice

<if timing matters; otherwise 'N/A'>

## Sources (copied from 02_evidence.json)

- S1: PMID:<id> — <title>, <year>
- S2: <url>
- ...

## Severity: <danger | warning | caution | synergy | info>

Justification: <one paragraph tying severity to the strongest evidence tier.
If severity is DANGER, at least one [strong] tag must support it.>
"""


# =============================================================================
# STAGE 4 — ADVERSARIAL REVIEW (RED-TEAM PROMPT)
# =============================================================================

ADVERSARIAL_TEMPLATE = """# Stage 4 — Adversarial Review

Pair: **{A}** + **{B}**

> You are a skeptical reviewer. Your job is NOT to agree with the draft.
> Your job is to try to falsify it. Go through every claim and attack it.

## Attack vectors — answer each one in writing

### 1. Source substitution attack

For each claim, could the cited source plausibly NOT support it? Open the
abstract. Quote the exact sentence from the paper that supports the claim.
If you cannot find a supporting sentence, mark the claim `UNSUPPORTED`.

### 2. Directness attack

Are the sources directly about {A} + {B} in humans? Or are they:
- About {A} alone (and we inferred the interaction)?
- About a related compound?
- Animal or in-vitro only?
- About a different population than our claim scope?

Any indirect source drops the strength tag by one level. Re-tag every claim.

### 3. Contradiction search

Did the researcher actively search for contradicting evidence? If all sources
agree too neatly, that's a red flag. Re-run at least one PubMed search with
NEGATIVE terms: `NOT ("no effect" OR "did not" OR "not significant")` to
surface null-result papers. Add any findings to `02_evidence.json > contradictions`.

### 4. Dose + population attack

- Does the draft make a general claim from a narrow-population study?
  (e.g. "this interaction occurs in adults" from a postmenopausal-only RCT)
- Does the draft specify a dose threshold? Without one, the page is advice
  with no actionable numbers.

### 5. Severity mis-tagging attack

Is the severity rating defensible from the evidence alone, or is it a
judgment call? Rank the evidence. If the strongest evidence is [moderate]
and severity is DANGER, either downgrade severity or flag for physician review.

### 6. Timing-advice plausibility

Does the timing advice (e.g. "take 2 hours apart") come from a source, or is
it a round-number guess? Round-number guesses must be labeled as rule-of-thumb,
not evidence-based.

### 7. Publication-bias probe

Are the supporting sources all from one research group? All industry-funded?
If yes, flag. Require at least one independent replication for [strong] tags.

### 8. Retraction check

Run every PMID through Retraction Watch (https://retractionwatch.com) or
PubMed's retracted-publication filter. Remove any retracted paper AND any
claims that depended on it.

## Output of this stage

Update `02_evidence.json`:
- Mark claims that fail an attack as `strength: "weak"` or drop them.
- Add any new contradictions found.
- Set `reviewer_notes` to summarize what survived and what didn't.

Update `03_draft.md`:
- Remove or soften any claim that failed an attack.
- If >30% of claims failed, the page is not ready — go back to Stage 1.
"""


# =============================================================================
# STAGE 5 — GRADE-STYLE SCORING
# =============================================================================

GRADE_TEMPLATE = """# Stage 5 — GRADE-Style Evidence Scoring

Pair: **{A}** + **{B}**

> Based on the GRADE (Grading of Recommendations, Assessment, Development and
> Evaluations) framework used in clinical guideline development. We are not
> producing a clinical guideline, but the rubric keeps us honest.

## Starting confidence tier

- RCT evidence → start at **HIGH**
- Observational evidence → start at **LOW**
- Mixed → start at whichever is dominant

## Downgrade factors (each reduces confidence by one tier)

| Factor | Question | Your answer |
|---|---|---|
| Risk of bias | Was randomization/blinding/allocation concealment adequate in the supporting RCTs? | |
| Inconsistency | Do sources produce different effect estimates? If yes, is it explainable (dose, population)? | |
| Indirectness | Is the evidence directly about this pair, this population, and the outcome of interest? | |
| Imprecision | Are the 95% CIs wide relative to the effect size? Sample sizes small? | |
| Publication bias | Single research group? Industry-funded only? Few negative results? | |

## Upgrade factors (for observational evidence)

| Factor | Question | Your answer |
|---|---|---|
| Large effect | Effect size RR > 2 or RR < 0.5 with consistency? | |
| Dose-response | Is there a clear dose-response gradient? | |
| Plausible confounders biased against the effect | Would real-world confounding *reduce* the observed association? | |

## Final confidence tier

- [ ] HIGH    — further research is very unlikely to change the estimate
- [ ] MODERATE — further research may change the estimate
- [ ] LOW     — further research is likely to change the estimate
- [ ] VERY LOW — any estimate is very uncertain

## Severity-vs-confidence matrix

This is our ship gate:

| Severity | Minimum confidence required to ship |
|---|---|
| DANGER | MODERATE+ AND physician or pharmacist sign-off |
| WARNING | MODERATE+ |
| CAUTION | LOW+ |
| SYNERGY | LOW+ |
| INFO | VERY LOW OK, but must be labeled "preliminary evidence" |

If your draft severity does not meet the confidence bar, either:
1. Downgrade severity to match confidence, or
2. Go back to Stage 1 and find more evidence, or
3. Block the page.
"""


# =============================================================================
# STAGE 6 — SHIP DECISION
# =============================================================================

DECISION_TEMPLATE = """# Stage 6 — Ship Decision

Pair: **{A}** + **{B}**

## Pre-ship checklist (all must be TRUE)

- [ ] `02_evidence.json` is fully populated (no `null` in required fields)
- [ ] Every claim in `03_draft.md` has a `[strength, S#]` tag
- [ ] Every claim has >= 2 supporting sources OR is labeled as single-source
- [ ] No retracted sources remain
- [ ] `04_adversarial.md` attacks were all answered, and claims that failed were softened or removed
- [ ] `05_grade_scoring.md` final confidence tier meets the severity bar
- [ ] `details` field is 400-800 words
- [ ] `summary` field is <= 120 chars
- [ ] `recommendation` is specific and actionable (not "consult your doctor")
- [ ] Populations studied are explicit; unstudied populations are flagged
- [ ] Dose threshold is given OR labeled "unknown"
- [ ] `last_reviewed` date is set; `re_review_due` is 12 months out

## Physician/pharmacist sign-off (required for DANGER and WARNING)

- [ ] Reviewed by: ______________________
- [ ] Date: ______________________
- [ ] Notes: ______________________

## Validator output

Run: `python tools/interaction_workflow_validate.py {SLUG_A}--{SLUG_B}`

Paste the validator output here:

```
<validator output>
```

## Final decision

- [ ] **SHIP** — add entry to `Formulate/app/services/interaction_service.py` INTERACTIONS list
- [ ] **REVISE** — return to a specific earlier stage (specify: _____)
- [ ] **BLOCK** — evidence does not support a defensible page. Do not ship.

## If SHIPPING: exact Python entry

```python
Interaction(
    substance_a="{A}",
    substance_b="{B}",
    severity=InteractionSeverity.<from 02_evidence.json>,
    interaction_type=InteractionType.<from 02_evidence.json>,
    summary="<from 03_draft.md>",
    details="<from 03_draft.md — 400-800 words>",
    recommendation="<from 03_draft.md>",
    timing_advice="<from 03_draft.md or None>",
    sources=[
        # pull from 02_evidence.json > sources[]
    ],
)
```

After merging, regenerate exports:

```
python tools/export_interactions.py
```
"""


# =============================================================================
# ORCHESTRATION
# =============================================================================

def write_workflow(a: str, b: str, out_dir: Path) -> Path:
    slug_a, slug_b = _slug(a), _slug(b)
    # Canonical ordering so `x+y` and `y+x` share a directory
    if slug_a > slug_b:
        a, b = b, a
        slug_a, slug_b = slug_b, slug_a

    pair_dir = out_dir / f"{slug_a}--{slug_b}"
    pair_dir.mkdir(parents=True, exist_ok=True)

    # Stage 1
    (pair_dir / "01_search_strategy.md").write_text(
        SEARCH_STRATEGY.format(A=a, B=b, A_SLUG=slug_a, B_SLUG=slug_b),
        encoding="utf-8",
    )

    # Stage 2 — JSON scaffold
    evidence = json.loads(json.dumps(EVIDENCE_SCHEMA))  # deep copy
    evidence["pair"] = {"a": a, "b": b}
    (pair_dir / "02_evidence.json").write_text(
        json.dumps(evidence, indent=2),
        encoding="utf-8",
    )

    # Stage 3
    (pair_dir / "03_draft.md").write_text(
        DRAFT_TEMPLATE.format(A=a, B=b), encoding="utf-8",
    )

    # Stage 4
    (pair_dir / "04_adversarial.md").write_text(
        ADVERSARIAL_TEMPLATE.format(A=a, B=b), encoding="utf-8",
    )

    # Stage 5
    (pair_dir / "05_grade_scoring.md").write_text(
        GRADE_TEMPLATE.format(A=a, B=b), encoding="utf-8",
    )

    # Stage 6
    (pair_dir / "06_decision.md").write_text(
        DECISION_TEMPLATE.format(A=a, B=b, SLUG_A=slug_a, SLUG_B=slug_b),
        encoding="utf-8",
    )

    return pair_dir


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("pair", nargs="*", help="Substance A and B (quoted if multi-word)")
    ap.add_argument("--top", type=int, default=0,
                    help="Generate workflows for top-N gaps from interaction_gap_finder")
    ap.add_argument("--out-dir", type=Path, default=DEFAULT_OUT)
    args = ap.parse_args()

    written = []

    if args.top > 0:
        if not GAPS_JSON.exists():
            print(f"ERROR: {GAPS_JSON} not found. Run interaction_gap_finder.py first.")
            sys.exit(1)
        gaps = json.loads(GAPS_JSON.read_text(encoding="utf-8"))
        for row in gaps[: args.top]:
            p = write_workflow(row["a"], row["b"], args.out_dir)
            written.append(p)
    elif len(args.pair) == 2:
        p = write_workflow(args.pair[0], args.pair[1], args.out_dir)
        written.append(p)
    else:
        ap.print_help()
        sys.exit(1)

    for p in written:
        print(f"Wrote {p}/")
    print(f"\n{len(written)} workflow(s) generated in {args.out_dir}")
    print("\nNext steps per workflow:")
    print("  1. Execute search strategy (01_search_strategy.md)")
    print("  2. Fill in 02_evidence.json — one entry per source")
    print("  3. Write draft (03_draft.md) with [strength, S#] tags")
    print("  4. Run adversarial review (04_adversarial.md)")
    print("  5. Score with GRADE (05_grade_scoring.md)")
    print("  6. Validate: python tools/interaction_workflow_validate.py <pair>")
    print("  7. Ship decision (06_decision.md)")


if __name__ == "__main__":
    main()
