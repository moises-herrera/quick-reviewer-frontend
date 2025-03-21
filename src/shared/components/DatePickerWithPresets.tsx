import { FC } from 'react';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate } from '../utils/date-helper';

interface DatePicker {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: boolean;
  fromDate?: Date;
  className?: string;
}

export const DatePicker: FC<DatePicker> = ({
  date,
  setDate,
  disabled,
  fromDate,
  className,
}) => {
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
          {date && formatDate(date)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <div className="rounded-md border">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            showOutsideDays
            fixedWeeks
            disabled={disabled}
            className={cn(
              disabled && 'pointer-events-none opacity-50',
              className
            )}
            fromDate={fromDate}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
