import { ReactNode } from 'react';

export interface ProtectedRouteProps {
  isAuth: boolean;
  children: ReactNode;
}
