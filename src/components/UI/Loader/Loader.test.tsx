import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import Loader from './index';

describe('Loader', () => {
  it('should contain specific content', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
