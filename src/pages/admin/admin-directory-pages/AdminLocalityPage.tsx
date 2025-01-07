import { FC } from 'react';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { settlementColumns } from '@/components/admin/table/columns/settlementColumns.tsx';
import { useSettlementQuery } from '@/api/settlement/hooks.ts';

const AdminLocalityPage: FC = () => {
  const { data, isLoading, isError } = useSettlementQuery();
  const columns = settlementColumns();
  return (
    <div>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default AdminLocalityPage;
