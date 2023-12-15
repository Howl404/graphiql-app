import displayNotification from 'src/utils/displayNotification';

export default async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    displayNotification('Copied!', 'success');
  } catch (err) {
    displayNotification('Failed to copy!', 'error');
  }
}
