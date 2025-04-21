import { quickReviewerApi } from '@/api/quick-reviewer.api';
import { BotSettings } from 'src/settings/interfaces/bot-settings';

export const getAccountSettings = (accountId: string) => {
  return quickReviewerApi.get<BotSettings>(`/accounts/${accountId}/settings`);
};

export const updateAccountSettings = (
  accountId: string,
  settings: BotSettings
) => {
  return quickReviewerApi.put(`/accounts/${accountId}/settings`, settings);
};

export const syncAccountSettings = async (accountId: string) => {
  await quickReviewerApi.delete(
    `/accounts/${accountId}/settings/sync-repositories`
  );
};
