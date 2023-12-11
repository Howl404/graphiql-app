import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Paths from 'src/enums/paths';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import ConditionalRoute from './index';

describe('ConditionalRoute', () => {
  it('should redirect from private page to auth path if user was not authorized', async () => {
    render(
      <BrowserRouter>
        <ConditionalRoute predicate={false} path={Paths.Auth}>
          <h1>Editor</h1>
        </ConditionalRoute>
      </BrowserRouter>
    );

    expect(window.location.href).toContain(Paths.Auth);
  });

  it('should redirect from auth page to main path if user was authorized', async () => {
    render(
      <BrowserRouter>
        <ConditionalRoute predicate={false} path={Paths.Main}>
          <h1>Auth form</h1>
        </ConditionalRoute>
      </BrowserRouter>
    );

    expect(window.location.href).toContain(Paths.Main);
    expect(window.location.href).not.toContain(Paths.Auth);
  });
});
