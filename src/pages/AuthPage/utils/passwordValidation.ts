import { TranslationKeys } from 'hooks/useTranslation';

export default function passwordValidation(
  password: string,
  translation: (key: TranslationKeys) => string
) {
  switch (true) {
    case !/\p{Lu}/u.test(password):
      return translation('AuthPage.passwordUpperLetter');
    case !/\p{Ll}/u.test(password):
      return translation('AuthPage.passwordLowerLetter');
    case !/\p{N}/u.test(password):
      return translation('AuthPage.passwordOneNumber');
    case !/["#$%&'()*+,-./:;<=>!?@[\]^_`{|}~]/u.test(password):
      return translation('AuthPage.passwordSpecialCharacter');
    case password.length < 8:
      return translation('AuthPage.passwordEightCharacters');
    default:
      return true;
  }
}
