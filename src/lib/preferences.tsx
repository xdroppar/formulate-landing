"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ── Accent color presets ─────────────────────────────────────────── */
export const ACCENT_PRESETS = [
  { name: "Green", value: "#00e5a0" },
  { name: "Purple", value: "#7c6dfa" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Pink", value: "#f472b6" },
  { name: "Orange", value: "#fb923c" },
  { name: "Cyan", value: "#22d3ee" },
  { name: "Yellow", value: "#facc15" },
  { name: "Red", value: "#ef4444" },
] as const;

/* ── Currency options ─────────────────────────────────────────────── */
export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "\u20ac", label: "Euro" },
  { code: "GBP", symbol: "\u00a3", label: "British Pound" },
  { code: "CAD", symbol: "CA$", label: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "JPY", symbol: "\u00a5", label: "Japanese Yen" },
] as const;

/* ── Shape ────────────────────────────────────────────────────────── */
export interface Preferences {
  accentColor: string;
  currency: string;
}

const DEFAULTS: Preferences = {
  accentColor: "#00e5a0",
  currency: "USD",
};

const STORAGE_KEY = "formulate_prefs";

interface PreferencesContextValue extends Preferences {
  setAccentColor: (color: string) => void;
  setCurrency: (code: string) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function loadPrefs(): Preferences {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function savePrefs(prefs: Preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* quota exceeded — ignore */
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULTS);

  /* hydrate from localStorage after mount (avoids SSR mismatch) */
  useEffect(() => {
    setPrefs(loadPrefs());
  }, []);

  /* apply accent color as CSS variable */
  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", prefs.accentColor);
  }, [prefs.accentColor]);

  const setAccentColor = useCallback((color: string) => {
    setPrefs((prev) => {
      const next = { ...prev, accentColor: color };
      savePrefs(next);
      return next;
    });
  }, []);

  const setCurrency = useCallback((code: string) => {
    setPrefs((prev) => {
      const next = { ...prev, currency: code };
      savePrefs(next);
      return next;
    });
  }, []);

  return (
    <PreferencesContext.Provider
      value={{ ...prefs, setAccentColor, setCurrency }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
