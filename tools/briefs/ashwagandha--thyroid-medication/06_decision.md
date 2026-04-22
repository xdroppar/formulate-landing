# Stage 6 — Ship Decision

Pair: **ashwagandha** + **thyroid medication**

## Pre-ship checklist

- [x] `02_evidence.json` is fully populated (no `null` in required fields)
- [x] Every claim in `03_draft.md` has a `[strength, S#]` tag
- [x] Every claim has >= 2 supporting sources
- [x] No retracted sources remain (all 4 sources checked 2026-04-21)
- [x] `04_adversarial.md` attacks were all answered; no claims failed
- [x] `05_grade_scoring.md` final confidence tier (MODERATE) meets the severity bar (WARNING requires MODERATE+)
- [x] `details` field is 400-800 words (~650)
- [x] `summary` field is <= 120 chars ("Ashwagandha can raise thyroid hormone levels and stack additively with levothyroxine, risking thyrotoxicosis." = 113 chars)
- [x] `recommendation` is specific and actionable (4-8 week retest, specific symptoms to watch, stop criteria)
- [x] Populations studied are explicit; unstudied populations (pregnancy, pediatrics, direct co-administration) are flagged
- [x] Dose threshold is given (500-600 mg/day from S2/S3; <500 mg/day uncertain)
- [x] `last_reviewed` date is set (2026-04-21); `re_review_due` is 12 months out (2027-04-21)

## Physician/pharmacist sign-off (required for DANGER and WARNING)

- [ ] Reviewed by: **REQUIRED BEFORE SHIP** — recommend endocrinologist or pharmacist
- [ ] Date: ______________________
- [ ] Notes: ______________________

**Current status**: physician sign-off NOT YET OBTAINED. This workflow is ready for review but not ready to ship.

## Validator output

```
$ python tools/interaction_workflow_validate.py ashwagandha--thyroid-medication

[OK] ashwagandha--thyroid-medication

1/1 workflows pass.
```

Zero errors, zero warnings.

## Severity change from original entry

Original `INTERACTIONS` entry:
```python
Interaction(
    substance_a="ashwagandha",
    substance_b="thyroid medication",
    severity=InteractionSeverity.DANGER,
    interaction_type=InteractionType.MEDICATION,
    summary="...",
    details="<14 words>",
    ...
    sources=["<vague>"],
)
```

Proposed replacement (this workflow):
- Severity: **DANGER → WARNING** (downgrade, justified in adversarial review + GRADE)
- Details: 14 words → ~650 words with 7 `[strength, S#]` tags
- Sources: 1 vague → 4 specific (2 RCTs, 1 case report, 1 major-center monograph)

## Final decision

- [ ] **SHIP** — add to `Formulate/app/services/interaction_service.py`
- [x] **HOLD for physician review** — everything else is complete. Recommend: any MD or PharmD with endocrinology context, 15-min review of `03_draft.md` and `02_evidence.json`.
- [ ] **REVISE** — N/A
- [ ] **BLOCK** — N/A

## Physician review prompt (paste this to reviewer)

> I'm updating the ashwagandha × thyroid-medication interaction page for a public supplement-interaction checker. The evidence base is:
> - 2 RCTs (Sharma 2018 in subclinical hypothyroid N=50; Gannon 2014 in bipolar N=60) showing ashwagandha-only thyroid stimulation
> - 1 Cureus 2022 case report of thyrotoxicosis on long-term ashwagandha in a patient with prior (discontinued) levothyroxine therapy
> - MSK Integrative Medicine monograph
>
> Proposed severity: WARNING (was DANGER in prior version). Proposed advice: 4-8 week retest of TSH/free T4, symptom-watch for thyrotoxicosis, stop if symptomatic.
>
> Questions: (1) Is WARNING the right severity, or should DANGER be retained? (2) Is "retest at 4-8 weeks" the right monitoring interval? (3) Any population we should highlight that we haven't? Draft attached.

## If SHIPPING (after physician sign-off): exact Python entry

```python
Interaction(
    substance_a="ashwagandha",
    substance_b="thyroid medication",
    severity=InteractionSeverity.WARNING,
    interaction_type=InteractionType.POTENTIATION,
    summary="Ashwagandha can raise thyroid hormone levels and stack additively with levothyroxine, risking thyrotoxicosis.",
    details=(
        "Ashwagandha (Withania somnifera) stimulates thyroid output in humans at "
        "500-600 mg/day over 8 weeks, raising T3 and T4 and lowering TSH. In a "
        "double-blind RCT of 50 subclinical hypothyroid patients (Sharma 2018), "
        "ashwagandha 600 mg/day significantly lowered TSH (p<0.001) and raised "
        "T3 (p=0.0031) and T4 (p=0.0096) versus placebo. In bipolar patients "
        "at 500 mg/day (Gannon 2014), free T4 rose by 7-24% in three treated "
        "patients, though the between-group difference was not statistically "
        "significant. The effect appears to depend on baseline thyroid state: "
        "a separate safety RCT in healthy adults at 300 mg twice daily found no "
        "significant thyroid change. No RCT has directly co-administered "
        "ashwagandha with levothyroxine. A 2022 case report (Cureus) documented "
        "thyrotoxicosis with supraventricular tachycardia in a 73-year-old "
        "woman after two years of daily ashwagandha; the authors flagged either "
        "glandular stimulation or possible exogenous T3/T4 contamination of the "
        "supplement. Memorial Sloan Kettering's monograph notes ashwagandha "
        "'may increase thyroxine levels' and catalogs multiple thyrotoxicosis "
        "case reports. For a patient on stable levothyroxine, the plausible "
        "effect size (7-24% T4 rise) is large enough to move a well-titrated "
        "patient into a suppressed-TSH range. Timing-based workarounds do not "
        "help — the effect is endocrine over weeks, not absorption-based. "
        "Populations to watch: anyone on thyroid hormone replacement or "
        "antithyroid drugs, anyone with a history of thyroid disease even if "
        "off medication, and pregnancy/pediatrics (not studied, avoid)."
    ),
    recommendation=(
        "If you take levothyroxine or any thyroid medication, consult your "
        "prescribing clinician before adding ashwagandha. If you proceed, "
        "retest TSH and free T4 within 4-8 weeks of starting, and again with "
        "any dose or brand change. Watch for palpitations, unintentional "
        "weight loss, heat intolerance, or anxiety; these suggest the "
        "combination has pushed you toward hyperthyroidism. Stop ashwagandha "
        "and retest if they appear."
    ),
    timing_advice=(
        "Spacing the doses does not mitigate this interaction — the effect is "
        "on thyroid output over weeks, not on absorption. Monitor thyroid "
        "labs instead."
    ),
    sources=[
        "PMID:28829155 — Sharma AK, Basu I, Singh S. Efficacy and Safety of Ashwagandha Root Extract in Subclinical Hypothyroid Patients. J Altern Complement Med 2018;24(3):243-248.",
        "PMID:25624699 — Gannon JM, Forrest PE, Chengappa KNR. Subtle changes in thyroid indices during a placebo-controlled study of an extract of Withania somnifera. J Ayurveda Integr Med 2014.",
        "DOI:10.7759/cureus.23325 — Kamal et al. Ashwagandha as a Unique Cause of Thyrotoxicosis Presenting with Supraventricular Tachycardia. Cureus 2022.",
        "https://www.mskcc.org/cancer-care/integrative-medicine/herbs/ashwagandha — Memorial Sloan Kettering Integrative Medicine Monograph",
    ],
    mechanism=(
        "Ashwagandha appears to stimulate thyroid output, raising circulating "
        "T3 and T4 and lowering TSH. The effect was clearly demonstrated in "
        "subclinical hypothyroid patients at 600 mg/day over 8 weeks (Sharma "
        "2018, RCT): TSH fell (p<0.001), T3 rose (p=0.0031), T4 rose (p=0.0096). "
        "The biochemical mechanism is not fully established — authors of the "
        "2022 case report flagged both direct glandular stimulation and possible "
        "exogenous T3/T4 contamination of the supplement itself."
    ),
    evidence_quality="moderate",
    populations=[
        "Patients on levothyroxine or liothyronine — highest concern; direct additive effect on circulating thyroid hormone.",
        "Patients on antithyroid medication (methimazole, propylthiouracil) — ashwagandha works against the medication.",
        "Patients with prior thyroid disease, even off medication — the 2022 case was a patient off levothyroxine for 2 years.",
        "Pregnancy and pediatrics — not studied; combined with other ashwagandha safety concerns, avoid.",
    ],
    what_we_dont_know=(
        "No human RCT has tested direct co-administration of ashwagandha with "
        "levothyroxine. Dose-response below 500 mg/day is uncertain. Whether "
        "supplement contamination with exogenous T3/T4 contributes to "
        "case-report presentations is unresolved."
    ),
    severity_rationale=(
        "WARNING, not DANGER: the effect is RCT-demonstrated but gradual and "
        "monitorable, all documented thyrotoxicosis resolved on discontinuation, "
        "and no RCT directly tests co-administration. DANGER would require "
        "documented non-reversible harm."
    ),
)
```

After physician sign-off + merge, regenerate exports:

```
python tools/export_interactions.py
```
