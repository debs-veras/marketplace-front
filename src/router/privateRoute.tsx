import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { ReactNode } from 'react';
import Loading from '../components/Loading';

type PrivateRouteProps = {
  children: ReactNode;
  allowedRoles: ('user' | 'admin')[];
};

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) return <Loading />;
  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) 
    return <Navigate to="/403" replace />;
  return children;
}