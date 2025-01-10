import MainLayout from '@/components/layout/MainLayout';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainPage from '@/pages/MainPage.tsx';
import PrivateRoute from '@/components/PrivateRoute.tsx';
import BasketPage from '@/pages/BasketPage.tsx';
import AdminVouchersPage from '@/pages/admin/admin-vouchers-pages/admin-vouchers-pages/AdminVouchersPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import ProfilePage from '@/pages/ProfilePage.tsx';
import AdminLayout from '@/components/layout/AdminLayout.tsx';
import AdminHotelsPage from '@/pages/admin/admin-hotel-pages/AdminHotelsPage.tsx';
import AdminReportsPage from '@/pages/admin/AdminReportsPage.tsx';
import AdminUnitsOfMeasurementPage from '@/pages/admin/admin-directory-pages/AdminUnitsOfMeasurementPage.tsx';
import AdminTravelAgencyPage from '@/pages/admin/admin-vouchers-pages/admin-travel-agency-pages/AdminTravelAgencyPage.tsx';
import AdminTourOperatorPage from '@/pages/admin/admin-vouchers-pages/admin-tour-operator-pages/AdminTourOperatorPage.tsx';
import AdminLayout3lvl from '@/components/layout/AdminLayout3lvl.tsx';
import AdminServicePage from '@/pages/admin/admin-directory-pages/AdminServicePage.tsx';
import AdminTypeOfSettlementPage from '@/pages/admin/admin-directory-pages/AdminTypeOfSettlementPage.tsx';
import AdminCountryPage from '@/pages/admin/admin-directory-pages/AdminCountryPage.tsx';
import AdminLocalityPage from '@/pages/admin/admin-directory-pages/AdminLocalityPage.tsx';
import AdminCreateHotelModalBody from '@/components/admin/modals/AdminCreateHotelModalBody.tsx';
import AdminCreateTravelAgencyModalBody from '@/components/admin/modals/AdminCreateTravelAgencyModalBody.tsx';
import AdminCreateTourOperatorModalBody from '@/components/admin/modals/AdminCreateTourOperatorModalBody.tsx';
import AdminCreateVouchersPage from '@/components/admin/modals/AdminCreateVouchersModalBody.tsx';

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
            element: (
              <PrivateRoute isAdmin isAllowed={true}>
                <AdminLayout />
              </PrivateRoute>
            ),
            children: [
              { path: '', element: <Navigate to='vouchers' replace /> },
              {
                path: 'vouchers',
                element: <AdminLayout3lvl />,
                children: [
                  { path: '', element: <Navigate to='control' replace /> },
                  {
                    path: 'control',
                    children: [
                      { path: '', element: <AdminVouchersPage /> },
                      { path: 'create', element: <AdminCreateVouchersPage /> },
                      { path: 'edit/:id', element: <AdminCreateVouchersPage /> },
                    ],
                  },
                  {
                    path: 'travel-agency',
                    children: [
                      { path: '', element: <AdminTravelAgencyPage /> },
                      { path: 'create', element: <AdminCreateTravelAgencyModalBody /> },
                      { path: 'edit/:id', element: <AdminCreateTravelAgencyModalBody /> },
                    ],
                  },
                  {
                    path: 'tour-operator',
                    children: [
                      { path: '', element: <AdminTourOperatorPage /> },
                      { path: 'create', element: <AdminCreateTourOperatorModalBody /> },
                      { path: 'edit/:id', element: <AdminCreateTourOperatorModalBody /> },
                    ],
                  },
                ],
              },
              {
                path: 'hotels',
                children: [
                  { path: '', element: <AdminHotelsPage /> },
                  { path: 'create', element: <AdminCreateHotelModalBody /> },
                ],
              },
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
