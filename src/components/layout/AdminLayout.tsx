import { FC } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Card from '@/components/ui-custom/Card.tsx';
import { getAdminNavLinks } from '@/config/navigation.tsx';
import { Button } from '@/components/ui/button.tsx';

const AdminLayout: FC = () => {
  const location = useLocation();
  return (
    <div>
      <Card size={'xs'} className={'grid grid-flow-col gap-3 mb-4 gradient-border'}>
        {getAdminNavLinks().map((link, index) => (
          <Button
            key={index}
            variant={location.pathname.startsWith(link.path) ? 'default' : 'ghost'}
            size={'sm'}
            asChild
          >
            <NavLink to={link.path}>{link.label}</NavLink>
          </Button>
        ))}
      </Card>
      <div className={'grid grid-flow-col grid-cols-[auto_minmax(0,1fr)] items-start gap-4'}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
