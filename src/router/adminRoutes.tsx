import PageLayout from '../layout/PageLayout';
import HomePage from '../pages/Home';
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
      element: <HomePage />,
    },
  ],
};

export default adminRoutes;
