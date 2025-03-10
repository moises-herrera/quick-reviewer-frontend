import { ChartsSection } from '../components/ChartsSection';
import { DashboardHeader } from '../components/DashboardHeader';
import { MetricsSection } from '../components/MetricsSection';
import { ReviewsSection } from '../components/ReviewsSection';

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-5">
      <DashboardHeader />

      <MetricsSection />
      <ChartsSection />
      <ReviewsSection />
    </section>
  );
};

export default Dashboard;
