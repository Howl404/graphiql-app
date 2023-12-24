import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import Loader from 'components/UI/Loader';

import Dimming from './index';

describe('Dimming', () => {
  it('should contain dimming and inner content', () => {
    render(
      <Dimming>
        <Loader />
      </Dimming>
    );

    const dimming = screen.getByTestId('dimming');
    const contentElement = screen.getByTestId('content');
    const loader = screen.getByTestId('loader');

    expect(dimming).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });
});
