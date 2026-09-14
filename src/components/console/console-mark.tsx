/**
 * One mark from the registry, by key.
 *
 * NO "use client". That is the whole reason this is its own file rather than
 * living in console-bits: the marks are wanted on server-rendered pages too
 * (/methodology renders the six pillars), and console-bits is a client module
 * because it carries the tracked CTAs. Importing a mark from there would pull
 * a client boundary onto a static page to render an inert SVG.
 *
 * The wall has its own component because it is a grid with captions. This is
 * for the single marks scattered through the site — the streak's flame, a
 * pillar tile — the places that reached for an emoji because the drawn one
 * was not exported yet.
 *
 * Sized by the caller in CSS, not by a prop. The registry ships these at 86px
 * ("l"), which is almost never the size a given slot wants, so every caller
 * already has an opinion and a prop would just be a second one.
 */
import { MARK_BY_KEY } from "@/lib/console-marks";

export function ConsoleMark({
  name,
  className,
  title,
}: {
  name: string;
  className?: string;
  /** Give this only where the mark carries meaning no adjacent text already
   *  carries. The pillar tiles name the pillar right underneath, so there the
   *  mark is decorative and stays hidden from a screen reader. */
  title?: string;
}) {
  const mark = MARK_BY_KEY[name];
  /* A missing key renders nothing rather than throwing. This is decoration on
     a marketing page; a typo should cost an icon, not the section. */
  if (!mark) return null;
  return (
    <span
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      /* This repo's own generated file, not user input. */
      dangerouslySetInnerHTML={{ __html: mark.svg }}
    />
  );
}
