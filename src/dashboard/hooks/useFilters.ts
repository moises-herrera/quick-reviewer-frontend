import { useLocation, useSearchParams } from 'react-router';
import { MetricFilters } from '../interfaces/metric-filters';
import { useDashboardStore } from '../store/useDashboardStore';
import { useEffect } from 'react';

export const useFilters = () => {
  const { pathname } = useLocation();
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
      setSelectedAccountName(accountName);
      setSelectedRepositories([]);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }

    if (repositories && repositories !== selectedRepositories.join('_')) {
      setSelectedRepositories(repositories?.split('_') ?? []);
    }

    if (startDate && startDate !== selectedStartDate) {
      setSelectedStartDate(startDate);
    }

    if (endDate && endDate !== selectedEndDate) {
      setSelectedEndDate(endDate);
    }
  }, [searchParams]);

  useEffect(() => {
    const accountName = searchParams.get('account');
    const repositories = searchParams.get('repositories');
    const startDate = searchParams.get('from');
    const endDate = searchParams.get('to');

    if (
      pathname.startsWith('/dashboard') &&
      (accountName !== selectedAccountName ||
        repositories !== selectedRepositories.join('_') ||
        startDate !== selectedStartDate ||
        endDate !== selectedEndDate)
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
