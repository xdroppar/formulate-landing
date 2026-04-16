import Link from "next/link";
import {
  SEVERITY_META,
  interactions,
  substances,
  type Interaction,
  type Severity,
} from "@/lib/interactions";

function slugForCanonical(canonicalLower: string): string | null {
  const hit = substances.find((s) => s.canonical.toLowerCase() === canonicalLower);
  return hit?.slug ?? null;
}

function tagToCanonical(tag: string): string | null {
  const norm = tag.trim().toLowerCase();
  const exact = substances.find((s) => s.canonical.toLowerCase() === norm);
  if (exact) return exact.canonical.toLowerCase();
  const alias = substances.find((s) => s.aliases.some((a) => a.toLowerCase() === norm));
  if (alias) return alias.canonical.toLowerCase();
  const partial = substances.find(
    (s) =>
      s.canonical.toLowerCase().includes(norm) || norm.includes(s.canonical.toLowerCase()),
  );
  return partial ? partial.canonical.toLowerCase() : null;
}

const SEVERITY_RANK: Severity[] = ["danger", "warning", "caution", "synergy", "info"];

export function RelatedInteractions({ tags }: { tags: string[] }) {
  const focusCanonicals = new Set(
    tags.map(tagToCanonical).filter((v): v is string => v !== null),
  );
  if (focusCanonicals.size === 0) return null;

  const matches: Interaction[] = [];
  const seen = new Set<string>();
  for (const i of interactions) {
    const a = i.substance_a.toLowerCase();
    const b = i.substance_b.toLowerCase();
    if (!focusCanonicals.has(a) && !focusCanonicals.has(b)) continue;
    if (seen.has(i.pair_key)) continue;
    seen.add(i.pair_key);
    matches.push(i);
  }
  if (matches.length === 0) return null;

  matches.sort(
    (x, y) => SEVERITY_RANK.indexOf(x.severity) - SEVERITY_RANK.indexOf(y.severity),
  );
  const top = matches.slice(0, 8);

  const primaryTag = Array.from(focusCanonicals)[0];
  const primarySlug = slugForCanonical(primaryTag);

  return (
    <section className="mt-14 pt-10 border-t border-border">
      <header className="mb-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
            Interactions to know
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-text">
            How these pair with other supplements and medications
          </h2>
        </div>
        <Link
          href="/interactions"
          className="text-sm text-muted hover:text-accent transition-colors whitespace-nowrap"
        >
          Open the checker →
        </Link>
      </header>

      <ul className="space-y-2">
        {top.map((i) => {
          const aSlug = slugForCanonical(i.substance_a.toLowerCase());
          const bSlug = slugForCanonical(i.substance_b.toLowerCase());
          if (!aSlug || !bSlug) return null;
          const [first, second] = [aSlug, bSlug].sort();
          const href = `/interactions/${first}-and-${second}`;
          const meta = SEVERITY_META[i.severity];
          return (
            <li key={i.pair_key}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${meta.border} ${meta.bg} hover:bg-white/5 transition-colors`}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {meta.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${meta.color}`}>
                      {meta.label}
                    </span>
                    <span className="text-sm font-semibold text-text truncate">
                      <span className="capitalize">{i.substance_a}</span>
                      <span className="text-muted mx-1.5">+</span>
                      <span className="capitalize">{i.substance_b}</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5 line-clamp-1">{i.summary}</p>
                </div>
                <span className="text-muted text-sm" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {primarySlug && (
        <p className="text-xs text-muted mt-4">
          Check your full stack in the{" "}
          <Link href="/interactions" className="text-accent hover:underline">
            free interaction checker
          </Link>
          .
        </p>
      )}
    </section>
  );
}
