import { PaginationOptions } from '@/shared/interfaces/pagination-options';

export interface PullRequestFilters extends PaginationOptions {
  ownerName: string;
  repositoryName: string;
}
