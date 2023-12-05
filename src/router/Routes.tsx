import Layout from 'src/components/Layout/Layout';
import { auth } from 'src/firebase';

import ConditionalRoute from './ConditionalRoute/ConditionalRoute';

export default function Routes() {
  return {
    element: <Layout />,
    children: [
      { path: '/', element: <h1>MAIN PAGE</h1> },
      {
        path: '/editor',
        element: (
          <ConditionalRoute predicate={!!auth.currentUser} path="/auth">
            <h1>Editor</h1>
          </ConditionalRoute>
        ),
      },
      {
        path: '/auth',
        element: (
          <ConditionalRoute predicate={!auth.currentUser} path="/">
            <h1>Auth page</h1>
          </ConditionalRoute>
        ),
      },
      { path: '*', element: <h1>404 page</h1> },
    ],
  };
}
