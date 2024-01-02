import { describe, expect, it, vi } from 'vitest';

import displayNotification from 'utils/displayNotification';

import safeJsonParse from './safeJsonParse';

vi.mock('utils/displayNotification', () => ({
  default: vi.fn(),
}));

describe('safeJsonParse', () => {
  it('should return the parsed JSON object when given a valid JSON string', () => {
    const string = '{"name": "John", "age": 30}';
    const errorMessage = 'Error parsing JSON';

    const result = safeJsonParse(string, errorMessage);

    expect(result).toEqual({ name: 'John', age: 30 });
  });

  it('should return an empty object when given an empty string', () => {
    const string = '';
    const errorMessage = 'Error parsing JSON';

    const result = safeJsonParse(string, errorMessage);

    expect(result).toEqual({});
  });

  it('should display an error notification and return the fallback object when an error occurs during JSON parsing', () => {
    const string = '{invalid json}';
    const errorMessage = 'Error parsing JSON';

    const result = safeJsonParse(string, errorMessage);

    expect(displayNotification).toHaveBeenCalledWith(errorMessage, 'error');
    expect(result).toEqual({});
  });
});
