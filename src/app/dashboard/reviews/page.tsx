"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession, authFetch } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { Trash2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { RatingStars } from "@/components/items/RatingStars";

export default function MyReviewsPage() {
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await authFetch(`${serverUrl}/api/reviews/me`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [serverUrl]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    try {
      setDeletingId(id);
      const res = await authFetch(`${serverUrl}/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete review");
      }
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (err: any) {
      toast.error(err.message || "Could not delete review");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">My Reviews</h1>
        <p className="text-zinc-500 mt-1">Manage the reviews you've left on other users' items.</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400">You haven't reviewed any items yet.</p>
          </div>
        ) : (
          reviews.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-sm"
            >
              {/* Item Details */}
              {review.item ? (
                <div className="flex flex-col sm:w-1/3 gap-3 border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-zinc-800 pb-4 sm:pb-0 sm:pr-6">
                  <div className="aspect-[4/3] rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border border-zinc-200 dark:border-zinc-700">
                    {review.item.images && review.item.images.length > 0 ? (
                      <img src={review.item.images[0]} alt={review.item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">No Img</div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white line-clamp-2">{review.item.title}</h4>
                    <Link href={`/items/${review.item.id}`} className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 text-sm font-medium inline-flex items-center mt-1">
                      View Item <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="sm:w-1/3 border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-zinc-800 pb-4 sm:pb-0 sm:pr-6 flex items-center justify-center text-zinc-400 italic text-sm">
                  Item unavailable
                </div>
              )}

              {/* Review Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <RatingStars rating={review.rating} size="sm" />
                    <div className="text-xs text-zinc-400 mt-1">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                    onClick={() => handleDelete(review.id)}
                    loading={deletingId === review.id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed flex-1">
                  {review.comment}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
