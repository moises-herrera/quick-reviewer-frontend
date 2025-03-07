import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { FC } from 'react';
import { CodeReview } from '@/accounts/interfaces/code-review';
import clsx from 'clsx';

interface CodeReviewsTableProps {
  data: CodeReview[];
}

export const CodeReviewsTable: FC<CodeReviewsTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Reviewer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Submitted at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, reviewer, status, createdAt }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>@{reviewer}</TableCell>
            <TableCell>
              <span
                className={clsx(
                  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                  {
                    'bg-green-100 text-green-800': status === 'APPROVED',
                    'bg-red-100 text-red-800': status === 'CHANGES_REQUESTED',
                    'bg-yellow-100 text-yellow-800': status === 'COMMENTED',
                  }
                )}
              >
                {status}
              </span>
            </TableCell>
            <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
