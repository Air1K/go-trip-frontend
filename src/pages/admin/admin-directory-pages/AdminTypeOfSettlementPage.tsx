import { FC } from 'react';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { useSettlementTypeQuery } from '@/api/settlement-type/hooks.ts';
import { settlementTypeColumns } from '@/components/admin/table/columns/settlementTypeColumns.tsx';
import { Button } from '@/components/ui/button.tsx';

const AdminTypeOfSettlementPage: FC = () => {
  const { data, isLoading, isError } = useSettlementTypeQuery();
  const columns = settlementTypeColumns();
  return (
    <div>
      <Button className={'mb-4'}>Добавить</Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default AdminTypeOfSettlementPage;
