import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from 'components/Footer';
import Header from 'components/Header';

import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
