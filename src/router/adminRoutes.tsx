import AdminPageLayout from '../layout/AdminPageLayout';
import ListingProducts from '../pages/Admin/Products/Listing';
import RegisterProducts from '../pages/Admin/Products/Register';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './privateRoute';

const adminRoutes = {
  path: '/admin',
  element: (
    <PrivateRoute allowedRoles={['admin']}>
      <AdminPageLayout />
    </PrivateRoute>
  ),
  errorElement: <NotFoundPage />,
  children: [
    {
      path: 'dashboard',
      element: <div>Dashboard</div>,
    },
    {
      path: 'register/product/:idProduct?',
      element: <RegisterProducts />,
    },
    {
      path: 'listing/product',
      element: <ListingProducts />,
    },
  ],
};

export default adminRoutes;
