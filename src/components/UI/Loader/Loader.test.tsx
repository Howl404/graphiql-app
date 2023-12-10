import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import '@testing-library/jest-dom';
import Loader from './index';

it('Footer should contain specific content', () => {
  render(<Loader />);

  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();
});
