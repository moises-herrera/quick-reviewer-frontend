import { PaginationOptions } from '@/shared/interfaces/pagination-options';

export interface PullRequestReviewFilters extends PaginationOptions {
  ownerName: string;
  repositoryName: string;
  pullRequestNumber: number;
}
