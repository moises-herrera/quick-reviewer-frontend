import { BotSettings } from '@/settings/interfaces/bot-settings';

export interface Repository {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  settings?: BotSettings;
  users: {
    canConfigureBot?: boolean;
  }[];
}
