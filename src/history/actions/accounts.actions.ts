import { quickReviewerApi } from '@/api/quick-reviewer.api';
import { PaginatedResponse } from '@/shared/interfaces/paginated-response';
import { Account } from '../interfaces/account';
import { PaginationOptions } from '@/shared/interfaces/pagination-options';

export const getAllAccounts = async (options: PaginationOptions) => {
  const { data } = await quickReviewerApi.get<PaginatedResponse<Account>>(
    '/history/accounts',
    { params: options }
  );
  return data;
};

export const getOrganizations = async (options: PaginationOptions) => {
  const { data } = await quickReviewerApi.get<PaginatedResponse<Account>>(
    '/history/accounts/organizations',
    { params: options }
  );
  return data;
};

export const getUsers = async (options: PaginationOptions) => {
  const { data } = await quickReviewerApi.get<PaginatedResponse<Account>>(
    '/history/accounts/users',
    { params: options }
  );
  return data;
};
