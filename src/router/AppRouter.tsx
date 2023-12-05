import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Routes from './Routes';

export default function AppRouter() {
  const router = createBrowserRouter([Routes()]);

  return <RouterProvider router={router} />;
}
