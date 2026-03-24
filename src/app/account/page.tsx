import { AccountPageClient } from "./account-client";

export const metadata = {
  title: "Account — Formulate",
  description: "Manage your profile, preferences, and account settings",
};

export default function AccountPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 md:px-12 pt-28 pb-16">
      <h1 className="text-3xl font-bold text-text mb-1">Account</h1>
      <p className="text-sm text-muted mb-8">
        Manage your profile, preferences, and account settings.
      </p>
      <AccountPageClient />
    </div>
  );
}
