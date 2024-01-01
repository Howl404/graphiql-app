import { lazy } from 'react';

import Paths from 'enums/paths';

import AuthForm from 'components/AuthForm';
import Layout from 'components/Layout';

import ConditionalRoute from './ConditionalRoute';

const GraphiqlPage = lazy(() => import('pages/GraphiqlPage'));
const MainPage = lazy(() => import('pages/MainPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

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
            <AuthForm />
          </ConditionalRoute>
        ),
      },
      { path: Paths.NotFound, element: <NotFoundPage /> },
    ],
  };
}
