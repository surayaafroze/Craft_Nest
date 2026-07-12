import React from "react";

type Option = {
  value: string;
  label: string;
};

type FormSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
  placeholder?: string;
};

export default function FormSelect({
  label,
  options,
  error,
  helperText,
  className = "",
  id,
  placeholder,
  ...props
}: FormSelectProps) {
  const selectId = id || React.useId();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-50 dark:bg-zinc-900 appearance-none ${
            error
              ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500/20 dark:border-red-800 dark:text-red-300"
              : "border-zinc-200 text-zinc-900 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-zinc-800 dark:text-white"
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
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
