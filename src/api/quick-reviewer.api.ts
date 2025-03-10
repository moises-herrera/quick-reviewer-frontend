import axios, { AxiosError } from 'axios';
import { VITE_API_URL } from '../constants/app-constants';
import { refreshToken } from '@/auth/actions/auth.actions';
import { useAuthStore } from '@/auth/store/useAuthStore';

export const quickReviewerApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

quickReviewerApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (
      error.response &&
      error.config &&
      !error.response?.config.url?.includes('/github/auth') &&
      error.response.status === 401
    ) {
      try {
        const user = await refreshToken();

        if (!user) {
          throw new Error('User not found');
        }

        useAuthStore.getState().setUser(user);

        return quickReviewerApi.request(error.config);
      } catch (error) {
        if (!window.location.href.startsWith('/auth/login')) {
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
