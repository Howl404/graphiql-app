import { AuthFormInputs } from 'src/types';

import { TranslationKeys } from 'hooks/useTranslation';

export default function confirmPasswordValidation(
  confirmPassword: string | undefined,
  { password }: AuthFormInputs,
  translation: (key: TranslationKeys) => string
): boolean | string {
  return (
    password === confirmPassword || translation('AuthPage.passwordDontMatch')
  );
}
