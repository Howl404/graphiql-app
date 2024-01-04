import { DEFAULT_API } from 'constants/api.ts';

import { renderHook } from '@testing-library/react-hooks';
import { describe, expect, it } from 'vitest';

import useSchema, * as schemaHookModule from './useSchema';

describe('useSchema', () => {
  it('fetches and caches data when not cached', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSchema());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);

    expect(schemaHookModule.cache[DEFAULT_API]).toEqual(result.current.schema);
  });
});
