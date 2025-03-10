import { cn } from '@/lib/utils';

export const MetricCardSkeleton = () => {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow',
        'p-4 flex flex-col gap-y-2',
        'animate-pulse'
      )}
    >
      <div className="h-4 w-1/2 rounded-md bg-muted" />
      <div className="h-4 w-1/4 rounded-md bg-muted" />
      <div className="h-4 w-1/4 rounded-md bg-muted" />
      <div className="h-4 w-1/4 rounded-md bg-muted" />
    </div>
  );
};
