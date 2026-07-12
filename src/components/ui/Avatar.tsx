import React from "react";

type AvatarProps = {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Avatar({
  src,
  alt = "User avatar",
  size = "md",
  className = "",
}: AvatarProps) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-xl",
  };

  const placeholderUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(alt)}`;

  return (
    <div
      className={`relative inline-block overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 ${sizes[size]} ${className}`}
    >
      <img
        src={src || placeholderUrl}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = placeholderUrl;
        }}
      />
    </div>
  );
}
