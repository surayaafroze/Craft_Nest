"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Item } from "@/types/item";

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const imageUrl = item.images?.[0] || "/placeholder.jpg";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-gray-100 dark:border-gray-700"
    >
      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700">
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-teal-700 dark:text-teal-400">
          {item.category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 font-heading">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-grow">
          {item.shortDescription}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-[#C1662F]">
            ${item.price.toFixed(2)}
          </span>
          <Link
            href={`/items/${item.id}`}
            className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            View Details &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
