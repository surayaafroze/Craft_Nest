import React, { useState } from "react";
import { motion } from "framer-motion";
import { Review } from "@/types/review";
import { RatingStars } from "./RatingStars";
import Button from "../ui/Button";

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
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center overflow-hidden">
            {review.user?.avatarUrl ? (
              <img
                src={review.user.avatarUrl}
                alt={review.user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-teal-600 dark:text-teal-400 font-bold">
                {review.user?.name ? review.user.name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {review.user?.name || "Unknown User"}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
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
            className="px-3 py-1 text-xs"
          >
            Delete
          </Button>
        )}
      </div>
      <div className="mb-3">
        <RatingStars rating={review.rating} size="sm" />
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
        {review.comment}
      </p>
    </motion.div>
  );
};
