import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  projectId: "exam-ai-3ccaf",
  appId: "1:802327046069:android:9551e653e34fb964e39bfc",
  apiKey: "AIzaSyCAjPAyF4G6lFE-Q5rQ4zLjt9BDroJ1zwM",
  authDomain: "exam-ai-3ccaf.firebaseapp.com",
  storageBucket: "exam-ai-3ccaf.firebasestorage.app",
  messagingSenderId: "802327046069",
  measurementId: ""
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
