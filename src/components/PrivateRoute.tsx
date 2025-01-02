import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { IUser } from '@/api/user/types.ts';
import { KEY_PROFILE } from '@/api/user/hooks.ts';

interface PrivateRouteProps {
  isAllowed: boolean;
  isAdmin?: boolean;
  children?: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ isAllowed, isAdmin, children }) => {
  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUser>([KEY_PROFILE]);
  const userIsAdmin = userProfile?.role === 'admin';

  if (!isAllowed && !userProfile) {
    alert('1');
    return <Navigate to={'/login'} />;
  }

  if (isAdmin && !userIsAdmin) {
    alert('2');
    return <Navigate to={'/'} />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
