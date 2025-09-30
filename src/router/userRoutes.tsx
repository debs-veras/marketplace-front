import UserPageLayout from '../layout/UserPageLayout';
import NotFoundPage from '../pages/NotFoundPage';
import CartPage from '../pages/User/CartPage';
import PrivateRoute from './privateRoute';

const userRoutes = {
  path: '/user',
  element: <UserPageLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: 'minhas-compras',
      element: (
        <PrivateRoute allowedRoles={['user']}>
          <CartPage />
        </PrivateRoute>
      ),
    },
  ],
};

export default userRoutes;
