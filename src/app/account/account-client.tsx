"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useProfile, type UserProfile } from "@/lib/use-profile";
import { usePreferences } from "@/lib/preferences";
import { AccentColorPicker } from "@/components/accent-color-picker";
import { CurrencySelector } from "@/components/currency-selector";
import { api } from "@/lib/api";

/* ── Health goal options ──────────────────────────────────────────── */
const GOALS = [
  "Longevity",
  "Muscle",
  "Energy",
  "Cognition",
  "Heart Health",
  "Sleep",
  "Immunity",
  "Gut Health",
  "Weight Loss",
  "Skin / Hair",
  "Joint Health",
  "Stress / Mood",
];

const ACTIVITY_LEVELS = [
  { value: "", label: "Select..." },
  { value: "sedentary", label: "Sedentary" },
  { value: "lightly_active", label: "Lightly Active" },
  { value: "moderate", label: "Moderately Active" },
  { value: "very_active", label: "Very Active" },
];

const DIETS = [
  { value: "", label: "No preference" },
  { value: "omnivore", label: "Omnivore" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "keto", label: "Keto" },
  { value: "paleo", label: "Paleo" },
  { value: "mediterranean", label: "Mediterranean" },
];

const SEX_OPTIONS = [
  { value: "", label: "Select..." },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

/* ── Section wrapper ──────────────────────────────────────────────── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
      <h2 className="text-[11px] font-semibold text-muted uppercase tracking-wider">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ── Input helpers ────────────────────────────────────────────────── */
const inputClass =
  "w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/50";
const labelClass = "block text-sm text-muted mb-1";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export function AccountPageClient() {
  const { user, isSignedIn, isLoading: authLoading } = useAuth();
  const { profile, isLoading, error, isSaving, updateProfile } = useProfile();
  const { accentColor } = usePreferences();

  // Local form state
  const [form, setForm] = useState<UserProfile>({});
  const [saveMsg, setSaveMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Sync profile → form when loaded
  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  // Not signed in
  if (!authLoading && !isSignedIn) {
    return (
      <div className="text-center py-20">
        <p className="text-muted text-lg mb-2">
          Sign in to manage your account
        </p>
        <p className="text-sm text-muted/60">
          Your profile, preferences, and settings are tied to your account.
        </p>
      </div>
    );
  }

  if (isLoading || authLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-6 h-32 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const update = (key: keyof UserProfile, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaveMsg("");
  };

  const toggleGoal = (goal: string) => {
    const current = form.goals || [];
    const next = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : [...current, goal];
    update("goals", next);
  };

  const handleSave = async () => {
    const ok = await updateProfile(form);
    setSaveMsg(ok ? "Saved" : "Failed to save");
    if (ok) setTimeout(() => setSaveMsg(""), 3000);
  };

  const handleDelete = async () => {
    try {
      await api("/api/v1/users/me", { method: "DELETE" });
      window.location.href = "/";
    } catch {
      setSaveMsg("Could not delete account");
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Account Info ──────────────────────────────────────── */}
      <Section title="Account">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold select-none"
            style={{
              backgroundColor: `${accentColor}20`,
              border: `2px solid ${accentColor}60`,
              color: accentColor,
            }}
          >
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-text font-semibold">
              {form.display_name || user?.email}
            </p>
            <p className="text-sm text-muted">{user?.email}</p>
            {user?.created_at && (
              <p className="text-xs text-muted/60">
                Member since{" "}
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* ── Profile ───────────────────────────────────────────── */}
      <Section title="Profile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Display Name">
            <input
              type="text"
              className={inputClass}
              value={form.display_name || ""}
              onChange={(e) => update("display_name", e.target.value)}
              placeholder="Your name"
            />
          </Field>
          <Field label="Date of Birth">
            <input
              type="date"
              className={inputClass}
              value={form.dob || ""}
              onChange={(e) => update("dob", e.target.value)}
            />
          </Field>
          <Field label="Sex">
            <select
              className={inputClass}
              value={form.sex || ""}
              onChange={(e) => update("sex", e.target.value)}
            >
              {SEX_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Activity Level">
            <select
              className={inputClass}
              value={form.activity || ""}
              onChange={(e) => update("activity", e.target.value)}
            >
              {ACTIVITY_LEVELS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Height">
            <input
              type="text"
              className={inputClass}
              value={form.height || ""}
              onChange={(e) => update("height", e.target.value)}
              placeholder={'e.g. 5\'10" or 178cm'}
            />
          </Field>
          <Field label="Weight">
            <input
              type="text"
              className={inputClass}
              value={form.weight || ""}
              onChange={(e) => update("weight", e.target.value)}
              placeholder="e.g. 165 lbs or 75 kg"
            />
          </Field>
          <Field label="Diet">
            <select
              className={inputClass}
              value={form.diet || ""}
              onChange={(e) => update("diet", e.target.value)}
            >
              {DIETS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Allergies">
            <input
              type="text"
              className={inputClass}
              value={form.allergies || ""}
              onChange={(e) => update("allergies", e.target.value)}
              placeholder="e.g. shellfish, peanuts"
            />
          </Field>
        </div>

        {/* Health Goals */}
        <div className="pt-2">
          <label className={labelClass}>Health Goals</label>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((goal) => {
              const active = (form.goals || []).includes(goal);
              return (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    active
                      ? "bg-accent/20 border-accent text-accent"
                      : "bg-surface2 border-border text-muted hover:border-accent/30"
                  }`}
                >
                  {goal}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-accent text-bg hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
          {saveMsg && (
            <span
              className={`text-sm ${saveMsg === "Saved" ? "text-green-400" : "text-danger"}`}
            >
              {saveMsg}
            </span>
          )}
          {error && !saveMsg && (
            <span className="text-sm text-danger">{error}</span>
          )}
        </div>
      </Section>

      {/* ── Preferences ───────────────────────────────────────── */}
      <Section title="Preferences">
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Accent Color</label>
            <AccentColorPicker />
          </div>
          <div>
            <label className={labelClass}>Currency</label>
            <CurrencySelector />
          </div>
        </div>
      </Section>

      {/* ── Danger Zone ───────────────────────────────────────── */}
      <Section title="Danger Zone">
        <p className="text-sm text-muted">
          Permanently delete your account and all associated data. This cannot
          be undone.
        </p>
        {!deleteConfirm ? (
          <button
            onClick={() => setDeleteConfirm(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-danger/40 text-danger hover:bg-danger/10 transition-colors cursor-pointer"
          >
            Delete Account
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-danger text-white hover:brightness-110 transition-all cursor-pointer"
            >
              Yes, delete my account
            </button>
            <button
              onClick={() => setDeleteConfirm(false)}
              className="px-4 py-2 rounded-lg text-sm text-muted hover:text-text transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </Section>
    </div>
  );
}
