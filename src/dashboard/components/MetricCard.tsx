import { cn } from '@/lib/utils';
import { FC } from 'react';
import { MetricCardSkeleton } from './MetricCardSkeleton';
import { Metric } from '../interfaces/metric';
import { Button } from '@/components/ui/button';

interface MetricCardProps {
  metric?: Metric;
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
  refetch: () => void;
}

export const MetricCard: FC<MetricCardProps> = ({
  metric,
  className,
  isLoading = false,
  isError = false,
  refetch,
}) => {
  if (isLoading) {
    return <MetricCardSkeleton />;
  }

  return (
    <div
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow',
        'p-4 flex flex-col gap-y-2',
        className
      )}
    >
      {metric && !isError ? (
        <>
          <h3 className="font-semibold text-base">{metric.name}</h3>
          <div className="flex gap-x-2 items-end">
            <span className="font-medium text-2xl">
              {metric.value % 1 === 0 ? metric.value : metric.value.toFixed(2)}
            </span>
            <span className="text-xl">{metric.unit}</span>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-red-500 font-semibold text-base">
            Error fetching data
          </h3>

          <Button
            variant="outline"
            className="mt-2 w-fit"
            onClick={refetch}
          >
            Retry
          </Button>
        </>
      )}
    </div>
  );
};
