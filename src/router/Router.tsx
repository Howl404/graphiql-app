import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

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
