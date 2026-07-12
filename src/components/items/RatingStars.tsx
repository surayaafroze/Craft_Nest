"use client";

import React from "react";
import { motion } from "framer-motion";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = "md",
  interactive = false,
  onRatingChange,
}) => {
  const stars = [1, 2, 3, 4, 5];

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={!interactive}
          whileHover={interactive ? { scale: 1.2 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          onClick={() => interactive && onRatingChange && onRatingChange(star)}
          className={`focus:outline-none ${interactive ? "cursor-pointer" : "cursor-default"}`}
        >
          <svg
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600"
            } transition-colors duration-200`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.073 6.36h6.69c.969 0 1.371 1.24.588 1.81l-5.416 3.928 2.073 6.36c.3.921-.755 1.688-1.538 1.118l-5.416-3.928-5.416 3.928c-.783.57-1.838-.197-1.538-1.118l2.073-6.36-5.416-3.928c-.783-.57-.38-1.81.588-1.81h6.69l2.073-6.36z"
            />
          </svg>
        </motion.button>
      ))}
    </div>
  );
};
