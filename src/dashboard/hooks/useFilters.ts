import { useSearchParams } from 'react-router';
import { MetricFilters } from '../interfaces/metric-filters';
import { useDashboardStore } from '../store/useDashboardStore';
import { useEffect } from 'react';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    selectedAccountName,
    selectedRepositories,
    selectedStartDate,
    selectedEndDate,
    setSelectedAccountName,
    setSelectedRepositories,
    setSelectedStartDate,
    setSelectedEndDate,
  } = useDashboardStore();

  useEffect(() => {
    const accountName = searchParams.get('account');
    const repositories = searchParams.get('repositories');
    const startDate = searchParams.get('from');
    const endDate = searchParams.get('to');

    if (accountName && accountName !== selectedAccountName) {
      setSelectedAccountName(accountName ?? null);
    }

    if (repositories !== selectedRepositories.join('_')) {
      setSelectedRepositories(repositories?.split('_') ?? []);
    }

    if (startDate !== selectedStartDate) {
      setSelectedStartDate(startDate ?? null);
    }

    if (endDate !== selectedEndDate) {
      setSelectedEndDate(endDate ?? null);
    }
  }, [searchParams]);

  useEffect(() => {
    const accountName = searchParams.get('account');
    const repositories = searchParams.get('repositories');
    const startDate = searchParams.get('from');
    const endDate = searchParams.get('to');

    if (
      accountName !== selectedAccountName ||
      repositories !== selectedRepositories.join('_') ||
      startDate !== selectedStartDate ||
      endDate !== selectedEndDate
    ) {
      setSearchParams(
        (prev) => {
          if (selectedAccountName) {
            prev.set('account', selectedAccountName);
          } else {
            prev.delete('account');
          }

          if (selectedRepositories.length) {
            prev.set('repositories', selectedRepositories.join('_'));
          } else {
            prev.delete('repositories');
          }

          if (selectedStartDate) {
            prev.set('from', selectedStartDate);
          } else {
            prev.delete('from');
          }

          if (selectedEndDate) {
            prev.set('to', selectedEndDate);
          } else {
            prev.delete('to');
          }

          return prev;
        },
        {
          replace: true,
        }
      );
    }
  }, [
    selectedAccountName,
    selectedRepositories,
    selectedStartDate,
    selectedEndDate,
  ]);

  return {
    filters: <MetricFilters>{
      accountName: selectedAccountName ?? '',
      repositories: selectedRepositories,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    },
  };
};
