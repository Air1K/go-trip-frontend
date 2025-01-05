import { FC } from 'react';
import Card from '@/components/ui-custom/Card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { adminLink } from '@/config/navigation.tsx';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { useHotelQuery } from '@/api/hotel/hooks.ts';
import { hotelColumns } from '@/components/admin/table/columns/hotelColumns.tsx';

const AdminHotelsPage: FC = () => {
  const { data, isLoading, isError } = useHotelQuery();
  const columns = hotelColumns();
  return (
    <Card className={'col-span-2 flex flex-col'}>
      <Button className={'mb-4 ml-auto'} asChild>
        <NavLink to={adminLink.createHotel}>Добавить отель</NavLink>
      </Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </Card>
  );
};

export default AdminHotelsPage;
