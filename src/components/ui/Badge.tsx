import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  className?: string;
};

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  const variants = {
    success: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-800/30",
    warning: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-800/30",
    error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-800/30",
    info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-800/30",
    neutral: "bg-zinc-50 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700/50",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
