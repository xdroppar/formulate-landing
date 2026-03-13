export type Role = "dev" | "user";

/**
 * Get the current user's role.
 *
 * In production this would decode the JWT or call /api/v1/users/me.
 * For now, dev access is controlled via the FORMULATE_DEV_ROLE env var
 * (set in deployment) since the landing page has no protected routes —
 * this is only used to gate draft product visibility.
 */
export async function getUserRole(): Promise<Role> {
  if (process.env.FORMULATE_DEV_ROLE === "dev") return "dev";
  return "user";
}

/**
 * Check if current user has dev access.
 */
export async function isDevUser(): Promise<boolean> {
  return (await getUserRole()) === "dev";
}
