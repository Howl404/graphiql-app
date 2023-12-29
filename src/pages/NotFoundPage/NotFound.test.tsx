import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import LangContextProvider from 'context/LangContext.tsx';

import NotFoundPage from 'pages/NotFoundPage/index.tsx';

describe('Not Found page', () => {
  it('Correctly renders Not Found Page', () => {
    render(
      <LangContextProvider>
        <NotFoundPage />
      </LangContextProvider>
    );

    const notFoundText = screen.getByTestId('not-found-text');

    expect(notFoundText).toBeInTheDocument();
    expect(notFoundText.textContent).toBe(
      'Opps.. Looks like you are lost in Space'
    );
  });
});
