import { describe, expect, it } from 'vitest';

import { AuthFormInputs } from 'src/types';

import confirmPasswordValidation from './confirmPasswordValidation';

const mockTranslation = (key: string) => {
  const translations: Record<string, string> = {
    'AuthPage.passwordDontMatch': 'Passwords do not match',
  };
  return translations[key];
};

describe('confirmPasswordValidation util test', () => {
  it('should confirm that passwords match', () => {
    expect(
      confirmPasswordValidation(
        'a',
        { password: 'b' } as AuthFormInputs,
        mockTranslation
      )
    ).toBe('Passwords do not match');

    expect(
      confirmPasswordValidation(
        'a',
        { password: 'a' } as AuthFormInputs,
        mockTranslation
      )
    ).toBeTruthy();
  });
});
