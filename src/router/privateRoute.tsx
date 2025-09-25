import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { ReactNode } from 'react';

type PrivateRouteProps = {
  children: ReactNode;
  allowedRoles: ('user' | 'admin')[];
};

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login/user" replace />;
  if (!user || !allowedRoles.includes(user.role))
    return <Navigate to="/403" replace />;

  return children;
}
