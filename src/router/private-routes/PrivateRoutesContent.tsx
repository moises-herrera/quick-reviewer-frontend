import { AppSidebar } from '@/shared/components/AppSidebar';
import { Routes, Route, Navigate } from 'react-router';
import { privateRoutes } from './private-routes-data';
import { useSidebar } from '@/components/ui/sidebar';
import clsx from 'clsx';

export const PrivateRoutesContent = () => {
  const { state, isMobile } = useSidebar();
  const isSidebarVisible = state === 'expanded' && !isMobile;

  return (
    <div className="w-full h-full flex relative">
      <AppSidebar />

      <main
        className={clsx('min-h-screen p-4', {
          'w-full': !isSidebarVisible,
          'w-[calc(100%-255px)]': isSidebarVisible,
        })}
      >
        <Routes>
          {privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
};
