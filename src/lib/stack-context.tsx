"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./auth-context";
import { api } from "./api";

/* ── Types ───────────────────────────────────────────────────────── */

export interface StackEntry {
  id: string;
  product_id: string;
  variant_id: string | null;
  schedule_time: string | null;
  daily_servings: number;
  notes: string | null;
  added_at: string;
}

interface StackContextValue {
  /** Product IDs currently in the stack */
  items: string[];
  /** Full stack entries from the API */
  entries: StackEntry[];
  /** Whether the stack is still loading from API */
  isLoading: boolean;
  /** Check if a product is in the stack */
  has: (productId: string) => boolean;
  /** Add a product — returns false if auth is required (opens modal) */
  add: (productId: string, scheduleTime?: string) => boolean;
  /** Remove a product from the stack */
  remove: (productId: string) => void;
  /** Toggle a product in/out of the stack — returns false if auth required */
  toggle: (productId: string) => boolean;
  /** Update schedule_time or other fields for a stack item */
  update: (productId: string, updates: { schedule_time?: string; daily_servings?: number }) => void;
  /** Number of items */
  count: number;
  /** Whether the auth modal should open (set by add/toggle when not signed in) */
  authRequired: boolean;
  /** Dismiss the auth-required flag */
  dismissAuth: () => void;
  /** Force refresh from API */
  refresh: () => void;
}

const STORAGE_KEY = "formulate_stack";

/* ── localStorage cache (offline fallback) ───────────────────────── */

function loadLocalCache(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCache(items: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded — best effort
  }
}

const StackContext = createContext<StackContextValue | null>(null);

export function StackProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoading: authLoading } = useAuth();
  const [entries, setEntries] = useState<StackEntry[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [authRequired, setAuthRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  // Derive items from entries
  const syncItems = useCallback((newEntries: StackEntry[]) => {
    const ids = newEntries.map((e) => e.product_id);
    setItems(ids);
    saveLocalCache(ids);
  }, []);

  // Fetch stack from API when signed in
  const fetchStack = useCallback(async () => {
    if (!isSignedIn) {
      setEntries([]);
      setItems(loadLocalCache());
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const data = await api<StackEntry[]>("/api/v1/users/me/stack");
      setEntries(data);
      syncItems(data);
    } catch {
      // Fallback to localStorage on API error
      setItems(loadLocalCache());
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn, syncItems]);

  // Load on mount / auth change
  useEffect(() => {
    if (authLoading) return;
    // Only fetch once per auth state change
    hasFetchedRef.current = false;
    fetchStack();
    hasFetchedRef.current = true;
  }, [isSignedIn, authLoading, fetchStack]);

  const has = useCallback(
    (id: string) => items.includes(id),
    [items]
  );

  const add = useCallback(
    (id: string, scheduleTime?: string): boolean => {
      if (!isSignedIn) {
        setAuthRequired(true);
        return false;
      }
      if (items.includes(id)) return true;

      // Optimistic update
      setItems((prev) => [...prev, id]);
      saveLocalCache([...items, id]);

      // API call (fire-and-forget with rollback on error)
      api<StackEntry>("/api/v1/users/me/stack", {
        method: "POST",
        body: JSON.stringify({
          product_id: id,
          schedule_time: scheduleTime || "morning",
        }),
      })
        .then((entry) => {
          setEntries((prev) => [...prev, entry]);
        })
        .catch(() => {
          // Rollback on error
          setItems((prev) => prev.filter((x) => x !== id));
        });

      return true;
    },
    [isSignedIn, items]
  );

  const remove = useCallback(
    (id: string) => {
      // Optimistic update
      setItems((prev) => prev.filter((x) => x !== id));
      setEntries((prev) => prev.filter((e) => e.product_id !== id));

      if (isSignedIn) {
        api(`/api/v1/users/me/stack/${encodeURIComponent(id)}`, {
          method: "DELETE",
        }).catch(() => {
          // Rollback: re-fetch
          fetchStack();
        });
      }
    },
    [isSignedIn, fetchStack]
  );

  const toggle = useCallback(
    (id: string): boolean => {
      if (!isSignedIn) {
        setAuthRequired(true);
        return false;
      }
      if (items.includes(id)) {
        remove(id);
      } else {
        add(id);
      }
      return true;
    },
    [isSignedIn, items, add, remove]
  );

  const update = useCallback(
    (productId: string, updates: { schedule_time?: string; daily_servings?: number }) => {
      if (!isSignedIn) return;

      // Optimistic update
      setEntries((prev) =>
        prev.map((e) =>
          e.product_id === productId ? { ...e, ...updates } : e
        )
      );

      api(`/api/v1/users/me/stack/${encodeURIComponent(productId)}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      }).catch(() => {
        fetchStack();
      });
    },
    [isSignedIn, fetchStack]
  );

  const dismissAuth = useCallback(() => setAuthRequired(false), []);

  const value = useMemo<StackContextValue>(
    () => ({
      items,
      entries,
      isLoading,
      has,
      add,
      remove,
      toggle,
      update,
      count: items.length,
      authRequired,
      dismissAuth,
      refresh: fetchStack,
    }),
    [items, entries, isLoading, has, add, remove, toggle, update, authRequired, dismissAuth, fetchStack]
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
