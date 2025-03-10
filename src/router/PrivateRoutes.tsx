import { Navigate, Route, Routes } from 'react-router';
import { privateRoutes } from './private-routes-data';
import { AppSidebar } from '@/shared/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TopNav } from '@/shared/components/TopNav';

const PrivateRoutes = () => {
  return (
    <SidebarProvider>
      <section className="w-full h-full flex flex-col">
        <TopNav />

        <div className="w-full h-full flex relative">
          <AppSidebar />

          <main className="w-full h-full p-4">
            <Routes>
              {privateRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}

              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </section>
    </SidebarProvider>
  );
};

export default PrivateRoutes;
