import MainLayout from '@/components/layout/MainLayout';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainPage from '@/pages/MainPage.tsx';
import PrivateRoute from '@/components/PrivateRoute.tsx';
import BasketPage from '@/pages/BasketPage.tsx';
import AdminVouchersPage from '@/pages/admin/admin-vouchers-pages/AdminVouchersPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import ProfilePage from '@/pages/ProfilePage.tsx';
import AdminLayout from '@/components/layout/AdminLayout.tsx';
import AdminHotelsPage from '@/pages/admin/AdminHotelsPage.tsx';
import AdminReportsPage from '@/pages/admin/AdminReportsPage.tsx';
import AdminUnitsOfMeasurementPage from '@/pages/admin/admin-directory-pages/AdminUnitsOfMeasurementPage.tsx';
import AdminTravelAgencyPage from '@/pages/admin/admin-vouchers-pages/AdminTravelAgencyPage.tsx';
import AdminTourOperatorPage from '@/pages/admin/admin-vouchers-pages/AdminTourOperatorPage.tsx';
import AdminLayout3lvl from '@/components/layout/AdminLayout3lvl.tsx';
import AdminServicePage from '@/pages/admin/admin-directory-pages/AdminServicePage.tsx';
import AdminTypeOfSettlementPage from '@/pages/admin/admin-directory-pages/AdminTypeOfSettlementPage.tsx';
import AdminCountryPage from '@/pages/admin/admin-directory-pages/AdminCountryPage.tsx';
import AdminLocalityPage from '@/pages/admin/admin-directory-pages/AdminLocalityPage.tsx';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <PrivateRoute isAllowed={true} />,
        children: [
          { path: '', element: <MainPage /> },
          { path: 'vouchers', element: <BasketPage /> },
          {
            path: 'admin',
            element: <AdminLayout />,
            children: [
              { path: '', element: <Navigate to='vouchers' replace /> },
              {
                path: 'vouchers',
                element: <AdminLayout3lvl />,
                children: [
                  { path: '', element: <Navigate to='control' replace /> },
                  { path: 'control', element: <AdminVouchersPage /> },
                  { path: 'travel-agency', element: <AdminTravelAgencyPage /> },
                  { path: 'tour-operator', element: <AdminTourOperatorPage /> },
                ],
              },
              { path: 'hotels', element: <AdminHotelsPage /> },
              { path: 'reports', element: <AdminReportsPage /> },
              {
                path: 'directory',
                element: <AdminLayout3lvl />,
                children: [
                  { path: '', element: <Navigate to='units-of-measurement' replace /> },
                  { path: 'units-of-measurement', element: <AdminUnitsOfMeasurementPage /> },
                  { path: 'service', element: <AdminServicePage /> },
                  { path: 'type-of-settlement', element: <AdminTypeOfSettlementPage /> },
                  { path: 'country', element: <AdminCountryPage /> },
                  { path: 'locality', element: <AdminLocalityPage /> },
                ],
              },
            ],
          },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export default router;
