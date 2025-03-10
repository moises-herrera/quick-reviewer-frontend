import { useQuery } from '@tanstack/react-query';
import {
  getPullRequestAverageCreationCountByRepository,
  getPullRequestAverageCompletionTime,
  getInitialReviewAverageTime,
  getAverageReviewCount,
} from '../actions/dashboard.actions';
import { MetricFilters } from '../interfaces/metric-filters';

export const useGetMetrics = (filters: MetricFilters) => {
  const averageCreationCountQuery = useQuery({
    queryKey: ['getPullRequestAverageCreationCountByRepository', filters],
    queryFn: () => getPullRequestAverageCreationCountByRepository(filters),
  });
  const averageCompletionTimeQuery = useQuery({
    queryKey: ['getPullRequestAverageCompletionTime', filters],
    queryFn: () => getPullRequestAverageCompletionTime(filters),
  });
  const initialReviewAverageTimeQuery = useQuery({
    queryKey: ['getInitialReviewAverageTime', filters],
    queryFn: () => getInitialReviewAverageTime(filters),
  });
  const averageReviewCountQuery = useQuery({
    queryKey: ['getAverageReviewCount', filters],
    queryFn: () => getAverageReviewCount(filters),
  });

  return {
    averageCreationCountQuery,
    averageCompletionTimeQuery,
    initialReviewAverageTimeQuery,
    averageReviewCountQuery,
  };
};
