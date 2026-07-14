"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession, authFetch } from "@/app/lib/auth-client";
import { ItemCard } from "@/components/items/ItemCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const res = await authFetch(`/api/backend/wishlist`);
      if (res.ok) {
        const data = await res.json();
        setWishlistItems(data.wishlist?.items || []);
      }
    } catch (err) {
      console.error("Failed to load wishlist", err);
    } finally {
      setLoading(false);
    }
  }, [serverUrl]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">My Wishlist</h1>
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
      )}
    </div>
  );
}
