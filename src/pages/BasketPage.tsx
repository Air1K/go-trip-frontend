import { FC } from 'react';
import { useTravelVoucherEditMutation, useTravelVoucherQuery } from '@/api/travel_voucher/hooks.ts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card.tsx';
import Loader from '@/components/Loader.tsx';
import Error from '@/components/Error.tsx';
import { formatDate } from 'date-fns';
import { useCheckAuthQuery } from '@/api/user/hooks.ts';
import { ITravelVoucher } from '@/api/travel_voucher/types.ts';
import { Button } from '@/components/ui/button.tsx';

const BasketPage: FC = () => {
  const { data: vouchers, isLoading, isError } = useTravelVoucherQuery();
  const { data: profile } = useCheckAuthQuery();
  const { mutate } = useTravelVoucherEditMutation();

  if (isLoading) {
    return <Loader className='h-[60vh]' />;
  }

  if (isError || !vouchers) {
    return <Error className='h-[60vh]' />;
  }

  const userVouchers = vouchers.filter((voucher) => voucher.tourist_id === profile?.id);

  const onCancel = (voucher: ITravelVoucher) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tourist_id, ...rest } = voucher;
    mutate({
      id: voucher.id,
      travelVoucher: { ...rest, tourist_id: null, price: Number(voucher.price) }, // Убираем туриста
    });
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Мои путёвки</h1>
      <div className='space-y-4'>
        {userVouchers.length === 0 ? (
          <p className='text-center text-muted-foreground'>У вас пока нет путёвок.</p>
        ) : (
          userVouchers.map((voucher) => (
            <Card key={voucher.id} className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold'>{voucher.hotel?.name || 'Не указан'}</CardTitle>
                <CardDescription>{voucher.travelAgency?.name || 'Не указано'}</CardDescription>
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
                <Button
                  variant='outline'
                  onClick={() => onCancel(voucher)}
                  className='hover:text-destructive hover:border-destructive'
                >
                  Отменить
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BasketPage;
