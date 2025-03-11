import { quickReviewerApi } from '@/api/quick-reviewer.api';
import { PaginatedResponse } from '@/shared/interfaces/paginated-response';
import { CodeReview } from '../interfaces/code-review';
import { PullRequestReviewFilters } from '../interfaces/pull-request-review-filters';

export const getCodeReviews = async ({
  ownerName,
  repositoryName,
  pullRequestNumber,
  ...options
}: PullRequestReviewFilters) => {
  const { data } = await quickReviewerApi.get<PaginatedResponse<CodeReview>>(
    `/history/accounts/${ownerName}/repositories/${repositoryName}/pull-requests/${pullRequestNumber}/reviews`,
    {
      params: {
        ...options,
      },
    }
  );

  return data;
};
