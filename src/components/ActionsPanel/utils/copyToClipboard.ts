import displayNotification from 'utils/displayNotification';

import { TranslationKeys } from 'hooks/useTranslation.ts';

export default async function copyToClipboard(
  value: string,
  translation: (key: TranslationKeys) => string
) {
  try {
    await navigator.clipboard.writeText(value);
    displayNotification(translation('MainPage.copySuccess'), 'success');
  } catch {
    displayNotification(translation('MainPage.copyError'), 'error');
  }
}
