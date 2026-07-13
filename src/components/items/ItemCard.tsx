"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Item } from "@/types/item";

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const imageUrl = item.images?.[0] || "/placeholder.svg";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-zinc-200 dark:border-zinc-800"
    >
      <div className="relative h-56 w-full bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          unoptimized={true}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
          {item.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 line-clamp-1 font-heading tracking-tight">
          {item.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2 flex-grow">
          {item.shortDescription}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {item.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate max-w-[100px]">{item.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>
              {item.avgRating ? item.avgRating.toFixed(1) : "New"}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500 font-normal">
              ({item.reviewCount || 0})
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-lg font-bold text-zinc-900 dark:text-white">
            ${item.price.toFixed(2)}
          </span>
          <Link
            href={`/items/${item.id}`}
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            View Details &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
