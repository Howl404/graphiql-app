import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import useAuthHandler from 'hooks/useAuthHandler';

import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Loader from 'components/UI/Loader';

import styles from './Layout.module.scss';

export default function Layout() {
  useAuthHandler();

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
