// Firebase setup — REAL Google Sign-In for firebird.
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyApaC0f9xsD4Tsb7wFBMMNylbK3ORW8HtI',
  authDomain: 'fire-bird-25733.firebaseapp.com',
  projectId: 'fire-bird-25733',
  storageBucket: 'fire-bird-25733.firebasestorage.app',
  messagingSenderId: '675173368434',
  appId: '1:675173368434:web:b94d30ccdeab3af9dbf8eb',
  measurementId: 'G-J0BL28NWTE',
};

export const app = initializeApp(firebaseConfig);

// Analytics is optional and can throw in some environments — never let it
// break the site.
isSupported()
  .then((ok) => { if (ok) getAnalytics(app); })
  .catch(() => {});

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
