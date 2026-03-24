"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { useAuth } from "./auth-context";

export interface UserProfile {
  display_name?: string;
  dob?: string;
  sex?: string;
  height?: string;
  weight?: string;
  target_weight?: string;
  activity?: string;
  goals?: string[];
  diet?: string;
  allergies?: string;
  conditions?: string[];
  medications?: string;
}

export function useProfile() {
  const { isSignedIn, isLoading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (authLoading || !isSignedIn) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    api<UserProfile>("/api/v1/users/me/profile")
      .then((data) => {
        setProfile(data || {});
        setError(null);
      })
      .catch(() => {
        setError("Could not load profile");
      })
      .finally(() => setIsLoading(false));
  }, [isSignedIn, authLoading]);

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      setIsSaving(true);
      setError(null);
      try {
        const result = await api<UserProfile>("/api/v1/users/me/profile", {
          method: "PUT",
          body: JSON.stringify(updates),
        });
        setProfile(result || updates);
        return true;
      } catch {
        setError("Could not save profile");
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [],
  );

  return { profile, isLoading, error, isSaving, updateProfile, setProfile };
}
