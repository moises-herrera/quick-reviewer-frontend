import { FC } from 'react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface SwitchFormControlProps {
  label: string;
  description?: string;
  value?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onChange?: (value: boolean) => void;
}

export const SwitchFormControl: FC<SwitchFormControlProps> = ({
  label,
  description,
  value,
  disabled,
  onChange,
  isLoading,
}) => {
  return (
    <div
      className={cn('flex items-center justify-between', {
        'animate-pulse': isLoading,
      })}
    >
      <div>
        <h5 className="font-medium">{label}</h5>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      <Switch
        checked={value}
        onCheckedChange={onChange}
        disabled={disabled || isLoading}
      />
    </div>
  );
};
