import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import LangContextProvider from 'src/context/LangContext.tsx';
import Routes from 'src/router/Routes.tsx';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';

import { NOT_FOUND_TEXT } from 'pages/NotFoundPage';

describe('Not Found page', () => {
  it('Renders Not Found on bad route', () => {
    const router = createMemoryRouter([Routes()], {
      initialEntries: ['/bad-route'],
    });

    render(
      <LangContextProvider>
        <RouterProvider router={router} />
      </LangContextProvider>
    );

    const notFoundText = screen.getByTestId('not-found-text');

    expect(notFoundText).toBeInTheDocument();
    expect(notFoundText.textContent).toBe(NOT_FOUND_TEXT);
  });
});
