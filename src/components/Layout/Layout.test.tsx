import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LangContextProvider from 'src/context/LangContext';
import { expect, it } from 'vitest';

import '@testing-library/jest-dom';
import Layout from './index';

it('Layout should contain content from header and footer', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <LangContextProvider>
        <Layout />
      </LangContextProvider>
    </MemoryRouter>
  );

  screen.debug();

  const logo = screen.getByAltText('Logo');
  const toggleEn = screen.getByText('EN');
  const toggleRu = screen.getByText('RU');
  const authBtn = screen.getByText(/sign in/i);

  expect(logo).toBeInTheDocument();
  expect(toggleEn).toBeInTheDocument();
  expect(toggleRu).toBeInTheDocument();
  expect(authBtn).toBeInTheDocument();

  const developers = screen.getAllByRole('listitem');
  const year = screen.getByText('2023');
  const rsLogo = screen.getByAltText('RS School');

  expect(developers.length).toBe(3);
  expect(year).toBeInTheDocument();
  expect(rsLogo).toBeInTheDocument();
});
