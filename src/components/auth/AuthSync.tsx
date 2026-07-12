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
          .then(() => {
            hasSynced.current = true;
            lastSessionId.current = session.session.id;
          })
          .catch((err) => {
            console.error("Failed to sync auth session with backend:", err);
          });
      }
    } else {
      // If logged out on frontend, clear the backend JWT too
      if (hasSynced.current || lastSessionId.current) {
        apiClient.post("/auth/logout")
          .then(() => {
            hasSynced.current = false;
            lastSessionId.current = null;
          })
          .catch((err) => {
            console.error("Failed to clear backend auth session:", err);
          });
      }
    }
  }, [session, isPending]);

  return null;
}
