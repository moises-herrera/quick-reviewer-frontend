import { TableWrapper } from '@/shared/components/TableWrapper';
import { useSearch } from '@/shared/hooks/useSearch';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PullRequestsTable } from './PullRequestsTable';
import { getPullRequests } from '@/accounts/actions/pull-requests.actions';
import { TableTitle } from '@/shared/components/TableTitle';
import { toast } from 'sonner';

const LIMIT = 20;

export const PullRequests = () => {
  const navigate = useNavigate();
  const { ownerName = '', repositoryName = '' } = useParams();
  const { debouncedSearchTerm, onSearch } = useSearch({ value: '' });
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isRefetching, error } = useQuery({
    queryKey: [
      'pull-requests',
      {
        ownerName,
        repositoryName,
        page,
        limit: LIMIT,
        search: debouncedSearchTerm,
      },
    ],
    queryFn: () =>
      getPullRequests({
        ownerName,
        repositoryName,
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
      toast.error('Something went wrong while fetching pull requests');

      navigate(`/history/${ownerName}/repositories`);
    }
  }, [error]);

  return (
    <section className="w-full h-full">
      <TableTitle title={`${ownerName}/${repositoryName} / Pull requests`} />

      <TableWrapper
        isLoading={isLoading || isRefetching}
        totalPages={totalPages}
        onSearch={onSearch}
        page={page}
        onPageChange={setPage}
      >
        <PullRequestsTable
          accountName={ownerName}
          repositoryName={repositoryName}
          data={data?.data || []}
        />
      </TableWrapper>
    </section>
  );
};
