import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"),
    plugins: [jwtClient()]
});

export const { signIn, signUp, signOut, useSession } = authClient;

// ─── Authenticated fetch helper ───────────────────────────────────────────────
// Uses HTTP-only cookies securely synced via backend_jwt.
export const authFetch = async (url: string | URL, options: RequestInit = {}): Promise<Response> => {
  return fetch(url, {
    credentials: 'include',
    ...options,
  });
};
