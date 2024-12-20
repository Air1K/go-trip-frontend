import MainLayout from '@/components/layout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/MainPage.tsx';
import PrivateRoute from '@/components/PrivateRoute.tsx';
import BasketPage from '@/pages/BasketPage.tsx';
import AdminPage from '@/pages/AdminPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <PrivateRoute isAllowed={true} />,
        children: [{ path: '', element: <MainPage /> }],
      },
      {
        path: '/basket',
        element: <PrivateRoute isAllowed={true} />,
        children: [{ path: '', element: <BasketPage /> }],
      },
      {
        path: 'admin',
        element: <PrivateRoute isAllowed={true} />,
        children: [{ path: '', element: <AdminPage /> }],
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export default router;
