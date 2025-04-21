import { create } from 'zustand';
import { User } from '../interfaces/user';
import { checkAuthStatus, logoutUser } from '../actions/auth.actions';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

export interface AuthState {
  user?: User;
  status: AuthStatus;
  account?: {
    id: string;
    name: string;
  };
  setUser: (user: User) => void;
  checkStatus: () => Promise<boolean>;
  logout: () => void;
  setAccount: (data?: { id: string; name: string }) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      status: 'checking',
      setUser: (user: User) => {
        set({ user, status: 'authenticated' });
      },
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
      logout: async () => {
        await logoutUser();

        set({ user: undefined, status: 'not-authenticated' });
      },
      setAccount: (data) => {
        set({ account: data });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ user }) => ({
        user,
      }),
    }
  )
);
