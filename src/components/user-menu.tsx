"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  usePreferences,
  ACCENT_PRESETS,
  CURRENCIES,
} from "@/lib/preferences";

/* ── Avatar: first letter of email ────────────────────────────────── */
function UserAvatar({ email }: { email: string }) {
  const letter = email.charAt(0).toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-sm font-bold select-none">
      {letter}
    </div>
  );
}

/* ── Section divider ──────────────────────────────────────────────── */
function Divider() {
  return <div className="h-px bg-border my-1.5" />;
}

/* ── Dropdown ─────────────────────────────────────────────────────── */
export function UserMenu() {
  const { user, signOut } = useAuth();
  const { accentColor, setAccentColor, currency, setCurrency } = usePreferences();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* close on outside click */
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  /* close on Escape */
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-surface transition-colors cursor-pointer"
        aria-label="Account menu"
      >
        <UserAvatar email={user.email} />
        <svg
          className={`w-3.5 h-3.5 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-[300] animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Account header */}
          <div className="px-4 py-3 bg-surface2/50">
            <p className="text-xs text-muted">Signed in as</p>
            <p className="text-sm font-semibold text-text truncate">{user.email}</p>
          </div>

          <Divider />

          {/* Accent color */}
          <div className="px-4 py-3">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
              Accent Color
            </p>
            <div className="flex gap-2 flex-wrap">
              {ACCENT_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setAccentColor(preset.value)}
                  className="w-7 h-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110"
                  style={{
                    backgroundColor: preset.value,
                    borderColor:
                      accentColor === preset.value
                        ? "#fff"
                        : "rgba(255,255,255,0.1)",
                    boxShadow:
                      accentColor === preset.value
                        ? `0 0 8px ${preset.value}60`
                        : "none",
                  }}
                  title={preset.name}
                  aria-label={`Set accent color to ${preset.name}`}
                />
              ))}
            </div>
          </div>

          <Divider />

          {/* Currency */}
          <div className="px-4 py-3">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
              Currency
            </p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/50 cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a7a9a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code} — {c.label}
                </option>
              ))}
            </select>
          </div>

          <Divider />

          {/* Sign out */}
          <div className="px-4 py-2.5">
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="w-full text-left text-sm text-danger hover:bg-danger/10 px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
