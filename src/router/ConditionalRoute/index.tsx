import { PropsWithChildren } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from 'src/firebase';

import Loader from 'components/UI/Loader';

import styles from './ConditionalRoute.module.scss';

export type ConditionalRouteProps = {
  requireAuth: boolean;
  redirectTo: string;
} & PropsWithChildren;

export default function ConditionalRoute({
  requireAuth,
  redirectTo,
  children,
}: ConditionalRouteProps) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if ((requireAuth && !user) || (!requireAuth && user)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
