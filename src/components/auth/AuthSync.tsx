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

    if (session) {
      // Sync if we haven't synced yet, or if the session ID changed (e.g. switched users)
      if (!hasSynced.current || lastSessionId.current !== session.session.id) {
        apiClient.post("/auth/sync")
          .then((res) => {
            hasSynced.current = true;
            lastSessionId.current = session.session.id;
            if (res.data?.token) {
              localStorage.setItem('auth_token', res.data.token);
            }
          })
          .catch(() => {
            // Silently swallow session sync failures if session token sync is unavailable
          });
      }
    } else {
      // If logged out on frontend, clear the backend JWT too
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
