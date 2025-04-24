import { getAllAccounts } from '@/history/actions/accounts.actions';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { useEffect } from 'react';
import { useAuthStore } from '@/auth/store/useAuthStore';
import { useDashboardStore } from '../store/useDashboardStore';

export const AccountDropdown = () => {
  const selectedAccountName = useAuthStore(({ account }) => account?.name);
  const setAccount = useAuthStore(({ setAccount }) => setAccount);
  const resetFilters = useDashboardStore(({ resetFilters }) => resetFilters);
  const { data, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () =>
      getAllAccounts({
        page: 1,
        limit: 100,
      }),
  });

  const handleAccountChange = (id: string) => {
    const account = data?.data.find((account) => account.id === id);

    if (account && account?.name !== selectedAccountName) {
      setAccount({
        id: account.id,
        name: account.name,
      });
      resetFilters({
        selectedAccountName: account.name,
      });
    }
  };

  useEffect(() => {
    if (data?.data.length && !selectedAccountName) {
      const defaultAccount = data.data[0];
      setAccount({
        id: defaultAccount.id,
        name: defaultAccount.name,
      });
      resetFilters({
        selectedAccountName: defaultAccount.name,
      });
    }
  }, [data]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isLoading}>
          <button className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-zinc-50 rounded-md transition-colors duration-200 ease-in-out">
            <span className="font-semibold text-lg truncate">
              {selectedAccountName === null
                ? 'Select an account'
                : selectedAccountName}
            </span>
            <ChevronDown className="!size-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[320px] h-fit max-h-[300px] overflow-y-auto"
          align="start"
        >
          <DropdownMenuRadioGroup
            onValueChange={handleAccountChange}
            className="pl-0"
          >
            {data?.data.map((account) => (
              <DropdownMenuRadioItem
                key={account.id}
                value={account.id}
                className="cursor-pointer truncate pl-3"
              >
                {account.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
