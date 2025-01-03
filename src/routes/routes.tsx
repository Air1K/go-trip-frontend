import MainLayout from '@/components/layout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/MainPage.tsx';
import PrivateRoute from '@/components/PrivateRoute.tsx';
import BasketPage from '@/pages/BasketPage.tsx';
import AdminPage from '@/pages/AdminPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import ProfilePage from '@/pages/ProfilePage.tsx';

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
        path: '/vouchers',
        element: <PrivateRoute isAllowed={true} />,
        children: [{ path: '', element: <BasketPage /> }],
      },
      {
        path: '/admin',
        element: <PrivateRoute isAllowed={true} />,
        children: [{ path: '', element: <AdminPage /> }],
      },
      {
        path: '/profile',
        element: <PrivateRoute isAllowed={true} />,
        children: [{ path: '', element: <ProfilePage /> }],
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export default router;
