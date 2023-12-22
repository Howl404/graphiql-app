import Paths from 'enums/paths';

import AuthForm from 'components/AuthForm';
import Layout from 'components/Layout';

import GraphiqlPage from 'pages/GraphiqlPage';
import MainPage from 'pages/MainPage';
import NotFoundPage from 'pages/NotFoundPage';

import ConditionalRoute from './ConditionalRoute';

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
