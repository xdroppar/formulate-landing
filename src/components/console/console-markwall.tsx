/**
 * The trackables, with their faces.
 *
 * The marks are the demo's own duotone set, generated into lib/console-marks
 * by scripts/extract-marks.mjs rather than redrawn here — see that file for
 * why a second copy would be the wrong move, and for the gradient-id scoping
 * that stops two of them sharing colours on one page.
 *
 * The prototype's copy beside this wall says "thirty-seven trackable". Nothing
 * reachable from here produces that number — the registry the wall is built
 * from holds fourteen — so the sentence is not repeated and the wall is left
 * to say what it can show.
 */
/* WALL_MARKS, not CONSOLE_MARKS. The module now carries all fourteen marks in
   the registry so other components can reach the six that are not on the
   wall; mapping the whole set here would put apple, gem and coffee into a
   wall captioned with the seven things you can actually log. */
import { WALL_MARKS } from "@/lib/console-marks";

export function ConsoleMarkWall() {
  return (
    <div className="cn-markwall">
      {WALL_MARKS.map((m) => (
        <div className="cn-mkc" key={m.key}>
          {/* The SVG is this repo's own generated file, not user input. */}
          <span className="cn-mk" dangerouslySetInnerHTML={{ __html: m.svg }} />
          <span>{m.label}</span>
        </div>
      ))}
    </div>
  );
}
