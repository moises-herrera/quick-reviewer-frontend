import { create } from 'zustand';
import { User } from '../interfaces/user';
import { checkAuthStatus } from '../actions/check-auth-status';

export type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

export interface AuthState {
  user?: User;
  status: AuthStatus;
  checkStatus: () => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: undefined,
  status: 'checking',
  checkStatus: async () => {
    set({ status: 'checking' });

    const user = await checkAuthStatus();

    if (!user) {
      set({ user: undefined, status: 'not-authenticated' });
      return false;
    }

    set({ user, status: 'authenticated' });

    return true;
  },
  logout: () => {
    set({ user: undefined, status: 'not-authenticated' });
  },
}));
