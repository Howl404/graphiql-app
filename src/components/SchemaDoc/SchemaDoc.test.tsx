import { DEFAULT_API } from 'constants/api';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import schema from 'src/mocks/schema';
import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { SchemaRoot } from 'src/types';

import LangContextProvider from 'context/LangContext';
import AppThemeProvider from 'context/ThemeContext';

import useSchema from 'hooks/useSchema';

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
    render(
      <LangContextProvider>
        <SchemaDoc api={DEFAULT_API} isDocsOpen={true} />
      </LangContextProvider>
    );

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

    render(
      <LangContextProvider>
        <SchemaDoc api={DEFAULT_API} isDocsOpen={true} />
      </LangContextProvider>
    );

    await waitFor(() => {
      const error = screen.getByText('Sorry, something went wrong...');

      expect(error).toBeInTheDocument();
    });
  });

  it('should render root types', async () => {
    vi.mocked(useSchema).mockReturnValue({
      schema: schema as unknown as SchemaRoot,
      error: false,
      isLoading: false,
    });
    render(
      <AppThemeProvider>
        <LangContextProvider>
          <SchemaDoc api={DEFAULT_API} isDocsOpen={true} />
        </LangContextProvider>
      </AppThemeProvider>
    );

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
    render(
      <AppThemeProvider>
        <LangContextProvider>
          <SchemaDoc api={DEFAULT_API} isDocsOpen={true} />
        </LangContextProvider>
      </AppThemeProvider>
    );

    const query = screen.getByText('Query');
    fireEvent.click(query);

    await waitFor(() => {
      const capsule = screen.queryByText('Capsule');
      expect(capsule).toBeInTheDocument();
    });
  });
});
