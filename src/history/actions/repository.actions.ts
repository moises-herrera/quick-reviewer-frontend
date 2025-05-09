import { quickReviewerApi } from '@/api/quick-reviewer.api';
import { RepositoryFilters } from '../interfaces/repository-filters';
import { PaginatedResponse } from '@/shared/interfaces/paginated-response';
import { Repository } from '../interfaces/repository';

export const getRepositories = async ({
  ownerName: ownerId,
  ...options
}: RepositoryFilters) => {
  const { data } = await quickReviewerApi.get<PaginatedResponse<Repository>>(
    `/history/accounts/${ownerId}/repositories`,
    {
      params: options,
    }
  );

  return data;
};
