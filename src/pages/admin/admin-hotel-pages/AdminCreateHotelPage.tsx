import { FC, useEffect } from 'react';
import Card from '@/components/ui-custom/Card.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotelSchema, HotelSchemaFormType } from '@/validation/hotel-schema.ts';
import { Button } from '@/components/ui/button.tsx';
import { useServiceClassQuery } from '@/api/service-class/hooks.ts';
import { FormInput } from '@/components/form/FormInput.tsx';
import { FormSelect } from '@/components/form/FormSelect.tsx';
import { useSettlementQuery } from '@/api/settlement/hooks.ts';
import { Form } from '@/components/ui/form.tsx';
import { useHotelCreateMutation } from '@/api/hotel/hooks.ts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Error from '@/components/Error.tsx';
import Loader from '@/components/Loader.tsx';

const AdminCreateHotelPage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<HotelSchemaFormType>({
    resolver: zodResolver(hotelSchema),
  });
  const { data, isLoading: isLoadingService, isError: isErrorService } = useServiceClassQuery();
  const { data: settlements, isLoading: isLoadingSettlement, isError: isErrorSettlement } = useSettlementQuery();
  const { mutate: creat, isPending: isLoadCreate, error, isSuccess: isSuccessCreate } = useHotelCreateMutation();
  const { handleSubmit } = form;

  const submitForm = (data: HotelSchemaFormType) => {
    creat(data);
    console.log('Форма отправлена с данными:', data);
  };
  useEffect(() => {
    if (isSuccessCreate) {
      navigate('/admin/hotels');
    }
  }, [isSuccessCreate]);

  if (isLoadingService || isLoadingSettlement) {
    return <Loader className={'col-span-2 h-[60vh]'} />;
  }

  if (isErrorService || isErrorSettlement || !data || !settlements) {
    return <Error className={'col-span-2'} />;
  }

  return (
    <Card className={'col-span-2'}>
      <Form {...form}>
        <form onSubmit={handleSubmit(submitForm)} className={'flex flex-col'}>
          <Button disabled={isLoadCreate} type='submit' className={'mb-4 ml-auto'}>
            Сохранить
          </Button>
          <FormInput control={form.control} name={'name'} label={'Название'} placeholder={'Введите название'} />
          <FormSelect
            control={form.control}
            name={'service_classes_id'}
            label={'Класс обслуживания'}
            options={data}
            nameField={'name'}
            valueField={'id'}
            placeholder={'Выберите класс обслуживания'}
          />
          <FormSelect
            control={form.control}
            name={'settlements_id'}
            label={'Населенный пункт'}
            placeholder={'Выберите населенный пункт'}
            options={settlements}
            nameField={'name'}
            valueField={'id'}
          />
        </form>
      </Form>
      <Alert hidden={!error} className={'mt-4'} variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Ошибка сохранении отеля</AlertTitle>
        <AlertDescription>{error?.message || ''}</AlertDescription>
      </Alert>
    </Card>
  );
};

export default AdminCreateHotelPage;
