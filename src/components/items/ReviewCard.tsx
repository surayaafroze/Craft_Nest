import React, { useState } from "react";
import { motion } from "framer-motion";
import { Review } from "@/types/review";
import { RatingStars } from "./RatingStars";
import { Button } from "../ui/Button";

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onDelete?: (reviewId: string) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  currentUserId,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    if (confirm("Are you sure you want to delete this review?")) {
      setIsDeleting(true);
      await onDelete(review.id);
      // The parent will remove it from the list or we stop loading
      setIsDeleting(false);
    }
  };

  const isOwner = currentUserId && review.user && currentUserId === review.user.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center overflow-hidden border border-emerald-200 dark:border-emerald-800/50">
            {review.user?.avatarUrl ? (
              <img
                src={review.user.avatarUrl}
                alt={review.user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">
                {review.user?.name ? review.user.name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white font-heading tracking-tight">
              {review.user?.name || "Unknown User"}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        {isOwner && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            loading={isDeleting}
            className="px-3 py-1.5 text-xs rounded-lg"
          >
            Delete
          </Button>
        )}
      </div>
      <div className="mb-4">
        <RatingStars rating={review.rating} size="sm" />
      </div>
      <p className="text-zinc-700 dark:text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
        {review.comment}
      </p>
    </motion.div>
  );
};
