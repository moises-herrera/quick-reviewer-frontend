import { Route, Routes } from 'react-router';
import { privateRoutes } from './private-routes-data';
import { AppSidebar } from '@/shared/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const PrivateRoutes = () => {
  return (
    <div className="w-full h-full flex">
      <SidebarProvider>
        <AppSidebar />

        <main className="w-full h-full p-4">
          <Routes>
            {privateRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default PrivateRoutes;
