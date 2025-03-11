import { TableWrapper } from '@/shared/components/TableWrapper';
import { useSearch } from '@/shared/hooks/useSearch';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { getRepositories } from '../../actions/repository.actions';
import { useNavigate, useParams } from 'react-router';
import { RepositoriesTable } from './RepositoriesTable';
import { TableTitle } from '@/shared/components/TableTitle';
import { toast } from 'sonner';

const LIMIT = 20;

export const Repositories = () => {
  const navigate = useNavigate();
  const { ownerName = '' } = useParams();
  const { debouncedSearchTerm, onSearch } = useSearch({ value: '' });
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isRefetching, error } = useQuery({
    queryKey: [
      'repositories',
      {
        ownerName,
        page,
        limit: LIMIT,
        search: debouncedSearchTerm,
      },
    ],
    queryFn: () =>
      getRepositories({
        ownerName,
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

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong while fetching repositories');

      navigate(`/history`);
    }
  }, [error]);

  return (
    <section className="w-full h-full">
      <TableTitle title={`Repositories of ${ownerName}`} />

      <TableWrapper
        isLoading={isLoading || isRefetching}
        totalPages={totalPages}
        onSearch={onSearch}
        page={page}
        onPageChange={setPage}
      >
        <RepositoriesTable accountName={ownerName} data={data?.data || []} />
      </TableWrapper>
    </section>
  );
};
