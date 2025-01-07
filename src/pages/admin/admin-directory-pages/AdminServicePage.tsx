import { FC } from 'react';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { useServiceClassQuery } from '@/api/service-class/hooks.ts';
import { serviceClassColumns } from '@/components/admin/table/columns/serviceClassColumns.tsx';

const AdminServicePage: FC = () => {
  const { data, isLoading, isError } = useServiceClassQuery();
  const columns = serviceClassColumns();
  return (
    <div>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default AdminServicePage;
