import { describe, it, expect } from 'vitest';

import passwordValidation from './passwordValidation';

describe('passwordValidation util test', () => {
  it("should return true if password valid or corresponding error message if it's not", () => {
    expect(passwordValidation('a')).toBe('At least one uppercase letter');
    expect(passwordValidation('A')).toBe('At least one lowercase letter');
    expect(passwordValidation('aA')).toBe('At least one number');
    expect(passwordValidation('aA1')).toBe('At least one special character');
    expect(passwordValidation('aA1!')).toBe('At least 8 characters');
    expect(passwordValidation('aA12345678!')).toBeTruthy();
  });
});
