import { getAuth } from 'firebase/auth';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export type ConditionalRouteProps = {
  requireAuth: boolean;
  redirectTo: string;
} & PropsWithChildren;

export default function ConditionalRoute({
  requireAuth,
  redirectTo,
  children,
}: ConditionalRouteProps) {
  const auth = getAuth();
  const isAuthorized = !!auth.currentUser;

  if (requireAuth && !isAuthorized) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!requireAuth && isAuthorized) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
