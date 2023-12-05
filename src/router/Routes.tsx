import { Paths } from 'src/enums';
import { auth } from 'src/firebase';

import Layout from 'components/Layout';

import ConditionalRoute from './ConditionalRoute';

export default function Routes() {
  return {
    element: <Layout />,
    children: [
      { path: Paths.Main, element: <h1>MAIN PAGE</h1> },
      {
        path: Paths.Editor,
        element: (
          <ConditionalRoute predicate={!!auth.currentUser} path="/auth">
            <h1>Editor</h1>
          </ConditionalRoute>
        ),
      },
      {
        path: Paths.Auth,
        element: (
          <ConditionalRoute predicate={!auth.currentUser} path="/">
            <h1>Auth page</h1>
          </ConditionalRoute>
        ),
      },
      { path: Paths.Other, element: <h1>404 page</h1> },
    ],
  };
}
