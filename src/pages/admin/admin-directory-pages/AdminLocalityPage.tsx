import { FC } from 'react';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { settlementColumns } from '@/components/admin/table/columns/settlementColumns.tsx';
import { useSettlementQuery } from '@/api/settlement/hooks.ts';
import { Button } from '@/components/ui/button.tsx';

const AdminLocalityPage: FC = () => {
  const { data, isLoading, isError } = useSettlementQuery();
  const columns = settlementColumns();
  return (
    <div>
      <Button className={'mb-4'}>Добавить</Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default AdminLocalityPage;
