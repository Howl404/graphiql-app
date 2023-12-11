import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LangContextProvider from 'src/context/LangContext';
import { beforeEach, describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import Header from '.';

describe('Header', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LangContextProvider>
          <Header />
        </LangContextProvider>
      </BrowserRouter>
    );
  });

  it('should contain specific content', () => {
    const logo = screen.getByTestId('logo');
    const toggleEn = screen.getByTestId('EN');
    const toggleRu = screen.getByTestId('RU');
    const authBtn = screen.getByTestId('sign-in-btn');

    expect(logo).toBeInTheDocument();
    expect(toggleEn).toBeInTheDocument();
    expect(toggleRu).toBeInTheDocument();
    expect(authBtn).toBeInTheDocument();
  });

  it('should change localStorage value of language after click', () => {
    const toggleEn = screen.getByTestId('EN');
    const toggleRu = screen.getByTestId('RU');

    fireEvent.click(toggleRu);
    expect(localStorage.getItem('lang')).toBe('RU');

    fireEvent.click(toggleEn);
    expect(localStorage.getItem('lang')).toBe('EN');
  });

  it('should navigate to auth and main page', async () => {
    const logo = screen.getByTestId('logo');
    const authBtn = screen.getByTestId('sign-in-btn');

    fireEvent.click(authBtn);
    await waitFor(() => expect(window.location.href).toContain('/auth'));
    fireEvent.click(logo);
    await waitFor(() => expect(window.location.href).not.toContain('/auth'));
  });
});
