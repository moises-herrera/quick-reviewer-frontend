import { Input } from '@/components/ui/input';
import { FC, JSX } from 'react';
import { TableSkeleton } from './TableSkeleton';
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import noDataImage from '@/assets/no-data.svg';

interface TableWrapperProps {
  children?: JSX.Element;
  isLoading: boolean;
  totalPages: number;
  page: number;
  onSearch?: (search: string) => void;
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
    onSearch && onSearch(search);
    onPageChange(1);
  };

  const setPreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const setNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <>
      <section className="mt-4 flex flex-col space-y-4 border-b border-b-slate-200">
        {onSearch && (
          <Input
            className="max-w-[40%]"
            placeholder="Search"
            onChange={(event) => handleSearch(event.target.value)}
            disabled={isLoading}
            startIcon={Search}
          />
        )}

        {isLoading ? (
          <TableSkeleton />
        ) : totalPages > 0 ? (
          children
        ) : (
          <div className="flex flex-col max-w-full items-center justify-center rounded-md border-2 border-muted p-8 gap-y-6">
            <img
              src={noDataImage}
              alt="No data"
              className="w-[300px]"
            />
            <p className="text-muted-foreground">No data found</p>
          </div>
        )}
      </section>

      {totalPages > 0 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={setPreviousPage}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className={`cursor-pointer ${
                    page === index + 1 ? 'text-primary font-bold' : ''
                  }`}
                  onClick={() => onPageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={setNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};
