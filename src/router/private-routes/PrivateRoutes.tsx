import { SidebarProvider } from '@/components/ui/sidebar';
import { TopNav } from '@/shared/components/TopNav';
import { PrivateRoutesContent } from './PrivateRoutesContent';

const PrivateRoutes = () => {
  return (
    <SidebarProvider>
      <section className="w-full h-full flex flex-col">
        <TopNav />
        <PrivateRoutesContent />
      </section>
    </SidebarProvider>
  );
};

export default PrivateRoutes;
