import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { travelAgencySchema, TravelAgencySchemaFormType } from '@/validation/travel-agency.schema';
import { Button } from '@/components/ui/button.tsx';
import { FormInput } from '@/components/form/FormInput.tsx';
import { FormSelect } from '@/components/form/FormSelect.tsx';
import { Form } from '@/components/ui/form.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTourOperatorQuery } from '@/api/tour-operator/hooks.ts';
import { useTravelAgencyCreateMutation } from '@/api/travel-agency/hooks.ts';
import Loader from '@/components/Loader.tsx';
import Error from '@/components/Error.tsx';
import { adminLink } from '@/config/navigation.tsx';

const AdminCreateTravelAgencyPage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<TravelAgencySchemaFormType>({
    resolver: zodResolver(travelAgencySchema),
    defaultValues: {
      name: '',
      short_name: '',
    },
  });
  const { handleSubmit } = form;
  const { data: tourOperators, isLoading: isLoadingOperators, isError: isErrorOperators } = useTourOperatorQuery();
  const { mutate: createAgency, isPending: isLoadingCreate, error, isSuccess } = useTravelAgencyCreateMutation();
  const onSubmit = (data: TravelAgencySchemaFormType) => {
    createAgency(data);
    console.log('Форма отправлена с данными:', data);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate(adminLink.travelAgency);
    }
  }, [isSuccess]);
  if (isLoadingOperators) {
    return <Loader className='col-span-2 h-[60vh]' />;
  }
  if (isErrorOperators || !tourOperators) {
    return <Error className='col-span-2' />;
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Button disabled={isLoadingCreate} type='submit' className='mb-4 ml-auto'>
            Сохранить
          </Button>
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
            placeholder='Выберите турагенство'
            options={tourOperators}
            nameField='name'
            valueField='id'
          />
        </form>
      </Form>

      <Alert hidden={!error} className='mt-4' variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Ошибка сохранения турагентства</AlertTitle>
        <AlertDescription>{(error as Error)?.message || ''}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AdminCreateTravelAgencyPage;
