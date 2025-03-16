import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { getLatestReviewsData } from '../actions/dashboard.actions';
import { TableWrapper } from '@/shared/components/TableWrapper';
import { Link } from 'react-router';
import { GITHUB_URL } from '@/constants/app-constants';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { FC, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MetricFilters } from '../interfaces/metric-filters';

const LIMIT = 10;

interface ReviewsSectionProps {
  filters: MetricFilters;
}

export const ReviewsSection: FC<ReviewsSectionProps> = ({ filters }) => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      'getReviews',
      {
        ...filters,
        page,
        limit: LIMIT,
      },
    ],
    queryFn: () => getLatestReviewsData(filters, { page, limit: LIMIT }),
  });

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Reviews summary</h2>
        <p className="text-sm text-muted-foreground">
          This table shows the reviews made by the team.
        </p>
      </CardHeader>

      <CardContent>
        <TableWrapper
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          totalPages={data?.totalPages ?? 0}
          onPageChange={setPage}
          page={page}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Repository</TableHead>
                <TableHead>PR Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>PR state</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Review state</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Reviewed at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map(
                ({
                  id,
                  status,
                  reviewer,
                  createdAt: reviewedAt,
                  pullRequest: { repository, number, title, state, createdAt },
                }) => (
                  <TableRow key={id}>
                    <TableCell className="font-medium">
                      {repository.owner.name}/{repository.name}
                    </TableCell>
                    <TableCell>
                      <Link
                        target="_blank"
                        to={`${GITHUB_URL}/${repository.owner.name}/${repository.name}/pull/${number}`}
                        className={cn(
                          buttonVariants({ variant: 'link' }),
                          'text-blue-500 hover:text-blue-700 !pl-0'
                        )}
                      >
                        #{number}
                      </Link>
                    </TableCell>
                    <TableCell
                      className="font-medium max-w-[250px] truncate"
                      title={title}
                    >
                      {title}
                    </TableCell>
                    <TableCell>
                      <span
                        className={clsx(
                          'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                          {
                            'bg-green-100 text-green-800':
                              state.toLowerCase() === 'open',
                            'bg-red-100 text-red-800':
                              state.toLowerCase() === 'closed',
                          }
                        )}
                      >
                        {state.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={clsx(
                          'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                          {
                            'bg-green-100 text-green-800':
                              status === 'APPROVED',
                            'bg-red-100 text-red-800':
                              status === 'CHANGES_REQUESTED',
                            'bg-yellow-100 text-yellow-800':
                              status === 'COMMENTED',
                          }
                        )}
                      >
                        {status}
                      </span>
                    </TableCell>
                    <TableCell>@{reviewer}</TableCell>
                    <TableCell>
                      {new Date(reviewedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </CardContent>
    </Card>
  );
};
