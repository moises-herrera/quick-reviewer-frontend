import { TableWrapper } from '@/shared/components/TableWrapper';
import { useSearch } from '@/shared/hooks/useSearch';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { RepositoriesTable } from './RepositoriesTable';
import { getRepositories } from '../actions/repository';
import { useLocation, useParams } from 'react-router';

export const Repositories = () => {
  const { accountId } = useParams();
  const {
    state: { accountName },
  } = useLocation();
  const { debouncedSearchTerm, onSearch } = useSearch({ value: '' });
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [
      'repositories',
      {
        ownerId: Number(accountId),
        page,
        limit: 20,
        search: debouncedSearchTerm,
      },
    ],
    queryFn: () =>
      getRepositories({
        ownerId: Number(accountId),
        page,
        limit: 20,
        search: debouncedSearchTerm,
      }),
    staleTime: 1000 * 60 * 60,
  });
  const totalPages = useMemo(() => {
    if (!data) return 0;

    return Math.ceil(data?.total / 10);
  }, [data]);

  return (
    <section className="w-full h-full">
      <h2 className="text-2xl font-semibold mb-4 truncate">
        Repositories of {accountName}
      </h2>

      <TableWrapper
        isLoading={isLoading || isRefetching}
        totalPages={totalPages}
        onSearch={onSearch}
        page={page}
        onPageChange={setPage}
      >
        <RepositoriesTable accountName={accountName} data={data?.data || []} />
      </TableWrapper>
    </section>
  );
};
