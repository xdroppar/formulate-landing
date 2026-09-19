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
 * ONE SOURCE OF ITEMS. It reads /api/score-index — scored supplements and
 * whole foods, plus the care, fitness and sleep gear. It replaced the old hero
 * builder, which read the same endpoint.
 *
 * LOADED ON APPROACH, NOT ON ARRIVAL. The index is ~70–90 KB compressed and
 * ~620 KB of JSON to parse, and this builder sits two screens down on a phone.
 * Fetching it on mount made every homepage visit pay for it, including the
 * majority who never scroll here. It now starts when the builder is within
 * about a screen of the viewport, or on the first touch of the builder,
 * whichever comes first.
 *
 * NO STACK SCORE, AND THAT IS DELIBERATE. The old hero builder's reasoning is
 * worth repeating because the temptation here is identical: the app's real
 * stack score "is 820 lines across four more modules, and copying it would put
 * scoring in a THIRD repo". The weakest link needs none of it — it is a min()
 * over data already in the index — and it is the more useful answer anyway.
 * Someone can act on "this one is underdosed". Nobody can act on "your stack
 * is 87". So the ring shows the weakest item and says so, rather than showing
 * a composite nobody computed.
 *
 * THE PILLARS ARE READ, NOT LISTED. They come from lib/pillars, the same
 * authority the site nav uses. A chip filters in place where the index can
 * serve it and opens the app's catalog where it cannot — see PILLAR_BROWSE.
 * Nutrients is absent on purpose: a nutrient is not something you add to a
 * stack, it is what having added things gets you.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ScoreItem } from "@/lib/score-index";
import { PILLARS } from "@/lib/pillars";
import { trackEvent } from "@/lib/analytics";
import { withUtm } from "@/lib/app-url";

/** Which index `kind` each pillar can offer, where it can offer one. */
/* Every pillar the picker offers now filters in place. Sleep, fitness and
   personal care used to be missing from this map — not gated, just absent
   from the index, because their catalogs lived only in the web app. They are
   mirrored here now (see lib/gear), so the chip is a filter like the rest
   rather than a door out of the page. */
const PILLAR_KIND: Record<string, ScoreItem["kind"] | undefined> = {
  supplements: "supplement",
  foods: "food",
  "personal-care": "care",
  fitness: "fitness",
  sleep: "sleep",
};

/**
 * Where a pillar's catalog lives when this page cannot serve it.
 *
 * NOW A FALLBACK, NOT THE NORMAL PATH. All five pillars are in the index —
 * the three that used to be doors (sleep, fitness, personal care) are
 * mirrored into this repo by scripts/sync-from-web and filter in place like
 * the others. This branch only fires if a catalog arrives empty, where a chip
 * that filters to nothing would be a button that does nothing; sending that
 * person into the app is better than a dead control.
 *
 * Personal Care browses at /skin — the route is named for the catalog, the
 * label for the pillar.
 */
const PILLAR_BROWSE: Record<string, string> = {
  sleep: "/sleep",
  fitness: "/fitness",
  "personal-care": "/skin",
};
const APP = "https://app.formulate-health.app";

const CHIPS = PILLARS.filter((p) => p.slug !== "nutrients");

/* What goes on the right of a row: the score, or the price where the catalog
   has no score. Sleep gear has none by design and fitness has one for 72 of
   133, so this is the normal case rather than an edge one. Never a 0 and never
   a dash pretending to be a number — an empty right edge would read as "we
   failed to score this" when the truth is "this catalog does not score". */
function rowValue(i: ScoreItem): { text: string; color: string | undefined } {
  if (i.score != null) return { text: String(i.score), color: i.color };
  if (i.price) return { text: i.price, color: undefined };
  return { text: "—", color: undefined };
}

export function ConsoleBuilder() {
  const [index, setIndex] = useState<ScoreItem[]>([]);
  const [ready, setReady] = useState(false);
  const [q, setQ] = useState("");
  const [pillar, setPillar] = useState<string | null>(null);
  const [stack, setStack] = useState<ScoreItem[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const requested = useRef(false);
  const mounted = useRef(true);

  const load = useCallback(() => {
    if (requested.current) return;
    requested.current = true;
    fetch("/api/score-index")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => {
        if (!mounted.current) return;
        setIndex(Array.isArray(d) ? d : (d.items ?? []));
        setReady(true);
      })
      /* An empty index makes the box say it found nothing, which is true of
         what it can see. It must not pretend to be still loading forever. */
      .catch(() => mounted.current && setReady(true));
  }, []);

  useEffect(() => {
    mounted.current = true;
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      load();
      return () => {
        mounted.current = false;
      };
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(el);
    return () => {
      mounted.current = false;
      io.disconnect();
    };
  }, [load]);

  function add(i: ScoreItem) {
    setStack((s) => [...s, i]);
    /* The old hero builder's event, kept by name so the series continues
       across the console swap; `source` says which builder sent it. */
    trackEvent("hero_stack_add", { slug: i.slug, kind: i.kind, size: stack.length + 1, source: "console" });
  }

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
      /* Unscored last, not as zero. Sleep carries no score and coercing it
         would bury 552 real products under every 1-point supplement. */
      .sort((a, b) => (b.score ?? -1) - (a.score ?? -1))
      .slice(0, 8);
  }, [index, term, pillar, stack]);

  /* The weak link is only a claim about things that carry a score. A stack of
     a mattress and a pillow has no weakest member, and naming one would be
     inventing a comparison the catalog explicitly refuses to make. */
  const weakest = (() => {
    const scored = stack.filter((i) => i.score != null);
    if (!scored.length) return null;
    return scored.reduce((w, i) => ((i.score as number) < (w.score as number) ? i : w), scored[0]);
  })();

  /* The door out, which the builder never had: a stack built here was lost on
     the click through, and the app asked for it again. The app's /stack/add
     takes the supplements (its stack is supplements; foods and gear have no
     id there to land on), so only those are sent, and the note says so rather
     than letting a kale pick vanish silently. */
  const keepable = stack.filter((i) => i.kind === "supplement");
  const leftBehind = stack.length - keepable.length;
  const keepUrl = keepable.length
    ? withUtm(`${APP}/stack/add?items=${keepable.map((i) => i.slug).join(",")}`, {
        source: "landing",
        campaign: "console_builder",
        content: String(keepable.length),
      })
    : null;

  return (
    <div className="cn-builder" ref={root} onPointerDown={load} onFocus={load}>
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
            /* Before the index arrives every count is 0, which used to hide
               two chips and turn the other three into links out to the app
               for the moment it took to load. Waiting is not "absent". */
            if (!ready) {
              return (
                <button type="button" key={p.slug} className="cn-pil" disabled>
                  {p.title}
                </button>
              );
            }
            if (!n) {
              const path = PILLAR_BROWSE[p.slug];
              if (!path) return null;
              return (
                <a
                  key={p.slug}
                  className="cn-pil out"
                  href={`${APP}${path}`}
                  title={`${p.title} is catalogued in the app`}
                >
                  {p.title}
                  <em className="w">browse &rarr;</em>
                </a>
              );
            }
            return (
              <button
                type="button"
                key={p.slug}
                className={`cn-pil ${on ? "on" : ""}`}
                onClick={() => setPillar(on ? null : p.slug)}
                title={`${n} in this catalog`}
              >
                {p.title}
                <em>{n}</em>
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
                <span className="cn-picks" style={{ color: rowValue(i).color }}>
                  {rowValue(i).text}
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
                onClick={() => add(i)}
              >
                <span className="cn-pickn">{i.name}</span>
                <span className="cn-picks" style={{ color: rowValue(i).color }}>
                  {rowValue(i).text}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="cn-bempty">
            {!ready
              ? "Loading the catalog…"
              : term
                ? `Nothing matching “${q.trim()}” in the ${index.length.toLocaleString()} items here.`
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
        {keepUrl && (
          <div className="cn-keep">
            <a
              className="act"
              href={keepUrl}
              onClick={() =>
                trackEvent("web_app_cta_click", {
                  source: "console_builder_keep",
                  size: keepable.length,
                  left_behind: leftBehind,
                })
              }
            >
              {keepable.length === 1 ? "Keep it in the app" : `Keep these ${keepable.length} in the app`} &rarr;
            </a>
            <p className="cn-keepnote">
              Free, no card.
              {leftBehind > 0
                ? ` Supplements carry over; foods and gear stay here for now.`
                : ` It opens with your stack already in it.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
