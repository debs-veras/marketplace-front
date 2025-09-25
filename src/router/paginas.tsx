import PageLayout from '../layout/PageLayout';
import NotFoundPage from '../pages/NotFoundPage';
import userRoutes from './userRoutes';

const routesPaginas = {
  path: '/',
  element: <PageLayout />,
  errorElement: <NotFoundPage />,
  children: [userRoutes],
};

export default routesPaginas;
