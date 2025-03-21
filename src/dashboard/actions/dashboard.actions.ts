import { quickReviewerApi } from '@/api/quick-reviewer.api';
import { MetricFilters } from '../interfaces/metric-filters';
import { Metric } from '../interfaces/metric';
import { ChartData } from '../interfaces/chart-data';
import { PaginatedResponse } from '@/shared/interfaces/paginated-response';
import { ReviewInfo } from '../interfaces/review-info';
import { PaginationOptions } from '@/shared/interfaces/pagination-options';
import { mapMetricTime } from '../utils/map-metric-time';

export const getPullRequestAverageCreationCountByRepository = async (
  filters: MetricFilters
): Promise<Metric> => {
  const { data } = await quickReviewerApi.post<Metric>(
    '/statistics/pull-requests/average-creation-count-by-repository',
    filters
  );

  return data;
};

export const getPullRequestAverageCompletionTime = async (
  filters: MetricFilters
): Promise<Metric> => {
  const { data } = await quickReviewerApi.post<Metric>(
    '/statistics/pull-requests/average-completion-time',
    filters
  );

  return mapMetricTime(data);
};

export const getInitialReviewAverageTime = async (
  filters: MetricFilters
): Promise<Metric> => {
  const { data } = await quickReviewerApi.post<Metric>(
    '/statistics/pull-requests/initial-review-average-time',
    filters
  );

  return mapMetricTime(data);
};

export const getAverageReviewCount = async (
  filters: MetricFilters
): Promise<Metric> => {
  const { data } = await quickReviewerApi.post<Metric>(
    '/statistics/pull-requests/average-review-count',
    filters
  );

  return data;
};

export const getPullRequestCountByRepository = async (
  filters: MetricFilters
): Promise<ChartData> => {
  const { data } = await quickReviewerApi.post<ChartData>(
    '/statistics/pull-requests/count-by-repository',
    filters
  );

  return data;
};

export const getReviewCountByRepository = async (
  filters: MetricFilters
): Promise<ChartData> => {
  const { data } = await quickReviewerApi.post<ChartData>(
    '/statistics/pull-requests/review-count-by-repository',
    filters
  );

  return data;
};

export const getLatestReviewsData = async (
  filters: MetricFilters,
  options?: PaginationOptions
): Promise<PaginatedResponse<ReviewInfo>> => {
  const { data } = await quickReviewerApi.post<PaginatedResponse<ReviewInfo>>(
    '/history/reviews',
    filters,
    {
      params: {
        page: options?.page,
        limit: options?.limit,
      },
    }
  );

  return data;
};
