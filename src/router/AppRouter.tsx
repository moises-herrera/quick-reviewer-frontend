import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../auth/store/useAuthStore';
import { Loading } from '@/shared/components/Loading';
import { Toaster } from 'sonner';
import { LazyLoadRoute } from './LazyLoadRoute';

export const AppRouter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const status = useAuthStore(({ status }) => status);
  const checkStatus = useAuthStore(({ checkStatus }) => checkStatus);

  useEffect(() => {
    if (status === 'checking') {
      checkStatus().catch(() => {
        navigate('/auth/login');
      });
    }

    if (status === 'not-authenticated') {
      navigate('/auth/login');
    }

    if (status === 'authenticated' && pathname === '/auth/login') {
      navigate('/dashboard');
    }
  }, [status]);

  if (status === 'checking') return <Loading />;

  return (
    <>
      <Routes>
        {status === 'authenticated' ? (
          <Route
            path="/*"
            element={LazyLoadRoute(() => import('./PrivateRoutes.tsx'))}
          />
        ) : (
          <Route
            path="/*"
            element={LazyLoadRoute(() => import('./AuthRoutes.tsx'))}
          />
        )}
      </Routes>

      <Toaster richColors />
    </>
  );
};
