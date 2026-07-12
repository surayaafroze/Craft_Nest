"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Item } from "@/types/item";
import { Review } from "@/types/review";
import { useSession, authFetch } from "@/app/lib/auth-client";
import { ImageGallery } from "@/components/items/ImageGallery";
import { RatingStars } from "@/components/items/RatingStars";
import { ReviewCard } from "@/components/items/ReviewCard";
import { ReviewForm } from "@/components/items/ReviewForm";
import { ItemCard } from "@/components/items/ItemCard";
import { ItemCardSkeleton } from "@/components/items/ItemCardSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import Button from "@/components/ui/Button";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;
  const { data: session } = useSession();
  const currentUser = session?.user;

  const [item, setItem] = useState<Item | null>(null);
  const [relatedItems, setRelatedItems] = useState<Item[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItemData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      // Fetch Item Details
      // Use authFetch to send token if available (for owner/admin access to pending items)
      const itemRes = await authFetch(`${serverUrl}/api/items/${itemId}`);
      if (!itemRes.ok) {
        if (itemRes.status === 404) throw new Error("Item not found");
        if (itemRes.status === 403) throw new Error("Access forbidden");
        throw new Error("Failed to fetch item details");
      }
      const itemData = await itemRes.json();
      setItem(itemData.item);

      // Fetch Related Items and Reviews in parallel
      const [relatedRes, reviewsRes] = await Promise.all([
        fetch(`${serverUrl}/api/items/related/${itemId}`),
        fetch(`${serverUrl}/api/items/${itemId}/reviews`)
      ]);

      if (relatedRes.ok) {
        const relatedData = await relatedRes.json();
        setRelatedItems(relatedData.items || []);
      }
      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData.reviews || []);
      }

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    fetchItemData();
  }, [fetchItemData]);

  const handleAddReview = async (rating: number, comment: string) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    const res = await authFetch(`${serverUrl}/api/items/${itemId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to submit review");
    }

    const newReviewData = await res.json();
    const newReview: Review = {
      ...newReviewData.review,
      id: newReviewData.review._id || Date.now().toString(), // fallback
      user: {
        id: currentUser?.id || "",
        name: currentUser?.name || "Me",
        avatarUrl: currentUser?.image || undefined,
      }
    };
    
    // Optimistic update
    setReviews([newReview, ...reviews]);
    if (item) {
      setItem({
        ...item,
        reviewCount: (item.reviewCount || 0) + 1,
        // Approximate new avg rating
        avgRating: item.reviewCount === 0 ? rating : ((item.avgRating || 0) * (item.reviewCount || 0) + rating) / ((item.reviewCount || 0) + 1)
      });
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    const res = await authFetch(`${serverUrl}/api/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete review");
      return;
    }

    // Optimistic remove
    const deletedReview = reviews.find(r => r.id === reviewId);
    setReviews(reviews.filter(r => r.id !== reviewId));
    if (item && deletedReview) {
      const newCount = Math.max(0, (item.reviewCount || 0) - 1);
      const newAvg = newCount === 0 ? 0 : (((item.avgRating || 0) * (item.reviewCount || 0)) - deletedReview.rating) / newCount;
      setItem({
        ...item,
        reviewCount: newCount,
        avgRating: newAvg,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <ErrorState
          title="Oops!"
          description={error || "Item not found."}
          onAction={() => router.push("/explore")}
          actionText="Back to Explore"
        />
      </div>
    );
  }

  const isOwner = currentUser?.id === item.ownerId;
  const hasReviewed = reviews.some(r => r.user?.id === currentUser?.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Section: Images & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <ImageGallery images={item.imageUrls || []} />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full text-xs font-semibold tracking-wide uppercase">
                {item.category}
              </span>
              {item.status !== "approved" && (
                <span className="ml-2 inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-semibold tracking-wide uppercase">
                  {item.status}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white font-heading mb-4">
              {item.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <RatingStars rating={item.avgRating || 0} size="md" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                  {Number(item.avgRating || 0).toFixed(1)}
                </span>
              </div>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.reviewCount || 0} {(item.reviewCount || 0) === 1 ? "review" : "reviews"}
              </span>
            </div>

            <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-8 font-heading">
              ${item.price.toFixed(2)}
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {item.description || item.shortDescription}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col gap-1">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Location</span>
                <span className="text-gray-900 dark:text-white font-medium">{item.location || "N/A"}</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col gap-1">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Quantity Available</span>
                <span className="text-gray-900 dark:text-white font-medium">{item.quantity !== undefined ? item.quantity : "N/A"}</span>
              </div>
            </div>

            <div className="mt-auto">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => alert("Contact seller feature coming soon!")}>
                Contact Seller
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading mb-8">
            Reviews ({item.reviewCount || 0})
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                reviews.map(review => (
                  <ReviewCard 
                    key={review.id} 
                    review={review} 
                    currentUserId={currentUser?.id}
                    onDelete={handleDeleteReview}
                  />
                ))
              )}
            </div>
            
            <div className="lg:col-span-1">
              {currentUser ? (
                isOwner ? (
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      You are the owner of this item. You cannot review your own items.
                    </p>
                  </div>
                ) : hasReviewed ? (
                  <div className="bg-teal-50 dark:bg-teal-900/30 p-6 rounded-2xl border border-teal-100 dark:border-teal-800/50">
                    <p className="text-teal-800 dark:text-teal-300 text-sm font-medium">
                      Thanks for your review!
                    </p>
                    <p className="text-teal-600 dark:text-teal-400 text-xs mt-2">
                      You have already submitted a review for this item.
                    </p>
                  </div>
                ) : (
                  <ReviewForm onSubmit={handleAddReview} />
                )
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    Please log in to leave a review.
                  </p>
                  <Button variant="outline" onClick={() => router.push("/login")}>
                    Log In
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-gray-200 dark:border-gray-800 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-heading mb-8">
              Similar Items You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map(relatedItem => (
                <ItemCard key={relatedItem.id} item={relatedItem} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
