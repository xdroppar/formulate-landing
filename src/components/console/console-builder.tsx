"use client";

/**
 * 01 · the stack builder, in the console.
 *
 * This is the thing the section's layout is FOR: the shelf sits beside the
 * headline rather than across the page so there is room underneath for
 * somebody to actually build something. A section that says "add your stack
 * and it scores in front of you" and then offers nowhere to add it is a
 * promise with no door.
 *
 * ONE SOURCE OF ITEMS. It reads /api/score-index — the same endpoint the
 * homepage's HeroStackBuilder reads, 1,459 scored supplements and whole foods.
 * A second index for the second builder is the drift this repo has a standing
 * rule about, and the endpoint already exists.
 *
 * NO STACK SCORE, AND THAT IS DELIBERATE. HeroStackBuilder's comment is worth
 * repeating because the temptation here is identical: the app's real
 * stack score "is 820 lines across four more modules, and copying it would put
 * scoring in a THIRD repo". The weakest link needs none of it — it is a min()
 * over data already in the index — and it is the more useful answer anyway.
 * Someone can act on "this one is underdosed". Nobody can act on "your stack
 * is 87". So the ring shows the weakest item and says so, rather than showing
 * a composite nobody computed.
 *
 * THE PILLARS ARE READ, NOT LISTED. They come from lib/pillars, the same
 * authority the site nav uses, and a chip is only active if the index actually
 * holds items for it. Nutrients is absent on purpose: a nutrient is not
 * something you add to a stack, it is what having added things gets you.
 */
import { useEffect, useMemo, useState } from "react";
import type { ScoreItem } from "@/components/landing/hero-stack-builder";
import { PILLARS } from "@/lib/pillars";

/** Which index `kind` each pillar can offer, where it can offer one. */
const PILLAR_KIND: Record<string, ScoreItem["kind"] | undefined> = {
  supplements: "supplement",
  foods: "food",
};

const CHIPS = PILLARS.filter((p) => p.slug !== "nutrients");

export function ConsoleBuilder() {
  const [index, setIndex] = useState<ScoreItem[]>([]);
  const [ready, setReady] = useState(false);
  const [q, setQ] = useState("");
  const [pillar, setPillar] = useState<string | null>(null);
  const [stack, setStack] = useState<ScoreItem[]>([]);

  useEffect(() => {
    let live = true;
    fetch("/api/score-index")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => {
        if (!live) return;
        setIndex(Array.isArray(d) ? d : (d.items ?? []));
        setReady(true);
      })
      /* An empty index makes the box say it found nothing, which is true of
         what it can see. It must not pretend to be still loading forever. */
      .catch(() => live && setReady(true));
    return () => {
      live = false;
    };
  }, []);

  /** How many items each chip can actually offer. A chip that filters to
   *  nothing is a button that does nothing, so it is shown as not ready. */
  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const p of CHIPS) {
      const kind = PILLAR_KIND[p.slug];
      out[p.slug] = kind ? index.filter((i) => i.kind === kind).length : 0;
    }
    return out;
  }, [index]);

  const term = q.trim().toLowerCase();
  const offered = useMemo(() => {
    const kind = pillar ? PILLAR_KIND[pillar] : undefined;
    const picked = new Set(stack.map((i) => i.slug));
    return index
      .filter((i) => !picked.has(i.slug))
      .filter((i) => (kind ? i.kind === kind : true))
      .filter((i) =>
        term ? `${i.name} ${i.brand}`.toLowerCase().includes(term) : Boolean(kind),
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [index, term, pillar, stack]);

  const weakest = stack.length
    ? stack.reduce((w, i) => (i.score < w.score ? i : w), stack[0])
    : null;

  return (
    <div className="cn-builder">
      <div className="cn-bcol">
        <div className="cn-pickhead">
          <span className="lab">Pick a pillar</span>
          <label className="cn-searchwrap">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9.4 9.4 12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              autoComplete="off"
              spellCheck={false}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={'or search the catalog — "magnesium", "creatine", "kale"'}
              aria-label="Search the catalog"
            />
          </label>
        </div>

        <div className="cn-pillarpick">
          {CHIPS.map((p) => {
            const n = counts[p.slug] ?? 0;
            const on = pillar === p.slug;
            return (
              <button
                type="button"
                key={p.slug}
                className={`cn-pil ${on ? "on" : ""} ${n ? "" : "soon"}`}
                onClick={() => n && setPillar(on ? null : p.slug)}
                disabled={!n}
                title={n ? `${n} scored` : "Not in the catalog yet"}
              >
                {p.title}
                {n ? <em>{n}</em> : <em className="w">soon</em>}
              </button>
            );
          })}
        </div>

        <span className="lab cn-thenlab">
          {stack.length ? "Your stack so far" : "Then tap what you already take"}
        </span>

        {stack.length > 0 && (
          <div className="cn-picked">
            {stack.map((i) => (
              <button
                type="button"
                key={i.slug}
                className="cn-pick on"
                onClick={() => setStack((s) => s.filter((x) => x.slug !== i.slug))}
                title="Remove"
              >
                <span className="cn-pickn">{i.name}</span>
                <span className="cn-picks" style={{ color: i.color }}>
                  {i.score}
                </span>
              </button>
            ))}
          </div>
        )}

        {offered.length > 0 ? (
          <div className="cn-picked">
            {offered.map((i) => (
              <button
                type="button"
                key={i.slug}
                className="cn-pick"
                onClick={() => setStack((s) => [...s, i])}
              >
                <span className="cn-pickn">{i.name}</span>
                <span className="cn-picks" style={{ color: i.color }}>
                  {i.score}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="cn-bempty">
            {!ready
              ? "Loading the catalog…"
              : term
                ? `Nothing matching “${q.trim()}” in the ${index.length.toLocaleString()} scored items here.`
                : "Nothing added yet — pick a pillar, or search the catalog."}
          </p>
        )}
      </div>

      <div className="cn-verdict">
        <div className="cn-vtop">
          <div className="cn-vring" data-empty={weakest ? undefined : "1"}>
            <span>{weakest ? weakest.score : "—"}</span>
          </div>
          <div>
            <span className="lab">
              {stack.length ? `Your stack · ${stack.length}` : "Your stack"}
            </span>
            <p className="cn-vsum">
              {stack.length
                ? "Tap anything above to add it, or an item here to take it out."
                : "Tap one to begin."}
            </p>
          </div>
        </div>
        <div className="cn-weak">
          <span className="lab">The weak link</span>
          <div className="cn-weakname">{weakest ? weakest.name : "—"}</div>
          <div className="cn-weakwhy">
            {weakest ? weakest.why : "Nothing in your stack yet."}
          </div>
        </div>
      </div>
    </div>
  );
}
