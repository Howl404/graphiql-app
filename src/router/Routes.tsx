import { lazy } from 'react';

import Paths from 'enums/paths';

import Layout from 'components/Layout';

import MainPage from 'pages/MainPage';
import NotFoundPage from 'pages/NotFoundPage';

import ConditionalRoute from './ConditionalRoute';

const GraphiqlPage = lazy(() => import('pages/GraphiqlPage'));
const AuthPage = lazy(() => import('pages/AuthPage'));

export default function Routes() {
  return {
    element: <Layout />,
    children: [
      {
        path: Paths.Main,
        element: <MainPage />,
      },
      {
        path: Paths.Graphiql,
        element: (
          <ConditionalRoute requireAuth={true} redirectTo={Paths.Auth}>
            <GraphiqlPage />
          </ConditionalRoute>
        ),
      },
      {
        path: Paths.Auth,
        element: (
          <ConditionalRoute requireAuth={false} redirectTo={Paths.Main}>
            <AuthPage />
          </ConditionalRoute>
        ),
      },
      { path: Paths.NotFound, element: <NotFoundPage /> },
    ],
  };
}
