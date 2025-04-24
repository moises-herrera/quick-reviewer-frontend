import { DashboardFilters } from './DashboardFilters';

export const DashboardHeader = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <DashboardFilters />
    </>
  );
};
