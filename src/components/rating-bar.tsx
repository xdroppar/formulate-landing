"use client";

/**
 * FIVE STARS, ONE TAP — the first signal out of real readers.
 *
 * Nothing on either site has ever asked a visitor what they think. The
 * feedback API has shipped for months and the only door to it is a button in
 * a sidebar the console no longer renders, so "zero feedback" was never a
 * verdict on the product; nothing reached anybody. The plan is
 * clawd/FEEDBACK-PLAN.md; this is its first piece.
 *
 * WHY A RATING AND NOT A BOX. At zero responses friction decides everything.
 * A star is one tap, a textarea is a small essay, so the volume signal comes
 * first and the people who care get to type second.
 *
 * THE FIRST CLICK IS THE SUBMISSION. No confirm button, no modal, nothing to
 * take over the page: the bar replaces itself with what happens next. That
 * also means the row is written before anyone can close the tab, which is
 * why the POST is not held back to be merged with the optional text — a lost
 * rating costs more than a second row in an inbox that currently gets none.
 *
 * ROUTED BY SCORE. Four or five: thank them and ask nothing, with a quiet
 * offer to say why. Three or below: the box is open already, because someone
 * who has just said it was bad is the most willing they will ever be to say
 * what was wrong. No store-review prompt at any score — the web app has no
 * listing, and asking for a public review before the product retains anyone
 * is borrowing credit it has not earned.
 *
 * WHAT IS PROMISED. "I read every one. I reply in batches, when I can." Being
 * read is the promise; being answered is not, and a reply SLA is exactly the
 * ongoing job the owner has ruled out.
 *
 * THE PART WORTH MORE THAN THE NUMBER. `anon_id` rides with the event, and
 * PostHog's distinct_id is bootstrapped from that same id, so a one-star
 * rating links to that person's session replay: the rating says something is
 * wrong, the replay shows what they were looking at when they decided it.
 *
 * ASKED ONCE. Per surface family, not per page — a reader of five guides is
 * asked once — kept in localStorage, and never again inside 60 days.
 */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getAnonId, trackEvent } from "@/lib/analytics";
import { useT } from "@/components/i18n-provider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://formulate-api.onrender.com";
const KEY = "formulate_rating_v1";
const QUIET_DAYS = 60;

type Seen = Record<string, { at: string; score: number }>;

function read(): Seen {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Seen) : {};
  } catch {
    return {};
  }
}

/** Asked here before, and recently enough that asking again is nagging. */
function asked(surface: string): boolean {
  const r = read()[surface];
  if (!r) return false;
  const at = Date.parse(r.at);
  if (!Number.isFinite(at)) return true;
  return Date.now() - at < QUIET_DAYS * 86_400_000;
}

function remember(surface: string, score: number) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...read(), [surface]: { at: new Date().toISOString(), score } }));
  } catch {
    /* private window: it asks again next visit, which is the safe way to be wrong */
  }
}

function send(message: string) {
  try {
    void fetch(`${API_URL}/api/v1/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ category: "rating", message: message.slice(0, 5000) }),
    }).catch(() => {
      /* fire and forget: the event carries the score either way */
    });
  } catch {
    /* ignore */
  }
}

/** Nothing changes this while the page is open but this component itself. */
function subscribeNever(): () => void {
  return () => {};
}

function Star({ on }: { on: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden
      fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" />
    </svg>
  );
}

export function RatingBar({
  /** Which kind of page this is — the unit someone is asked about once. */
  surface,
  /** The exact page, sent with the rating so a score can be placed. */
  detail,
}: {
  surface: string;
  detail: string;
}) {
  const t = useT();
  const [score, setScore] = useState<number | null>(null);
  const [hover, setHover] = useState(0);
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const [sentNote, setSentNote] = useState(false);
  const box = useRef<HTMLInputElement>(null);

  /* WHETHER TO ASK AT ALL is a client answer — it lives in localStorage — so
     it is read as one: the server snapshot is false, and the first client
     render is the first time the bar can exist. An effect that set state
     instead would render the bar to everyone for a frame, including people
     who already rated (and the lint ratchet rightly refuses that shape). */
  const eligible = useSyncExternalStore(subscribeNever, () => !asked(surface), () => false);

  useEffect(() => {
    if (open) box.current?.focus();
  }, [open]);

  /* Once they have rated, the bar stays for its thank-you: `eligible` has
     already flipped false, because rating is what writes the record. */
  if (!eligible && score == null) return null;

  const pick = (n: number) => {
    setScore(n);
    remember(surface, n);
    send(`${n}/5 · ${detail}`);
    trackEvent("rating_submit", { score: n, surface, detail, anon_id: getAnonId() ?? null });
    /* Low scores open the box themselves; high ones only offer it. */
    if (n <= 3) setOpen(true);
  };

  const sendNote = () => {
    const text = note.trim();
    if (!text) return;
    send(`${score}/5 · ${detail} — ${text}`);
    trackEvent("rating_note", { score, surface, detail, anon_id: getAnonId() ?? null });
    setSentNote(true);
    setOpen(false);
  };

  return (
    <section
      className="mt-14 rounded-xl border border-border bg-surface/40 px-5 py-4"
      aria-label={t("rating.aria")}
      data-rating={score ?? "open"}
    >
      {score == null ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">{t("rating.ask")}</p>
          <div className="flex items-center gap-1 text-accent" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => pick(n)}
                onMouseEnter={() => setHover(n)}
                onFocus={() => setHover(n)}
                aria-label={t(n === 1 ? "rating.one" : "rating.many", { n: String(n) })}
                className="rounded p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                data-star={n}
              >
                <Star on={n <= hover} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-text">
              {sentNote ? t("rating.noteSent") : score >= 4 ? t("rating.thanks") : t("rating.sorry")}
            </p>
            <div className="flex items-center gap-1 text-accent/70" aria-hidden>
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className="p-1">
                  <Star on={n <= score} />
                </span>
              ))}
            </div>
          </div>
          {!open && !sentNote && score >= 4 && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-1 text-xs text-muted underline underline-offset-2 hover:text-text"
              data-action="say-why"
            >
              {t("rating.why")}
            </button>
          )}
          {open && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                <input
                  ref={box}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendNote();
                  }}
                  placeholder={score >= 4 ? t("rating.placeholderHigh") : t("rating.placeholderLow")}
                  maxLength={500}
                  className="min-w-0 flex-1 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-muted/70 focus:border-accent/40 focus:outline-none"
                  data-note
                />
                <button
                  type="button"
                  onClick={sendNote}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-all hover:bg-[#00ffb3]"
                  data-action="send-note"
                >
                  {t("rating.send")}
                </button>
              </div>
              {/* The whole promise, at the moment of sending it. */}
              <p className="mt-2 text-xs text-muted/70">{t("rating.promise")}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
