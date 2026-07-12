import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number; // 0 to 5
  max?: number;
  size?: number;
  className?: string;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

export function RatingStars({ rating, max = 5, size = 16, className, onChange, readonly = true }: RatingStarsProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = rating >= starValue;
        
        return (
          <button
            key={i}
            type="button"
            onClick={() => !readonly && onChange && onChange(starValue)}
            disabled={readonly}
            className={cn(
              "focus:outline-none transition-transform",
              !readonly && "hover:scale-110",
              readonly && "cursor-default"
            )}
          >
            <Star
              size={size}
              className={cn(
                isFilled ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground",
                !readonly && "hover:fill-yellow-300 hover:text-yellow-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
