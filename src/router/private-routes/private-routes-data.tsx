import { RouteData } from '../interfaces/route-data';
import { LazyLoadRoute } from '../LazyLoadRoute';

export const privateRoutes: RouteData[] = [
  {
    path: '/dashboard',
    element: LazyLoadRoute(() => import('../../dashboard/pages/Dashboard.tsx')),
  },
  {
    path: '/history/accounts/*',
    element: LazyLoadRoute(
      () => import('../../history/routes/HistoryRoutes.tsx')
    ),
  },
  {
    path: '/profile',
    element: LazyLoadRoute(() => import('../../profile/pages/Profile.tsx')),
  },
];
