import { FirebaseError } from 'firebase/app';
import { describe, expect, it, vi } from 'vitest';

import displayNotification from 'utils/displayNotification';

import authErrorHandler, { firebaseErrors } from './authErrorHandler';

vi.mock('utils/displayNotification', () => ({
  default: vi.fn(),
}));

describe('authErrorHandler', () => {
  it('handles FirebaseError with known error code', () => {
    const firstErrorCode = Object.keys(firebaseErrors)[0];
    const expectedMessage = firebaseErrors[firstErrorCode];
    const error = new FirebaseError(firstErrorCode, '');

    authErrorHandler(error);

    expect(displayNotification).toHaveBeenCalledWith(expectedMessage, 'error');
  });

  it('handles FirebaseError with unknown error code', () => {
    const errorCode = 'auth/unknown-error';
    const error = new FirebaseError(errorCode, '');

    authErrorHandler(error);

    expect(displayNotification).toHaveBeenCalledWith(errorCode, 'error');
  });

  it('handles non-FirebaseError', () => {
    const error = new Error('Non firebase error');

    authErrorHandler(error);

    expect(displayNotification).toHaveBeenCalledWith('Unknown error', 'error');
  });
});
