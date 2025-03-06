import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FC, JSX } from 'react';
import { TableSkeleton } from './TableSkeleton';
import { Search } from 'lucide-react';

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
      <div className="mt-4 flex flex-col space-y-4">
        <div>
          <Input
            className="max-w-[40%]"
            placeholder="Search"
            onChange={(event) => handleSearch(event.target.value)}
            disabled={isLoading}
            startIcon={Search}
          />
        </div>

        {isLoading ? <TableSkeleton /> : children}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
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
    </>
  );
};
