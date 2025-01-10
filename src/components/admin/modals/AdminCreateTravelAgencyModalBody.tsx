import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput.tsx';
import { FormSelect } from '@/components/form/FormSelect.tsx';
import { Form } from '@/components/ui/form.tsx';
import { TravelAgencySchemaFormType } from '@/validation/travel-agency.schema';
import { useTourOperatorQuery } from '@/api/tour-operator/hooks.ts';
import Loader from '@/components/Loader.tsx';
import Error from '@/components/Error.tsx';

const AdminCreateTravelAgencyModalBody: FC = () => {
  const form = useFormContext<TravelAgencySchemaFormType>();
  const { data: tourOperators, isLoading, isError } = useTourOperatorQuery();

  if (isLoading) {
    return <Loader className='h-[60vh]' />;
  }

  if (isError || !tourOperators) {
    return <Error className='h-[60vh]' />;
  }

  return (
    <div>
      <Form {...form}>
        <div className='flex flex-col gap-4'>
          <FormInput
            control={form.control}
            name='name'
            label='Наименование турагентства'
            placeholder='Введите название'
          />
          <FormInput
            control={form.control}
            name='short_name'
            label='Краткое название'
            placeholder='Введите краткое название (опционально)'
          />
          <FormSelect
            control={form.control}
            name='tour_operator_id'
            label='Туроператор'
            placeholder='Выберите туроператора'
            options={tourOperators}
            nameField='name'
            valueField='id'
          />
        </div>
      </Form>
    </div>
  );
};

export default AdminCreateTravelAgencyModalBody;
