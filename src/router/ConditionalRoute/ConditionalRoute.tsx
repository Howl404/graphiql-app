import { Navigate } from 'react-router-dom';

import { ConditionalRouteProps } from './ConditionalRoute.props';

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
