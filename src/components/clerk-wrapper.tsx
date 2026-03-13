"use client";

import { AuthProvider } from "@/lib/auth-context";
import { PreferencesProvider } from "@/lib/preferences";

/**
 * Auth wrapper — replaced Clerk with custom AuthProvider backed by Formulate API.
 * Kept the same component name for minimal layout.tsx changes.
 */
export function ClerkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PreferencesProvider>{children}</PreferencesProvider>
    </AuthProvider>
  );
}
