import displayNotification from 'utils/displayNotification';

export default function safeJsonParse(
  str: string,
  errorMessage: string,
  fallbackObject = {}
) {
  if (str === '') return fallbackObject;

  try {
    return JSON.parse(str) as object;
  } catch (e) {
    displayNotification(errorMessage, 'error');

    return fallbackObject;
  }
}
