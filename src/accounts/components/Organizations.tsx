import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { getOrganizations } from '../actions/accounts.actions';
import { TableWrapper } from '@/shared/components/TableWrapper';
import { useSearch } from '@/shared/hooks/useSearch';
import { AccountsTable } from './AccountsTable';

const LIMIT = 20;

export const Organizations = () => {
  const { debouncedSearchTerm, onSearch } = useSearch({ value: '' });
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [
      'accounts',
      {
        page,
        limit: LIMIT,
        search: debouncedSearchTerm,
      },
    ],
    queryFn: () =>
      getOrganizations({
        page,
        limit: LIMIT,
        search: debouncedSearchTerm,
      }),
    staleTime: 1000 * 60 * 60,
  });
  const totalPages = useMemo(() => {
    if (!data) return 0;

    return Math.ceil(data?.total / LIMIT);
  }, [data]);

  return (
    <>
      <TableWrapper
        isLoading={isLoading || isRefetching}
        totalPages={totalPages}
        onSearch={onSearch}
        page={page}
        onPageChange={setPage}
      >
        <AccountsTable data={data?.data || []} />
      </TableWrapper>
    </>
  );
};
