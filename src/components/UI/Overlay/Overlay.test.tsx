import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import Loader from 'components/UI/Loader';

import Overlay from './index';

describe('Overlay', () => {
  it('should contain overlay and inner content', () => {
    render(
      <Overlay>
        <Loader />
      </Overlay>
    );

    const overlay = screen.getByTestId('overlay');
    const contentElement = screen.getByTestId('content');
    const loader = screen.getByTestId('loader');

    expect(overlay).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });
});
