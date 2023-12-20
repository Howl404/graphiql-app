import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import useSchema from 'src/hooks/useSchema';
import schema from 'src/mocks/schema';
import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { SchemaRoot } from 'src/types';

import SchemaDoc from './index';

vi.mock('hooks/useSchema', () => ({
  default: vi.fn(),
}));

describe('Tests for SchemaDoc component', () => {
  it('should show preloader while fetching schema', async () => {
    vi.mocked(useSchema).mockReturnValue({
      isLoading: true,
      schema: null,
      error: false,
    });
    render(<SchemaDoc />);

    await waitFor(() => {
      const loader = screen.getByTestId('loader');

      expect(loader).toBeInTheDocument();
    });
  });

  it('should show error if fetching schema fails', async () => {
    vi.mocked(useSchema).mockReturnValue({
      error: true,
      isLoading: false,
      schema: null,
    });

    render(<SchemaDoc />);

    await waitFor(() => {
      const error = screen.getByText('Unexpected error occurred');

      expect(error).toBeInTheDocument();
    });
  });

  it('should render root types', async () => {
    vi.mocked(useSchema).mockReturnValue({
      schema: schema as unknown as SchemaRoot,
      error: false,
      isLoading: false,
    });
    render(<SchemaDoc />);

    await waitFor(() => {
      const query = screen.getByText('Query');
      const mutation = screen.getByText('Mutation');
      const subscription = screen.getByText('Subscription');

      expect(query).toBeInTheDocument();
      expect(mutation).toBeInTheDocument();
      expect(subscription).toBeInTheDocument();
    });
  });

  it('should render inner types on root field click', async () => {
    vi.mocked(useSchema).mockReturnValue({
      schema: schema as unknown as SchemaRoot,
      error: false,
      isLoading: false,
    });
    render(<SchemaDoc />);

    const query = screen.getByText('Query');
    fireEvent.click(query);

    await waitFor(() => {
      const capsule = screen.queryByText('Capsule');
      expect(capsule).toBeInTheDocument();
    });
  });
});
