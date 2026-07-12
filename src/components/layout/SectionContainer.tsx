import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('py-12 md:py-16 lg:py-20', className)}>
      {children}
    </div>
  );
}
