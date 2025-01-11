import { FC } from 'react';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { useCountryQuery } from '@/api/country/hooks.ts';
import { countryColumns } from '@/components/admin/table/columns/countryColumns.tsx';
import { Button } from '@/components/ui/button.tsx';

const AdminCountryPage: FC = () => {
  const { data, isLoading, isError } = useCountryQuery();
  const columns = countryColumns();
  return (
    <div>
      <Button className={'mb-4'}>Добавить</Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default AdminCountryPage;
