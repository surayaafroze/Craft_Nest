"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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

function ExploreContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Derive applied state from URL
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sortOption: SortOption = {
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
  };
  
  // Local state for filters to avoid triggering API on every keystroke
  const [localFilters, setLocalFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    rating: searchParams.get("rating") || "",
    location: searchParams.get("location") || "",
  });

  // Sync local filters with URL if URL changes externally
  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);
    setLocalFilters({
      category: params.get("category") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      rating: params.get("rating") || "",
      location: params.get("location") || "",
    });
  }, [searchParamsString]);

  const updateURL = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);



  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const params = new URLSearchParams(searchParamsString);
      if (!params.has("sortBy")) params.append("sortBy", sortOption.sortBy);
      if (!params.has("sortOrder")) params.append("sortOrder", sortOption.sortOrder);
      if (!params.has("page")) params.append("page", page.toString());
      params.set("limit", "9");

      const response = await fetch(`/api/backend/items?${params.toString()}`);
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
  }, [searchParamsString, sortOption.sortBy, sortOption.sortOrder, page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleApplyFilters = useCallback(() => {
    updateURL({
      ...localFilters,
      page: "1", // reset page on filter change
    });
  }, [updateURL, localFilters]);

  const handleClearFilters = useCallback(() => {
    updateURL({
      category: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      location: "",
      page: "1"
    });
  }, [updateURL]);

  const handleSearch = useCallback((newSearch: string) => {
    updateURL({ search: newSearch, page: "1" });
  }, [updateURL]);

  const handleSortChange = useCallback((newSort: SortOption) => {
    updateURL({ sortBy: newSort.sortBy, sortOrder: newSort.sortOrder, page: "1" });
  }, [updateURL]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white sm:text-5xl font-heading tracking-tight">
            Explore <span className="text-emerald-600 dark:text-emerald-450">Items</span>
          </h1>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
            Discover unique handcrafted items from our community.
          </p>
        </motion.div>

        <SearchBar initialSearch={search} onSearch={handleSearch} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-72 flex-shrink-0"
          >
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 sticky top-28">
              <FilterSidebar
                filters={localFilters}
                onFilterChange={setLocalFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
                onCategoryChange={(cat) => updateURL({ ...localFilters, category: cat, page: "1" })}
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-4">
                <FilterDrawer
                  filters={localFilters}
                  onFilterChange={setLocalFilters}
                  onApply={handleApplyFilters}
                  onClear={handleClearFilters}
                  onCategoryChange={(cat) => updateURL({ ...localFilters, category: cat, page: "1" })}
                />
                <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                  Showing {loading ? "..." : totalItems} results
                </p>
              </div>
              <SortDropdown value={sortOption} onChange={handleSortChange} />
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
                onPageChange={(p) => updateURL({ page: p.toString() })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 flex items-center justify-center"><ItemCardSkeleton /></div>}>
      <ExploreContent />
    </Suspense>
  );
}
