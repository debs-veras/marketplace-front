import React, { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/authContext';
import ForbiddenPage from '../pages/ForbiddenPage';
import userRoutes from './userRoutes';
import HomePage from '../pages/Home';
import adminRoutes from './adminRoutes';
import RegisterUser from '../pages/User/Register';

const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFoundPage'));

function Router(): React.JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/login/:type',
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/403',
      element: <ForbiddenPage />,
    },
    {
      path: '/register/user',
      element: <RegisterUser />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    userRoutes,
    adminRoutes,
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default Router;
