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

export const refreshToken = async (): Promise<User | undefined> => {
  try {
    const { data } = await quickReviewerApi.post<{ user: User }>(
      '/github/auth/refresh-token'
    );

    return data.user;
  } catch (error) {
    return undefined;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await quickReviewerApi.post('/github/auth/logout');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
