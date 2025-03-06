import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Link } from 'react-router';
import { GITHUB_URL } from '@/constants/app-constants';
import { FC } from 'react';
import { Account } from '../interfaces/account';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface AccountsTableProps {
  data: Account[];
}

export const AccountsTable: FC<AccountsTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Repositories</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, name }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
              <Link
                target="_blank"
                to={`${GITHUB_URL}/${name}`}
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
                to={`/accounts/${id}/repositories`}
                state={{
                  accountName: name,
                }}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'text-blue-500 hover:text-blue-700 !pl-0'
                )}
              >
                <span>View repositories</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
