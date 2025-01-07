import { FC } from 'react';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { useSettlementTypeQuery } from '@/api/settlement-type/hooks.ts';
import { settlementTypeColumns } from '@/components/admin/table/columns/settlementTypeColumns.tsx';

const AdminTypeOfSettlementPage: FC = () => {
  const { data, isLoading, isError } = useSettlementTypeQuery();
  const columns = settlementTypeColumns();
  return (
    <div>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default AdminTypeOfSettlementPage;
