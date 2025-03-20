import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../auth/store/useAuthStore';
import { Loading } from '@/shared/components/Loading';
import { Toaster } from 'sonner';
import PrivateRoutes from './private-routes/PrivateRoutes.tsx';
import AuthRoutes from './auth-routes/AuthRoutes.tsx';
import { useDashboardStore } from '@/dashboard/store/useDashboardStore.ts';

export const AppRouter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const status = useAuthStore(({ status }) => status);
  const checkStatus = useAuthStore(({ checkStatus }) => checkStatus);
  const clearFilters = useDashboardStore(({ clearFilters }) => clearFilters);

  const redirectToLogin = () => {
    navigate('/auth/login', { replace: true });
    clearFilters();
  };

  useEffect(() => {
    if (status === 'checking') {
      checkStatus().catch(() => {
        redirectToLogin();
      });
    }

    if (status === 'not-authenticated') {
      redirectToLogin();
    }

    if (status === 'authenticated' && pathname === '/auth/login') {
      navigate('/dashboard', { replace: true });
    }
  }, [status]);

  if (status === 'checking') return <Loading />;

  return (
    <>
      <Routes>
        {status === 'authenticated' ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<AuthRoutes />} />
        )}
      </Routes>

      <Toaster richColors />
    </>
  );
};
