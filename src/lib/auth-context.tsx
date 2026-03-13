"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api, ApiError, setAccessToken } from "./api";

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_login: string | null;
  is_active: boolean;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

interface AuthContextValue {
  user: User | null;
  isSignedIn: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, confirmPassword: string) => Promise<void>;
  googleSignIn: (credential: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Try to restore session on mount
  useEffect(() => {
    api<User>("/api/v1/users/me")
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const data = await api<TokenResponse>("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        skipAuth: true,
      });
      setAccessToken(data.access_token);
      setUser(data.user);
    } catch (e) {
      const msg = e instanceof ApiError
        ? e.detail
        : e instanceof Error
          ? `Login failed: ${e.message}`
          : "Login failed";
      setError(msg);
      throw e;
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, confirmPassword: string) => {
      setError(null);
      try {
        const data = await api<TokenResponse>("/api/v1/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            confirm_password: confirmPassword,
          }),
          skipAuth: true,
        });
        setAccessToken(data.access_token);
        setUser(data.user);
      } catch (e) {
        const msg = e instanceof ApiError
          ? e.detail
          : e instanceof Error
            ? `Signup failed: ${e.message}`
            : "Signup failed";
        setError(msg);
        throw e;
      }
    },
    []
  );

  const googleSignIn = useCallback(async (credential: string) => {
    setError(null);
    try {
      const data = await api<TokenResponse>("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({ credential }),
        skipAuth: true,
      });
      setAccessToken(data.access_token);
      setUser(data.user);
    } catch (e) {
      const msg = e instanceof ApiError
        ? e.detail
        : e instanceof Error
          ? `Google sign-in failed: ${e.message}`
          : "Google sign-in failed";
      setError(msg);
      throw e;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api("/api/v1/auth/logout", { method: "POST", body: "{}" });
    } catch {
      // best effort
    }
    setAccessToken(null);
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn: !!user,
        isLoading,
        signIn,
        signUp,
        googleSignIn,
        signOut,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
