import { FC } from 'react';
import { useTravelVoucherEditMutation, useTravelVoucherQuery } from '@/api/travel_voucher/hooks.ts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import Loader from '@/components/Loader.tsx';
import Error from '@/components/Error.tsx';
import { formatDate } from 'date-fns';
import { useCheckAuthQuery } from '@/api/user/hooks.ts';
import { ITravelVoucher } from '@/api/travel_voucher/types.ts';

const MainPage: FC = () => {
  const { data: vouchers, isLoading, isError } = useTravelVoucherQuery();
  const { data: profile } = useCheckAuthQuery();

  const { mutate } = useTravelVoucherEditMutation();

  if (isLoading) {
    return <Loader className='h-[60vh]' />;
  }

  if (isError || !vouchers) {
    return <Error className='h-[60vh]' />;
  }

  const isAdmin = profile?.role === 'admin';

  const onAdd = (voucher: ITravelVoucher) => {
    if (!profile) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tourist_id, ...rest } = voucher; // Исключаем старый tourist_id
    mutate({
      id: voucher.id,
      travelVoucher: { tourist_id: profile.id, ...rest, price: Number(voucher.price) }, // Устанавливаем новый tourist_id
    });
  };

  const onCancel = (voucher: ITravelVoucher) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tourist_id, ...rest } = voucher; // Исключаем tourist_id
    mutate({
      id: voucher.id,
      travelVoucher: { ...rest, tourist_id: null, price: Number(voucher.price) }, // Устанавливаем tourist_id как null
    });
  };

  return (
    <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {vouchers.map((voucher) => (
        <Card key={voucher.id} className='hover:shadow-lg transition-shadow'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>Отель: {voucher.hotel?.name || 'Не указан'}</CardTitle>
            <CardDescription>Турагентство: {voucher.travelAgency?.name || 'Не указано'}</CardDescription>
          </CardHeader>
          <CardContent className='text-sm text-muted-foreground'>
            <p>Дата оформления: {formatDate(voucher.issued_at, 'yyyy-MM-dd')}</p>
            <p>Дата вылета: {formatDate(voucher.departure_date, 'yyyy-MM-dd')}</p>
            <p>Дата прилёта: {formatDate(voucher.arrival_date, 'yyyy-MM-dd')}</p>
            <p>
              Цена: {voucher.price} {voucher.unitOfMeasurement?.name || ''}
            </p>
          </CardContent>
          <CardFooter className='flex justify-end'>
            {voucher.tourist_id !== profile?.id ? (
              <Button onClick={() => onAdd(voucher)} disabled={isAdmin}>
                Добавить
              </Button>
            ) : (
              <Button onClick={() => onCancel(voucher)} variant='outline' disabled={isAdmin}>
                Отменить
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MainPage;
