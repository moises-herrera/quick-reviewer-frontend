import { TableWrapper } from '@/shared/components/TableWrapper';
import { useSearch } from '@/shared/hooks/useSearch';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { CodeReviewsTable } from './CodeReviewsTable';
import { getCodeReviews } from '@/history/actions/code-review.actions';
import { TableTitle } from '@/shared/components/TableTitle';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const LIMIT = 20;

export const CodeReviews = () => {
  const navigate = useNavigate();
  const {
    ownerName = '',
    repositoryName = '',
    pullRequestNumber = 0,
  } = useParams();
  const { debouncedSearchTerm, onSearch } = useSearch({ value: '' });
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isRefetching, error } = useQuery({
    queryKey: [
      'code-reviews',
      {
        ownerName,
        repositoryName,
        pullRequestNumber: Number(pullRequestNumber),
        page,
        limit: LIMIT,
        search: debouncedSearchTerm,
      },
    ],
    queryFn: () =>
      getCodeReviews({
        ownerName,
        repositoryName,
        pullRequestNumber: Number(pullRequestNumber),
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
      toast.error('Something went wrong while fetching code reviews');

      navigate(`/history/accounts/${ownerName}/repositories/${repositoryName}/pulls`);
    }
  }, [error]);

  return (
    <section className="w-full h-full">
      <TableTitle
        title={`${ownerName}/${repositoryName} / Code reviews of PR #${pullRequestNumber}`}
      />

      <TableWrapper
        isLoading={isLoading || isRefetching}
        totalPages={totalPages}
        onSearch={onSearch}
        page={page}
        onPageChange={setPage}
      >
        <CodeReviewsTable data={data?.data || []} />
      </TableWrapper>
    </section>
  );
};
