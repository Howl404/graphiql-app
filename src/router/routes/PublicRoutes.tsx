import { Navigate } from 'react-router-dom';

export default function PublicRoutes() {
  return [
    { path: '/sign-in', element: <h1>This is sign in page</h1> },
    { path: '*', element: <Navigate to="/sign-in" replace /> },
  ];
}
