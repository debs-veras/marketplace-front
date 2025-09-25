import PageLayout from '../layout/PageLayout';
import HomePage from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './privateRoute';

const userRoutes = {
  path: '/user',
  element: <PageLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: 'dashboard',
      element: (
        <PrivateRoute allowedRoles={['user']}>
          <HomePage />
        </PrivateRoute>
      ),
    },
  ],
};

export default userRoutes;
