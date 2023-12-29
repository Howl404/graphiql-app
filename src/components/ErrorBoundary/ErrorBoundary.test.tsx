import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { expect, it } from 'vitest';

import '@testing-library/jest-dom';

import ErrorBoundary from './index';

function TestComponent() {
  const [error, setError] = useState(false);

  const throwError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('This is a test error');
  }
  return (
    <button onClick={throwError} data-testid="error-button" type="button">
      Throw Error
    </button>
  );
}

it('Error boundary catches error', async () => {
  render(
    <ErrorBoundary>
      <TestComponent />
    </ErrorBoundary>
  );

  const errorButton = screen.getByTestId('error-button');

  fireEvent.click(errorButton);

  const textError = screen.getByText('Something went wrong');
  const resetButton = screen.getByText('Reset');

  expect(textError).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();

  fireEvent.click(resetButton);

  await waitFor(() => {
    const textError = screen.queryByText('Something went wrong');
    const resetButton = screen.queryByText('Reset');

    expect(textError).not.toBeInTheDocument();
    expect(resetButton).not.toBeInTheDocument();
  });
});
