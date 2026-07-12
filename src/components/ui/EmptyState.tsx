import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { InboxIcon } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ 
  title = 'No Data Found', 
  description = 'There is no data to display at the moment.',
  icon = <InboxIcon className="h-10 w-10 text-muted-foreground" />,
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[300px] border rounded-lg border-dashed bg-muted/20", className)}>
      <div className="mb-4 rounded-full bg-muted p-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
export default EmptyState;
