import en from "./messages/en.json";
import es from "./messages/es.json";
import de from "./messages/de.json";
import zh from "./messages/zh.json";

import { DEFAULT_LOCALE, getLocale } from "./locales";

export type Messages = typeof en;

const CATALOGS: Record<string, unknown> = { en, es, de, zh };

/**
 * Deep-merge a catalog over English so an untranslated key renders the English
 * string, never the raw key path. "nav.items.brands.title" leaking into a page
 * is a bug report from a user; "Brands" inside a Spanish nav is merely
 * incomplete.
 */
function mergeOverEnglish(base: unknown, override: unknown): unknown {
  if (
    typeof base !== "object" || base === null || Array.isArray(base) ||
    typeof override !== "object" || override === null || Array.isArray(override)
  ) {
    return override ?? base;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(override as Record<string, unknown>)) {
    out[k] = k in out ? mergeOverEnglish((base as Record<string, unknown>)[k], v) : v;
  }
  return out;
}

export function getMessages(locale: string): Messages {
  const code = getLocale(locale)?.code ?? DEFAULT_LOCALE;
  if (code === DEFAULT_LOCALE) return en;
  const catalog = CATALOGS[code];
  return catalog ? (mergeOverEnglish(en, catalog) as Messages) : en;
}

/** Dot-path lookup with `{name}` interpolation. Falls back to the key path. */
export function translate(
  messages: Messages,
  key: string,
  vars?: Record<string, string | number>,
): string {
  let node: unknown = messages;
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null) return key;
    node = (node as Record<string, unknown>)[part];
  }
  if (typeof node !== "string") return key;
  if (!vars) return node;
  return node.replace(/\{(\w+)\}/g, (m, name) =>
    name in vars ? String(vars[name]) : m,
  );
}
