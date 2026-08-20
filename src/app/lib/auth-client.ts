import React, { useState, useEffect } from "react";
import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { apiClient } from "@/lib/api";

export const authClient = createAuthClient({
    baseURL: typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"),
    plugins: [jwtClient()]
});

export const { signIn, signUp } = authClient;

export const signOut = async (options?: any) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
  }
  
  // Fire backend and Better Auth logouts asynchronously without blocking the UI redirect
  apiClient.post("/auth/logout").catch(() => {});
  authClient.signOut().catch(() => {});

  if (options?.fetchOptions?.onSuccess) {
    try {
      options.fetchOptions.onSuccess();
    } catch (e) {}
  }

  if (typeof window !== 'undefined') {
    window.location.href = "/";
  }
};

export function useSession() {
  const baSession = authClient.useSession();
  const [localUser, setLocalUser] = useState<any>(null);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // Read cached user info after hydration completes
    const cached = typeof window !== 'undefined' ? localStorage.getItem('user_info') : null;
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && isMounted) {
          setLocalUser(parsed);
        }
      } catch (e) {}
    }

    const fetchMe = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (token) {
        try {
          const res = await authFetch('/api/backend/auth/me');
          if (res.ok) {
            const data = await res.json();
            if (data.user && isMounted) {
              setLocalUser(data.user);
              localStorage.setItem('user_info', JSON.stringify(data.user));
            }
          } else if (res.status === 401) {
            if (isMounted) setLocalUser(null);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_info');
          }
        } catch (e) {}
      }
      if (isMounted) setIsChecking(false);
    };

    fetchMe();
    return () => { isMounted = false; };
  }, []);

  if (baSession.data?.user) {
    return {
      data: baSession.data,
      isPending: false,
      error: null
    };
  }

  if (localUser) {
    return {
      data: {
        session: { id: localUser.id || localUser._id },
        user: {
          id: localUser.id || localUser._id,
          name: localUser.name,
          email: localUser.email,
          image: localUser.avatarUrl || null,
          role: localUser.role || 'user',
          status: localUser.status || 'active',
          bio: localUser.bio || '',
          location: localUser.location || '',
          phone: localUser.phone || '',
        }
      },
      isPending: false,
      error: null
    };
  }

  return {
    data: null,
    isPending: baSession.isPending && isChecking,
    error: baSession.error
  };
}

// ─── Authenticated fetch helper with auto-sync and auto-retry on 401 ────────────
export const authFetch = async (url: string | URL, options: RequestInit = {}): Promise<Response> => {
  let token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  // Helper to attempt syncing token from cached user
  const trySyncToken = async (): Promise<string | null> => {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem('user_info');
    if (!cached) return null;
    try {
      const u = JSON.parse(cached);
      if (u && u.email) {
        const syncRes = await fetch('/api/backend/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: u.email,
            name: u.name,
            avatarUrl: u.avatarUrl || u.image,
            role: u.role,
          }),
        });
        if (syncRes.ok) {
          const syncData = await syncRes.json();
          if (syncData.token) {
            localStorage.setItem('auth_token', syncData.token);
            if (syncData.user) {
              localStorage.setItem('user_info', JSON.stringify(syncData.user));
            }
            return syncData.token;
          }
        }
      }
    } catch (e) {}
    return null;
  };

  // If token is missing, attempt sync first
  if (!token) {
    token = await trySyncToken();
  }

  const headers = new Headers(options.headers || {});
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let res = await fetch(url, {
    credentials: 'include',
    ...options,
    headers,
  });

  // If 401 Unauthorized, refresh token once and auto-retry
  if (res.status === 401 && typeof window !== 'undefined') {
    const newToken = await trySyncToken();
    if (newToken) {
      headers.set('Authorization', `Bearer ${newToken}`);
      res = await fetch(url, {
        credentials: 'include',
        ...options,
        headers,
      });
    }
  }

  return res;
};

export const hasValidAuthToken = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('auth_token');
  return !!token && token.trim().length > 0;
};
