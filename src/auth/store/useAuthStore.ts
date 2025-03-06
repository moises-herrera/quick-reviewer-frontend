import { create } from 'zustand';
import { User } from '../interfaces/user';
import { checkAuthStatus } from '../actions/check-auth-status';

export type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

export interface AuthState {
  user?: User;
  status: AuthStatus;
  checkStatus: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: undefined,
  status: 'checking',
  checkStatus: async () => {
    set({ status: 'checking' });

    const user = await checkAuthStatus();

    if (!user) return set({ user: undefined, status: 'not-authenticated' });

    set({ user, status: 'authenticated' });
  },
  logout: () => {
    set({ user: undefined, status: 'not-authenticated' });
  },
}));
