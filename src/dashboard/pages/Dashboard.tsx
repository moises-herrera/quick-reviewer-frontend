import { ChartsSection } from '../components/ChartsSection';
import { DashboardHeader } from '../components/DashboardHeader';
import { MetricsSection } from '../components/MetricsSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { useFilters } from '../hooks/useFilters';

const Dashboard = () => {
  const { filters } = useFilters();

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
