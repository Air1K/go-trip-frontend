import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelVoucherEditMutation } from '@/api/travel_voucher/hooks.ts';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import Loader from '@/components/Loader.tsx';
import { ITravelVoucher } from '@/api/travel_voucher/types.ts';
import { Alert } from '@/components/ui/alert.tsx';
import { formatDate } from 'date-fns';
import { useCheckAuthQuery } from '@/api/user/hooks.ts';

const BasketPage: FC = () => {
  const [cart, setCart] = useState<ITravelVoucher[]>([]);
  const { mutate, isPending } = useTravelVoucherEditMutation();
  const { data: profile } = useCheckAuthQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (voucher: ITravelVoucher) => {
    const updatedCart = cart.filter((item) => item.id !== voucher.id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (!profile) return;
    console.log(profile);
    cart.forEach((voucher) => {
      mutate({
        id: voucher.id,
        travelVoucher: { ...voucher, tourist_id: profile.id, price: Number(voucher.price) },
      });
    });

    localStorage.removeItem('cart');
    setCart([]);
    navigate('/vouchers');
  };

  const totalAmount = cart.reduce((sum, voucher) => sum + parseFloat(String(voucher.price)), 0);

  if (isPending) {
    return <Loader className='h-[60vh]' />;
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Корзина</h1>
      <div className='space-y-4'>
        {cart.map((voucher) => (
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
                Цена: {voucher.price} {voucher.unitOfMeasurement?.short_name || ''}
              </p>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={() => removeFromCart(voucher)} variant='outline'>
                Убрать
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {cart.length > 0 ? (
        <div className='mt-6'>
          {/* Карточка с информацией по оплате */}
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>Информация по оплате</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm'>
                Общая сумма: <span className='font-bold'>{totalAmount.toFixed(2)}</span> руб.
              </p>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={handleCheckout}>Оплатить</Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Alert variant={'destructive'}>Корзина пуста</Alert>
      )}
    </div>
  );
};

export default BasketPage;
