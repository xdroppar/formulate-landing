"use client";

import { useState, useRef, type FormEvent, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/lib/auth-context";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
        };
      };
    };
    AppleID?: {
      auth: {
        init: (config: Record<string, unknown>) => void;
        signIn: () => Promise<{
          authorization: { id_token: string; code?: string };
        }>;
      };
    };
  }
}

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
  const { signIn, signUp, googleSignIn, appleSignIn, error, clearError } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => setMounted(true), []);

  const handleGoogleResponse = useCallback(
    async (response: { credential: string }) => {
      setLoading(true);
      try {
        await googleSignIn(response.credential);
        onCloseRef.current();
      } catch {
        // error set in context
      } finally {
        setLoading(false);
      }
    },
    [googleSignIn]
  );

  // Render the Google button when the modal opens
  useEffect(() => {
    if (!isOpen || !mounted || !googleBtnRef.current) return;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const tryRender = () => {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        type: "standard",
        theme: "filled_black",
        size: "large",
        text: "continue_with",
        shape: "pill",
        width: googleBtnRef.current.offsetWidth,
      });
    };

    // GSI script may still be loading
    if (window.google) {
      tryRender();
    } else {
      const timer = setInterval(() => {
        if (window.google) {
          clearInterval(timer);
          tryRender();
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isOpen, mounted, handleGoogleResponse]);

  const handleAppleSignIn = useCallback(async () => {
    const appleClientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
    if (!appleClientId || !window.AppleID) return;

    try {
      window.AppleID.auth.init({
        clientId: appleClientId,
        scope: "email name",
        redirectURI: window.location.origin,
        usePopup: true,
      });
      const result = await window.AppleID.auth.signIn();
      setLoading(true);
      await appleSignIn(
        result.authorization.id_token,
        result.authorization.code
      );
      onCloseRef.current();
    } catch {
      // error set in context, or user cancelled
    } finally {
      setLoading(false);
    }
  }, [appleSignIn]);

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

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div ref={googleBtnRef} className="flex justify-center [&>div]:w-full" />

        {process.env.NEXT_PUBLIC_APPLE_CLIENT_ID && (
          <button
            type="button"
            onClick={handleAppleSignIn}
            disabled={loading}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Continue with Apple
          </button>
        )}

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
