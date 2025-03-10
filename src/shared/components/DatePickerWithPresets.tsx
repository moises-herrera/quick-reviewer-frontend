import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { FC } from 'react';

interface DatePickerWithPresetsProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export const DatePickerWithPresets: FC<DatePickerWithPresetsProps> = ({
  date,
  setDate,
}) => {
  const onSelectPresetDate = (option: string) => {
    const today = new Date();
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} -{' '}
                {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select onValueChange={onSelectPresetDate}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="week">Since last week</SelectItem>
            <SelectItem value="month">Since a month ago</SelectItem>
            <SelectItem value="3-months">Since 3 months ago</SelectItem>
            <SelectItem value="6-months">Since 6 months ago</SelectItem>
            <SelectItem value="year">Since last year</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
