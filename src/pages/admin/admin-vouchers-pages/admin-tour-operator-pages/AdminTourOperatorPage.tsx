import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import {
  useTourOperatorCreateMutation,
  useTourOperatorEditMutation,
  useTourOperatorQuery,
} from '@/api/tour-operator/hooks.ts';
import { tourOperatorColumns } from '@/components/admin/table/columns/tourOperatorColumns.tsx';
import Modal from '@/components/Modal.tsx';
import AdminCreateTourOperatorModalBody from '@/components/admin/modals/AdminCreateTourOperatorModalBody.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { tourOperatorSchema, TourOperatorSchemaFormType } from '@/validation/tour-operator-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

const AdminTourOperatorPage: FC = () => {
  const { data, isLoading, isError } = useTourOperatorQuery();
  const [editOperatorIndex, setEditOperatorIndex] = useState<number | null>(null);
  const columns = tourOperatorColumns(setEditOperatorIndex);
  const [open, setOpen] = useState(false);

  const form = useForm<TourOperatorSchemaFormType>({
    resolver: zodResolver(tourOperatorSchema),
    defaultValues: {
      name: '',
      short_name: '',
    },
  });

  useEffect(() => {
    if (editOperatorIndex !== null && data) {
      form.setValue('name', data[editOperatorIndex].name || '');
      form.setValue('short_name', data[editOperatorIndex].short_name || '');
      setOpen(true);
    }
  }, [editOperatorIndex]);

  const { mutate: createOperator, isPending: isLoadingCreate, error, isSuccess } = useTourOperatorCreateMutation();
  const {
    mutate: editOperator,
    isPending: isLoadingEdit,
    error: errorEdit,
    isSuccess: isSuccessEdit,
  } = useTourOperatorEditMutation();
  const onSubmit = (dataForm: TourOperatorSchemaFormType) => {
    if (editOperatorIndex !== null && data) {
      editOperator({ id: data[editOperatorIndex].id, tourOperator: dataForm });
      console.log('Изменяем туроператор:', dataForm);
    } else {
      createOperator(dataForm);
      console.log('Форма отправлена с данными:', dataForm);
    }
  };

  useEffect(() => {
    if (isSuccess || isSuccessEdit) {
      setOpen(false);
    }
  }, [isSuccess, isSuccessEdit]);
  return (
    <div>
      <Button className={'mb-4 ml-auto'} onClick={() => setOpen(true)}>
        Добавить туроператора
      </Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
      <FormProvider {...form}>
        <Modal
          open={open}
          header={editOperatorIndex !== null ? 'Редактировать туроператор' : 'Добавить туроператор'}
          actionBtnText={editOperatorIndex !== null ? 'Сохранить' : 'Добавить'}
          onSubmit={form.handleSubmit(onSubmit)}
          onClose={() => setOpen(false)}
          main={<AdminCreateTourOperatorModalBody />}
          loading={isLoadingCreate || isLoadingEdit}
          errorText={(error && (error as Error).message) || (errorEdit && (errorEdit as Error).message) || ''}
          isError={!!error}
        />
      </FormProvider>
    </div>
  );
};

export default AdminTourOperatorPage;
