import { useEffect } from 'react';
import { ChartsSection } from '../components/ChartsSection';
import { DashboardHeader } from '../components/DashboardHeader';
import { MetricsSection } from '../components/MetricsSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { useFilters } from '../hooks/useFilters';
import { APP_NAME } from '@/constants/app';

const Dashboard = () => {
  const { filters } = useFilters();

  useEffect(() => {
    document.title = `${APP_NAME} - Dashboard`;
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <DashboardHeader />

      <MetricsSection filters={filters} />
      <ChartsSection filters={filters} />
      <ReviewsSection filters={filters} />
    </section>
  );
};

export default Dashboard;
