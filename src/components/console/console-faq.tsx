/**
 * The FAQ, in the console.
 *
 * NOT a client component on purpose. The questions and answers have to be in
 * the HTML a crawler receives, because the FAQPage structured data beside them
 * is only valid if a reader can see the same text. Everything else in this
 * design is `"use client"`; this is the one piece that must render on the
 * server, so it takes resolved strings rather than calling a hook.
 */
import { SectionView } from "@/components/landing/section-view";

export function ConsoleFaq({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs.length) return null;
  return (
    <section className="cn-sec">
      <SectionView id="faq" depth={5} />
      <div className="wrap">
        <div className="sechead">
          <span className="lab">Common questions</span>
          <h2>
            The things people
            <br />
            ask first.
          </h2>
        </div>
        <div className="cn-faq">
          {faqs.map((f) => (
            <div className="cn-faqrow" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
