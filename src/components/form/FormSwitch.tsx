import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch.tsx';
import * as React from 'react';
import { FormControl, FormField, FormItem } from '@/components/ui/form.tsx';
import { Control, FieldValues, Path } from 'react-hook-form';

const formSwitchVariants = cva('', {
  variants: {
    variant: {
      toggleAreaRow: 'h-12',
      toggleArea: 'h-10 [&_label]:mx-3',
    },
  },
  defaultVariants: {
    variant: 'toggleAreaRow',
  },
});

interface CustomSwitchProps<T extends FieldValues>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formSwitchVariants> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  id?: string;
  children?: React.ReactNode;
}

const FormSwitch = <T extends FieldValues>({
  control,
  name,
  label,
  variant,
  className,
  children,
}: CustomSwitchProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem className={cn('space-y-0')}>
          <div className={'space-x-4'}>
            <div
              className={cn(formSwitchVariants({ variant }), className, ' w-full flex items-center justify-between')}
            >
              <label className={'text-sm text-muted-foreground'}>{label}</label>
              <FormControl>
                <Switch checked={value} onCheckedChange={onChange} />
              </FormControl>
            </div>
            {children}
          </div>
        </FormItem>
      )}
    />
  );
};

export { FormSwitch, formSwitchVariants };
