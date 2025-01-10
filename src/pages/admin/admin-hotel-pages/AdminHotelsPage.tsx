import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import {
  useHotelCreateMutation,
  useHotelEditMutation,
  useHotelQuery,
} from '@/api/hotel/hooks.ts';
import { hotelColumns } from '@/components/admin/table/columns/hotelColumns.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { hotelSchema, HotelSchemaFormType } from '@/validation/hotel-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '@/components/Modal.tsx';
import AdminCreateHotelModalBody from '@/components/admin/modals/AdminCreateHotelModalBody.tsx';
import Card from '@/components/ui-custom/Card.tsx';

const AdminHotelsPage: FC = () => {
  const { data, isLoading, isError } = useHotelQuery();
  const { mutate: createHotel, isPending: isLoadingCreate, error, isSuccess } = useHotelCreateMutation();
  const { mutate: editHotel, isPending: isLoadingEdit, error: errorEdit, isSuccess: isSuccessEdit } =
    useHotelEditMutation();
  const [open, setOpen] = useState(false);
  const [editHotelIndex, setEditHotelIndex] = useState<number | null>(null);
  const columns = hotelColumns(setEditHotelIndex);
  const form = useForm<HotelSchemaFormType>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      name: '',
      service_classes_id: undefined,
      settlements_id: undefined,
    },
  });

  useEffect(() => {
    if (editHotelIndex !== null && data) {
      form.setValue('name', data[editHotelIndex].name);
      form.setValue('service_classes_id', data[editHotelIndex].service_classes_id);
      form.setValue('settlements_id', data[editHotelIndex].settlements_id);
      setOpen(true);
    }
  }, [editHotelIndex]);

  const onSubmit = (formData: HotelSchemaFormType) => {
    if (editHotelIndex !== null && data) {
      editHotel({ id: data[editHotelIndex].id, hotel: formData });
      console.log('Редактируем отель:', formData);
    } else {
      createHotel(formData);
      console.log('Создаём новый отель:', formData);
    }
  };

  useEffect(() => {
    if (isSuccess || isSuccessEdit) {
      setOpen(false);
      setEditHotelIndex(null);
    }
  }, [isSuccess, isSuccessEdit]);

  return (
    <Card className={'col-span-2'}>
      <Button onClick={() => setOpen(true)} className={'mb-4'}>
        Добавить отель
      </Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} searchFiled={'name'} />
      <FormProvider {...form}>
        <Modal
          open={open}
          header={editHotelIndex !== null ? 'Редактировать отель' : 'Добавить отель'}
          actionBtnText={editHotelIndex !== null ? 'Сохранить' : 'Добавить'}
          onSubmit={form.handleSubmit(onSubmit)}
          onClose={() => {
            setOpen(false);
            setEditHotelIndex(null);
          }}
          main={<AdminCreateHotelModalBody />}
          loading={isLoadingCreate || isLoadingEdit}
          errorText={(error && (error as Error).message) || (errorEdit && (errorEdit as Error).message) || ''}
          isError={!!error || !!errorEdit}
        />
      </FormProvider>
    </Card>
  );
};

export default AdminHotelsPage;
