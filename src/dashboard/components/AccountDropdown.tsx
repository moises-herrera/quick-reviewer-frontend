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
import { useSearchParams } from 'react-router';
import { useDashboardStore } from '../store/useDashboardStore';
import { useEffect } from 'react';

export const AccountDropdown = () => {
  const selectedAccountName = useDashboardStore(
    ({ selectedAccountName }) => selectedAccountName
  );
  const [_, setSearchParams] = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () =>
      getAllAccounts({
        page: 1,
        limit: 100,
      }),
  });

  const handleAccountChange = (accountName: string) => {
    if (accountName !== selectedAccountName) {
      setSearchParams(
        (prev) => {
          prev.set('account', accountName);
          prev.delete('repositories');
          prev.delete('startDate');
          prev.delete('endDate');

          return prev;
        },
        { replace: true }
      );
    }
  };

  useEffect(() => {
    if (data?.data.length && !selectedAccountName) {
      setSearchParams((prev) => {
        prev.set('account', data.data[0].name);
        prev.delete('repositories');
        prev.delete('startDate');
        prev.delete('endDate');

        return prev;
      });
    }
  }, [data]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isLoading}>
          <button className="flex items-center gap-x-2 cursor-pointer p-2 hover:bg-zinc-50 rounded-md transition-colors duration-200 ease-in-out">
            <span className="font-semibold text-2xl truncate">
              {selectedAccountName === null
                ? 'Select an account'
                : selectedAccountName}
            </span>
            <ChevronDown />
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
                key={account.name}
                value={account.name}
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
