import { lazy } from 'react';

import Paths from 'enums/paths';

import Layout from 'components/Layout';

import NotFoundPage from 'pages/NotFoundPage';
import WelcomePage from 'pages/WelcomePage';

import ConditionalRoute from './ConditionalRoute';

const MainPage = lazy(() => import('pages/MainPage'));
const AuthPage = lazy(() => import('pages/AuthPage'));

export default function Routes() {
  return {
    element: <Layout />,
    children: [
      {
        path: Paths.Welcome,
        element: <WelcomePage />,
      },
      {
        path: Paths.Main,
        element: (
          <ConditionalRoute requireAuth redirectTo={Paths.Auth}>
            <MainPage />
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
