import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import LangContextProvider from 'context/LangContext';

import '@testing-library/jest-dom';
import Layout from './index';

describe('Layout', () => {
  it('should contain content from header and footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <LangContextProvider>
          <Layout />
        </LangContextProvider>
      </MemoryRouter>
    );

    const logo = screen.getByTestId('logo');
    const toggleEn = screen.getByTestId('EN');
    const toggleRu = screen.getByTestId('RU');
    const authBtn = screen.getByTestId('sign-in-btn');

    expect(logo).toBeInTheDocument();
    expect(toggleEn).toBeInTheDocument();
    expect(toggleRu).toBeInTheDocument();
    expect(authBtn).toBeInTheDocument();

    const developers = screen.getAllByTestId('developer-item');
    const year = screen.getByTestId('year');
    const rsLogo = screen.getByTestId('rs-logo');

    expect(developers.length).toBe(3);
    expect(year).toBeInTheDocument();
    expect(year.textContent).toBe(String(new Date().getFullYear()));
    expect(rsLogo).toBeInTheDocument();
  });
});
