import { useAuthStore } from '@/auth/store/useAuthStore';
import { getRepositories } from '@/history/actions/repository.actions';
import { useQuery } from '@tanstack/react-query';
import { RepositorySettings } from './RepositorySettings';
import { AxiosError } from 'axios';
import { CardsListSkeleton } from '@/shared/components/CardsListSkeleton';

export const RepositorySettingsSection = () => {
  const account = useAuthStore(({ account }) => account);
  const { data, isLoading, error } = useQuery({
    queryKey: ['repository-settings', account?.id],
    queryFn: () =>
      getRepositories({
        ownerName: account?.name || '',
        page: 1,
        limit: 100,
        includeSettings: true,
      }),
    refetchOnWindowFocus: false,
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
            : 'Manage your repository settings here.'}
        </p>
      </div>

      {!hasNotPermissions &&
        data?.data.map((repository) => (
          <RepositorySettings
            key={repository.id}
            repository={repository}
            accountId={account?.id}
          />
        ))}
    </div>
  );
};
