"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, User } from "lucide-react";
import { Item } from "@/types/item";
import { useSession } from "@/app/lib/auth-client";

interface ItemCardProps {
  item: Item;
  priority?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, priority = false }) => {
  const imageUrl = item.images?.[0] || "/placeholder.svg";
  const { data: session } = useSession();
  
  const isOwner = session?.user?.id === item.ownerId;

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
          priority={priority}
          unoptimized={true}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
          {item.category}
        </div>
        {(item.owner || isOwner) && (
          <div className={`absolute top-3 left-3 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm border ${
            isOwner 
              ? 'bg-emerald-600/90 text-white border-emerald-500/50 dark:bg-emerald-500/90 dark:border-emerald-400/50' 
              : 'bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border-zinc-200/50 dark:border-zinc-700/50'
          }`}>
            <div className="flex items-center gap-1.5">
              {item.owner?.avatarUrl ? (
                <img src={item.owner.avatarUrl} alt="avatar" className="w-4 h-4 rounded-full object-cover" />
              ) : (
                <User className="w-3.5 h-3.5" />
              )}
              <span>{isOwner ? 'By You' : `By ${item.owner?.name?.split(' ')[0] || 'User'}`}</span>
            </div>
          </div>
        )}
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
