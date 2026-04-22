# Stage 4 — Adversarial Review

Pair: **ashwagandha** + **thyroid medication**

Reviewer: Claude, acting as skeptical internal reviewer. Job is to falsify, not agree.

## 1. Source substitution attack

For every [strength, S#] tag in the draft, does the cited source actually support the specific claim?

| Claim | Tag | Supporting sentence from source | Verdict |
|---|---|---|---|
| Ashwagandha stimulates thyroid output, raising T3/T4 and lowering TSH | [moderate, S3] | S3 abstract: "Treatment with ashwagandha may be beneficial for normalizing thyroid indices." TSH p<0.001, T3 p=0.0031, T4 p=0.0096. | **SUPPORTED** |
| 600 mg/day, 8 weeks, subclinical hypothyroid, TSH/T3/T4 p-values | [moderate, S3] | All values in source. | **SUPPORTED** |
| 500 mg/day in bipolar patients, T4 rose 7/12.1/23.7% in 3 patients | [weak, S2] | S2 reports these exact numbers but also that between-group difference was NOT significant. Draft correctly flags this. | **SUPPORTED WITH CAVEAT** (kept as weak, not moderate) |
| MSK says ashwagandha "may increase thyroxine levels" | [moderate, S4] | Direct quote from MSK monograph. | **SUPPORTED** |
| Case report patient details (73F, prior hypothyroid, 2-year use, TSH <0.01, SVT, resolved on cessation) | [weak, S1] | All details present in S1. | **SUPPORTED** |
| "Exogenous T3/T4 contamination" as alternative mechanism | [weak, S1] | S1 authors explicitly raise this possibility. | **SUPPORTED** |
| "Mechanism not fully established in human literature" | (absent-level) | Consistent with S1 authors' hedging and absence of any direct mechanistic RCT. | **SUPPORTED** |

Verdict: no UNSUPPORTED claims. All tags stand.

## 2. Directness attack

Is the evidence directly about ashwagandha + thyroid medication in the population we're advising (patients on levothyroxine)?

- **S2, S3**: ashwagandha alone in NON-medicated populations. The interaction claim is an INFERENCE — if ashwagandha raises T4 in untreated patients, adding it to exogenous T4 should be additive. This is plausible but not directly tested.
- **S1**: patient had been OFF levothyroxine for 2 years. So even the case report isn't strict co-administration — it's ashwagandha in a patient with prior thyroid disease.
- **S4**: monograph is a synthesis, not a primary source.

**Directness downgrade applied?** The draft already labels the co-administration claim (C2) as [weak], which is the correct directness-adjusted strength. The general thyroid-stimulation claim (C1) stays [moderate] because S2 and S3 directly test it in humans. Directness attack survived.

## 3. Contradiction search

Active search for contradicting evidence performed:

- **Langade 2020 (not fetched as primary source, cited in contradictions)**: 80 healthy volunteers, 300 mg BID x 8 weeks, NO significant thyroid changes. This CONTRADICTS a universal "ashwagandha raises thyroid hormones in everyone" claim — but supports the refined claim that effect magnitude depends on baseline thyroid state. Draft correctly narrows the mechanism claim to subclinical hypothyroid + bipolar populations.
- **No RCT found that shows ashwagandha LOWERS thyroid hormones or that demonstrated harm from co-administration with levothyroxine**.
- **Unresolved contradiction**: whether the effect in S2 was real (consistent direction) or noise (not statistically significant). Draft handles this by tagging the S2 claim as [weak] and not generalizing from it.

No attack survives that would force a severity change. Contradictions are disclosed in `02_evidence.json > contradictions`.

## 4. Dose + population attack

- **Population over-extension**: Does the draft claim apply to "everyone on thyroid medication"? The supporting evidence is in subclinical hypothyroid (untreated) and bipolar patients. The draft extrapolates to medicated populations. **Downgrade**: the extrapolation is acknowledged in the "What we don't know" section. Defensible. If the user's attorney wanted belt-and-suspenders language, we'd soften to "may potentiate" rather than "can produce thyrotoxicosis."
- **Dose under-specification**: Draft specifies 500–600 mg/day from S2/S3. Below 500 mg/day effects are uncertain. This IS specified. Passes.

## 5. Severity mis-tagging attack

Original entry: DANGER. Draft: WARNING.

- Is DANGER defensible? DANGER requires documented non-reversible harm or emergency presentations with significant morbidity. Supraventricular tachycardia in S1 is serious but resolved on discontinuation without lasting damage. No documented deaths in literature. No documented non-reversible harm.
- Is WARNING defensible? WARNING = "meaningful clinical impact, mitigatable with timing/dose/monitoring." Thyrotoxicosis is meaningful. Monitoring + discontinuation mitigates. Fits.
- Is CAUTION defensible? CAUTION = "theoretical or mild effect, timing-dependent." The effect is demonstrated, not theoretical. Not mild (can cause SVT). Does NOT fit.

**Verdict**: WARNING is the correct call. Downgrade from DANGER is justified. Upgrade to DANGER requires direct co-administration RCT with harm signal or non-reversible case.

## 6. Timing-advice plausibility

Draft says timing-based separation does NOT help. Is this evidence-based?

- Levothyroxine absorption is disrupted by things like calcium, iron, coffee — all via gut absorption competition, where timing WOULD help.
- Ashwagandha's thyroid effect is NOT via absorption interference — it's endocrine stimulation over weeks. No timing manipulation can change that.
- Therefore "timing does not apply" is mechanistically correct, not a round-number guess. **SUPPORTED**.

## 7. Publication-bias probe

- S2: Gannon et al, University of Pittsburgh, in Journal of Ayurveda and Integrative Medicine. Partial industry funding check not done. Moderate risk.
- S3: Sharma, Basu, Singh — appears to be independent academic authorship. Published in J Altern Complement Med — lower-impact but peer-reviewed.
- S4: MSK is a major academic medical center, independent monograph.
- S1: Case report, independent clinicians.
- **Single-research-group risk?** S2 and S3 are from different groups. Case reports are from different clinicians. Not concentrated.
- **Industry-funding concentration?** S2 used Sensoril (branded extract); S3 did not specify branding clearly. Some risk.

**Impact**: keeps S2 at [weak] (which we already did due to non-significance). S3 stays [moderate]. No downgrade forced.

## 8. Retraction check

PubMed retraction filter check:
- S2 (PMID 25624699): not retracted as of 2026-04-21
- S3 (PMID 28829155): not retracted as of 2026-04-21
- S1 (DOI 10.7759/cureus.23325): Cureus, not retracted
- S4 (MSK): living monograph, not applicable

## Stage 4 summary

**Claims surviving**: all 3 (C1, C2, C3)
**Claims dropped**: none
**Claims softened**: S2-based claim stays at [weak] as originally tagged
**Severity change from original entry**: DANGER → WARNING (downgrade)
**New contradictions added to 02_evidence.json**: yes (healthy-adult safety study)

Ready for Stage 5 (GRADE scoring).
