import { LoaderCircle } from 'lucide-react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="m-auto">
        <LoaderCircle className="animate-spin size-8" />
      </div>
    </div>
  );
};
