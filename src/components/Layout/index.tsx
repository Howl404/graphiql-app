import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';

export default function Layout() {
  return (
    <ErrorBoundary>
      <h2>HEADER</h2>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
      <h2>FOOTER</h2>
    </ErrorBoundary>
  );
}
