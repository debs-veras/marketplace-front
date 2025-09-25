import HomePage from '../pages/Home';
import PrivateRoute from './privateRoute';

const userRoutes = {
  path: '/user',
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
