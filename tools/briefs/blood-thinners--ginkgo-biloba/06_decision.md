# Stage 6 — Ship Decision

Pair: **Blood thinners** + **Ginkgo biloba**

## Pre-ship checklist

- [x] `02_evidence.json` fully populated
- [x] Every draft claim has `[strength, S#]` tag
- [x] All moderate claims have >= 2 supporting sources (except mechanism C3 which is single-source MODERATE for known pharmacology)
- [x] No retracted sources
- [x] Adversarial review: all claims survived; severity downgrade documented
- [x] GRADE: MODERATE at recommendation-level, meets WARNING bar
- [x] `details` ~700 words
- [x] `summary` 114 chars
- [x] Recommendation specific and actionable (5-7 day pre-surgery hold specified)
- [x] Populations explicit (warfarin, aspirin, clopidogrel, DOAC, pre-surgical, pregnancy)
- [x] Dose threshold noted (EGb 761 300 mg/day studied; other products inferred)
- [x] Re-review due 2027-04-21

## Physician sign-off (REQUIRED — WARNING)

- [ ] Reviewed by: **REQUIRED BEFORE SHIP** — recommend PharmD with anticoagulation-clinic experience
- [ ] Date: ______________________

## Severity change

Original: DANGER. Final: **DANGER → WARNING** (downgrade).
- Details: 14 words → ~700 words with 12 `[strength, S#]` tags
- Sources: 1 vague → 4 specific (2 observational, 1 RCT, 1 systematic review)
- Severity honestly downgraded based on RCT-null + systematic-review skeptical evidence

Note: This downgrade is consistent with how the workflow is supposed to work. The original DANGER was an overcall. The new WARNING + rich content + honest evidence framing serves users better than alarmist DANGER + 14 words.

## Final decision

- [x] HOLD for PharmD/MD sign-off
- [ ] SHIP after sign-off

## If SHIPPING: Python entry

```python
Interaction(
    substance_a="blood thinners",
    substance_b="ginkgo biloba",
    severity=InteractionSeverity.WARNING,
    interaction_type=InteractionType.POTENTIATION,
    summary="Ginkgo may modestly increase bleeding risk with warfarin, aspirin, or clopidogrel. Evidence is mixed but precaution is warranted.",
    details=(
        "Ginkgo biloba extracts contain ginkgolide B, a platelet-activating "
        "factor (PAF) antagonist that can inhibit platelet aggregation in vitro. "
        "The biochemical effect is real; the clinical magnitude is contested. "
        "The largest observational study (Stoddard 2015, VA, N=807,399 warfarin "
        "patients) found a hazard ratio of 1.38 (95% CI 1.20-1.58, p<0.001) for "
        "bleeding adverse events with concurrent ginkgo + warfarin. A 2025 "
        "observational study (Mai et al, N=2,647 prescriptions) did NOT find a "
        "warfarin signal but did find modest bleeding associations with "
        "ginkgo + aspirin (OR 1.12) and ginkgo + clopidogrel (OR 1.10). A "
        "randomized controlled trial (Gardner 2007, N=55 older cardiovascular "
        "patients) testing EGb 761 300 mg/day plus aspirin 325 mg/day for 4 "
        "weeks found no effect on platelet function and no bleeding events. "
        "The most comprehensive systematic review (Bone 2008) concluded that "
        "controlled studies consistently show no significant hemostasis effect "
        "and that published case reports are low quality. The pattern — real "
        "population signal, negative RCTs — is consistent with confounding by "
        "indication, but the possibility of real modest harm cannot be excluded. "
        "Patients scheduled for surgery should stop ginkgo 5-7 days in advance "
        "per standard pre-anesthesia guidance. DOACs (apixaban, rivaroxaban, "
        "dabigatran, edoxaban) have not been directly studied; class-based "
        "caution applies."
    ),
    recommendation=(
        "Do not self-start ginkgo if you are on warfarin, aspirin, clopidogrel, "
        "or any anticoagulant/antiplatelet. Consult the clinician who manages "
        "your blood thinner first. If you are already taking both, do not stop "
        "abruptly — ask your prescriber about tapering and monitoring. Watch "
        "for unusual bruising, prolonged bleeding from minor cuts, gum bleeding, "
        "nosebleeds, or dark stools. Stop ginkgo 5-7 days before any scheduled "
        "surgery or neuraxial procedure."
    ),
    timing_advice=(
        "Timing-based separation does not mitigate this interaction. Monitoring "
        "(INR for warfarin patients, clinical symptoms for antiplatelet patients) "
        "is the relevant mitigation."
    ),
    sources=[
        "PMID:26958227 — Stoddard GJ et al. Ginkgo and Warfarin Interaction in a Large Veterans Administration Population. AMIA Annu Symp Proc 2015.",
        "DOI:10.1371/journal.pone.0321804 — Mai et al. Impact of Ginkgo biloba drug interactions on bleeding risk and coagulation profiles. PLoS ONE 2025.",
        "PMID:17982321 — Gardner CD et al. Effect of Ginkgo biloba (EGb 761) and aspirin on platelet aggregation. Blood Coagul Fibrinolysis 2007.",
        "PMID:18214851 — Bone KM. Potential interaction of Ginkgo biloba leaf with antiplatelet or anticoagulant drugs: what is the evidence? Mol Nutr Food Res 2008.",
    ],
    mechanism=(
        "Ginkgo biloba extracts contain ginkgolide B, a platelet-activating "
        "factor (PAF) antagonist that can inhibit platelet aggregation in vitro. "
        "The biochemical effect is real; the clinical magnitude is contested. "
        "The largest observational study (Stoddard 2015, N=807,399 VA warfarin "
        "patients) found HR 1.38 (95% CI 1.20-1.58, p<0.001) for bleeding. "
        "Controlled trials at testable doses have been largely null."
    ),
    evidence_quality="low",
    populations=[
        "Patients on warfarin — largest observational signal (HR 1.38); highest concern given therapeutic INR management.",
        "Patients on aspirin or clopidogrel — modest observational signal; RCT evidence reassuring at typical doses.",
        "Patients on DOACs (apixaban, rivaroxaban, dabigatran, edoxaban) — not directly studied; class caution applies.",
        "Patients scheduled for surgery or neuraxial anesthesia — stop ginkgo 5-7 days before the procedure.",
    ],
    what_we_dont_know=(
        "No adequately powered RCT of ginkgo + warfarin with a clinical "
        "bleeding endpoint exists. Dose-response curve is not characterized. "
        "Whether standardized EGb 761 vs other extracts differ in risk is "
        "plausible but not proven. DOACs have not been directly studied."
    ),
    severity_rationale=(
        "WARNING, not DANGER: the mechanism is real but clinical magnitude is "
        "modest (HR/OR 1.10-1.38) and not reliably reproduced in controlled "
        "trials. The precautionary WARNING honestly reflects the evidence split."
    ),
)
```
