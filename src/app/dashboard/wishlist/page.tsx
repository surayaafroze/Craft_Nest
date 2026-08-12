"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession, authFetch } from "@/app/lib/auth-client";
import { ItemCard } from "@/components/items/ItemCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";

export default function WishlistPage() {
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchWishlist = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await authFetch(`/api/backend/wishlist?page=${pageNum}&limit=6`);
      if (res.ok) {
        const data = await res.json();
        setWishlistItems(data.wishlist?.items || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalItems(data.pagination?.total || data.wishlist?.items?.length || 0);
      }
    } catch (err) {
      console.error("Failed to load wishlist", err);
    } finally {
      setLoading(false);
    }
  }, [serverUrl]);

  useEffect(() => {
    fetchWishlist(page);
  }, [fetchWishlist, page]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">My Wishlist</h1>
          {totalItems > 0 && (
            <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {totalItems} {totalItems === 1 ? 'saved item' : 'saved items'}
            </span>
          )}
        </div>
        <p className="text-zinc-500 mt-1">Items you've saved for later.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❤️</span>
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Your wishlist is empty</h3>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">Discover unique items and save them here.</p>
          <Link href="/explore">
            <Button className="rounded-xl px-8">Explore Items</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {/* Note: the backend returns a partial item. We format it so ItemCard handles it safely */}
                <ItemCard item={{
                  id: item.id,
                  title: item.title,
                  shortDescription: item.shortDescription || "",
                  fullDescription: "",
                  price: item.price,
                  images: item.images || [],
                  category: item.category,
                  quantity: 1,
                  location: "",
                  avgRating: 0,
                  reviewCount: 0,
                  status: item.status,
                  ownerId: "",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }} />
              </motion.div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={6}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
