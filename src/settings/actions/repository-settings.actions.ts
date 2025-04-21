import { quickReviewerApi } from '@/api/quick-reviewer.api';
import { BotSettings } from '../interfaces/bot-settings';

export const updateRepositorySettings = async (
  repositoryId: string,
  settings: BotSettings
) => {
  await quickReviewerApi.put(
    `/repositories/${repositoryId}/settings`,
    settings
  );
};

export const resetRepositorySettings = async (repositoryId: string) => {
  await quickReviewerApi.delete(`/repositories/${repositoryId}/settings`);
};
