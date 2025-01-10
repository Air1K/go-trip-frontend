import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import {
  useTravelAgencyCreateMutation,
  useTravelAgencyEditMutation,
  useTravelAgencyQuery,
} from '@/api/travel-agency/hooks.ts';
import { travelAgencyColumns } from '@/components/admin/table/columns/travelAgencyColumns.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { travelAgencySchema, TravelAgencySchemaFormType } from '@/validation/travel-agency.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '@/components/Modal.tsx';
import AdminCreateTravelAgencyModalBody from '@/components/admin/modals/AdminCreateTravelAgencyModalBody.tsx';

const AdminTravelAgencyPage: FC = () => {
  const { data, isLoading, isError } = useTravelAgencyQuery();
  const { mutate: createAgency, isPending: isLoadingCreate, error, isSuccess } = useTravelAgencyCreateMutation();
  const {
    mutate: editAgency,
    isPending: isLoadingEdit,
    error: errorEdit,
    isSuccess: isSuccessEdit,
  } = useTravelAgencyEditMutation();
  const [open, setOpen] = useState(false);
  const [editAgencyIndex, setEditAgencyIndex] = useState<number | null>(null);
  const columns = travelAgencyColumns(setEditAgencyIndex);
  const form = useForm<TravelAgencySchemaFormType>({
    resolver: zodResolver(travelAgencySchema),
  });

  useEffect(() => {
    if (editAgencyIndex !== null && data) {
      form.setValue('name', data[editAgencyIndex].name);
      form.setValue('short_name', data[editAgencyIndex].short_name);
      form.setValue('tour_operator_id', data[editAgencyIndex].tour_operator_id);
      setOpen(true);
    }
  }, [editAgencyIndex]);

  const onSubmit = (formData: TravelAgencySchemaFormType) => {
    if (editAgencyIndex !== null && data) {
      editAgency({ id: data[editAgencyIndex].id, travelAgency: formData });
      console.log('Редактируем турагентство:', formData);
    } else {
      createAgency(formData);
      console.log('Создаём новое турагентство:', formData);
    }
  };

  useEffect(() => {
    if (isSuccess || isSuccessEdit) {
      setOpen(false);
      setEditAgencyIndex(null);
    }
  }, [isSuccess, isSuccessEdit]);

  return (
    <div>
      <Button onClick={() => setOpen(true)} className={'mb-4'}>
        Добавить турагентство
      </Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} searchFiled={'id'} />
      <FormProvider {...form}>
        <Modal
          open={open}
          header={editAgencyIndex !== null ? 'Редактировать турагентство' : 'Добавить турагентство'}
          actionBtnText={editAgencyIndex !== null ? 'Сохранить' : 'Добавить'}
          onSubmit={form.handleSubmit(onSubmit)}
          onClose={() => {
            setOpen(false);
            setEditAgencyIndex(null);
          }}
          main={<AdminCreateTravelAgencyModalBody />}
          loading={isLoadingCreate || isLoadingEdit}
          errorText={(error && (error as Error).message) || (errorEdit && (errorEdit as Error).message) || ''}
          isError={!!error || !!errorEdit}
        />
      </FormProvider>
    </div>
  );
};

export default AdminTravelAgencyPage;
