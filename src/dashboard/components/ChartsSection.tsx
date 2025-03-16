import { useQuery } from '@tanstack/react-query';
import {
  getPullRequestCountByRepository,
  getReviewCountByRepository,
} from '../actions/dashboard.actions';
import { DataByRepositoryChart } from './DataByRepositoryChart';
import { MetricFilters } from '../interfaces/metric-filters';
import { FC } from 'react';

interface ChartsSectionProps {
  filters: MetricFilters;
}

export const ChartsSection: FC<ChartsSectionProps> = ({ filters }) => {
  const pullRequestsByRepositoryQuery = useQuery({
    queryKey: ['getPullRequestCountByRepository', filters],
    queryFn: () => getPullRequestCountByRepository(filters),
  });
  const reviewsByRepositoryQuery = useQuery({
    queryKey: ['getReviewCountByRepository', filters],
    queryFn: () => getReviewCountByRepository(filters),
  });

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <DataByRepositoryChart
        data={pullRequestsByRepositoryQuery.data}
        isLoading={pullRequestsByRepositoryQuery.isLoading}
        isError={pullRequestsByRepositoryQuery.isError}
        refetch={pullRequestsByRepositoryQuery.refetch}
      />
      <DataByRepositoryChart
        data={reviewsByRepositoryQuery.data}
        isLoading={reviewsByRepositoryQuery.isLoading}
        isError={reviewsByRepositoryQuery.isError}
        refetch={reviewsByRepositoryQuery.refetch}
      />
    </div>
  );
};
