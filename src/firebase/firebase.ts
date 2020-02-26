import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export interface IFirebase {
  loginWithEmail: Function;
  signupWithEmail: Function;
  signOut: Function;
  checkUserAuth: Function;
  createNewUser: Function;
  getNewUser: Function;
}

const Firebase = {
  // auth
  loginWithEmail: (email: string, password: string): Promise<firebase.auth.UserCredential> => firebase.auth().signInWithEmailAndPassword(email, password),

  signupWithEmail: (email: string, password: string): Promise<firebase.auth.UserCredential> => firebase.auth().createUserWithEmailAndPassword(email, password),

  signOut: (): Promise<void> => firebase.auth().signOut(),

  checkUserAuth: user => firebase.auth().onAuthStateChanged(user),

  // firestore
  createNewUser: (name: string): Promise<void> => {
    if (name.length === 0) {
      return;
    }
    return firebase
      .firestore()
      .collection('users')
      .doc(name)
      .set({ name });
  },

  getNewUser: (name: string) => {
    if (name.length === 0) {
      return;
    }
    firebase
      .firestore()
      .collection('users')
      .doc(name)
      .get();
  }
};

export default Firebase;
