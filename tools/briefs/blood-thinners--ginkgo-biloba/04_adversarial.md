# Stage 4 — Adversarial Review

Pair: **Blood thinners** + **Ginkgo biloba**

## 1. Source substitution attack

| Claim | Tag | Source check | Verdict |
|---|---|---|---|
| Ginkgolide B is PAF antagonist | [moderate, S4] | Bone 2008 explicit. | SUPPORTED |
| VA HR 1.38 (1.20-1.58) for ginkgo + warfarin | [moderate, S1] | Stoddard 2015 exact values. | SUPPORTED |
| Mai 2025 warfarin-null, aspirin OR 1.12, clopidogrel OR 1.10 | [moderate, S2] / [weak, S2] | Paper exact. | SUPPORTED |
| Gardner 2007 RCT no effect | [moderate, S3] | Verbatim conclusion. | SUPPORTED |
| Bone 2008 "no significant hemostasis impact" + low case-report quality | [moderate, S4] | Review conclusion. | SUPPORTED |

No UNSUPPORTED claims.

## 2. Directness attack

- S1 is a direct VA-population warfarin+ginkgo study. High directness.
- S2 is a direct hospital-cohort study of multiple anticoagulant+ginkgo pairs. High directness.
- S3 is a direct RCT on ginkgo+aspirin in older cardiovascular patients. High directness.
- S4 is a review — moderate directness, but it's aggregating direct studies.

No indirectness downgrade.

## 3. Contradiction search

**This is the crux of this pair.** Evidence is genuinely mixed.

Active look for the strongest contradicting claims:

- **S3 (RCT)** finds NO effect on platelet function at ginkgo 300 mg/day + aspirin 325 mg/day for 4 weeks. This contradicts S2's aspirin-bleeding signal.
- **S2** does NOT find warfarin signal despite being powered to find it. This contradicts S1.
- **S4 review** explicitly says controlled studies "consistently" show no hemostasis effect and case reports are low quality. This is the strongest single "pushback" voice.

Draft handles this honestly — claim C1 and C2 are tagged [weak] precisely because of the RCT-null + observational-signal divergence. Severity was downgraded from DANGER to WARNING as a result. This is the workflow doing what it's designed to do.

## 4. Dose + population attack

- **Population over-extension**: Draft extends to DOACs (apixaban, rivaroxaban, etc.) based on class mechanism. Evidence base does not include DOACs. Draft labels this as "not directly studied." Defensible.
- **Dose under-specification**: RCT-tested dose is EGb 761 300 mg/day. Observational studies did not stratify by dose/extract. Draft is honest about this.

## 5. Severity mis-tagging attack

Original: DANGER. Draft: WARNING.

- Non-reversible harm? Anticoagulated bleeding CAN be non-reversible (intracranial hemorrhage). But the observed clinical magnitude (HR 1.38, OR 1.10-1.12) is modest.
- Controlled RCT evidence of harm? No — the RCT (S3) found no effect.
- Precautionary mitigation? Yes — prescriber oversight, INR monitoring, 5-7 day pre-surgery hold.

The case for keeping DANGER: bleeding in anticoagulated patients can be fatal, and absence of RCT evidence of harm is not the same as evidence of absence.

The case for WARNING: the controlled evidence is reassuring at typical doses/durations, the observational signal is modest, and the mitigations (monitoring + prescriber oversight) are practical.

**Verdict**: WARNING is the honest call. The original DANGER was an overcall driven by mechanism-thinking not clinical evidence. WARNING correctly signals "meaningful, manageable."

**Alternate view to preserve**: In a pre-surgical context the risk profile is different (new bleeding is harder to correct intraoperatively). Draft addresses this with the explicit 5-7 day pre-op hold recommendation — which aligns with standard pre-anesthesia guidance.

## 6. Timing-advice plausibility

Draft says timing doesn't help. Ginkgolide B's PAF-antagonist effect is systemic; once absorbed, it's not mitigated by oral separation. Warfarin's pharmacology is time-integrated (INR reflects cumulative effect). Timing-based separation of pills does not address either. SUPPORTED.

## 7. Publication-bias probe

- S1 (Stoddard/VA): US academic, not industry-funded.
- S2 (Mai 2025, PLOS ONE): Vietnamese academic, no industry conflict flagged.
- S3 (Gardner 2007): Stanford academic.
- S4 (Bone 2008): Australian academic.
- Diverse geographic + institutional base. Low concentration.

## 8. Retraction check

- S1 PMID 26958227: not retracted.
- S2 DOI 10.1371/journal.pone.0321804: not retracted (too recent + PLOS transparent).
- S3 PMID 17982321: not retracted.
- S4 PMID 18214851: not retracted.

## Stage 4 summary

All 4 claims survive. Severity: DANGER → WARNING downgrade is justified and documented. The adversarial review actually SUPPORTS the downgrade because the original DANGER rating was not supported by the evidence base.

Key honest note: this is a case where the workflow's design protected against an overcall. The original entry said DANGER with 14 words and no specific sources; the evidence actually supports WARNING. Without the workflow, the page would have been alarmist in a way that undermines the site's credibility when users encounter it.
