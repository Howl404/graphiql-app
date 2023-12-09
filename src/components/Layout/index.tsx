import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Loader from 'components/UI/Loader';

import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <ErrorBoundary>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}