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
import { useSearchParams } from 'react-router';
import { useDashboardStore } from '../store/useDashboardStore';

export const AccountDropdown = () => {
  const selectedAccountName = useDashboardStore(
    ({ selectedAccountName }) => selectedAccountName
  );
  const setSelectedAccountName = useDashboardStore(
    ({ setSelectedAccountName }) => setSelectedAccountName
  );
  const setSelectedRepositories = useDashboardStore(
    ({ setSelectedRepositories }) => setSelectedRepositories
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () =>
      getAllAccounts({
        page: 1,
        limit: 100,
      }),
  });

  useEffect(() => {
    const accountName = searchParams.get('account');
    if (accountName) {
      setSelectedAccountName(accountName ?? null);
      setSearchParams(
        (prev) => {
          prev.set('account', accountName ?? '');

          return prev;
        },
        { replace: true }
      );
    } else {
      setSelectedAccountName(null);
    }
  }, [searchParams]);

  const handleAccountChange = (accountName: string) => {
    setSelectedAccountName(accountName);
    setSelectedRepositories([]);

    setSearchParams(
      (prev) => {
        prev.set('account', accountName);
        prev.delete('repositories');

        return prev;
      },
      { replace: true }
    );
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isLoading}>
          <button className="flex items-center gap-x-2 cursor-pointer">
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
