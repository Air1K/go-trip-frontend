import { FC } from 'react';
import Card from '@/components/ui-custom/Card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { getAdminLinkInPath } from '@/config/navigation.tsx';

const AdminLayout3lvl: FC = () => {
  const location = useLocation();
  const links = getAdminLinkInPath(location.pathname);
  return (
    <>
      <Card size={'s'} className={'flex flex-col gap-3 gradient-border'}>
        {links?.map((link, index) => (
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
      <Card className={'gradient-border'}>
        <Outlet />
      </Card>
    </>
  );
};

export default AdminLayout3lvl;
