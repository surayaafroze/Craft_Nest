"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession, authFetch } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { Trash2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { RatingStars } from "@/components/items/RatingStars";
import { confirmDeleteToast } from "@/app/lib/toastConfirm";

import { Pagination } from "@/components/ui/Pagination";

export default function MyReviewsPage() {
  const { data: session } = useSession();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchReviews = useCallback(async (pageNum = 1) => {
    const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('auth_token');
    if (!session && !hasToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await authFetch(`/api/backend/reviews/me?page=${pageNum}&limit=6`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalItems(data.pagination?.total || data.reviews?.length || 0);
    } catch (err: any) {
      toast.error(err.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [session, serverUrl]);

  useEffect(() => {
    fetchReviews(page);
  }, [fetchReviews, page]);

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDeleteToast("Are you sure you want to delete this review?");
    if (!confirmed) return;
    
    try {
      setDeletingId(id);
      const res = await authFetch(`/api/backend/reviews/${id}`, { method: "DELETE" });
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
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">My Reviews</h1>
          {totalItems > 0 && (
            <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {totalItems} {totalItems === 1 ? 'review' : 'reviews'}
            </span>
          )}
        </div>
        <p className="text-zinc-500 mt-1">Manage the reviews you've left on other users' items.</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">No reviews yet</h3>
            <p className="text-zinc-500 dark:text-zinc-400">When you review items, they will show up here.</p>
          </div>
        ) : (
          <>
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start"
              >
                {review.item ? (
                  <Link href={`/items/${review.item.id}`} className="w-full md:w-32 flex-shrink-0 group">
                    <div className="aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border border-zinc-200/50 dark:border-zinc-700/50">
                      {review.item.images && review.item.images[0] ? (
                        <img 
                          src={review.item.images[0]} 
                          alt={review.item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">No Image</div>
                      )}
                    </div>
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-2 truncate group-hover:text-emerald-600 transition-colors">
                      {review.item.title}
                    </h4>
                  </Link>
                ) : (
                  <div className="w-full md:w-32 flex-shrink-0 aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                    Item Deleted
                  </div>
                )}

                <div className="flex-1 w-full flex flex-col justify-between h-full">
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
            ))}

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
    </div>
  );
}
