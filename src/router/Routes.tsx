import Paths from 'enums/paths';

import AuthForm from 'components/AuthForm';
import Layout from 'components/Layout';
import SchemaDoc from 'components/SchemaDoc';

import NotFoundPage from 'pages/NotFoundPage';

import ConditionalRoute from './ConditionalRoute';

export default function Routes() {
  return {
    element: <Layout />,
    children: [
      {
        path: Paths.Main,
        element: <h1>MAIN PAGE</h1>,
      },
      {
        path: Paths.Editor,
        element: (
          <ConditionalRoute requireAuth={true} redirectTo={Paths.Auth}>
            <h1>Editor</h1>
            <SchemaDoc />
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
