import { describe, it, expect } from 'vitest';

import { AuthFormInputs } from 'src/types';

import confirmPasswordValidation from './confirmPasswordValidation';

describe('confirmPasswordValidation util test', () => {
  it('should confirm that passwords match', () => {
    expect(
      confirmPasswordValidation('a', { password: 'b' } as AuthFormInputs)
    ).toBe('Passwords do not match');

    expect(
      confirmPasswordValidation('a', { password: 'a' } as AuthFormInputs)
    ).toBeTruthy();
  });
});
