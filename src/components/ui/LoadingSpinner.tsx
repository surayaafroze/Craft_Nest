import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoadingSpinner({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <div className={cn('flex items-center justify-center w-full h-full min-h-[100px]', className)}>
      <Loader2 size={size} className="animate-spin text-primary" />
    </div>
  );
}
