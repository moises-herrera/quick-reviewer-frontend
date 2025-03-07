import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../auth/store/useAuthStore';
import PrivateRoutes from './PrivateRoutes';
import AuthRoutes from './interfaces/AuthRoutes';
import { Loading } from '@/shared/components/Loading';
import { Toaster } from 'sonner';

export const AppRouter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const status = useAuthStore(({ status }) => status);
  const checkStatus = useAuthStore(({ checkStatus }) => checkStatus);

  useEffect(() => {
    checkStatus().catch(() => {
      navigate('/auth/login');
    });
  }, []);

  useEffect(() => {
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
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<AuthRoutes />} />
        )}
      </Routes>

      <Toaster richColors />
    </>
  );
};
