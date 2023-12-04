import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoutes from './routes/privateRoutes';
import PublicRoutes from './routes/publicRoutes';

function checkAuth() {
  return true;
}

export default function AppRouter() {
  const router = createBrowserRouter([
    checkAuth() ? PrivateRoutes() : {},
    ...PublicRoutes(),
  ]);

  return <RouterProvider router={router} />;
}
