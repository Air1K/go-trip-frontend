import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { cn } from '@/lib/utils.ts';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  formItemClassName?: string;
};

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  type = 'text',
  autoComplete,
  formItemClassName = '',
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn('space-y-0 my-2', formItemClassName)}>
          <p className='text-xs text-muted-foreground ml-3 leading-none mb-1'>
            {label} {required && <span className='text-aggressive'>*</span>}
          </p>
          <FormControl>
            <Input
              type={type}
              autoComplete={autoComplete}
              className={`outline-none focus-visible:ring-transparent m-0 ${fieldState.error ? 'border-aggressive' : 'border-ghost-hover'}`}
              placeholder={placeholder}
              {...field}
              value={field.value || ''}
            />
          </FormControl>
          <p className='text-xs text-destructive ml-3'>{fieldState.error?.message}</p>
        </FormItem>
      )}
    />
  );
};
