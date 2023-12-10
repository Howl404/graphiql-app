import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import '@testing-library/jest-dom';
import Footer from './index';

it('Footer should contain specific content', () => {
  render(<Footer />);

  const developers = screen.getAllByRole('listitem');
  const year = screen.getByText('2023');
  const rsLogo = screen.getByAltText('RS School');

  expect(developers.length).toBe(3);
  expect(year).toBeInTheDocument();
  expect(rsLogo).toBeInTheDocument();
});
