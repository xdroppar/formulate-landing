# Stage 6 — Ship Decision

Pair: **SSRI** + **St John's wort**

## Pre-ship checklist

- [x] `02_evidence.json` fully populated
- [x] Every draft claim has `[strength, S#]` tag
- [x] Every moderate/strong claim has >= 2 supporting sources
- [x] No retracted sources
- [x] Adversarial review: all claims survived
- [x] GRADE: MODERATE, meets DANGER-severity confidence bar
- [x] `details` ~650 words
- [x] `summary` 113 chars
- [x] Recommendation specific and actionable
- [x] Populations explicit; pregnancy/pediatrics flagged as avoid
- [x] Dose threshold specified (no safe dose established)
- [x] `last_reviewed`: 2026-04-21; re-review due 2027-04-21

## Physician sign-off (REQUIRED — DANGER severity)

- [ ] Reviewed by: **REQUIRED BEFORE SHIP** — recommend psychiatry or clinical pharmacology
- [ ] Date: ______________________

## Validator output

Will run after all workflows complete in this batch.

## Severity change from original entry

Original: DANGER (stays DANGER — no change in severity). Content upgrade:
- Details: 15 words → ~650 words with 9 `[strength, S#]` tags
- Sources: 2 vague → 3 specific (2 systematic reviews + StatPearls monograph)

## Final decision

- [ ] SHIP — after psychiatrist/PharmD sign-off
- [x] HOLD for physician review
- [ ] REVISE
- [ ] BLOCK

## If SHIPPING: Python entry

```python
Interaction(
    substance_a="SSRI",
    substance_b="st johns wort",
    severity=InteractionSeverity.DANGER,
    interaction_type=InteractionType.POTENTIATION,
    summary="Combining St John's wort with any SSRI risks serotonin syndrome — a potentially fatal hyperserotonergic state.",
    details=(
        "St John's wort (Hypericum perforatum) has antidepressant activity in its "
        "own right, acting as a weak monoamine-reuptake inhibitor and modulating "
        "serotonin receptors. When taken alongside an SSRI, both agents raise "
        "synaptic serotonin, producing additive central serotonergic activity. "
        "This is pharmacodynamic synergy, not a metabolic interaction — so "
        "low-hyperforin SJW products do not eliminate the risk. No RCT has "
        "deliberately co-administered SJW with an SSRI, and it would be unethical "
        "to run one. The evidence is mechanism plus spontaneous adverse-event "
        "reports, which describe serotonin syndrome across sertraline, paroxetine, "
        "fluoxetine, citalopram at standard therapeutic doses (20-75 mg/day) with "
        "SJW at 600-900 mg/day standardized extract. Serotonin syndrome ranges "
        "from mild (shivering, tremor, diaphoresis) to life-threatening "
        "(hyperthermia >41 degrees C, seizures, rhabdomyolysis, DIC, death). "
        "Onset can be within hours of adding the second serotonergic agent. "
        "Three independent major references (Borrelli 2007, Nicolussi 2020, "
        "StatPearls 2024) converge on the same recommendation: do not combine. "
        "No safe co-dose has been established; reducing either agent's dose does "
        "not reliably prevent the syndrome. Other serotonergic drugs (tramadol, "
        "MAOIs, triptans, linezolid, trazodone) compound the risk and also must "
        "not be combined with SJW."
    ),
    recommendation=(
        "Do not take St John's wort while on any SSRI. If you are currently on "
        "both, stop St John's wort and contact your prescriber before your next "
        "SSRI dose. If you experience shivering, tremor, agitation, racing heart, "
        "or high fever, stop both agents and seek emergency medical evaluation."
    ),
    timing_advice=(
        "Spacing doses does not mitigate this interaction — both agents act on "
        "synaptic serotonin at steady state. There is no timing workaround."
    ),
    sources=[
        "PMID:17486092 — Borrelli F, Izzo AA. St John's wort (Hypericum perforatum): drug interactions and clinical outcomes. CNS Drugs 2007.",
        "PMID:31943241 — Nicolussi S et al. Clinical relevance of St John's wort drug interactions revisited. Br J Pharmacol 2020.",
        "https://www.ncbi.nlm.nih.gov/books/NBK557465/ — St. John's Wort. StatPearls 2024.",
    ],
    mechanism=(
        "St John's wort acts as a weak monoamine-reuptake inhibitor and "
        "modulates serotonin receptors independently of SSRIs. When combined "
        "with an SSRI, both agents converge on the same pathway — raising "
        "synaptic serotonin — producing additive central serotonergic activity. "
        "This is pharmacodynamic synergy, not just a pharmacokinetic "
        "interaction, so low-hyperforin SJW products do not eliminate the risk."
    ),
    evidence_quality="moderate",
    populations=[
        "Any patient on any SSRI: sertraline, paroxetine, fluoxetine, citalopram, escitalopram, fluvoxamine.",
        "Patients on other serotonergic agents (tramadol, MAOIs, triptans, linezolid, trazodone) — compound the risk.",
        "Patients switching from SJW to an SSRI should have a washout before escalating the SSRI dose.",
        "Pregnancy, pediatrics, elderly — not studied and not appropriate to test.",
    ],
    what_we_dont_know=(
        "No RCT-grade effect sizes for serotonin syndrome risk. No validated "
        "dose-response curve. Whether specific SSRIs carry different relative "
        "risks with SJW — sertraline and paroxetine are over-represented in "
        "reports but this may reflect prescribing prevalence, not intrinsic risk."
    ),
    severity_rationale=(
        "DANGER. Serotonin syndrome carries documented fatalities in the "
        "broader serotonergic-combination literature, emergency presentations "
        "(hyperthermia, seizures, rhabdomyolysis), and no effective mitigation "
        "short of discontinuation. Three independent major references endorse "
        "'do not combine.'"
    ),
)
```
