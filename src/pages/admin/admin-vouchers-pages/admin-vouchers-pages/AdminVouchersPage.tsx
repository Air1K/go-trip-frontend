import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import {
  useTravelVoucherCreateMutation,
  useTravelVoucherEditMutation,
  useTravelVoucherQuery,
} from '@/api/travel_voucher/hooks.ts';
import { travelVoucherColumns } from '@/components/admin/table/columns/travelVoucherColumns.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { travelVoucherSchema, TravelVoucherSchemaFormType } from '@/validation/travel-voucher-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '@/components/Modal.tsx';
import AdminCreateTravelVoucherModalBody from '@/components/admin/modals/AdminCreateVouchersModalBody.tsx';
import { formatDate } from 'date-fns';

const AdminVouchersPage: FC = () => {
  const { data, isLoading, isError } = useTravelVoucherQuery();
  const {
    mutate: editVoucher,
    isPending: isLoadingEdit,
    error: errorEdit,
    isSuccess: isSuccessEdit,
  } = useTravelVoucherEditMutation();
  const { mutate: createVoucher, isPending: isLoadingCreate, error, isSuccess } = useTravelVoucherCreateMutation();
  const [open, setOpen] = useState(false);
  const [editVoucherIndex, setEditVoucherIndex] = useState<number | null>(null);
  const columns = travelVoucherColumns(setEditVoucherIndex);
  const form = useForm<TravelVoucherSchemaFormType>({
    resolver: zodResolver(travelVoucherSchema),
  });

  useEffect(() => {
    if (editVoucherIndex !== null && data) {
      form.setValue('issued_at', formatDate(data[editVoucherIndex].issued_at, 'yyyy-MM-dd') || '');
      form.setValue('departure_date', formatDate(data[editVoucherIndex].departure_date, 'yyyy-MM-dd') || '');
      form.setValue('arrival_date', formatDate(data[editVoucherIndex].arrival_date, 'yyyy-MM-dd') || '');
      form.setValue('price', data[editVoucherIndex].price || 0);
      form.setValue('hotel_id', data[editVoucherIndex].hotel_id || 0);
      form.setValue('travel_agency_id', data[editVoucherIndex].travel_agency_id || 0);
      form.setValue('unit_id', data[editVoucherIndex].unit_id || 0);
      setOpen(true);
      console.log(form.getValues());
    }
  }, [editVoucherIndex]);

  const onSubmit = (formData: TravelVoucherSchemaFormType) => {
    console.log('Изменяем путёвку:', formData);
    if (editVoucherIndex !== null && data) {
      editVoucher({ id: data[editVoucherIndex].id, travelVoucher: formData });
      console.log('Изменяем путёвку:', formData);
    } else {
      createVoucher(formData);
      console.log('Создаём новую путёвку:', formData);
    }
  };

  useEffect(() => {
    if (isSuccess || isSuccessEdit) {
      setOpen(false);
      setEditVoucherIndex(null);
    }
  }, [isSuccess, isSuccessEdit]);
  return (
    <div>
      <Button onClick={() => setOpen(true)} className={'mb-4'}>
        Добавить путевку
      </Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} searchFiled={'id'} />
      <FormProvider {...form}>
        <Modal
          open={open}
          header={editVoucherIndex !== null ? 'Редактировать путёвку' : 'Добавить путёвку'}
          actionBtnText={editVoucherIndex !== null ? 'Сохранить' : 'Добавить'}
          onSubmit={form.handleSubmit(onSubmit)}
          onClose={() => {
            setOpen(false);
            setEditVoucherIndex(null);
          }}
          main={<AdminCreateTravelVoucherModalBody />}
          loading={isLoadingCreate || isLoadingEdit}
          errorText={(error && (error as Error).message) || (errorEdit && (errorEdit as Error).message) || ''}
          isError={!!error || !!errorEdit}
        />
      </FormProvider>
    </div>
  );
};

export default AdminVouchersPage;
