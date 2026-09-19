import Link from "next/link";
import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";

export function RedLightTherapyEvidence() {
  return (
    <>
      <TLDRBox
        readTime="9 min read"
        takeaways={[
          "Red light therapy (photobiomodulation) uses red (about 620–700 nm) and near-infrared (about 780–1,000 nm) light at doses too low to heat tissue much",
          "The best evidence is for specific uses at specific doses: preventing mouth sores during some cancer treatments, pattern hair loss, and some skin-ageing and joint-pain outcomes",
          "Claims that a whole-body panel boosts your mitochondria, energy, hormones or fat loss go well beyond the human data",
          "Dose depends on irradiance (mW/cm²) × time. More is not better: the response is biphasic, and too much can cancel the effect",
          "Near-infrared is invisible, so your eyes won’t protect themselves. Use the goggles, and remember that “FDA cleared” means similar to an existing device for one labelled use, not proven for everything",
        ]}
      />

      <p>
        Red light panels, face masks and helmets are one of the fastest-growing
        categories in home wellness, and the claims have grown with them:
        better skin, thicker hair, faster recovery, more energy, higher
        testosterone, better sleep, fat loss. The underlying science, called{" "}
        <strong>photobiomodulation (PBM)</strong>, is real and has been studied
        for decades. Most of the marketing, though, takes results from narrow,
        carefully dosed clinical uses and applies them to everything.
      </p>
      <p>
        This guide separates the uses with decent evidence from the ones
        without, explains how dose works, and shows how to read a device spec
        sheet without being misled.
      </p>

      <h2>The Short Answer</h2>
      <p>
        Red and near-infrared light at the right dose has{" "}
        <strong>reasonable evidence for a handful of local problems</strong>:
        pattern hair loss, some signs of skin ageing, knee osteoarthritis pain,
        and preventing oral mucositis in cancer care (the last one delivered
        by clinicians). There is <strong>little evidence</strong> that bathing
        your whole body in a panel improves energy, performance, hormones or
        general health. If you buy a device, buy it for a specific target,
        choose one with measured irradiance and wavelength data, protect your
        eyes, and expect modest results over months.
      </p>

      <h2>What Photobiomodulation Is</h2>
      <p>
        PBM uses light from low-power lasers or LEDs, mostly in two bands:
      </p>
      <ul>
        <li>
          <strong>Red, about 620&ndash;700 nm</strong> (common peaks: 630, 660
          nm). It is absorbed fairly near the surface, which makes it
          relevant to skin and scalp.
        </li>
        <li>
          <strong>Near-infrared (NIR), about 780&ndash;1,000 nm</strong>{" "}
          (common peaks: 810, 830, 850 nm). It is invisible and penetrates
          further, which is why it&rsquo;s used for joints and muscles.
        </li>
      </ul>
      <p>
        The leading explanation is that these wavelengths are absorbed by an
        enzyme in mitochondria (cytochrome c oxidase), briefly changing cell
        signalling, blood flow and inflammation. That mechanism is supported in
        cell and animal studies. It is the step from &ldquo;light affects
        mitochondria in a dish&rdquo; to &ldquo;this panel improves your health&rdquo;
        where marketing overreaches.
      </p>

      <h2>Dose: Irradiance, Time and the Biphasic Curve</h2>
      <p>
        Two numbers define a dose:
      </p>
      <ul>
        <li>
          <strong>Irradiance (power density)</strong>, in milliwatts per square
          centimetre (mW/cm&sup2;), measured at a stated distance.
        </li>
        <li>
          <strong>Fluence (energy density)</strong>, in joules per square
          centimetre (J/cm&sup2;), which is irradiance multiplied by time. At
          50 mW/cm&sup2;, 10 minutes delivers 0.05 &times; 600 = 30 J/cm&sup2;.
          At 20 mW/cm&sup2;, 5 minutes delivers 6 J/cm&sup2;.
        </li>
      </ul>
      <p>
        PBM follows a <strong>biphasic dose response</strong>: too little does
        nothing, a moderate dose works, and a large dose can have less effect
        or the opposite effect.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Huang et al.", year: 2009, journal: "Dose-Response",
          title: "Biphasic dose response in low level light therapy",
          url: "https://pubmed.ncbi.nlm.nih.gov/20011653/",
          summary: "Review of in vitro, animal and clinical data showing low light doses often outperform higher ones; parameter choice explains many negative studies.",
        }]} />{" "}
        This matters because the effective doses in trials are often modest,
        in the single digits to low tens of J/cm&sup2; for skin. A stronger panel
        or longer session is not automatically better. It&rsquo;s also why a
        positive trial only tells you about <em>its</em> wavelength, dose and
        schedule, not about any device that glows red.
      </p>

      <h2>Where the Evidence Is Better</h2>

      <h3>Oral mucositis during cancer treatment</h3>
      <p>
        This is the most established use. International supportive-care
        guidelines <strong>recommend PBM to prevent painful mouth sores</strong>{" "}
        in people having stem-cell transplants or head-and-neck radiotherapy,
        using specific protocols delivered by clinicians.{" "}
        <EvidenceBadge level="strong" studies={[{
          authors: "Zadik et al.", year: 2019, journal: "Supportive Care in Cancer",
          title: "Systematic review of photobiomodulation for the management of oral mucositis in cancer patients and clinical practice guidelines",
          url: "https://pubmed.ncbi.nlm.nih.gov/31286228/",
          summary: "MASCC/ISOO guideline: PBM recommended to prevent oral mucositis in stem-cell transplant and head-and-neck radiotherapy, using specific protocols; no guideline possible for treating established mucositis.",
        }]} />{" "}
        It&rsquo;s a good example of how PBM evidence works: strong for a
        defined use, with defined settings, in a defined population.
      </p>

      <h3>Pattern hair loss</h3>
      <p>
        Hair is the strongest consumer use. In sham-controlled, double-blind
        trials in men and women with pattern hair loss, a home laser comb used
        three times a week for 26 weeks increased terminal hair density by
        about 18&ndash;26 hairs/cm&sup2;, compared with 2&ndash;9 with the sham.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Jimenez et al.", year: 2014, journal: "American Journal of Clinical Dermatology",
          title: "Efficacy and safety of a low-level laser device in the treatment of male and female pattern hair loss: a multicenter, randomized, sham device-controlled, double-blind study",
          url: "https://pubmed.ncbi.nlm.nih.gov/24474647/",
          summary: "269 randomised; 26 weeks, 3×/week. Terminal hair density +18 to +26/cm² with the device vs +2 to +9/cm² with sham. Tests a single commercial device.",
        }]} />{" "}
        A 2025 meta-analysis of 38 studies found consistent gains in hair
        density for androgenetic alopecia, with large differences between
        studies.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Perez et al.", year: 2025, journal: "Dermatologic Surgery",
          title: "Low-Level Laser and LED Therapy in Alopecia: A Systematic Review and Meta-Analysis",
          url: "https://pubmed.ncbi.nlm.nih.gov/39404126/",
          summary: "38 studies, 3,098 patients. Hair density rose vs placebo in androgenetic alopecia (SMD ~1.1–1.4), with high heterogeneity; too little data for other alopecia types.",
        }]} />{" "}
        Many of these trials test one company&rsquo;s device. Results
        take months to show (the trials ran 16&ndash;26 weeks), stop if you stop, and are smaller than
        the before-and-after photos suggest. The treatment only helps pattern
        hair loss. It does nothing for scarring alopecia and has little data
        for other types.
      </p>

      <h3>Skin ageing</h3>
      <p>
        In a controlled trial of 136 volunteers, twice-weekly red or broadband
        light for 30 sessions improved skin roughness, collagen density on
        ultrasound, and blinded ratings of photographs, compared with
        untreated controls.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Wunsch and Matuschka", year: 2014, journal: "Photomedicine and Laser Surgery",
          title: "A controlled trial to determine the efficacy of red and near-infrared light treatment in patient satisfaction, reduction of fine lines, wrinkles, skin roughness, and intradermal collagen density increase",
          url: "https://pubmed.ncbi.nlm.nih.gov/24286286/",
          summary: "136 volunteers; ~9 J/cm² red light twice weekly, 30 sessions. Better roughness, collagen density and blinded photo ratings vs untreated controls (no sham). Broadband added nothing over red alone.",
        }]} />{" "}
        A 2025 sham-controlled trial of a home LED mask (630 and 850 nm) found
        improvements in crow&rsquo;s-feet wrinkles over 16 weeks.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Park et al.", year: 2025, journal: "Medicine",
          title: "Clinical study to evaluate the efficacy and safety of home-used LED and IRED mask for crow's feet: A multi-center, randomized, double-blind, sham-controlled study",
          url: "https://pubmed.ncbi.nlm.nih.gov/39960921/",
          summary: "Home LED/infrared mask (630/850 nm) for 16 weeks vs sham: better crow's-feet grading by blinded raters at weeks 8, 12 and 16.",
        }]} />{" "}
        That&rsquo;s encouraging but not dramatic. Daily sunscreen and a
        topical retinoid have far more evidence for skin ageing, and a light
        device is best seen as an extra.
      </p>

      <h3>Knee osteoarthritis and some pain conditions</h3>
      <p>
        A meta-analysis of 22 placebo-controlled trials found that laser PBM
        reduced knee osteoarthritis pain and disability, with the biggest
        effect when trials used the recommended doses: 4&ndash;8 joules per
        treatment spot at 785&ndash;860 nm.{" "}
        <EvidenceBadge level="moderate" studies={[{
          authors: "Stausholm et al.", year: 2019, journal: "BMJ Open",
          title: "Efficacy of low-level laser therapy on pain and disability in knee osteoarthritis: systematic review and meta-analysis of randomised placebo-controlled trials",
          url: "https://pubmed.ncbi.nlm.nih.gov/31662383/",
          summary: "22 RCTs, n=1,063. Pain reduced ~14 mm on a 100 mm scale vs placebo overall, more at recommended doses (4–8 J per spot at 785–860 nm).",
        }]} />{" "}
        Those were clinical lasers aimed at specific points on the joint.
        Whether a wall panel several inches away delivers anything comparable
        depends on its measured output, which is often unknown.
      </p>

      <h3>Acne: low certainty</h3>
      <p>
        A Cochrane review of 71 light-therapy studies for acne rated the
        evidence as low to very low quality. Most studies were small, and
        about two-thirds were industry-sponsored.{" "}
        <EvidenceBadge level="mixed" studies={[{
          authors: "Barbaric et al.", year: 2016, journal: "Cochrane Database of Systematic Reviews",
          title: "Light therapies for acne",
          url: "https://pubmed.ncbi.nlm.nih.gov/27670126/",
          summary: "71 studies, 4,211 participants. High-quality evidence lacking; low certainty for light-activated photodynamic therapy; two-thirds industry-sponsored.",
        }]} />
      </p>

      <h2>Where the Evidence Is Weak</h2>
      <p>
        Whole-body panels are sold on the idea that if light helps cells in
        one place, it should help cells everywhere. The human evidence
        doesn&rsquo;t support that yet. A 2025 systematic review of whole-body
        PBM for exercise found five small studies. None showed better
        performance or recovery, though two reported better sleep ratings.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Álvarez-Martínez and Borden", year: 2025, journal: "Lasers in Medical Science",
          title: "A systematic review on whole-body photobiomodulation for exercise performance and recovery",
          url: "https://pubmed.ncbi.nlm.nih.gov/39883205/",
          summary: "5 studies, 105 active adults. No benefit for fatigue markers or exercise performance; 2 studies reported better sleep quality.",
        }]} />
      </p>
      <p>
        Claims you should treat as unproven at best:
      </p>
      <ul>
        <li>&ldquo;Boosts mitochondria / ATP / cellular energy&rdquo; as a felt, whole-body benefit</li>
        <li>Raising testosterone or improving fertility by shining light on the body</li>
        <li>Fat loss or &ldquo;body contouring&rdquo; from a home panel</li>
        <li>Treating thyroid disease, autoimmune disease, depression or dementia at home</li>
        <li>&ldquo;Detox&rdquo;, anti-cancer, or &ldquo;blood cleansing&rdquo; claims</li>
      </ul>
      <p>
        Some of these have early clinical research behind them using specific
        protocols. None is established, and none justifies self-treating a
        medical condition.
      </p>

      <h2>Eye Safety</h2>
      <p>
        Visible red light is bright enough that you naturally look away.{" "}
        <strong>Near-infrared is invisible</strong>, so there is no glare to
        warn you, and many panels combine both at close range. Repeated,
        eye-directed red laser treatments given to children for short-sightedness
        have produced a documented case of retinal damage.{" "}
        <EvidenceBadge level="emerging" studies={[{
          authors: "Liu et al.", year: 2023, journal: "JAMA Ophthalmology",
          title: "Retinal Damage After Repeated Low-level Red-Light Laser Exposure",
          url: "https://pubmed.ncbi.nlm.nih.gov/37227712/",
          summary: "Case report: retinal damage in a 12-year-old after repeated low-level red-light laser therapy for myopia.",
        }]} />{" "}
        Home panels are not designed to be looked into. Use the goggles
        supplied (or ones rated for those wavelengths), keep your eyes closed
        and covered during face treatments, and don&rsquo;t stare at the
        emitters.
      </p>

      <Callout variant="warning" title="Who should check with a clinician first">
        <ul>
          <li>Anyone with retinal disease, such as macular degeneration or diabetic retinopathy</li>
          <li>Anyone taking photosensitising medicines (some antibiotics, retinoid tablets, certain heart-rhythm and psychiatric drugs, St John&rsquo;s wort), or with lupus or porphyria</li>
          <li>Anyone with a suspicious mole or skin cancer in the treatment area. Get it examined first rather than treating over it</li>
          <li>Pregnancy: there is little safety data, so avoid treating the abdomen</li>
          <li>People with epilepsy, if the device flickers</li>
          <li>Anyone with reduced sensation (neuropathy), since high-power panels can warm skin enough to burn</li>
        </ul>
      </Callout>

      <h2>How to Judge a Panel&rsquo;s Spec Sheet</h2>
      <table>
        <thead>
          <tr>
            <th>Spec</th>
            <th>What you want</th>
            <th>Red flags</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wavelengths</td>
            <td>Stated peaks within the studied bands (about 630&ndash;670 and 810&ndash;850 nm), ideally with a measured spectrum</td>
            <td>A long list of exotic wavelengths, each with its own health claim</td>
          </tr>
          <tr>
            <td>Irradiance</td>
            <td>mW/cm&sup2; at several stated distances, measured with an instrument suited to narrow-band LEDs (a spectroradiometer or calibrated thermal power sensor)</td>
            <td>One huge number with no distance given, or measured at the lens</td>
          </tr>
          <tr>
            <td>Treatment area</td>
            <td>Irradiance mapped across the panel, not just at the centre</td>
            <td>Coverage claims larger than the panel</td>
          </tr>
          <tr>
            <td>Dosing guidance</td>
            <td>Suggested distance and minutes that produce a plausible J/cm&sup2;</td>
            <td>&ldquo;The more the better&rdquo;, or no guidance</td>
          </tr>
          <tr>
            <td>Safety</td>
            <td>Electrical safety certification from a recognised test lab, photobiological safety classification (IEC 62471), goggles supplied, timer, flicker-free drivers</td>
            <td>No independent certification at all</td>
          </tr>
          <tr>
            <td>Regulatory claims</td>
            <td>A 510(k) number you can look up, matching the labelled use</td>
            <td>&ldquo;FDA approved&rdquo; or &ldquo;FDA registered&rdquo; used to imply proven effects</td>
          </tr>
        </tbody>
      </table>
      <p>
        Irradiance figures deserve extra suspicion. Different meters read
        narrow-band red and near-infrared LEDs very differently, so two
        panels with the same printed number can deliver quite different
        doses. A seller who explains how they measured is more trustworthy than
        one with the biggest number.
      </p>

      <h2>What &ldquo;FDA Cleared&rdquo; Actually Means</h2>
      <p>
        In the US, most light-therapy devices that make medical claims go
        through the{" "}
        <a href="https://www.fda.gov/medical-devices/premarket-submissions-selecting-and-preparing-correct-submission/premarket-notification-510k">510(k) process</a>.
        The FDA &ldquo;clears&rdquo; a device when the maker shows it is{" "}
        <strong>substantially equivalent</strong> to one already on the market,
        for a specific intended use such as temporary relief of minor muscle
        pain, treatment of wrinkles, or hair growth in pattern hair loss.
      </p>
      <ul>
        <li>
          <strong>Cleared</strong> covers the labelled use only. Clearance
          for muscle pain says nothing about skin, sleep or hormones, and
          substantial equivalence doesn&rsquo;t always require new clinical
          trials.
        </li>
        <li>
          <strong>Registered or listed</strong> means the company has told the
          FDA it exists. It is not a review of safety or effectiveness.
        </li>
        <li>
          <strong>Approved</strong> refers to the stricter premarket approval
          pathway, which consumer light panels almost never go through.
        </li>
        <li>
          Many panels are sold under the FDA&rsquo;s{" "}
          <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices">general wellness policy</a>,
          which allows vague wellbeing claims without clearance. That&rsquo;s
          legal, but it isn&rsquo;t evidence.
        </li>
      </ul>
      <p>
        If a 510(k) number is given, you can check the cleared indication in
        the{" "}
        <a href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm">FDA 510(k) database</a>.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is red light therapy the same as a light box for seasonal depression?</h3>
      <p>
        No. A SAD light box is bright white light aimed at the eyes to shift
        your body clock and mood. Red light therapy is aimed at skin and
        tissue, and the eyes should be protected. Our{" "}
        <Link href="/guides/light-therapy-lamp-for-seasonal-depression">light therapy lamp guide</Link>{" "}
        covers the depression evidence.
      </p>

      <h3>How long should a session be?</h3>
      <p>
        Follow the dose, not the clock. Work out fluence from measured
        irradiance at your distance. Trials for skin and hair typically use
        a few minutes per area, several times a week, for months. Longer
        daily sessions are not proven to help and may reduce the effect.
      </p>

      <h3>Can red light help me sleep?</h3>
      <p>
        Dim red light in the evening disrupts your body clock less than blue
        or white light, which is a reason to use warm, dim lighting before
        bed. Whether a bright red panel actively improves sleep is based on a
        couple of small studies. For evidence-based sleep steps, see our{" "}
        <Link href="/guides/best-sleep-supplement-protocol">sleep protocol</Link>.
      </p>

      <h3>Does it work through clothing or hair?</h3>
      <p>
        Fabric blocks most of the light. For the scalp, hair-growth devices
        are designed with combs, helmets or caps to get light past the hair.
        For everything else, treat bare, clean skin, and don&rsquo;t apply
        sunscreen or makeup to the area first.
      </p>

      <h3>Is it safe to use every day?</h3>
      <p>
        For most healthy adults, short sessions at the maker&rsquo;s
        recommended distance appear to be low-risk. Eye exposure, burns from
        high-power panels, and photosensitising drugs are the main risks.
        Given the biphasic dose response, daily use isn&rsquo;t necessarily
        better than the 2&ndash;5 times a week most trials used.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Photobiomodulation is a real treatment with credible evidence for
        narrow uses at specific doses. The best-supported home uses are pattern
        hair loss and, more modestly, skin ageing. Whole-body &ldquo;optimise
        your mitochondria&rdquo; claims are ahead of the data. Buy for a
        specific goal, insist on measured irradiance and honest dosing, look
        up any FDA clearance to see what it actually covers, and protect your
        eyes.
      </p>
      <p>
        More in the <a href="https://app.formulate-health.app/learning/track/therapies?utm_source=landing&utm_medium=guide_body&utm_campaign=red-light-therapy-evidence">Therapies learning track</a>{" "}
        and the <Link href="/learn/red-light">red light reference page</Link>.
      </p>
      <p>
        <a href="https://app.formulate-health.app/therapies">
          Compare red light devices in the Formulate catalog &rarr;
        </a>
      </p>
    </>
  );
}
