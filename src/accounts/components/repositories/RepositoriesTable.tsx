import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Repository } from '../../interfaces/repository';
import { FC } from 'react';
import { GITHUB_URL } from '@/constants/app-constants';
import { Link } from 'react-router';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RepositoryTableProps {
  accountName: string;
  data: Repository[];
}

export const RepositoriesTable: FC<RepositoryTableProps> = ({
  accountName,
  data,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Pull requests</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, name }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">
              {accountName}/{name}
            </TableCell>
            <TableCell>
              <Link
                target="_blank"
                to={`${GITHUB_URL}/${accountName}/${name}`}
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
                to={`/history/${accountName}/repositories/${name}/pulls`}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'text-blue-500 hover:text-blue-700 !pl-0'
                )}
              >
                View pull requests
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
