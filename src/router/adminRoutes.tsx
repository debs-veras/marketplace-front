import PageLayout from '../layout/PageLayout';
import ListingProducts from '../pages/Admin/Products/Listing';
import RegisterProducts from '../pages/Admin/Products/Register';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './privateRoute';

const adminRoutes = {
  path: '/admin',
  element: (
    <PrivateRoute allowedRoles={['admin']}>
      <PageLayout />
    </PrivateRoute>
  ),
  errorElement: <NotFoundPage />,
  children: [
    {
      path: 'dashboard',
      element: <div>Dasshboard</div>,
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
