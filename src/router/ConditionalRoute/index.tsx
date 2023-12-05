import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export interface ConditionalRouteProps {
  predicate: boolean;
  path: string;
  children: ReactNode;
}

export default function ConditionalRoute({
  predicate,
  path,
  children,
}: ConditionalRouteProps) {
  if (!predicate) {
    return <Navigate to={`${path}`} replace />;
  }
  return children;
}
