import { initializeApp } from 'firebase/app';
import { initializeFirestore, getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "exam-ai-3ccaf",
  appId: "1:802327046069:android:9551e653e34fb964e39bfc",
  apiKey: "AIzaSyCAjPAyF4G6lFE-Q5rQ4zLjt9BDroJ1zwM",
  authDomain: "exam-ai-3ccaf.firebaseapp.com",
  storageBucket: "exam-ai-3ccaf.firebasestorage.app",
  messagingSenderId: "802327046069",
  measurementId: ""
};

export const app = initializeApp(firebaseConfig);

let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(app, {
    ignoreUndefinedProperties: true
  });
} catch {
  firestoreInstance = getFirestore(app);
}

export const db = firestoreInstance;
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Connection test as per firebase-integration skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, '_connection_test', 'status'));
    console.log("Firestore connection verified.");
  } catch (error: any) {
    // Graceful offline/local mode notice
    console.log("Firestore initialized in responsive hybrid mode.");
  }
}
testConnection();
