import { ComponentType, Suspense, lazy } from 'react';
import { Loading } from '@/shared/components/Loading';

export function LazyLoadRoute(
  factory: () => Promise<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ComponentType<any>;
  }>
) {
  const LazyElement = lazy(factory);

  return (
    <Suspense fallback={<Loading />}>
      <LazyElement />
    </Suspense>
  );
}
