import { Accounts } from '@/accounts/pages/Accounts';
import { Dashboard } from '../dashboard/pages/Dashboard';
import { RouteData } from './interfaces/route-data';

export const privateRoutes: RouteData[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/accounts/*',
    element: <Accounts />,
  },
];
