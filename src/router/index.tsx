import React, { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/authContext';
import ForbiddenPage from '../pages/ForbiddenPage';
import userRoutes from './userRoutes';
import HomePage from '../pages/Home';

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
      path: '/403',
      element: <ForbiddenPage />,
    },
    {
      path: '/',
      element: <HomePage />,
    },
    userRoutes,
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default Router;
