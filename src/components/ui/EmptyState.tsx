import React from "react";
import Button from "./Button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md mx-auto my-8 bg-white/50 dark:bg-zinc-950/20">
      <div className="rounded-full bg-emerald-50 dark:bg-emerald-950/30 p-4 mb-4 text-emerald-600 dark:text-emerald-400">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 mb-6 max-w-sm">
        {description}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
}
