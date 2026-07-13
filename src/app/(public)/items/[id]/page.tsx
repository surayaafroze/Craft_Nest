"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Edit2, Trash2, MapPin, Box } from "lucide-react";
import toast from "react-hot-toast";

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
import { Button } from "@/components/ui/Button";
import { confirmDeleteToast } from "@/app/lib/toastConfirm";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;
  const { data: session } = useSession();
  const currentUser = session?.user;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const [item, setItem] = useState<Item | null>(null);
  const [relatedItems, setRelatedItems] = useState<Item[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeletingItem, setIsDeletingItem] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const fetchItemData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch Item Details
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
      
      // Fetch Wishlist status if logged in
      if (currentUser) {
        const wishlistRes = await authFetch(`${serverUrl}/api/wishlist`);
        if (wishlistRes.ok) {
          const wishlistData = await wishlistRes.json();
          // The API likely returns { wishlist: { itemIds: string[] } }
          const itemIds = wishlistData.wishlist?.itemIds || [];
          if (itemIds.includes(itemId)) {
            setIsInWishlist(true);
          }
        }
      }

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [itemId, currentUser, serverUrl]);

  useEffect(() => {
    fetchItemData();
  }, [fetchItemData]);

  const handleToggleWishlist = async () => {
    if (!currentUser) return router.push("/login");
    
    try {
      setIsWishlistLoading(true);
      const method = isInWishlist ? "DELETE" : "POST";
      const res = await authFetch(`${serverUrl}/api/wishlist/${itemId}`, { method });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update wishlist");
      }
      
      setIsInWishlist(!isInWishlist);
      toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    const confirmed = await confirmDeleteToast("Are you sure you want to delete this item? This action cannot be undone.");
    if (!confirmed) return;
    
    try {
      setIsDeletingItem(true);
      const res = await authFetch(`${serverUrl}/api/items/${itemId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete item");
      }
      toast.success("Item deleted successfully");
      router.push("/explore");
    } catch (err: any) {
      toast.error(err.message);
      setIsDeletingItem(false);
    }
  };

  const handleAddReview = async (rating: number, comment: string) => {
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
      id: newReviewData.review._id || Date.now().toString(),
      user: {
        id: currentUser?.id || "",
        name: currentUser?.name || "Me",
        avatarUrl: currentUser?.image || undefined,
      }
    };
    
    setReviews([newReview, ...reviews]);
    if (item) {
      setItem({
        ...item,
        reviewCount: (item.reviewCount || 0) + 1,
        avgRating: item.reviewCount === 0 ? rating : ((item.avgRating || 0) * (item.reviewCount || 0) + rating) / ((item.reviewCount || 0) + 1)
      });
    }
    toast.success("Review submitted!");
  };

  const handleDeleteReview = async (reviewId: string) => {
    const res = await authFetch(`${serverUrl}/api/reviews/${reviewId}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Failed to delete review");
      return;
    }

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
    toast.success("Review deleted");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-500">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
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
  const isAdmin = (currentUser as any)?.role === "admin";
  const hasReviewed = reviews.some(r => r.user?.id === currentUser?.id);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Section: Images & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <ImageGallery images={item.images || []} />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-bold tracking-wider uppercase">
                {item.category}
              </span>
              {item.status !== "approved" && (
                <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-xs font-bold tracking-wider uppercase">
                  {item.status}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white font-heading mb-4 tracking-tight leading-tight">
              {item.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5">
                <RatingStars rating={item.avgRating || 0} size="md" />
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  {Number(item.avgRating || 0).toFixed(1)}
                </span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {item.reviewCount || 0} {(item.reviewCount || 0) === 1 ? "review" : "reviews"}
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 mb-8 font-heading">
              ${item.price.toFixed(2)}
            </div>

            <div className="prose dark:prose-invert max-w-none mb-10 text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed text-base sm:text-lg">
              {item.fullDescription || item.shortDescription}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-3 shadow-sm">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Location</span>
                  <span className="text-zinc-900 dark:text-white font-semibold">{item.location || "N/A"}</span>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-3 shadow-sm">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <Box className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Quantity</span>
                  <span className="text-zinc-900 dark:text-white font-semibold">{item.quantity !== undefined ? item.quantity : "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              {/* Actions */}
              {isOwner || isAdmin ? (
                <>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="flex-1 rounded-xl"
                    onClick={() => router.push(`/dashboard/items/edit/${item.id}`)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Item
                  </Button>
                  <Button 
                    size="lg" 
                    variant="danger" 
                    className="flex-1 rounded-xl"
                    loading={isDeletingItem}
                    onClick={handleDeleteItem}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Item
                  </Button>
                </>
              ) : (
                <Button 
                  size="lg" 
                  variant="outline"
                  className={`w-full rounded-xl flex items-center justify-center gap-2 ${isInWishlist ? 'text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/40' : ''}`}
                  loading={isWishlistLoading}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                  {isInWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-zinc-200 dark:border-zinc-800 pt-16">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading mb-10 tracking-tight">
            Reviews ({item.reviewCount || 0})
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center p-10 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">No reviews yet. Be the first to review!</p>
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
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl border border-blue-200 dark:border-blue-800/50">
                    <p className="text-blue-800 dark:text-blue-300 text-sm font-medium leading-relaxed">
                      You are the owner of this item. You cannot review your own items.
                    </p>
                  </div>
                ) : hasReviewed ? (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-3xl border border-emerald-200 dark:border-emerald-800/50">
                    <p className="text-emerald-800 dark:text-emerald-300 text-lg font-bold font-heading mb-2">
                      Thanks for your review!
                    </p>
                    <p className="text-emerald-700 dark:text-emerald-400/80 text-sm font-medium">
                      You have already submitted a review for this item.
                    </p>
                  </div>
                ) : (
                  <ReviewForm onSubmit={handleAddReview} />
                )
              ) : (
                <div className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center">
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 font-medium">
                    Please log in to leave a review.
                  </p>
                  <Button variant="outline" className="w-full rounded-xl" onClick={() => router.push("/login")}>
                    Log In
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-zinc-200 dark:border-zinc-800 pt-16">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white font-heading mb-10 tracking-tight">
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
