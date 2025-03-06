import { useState } from 'react';
import { useDebounce } from 'use-debounce';

interface UseSearchProps {
  value: string;
}

export const useSearch = ({ value }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(value);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 600);

  return {
    onSearch: setSearchTerm,
    debouncedSearchTerm,
  };
};
