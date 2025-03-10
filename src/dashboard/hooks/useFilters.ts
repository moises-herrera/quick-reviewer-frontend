import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { MetricFilters } from '../interfaces/metric-filters';
import { useDashboardStore } from '../store/useDashboardStore';

export const useFilters = () => {
  const [searchParams] = useSearchParams();
  const {
    selectedRepositories: repositoriesStored,
    selectedStartDate: startDateStored,
    selectedEndDate: endDateStored,
  } = useDashboardStore();
  const filters = useMemo<MetricFilters>(() => {
    const repositories =
      searchParams.get('repositories')?.split(',') ?? repositoriesStored;
    const startDate = searchParams.get('startDate') ?? startDateStored ?? '';
    const endDate = searchParams.get('endDate') ?? endDateStored ?? '';

    return {
      repositories: repositories.map((id) => Number(id)),
      startDate,
      endDate,
    };
  }, [searchParams, repositoriesStored, startDateStored, endDateStored]);

  return {
    filters,
  };
};
