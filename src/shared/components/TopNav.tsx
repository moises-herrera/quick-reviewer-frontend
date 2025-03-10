import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

export const TopNav = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full flex gap-x-3 items-center bg-background p-4 border-b border-b-slate-200">
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={toggleSidebar}
      >
        <Menu className="!size-5" />
      </Button>
      <p className="text-blue-600 font-bold text-xl">QuickReviewer</p>
    </div>
  );
};
