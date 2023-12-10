import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import Footer from './index';

describe('Footer', () => {
  it('should contain specific content', () => {
    render(<Footer />);

    const developers = screen.getAllByTestId('developer-item');
    const year = screen.getByTestId('year');
    const rsLogo = screen.getByTestId('rs-logo');

    expect(developers.length).toBe(3);
    expect(year).toBeInTheDocument();
    expect(year.textContent).toBe(String(new Date().getFullYear()));
    expect(rsLogo).toBeInTheDocument();
  });
});
