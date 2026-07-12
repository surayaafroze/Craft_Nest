"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ItemCard } from "@/components/items/ItemCard";
import { ItemCardSkeleton } from "@/components/items/ItemCardSkeleton";
import { Item } from "@/types/item";

export function TrendingItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
        // Fetch top 8 highest rated items
        const res = await fetch(`${serverUrl}/api/items?sortBy=avgRating&sortOrder=desc&limit=8`);
        const data = await res.json();
        
        if (res.ok && data.success) {
          setItems(data.data.items || []);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch trending items:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <Badge variant="success" className="px-3 py-1 mb-4">
            Curated Selection
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-heading">
            Trending Masterpieces
          </h2>
        </div>
        <Link href="/explore">
          <Button variant="outline" className="rounded-xl hidden sm:flex">
            View All Trending
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">Could not load trending items at this time.</p>
          <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">No trending items available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
            >
              <ItemCard item={item} />
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="mt-8 flex justify-center sm:hidden">
        <Link href="/explore" className="w-full">
          <Button variant="outline" className="w-full rounded-xl">
            View All Trending
          </Button>
        </Link>
      </div>
    </section>
  );
}
