import { Login } from '../../auth/pages/Login';
import { RouteData } from '../interfaces/route-data';

export const authRoutesData: RouteData[] = [
  {
    path: '/auth/login',
    element: <Login />,
  },
];
