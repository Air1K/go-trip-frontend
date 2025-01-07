import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem } from '@/components/ui/form.tsx';
import { cn } from '@/lib/utils.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';

type FormSelectProps<T extends FieldValues, O> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  options: O[];
  valueField: keyof O;
  nameField: keyof O;
};

export const FormSelect = <T extends FieldValues, O>({
  control,
  name,
  label,
  placeholder,
  required = false,
  className,
  options,
  valueField,
  nameField,
}: FormSelectProps<T, O>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn('space-y-0', className)}>
          <p className='text-xs text-muted-foreground ml-3 leading-none mb-1'>
            {label} {required && <span className='text-aggressive'>*</span>}
          </p>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={cn(
                  `w-full py-[4px] px-4 border-input rounded-md shadow-sm text-base border text-muted-foreground-placeholder`
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option, index) => (
                  <SelectItem key={index} value={String(option[valueField])}>
                    {String(option[nameField])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <p className='text-xs text-destructive ml-3'>{fieldState.error?.message}</p>
        </FormItem>
      )}
    />
  );
};
