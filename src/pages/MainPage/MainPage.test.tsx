import { render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, Mock, vi } from 'vitest';

import '@testing-library/jest-dom';

import LangContextProvider from 'context/LangContext';
import AppThemeProvider from 'context/ThemeContext';

import MainPage from 'pages/MainPage';

vi.mock('react-firebase-hooks/auth');

describe('Tests for Auth page', () => {
  it('should correct buttons when user is not authenticated', () => {
    vi.mocked(useAuthState as Mock).mockReturnValue([true, false]);

    render(
      <MemoryRouter>
        <AppThemeProvider>
          <LangContextProvider>
            <MainPage />
          </LangContextProvider>
        </AppThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('mainpage')).toBeInTheDocument();
  });

  it('should correct buttons when user is authenticated', () => {
    vi.mocked(useAuthState as Mock).mockReturnValue([false, false]);

    render(
      <MemoryRouter>
        <AppThemeProvider>
          <LangContextProvider>
            <MainPage />
          </LangContextProvider>
        </AppThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('signin')).toBeInTheDocument();
    expect(screen.getByTestId('signup')).toBeInTheDocument();
  });

  it('should show loader while auth is being received', async () => {
    vi.mocked(useAuthState as Mock).mockReturnValue([false, true]);

    render(
      <MemoryRouter>
        <AppThemeProvider>
          <LangContextProvider>
            <MainPage />
          </LangContextProvider>
        </AppThemeProvider>
      </MemoryRouter>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
