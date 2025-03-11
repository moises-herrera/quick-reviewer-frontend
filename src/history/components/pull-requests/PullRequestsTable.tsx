import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { FC } from 'react';
import { GITHUB_URL } from '@/constants/app-constants';
import { Link } from 'react-router';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PullRequest } from '@/history/interfaces/pull-request';
import clsx from 'clsx';

interface PullRequestTableProps {
  accountName: string;
  repositoryName: string;
  data: PullRequest[];
}

export const PullRequestsTable: FC<PullRequestTableProps> = ({
  accountName,
  repositoryName,
  data,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[100px]">Number</TableHead>
          <TableHead className="max-w-[200px]">Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Additions</TableHead>
          <TableHead>Deletions</TableHead>
          <TableHead>Changed files</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Closed at</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Reviews</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(
          ({
            id,
            title,
            number,
            author,
            additions,
            deletions,
            changedFiles,
            state,
            createdAt,
            closedAt,
          }) => (
            <TableRow key={id}>
              <TableCell className="font-medium max-w-[100px] truncate">
                #{number}
              </TableCell>
              <TableCell className="font-medium max-w-[250px] truncate">
                {title}
              </TableCell>
              <TableCell className="truncate">@{author}</TableCell>
              <TableCell className="text-green-500">+{additions}</TableCell>
              <TableCell className="text-red-500">-{deletions}</TableCell>
              <TableCell>{changedFiles}</TableCell>
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
                {new Date(createdAt.toString()).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {closedAt
                  ? new Date(closedAt.toString()).toLocaleDateString()
                  : ''}
              </TableCell>
              <TableCell>
                <Link
                  target="_blank"
                  to={`${GITHUB_URL}/${accountName}/${repositoryName}/pull/${number}`}
                  className={cn(
                    buttonVariants({ variant: 'link' }),
                    'text-blue-500 hover:text-blue-700 !pl-0'
                  )}
                >
                  View on GitHub
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={`/history/accounts/${accountName}/repositories/${repositoryName}/pulls/${number}/reviews`}
                  className={cn(
                    buttonVariants({ variant: 'link' }),
                    'text-blue-500 hover:text-blue-700 !pl-0'
                  )}
                >
                  View reviews
                </Link>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
