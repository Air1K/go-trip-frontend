import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  isAllowed: boolean;
  isAdmin?: boolean;
  children?: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ isAllowed, isAdmin, children }) => {
  const user = {
    isAdmin: true,
  };
  const userIsAdmin = user?.isAdmin;

  if (!isAllowed) {
    return <Navigate to={'/login'} />;
  }

  if (isAdmin && !userIsAdmin) {
    return <Navigate to={'/'} />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
