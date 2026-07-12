"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ItemCard } from "@/components/items/ItemCard";
import { ItemCardSkeleton } from "@/components/items/ItemCardSkeleton";
import { SearchBar } from "@/components/items/SearchBar";
import { FilterSidebar } from "@/components/items/FilterSidebar";
import { FilterDrawer } from "@/components/items/FilterDrawer";
import { SortDropdown, SortOption } from "@/components/items/SortDropdown";
import { Pagination } from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { Item, PaginatedItemsResponse } from "@/types/item";

export default function ExplorePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    location: "",
  });
  // Active filters which trigger API calls (applied filters)
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [sort, setSort] = useState<SortOption>({ sortBy: "createdAt", sortOrder: "desc" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (appliedFilters.category) params.append("category", appliedFilters.category);
      if (appliedFilters.minPrice) params.append("minPrice", appliedFilters.minPrice);
      if (appliedFilters.maxPrice) params.append("maxPrice", appliedFilters.maxPrice);
      // Rating and Location are optional frontend filters, passed to backend for potential future use or custom logic
      if (appliedFilters.rating) params.append("rating", appliedFilters.rating);
      if (appliedFilters.location) params.append("location", appliedFilters.location);
      
      params.append("sortBy", sort.sortBy);
      params.append("sortOrder", sort.sortOrder);
      params.append("page", page.toString());
      params.append("limit", "12");

      const response = await fetch(`${serverUrl}/api/items?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch items.");
      }
      const data: PaginatedItemsResponse = await response.json();
      setItems(data.items);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.total);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching items.");
    } finally {
      setLoading(false);
    }
  }, [search, appliedFilters, sort, page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setPage(1); // reset to page 1 on filter change
  };

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl font-heading">
            Explore <span className="text-teal-600 dark:text-teal-400">Items</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Discover unique crafted items from our community.
          </p>
        </motion.div>

        <SearchBar initialSearch={search} onSearch={handleSearch} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onApply={handleApplyFilters}
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <FilterDrawer
                  filters={filters}
                  onFilterChange={setFilters}
                  onApply={handleApplyFilters}
                />
                <p className="text-gray-600 dark:text-gray-300">
                  Showing {loading ? "..." : totalItems} results
                </p>
              </div>
              <SortDropdown value={sort} onChange={handleSortChange} />
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {[...Array(6)].map((_, i) => (
                    <ItemCardSkeleton key={i} />
                  ))}
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ErrorState
                    title="Failed to load items"
                    description={error}
                    onAction={fetchItems}
                  />
                </motion.div>
              ) : items.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState
                    title="No items found"
                    description="Try adjusting your filters or search query to find what you're looking for."
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="items"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {!loading && !error && items.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
