import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput.tsx';
import { Form } from '@/components/ui/form.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTourOperatorCreateMutation } from '@/api/tour-operator/hooks.ts';
import { adminLink } from '@/config/navigation.tsx';
import { TourOperatorSchemaFormType } from '@/validation/tour-operator-schema.ts';

const AdminCreateTourOperatorModalBody: FC = () => {
  const navigate = useNavigate();
  const form = useFormContext<TourOperatorSchemaFormType>();
  const { mutate: createOperator, isPending: isLoadingCreate, error, isSuccess } = useTourOperatorCreateMutation();
  useEffect(() => {
    if (isSuccess) {
      navigate(adminLink.tourOperator);
    }
  }, [isSuccess]);
  return (
    <div>
      <Form {...form}>
        <div className='flex flex-col gap-4'>
          {/*<Button disabled={isLoadingCreate} type='submit' className='ml-auto'>*/}
          {/*  Сохранить*/}
          {/*</Button>*/}

          <FormInput control={form.control} name='name' label='Название туроператора' placeholder='Введите название' />

          <FormInput
            control={form.control}
            name='short_name'
            label='Короткое название'
            placeholder='Введите краткое название (опционально)'
          />
        </div>
      </Form>
      <Alert hidden={!error} className='mt-4' variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Ошибка сохранения туроператора</AlertTitle>
        <AlertDescription>{(error as Error)?.message || ''}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AdminCreateTourOperatorModalBody;
