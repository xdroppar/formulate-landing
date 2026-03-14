"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./auth-context";

interface StackContextValue {
  /** Product IDs currently in the stack */
  items: string[];
  /** Check if a product is in the stack */
  has: (productId: string) => boolean;
  /** Add a product — returns false if auth is required (opens modal) */
  add: (productId: string) => boolean;
  /** Remove a product from the stack */
  remove: (productId: string) => void;
  /** Toggle a product in/out of the stack — returns false if auth required */
  toggle: (productId: string) => boolean;
  /** Number of items */
  count: number;
  /** Whether the auth modal should open (set by add/toggle when not signed in) */
  authRequired: boolean;
  /** Dismiss the auth-required flag */
  dismissAuth: () => void;
}

const STORAGE_KEY = "formulate_stack";

function loadStack(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStack(items: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded — best effort
  }
}

const StackContext = createContext<StackContextValue | null>(null);

export function StackProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useAuth();
  const [items, setItems] = useState<string[]>([]);
  const [authRequired, setAuthRequired] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setItems(loadStack());
    setLoaded(true);
  }, []);

  // Persist to localStorage on change (skip initial load)
  useEffect(() => {
    if (loaded) saveStack(items);
  }, [items, loaded]);

  const has = useCallback(
    (id: string) => items.includes(id),
    [items]
  );

  const add = useCallback(
    (id: string): boolean => {
      if (!isSignedIn) {
        setAuthRequired(true);
        return false;
      }
      setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
      return true;
    },
    [isSignedIn]
  );

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggle = useCallback(
    (id: string): boolean => {
      if (!isSignedIn) {
        setAuthRequired(true);
        return false;
      }
      setItems((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
      return true;
    },
    [isSignedIn]
  );

  const dismissAuth = useCallback(() => setAuthRequired(false), []);

  const value = useMemo<StackContextValue>(
    () => ({
      items,
      has,
      add,
      remove,
      toggle,
      count: items.length,
      authRequired,
      dismissAuth,
    }),
    [items, has, add, remove, toggle, authRequired, dismissAuth]
  );

  return (
    <StackContext.Provider value={value}>{children}</StackContext.Provider>
  );
}

export function useStack() {
  const ctx = useContext(StackContext);
  if (!ctx) throw new Error("useStack must be used within StackProvider");
  return ctx;
}
