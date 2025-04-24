import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DashboardState {
  selectedAccountName: string | null;
  selectedRepositories: string[];
  selectedStartDate: string | null;
  selectedEndDate: string | null;
  setSelectedAccountName: (accountName: string | null) => void;
  setSelectedRepositories: (repositories: string[]) => void;
  setSelectedStartDate: (startDate: string | null) => void;
  setSelectedEndDate: (endDate: string | null) => void;
  resetFilters: (defaultValue?: {
    selectedAccountName?: string | null;
    selectedRepositories?: string[];
    selectedStartDate?: string | null;
    selectedEndDate?: string | null;
  }) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      selectedAccountName: null,
      selectedRepositories: [],
      selectedStartDate: null,
      selectedEndDate: null,
      setSelectedAccountName: (accountName) =>
        set({ selectedAccountName: accountName }),
      setSelectedRepositories: (repositories) =>
        set({ selectedRepositories: repositories }),
      setSelectedStartDate: (startDate) =>
        set({ selectedStartDate: startDate }),
      setSelectedEndDate: (endDate) => set({ selectedEndDate: endDate }),
      resetFilters: (defaultValue) =>
        set({
          selectedAccountName: null,
          selectedRepositories: [],
          selectedStartDate: null,
          selectedEndDate: null,
          ...defaultValue,
        }),
    }),
    {
      name: 'dashboard-storage',
    }
  )
);
