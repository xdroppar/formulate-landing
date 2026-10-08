/**
 * Server renderer for a course lesson's blocks (see src/lib/courses.ts).
 *
 * The app renders the same blocks interactively (sliders, tap-to-answer). A
 * public page has to work with no JavaScript and show crawlers the whole
 * lesson, so every interaction becomes a native <details>: the question is
 * visible, the answer is one tap away and is still in the HTML.
 */
import type { ReactNode } from "react";
import { withUtm } from "@/lib/app-url";
import { APP_BASE, type CourseBlock } from "@/lib/courses";

/** **bold** and *italic*, inline. */
export function md(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

/** Blank-line paragraphs, `- ` bullet runs and `1. ` numbered runs. */
export function RichText({ body, className = "" }: { body: string; className?: string }) {
  const out: ReactNode[] = [];
  body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .forEach((para, pi) => {
      const lines = para.split("\n");
      let prose: string[] = [];
      let list: { ordered: boolean; items: string[] } | null = null;
      const flushProse = () => {
        if (prose.length) {
          out.push(
            <p key={`${pi}-p${out.length}`} className="mb-3 last:mb-0">
              {md(prose.join(" "))}
            </p>,
          );
          prose = [];
        }
      };
      const flushList = () => {
        if (list) {
          const Tag = list.ordered ? "ol" : "ul";
          out.push(
            <Tag
              key={`${pi}-l${out.length}`}
              className={`mb-3 last:mb-0 pl-5 space-y-1.5 ${list.ordered ? "list-decimal" : "list-disc"} marker:text-muted`}
            >
              {list.items.map((it, i) => (
                <li key={i}>{md(it)}</li>
              ))}
            </Tag>,
          );
          list = null;
        }
      };
      for (const line of lines) {
        const b = line.match(/^\s*[-•]\s+(.*)$/);
        const n = line.match(/^\s*\d+[.)]\s+(.*)$/);
        if (b || n) {
          flushProse();
          const ordered = Boolean(n);
          if (list && list.ordered !== ordered) flushList();
          if (!list) list = { ordered, items: [] };
          list.items.push((b ?? n)![1]);
        } else {
          flushList();
          prose.push(line.trim());
        }
      }
      flushProse();
      flushList();
    });
  return <div className={`text-[15px] leading-relaxed text-text/85 ${className}`}>{out}</div>;
}

const TONE: Record<"info" | "tip" | "warn", { label: string; cls: string }> = {
  info: { label: "Note", cls: "border-[#7aa7ff]/35 bg-[#7aa7ff]/[0.05]" },
  tip: { label: "Tip", cls: "border-accent/35 bg-accent/[0.05]" },
  warn: { label: "Careful", cls: "border-[#ffc27a]/40 bg-[#ffc27a]/[0.05]" },
};

const METRIC_TEXT: Record<string, string> = {
  hydration: "your daily water target, from your body weight",
  protein: "your daily protein target, from your weight and goal",
  routine: "how big your routine is and what it covers",
  coverage: "how much of each nutrient your stack and meals cover",
};

const summaryCls =
  "cursor-pointer list-none select-none font-mono text-[11px] uppercase tracking-[0.12em] text-accent hover:underline [&::-webkit-details-marker]:hidden";

export function LessonBlock({ block, campaign }: { block: CourseBlock; campaign: string }) {
  switch (block.type) {
    case "text":
      return (
        <section className="mb-8">
          {block.heading && (
            <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-3">{block.heading}</h2>
          )}
          <RichText body={block.body} />
        </section>
      );

    case "keyConcept":
      return (
        <section className="mb-8 rounded-2xl border border-accent/30 bg-accent/[0.04] p-5">
          <div className="fm-eyebrow text-accent mb-2">Key concept</div>
          <h3 className="text-base font-bold text-text mb-2">{block.title}</h3>
          <RichText body={block.body} />
        </section>
      );

    case "stat":
      return (
        <figure className="mb-8 rounded-2xl border border-border bg-white/[0.02] p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="fm-display text-[clamp(32px,5vw,48px)] leading-none text-accent shrink-0">{block.value}</div>
          <figcaption className="min-w-0">
            <p className="text-[15px] leading-relaxed text-text/90">{md(block.label)}</p>
            {block.source && <p className="mt-1.5 text-xs text-muted">Source: {block.source}</p>}
          </figcaption>
        </figure>
      );

    case "depth":
      return (
        <section className="mb-8 rounded-2xl border border-border p-5">
          {block.title && <h3 className="text-base font-bold text-text mb-3">{block.title}</h3>}
          <div className="fm-eyebrow text-muted mb-1.5">In plain terms</div>
          <RichText body={block.simple} className="mb-4" />
          <details className="border-t border-border pt-3 mt-3">
            <summary className={summaryCls}>How it works →</summary>
            <RichText body={block.mechanism} className="mt-3" />
          </details>
          <details className="border-t border-border pt-3 mt-3">
            <summary className={summaryCls}>What the studies show →</summary>
            <RichText body={block.studies} className="mt-3" />
          </details>
        </section>
      );

    case "predictReveal":
      return (
        <section className="mb-8 rounded-2xl border border-border bg-white/[0.02] p-5">
          <div className="fm-eyebrow text-muted mb-2">Make a guess</div>
          <p className="text-[15px] font-semibold text-text leading-relaxed mb-1">{md(block.prompt)}</p>
          <p className="text-xs text-muted mb-3">
            Somewhere between {block.min.toLocaleString("en-US")} and {block.max.toLocaleString("en-US")} {block.unit}.
          </p>
          <details>
            <summary className={summaryCls}>Reveal the answer →</summary>
            <p className="mt-3 fm-display text-2xl text-accent">
              {block.answerLabel ?? `${block.answer.toLocaleString("en-US")} ${block.unit}`}
            </p>
            <RichText body={block.explanation} className="mt-2" />
          </details>
        </section>
      );

    case "quiz":
      return (
        <section className="mb-8 rounded-2xl border border-border bg-white/[0.02] p-5">
          <div className="fm-eyebrow text-muted mb-2">Check yourself</div>
          <p className="text-[15px] font-semibold text-text leading-relaxed mb-3">{md(block.question)}</p>
          <ol className="space-y-1.5 mb-3 list-[upper-alpha] pl-5 marker:text-muted text-[14px] text-text/85">
            {block.options.map((o, i) => (
              <li key={i}>{md(o)}</li>
            ))}
          </ol>
          <details>
            <summary className={summaryCls}>Show the answer →</summary>
            <p className="mt-3 text-[14px] text-text">
              <span className="font-mono text-accent mr-2">{String.fromCharCode(65 + block.correctIndex)}.</span>
              <strong className="font-semibold">{md(block.options[block.correctIndex] ?? "")}</strong>
            </p>
            <RichText body={block.explanation} className="mt-2" />
          </details>
        </section>
      );

    case "diagram":
      return (
        <section className="mb-8">
          <h3 className="text-base font-bold text-text mb-3">{block.title}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {block.nodes.map((n, i) => (
              <div key={i} className="rounded-xl border border-border bg-white/[0.02] p-4">
                <div className="text-sm font-bold text-text mb-1">{n.label}</div>
                <p className="text-[13px] leading-relaxed text-muted">{md(n.detail)}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "checklist":
      return (
        <section className="mb-8 rounded-2xl border border-border p-5">
          <h3 className="text-base font-bold text-text mb-3">{block.title ?? "Your checklist"}</h3>
          <ul className="space-y-2">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-text/85">
                <span aria-hidden className="mt-[3px] shrink-0 w-4 h-4 rounded border border-accent/50" />
                <span>{md(it)}</span>
              </li>
            ))}
          </ul>
        </section>
      );

    case "callout": {
      const t = TONE[block.tone] ?? TONE.info;
      return (
        <aside className={`mb-8 rounded-xl border p-4 ${t.cls}`}>
          <div className="fm-eyebrow text-muted mb-1.5">{t.label}</div>
          <RichText body={block.body} />
        </aside>
      );
    }

    case "applyIt":
    case "yourNumbers": {
      const href =
        block.type === "applyIt"
          ? block.href
          : block.metric === "hydration" || block.metric === "coverage"
            ? "/stack/nutrients"
            : "/stack";
      const title = block.type === "applyIt" ? block.label : (block.title ?? "Your numbers");
      const body =
        block.type === "applyIt"
          ? block.body
          : `Formulate works out ${METRIC_TEXT[block.metric] ?? "your own numbers"}, free.`;
      const url = withUtm(`${APP_BASE}${href.startsWith("/") ? href : `/${href}`}`, { source: "landing", campaign });
      return (
        <a
          href={url}
          data-cta-source="course_apply"
          className="mb-8 group flex items-center gap-4 rounded-2xl border border-border bg-card/30 p-5 transition-colors hover:border-accent/50"
        >
          <div className="min-w-0 flex-1">
            <div className="fm-eyebrow text-accent mb-1">Try it in the app</div>
            <div className="text-sm font-bold text-text">{title}</div>
            {body && <p className="text-xs text-muted leading-snug mt-1">{md(body)}</p>}
          </div>
          <span aria-hidden className="text-muted group-hover:text-accent">
            →
          </span>
        </a>
      );
    }

    default:
      return null;
  }
}
