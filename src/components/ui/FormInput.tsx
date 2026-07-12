import React from "react";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export default function FormInput({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}: FormInputProps) {
  const inputId = id || React.useId();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-zinc-900 ${
          error
            ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500/20 dark:border-red-800 dark:text-red-300"
            : "border-zinc-200 text-zinc-900 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-zinc-800 dark:text-white"
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-xs text-zinc-500">{helperText}</p>
      )}
    </div>
  );
}
