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
import { getRepositories } from '@/history/actions/repository.actions';
import { DatePicker } from '@/shared/components/DatePickerWithPresets';
import { DateRange } from 'react-day-picker';
import { useDashboardStore } from '../store/useDashboardStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addDays } from 'date-fns';
import {
  getDateWithBaseTime,
  parseDateFilter,
} from '@/shared/utils/date-helper';

export const DashboardFilters = () => {
  const {
    selectedAccountName,
    selectedRepositories,
    selectedStartDate,
    selectedEndDate,
    setSelectedRepositories,
    setSelectedStartDate,
    setSelectedEndDate,
  } = useDashboardStore();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [_, setSearchParams] = useSearchParams();
  const [repositories, setRepositories] = useState<string[]>([]);
  const [isDateRangeVisible, setIsDateRangeVisible] = useState<boolean>(false);
  const [presetDate, setPresetDate] = useState<string>('');
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
    refetchOnWindowFocus: false,
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
    setRepositories(selectedRepositories);
  }, [isOpenDialog]);

  useEffect(() => {
    if (repositoriesOptions.length && !selectedRepositories.length) {
      setSelectedRepositories(
        repositoriesOptions.slice(0, 5).map(({ value }) => value)
      );
      const startDate = parseDateFilter(addDays(new Date(), -30));
      const endDate = parseDateFilter(new Date());
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);
    }
  }, [selectedAccountName, repositoriesOptions, selectedRepositories]);

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const fromDate = getDateWithBaseTime(selectedStartDate);
      const toDate = getDateWithBaseTime(selectedEndDate);

      setDate({
        from: fromDate,
        to: toDate,
      });

      const today = getDateWithBaseTime(new Date());

      if (fromDate === addDays(today, -7)) {
        setPresetDate('week');
      } else if (fromDate === addDays(today, -30)) {
        setPresetDate('month');
      } else if (fromDate === addDays(today, -90)) {
        setPresetDate('3-months');
      } else if (fromDate === addDays(today, -180)) {
        setPresetDate('6-months');
      } else if (fromDate === addDays(today, -365)) {
        setPresetDate('year');
      } else {
        setPresetDate('custom');
        setIsDateRangeVisible(true);
      }
    }
  }, [selectedStartDate, selectedEndDate]);

  const handleRepositoriesChange = (value: string[]) => {
    setRepositories(value);
  };

  const onSelectPresetDate = (option: string) => {
    setPresetDate(option);

    if (option === 'custom') {
      setIsDateRangeVisible(true);
      return;
    }

    setIsDateRangeVisible(false);

    const today = getDateWithBaseTime(new Date());
    let fromDate: Date | undefined;

    switch (option) {
      case 'week':
        fromDate = addDays(today, -7);
        break;
      case 'month':
        fromDate = addDays(today, -30);
        break;
      case '3-months':
        fromDate = addDays(today, -90);
        break;
      case '6-months':
        fromDate = addDays(today, -180);
        break;
      case 'year':
        fromDate = addDays(today, -365);
        break;
      default:
        break;
    }

    if (fromDate) {
      setDate({ from: fromDate, to: today });
    }
  };

  const onSelectStartDate = (from: Date | undefined) => {
    setDate((prev) => ({
      from,
      to: prev?.to,
    }));
  };

  const onSelectEndDate = (to: Date | undefined) => {
    setDate((prev) => ({
      from: prev?.from,
      to,
    }));
  };

  const onSaveFilters = () => {
    setSearchParams(
      (prev) => {
        prev.set('account', selectedAccountName ?? '');
        prev.set('repositories', repositories.join('_'));
        prev.set('from', parseDateFilter(date?.from ?? ''));
        prev.set('to', parseDateFilter(date?.to ?? ''));

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
        <DialogHeader className="mb-4">
          <DialogTitle>Dashboard filters</DialogTitle>
          <DialogDescription>
            This filters will be applied to all the metrics and charts in the
            dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-y-2 mb-4">
          <p className="text-sm font-semibold">Repositories</p>
          <MultiSelect
            disabled={!data?.data.length}
            options={repositoriesOptions}
            onValueChange={handleRepositoriesChange}
            defaultValue={repositories}
            placeholder="Select repositories"
            variant="secondary"
            maxCount={3}
            animation={0}
          />
          {repositoriesOptions.length && !repositories.length && (
            <p className="text-sm text-red-500 mt-1">
              Please select at least one repository.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-semibold">Pull request creation date</p>

          <Select value={presetDate} onValueChange={onSelectPresetDate}>
            <SelectTrigger>
              <SelectValue placeholder="Select a preset date" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="week">Since last week</SelectItem>
              <SelectItem value="month">Since a month ago</SelectItem>
              <SelectItem value="3-months">Since 3 months ago</SelectItem>
              <SelectItem value="6-months">Since 6 months ago</SelectItem>
              <SelectItem value="year">Since last year</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          {isDateRangeVisible && (
            <section className="flex flex-col gap-y-4 mt-2">
              <div className="flex flex-col gap-y-2">
                <p className="text-sm font-semibold">Select a start date</p>
                <DatePicker
                  date={date?.from}
                  setDate={(from) => onSelectStartDate(from)}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <p className="text-sm font-semibold">Select an end date</p>
                <DatePicker
                  date={date?.to}
                  setDate={(to) => onSelectEndDate(to)}
                  fromDate={date?.from}
                  disabled={!date?.from}
                />
              </div>
            </section>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={onSaveFilters}
            disabled={!repositories.length || !date?.from || !date?.to}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
