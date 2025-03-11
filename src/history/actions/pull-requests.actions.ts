import { quickReviewerApi } from '@/api/quick-reviewer.api';
import { PullRequestFilters } from '../interfaces/pull-request-filters';

export const getPullRequests = async ({
  ownerName,
  repositoryName,
  ...options
}: PullRequestFilters) => {
  const { data } = await quickReviewerApi.get(
    `/history/accounts/${ownerName}/repositories/${repositoryName}/pull-requests`,
    {
      params: options,
    }
  );

  return data;
};
