import { FC } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { adminLink } from '@/config/navigation.tsx';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { useTravelVoucherQuery } from '@/api/travel_voucher/hooks.ts';
import { travelVoucherColumns } from '@/components/admin/table/columns/travelVoucherColumns.tsx';

const AdminVouchersPage: FC = () => {
  const { data, isLoading, isError } = useTravelVoucherQuery();
  const columns = travelVoucherColumns();
  return (
    <div>
      <Button className={'mb-4'} asChild>
        <NavLink to={adminLink.createVoucher}>Добавить путевку</NavLink>
      </Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default AdminVouchersPage;
