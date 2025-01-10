import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput.tsx';
import { Form } from '@/components/ui/form.tsx';
import { TourOperatorSchemaFormType } from '@/validation/tour-operator-schema.ts';

const AdminCreateTourOperatorModalBody: FC = () => {
  const form = useFormContext<TourOperatorSchemaFormType>();
  return (
    <div>
      <Form {...form}>
        <div className='flex flex-col gap-4'>
          <FormInput control={form.control} name='name' label='Название туроператора' placeholder='Введите название' />
          <FormInput
            control={form.control}
            name='short_name'
            label='Короткое название'
            placeholder='Введите краткое название (опционально)'
          />
        </div>
      </Form>
    </div>
  );
};

export default AdminCreateTourOperatorModalBody;
