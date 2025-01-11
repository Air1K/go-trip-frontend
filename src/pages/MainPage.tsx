import { FC, useEffect, useState } from 'react';
import { useTravelVoucherQuery } from '@/api/travel_voucher/hooks.ts';
import { useCheckAuthQuery } from '@/api/user/hooks.ts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import Loader from '@/components/Loader.tsx';
import Error from '@/components/Error.tsx';
import { formatDate } from 'date-fns';
import { ITravelVoucher } from '@/api/travel_voucher/types.ts';

const MainPage: FC = () => {
  const { data: vouchers, isLoading, isError } = useTravelVoucherQuery();
  const { data: profile } = useCheckAuthQuery();
  const [cart, setCart] = useState<ITravelVoucher[]>([]);

  // Загружаем корзину из localStorage только один раз
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Ошибка чтения корзины из localStorage:', error);
      }
    }
  }, []); // <-- Пустой массив зависимостей

  // Сохраняем корзину в localStorage при изменении состояния
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart'); // Удаляем корзину, если она пуста
    }
  }, [cart]);

  const isInCart = (voucher: ITravelVoucher) => cart.some((item) => item.id === voucher.id);

  const addToCart = (voucher: ITravelVoucher) => {
    if (!isInCart(voucher)) {
      setCart((prev) => [...prev, voucher]);
    }
  };

  const removeFromCart = (voucher: ITravelVoucher) => {
    setCart((prev) => prev.filter((item) => item.id !== voucher.id));
  };

  const isPurchased = (voucher: ITravelVoucher) => voucher.tourist_id === profile?.id;

  if (isLoading) {
    return <Loader className='h-[60vh]' />;
  }

  if (isError || !vouchers) {
    return <Error className='h-[60vh]' />;
  }

  return (
    <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {vouchers.map((voucher) => (
        <Card key={voucher.id} className='hover:shadow-lg transition-shadow grid'>
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
            {isPurchased(voucher) ? (
              <Button disabled variant='outline'>
                Уже куплено
              </Button>
            ) : isInCart(voucher) ? (
              <Button onClick={() => removeFromCart(voucher)} variant='outline'>
                Убрать из корзины
              </Button>
            ) : (
              <Button disabled={profile?.role === 'admin'} onClick={() => addToCart(voucher)}>Добавить в корзину</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MainPage;
