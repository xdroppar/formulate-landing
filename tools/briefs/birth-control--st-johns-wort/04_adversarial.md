# Stage 4 — Adversarial Review

Pair: **Birth control** + **St John's wort**

## 1. Source substitution attack

| Claim | Tag | Source check | Verdict |
|---|---|---|---|
| CYP3A4 + P-gp induction by hyperforin | [strong, S3] | Nicolussi 2020 states exactly this mechanism. | SUPPORTED |
| Breakthrough bleeding 6/17 → 13/17 → 15/17 at OC / OC+SJW BID / OC+SJW TID | [moderate, S1] | Pfrunder 2003 exact data. | SUPPORTED |
| 9 unintended pregnancies attributed to combination by 2001 | [moderate, S2] | Borrelli 2007 explicit. | SUPPORTED |
| Low-hyperforin products may not trigger PK interaction | [moderate, S3] | Nicolussi 2020 cites Will-Shahab 2009. | SUPPORTED |

All tags survive.

## 2. Directness attack

- S1 is a direct RCT in the advised population (healthy women on combined OC). Directness: HIGH.
- S2 is pharmacovigilance — real-world women on OCs. Directness: HIGH.
- S3 is mechanism + review. Directness: MODERATE (applies the mechanism to OC context).
- S4 is systematic review across multiple OC forms. Directness: HIGH for combined OCs, MODERATE for progestin-only/IUD extrapolation.

Draft already flags progestin-only/IUD extrapolation as "direct trial data sparse." No downgrade.

## 3. Contradiction search

- **Will-Shahab 2009 low-hyperforin finding**: could be read as contradicting the interaction claim. Resolution in draft: handled explicitly — hyperforin content moderates PK effect; retail products rarely disclose content; default assumption is interaction risk exists. This is a REFINEMENT, not a CONTRADICTION.
- **Any RCT showing SJW + OC is safe?**: None found. No contradicting RCT exists.
- **Any authority that recommends co-use?**: None found. All major bodies (FDA, EMA, WHO, CDC) list SJW as a contraceptive-effectiveness concern.

No contradiction forces downgrade.

## 4. Dose + population attack

- **Population over-extension**: Draft extends mechanism-based claim to progestin-only/IUD/emergency contraception. Evidence base is strongest for combined OCs, but CYP3A4 induction is class-general for hormonal contraceptives that depend on hepatic metabolism. Draft already flags the sparser direct data for non-combined methods. Defensible.
- **Dose under-specification**: Draft specifies 600-900 mg/day SJW from S1, and notes hyperforin content matters. Acceptable.

## 5. Severity mis-tagging attack

Original: DANGER. Draft: DANGER. Audit:
- Non-reversible harm? Unintended pregnancy. YES.
- Best evidence available? RCT-level (S1) + pharmacovigilance (S2, S4). Strongest tier of evidence for any supplement-drug interaction.
- Mitigation short of discontinuation? Backup contraceptive method mitigates pregnancy risk but does NOT mitigate breakthrough bleeding or the underlying metabolic interaction. Backup is a partial workaround, which argues for WARNING not DANGER.

**Consider downgrade to WARNING?** Backup contraception DOES mitigate the pregnancy outcome. That is closer to WARNING's "mitigatable with timing/dose/monitoring" definition. However:
- Most OC users don't know to use backup (the interaction exists precisely because users are unaware)
- Unintended pregnancy has a high population-level cost even if backup reduces individual risk
- Three separate case-series report actual pregnancies occurring despite the user being on OC

**Verdict**: DANGER holds. The warning is about preventing pregnancies that actually happened in the pharmacovigilance record, not about a theoretical risk mitigable with patient education.

## 6. Timing-advice plausibility

CYP3A4 induction via PXR-mediated transcription takes days to develop (new enzyme synthesis) and days to subside. Spacing doses by hours cannot change hepatic enzyme levels. Mechanistically sound. SUPPORTED.

## 7. Publication-bias probe

- S1 Pfrunder et al: University of Zurich. Independent academic.
- S2 Borrelli & Izzo: Italian academic.
- S3 Nicolussi et al: Swiss academic.
- S4 2024 systematic review: multiple authors.

No concentration. No industry funding concerns beyond standard.

## 8. Retraction check

- S1 PMID 12911359: not retracted (2026-04-21).
- S2 PMID 17486092: not retracted.
- S3 PMID 31943241: not retracted.
- S4 2024: too recent to be retracted.

## Stage 4 summary

All 4 claims survive. Severity holds at DANGER. Draft correctly handles the low-hyperforin refinement and the progestin-only extrapolation.
