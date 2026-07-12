import React from "react";

type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800 ${className}`}
    />
  );
}
