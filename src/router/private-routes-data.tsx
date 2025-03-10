import { RouteData } from './interfaces/route-data';
import { LazyLoadRoute } from './LazyLoadRoute';

export const privateRoutes: RouteData[] = [
  {
    path: '/dashboard',
    element: LazyLoadRoute(() => import('../dashboard/pages/Dashboard.tsx')),
  },
  {
    path: '/history/*',
    element: LazyLoadRoute(
      () => import('../accounts/routes/AccountsRoutes.tsx')
    ),
  },
  {
    path: '/profile',
    element: LazyLoadRoute(() => import('../profile/pages/Profile.tsx')),
  },
];
