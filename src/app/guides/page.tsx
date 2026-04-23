import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { Guide } from "@/lib/guides";
import { visibleGuides, getAllTags } from "@/lib/guides";
import { withUtm } from "@/lib/app-url";

export const metadata: Metadata = {
  title: "Supplement Guides — Evidence-Based Reviews & Protocols",
  description:
    "Expert supplement guides backed by clinical research. Best-of roundups, stacking protocols, and product deep-dives — no sponsorships, just data.",
  alternates: { canonical: "https://formulate-health.app/guides" },
};

const categoryColors: Record<string, string> = {
  roundup: "text-accent",
  protocol: "text-accent2",
  review: "text-warning",
  guide: "text-accent",
};

const categoryBorders: Record<string, string> = {
  roundup: "border-accent/20",
  protocol: "border-accent2/20",
  review: "border-warning/20",
  guide: "border-accent/20",
};

// Topic → { gradient, icon } map for the 16:9 card banner.
// Resolution order mirrors scripts/generate_guide_thumbnails.mjs: slug wins
// over tags so ingredient mentions inside a sleep-protocol guide don't
// swap its topic. First rule to match wins — specific nutrients first,
// generic protocol/guide fallback last.
type TopicKey =
  | "mineral"
  | "vitaminD"
  | "omega"
  | "liver"
  | "metabolic"
  | "vitamin"
  | "brain"
  | "heart"
  | "hormone"
  | "immune"
  | "gut"
  | "skin"
  | "muscle"
  | "sleep"
  | "energy"
  | "endurance"
  // meta-guide sub-buckets (replaces the old generic "protocol" blueprint spam)
  | "safety"
  | "testing"
  | "research"
  | "interactions"
  | "label"
  | "timing"
  | "compare"
  | "brand"
  | "protocol";

const TOPIC_RULES: Array<[RegExp, TopicKey]> = [
  // --- specific nutrients / compounds (most specific first) ---
  [/\b(magnesium|minerals?|iron|electrolytes?|sodium|potassium|zinc|copper)\b/i, "mineral"],
  [/\b(vitamin d|d3|d2)\b/i, "vitaminD"],
  [/\b(omega|fish oil|fatty acids?|epa|dha)\b/i, "omega"],
  [/\b(nac|liver|alcohol|fatty liver|nafld|glutathione)\b/i, "liver"],
  [/\b(berberine|blood sugar|metabolic|diabetes|ampk)\b/i, "metabolic"],
  // multivit\w* fixes the `multivitamin` plural-boundary bug (prior \bmultivit\b
  // failed to match because the word continues).
  [/\b(vitamins?|multivit\w*|b12|folate|nutrients?|deficienc)\b/i, "vitamin"],
  [/\b(brain|cognitive|mental|nootropics?|focus|memory|adhd|choline|lions?|alpha[- ]?gpc|citicoline)\b/i, "brain"],
  [/\b(heart|cardio|longevity|blood pressure|cholesterol|taurine|coq10)\b/i, "heart"],
  [/\b(hormones?|testosterone|estrogen|thyroid|adaptogens?|ashwagandha|rhodiola|pcos|menopause|perimenopause)\b/i, "hormone"],
  [/\b(immun|inflamm|anti[- ]?oxidants?|quercetin)\b/i, "immune"],
  [/\b(gut|probiotics?|prebiotics?|digest|microbiome|ibs)\b/i, "gut"],
  [/\b(skin|collagen|hair|beauty|joint|cartilage|arthritis)\b/i, "skin"],
  [/\b(muscle|strength|creatine|recovery|protein)\b/i, "muscle"],
  [/\b(sleep|melatonin|insomnia|circadian|glycine|calm|anxiety)\b/i, "sleep"],
  [/\b(pre[- ]?workout|caffeine|beta[- ]?alanine|energy|performance|sport)\b/i, "energy"],
  [/\b(endurance|running|runner|cycling|athlete|marathon)\b/i, "endurance"],
  // --- meta-guide sub-buckets (previously all dumped into "protocol") ---
  // Order matters: drug-interactions must fire before "safety" since the
  // interactions guide also tags Safety.
  [/\b(interactions?|drug)\b/i, "interactions"],
  [/\b(third[- ]?party|usp|nsf|informed sport|certification|tested|testing)\b/i, "testing"],
  [/\b(safety|regulation|fda)\b/i, "safety"],
  // label/timing win over the broader "how to read" / research rule when the
  // slug itself names them.
  [/\blabel\b/i, "label"],
  [/\btiming\b/i, "timing"],
  [/\b(research|evidence|methodology|claim|how to read)\b/i, "research"],
  [/\b(vs|versus|comparison)\b/i, "compare"],
  [/\b(thorne|now|life extension|pure encapsulations|nordic naturals|best-of|brand review|roundup)\b/i, "brand"],
  // Final fallback: stack-building / beginner / generic protocol.
  [/\b(protocol|stack|beginner|guide|how to|build)\b/i, "protocol"],
];

function topicFor(guide: Guide): TopicKey {
  const slugHay = (guide.slug || "").replace(/-/g, " ");
  for (const [rx, key] of TOPIC_RULES) if (rx.test(slugHay)) return key;
  const tagHay = [guide.title, ...(guide.tags || [])].join(" ");
  for (const [rx, key] of TOPIC_RULES) if (rx.test(tagHay)) return key;
  return "protocol";
}

// Full class strings so Tailwind's JIT can statically extract them.
const TOPIC_GRADIENTS: Record<TopicKey, string> = {
  mineral:      "bg-gradient-to-br from-accent2/25 via-accent2/8 to-transparent",
  vitaminD:     "bg-gradient-to-br from-warning/25 via-warning/8 to-transparent",
  omega:        "bg-gradient-to-br from-accent/20 via-accent/5 to-transparent",
  liver:        "bg-gradient-to-br from-accent2/20 via-accent/5 to-transparent",
  metabolic:    "bg-gradient-to-br from-warning/20 via-accent/5 to-transparent",
  vitamin:      "bg-gradient-to-br from-warning/25 via-accent/8 to-transparent",
  brain:        "bg-gradient-to-br from-accent2/25 via-accent2/8 to-transparent",
  heart:        "bg-gradient-to-br from-danger/20 via-warning/5 to-transparent",
  hormone:      "bg-gradient-to-br from-accent2/20 via-danger/5 to-transparent",
  immune:       "bg-gradient-to-br from-accent/20 via-accent2/5 to-transparent",
  gut:          "bg-gradient-to-br from-accent/20 via-warning/5 to-transparent",
  skin:         "bg-gradient-to-br from-warning/20 via-accent2/5 to-transparent",
  muscle:       "bg-gradient-to-br from-accent/25 via-accent/8 to-transparent",
  sleep:        "bg-gradient-to-br from-accent2/25 via-accent2/8 to-transparent",
  energy:       "bg-gradient-to-br from-warning/25 via-warning/8 to-transparent",
  endurance:    "bg-gradient-to-br from-warning/20 via-accent/5 to-transparent",
  // meta-guide buckets — mixed palettes to visually separate them on the grid
  safety:       "bg-gradient-to-br from-danger/20 via-accent2/5 to-transparent",
  testing:      "bg-gradient-to-br from-accent/20 via-accent2/5 to-transparent",
  research:     "bg-gradient-to-br from-accent2/20 via-warning/5 to-transparent",
  interactions: "bg-gradient-to-br from-warning/20 via-danger/5 to-transparent",
  label:        "bg-gradient-to-br from-accent/20 via-warning/5 to-transparent",
  timing:       "bg-gradient-to-br from-accent2/20 via-accent/5 to-transparent",
  compare:      "bg-gradient-to-br from-accent2/25 via-warning/5 to-transparent",
  brand:        "bg-gradient-to-br from-warning/20 via-accent/8 to-transparent",
  protocol:     "bg-gradient-to-br from-accent/20 via-accent2/5 to-transparent",
};

const TOPIC_ICON_COLORS: Record<TopicKey, string> = {
  mineral:      "text-accent2",
  vitaminD:     "text-warning",
  omega:        "text-accent",
  liver:        "text-accent2",
  metabolic:    "text-warning",
  vitamin:      "text-warning",
  brain:        "text-accent2",
  heart:        "text-danger",
  hormone:      "text-accent2",
  immune:       "text-accent",
  gut:          "text-accent",
  skin:         "text-warning",
  muscle:       "text-accent",
  sleep:        "text-accent2",
  energy:       "text-warning",
  endurance:    "text-warning",
  safety:       "text-danger",
  testing:      "text-accent",
  research:     "text-accent2",
  interactions: "text-warning",
  label:        "text-accent",
  timing:       "text-accent2",
  compare:      "text-accent2",
  brand:        "text-warning",
  protocol:     "text-accent",
};

/**
 * Inline SVG emblems — one per topic. 1.6 stroke, centered in a 48×48 viewBox.
 * Kept in the page to avoid a new dep (no lucide-react / heroicons installed).
 */
function TopicIcon({ topic, className }: { topic: TopicKey; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 48 48",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (topic) {
    case "mineral":
      return (
        <svg {...common}>
          <path d="M24 6 L38 18 L24 42 L10 18 Z" />
          <path d="M10 18 L38 18" />
          <path d="M24 6 L24 42" />
          <path d="M17 18 L24 6 L31 18" />
        </svg>
      );
    case "vitaminD":
      return (
        <svg {...common}>
          <circle cx="24" cy="30" r="9" />
          <path d="M24 12 L24 6 M12 18 L7 15 M36 18 L41 15 M14 24 L9 24 M34 24 L39 24" />
        </svg>
      );
    case "omega":
      return (
        <svg {...common}>
          <path d="M6 28 C 12 16, 18 16, 24 24 S 36 32, 42 20" />
          <path d="M6 34 C 12 22, 18 22, 24 30 S 36 38, 42 26" opacity="0.5" />
        </svg>
      );
    case "liver":
      return (
        <svg {...common}>
          <path d="M8 14 H40" />
          <path d="M10 22 H38" opacity="0.7" />
          <path d="M12 30 H36" opacity="0.5" />
          <path d="M14 38 H34" opacity="0.35" />
        </svg>
      );
    case "metabolic":
      return (
        <svg {...common}>
          <path d="M24 8 V40" />
          <path d="M10 16 H38" />
          <circle cx="14" cy="26" r="6" />
          <circle cx="34" cy="26" r="6" />
        </svg>
      );
    case "vitamin":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="6" />
          <path d="M24 6 V14 M24 34 V42 M6 24 H14 M34 24 H42 M11 11 L17 17 M31 31 L37 37 M11 37 L17 31 M31 17 L37 11" />
        </svg>
      );
    case "brain":
      return (
        <svg {...common}>
          <circle cx="12" cy="14" r="2" />
          <circle cx="36" cy="14" r="2" />
          <circle cx="24" cy="24" r="2" />
          <circle cx="12" cy="34" r="2" />
          <circle cx="36" cy="34" r="2" />
          <circle cx="24" cy="40" r="2" />
          <path d="M12 14 L24 24 L36 14 M24 24 L12 34 M24 24 L36 34 M12 34 L24 40 L36 34" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="5" />
          <circle cx="24" cy="24" r="11" opacity="0.55" />
          <circle cx="24" cy="24" r="17" opacity="0.3" />
        </svg>
      );
    case "hormone":
      return (
        <svg {...common}>
          <circle cx="18" cy="24" r="9" />
          <circle cx="30" cy="24" r="9" />
        </svg>
      );
    case "immune":
      return (
        <svg {...common}>
          <path d="M24 8 V40 M8 24 H40 M13 13 L35 35 M13 35 L35 13" />
          <path d="M24 14 L21 17 M24 14 L27 17 M24 34 L21 31 M24 34 L27 31 M14 24 L17 21 M14 24 L17 27 M34 24 L31 21 M34 24 L31 27" />
        </svg>
      );
    case "gut":
      return (
        <svg {...common}>
          <path d="M24 8 C 14 8, 14 18, 24 18 C 34 18, 34 28, 24 28 C 14 28, 14 38, 24 38 C 30 38, 32 34, 32 32" />
        </svg>
      );
    case "skin":
      return (
        <svg {...common}>
          <path d="M12 18 C 18 24, 30 24, 36 18" />
          <path d="M12 24 C 18 30, 30 30, 36 24" />
          <path d="M12 30 C 18 36, 30 36, 36 30" />
        </svg>
      );
    case "muscle":
      return (
        <svg {...common}>
          <path d="M6 38 L18 18 L26 30 L34 12 L42 38 Z" />
        </svg>
      );
    case "sleep":
      return (
        <svg {...common}>
          <path d="M32 10 A 14 14 0 1 0 38 32 A 11 11 0 0 1 32 10 Z" />
          <circle cx="14" cy="14" r="0.8" fill="currentColor" />
          <circle cx="20" cy="8" r="0.8" fill="currentColor" />
          <circle cx="10" cy="22" r="0.8" fill="currentColor" />
        </svg>
      );
    case "energy":
      return (
        <svg {...common}>
          <path d="M26 6 L12 26 L22 26 L18 42 L34 22 L24 22 L28 6 Z" />
        </svg>
      );
    case "endurance":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="5" />
          <path d="M24 8 V3 M24 45 V40 M8 24 H3 M45 24 H40 M12 12 L9 9 M36 36 L39 39 M12 36 L9 39 M36 12 L39 9 M24 13 V6 M24 42 V35 M13 24 H6 M42 24 H35" />
        </svg>
      );
    case "safety":
      return (
        <svg {...common}>
          <path d="M24 6 L38 12 V26 C 38 34, 32 40, 24 42 C 16 40, 10 34, 10 26 V12 Z" />
          <path d="M19 24 L23 28 L30 20" />
        </svg>
      );
    case "testing":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="15" />
          <circle cx="24" cy="24" r="10" opacity="0.4" />
          <path d="M18 24 L22 28 L30 20" />
        </svg>
      );
    case "research":
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="10" />
          <path d="M28 28 L38 38" />
          <path d="M16 20 H24 M20 16 V24" opacity="0.6" />
        </svg>
      );
    case "interactions":
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="8" />
          <circle cx="30" cy="30" r="8" />
          <path d="M24 10 L24 14 M10 24 L14 24 M34 24 L38 24 M24 34 L24 38" opacity="0.55" />
        </svg>
      );
    case "label":
      return (
        <svg {...common}>
          <rect x="12" y="8" width="24" height="32" rx="1.5" />
          <path d="M17 16 H31 M17 22 H31 M17 28 H27" opacity="0.7" />
        </svg>
      );
    case "timing":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="15" />
          <path d="M24 15 L24 24 L31 28" />
          <path d="M24 11 V13 M24 35 V37 M11 24 H13 M35 24 H37" opacity="0.6" />
        </svg>
      );
    case "compare":
      return (
        <svg {...common}>
          <path d="M16 14 L10 20 L16 26" />
          <path d="M10 20 H38" />
          <path d="M32 22 L38 28 L32 34" />
          <path d="M10 28 H38" />
        </svg>
      );
    case "brand":
      return (
        <svg {...common}>
          <path d="M24 6 L38 12 V24 C 38 33, 32 38, 24 42 C 16 38, 10 33, 10 24 V12 Z" />
          <circle cx="24" cy="24" r="5" opacity="0.5" />
        </svg>
      );
    case "protocol":
    default:
      return (
        <svg {...common}>
          <rect x="8" y="8" width="32" height="32" rx="1" />
          <rect x="14" y="14" width="20" height="20" rx="1" opacity="0.7" />
          <path d="M8 18 H40 M8 30 H40 M18 8 V40 M30 8 V40" opacity="0.4" />
        </svg>
      );
  }
}

export default function GuidesPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-[960px] mx-auto">
        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">
          Evidence-Based
        </div>
        <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1px] mb-3">
          Supplement Guides
        </h1>
        <p className="text-base text-muted max-w-[540px] mb-12 leading-relaxed">
          Best-of roundups, stacking protocols, and deep-dives — every
          recommendation backed by clinical research and scored in our catalog.
        </p>

        {/* CTA banner */}
        <div className="mb-10 p-6 rounded-2xl bg-surface border border-accent/20 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-text mb-1">
              See how your supplements score
            </div>
            <div className="text-sm text-muted">
              230+ products scored 50–100 against clinical research. Free, no account required.
            </div>
          </div>
          <a
            href={withUtm("https://app.formulate-health.app/catalog", {
              source: "guides_hub",
              campaign: "guides_hub_banner",
            })}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
          >
            Browse Scores
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Browse by topic */}
        <div className="mb-10">
          <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted mb-3">
            Browse by topic
          </div>
          <div className="flex flex-wrap gap-2">
            {getAllTags().slice(0, 20).map(({ tag, slug, count }) => (
              <Link
                key={slug}
                href={`/guides/tag/${slug}`}
                className="px-3 py-1.5 rounded-full text-xs text-muted bg-surface border border-border hover:border-accent/30 hover:text-text transition-all"
              >
                {tag} <span className="text-muted/70">· {count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {visibleGuides.map((guide) => {
            const topic = topicFor(guide);
            return (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className={`group block rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all overflow-hidden`}
            >
              <div
                className={`relative w-full aspect-[16/9] overflow-hidden ${
                  guide.thumbnail ? "bg-bg" : TOPIC_GRADIENTS[topic]
                }`}
              >
                {guide.thumbnail ? (
                  <Image
                    src={guide.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 460px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TopicIcon
                      topic={topic}
                      className={`w-28 h-28 opacity-45 transition-all duration-500 group-hover:opacity-65 group-hover:scale-[1.05] ${TOPIC_ICON_COLORS[topic]}`}
                    />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-[10px] font-bold tracking-[1.5px] uppercase ${
                      categoryColors[guide.category] || "text-accent"
                    }`}
                  >
                    {guide.categoryLabel}
                  </span>
                  <span className="text-[10px] text-muted">{guide.readTime}</span>
                  {guide.isNew && (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wide uppercase bg-accent/15 text-accent border border-accent/25">
                      New
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold leading-snug mb-2 group-hover:text-accent transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                  {guide.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {guide.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded-full text-[10px] text-muted bg-bg border ${
                        categoryBorders[guide.category] || "border-border"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
