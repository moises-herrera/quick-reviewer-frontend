import { Dashboard } from '../dashboard/pages/Dashboard';
import { RouteData } from './interfaces/route-data';
import { AccountsRoutes } from '@/accounts/routes/AccountsRoutes';

export const privateRoutes: RouteData[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/accounts/*',
    element: <AccountsRoutes />,
  },
];
