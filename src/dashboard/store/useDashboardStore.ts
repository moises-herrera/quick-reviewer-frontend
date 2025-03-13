import { create } from 'zustand';

interface DashboardState {
  selectedAccountName: string | null;
  selectedRepositories: string[];
  selectedStartDate: string | null;
  selectedEndDate: string | null;
  setSelectedAccountName: (accountName: string | null) => void;
  setSelectedRepositories: (repositories: string[]) => void;
  setSelectedStartDate: (startDate: string | null) => void;
  setSelectedEndDate: (endDate: string | null) => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  selectedAccountName: null,
  selectedRepositories: [],
  selectedStartDate: null,
  selectedEndDate: null,
  setSelectedAccountName: (accountName) =>
    set({ selectedAccountName: accountName }),
  setSelectedRepositories: (repositories) =>
    set({ selectedRepositories: repositories }),
  setSelectedStartDate: (startDate) => set({ selectedStartDate: startDate }),
  setSelectedEndDate: (endDate) => set({ selectedEndDate: endDate }),
}));
