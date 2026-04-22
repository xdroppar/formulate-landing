# Stage 5 — GRADE-Style Evidence Scoring

Pair: **Blood thinners** + **Ginkgo biloba**

## Starting confidence tier

Mixed evidence:
- 2 large observational studies (S1 positive signal, S2 mixed/negative for warfarin)
- 1 RCT (S3 null at 4 weeks)
- 1 systematic review (S4 skeptical)

For the bleeding-risk claims (C1, C2): start at **LOW** (observational + conflicting)
For the mechanism claim (C3): start at **MODERATE** (pharmacology)
For the precautionary recommendation (C4): inherits from C1-C3

## Claim C1 — "Ginkgo + warfarin associated with modestly increased bleeding"

Starting: **LOW** (observational)

| Factor | Answer | Up/Downgrade? |
|---|---|---|
| Risk of bias | EMR-based, adjusted for comorbidities, but residual confounding likely. | Default observational bias accounted for in starting tier |
| Inconsistency | S1 finds HR 1.38, S2 finds null. Major unexplained heterogeneity. | -1 inconsistency |
| Indirectness | Direct — both studies use real warfarin patients on real ginkgo. | No |
| Imprecision | S1 tight CI, S2 also powered, but contradictory. | No (precision isn't the issue; replication is) |
| Large effect | HR 1.38 is modest, not large. | No upgrade |

**Final confidence for C1: VERY LOW** (started LOW, downgraded 1 for inconsistency)

## Claim C2 — "Ginkgo + aspirin/clopidogrel associated with modest bleeding signal"

Starting: **LOW** (observational)

| Factor | Answer | Up/Downgrade? |
|---|---|---|
| Consistency with RCT | S3 RCT found NO effect of ginkgo + aspirin at testable doses. | -1 inconsistency |
| Indirectness | Direct — S2 and S3 address the pair. | No |
| Large effect | OR 1.10-1.12 is small. | No upgrade |

**Final confidence for C2: VERY LOW**

## Claim C3 — "Ginkgolide B is a PAF antagonist"

Starting: **MODERATE** (well-established pharmacology)

| Factor | Answer | Downgrade? |
|---|---|---|
| Risk of bias | Basic pharmacology, well-replicated. | No |
| Directness | Direct mechanism claim. | No |
| Translational uncertainty | Effect in vitro ≠ effect in vivo at human doses. | -1 indirectness to clinical claims |

**Final confidence for C3 (as mechanistic claim): MODERATE**
**Final confidence for C3 (as clinical-relevance claim): LOW**

Draft only uses C3 as a mechanism explanation, not a clinical predictor. Correct usage.

## Claim C4 — "Don't self-start; monitor; 5-7 day pre-surgery hold"

Precautionary recommendation. Strength is about risk-management, not evidence density.
- Given VERY LOW confidence in direct bleeding harm and MODERATE confidence in mechanism, a precautionary recommendation is defensible even with weak primary evidence.
- Pre-surgery hold (5-7 days) is standard pre-anesthesia guidance, widely adopted.

**Final confidence for C4: MODERATE** (as a risk-management recommendation)

## Severity-vs-confidence matrix check

Proposed severity: **WARNING**
Required: MODERATE+

- C1 at VERY LOW
- C2 at VERY LOW
- C3 at MODERATE (mechanism)
- C4 at MODERATE (recommendation)

**Can we ship at WARNING?** Borderline. The primary clinical claims (C1, C2) are at VERY LOW. The recommendation (C4) is at MODERATE by virtue of being a risk-management call, not a clinical prediction. The mechanism (C3) is at MODERATE.

**Can we ship at CAUTION?** CAUTION requires LOW+ confidence and fits when effect is "theoretical or mild, timing-dependent." Here the effect is documented in large observational data (S1) but not reliably reproduced. The population-level signal argues against purely CAUTION.

**Decision**: WARNING, with the caveat that the WARNING is precautionary (based on C4 + C3) rather than evidence-certain (C1/C2 are VERY LOW).

**Alternative**: split to CAUTION for the clinical-bleeding claim and WARNING for the pre-surgery-hold recommendation. This would require the INTERACTIONS schema to support claim-level severity, which it doesn't. Keeping WARNING as the single label and being honest in the `details` text about evidence mixedness is the pragmatic call.

## Ship matrix

| Severity | Required confidence | Ours | Ship? |
|---|---|---|---|
| DANGER | MODERATE+ AND sign-off | VERY LOW clinical, MODERATE mechanism | **NO** — overstates evidence |
| **WARNING** | **MODERATE+** | **MODERATE (recommendation level)** | **YES, but with physician sign-off** |
| CAUTION | LOW+ | VERY LOW clinical → does meet LOW+ by upgrade | Acceptable but understates pre-surgery risk |

**GRADE-scored final severity: WARNING**

Physician review should focus on: (a) whether WARNING or CAUTION is the better fit, (b) whether DOAC extrapolation is appropriate, (c) whether the 5-7 day pre-surgery hold is the standard they'd endorse.
