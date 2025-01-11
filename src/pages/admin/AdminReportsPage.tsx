import { FC, useMemo } from 'react';
import { useTravelVoucherQuery } from '@/api/travel_voucher/hooks.ts';
import { useSettlementQuery } from '@/api/settlement/hooks.ts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.tsx';
import Loader from '@/components/Loader.tsx';
import Error from '@/components/Error.tsx';
import { formatDate } from 'date-fns';
import CustomCard from '@/components/ui-custom/Card.tsx';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, CartesianGrid, XAxis } from 'recharts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const AdminReportPage: FC = () => {
  const { data: vouchers, isLoading, isError } = useTravelVoucherQuery();
  const { data: settlements, isLoading: isLoadingSettlements, isError: isErrorSettlements } = useSettlementQuery();

  const unpurchasedVouchers = useMemo(() => vouchers?.filter((voucher) => !voucher.tourist_id) || [], [vouchers]);

  const purchasedVouchers = useMemo(() => vouchers?.filter((voucher) => voucher.tourist_id) || [], [vouchers]);

  const hotelStats = useMemo(() => {
    if (!purchasedVouchers.length) return [];
    const stats: Record<string, number> = {};
    purchasedVouchers.forEach((voucher) => {
      const hotelName = voucher.hotel?.name || 'Неизвестный отель';
      stats[hotelName] = (stats[hotelName] || 0) + 1;
    });
    return Object.entries(stats).map(([hotel, count]) => ({ hotel, count }));
  }, [purchasedVouchers]);

  const cityStats = useMemo(() => {
    if (!purchasedVouchers.length || !settlements) return [];
    const stats: Record<string, number> = {};
    purchasedVouchers.forEach((voucher) => {
      const settlement = settlements.find((city) => city.id === voucher.hotel?.settlements_id);
      const cityName = settlement?.name || 'Неизвестный город';
      stats[cityName] = (stats[cityName] || 0) + 1;
    });
    return Object.entries(stats).map(([city, count]) => ({ city, count }));
  }, [purchasedVouchers, settlements]);

  if (isLoading || isLoadingSettlements) {
    return <Loader className='h-[60vh]' />;
  }

  if (isError || !vouchers || isErrorSettlements || !settlements) {
    return <Error className='h-[60vh]' />;
  }

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: '#2563eb',
    },
    mobile: {
      label: 'Mobile',
      color: '#46d5d5',
    },
  } satisfies ChartConfig;

  return (
    <CustomCard className={'col-span-2'}>
      <h1 className='text-2xl font-semibold mb-8'>Отчёт</h1>

      {/* Статистика */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Всего купленных путёвок</CardTitle>
          </CardHeader>
          <CardContent>{purchasedVouchers.length}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Всего доступных путёвок</CardTitle>
          </CardHeader>
          <CardContent>{vouchers.length}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Не куплено путёвок</CardTitle>
          </CardHeader>
          <CardContent>{unpurchasedVouchers.length}</CardContent>
        </Card>
      </div>

      {/* График популярности отелей */}
      <div className='mt-6'>
        <h2 className='text-xl font-semibold mb-4'>Популярные отели</h2>
        <ChartContainer config={chartConfig} className='max-h-[300px] w-full'>
          <BarChart data={hotelStats} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='hotel'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey='count' fill='var(--color-desktop)' radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* График популярности городов */}
      <div className='mt-6'>
        <h2 className='text-xl font-semibold mb-4'>Популярные города</h2>
        <ChartContainer config={chartConfig} className='max-h-[300px] w-full'>
          <BarChart data={cityStats} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='city'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey='count' fill='var(--color-mobile)' radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Списки путёвок */}
      <div className='mt-6'>
        <Accordion type="single" collapsible className="w-full">
          {/* Купленные путёвки */}
          <AccordionItem value="purchased">
            <AccordionTrigger>Купленные путёвки</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-4'>
                {purchasedVouchers.map((voucher) => (
                  <Card key={voucher.id}>
                    <CardHeader>
                      <CardTitle>{voucher.hotel?.name || 'Неизвестный отель'}</CardTitle>
                      <CardDescription>
                        Куплена туристом: {voucher.tourist?.firstName} {voucher.tourist?.lastName || ''}
                        <div>
                          Email: {voucher.tourist?.email}
                        </div>
                        <div>
                          Паспорт: {voucher.tourist?.passportNumber} {voucher.tourist?.passportSeries}
                        </div>

                      </CardDescription>
                    </CardHeader>
                    <CardContent className='text-sm text-muted-foreground'>
                      <p>Дата оформления: {formatDate(voucher.issued_at, 'yyyy-MM-dd')}</p>
                      <p>Дата вылета: {formatDate(voucher.departure_date, 'yyyy-MM-dd')}</p>
                      <p>Дата прилёта: {formatDate(voucher.arrival_date, 'yyyy-MM-dd')}</p>
                      <p>
                        Цена: {voucher.price} {voucher.unitOfMeasurement?.name || ''}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Не купленные путёвки */}
          <AccordionItem value="unpurchased">
            <AccordionTrigger>Не купленные путёвки</AccordionTrigger>
            <AccordionContent>
              <div className='space-y-4'>
                {unpurchasedVouchers.map((voucher) => (
                  <Card key={voucher.id}>
                    <CardHeader>
                      <CardTitle>{voucher.hotel?.name || 'Неизвестный отель'}</CardTitle>
                    </CardHeader>
                    <CardContent className='text-sm text-muted-foreground'>
                      <p>Дата оформления: {formatDate(voucher.issued_at, 'yyyy-MM-dd')}</p>
                      <p>Дата вылета: {formatDate(voucher.departure_date, 'yyyy-MM-dd')}</p>
                      <p>Дата прилёта: {formatDate(voucher.arrival_date, 'yyyy-MM-dd')}</p>
                      <p>
                        Цена: {voucher.price} {voucher.unitOfMeasurement?.name || ''}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </CustomCard>
  );
};

export default AdminReportPage;
