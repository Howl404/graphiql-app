import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Paths from 'enums/paths';

import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Loader from 'components/UI/Loader';

import styles from './Layout.module.scss';

export default function Layout() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [wasAuthenticated, setWasAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setWasAuthenticated(true);
      } else if (wasAuthenticated) {
        navigate(Paths.Welcome);
      }
    });

    return () => unsubscribe();
  }, [navigate, auth, wasAuthenticated]);

  return (
    <ErrorBoundary>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <Suspense
            fallback={
              <div className={styles.loaderContainer}>
                <Loader />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
