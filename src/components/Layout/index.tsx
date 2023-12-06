import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Header';

export default function Layout() {
  return (
    <>
      <Header>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Outlet />
        </Suspense>
      </Header>
      <Footer />
    </>
  );
}
