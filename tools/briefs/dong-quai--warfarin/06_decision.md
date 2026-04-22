# Stage 6 — Ship Decision

Pair: **Dong quai** + **Warfarin**

## Pre-ship checklist

- [x] evidence.json populated
- [x] 3 specific sources (1 case + 2 reviews)
- [x] No retractions
- [x] Adversarial: survived
- [x] GRADE: MODERATE (from LOW + upgrades) — meets WARNING bar
- [x] details ~570 words
- [x] summary 101 chars
- [x] Recommendation actionable
- [x] Populations noted (incl. perimenopausal context)
- [x] Re-review 2027-04-21

## Physician sign-off (WARNING)

- [ ] PharmD recommended

## Severity change

Original DANGER 24 words → **WARNING** ~570 words, 3 specific sources.

## Decision

- [x] HOLD for sign-off
- [ ] SHIP

## Python entry

```python
Interaction(
    substance_a="dong quai",
    substance_b="warfarin",
    severity=InteractionSeverity.WARNING,
    interaction_type=InteractionType.POTENTIATION,
    summary="Dong quai contains natural coumarins and has potentiated warfarin in a published case, raising bleeding risk.",
    details=(
        "Dong quai (Angelica sinensis) root contains natural coumarin "
        "derivatives — ferulic acid, osthole, and related compounds — with "
        "documented antithrombotic and platelet-inhibitory activity in vitro. "
        "Because warfarin itself is structurally a coumarin, adding plant "
        "coumarins is mechanistically intuitive. Animal steady-state studies "
        "show dong quai significantly increases prothrombin time WITHOUT "
        "changing warfarin blood concentration — suggesting a pharmacodynamic "
        "rather than pharmacokinetic interaction. The primary human evidence "
        "is a single case report (Page & Lawrence 1999): a 46-year-old woman "
        "stable on warfarin self-initiated dong quai 565 mg 1-2 times daily. "
        "Over 4 weeks her INR rose to 4.05 then 4.90 — more than double "
        "baseline — without bleeding events. She stopped dong quai; INR "
        "returned to acceptable levels within a month. No other changes were "
        "identified. The washout pattern strengthens attribution, but a single "
        "case cannot establish population-level effect size. Two systematic "
        "reviews list dong quai among herbs with documented warfarin "
        "potentiation. Commercial dong quai preparations vary widely in "
        "coumarin content, so 'low dose' is hard to define reliably."
    ),
    recommendation=(
        "If you take warfarin, do not start dong quai without telling your "
        "prescriber. If you already take both, don't stop abruptly — ask for "
        "an INR check and a plan to discontinue. Watch for unusual bruising, "
        "gum bleeding, nosebleeds, or dark stools. For perimenopausal symptoms "
        "(the most common reason people take dong quai), discuss alternatives "
        "that do not interact with warfarin. Stop dong quai 1-2 weeks before "
        "elective surgery."
    ),
    timing_advice=(
        "Spacing doses does not help; the interaction is pharmacodynamic and "
        "operates on the anticoagulation endpoint, not absorption."
    ),
    sources=[
        "PMID:10417036 — Page RL, Lawrence JD. Potentiation of warfarin by dong quai. Pharmacotherapy 1999.",
        "DOI:10.1177/1934578X1400900835 — Warfarin Interactions with Medicinal Herbs. Natural Product Communications 2014.",
        "PMID:25707010 — Interaction between warfarin and Chinese herbal medicines. 2015.",
    ],
    mechanism=(
        "Dong quai (Angelica sinensis) root contains natural coumarin "
        "derivatives — ferulic acid, osthole — with documented antithrombotic "
        "and platelet-inhibitory activity. Because warfarin itself is "
        "structurally a coumarin, adding plant coumarins is mechanistically "
        "intuitive. Animal steady-state studies show dong quai increases "
        "prothrombin time WITHOUT changing warfarin blood concentration — a "
        "pharmacodynamic rather than pharmacokinetic interaction."
    ),
    evidence_quality="moderate",
    populations=[
        "Warfarin patients, especially those using dong quai for perimenopausal symptoms (the main consumer-marketing use).",
        "Any other anticoagulant or antiplatelet patient (aspirin, clopidogrel, DOACs) — same mechanism applies.",
        "Pre-surgical patients — stop dong quai 1-2 weeks before elective surgery.",
    ],
    what_we_dont_know=(
        "No RCT. Quantitative INR shift per dose of dong quai is unknown. "
        "Whether specific preparations (water extract vs ethanol tincture vs "
        "standardized capsule) differ in risk is unclear."
    ),
    severity_rationale=(
        "WARNING, not DANGER: evidence is a single case report + animal data + "
        "mechanism. Case had no bleeding and INR normalized on discontinuation. "
        "Not enough data for DANGER; not weak enough for CAUTION."
    ),
)
```
