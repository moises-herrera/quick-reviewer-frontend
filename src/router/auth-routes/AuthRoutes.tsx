import { Route, Routes } from 'react-router';
import { authRoutesData } from './auth-routes-data';

const AuthRoutes = () => {
  return (
    <Routes>
      {authRoutesData.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AuthRoutes;
