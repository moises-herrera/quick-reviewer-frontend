import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { getUsers } from '../actions/accounts.actions';
import { TableWrapper } from '@/shared/components/TableWrapper';
import { useSearch } from '@/shared/hooks/useSearch';
import { AccountsTable } from './AccountsTable';

export const Users = () => {
  const { debouncedSearchTerm, onSearch } = useSearch({ value: '' });
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: [
      'users',
      {
        page,
        limit: 20,
        search: debouncedSearchTerm,
      },
    ],
    queryFn: () =>
      getUsers({
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
    <TableWrapper
      isLoading={isLoading || isRefetching}
      totalPages={totalPages}
      page={page}
      isError={isError}
      refetch={refetch}
      onSearch={onSearch}
      onPageChange={setPage}
    >
      <AccountsTable data={data?.data || []} />
    </TableWrapper>
  );
};
