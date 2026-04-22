# Stage 5 — GRADE-Style Evidence Scoring

Pair: **SSRI** + **St John's wort**

## Starting confidence tier

Evidence base:
- No RCT of direct co-administration (unethical to run)
- 3 expert reviews converging on same recommendation (S1, S2, S3)
- Multiple case reports of serotonin syndrome (catalogued in S1, S3)
- Clear mechanism (shared serotonergic pathway)

For serotonin-syndrome-risk claim: start at **LOW** (observational + mechanism)
For "do not combine" recommendation: start at **LOW**

## Claim C1 — "SJW + SSRI causes serotonin syndrome"

Starting tier: **LOW** (observational case reports)

| Factor | Answer | Downgrade/upgrade? |
|---|---|---|
| Risk of bias | Case reports have selection + recall bias. | Starting tier accounts for it. |
| Indirectness | Directly about SJW + SSRIs. | No change |
| Large effect | Case reports show syndromes at standard therapeutic doses — not trivial doses needed. The effect magnitude is large (hyperthermia, seizures, death). | +1 upgrade for large effect |
| Dose-response | Reports span the full dose range of both agents. Hard to call it dose-response in the traditional sense, but severity correlates with total serotonergic load. | +1 upgrade for dose-response |
| Plausible confounders | Confounders (e.g. other serotonergic drugs, sepsis, stimulants) bias AGAINST attribution. That syndromes still get attributed to SJW+SSRI after confounder exclusion strengthens the case. | +1 upgrade |

**Final confidence for C1: MODERATE** (started LOW, upgraded for large effect and dose-response across reports and confounder-resistant attribution)

## Claim C2 — "Mechanism is additive serotonergic activity, low-hyperforin doesn't help"

Starting tier: **MODERATE** (pharmacology + expert review)

| Factor | Answer | Downgrade? |
|---|---|---|
| Risk of bias | Mechanistic studies + expert synthesis. Reasonable. | No |
| Indirectness | Directly addresses the pair. | No |
| Imprecision | Effect sizes not quantified in reviews, but pharmacodynamic reasoning is well-established. | No |

**Final confidence for C2: MODERATE**

## Claim C3 — "Do not combine"

Recommendation inherits from C1 + C2 confidence. Three independent expert sources converge on the same "do not combine" recommendation, with no dissenting expert voice. Recommendation strength is high.

**Final confidence for C3: MODERATE**

## Severity-vs-confidence matrix check

Proposed severity: **DANGER**
Required confidence: MODERATE+ AND physician sign-off

- C1 at MODERATE: meets bar
- C2 at MODERATE: meets bar
- C3 at MODERATE: meets bar
- Physician sign-off: NOT YET

**Ship gate status**: Evidence supports DANGER. Physician sign-off required before ship.

## Ship matrix result

| Severity | Required confidence | Ours | Ship? |
|---|---|---|---|
| **DANGER** | **MODERATE+ AND physician sign-off** | MODERATE, pending sign-off | **HOLD for review** |
| WARNING | MODERATE+ | MODERATE | Would ship — but understates severity |
| CAUTION | LOW+ | MODERATE | Severely understates |

**GRADE-scored final severity: DANGER**

Do not downgrade to WARNING. The non-reversible-harm bar is met by documented serotonin-syndrome fatalities in the broader serotonergic-combination literature; mechanism + case reports support the pair-specific claim.
