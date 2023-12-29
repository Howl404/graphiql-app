import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';

import LangContextProvider from 'context/LangContext';
import AppThemeProvider from 'context/ThemeContext';

import NotFoundPage from 'pages/NotFoundPage/index';

describe('Not Found page', () => {
  it('Correctly renders Not Found Page', () => {
    render(
      <AppThemeProvider>
        <LangContextProvider>
          <NotFoundPage />
        </LangContextProvider>
      </AppThemeProvider>
    );

    const notFoundText = screen.getByTestId('not-found-text');

    expect(notFoundText).toBeInTheDocument();
    expect(notFoundText.textContent).toBe(
      'Opps.. Looks like you are lost in Space'
    );
  });
});
