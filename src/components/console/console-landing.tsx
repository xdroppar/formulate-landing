"use client";

/**
 * The console landing, whole.
 *
 * `.cn` is the scope every rule in console.css hangs off, so it is set once
 * here and nowhere else — a section that set its own would be styled when
 * rendered alone and unstyled when composed, which is the kind of bug that
 * only shows up in the arrangement nobody screenshotted.
 */
import { ConsoleNav, ConsoleHero } from "@/components/console/console-hero";
import { ConsoleSections } from "@/components/console/console-sections";
/* Type-only, deliberately — see the note beside the same import in
   console-sections.tsx. The counts are taken on the server and travel here as
   plain data, so the catalog never reaches the client bundle. */
import type { Surface, SurfaceGroup } from "@/lib/site-surfaces";

export function ConsoleLanding({
  faq,
  surfaces = [],
  catalogDoors = [],
}: {
  faq?: React.ReactNode;
  surfaces?: SurfaceGroup[];
  catalogDoors?: Surface[];
}) {
  return (
    <div className="cn">
      <ConsoleNav />
      <ConsoleHero />
      <ConsoleSections faq={faq} surfaces={surfaces} catalogDoors={catalogDoors} />
    </div>
  );
}
