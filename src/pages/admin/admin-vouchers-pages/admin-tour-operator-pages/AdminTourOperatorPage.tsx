import { FC, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { useTourOperatorQuery } from '@/api/tour-operator/hooks.ts';
import { tourOperatorColumns } from '@/components/admin/table/columns/tourOperatorColumns.tsx';
import Modal from '@/components/Modal.tsx';
import AdminCreateTourOperatorModalBody from '@/components/admin/modals/AdminCreateTourOperatorModalBody.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { tourOperatorSchema, TourOperatorSchemaFormType } from '@/validation/tour-operator-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

const AdminTourOperatorPage: FC = () => {
  const { data, isLoading, isError } = useTourOperatorQuery();
  const columns = tourOperatorColumns();

  const [open, setOpen] = useState(false);
  const form = useForm<TourOperatorSchemaFormType>({
    resolver: zodResolver(tourOperatorSchema),
    defaultValues: {
      name: '',
      short_name: '',
    },
  });
  const onSubmit = (data: TourOperatorSchemaFormType) => {
    console.log('Форма отправлена с данными:', data);
  };
  return (
    <div>
      <Button className={'mb-4 ml-auto'} onClick={() => setOpen(true)}>
        Добавить туроператора
      </Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
      <FormProvider {...form}>
        <Modal
          open={open}
          header={'Добавить туроператора'}
          actionBtnText={'Добавить'}
          onSubmit={form.handleSubmit(onSubmit)}
          onClose={() => setOpen(false)}
          main={<AdminCreateTourOperatorModalBody />}
        />
      </FormProvider>
    </div>
  );
};

export default AdminTourOperatorPage;
