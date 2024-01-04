import { DEFAULT_API } from 'constants/api.ts';

import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useSchema, * as schemaHookModule from './useSchema';

describe('useSchema', () => {
  it('fetches and caches data when not cached', async () => {
    const { result } = renderHook(() => useSchema());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(schemaHookModule.cache[DEFAULT_API]).toEqual(result.current.schema);
  });
});
