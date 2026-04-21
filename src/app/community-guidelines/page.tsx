export const metadata = {
  title: "Community Guidelines — Formulate",
  description:
    "How Formulate expects members to treat each other, share research, and keep discussions about supplements useful and safe.",
};

export default function CommunityGuidelinesPage() {
  return (
    <div className="pt-24 px-6 pb-16 max-w-[720px] mx-auto">
      <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">
        Community
      </div>
      <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-2">
        Community Guidelines
      </h1>
      <p className="text-xs text-muted mb-8">Last updated: April 2026</p>

      <div className="space-y-8 text-sm text-muted leading-relaxed">
        <section>
          <p>
            Formulate is a space for people who take their health seriously and
            want to learn from each other. These guidelines apply anywhere you
            can post, comment, review, message, or submit content — product
            reviews, stack comments, ingredient discussions, research threads,
            feedback, and friend-to-friend messaging.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">The Short Version</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Be honest, specific, and kind.</li>
            <li>Cite sources when you claim a supplement works.</li>
            <li>Don&apos;t give medical advice — share your experience instead.</li>
            <li>No spam, no affiliate links you haven&apos;t disclosed, no brand shilling.</li>
            <li>No harassment, hate, or targeted negativity toward other members.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">What&apos;s Welcome</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-text font-medium">Personal experience</span> — &ldquo;I
              took magnesium glycinate for six weeks and my sleep improved&rdquo; is
              useful. Frame it as yours, not as a universal truth.
            </li>
            <li>
              <span className="text-text font-medium">Research and citations</span> — share
              studies, but include the link and note the study type (RCT,
              observational, animal, in vitro) so readers can weigh it.
            </li>
            <li>
              <span className="text-text font-medium">Questions</span> — there are no dumb
              questions about supplements. Ask them.
            </li>
            <li>
              <span className="text-text font-medium">Constructive product feedback</span> —
              what worked, what didn&apos;t, what surprised you.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">What&apos;s Not Allowed</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-text font-medium">Medical advice</span> — don&apos;t tell
              other members what they &ldquo;should&rdquo; take, especially when
              they&apos;ve mentioned a condition, medication, pregnancy, or they&apos;re
              a minor. Share what worked for you and point them to their doctor.
            </li>
            <li>
              <span className="text-text font-medium">Dangerous protocols</span> — posts
              promoting megadoses known to cause harm, stacking that ignores
              well-documented interactions, or illegal compounds.
            </li>
            <li>
              <span className="text-text font-medium">Spam and covert marketing</span> — no
              undisclosed affiliate links, no repeatedly promoting the same
              brand across threads, no fake reviews. If you work for a brand,
              say so before you recommend it.
            </li>
            <li>
              <span className="text-text font-medium">Harassment</span> — personal attacks,
              slurs, targeted pile-ons, or persistent unwanted contact.
            </li>
            <li>
              <span className="text-text font-medium">Hate speech</span> — content that
              attacks people based on race, ethnicity, religion, gender,
              sexual orientation, disability, or age.
            </li>
            <li>
              <span className="text-text font-medium">Doxxing</span> — don&apos;t share
              another member&apos;s real name, location, workplace, or medical
              details without their explicit permission.
            </li>
            <li>
              <span className="text-text font-medium">Illegal content</span> — content that
              violates the law or infringes someone else&apos;s rights.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Medical Disclaimer</h2>
          <p>
            Nothing posted on Formulate by members or staff is medical advice.
            Supplements can interact with medications and underlying conditions.
            Always talk to a qualified healthcare provider before starting,
            stopping, or changing what you take — especially if you are
            pregnant, nursing, under 18, managing a chronic condition, or
            taking prescription medications.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Enforcement</h2>
          <p className="mb-3">
            If a post or message breaks these guidelines, we may:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Remove the content.</li>
            <li>Warn the member by email.</li>
            <li>Temporarily suspend posting, reviewing, or messaging.</li>
            <li>Permanently close the account for repeated or severe violations.</li>
          </ul>
          <p className="mt-3">
            We use a mix of automated checks and human review. If you believe
            an action was taken in error, reply to the notification email and
            we&apos;ll take another look.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Reporting</h2>
          <p>
            See something that breaks these guidelines? Use the report option on
            the content, or email{" "}
            <span className="text-accent">support@formulate-health.app</span>{" "}
            with a link and a short description. Reports are confidential.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Changes</h2>
          <p>
            These guidelines will evolve as the community grows. We&apos;ll update
            the date at the top when they change, and for substantial changes
            we&apos;ll notify members by email or in-app.
          </p>
        </section>
      </div>
    </div>
  );
}
