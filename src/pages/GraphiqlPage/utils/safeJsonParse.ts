import displayNotification from 'utils/displayNotification';

export default function safeJsonParse(
  str: string,
  errorMessage: string,
  fallback = {}
) {
  if (str === '') return fallback;

  try {
    return JSON.parse(str) as object;
  } catch (e) {
    displayNotification(errorMessage, 'error');

    return fallback;
  }
}
