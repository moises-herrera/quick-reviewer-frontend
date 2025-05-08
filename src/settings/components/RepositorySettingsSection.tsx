import { useAuthStore } from '@/auth/store/useAuthStore';
import { getRepositories } from '@/history/actions/repository.actions';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RepositorySettings } from './RepositorySettings';
import { AxiosError } from 'axios';
import { CardsListSkeleton } from '@/shared/components/CardsListSkeleton';
import { useScrollPagination } from '@/shared/hooks/useScrollPagination';
import { useMemo } from 'react';
import { Repository } from '@/history/interfaces/repository';
import { LoaderCircle } from 'lucide-react';

export const RepositorySettingsSection = () => {
  const account = useAuthStore(({ account }) => account);
  const { data, isLoading, isFetchingNextPage, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['repository-settings', account?.id],
      queryFn: ({ pageParam }) =>
        getRepositories({
          ownerName: account?.name || '',
          page: pageParam,
          limit: 10,
          includeSettings: true,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.page + 1,
      getPreviousPageParam: (lastPage) => lastPage.page - 1,
      refetchOnWindowFocus: false,
    });

  const allRepositories = useMemo(() => {
    if (!data?.pages) {
      return [];
    }

    return data.pages
      .reduce((repositories, page) => {
        return [...repositories, ...page.data];
      }, [] as Repository[])
      .filter(({ users }) => users[0].canConfigureBot);
  }, [data?.pages]);

  useScrollPagination({
    isLoading: isLoading || isFetchingNextPage,
    currentRecords: allRepositories.length || 0,
    total: data?.pages[0].total || 0,
    fetchNextPage,
  });
  const hasNotPermissions =
    error instanceof AxiosError && error?.status === 403;

  if (isLoading) {
    return <CardsListSkeleton />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-xl font-medium">Repository settings</h3>
        <p className="text-gray-600">
          {hasNotPermissions
            ? 'You do not have permission to manage these settings. Only an admin or maintainer can make changes.'
            : allRepositories.length > 0
            ? 'Manage your repository settings here.'
            : 'Here will be listed the repositories you can manage.'}
        </p>
      </div>

      {!hasNotPermissions &&
        allRepositories.map((repository) => (
          <RepositorySettings
            key={repository.id}
            repository={repository}
            accountId={account?.id}
            accountName={account?.name}
          />
        ))}
      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <LoaderCircle className="!size-6 animate-spin" />
        </div>
      )}
    </div>
  );
};
