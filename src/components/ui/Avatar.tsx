"use client";

import * as React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({ className, src, alt, fallback, size = 'md', ...props }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  // Reset error state if src changes
  React.useEffect(() => {
    setImageError(false);
  }, [src]);

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 items-center justify-center',
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="aspect-square h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-medium uppercase text-zinc-600 dark:text-zinc-300">
          {fallback || (alt ? alt.charAt(0) : '?')}
        </span>
      )}
    </div>
  );
}
export default Avatar;
