import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from 'src/firebase.ts';

const PATH_TO_USERS_COLLECTION = 'users';

export class AuthService {
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
    } catch (err) {
      console.error(err);
    }
  }

  public static async logInWithEmailAndPassword(
    email: string,
    password: string
  ) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    }
  }

  public static async signOutUser() {
    await signOut(auth);
  }
}
