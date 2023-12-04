import { Navigate } from 'react-router-dom';
import Layout from 'src/components/Layout/Layout';

export default function PrivateRoutes() {
  return {
    element: <Layout />,
    children: [
      { path: '/', element: <h1>MAIN PAGE</h1> },
      { path: '/editor', element: <h1>Editor</h1> },
      { path: '/sign-in', element: <Navigate to="/" replace /> },
      { path: '*', element: <h1>404 page</h1> },
    ],
  };
}
