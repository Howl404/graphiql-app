import { describe, expect, it, vi } from 'vitest';

import displayNotification from 'utils/displayNotification';
import fetchQuery from 'utils/fetchQuery.ts';

vi.mock('utils/displayNotification', () => ({
  default: vi.fn(),
}));

describe('fetchQuery', () => {
  it('should successfully fetch data from API with valid parameters', async () => {
    const mockResponse = { data: 'mock data' };
    const mockFetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });
    global.fetch = mockFetch;

    const api = 'https://example.com/api';
    const headers = { Authorization: 'Bearer token' };
    const query = 'query { ... }';

    const result = await fetchQuery({ api, headers, query });

    expect(mockFetch).toHaveBeenCalledWith(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: query,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should display an error notification when fetch fails', async () => {
    const mockError = new Error('Network error');
    global.fetch = vi.fn().mockRejectedValue(mockError);

    const api = 'https://example.com/api';
    const headers = { Authorization: 'Bearer token' };
    const query = 'query { ... }';

    await fetchQuery({ api, headers, query });

    expect(displayNotification).toHaveBeenCalledWith(
      mockError.message,
      'error'
    );
  });
});
