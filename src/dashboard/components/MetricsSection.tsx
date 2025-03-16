import { FC } from 'react';
import { useGetMetrics } from '../hooks/useGetMetrics';
import { MetricFilters } from '../interfaces/metric-filters';
import { MetricCard } from './MetricCard';

interface MetricSectionProps {
  filters: MetricFilters;
}

export const MetricsSection: FC<MetricSectionProps> = ({ filters }) => {
  const {
    averageCreationCountQuery,
    averageCompletionTimeQuery,
    initialReviewAverageTimeQuery,
    averageReviewCountQuery,
  } = useGetMetrics(filters);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard
        metric={averageCreationCountQuery.data}
        isLoading={averageCreationCountQuery.isLoading}
        isError={averageCreationCountQuery.isError}
        refetch={averageCreationCountQuery.refetch}
      />
      <MetricCard
        metric={averageCompletionTimeQuery.data}
        isLoading={averageCompletionTimeQuery.isLoading}
        isError={averageCompletionTimeQuery.isError}
        refetch={averageCompletionTimeQuery.refetch}
      />
      <MetricCard
        metric={initialReviewAverageTimeQuery.data}
        isLoading={initialReviewAverageTimeQuery.isLoading}
        isError={initialReviewAverageTimeQuery.isError}
        refetch={initialReviewAverageTimeQuery.refetch}
      />
      <MetricCard
        metric={averageReviewCountQuery.data}
        isLoading={averageReviewCountQuery.isLoading}
        isError={averageReviewCountQuery.isError}
        refetch={averageReviewCountQuery.refetch}
      />
    </section>
  );
};
