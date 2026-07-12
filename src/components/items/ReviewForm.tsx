"use client";

import React, { useState } from "react";
import { RatingStars } from "./RatingStars";
import Button from "../ui/Button";

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (comment.trim().length < 5) {
      setError("Review comment must be at least 5 characters long.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(rating, comment);
      setRating(0);
      setComment("");
    } catch (err: any) {
      setError(err.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Leave a Review</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating
        </label>
        <RatingStars rating={rating} size="lg" interactive onRatingChange={setRating} />
      </div>

      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Review Comment
        </label>
        <textarea
          id="comment"
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
          placeholder="What did you think about this item?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button type="submit" loading={isSubmitting} disabled={isSubmitting} className="w-full sm:w-auto">
        Submit Review
      </Button>
    </form>
  );
};
