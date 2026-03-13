"use client";

import { useState, type FormEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/lib/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function PasswordInput({
  placeholder,
  value,
  onChange,
  required,
  minLength,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className="w-full rounded-xl border border-border bg-[#16162a] px-4 py-3 pr-12 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
        tabIndex={-1}
      >
        {show ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        )}
      </button>
    </div>
  );
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp, error, clearError } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  const switchMode = () => {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    clearError();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password, confirmPassword);
      }
      onClose();
    } catch {
      // error is already set in context
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mx-4 w-full max-w-md rounded-2xl border border-border bg-bg p-8 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-text">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl border border-border bg-[#16162a] px-4 py-3 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={setPassword}
            required
            minLength={8}
          />
          {mode === "signup" && (
            <PasswordInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
              minLength={8}
            />
          )}

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-accent py-3 text-sm font-semibold text-bg transition-all hover:bg-[#00ffb3] disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={switchMode}
            className="text-accent hover:underline"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>,
    document.body
  );
}
