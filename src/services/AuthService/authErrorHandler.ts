import { FirebaseError } from 'firebase/app';

import displayNotification from 'utils/displayNotification';

import { TranslationKeys } from 'hooks/useTranslation';

export const knownFirebaseErrors = [
  'auth/invalid-credential',
  'auth/email-already-in-use',
  'auth/too-many-requests',
];

export default function authErrorHandler(
  error: unknown,
  translation: (key: TranslationKeys) => string
) {
  if (error instanceof FirebaseError) {
    displayNotification(
      knownFirebaseErrors.includes(error.code)
        ? translation(`AuthPage.${error.code}` as TranslationKeys)
        : error.code,
      'error'
    );

    console.log(error);
  } else {
    displayNotification(translation('AuthPage.auth/unknown'), 'error');
  }

  return false;
}
