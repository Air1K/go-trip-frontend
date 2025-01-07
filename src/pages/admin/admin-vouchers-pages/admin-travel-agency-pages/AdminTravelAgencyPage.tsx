import { FC } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { adminLink } from '@/config/navigation.tsx';
import DataTable from '@/components/ui-custom/DataTable.tsx';
import { useTravelAgencyQuery } from '@/api/travel-agency/hooks.ts';
import { travelAgencyColumns } from '@/components/admin/table/columns/travelAgencyColumns.tsx';

const AdminTravelAgencyPage: FC = () => {
  const { data, isLoading, isError } = useTravelAgencyQuery();
  const columns = travelAgencyColumns();
  return (
    <div>
      <Button className={'mb-4 ml-auto'} asChild>
        <NavLink to={adminLink.createTravelAgency}>Добавить турагенство</NavLink>
      </Button>
      <DataTable columns={columns} isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default AdminTravelAgencyPage;
