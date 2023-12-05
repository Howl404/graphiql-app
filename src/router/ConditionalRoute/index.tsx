import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export type ConditionalRouteProps = {
  predicate: boolean;
  path: string;
} & PropsWithChildren;

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
