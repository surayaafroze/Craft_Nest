import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  description?: string;
  onRetry?: () => void;
  onAction?: () => void;
  actionText?: string;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  description,
  onRetry,
  onAction,
  actionText,
  className
}: ErrorStateProps) {
  const displayMessage = message || description || 'We encountered an error while trying to load this content.';
  const handleRetry = onRetry || onAction;
  const buttonText = actionText || 'Try Again';

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[300px] border rounded-lg bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900", className)}>
      <div className="mb-4 rounded-full bg-red-100 dark:bg-red-900/50 p-4">
        <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">{title}</h3>
      <p className="mt-2 text-sm text-red-600/80 dark:text-red-400/80 max-w-sm">
        {displayMessage}
      </p>
      {handleRetry && (
        <div className="mt-6">
          <Button variant="outline" onClick={handleRetry} className="border-red-200 hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-900">
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}
export default ErrorState;
