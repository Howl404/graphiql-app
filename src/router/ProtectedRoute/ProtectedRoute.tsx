import { Navigate } from 'react-router-dom';

import { ProtectedRouteProps } from './ProtectedRoute.props';

export default function ProtectedRoute({
  isAuth,
  children,
}: ProtectedRouteProps) {
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}
