import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { useAuthStore } from '../auth/store/useAuthStore';
import PrivateRoutes from './PrivateRoutes';
import AuthRoutes from './interfaces/AuthRoutes';
import { Loading } from '@/shared/components/Loading';

export const AppRouter = () => {
  const navigate = useNavigate();
  const status = useAuthStore(({ status }) => status);
  const checkStatus = useAuthStore(({ checkStatus }) => checkStatus);

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (status === 'not-authenticated') {
      navigate('/auth/login');
    }

    if (status === 'authenticated') {
      navigate('/dashboard');
    }
  }, [status]);

  if (status === 'checking') return <Loading />;

  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        <Route path="/*" element={<AuthRoutes />} />
      )}
    </Routes>
  );
};
