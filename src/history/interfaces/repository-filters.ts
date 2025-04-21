import { PaginationOptions } from '@/shared/interfaces/pagination-options';

export interface RepositoryFilters extends PaginationOptions {
  ownerName: string;
  includeSettings?: boolean;
}
