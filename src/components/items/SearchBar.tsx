"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  initialSearch?: string;
  onSearch: (search: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ initialSearch = "", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const lastSearchedTerm = useRef(initialSearch);

  useEffect(() => {
    setSearchTerm(initialSearch);
    lastSearchedTerm.current = initialSearch;
  }, [initialSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== lastSearchedTerm.current) {
        lastSearchedTerm.current = searchTerm;
        onSearch(searchTerm);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto mb-8"
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all shadow-sm hover:shadow-md"
        placeholder="Search items by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          title="Clear search"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.div>
  );
};
