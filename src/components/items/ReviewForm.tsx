"use client";

import React, { useState } from "react";
import { RatingStars } from "./RatingStars";
import { Button } from "../ui/Button";
import FormTextarea from "../ui/FormTextarea";

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
    <form onSubmit={handleSubmit} className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 font-heading tracking-tight">Leave a Review</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
          Rating
        </label>
        <RatingStars rating={rating} size="lg" interactive onRatingChange={setRating} />
      </div>

      <div className="mb-6">
        <FormTextarea
          id="comment"
          label="Review Comment"
          rows={4}
          placeholder="What did you think about this item?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button type="submit" loading={isSubmitting} disabled={isSubmitting} className="w-full rounded-xl">
        Submit Review
      </Button>
    </form>
  );
};
