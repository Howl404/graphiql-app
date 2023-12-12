import { render } from '@testing-library/react';
import { getAuth } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, Mock, vi } from 'vitest';

import Paths from 'enums/paths';

import '@testing-library/jest-dom';
import ConditionalRoute from './index';

vi.mock('firebase/auth');

describe('ConditionalRoute', () => {
  it('should redirect from private page to auth path if user was not authorized', async () => {
    vi.mocked(getAuth as Mock).mockReturnValue({ currentUser: null });

    render(
      <BrowserRouter>
        <ConditionalRoute requireAuth={true} redirectTo={Paths.Auth}>
          <h1>Editor</h1>
        </ConditionalRoute>
      </BrowserRouter>
    );

    expect(window.location.href).toContain(Paths.Auth);
  });

  it('should redirect from auth page to main path if user was authorized', async () => {
    vi.mocked(getAuth as Mock).mockReturnValue({ currentUser: true });

    render(
      <BrowserRouter>
        <ConditionalRoute requireAuth={false} redirectTo={Paths.Main}>
          <h1>Auth form</h1>
        </ConditionalRoute>
      </BrowserRouter>
    );

    expect(window.location.href).toContain(Paths.Main);
    expect(window.location.href).not.toContain(Paths.Auth);
  });
});
