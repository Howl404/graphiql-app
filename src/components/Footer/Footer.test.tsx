import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import LangContextProvider from 'context/LangContext';
import AppThemeProvider from 'context/ThemeContext';

import Layout from 'components/Layout';

import Footer from './index';

describe('Footer', () => {
  it('should contain specific content', () => {
    render(
      <AppThemeProvider>
        <Footer />
      </AppThemeProvider>
    );

    const developers = screen.getAllByTestId('developer-item');
    const year = screen.getByTestId('year');
    const rsLogo = screen.getByTestId('rs-logo');

    expect(developers.length).toBe(3);
    expect(year).toBeInTheDocument();
    expect(year.textContent).toBe(String(new Date().getFullYear()));
    expect(rsLogo).toBeInTheDocument();
  });

  it(`should change wrapper's style after click on theme icon`, () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppThemeProvider>
          <LangContextProvider>
            <Layout />
          </LangContextProvider>
        </AppThemeProvider>
      </MemoryRouter>
    );

    const theme = screen.getByTestId('theme-icon');
    const wrapper = screen.getByTestId('footer-wrapper');
    expect(
      Array.from(wrapper.classList).some((classname) =>
        classname.includes('wrapperLight')
      )
    ).toBe(true);
    fireEvent.click(theme);
    expect(
      Array.from(wrapper.classList).some((classname) =>
        classname.includes('wrapperDark')
      )
    ).toBe(true);
  });
});
