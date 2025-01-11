import { FC } from 'react';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { unitOfMeasurementColumns } from '@/components/admin/table/columns/unitsOfMeasurementColumns.tsx';
import { useUnitOfMeasurementQuery } from '@/api/units-of-measurement/hooks.ts';
import { Button } from '@/components/ui/button.tsx';

const AdminUnitsOfMeasurementPage: FC = () => {
  const { data, isLoading, isError } = useUnitOfMeasurementQuery();
  const columns = unitOfMeasurementColumns();
  return (
    <div>
      <Button className={'mb-4'}>Добавить</Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default AdminUnitsOfMeasurementPage;
