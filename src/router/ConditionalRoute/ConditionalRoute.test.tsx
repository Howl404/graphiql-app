import { act, render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, Mock, vi } from 'vitest';

import Paths from 'enums/paths';

import '@testing-library/jest-dom';
import ConditionalRoute from './index';

vi.mock('react-firebase-hooks/auth');

describe('ConditionalRoute', () => {
  it('should redirect from private page to auth path if user was not authorized', async () => {
    vi.mocked(useAuthState as Mock).mockReturnValue([null, false]);

    act(() => {
      render(
        <BrowserRouter>
          <ConditionalRoute requireAuth redirectTo={Paths.Auth}>
            <h1>Editor</h1>
          </ConditionalRoute>
        </BrowserRouter>
      );
    });

    expect(window.location.href).toContain(Paths.Auth);
  });

  it('should redirect from auth page to main path if user was authorized', async () => {
    vi.mocked(useAuthState as Mock).mockReturnValue([true, false]);

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

  it('should show loader while auth is being received', async () => {
    vi.mocked(useAuthState as Mock).mockReturnValue([false, true]);

    render(
      <BrowserRouter>
        <ConditionalRoute requireAuth={false} redirectTo={Paths.Main}>
          <h1>Auth form</h1>
        </ConditionalRoute>
      </BrowserRouter>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should return children if all checks passed', async () => {
    vi.mocked(useAuthState as Mock).mockReturnValue([true, false]);

    render(
      <BrowserRouter>
        <ConditionalRoute requireAuth redirectTo={Paths.Main}>
          <h1>Test</h1>
        </ConditionalRoute>
      </BrowserRouter>
    );

    const testText = screen.getByText('Test');
    expect(testText).toBeInTheDocument();
  });
});
