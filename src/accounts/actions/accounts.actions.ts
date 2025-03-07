import { quickReviewerApi } from '@/api/quick-reviewer.api';
import { PaginatedResponse } from '@/shared/interfaces/paginated-response';
import { Account } from '../interfaces/account';
import { PaginationOptions } from '@/shared/interfaces/pagination-options';

export const getOrganizations = async (options: PaginationOptions) => {
  const { data } = await quickReviewerApi.get<PaginatedResponse<Account>>(
    '/analytics/accounts/organizations',
    { params: options }
  );
  return data;
};

export const getUsers = async (options: PaginationOptions) => {
  const { data } = await quickReviewerApi.get<PaginatedResponse<Account>>(
    '/analytics/accounts/users',
    { params: options }
  );
  return data;
};
