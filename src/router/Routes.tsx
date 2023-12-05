import { Navigate } from 'react-router-dom';
import Layout from 'src/components/Layout/Layout';
import { auth } from 'src/firebase';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

export default function Routes() {
  const AuthComponent = !!auth.currentUser ? (
    <Navigate to="/auth" replace />
  ) : (
    <h1>Auth page</h1>
  );

  return {
    element: <Layout />,
    children: [
      { path: '/', element: <h1>MAIN PAGE</h1> },
      {
        path: '/editor',
        element: (
          <ProtectedRoute isAuth={!!auth.currentUser}>
            <h1>Editor</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: '/auth',
        element: AuthComponent,
      },
      { path: '*', element: <h1>404 page</h1> },
    ],
  };
}
