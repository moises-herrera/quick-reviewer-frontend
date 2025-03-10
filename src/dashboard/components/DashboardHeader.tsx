import { AccountDropdown } from './AccountDropdown';
import { DashboardFilters } from './DashboardFilters';

export const DashboardHeader = () => {
  return (
    <>
      <AccountDropdown />
      <DashboardFilters />
    </>
  );
};
