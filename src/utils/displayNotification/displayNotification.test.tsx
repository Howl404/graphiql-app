import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';

import displayNotification from './index';

describe('displayNotification', () => {
  it('should display a toast on button click', async () => {
    render(
      <button onClick={() => displayNotification('Test message', 'success')}>
        Show Notification
      </button>
    );

    const button = screen.getByText('Show Notification');
    fireEvent.click(button);

    const toastNotification = document.querySelector('.toastify');
    expect(toastNotification).toBeInTheDocument();
  });
});
