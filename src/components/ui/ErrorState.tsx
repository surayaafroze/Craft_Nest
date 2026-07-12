import React from "react";
import Button from "./Button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  description = "We encountered an error while trying to fetch the requested page or data. Please try again.",
  actionText = "Try Again",
  onAction,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md mx-auto my-8 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="rounded-full bg-red-50 dark:bg-red-950/30 p-4 mb-4 text-red-600 dark:text-red-400">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 mb-6 max-w-sm">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} variant="outline">
          {actionText}
        </Button>
      )}
    </div>
  );
}
