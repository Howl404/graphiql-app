import Toastify from 'toastify-js';

import './displayNotification.scss';

export default function displayNotification(
  text: string,
  type: 'info' | 'success' | 'error',
  duration = 5000,
  onClick?: () => void
) {
  Toastify({
    text,
    duration,
    close: true,
    gravity: 'top',
    position: 'center',
    stopOnFocus: true,
    onClick,
    className: `toastify-${type}`,
  }).showToast();
}
