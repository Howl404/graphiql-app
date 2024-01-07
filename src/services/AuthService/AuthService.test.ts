import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { describe, expect, it, Mock, vi } from 'vitest';

import AuthService from 'services/AuthService';
import authErrorHandler from 'services/AuthService/authErrorHandler.ts';

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(),
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  addDoc: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
}));

vi.mock('src/firebase', () => ({
  auth: 'Auth object',
  db: 'Database object',
}));

vi.mock('services/AuthService/authErrorHandler', () => ({
  default: vi.fn(),
}));

const mockTranslation = (str: string) => str;

describe('Auth Service methods successful requests returns true', () => {
  it('Should return true after successful sign in with Google', async () => {
    vi.mocked(GoogleAuthProvider).mockImplementation(
      () => ({}) as GoogleAuthProvider
    );
    vi.mocked(signInWithPopup as Mock).mockResolvedValue({
      user: { uid: '123', email: 'user@example.com' },
    });
    vi.mocked(query as Mock).mockImplementation(() => ({}));
    vi.mocked(getDocs as Mock).mockResolvedValue({ docs: [] });
    vi.mocked(addDoc as Mock).mockResolvedValue({});
    vi.mocked(collection as Mock).mockReturnValue({});

    const result = await AuthService.signInWithGoogle(vi.fn());
    expect(result).toBe(true);
  });

  it('Should return true after successful log in with email and password', async () => {
    vi.mocked(signInWithEmailAndPassword as Mock).mockImplementationOnce(() =>
      Promise.resolve({ user: { uid: '123', email: 'test@example.com' } })
    );

    const result = await AuthService.logInWithEmailAndPassword(
      'test@example.com',
      'password123',
      mockTranslation
    );
    expect(result).toBe(true);
  });

  it('Should return true after successful sign up with email and password', async () => {
    vi.mocked(createUserWithEmailAndPassword as Mock).mockImplementationOnce(
      () => Promise.resolve({ user: { uid: '123', email: 'test@example.com' } })
    );
    vi.mocked(collection as Mock).mockReturnValue({});
    vi.mocked(addDoc as Mock).mockResolvedValue({});

    const result = await AuthService.registerWithEmailAndPassword(
      'test@example.com',
      'password123',
      mockTranslation
    );
    expect(result).toBe(true);
  });

  it('Should call sign out method with auth object', async () => {
    vi.mocked(signOut as Mock).mockImplementationOnce(() =>
      Promise.resolve({ user: { uid: '123', email: 'test@example.com' } })
    );

    await AuthService.signOutUser();

    expect(signOut as Mock).toHaveBeenCalledWith('Auth object');
  });
});

describe('If something go wrong, Auth Service methods calls authErrorHandler', () => {
  it('Should call authErrorHandler after unsuccessful sign in with Google', async () => {
    vi.mocked(GoogleAuthProvider).mockImplementation(
      () => ({}) as GoogleAuthProvider
    );
    vi.mocked(signInWithPopup as Mock).mockResolvedValue({
      user: { uid: '123', email: 'user@example.com' },
    });
    vi.mocked(query as Mock).mockImplementation(() => {
      throw new Error('Google test error');
    });
    vi.mocked(getDocs as Mock).mockResolvedValue({ docs: [] });
    vi.mocked(addDoc as Mock).mockResolvedValue({});
    vi.mocked(collection as Mock).mockReturnValue({});

    await AuthService.signInWithGoogle(mockTranslation);

    expect(authErrorHandler).toHaveBeenCalled();
  });

  it('Should call authErrorHandler after unsuccessful log in', async () => {
    vi.mocked(createUserWithEmailAndPassword as Mock).mockImplementationOnce(
      () => {
        throw new Error('Test error');
      }
    );

    await AuthService.registerWithEmailAndPassword(
      'test@example.com',
      'password123',
      mockTranslation
    );

    expect(authErrorHandler).toHaveBeenCalled();
  });

  it('Should call authErrorHandler after unsuccessful log in', async () => {
    vi.mocked(signInWithEmailAndPassword as Mock).mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    await AuthService.logInWithEmailAndPassword(
      'test@example.com',
      'password123',
      mockTranslation
    );

    expect(authErrorHandler).toHaveBeenCalled();
  });
});
