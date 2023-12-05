import { ReactNode } from 'react';

export interface ConditionalRouteProps {
  predicate: boolean;
  path: string;
  children: ReactNode;
}
