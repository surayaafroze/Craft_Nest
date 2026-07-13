import React from "react";
import Skeleton from "../ui/Skeleton";

export const ItemCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full border border-zinc-200 dark:border-zinc-800">
      <div className="h-56 w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="p-5 flex flex-col flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-6" />
        
        <div className="flex justify-between items-center mb-5">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};
