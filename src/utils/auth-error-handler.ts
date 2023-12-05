import { FirebaseError } from 'firebase/app';

const firebaseErrors: Record<string, string> = {
  'auth/invalid-credential':
    "Invalid credentials. If you don't have an account, please sign up.",
  'auth/email-already-in-use':
    "We already have account with this email. If it's yours, please sign in",
  'auth/too-many-requests': 'Too many requests. Please  try again later.',
};

export const authErrorHandler = (error: unknown) => {
  if (error instanceof FirebaseError) {
    const message = firebaseErrors[error.code];
    return { ok: false, error: message ?? error.code };
  }
  return { ok: false, error: 'Unknown error' };
};
