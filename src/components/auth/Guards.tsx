"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";
import Spinner from "@/components/ui/Spinner";

// ─── AUTHENTICATED GUARD ──────────────────────────────────────────────────────
// Restricts content to logged-in users only.
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Spinner className="h-8 w-8 text-emerald-600" />
      </div>
    );
  }

  return <>{children}</>;
}

// ─── GUEST-ONLY GUARD ─────────────────────────────────────────────────────────
// Restricts content to unauthenticated users only (e.g. login/register pages).
export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending || session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Spinner className="h-8 w-8 text-emerald-600" />
      </div>
    );
  }

  return <>{children}</>;
}

// ─── ADMIN-ONLY GUARD ─────────────────────────────────────────────────────────
// Restricts content to administrator users only.
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.replace("/login");
      } else if ((session.user as any).role !== "admin") {
        router.replace("/dashboard");
      }
    }
  }, [session, isPending, router]);

  if (isPending || !session || (session.user as any).role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Spinner className="h-8 w-8 text-emerald-600" />
      </div>
    );
  }

  return <>{children}</>;
}
