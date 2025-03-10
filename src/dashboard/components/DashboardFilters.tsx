import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useMemo, useState } from 'react';
import { MultiSelect } from '@/components/ui/multi-select';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getRepositories } from '@/accounts/actions/repository.actions';
import { DatePickerWithPresets } from '@/shared/components/DatePickerWithPresets';
import { DateRange } from 'react-day-picker';
import { useDashboardStore } from '../store/useDashboardStore';

export const DashboardFilters = () => {
  const {
    setSelectedRepositories,
    setSelectedStartDate,
    setSelectedEndDate,
    selectedAccountName: accountNameStored,
  } = useDashboardStore();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAccountName = useMemo(
    () => searchParams.get('account') ?? accountNameStored,
    [searchParams, accountNameStored]
  );
  const selectedRepositories = useMemo(
    () => searchParams.get('repositories')?.split(',') ?? [],
    [searchParams]
  );
  const selectedStartDate = useMemo(
    () => searchParams.get('startDate'),
    [searchParams]
  );
  const selectedEndDate = useMemo(
    () => searchParams.get('endDate'),
    [searchParams]
  );
  const [repositories, setRepositories] = useState<string[]>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: selectedStartDate
      ? new Date(selectedStartDate)
      : new Date(2025, 0, 1),
    to: selectedEndDate ? new Date(selectedEndDate) : new Date(),
  });

  const { data } = useQuery({
    queryKey: ['repositories', selectedAccountName],
    queryFn: () =>
      getRepositories({
        ownerName: selectedAccountName ?? '',
        page: 1,
        limit: 100,
      }),
  });

  const repositoriesOptions = useMemo(() => {
    if (!data?.data.length) {
      return [];
    }

    return data.data.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }));
  }, [data]);

  useEffect(() => {
    if (selectedRepositories) {
      setRepositories(selectedRepositories);
    } else {
      setRepositories([]);
    }
  }, [selectedRepositories]);

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      setDate({
        from: new Date(selectedStartDate),
        to: new Date(selectedEndDate),
      });
    } else {
      setDate({
        from: undefined,
        to: undefined,
      });
    }
  }, [selectedStartDate, selectedEndDate]);

  const handleRepositoriesChange = (value: string[]) => {
    setRepositories(value);
  };

  const onSaveFilters = () => {
    setSelectedRepositories(repositories);
    setSelectedStartDate(date?.from?.toISOString() ?? '');
    setSelectedEndDate(date?.to?.toISOString() ?? '');

    setSearchParams(
      (prev) => {
        prev.set('account', selectedAccountName ?? '');
        prev.append('repositories', repositories.join(','));
        prev.append('startDate', date?.from?.toISOString() ?? '');
        prev.append('endDate', date?.to?.toISOString() ?? '');

        return prev;
      },
      { replace: true }
    );

    setIsOpenDialog(false);
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer w-fit">
          <SlidersHorizontal />
          <span className="font-medium">Filters</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dashboard filters</DialogTitle>
          <DialogDescription>
            This filters will be applied to all the metrics and charts in the
            dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-semibold">Repositories</p>
          <MultiSelect
            disabled={!data?.data.length}
            options={repositoriesOptions}
            onValueChange={handleRepositoriesChange}
            defaultValue={repositories}
            placeholder="Select repositories"
            variant="secondary"
            maxCount={3}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-semibold">Pull request creation date</p>
          <DatePickerWithPresets date={date} setDate={setDate} />
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onSaveFilters}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
