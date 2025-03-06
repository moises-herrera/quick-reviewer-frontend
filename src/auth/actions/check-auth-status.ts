import { quickReviewerApi } from '../../api/quick-reviewer.api';
import { User } from '../interfaces/user';

export const checkAuthStatus = async (): Promise<User | undefined> => {
  try {
    const { data } = await quickReviewerApi.get<{ user: User }>(
      '/github/auth/check-token'
    );

    return data.user;
  } catch (error) {
    return undefined;
  }
};
