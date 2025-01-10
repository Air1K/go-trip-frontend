import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput.tsx';
import { FormSelect } from '@/components/form/FormSelect.tsx';
import { Form } from '@/components/ui/form.tsx';
import { HotelSchemaFormType } from '@/validation/hotel-schema.ts';
import { useServiceClassQuery } from '@/api/service-class/hooks.ts';
import { useSettlementQuery } from '@/api/settlement/hooks.ts';
import Loader from '@/components/Loader.tsx';
import Error from '@/components/Error.tsx';

const AdminCreateHotelModalBody: FC = () => {
  const form = useFormContext<HotelSchemaFormType>();
  const { data: serviceClasses, isLoading: isLoadingService, isError: isErrorService } = useServiceClassQuery();
  const { data: settlements, isLoading: isLoadingSettlement, isError: isErrorSettlement } = useSettlementQuery();

  if (isLoadingService || isLoadingSettlement) {
    return <Loader className='h-[60vh]' />;
  }

  if (isErrorService || isErrorSettlement || !serviceClasses || !settlements) {
    return <Error className='h-[60vh]' />;
  }

  return (
    <div>
      <Form {...form}>
        <div className='flex flex-col gap-4'>
          <FormInput control={form.control} name='name' label='Название' placeholder='Введите название' />
          <FormSelect
            control={form.control}
            name='service_classes_id'
            label='Класс обслуживания'
            options={serviceClasses}
            nameField='name'
            valueField='id'
            placeholder='Выберите класс обслуживания'
          />
          <FormSelect
            control={form.control}
            name='settlements_id'
            label='Населенный пункт'
            options={settlements}
            nameField='name'
            valueField='id'
            placeholder='Выберите населенный пункт'
          />
        </div>
      </Form>
    </div>
  );
};

export default AdminCreateHotelModalBody;
