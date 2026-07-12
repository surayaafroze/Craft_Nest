import React from "react";
import Skeleton from "../ui/Skeleton";

export const ItemCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-full border border-gray-100 dark:border-gray-700">
      <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="p-4 flex flex-col flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex justify-between items-center mt-auto">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};
