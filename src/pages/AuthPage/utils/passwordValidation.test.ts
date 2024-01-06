import { describe, expect, it } from 'vitest';

import passwordValidation from './passwordValidation';

const mockTranslation = (key: string) => {
  const translations: Record<string, string> = {
    'AuthPage.passwordUpperLetter': 'At least one uppercase letter',
    'AuthPage.passwordLowerLetter': 'At least one lowercase letter',
    'AuthPage.passwordOneNumber': 'At least one number',
    'AuthPage.passwordSpecialCharacter': 'At least one special character',
    'AuthPage.passwordEightCharacters': 'At least 8 characters',
  };
  return translations[key];
};

describe('passwordValidation util test', () => {
  it("should return true if password valid or corresponding error message if it's not", () => {
    expect(passwordValidation('a', mockTranslation)).toBe(
      'At least one uppercase letter'
    );
    expect(passwordValidation('A', mockTranslation)).toBe(
      'At least one lowercase letter'
    );
    expect(passwordValidation('aA', mockTranslation)).toBe(
      'At least one number'
    );
    expect(passwordValidation('aA1', mockTranslation)).toBe(
      'At least one special character'
    );
    expect(passwordValidation('aA1!', mockTranslation)).toBe(
      'At least 8 characters'
    );
    expect(passwordValidation('aA12345678!', mockTranslation)).toBeTruthy();
  });
});
