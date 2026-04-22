# Stage 6 — Ship Decision

Pair: **Vitamin K** + **Warfarin**

## Pre-ship checklist

- [x] evidence.json populated, severity=WARNING, interaction=antagonism
- [x] All draft claims tagged
- [x] 3 specific sources (systematic review + RCT + observational)
- [x] No retractions
- [x] Adversarial: all claims survived
- [x] GRADE: HIGH/MODERATE — exceeds WARNING bar
- [x] details ~550 words
- [x] summary 103 chars
- [x] Recommendation actionable (consistency + communication)
- [x] Populations: new-initiation, unstable-INR, K2 supplement users, DOAC users (null)
- [x] Dose threshold noted (150 microgram stabilization, ~900 microgram in 1 cup spinach)
- [x] Re-review 2027-04-21

## Physician sign-off (WARNING)

- [ ] PharmD with anticoagulation clinic experience recommended

## Severity change

Original DANGER 31 words → **WARNING** ~550 words, 3 specific sources. Downgrade justified by contemporary clinical practice (consistency > avoidance).

## Decision

- [x] HOLD for PharmD sign-off
- [ ] SHIP

## Python entry (for after sign-off)

```python
Interaction(
    substance_a="vitamin k",
    substance_b="warfarin",
    severity=InteractionSeverity.WARNING,
    interaction_type=InteractionType.ANTAGONISM,
    summary="Vitamin K directly antagonizes warfarin. Consistency of intake, not avoidance, is the right clinical approach.",
    details=(
        "Warfarin works by blocking vitamin K epoxide reductase, preventing "
        "regeneration of reduced vitamin K needed to activate clotting factors "
        "II, VII, IX, and X. Adding exogenous vitamin K — dietary or supplemental "
        "— provides the substrate warfarin is trying to keep unavailable. This "
        "is a direct antagonism. However, the 2016 systematic review (Violi et "
        "al) concluded the clinical implication is often misstated. A key RCT "
        "(Sconce et al, N=70 warfarin patients with unstable INR control) showed "
        "that low-dose daily vitamin K supplementation (150 micrograms) actually "
        "STABILIZED INR in previously unstable patients. Prospective dietary "
        "tracking shows an inverse correlation between vitamin K intake "
        "variability and INR variability (r = -0.600, p<0.01). Consistency of "
        "intake matters more than absolute level. The old 'avoid leafy greens "
        "on warfarin' advice is outdated. One cup cooked spinach contains ~900 "
        "micrograms of K1 — enough to shift INR if added acutely to a low "
        "baseline. Patients with chronically unstable INR may benefit from "
        "consistent low-dose K supplementation rather than restriction. Vitamin "
        "K2 (MK-4, MK-7) supplements also interact. Patients on DOACs "
        "(apixaban, rivaroxaban, dabigatran, edoxaban) do NOT have this "
        "interaction — DOACs are not vitamin K antagonists."
    ),
    recommendation=(
        "Do not change your vitamin K intake — dietary or supplemental — without "
        "telling your anticoagulation clinic. Aim for consistent daily intake "
        "rather than restriction. Starting a K2 supplement? Ask for an INR "
        "check 1-2 weeks after. If your INR is chronically unstable, ask "
        "whether a small consistent K supplement might help. If you're on a "
        "DOAC, this interaction does not apply."
    ),
    timing_advice=(
        "Timing within the day does not materially help. The interaction is on "
        "the vitamin K cycle at the liver. Consistency day-to-day is what "
        "matters."
    ),
    sources=[
        "PMID:26962786 — Violi F et al. Interaction Between Dietary Vitamin K Intake and Anticoagulation by Vitamin K Antagonists: Is It Really True? A Systematic Review. Medicine (Baltimore) 2016.",
        "PMID:17690342 — Sconce E et al. Effect of low-dose vitamin K supplementation on INR stability. 2007.",
        "PMID:16941417 — Dietary vitamin K variability affects INR coagulation indices. 2006.",
    ],
    mechanism=(
        "Warfarin works by blocking vitamin K epoxide reductase, preventing "
        "regeneration of reduced vitamin K needed to activate clotting factors "
        "II, VII, IX, and X. Exogenous vitamin K — dietary or supplemental — "
        "provides the substrate warfarin is trying to keep unavailable. The "
        "antagonism is real; what's changed is the clinical implication. "
        "Contemporary evidence shows consistency of intake matters more than "
        "absolute level, and low-dose K supplementation (150 microgram/day) can "
        "stabilize unstable INR."
    ),
    evidence_quality="moderate",
    populations=[
        "Newly-initiated warfarin patients — do not dramatically change diet at start; inform the anticoagulation clinic of typical intake.",
        "Patients with chronically unstable INR — may benefit from consistent low-dose K supplementation rather than restriction.",
        "Patients adding vitamin K2 (MK-7) for bone/cardiovascular reasons — this does interact; tell your prescriber.",
        "Patients on DOACs (apixaban, rivaroxaban, dabigatran, edoxaban) — no vitamin K interaction. DOACs do not depend on vitamin K antagonism.",
    ],
    what_we_dont_know=(
        "The quantitative relationship between dose change and INR shift is "
        "patient-specific; no universal formula applies. The specific "
        "comparability of K1 vs K2 (MK-4 vs MK-7) for warfarin interaction "
        "strength is not fully characterized."
    ),
    severity_rationale=(
        "WARNING, not DANGER: the mechanism is real, but INR monitoring + dose "
        "adjustment reliably mitigates. The old 'avoid all greens' advice is "
        "outdated. Consistent intake + communication with the anticoagulation "
        "clinic is the correct framing."
    ),
)
```
