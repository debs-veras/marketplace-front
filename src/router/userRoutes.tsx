import PageLayout from '../layout/PageLayout';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './privateRoute';

const userRoutes = {
  path: '/user',
  element: <PageLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: 'minhas-compras',
      element: (
        <PrivateRoute allowedRoles={['user']}>
          <div>Meus Produtos</div>
        </PrivateRoute>
      ),
    },
  ],
};

export default userRoutes;
