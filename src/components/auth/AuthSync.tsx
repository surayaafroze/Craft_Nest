"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/app/lib/auth-client";
import { apiClient } from "@/lib/api";

export function AuthSync() {
  const { data: session, isPending } = useSession();
  const hasSynced = useRef(false);
  const lastSessionId = useRef<string | null>(null);

  useEffect(() => {
    if (isPending) return;

    if (session?.user) {
      const userIdentifier = session.user.email || session.session?.id || 'session';
      if (!hasSynced.current || lastSessionId.current !== userIdentifier) {
        apiClient.post("/auth/sync", {
          email: session.user.email,
          name: session.user.name,
          avatarUrl: session.user.image,
          role: session.user.role,
        })
          .then((res) => {
            hasSynced.current = true;
            lastSessionId.current = userIdentifier;
            if (res.data?.token) {
              localStorage.setItem('auth_token', res.data.token);
              if (res.data?.user) {
                localStorage.setItem('user_info', JSON.stringify(res.data.user));
              }
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('auth_sync_complete'));
              }
            }
          })
          .catch(() => {
            // Silently swallow session sync failures
          });
      }
    } else {
      if (hasSynced.current || lastSessionId.current) {
        apiClient.post("/auth/logout")
          .then(() => {
            hasSynced.current = false;
            lastSessionId.current = null;
            localStorage.removeItem('auth_token');
          })
          .catch((err) => {
            console.error("Failed to clear backend auth session:", err);
            localStorage.removeItem('auth_token');
          });
      }
    }
  }, [session, isPending]);

  return null;
}
