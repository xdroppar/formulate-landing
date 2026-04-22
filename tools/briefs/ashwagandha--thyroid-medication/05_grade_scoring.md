# Stage 5 — GRADE-Style Evidence Scoring

Pair: **ashwagandha** + **thyroid medication**

## Starting confidence tier

Evidence base is mixed:
- 2 RCTs (S2 Gannon 2014 N=60 bipolar; S3 Sharma 2018 N=50 subclinical hypothyroid) → start **HIGH** for the thyroid-stimulation claim
- 1 case report (S1) + 1 monograph (S4) → start **LOW** for the co-administration claim

Apply downgrades per claim, not per pair.

## Claim C1 — "Ashwagandha stimulates thyroid output (raises T3/T4, lowers TSH)"

Starting tier: **HIGH** (RCT-supported)

| Factor | Question | Answer | Downgrade? |
|---|---|---|---|
| Risk of bias | Adequate randomization/blinding in S2 and S3? | Both double-blind placebo-controlled. S2 was exploratory for thyroid endpoint. S3 thyroid was primary endpoint, adequate blinding. | No downgrade |
| Inconsistency | Different effect estimates across studies? | S3 statistically significant; S2 trend-only (not significant). Langade safety study (healthy) showed no effect. Heterogeneity is EXPLAINED by baseline thyroid state — not unexplained inconsistency. | No downgrade (explained heterogeneity) |
| Indirectness | Direct evidence on thyroid output in humans? | Yes — both RCTs directly measured TSH, T3, T4 in humans. | No downgrade |
| Imprecision | Wide CIs, small N? | S3 N=50 showed tight p-values; S2 N=3 active-arm thyroid subset is imprecise. S3 alone passes; S2 adds directionality. | 1 downgrade (imprecision at the combined-evidence level, driven by S2 small N) |
| Publication bias | Research concentration? | Two independent research groups, different populations, different extracts. Low concentration. | No downgrade |

**Final confidence for C1: MODERATE**

## Claim C2 — "Co-administration with levothyroxine can cause thyrotoxicosis"

Starting tier: **LOW** (observational/case-report evidence)

| Factor | Question | Answer | Up/Downgrade? |
|---|---|---|---|
| Risk of bias | Case reports by definition have no internal comparison. | High bias, acknowledged. | Starting tier accounts for this |
| Indirectness | Is S1 patient on levothyroxine? | NO — she was OFF it for 2 years. Case is "ashwagandha alone in prior-thyroid-disease patient." | 1 downgrade for indirectness |
| Plausible mechanism | Is additive thyroid stimulation mechanistically plausible? | Yes — if ashwagandha raises endogenous T4 and levothyroxine adds exogenous T4, sum effect is expected. | Plausibility does not upgrade observational evidence in GRADE without dose-response. |
| Dose-response | Is there a clear dose-response gradient? | Only 1 case report with unspecified dose. No gradient available. | No upgrade |
| Large effect | RR > 2 or < 0.5? | Not calculable from n=1. | No upgrade |

**Final confidence for C2: VERY LOW**

## Claim C3 — "Patients should retest thyroid function 4–8 weeks after adding ashwagandha"

This is a derived recommendation, not a standalone claim. Confidence inherits from C1 + C2.

- C1 MODERATE justifies the retest recommendation (thyroid output demonstrably shifts at 8-week mark)
- C2 VERY LOW justifies the urgency in patients on thyroid medication specifically
- **Practical recommendation strength**: moderate — based on mechanistic inference + demonstrated biochemical effect

**Final confidence for C3: MODERATE** (as a clinical recommendation, not a mechanistic claim)

## Severity-vs-confidence matrix check

Proposed severity: **WARNING**
Required confidence per matrix: MODERATE+

- C1 at MODERATE: meets WARNING bar
- C2 at VERY LOW: does NOT meet WARNING bar
- C3 at MODERATE: meets WARNING bar

**Can we ship at WARNING?** Yes, but with caveats:
- The WARNING is built primarily on C1 (demonstrated thyroid stimulation) + C3 (monitoring recommendation). Both MODERATE.
- The dramatic case-report framing (C2) is supporting color, not the load-bearing evidence. Draft treats it that way correctly.
- If C2 were the only evidence, we'd be stuck at CAUTION. But C1 alone justifies WARNING.

**Could we ship at DANGER?** No. DANGER requires MODERATE+ confidence AND physician sign-off. C1 reaches MODERATE, but:
- No direct co-administration RCT
- All case reports resolved on discontinuation
- No documented non-reversible harm

**Final confidence tier for ship decision**: MODERATE

## Ship matrix result

| Severity | Required confidence | Our confidence | Ship? |
|---|---|---|---|
| DANGER | MODERATE+ AND physician sign-off | MODERATE, no physician sign-off yet | NO |
| **WARNING** | **MODERATE+** | **MODERATE** | **YES** (matches) |
| CAUTION | LOW+ | MODERATE | Too cautious (understates evidence) |
| SYNERGY | LOW+ | N/A — not synergistic | N/A |
| INFO | VERY LOW OK | MODERATE | Too cautious |

**GRADE-scored final severity: WARNING**

This matches the draft's proposed severity. Proceed to Stage 6.
