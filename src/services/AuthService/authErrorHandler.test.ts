import { FirebaseError } from 'firebase/app';
import { describe, expect, it, vi } from 'vitest';

import displayNotification from 'utils/displayNotification';

import authErrorHandler, { knownFirebaseErrors } from './authErrorHandler';

vi.mock('utils/displayNotification', () => ({
  default: vi.fn(),
}));

describe('authErrorHandler', () => {
  it('handles FirebaseError with known error code', () => {
    const error = new FirebaseError(knownFirebaseErrors[0], '');

    authErrorHandler(
      error,
      vi.fn(
        () =>
          "Invalid credentials. If you don't have an account, please sign up"
      )
    );

    expect(displayNotification).toHaveBeenCalledWith(
      "Invalid credentials. If you don't have an account, please sign up",
      'error'
    );
  });

  it('handles FirebaseError with unknown error code', () => {
    const errorCode = 'auth/unknown-error';
    const error = new FirebaseError(errorCode, '');

    authErrorHandler(
      error,
      vi.fn(() => 'auth/unknown-error')
    );

    expect(displayNotification).toHaveBeenCalledWith(errorCode, 'error');
  });

  it('handles non-FirebaseError', () => {
    const error = new Error('Non firebase error');

    authErrorHandler(
      error,
      vi.fn(() => 'Unknown error')
    );

    expect(displayNotification).toHaveBeenCalledWith('Unknown error', 'error');
  });
});
