import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  onItemsPerPageChange?: (limit: number) => void;
  showSummary?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
  showSummary = true,
}: PaginationProps) {
  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-2 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-8">
      {/* Items Summary & Per Page Selector */}
      <div className="flex items-center gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
        {showSummary && totalItems !== undefined && (
          <span>
            Showing <strong className="font-semibold text-zinc-900 dark:text-white">{startItem ?? 1}</strong> to{' '}
            <strong className="font-semibold text-zinc-900 dark:text-white">{endItem ?? totalItems}</strong> of{' '}
            <strong className="font-semibold text-zinc-900 dark:text-white">{totalItems}</strong> results
          </span>
        )}

        {onItemsPerPageChange && itemsPerPage && (
          <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-4">
            <span>Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {[6, 9, 12, 24, 48].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* First Page Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={currentPage <= 1}
            title="First Page"
            className="h-9 w-9 rounded-xl border-zinc-200 dark:border-zinc-800 disabled:opacity-40"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous Page Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            title="Previous Page"
            className="h-9 w-9 rounded-xl border-zinc-200 dark:border-zinc-800 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((pageNum, idx) => {
              if (pageNum === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-1 text-xs text-zinc-400 select-none"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = pageNum === currentPage;

              return (
                <motion.button
                  key={`page-${pageNum}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(pageNum as number)}
                  className={`h-9 min-w-9 px-3 rounded-xl text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 dark:bg-emerald-500'
                      : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {pageNum}
                </motion.button>
              );
            })}
          </div>

          {/* Next Page Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            title="Next Page"
            className="h-9 w-9 rounded-xl border-zinc-200 dark:border-zinc-800 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last Page Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage >= totalPages}
            title="Last Page"
            className="h-9 w-9 rounded-xl border-zinc-200 dark:border-zinc-800 disabled:opacity-40"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
