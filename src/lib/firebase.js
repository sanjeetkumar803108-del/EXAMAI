import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0416312455",
  appId: "1:702005695603:web:e1f151e1196c3fdba8c606",
  apiKey: "AIzaSyCWv7U_z8RWYB1pG5oveK9lP1bKCcmu4Ks",
  authDomain: "gen-lang-client-0416312455.firebaseapp.com",
  storageBucket: "gen-lang-client-0416312455.firebasestorage.app",
  messagingSenderId: "702005695603",
  measurementId: ""
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
