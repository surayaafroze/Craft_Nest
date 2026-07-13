"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterSidebar } from "./FilterSidebar";
import { Button } from "../ui/Button";

interface Filters {
  category: string;
  minPrice: string;
  maxPrice: string;
  rating: string;
  location: string;
}

interface FilterDrawerProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onApply: () => void;
  onCategoryChange?: (category: string) => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  filters,
  onFilterChange,
  onApply,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    setIsOpen(false);
    onApply();
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)} className="lg:hidden rounded-xl">
        Filters
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-zinc-950 shadow-xl z-50 p-6 overflow-y-auto lg:hidden border-r border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white font-heading tracking-tight">Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onFilterChange={onFilterChange}
                onApply={handleApply}
                onCategoryChange={(cat) => {
                  setIsOpen(false);
                  if (onCategoryChange) {
                    onCategoryChange(cat);
                  }
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
