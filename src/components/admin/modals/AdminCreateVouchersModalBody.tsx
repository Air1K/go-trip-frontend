import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput.tsx';
import { FormSelect } from '@/components/form/FormSelect.tsx';
import { Form } from '@/components/ui/form.tsx';
import { TravelVoucherSchemaFormType } from '@/validation/travel-voucher-schema.ts';
import { useHotelQuery } from '@/api/hotel/hooks.ts';
import { useTravelAgencyQuery } from '@/api/travel-agency/hooks.ts';
import Loader from '@/components/Loader.tsx';
import Error from '@/components/Error.tsx';
import { useUnitOfMeasurementQuery } from '@/api/units-of-measurement/hooks.ts';

const AdminCreateTravelVoucherModalBody: FC = () => {
  const form = useFormContext<TravelVoucherSchemaFormType>();
  const { data: hotels, isLoading: isLoadingHotels, isError: isErrorHotels } = useHotelQuery();
  const { data: travelAgencies, isLoading: isLoadingAgencies, isError: isErrorAgencies } = useTravelAgencyQuery();
  const { data: units, isLoading: isLoadingUnits, isError: isErrorUnits } = useUnitOfMeasurementQuery();
  if (isLoadingHotels || isLoadingAgencies || isLoadingUnits) {
    return <Loader className='h-[60vh]' />;
  }

  if (isErrorHotels || isErrorAgencies || isErrorUnits || !hotels || !travelAgencies || !units) {
    return <Error className='h-[60vh]' />;
  }

  return (
    <div>
      <Form {...form}>
        <div className='flex flex-col gap-4'>
          <FormInput
            control={form.control}
            name='issued_at'
            type='date'
            label='Дата оформления'
            placeholder='YYYY-MM-DD'
          />
          <FormInput
            control={form.control}
            name='departure_date'
            type='date'
            label='Дата вылета'
            placeholder='YYYY-MM-DD'
          />
          <FormInput
            control={form.control}
            name='arrival_date'
            type='date'
            label='Дата прилёта'
            placeholder='YYYY-MM-DD'
          />
          <FormInput
            control={form.control}
            name='price'
            type='number'
            label='Стоимость'
            placeholder='Введите стоимость'
          />
          {/*<FormSelect*/}
          {/*  control={form.control}*/}
          {/*  name='tourist_id'*/}
          {/*  label='Турист'*/}
          {/*  options={tourists}*/}
          {/*  nameField='fullName' // Предполагается, что туристы имеют поле fullName*/}
          {/*  valueField='id'*/}
          {/*  placeholder='Выберите туриста'*/}
          {/*/>*/}
          <FormSelect
            control={form.control}
            name='hotel_id'
            label='Отель'
            options={hotels}
            nameField='name'
            valueField='id'
            placeholder='Выберите отель'
          />
          <FormSelect
            control={form.control}
            name='travel_agency_id'
            label='Турагентство'
            options={travelAgencies}
            nameField='name'
            valueField='id'
            placeholder='Выберите турагентство'
          />
          <FormSelect
            control={form.control}
            name='unit_id'
            label='Единица измерения'
            options={units}
            nameField='name'
            valueField='id'
            placeholder='Выберите единицу измерения'
          />
        </div>
      </Form>
    </div>
  );
};

export default AdminCreateTravelVoucherModalBody;
