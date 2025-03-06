import { LoaderCircle } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="animate-spin size-8" />
    </div>
  );
};
