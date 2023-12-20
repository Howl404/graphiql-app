import displayNotification from 'utils/displayNotification';

export default async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    displayNotification('Copied!', 'success');
  } catch {
    displayNotification('Failed to copy!', 'error');
  }
}
