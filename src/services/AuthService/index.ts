import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from 'src/firebase.ts';

import authErrorHandler from 'services/AuthService/authErrorHandler.ts';

const PATH_TO_USERS_COLLECTION = 'users';

export default class AuthService {
  public static async signInWithGoogle() {
    const googleProvider = new GoogleAuthProvider();

    try {
      const response = await signInWithPopup(auth, googleProvider);
      const user = response.user;
      const q = query(
        collection(db, PATH_TO_USERS_COLLECTION),
        where('uid', '==', user.uid)
      );

      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, PATH_TO_USERS_COLLECTION), {
          uid: user.uid,
          email: user.email,
        });
      }
      return true;
    } catch (err) {
      return authErrorHandler(err);
    }
  }

  public static async logInWithEmailAndPassword(
    email: string,
    password: string
  ) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      return authErrorHandler(err);
    }
  }

  public static async registerWithEmailAndPassword(
    email: string,
    password: string
  ) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, PATH_TO_USERS_COLLECTION), {
        uid: user.uid,
        email,
      });
      return true;
    } catch (err) {
      return authErrorHandler(err);
    }
  }

  public static async signOutUser() {
    await signOut(auth);
  }
}
