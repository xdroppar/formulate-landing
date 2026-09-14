/**
 * 03 · Test it — the panel, as the prototype builds it.
 *
 * NOT A SCREENSHOT, ON PURPOSE. Sections 01 and 02 show pictures of screens
 * the app has. There is no panel screen like this one in the shipped app —
 * /biomarkers is an upload prompt and a guide to getting your blood drawn —
 * so a picture of the demo's `testing` screen would advertise a screen that
 * does not exist. The prototype's own section 03 does not use one either: it
 * renders these numbers as two cards, and so does this.
 *
 * BOTH HEADLINE NUMBERS ARE DERIVED. The score is the weighted mean of the
 * seven systems' scores and the move is the weighted mean of their moves, so
 * neither can drift from the rows printed underneath it. The prototype makes
 * the same point in its own comment; it is the reason to compute rather than
 * type, and it is why the two cards can never disagree with each other.
 *
 * EVERY SYSTEM IS LISTED, including the one that did nothing and the one that
 * went backwards. A list of only the wins is not a measurement.
 */
import { CONSOLE_PANEL as P } from "@/lib/console-panel";

const wsum = P.systems.reduce((n, s) => n + s.w, 0);
const SCORE = Math.round(P.systems.reduce((n, s) => n + s.score * s.w, 0) / wsum);
const MOVE = Math.round(P.systems.reduce((n, s) => n + s.d * s.w, 0) / wsum);

/** A minus sign, not a hyphen — these sit in a column of numbers. */
function sign(n: number): string {
  return n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "0";
}
function tone(n: number): string {
  return n > 0 ? "var(--g)" : n < 0 ? "var(--clay)" : "var(--faint)";
}

const DID = new Map(P.acted.map((a) => [a.k, a.did]));

function Head({ value, color, title, note }: {
  value: string | number;
  color?: string;
  title: string;
  note: string;
}) {
  return (
    <div className="cn-phead">
      <span className="cn-pnum" style={color ? { color } : undefined}>
        {value}
      </span>
      <span className="cn-pw">
        <b>{title}</b>
        <i>{note}</i>
      </span>
    </div>
  );
}

export function ConsolePanel() {
  const moved = [...P.systems].sort((a, b) => b.d - a.d);

  return (
    <div className="cn-testgrid">
      <div className="cn-tcard">
        <span className="lab">Your last panel · {P.date}</span>
        <Head
          value={SCORE}
          title={`${P.markers} markers`}
          note="Scored against optimal, not the lab's normal range"
        />
        <div className="cn-sysrows">
          {P.systems.map((s) => (
            <div className="cn-sysrow" key={s.k}>
              <span className="cn-sname">
                {s.name}
                <em>{s.lead}</em>
              </span>
              <span className="cn-sscore">{s.score}</span>
              {/* the bar is where you are; the tick is where optimal is, so
                  the distance between them is the whole of the row */}
              <span className="cn-sbar">
                <i style={{ width: `${s.score}%` }} />
                <u style={{ left: `${s.opt}%` }} title="optimal" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="cn-tcard">
        <span className="lab">What changed after you acted</span>
        <Head
          value={sign(MOVE)}
          color={tone(MOVE)}
          title={`since ${P.prev}`}
          note="Weighted across the same seven systems"
        />
        <div className="cn-sysrows">
          {moved.map((s) => (
            <div className="cn-chrow" key={s.k}>
              <span className="cn-cd" style={{ color: tone(s.d) }}>
                {sign(s.d)}
              </span>
              <span className="cn-cn">{s.name}</span>
              <span className="cn-cw">{DID.get(s.k) ?? "—"}</span>
            </div>
          ))}
        </div>
        <p className="cn-bn">
          Measured against the panel before it — not claimed, and not a
          testimonial. <em className="cn-demoem">These markers are a demo
          account, not a real person&rsquo;s bloodwork.</em>
        </p>
      </div>
    </div>
  );
}
