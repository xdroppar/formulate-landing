"use client";

/**
 * The shelf — six real products, under the claim they demonstrate.
 *
 * Section 01 says "every item comes back scored, with the weak link named".
 * Nothing on the page showed that, so the claim sat on trust. These are real
 * products with their real scores, each linking to the page where the
 * components behind that number are broken out.
 *
 * Presentational only: the catalogs are read on the server (lib/console-shelf)
 * and six small objects arrive as props. This component imports no data, which
 * is deliberate — see that file for what happened when it did.
 *
 * WHY THREE CATALOGS AND NOT THE PROTOTYPE'S SIX. The mockup's shelf showed
 * one product from each of six, including two kinds of gear that carry no
 * cross-category score and one — body measurement — that exists in no
 * repository at all; it was compiled by hand for the mockup and marked
 * PROPOSED. None of those belong on a public page. The three here are the
 * catalogs this site actually serves, and every card links somewhere real.
 */
import Link from "next/link";
import type { ShelfCard } from "@/lib/console-shelf";

/** The score, as a ring on the picture's corner. */
function Ring({ score, color }: { score: number; color: string }) {
  const R = 12;
  const TAU = 2 * Math.PI * R;
  return (
    <span className="cn-meter">
      <svg viewBox="0 0 30 30" width="30" height="30" aria-hidden="true">
        <circle cx="15" cy="15" r={R} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="3" />
        <circle
          cx="15"
          cy="15"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${((TAU * score) / 100).toFixed(1)} ${TAU.toFixed(1)}`}
          transform="rotate(-90 15 15)"
        />
      </svg>
      <i style={{ color }}>{score}</i>
    </span>
  );
}

export function ConsoleShelf({ cards, total }: { cards: ShelfCard[]; total: number }) {
  if (!cards.length) return null;
  return (
    <div className="cn-shelf">
      {cards.map((c) => (
        <Link className="cn-card" href={c.href} key={c.key}>
          <span className="cn-cat">{c.catalog}</span>
          <span className="cn-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt="" loading="lazy" decoding="async" />
            <Ring score={c.score} color={c.color} />
          </span>
          <span className="cn-nm">{c.name}</span>
          {c.sub ? <span className="cn-cardsub">{c.sub}</span> : null}
        </Link>
      ))}
      <p className="cn-shelfnote">
        Six of {total.toLocaleString()} scored items on this site — the highest
        in each catalog that has a photograph. Open one to see the components
        behind the number.
      </p>
    </div>
  );
}
