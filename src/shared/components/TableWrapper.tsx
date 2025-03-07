import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FC, JSX } from 'react';
import { TableSkeleton } from './TableSkeleton';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableWrapperProps {
  children?: JSX.Element;
  isLoading: boolean;
  totalPages: number;
  onSearch: (search: string) => void;
  page: number;
  onPageChange: (page: number) => void;
}

export const TableWrapper: FC<TableWrapperProps> = ({
  children,
  isLoading,
  totalPages,
  onSearch,
  page = 1,
  onPageChange,
}) => {
  const handleSearch = (search: string) => {
    onSearch(search);
    onPageChange(1);
  };

  return (
    <>
      <section className="mt-4 flex flex-col space-y-4">
        <Input
          className="max-w-[40%]"
          placeholder="Search"
          onChange={(event) => handleSearch(event.target.value)}
          disabled={isLoading}
          startIcon={Search}
        />

        {isLoading ? (
          <TableSkeleton />
        ) : totalPages > 0 ? (
          children
        ) : (
          <div className="flex h-[300px] w-full items-center justify-center rounded-md border-2 border-muted">
            <p className="text-muted-foreground">No data found</p>
          </div>
        )}
      </section>

      {(isLoading || totalPages > 0) && (
        <div
          className={cn(
            'flex items-center py-4',
            totalPages === 0 ? 'justify-end' : 'justify-between'
          )}
        >
          {totalPages > 0 && (
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>
          )}

          <div className="space-x-2">
            <Button
              variant="outline"
              disabled={page === 1 || isLoading}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0 || isLoading}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
