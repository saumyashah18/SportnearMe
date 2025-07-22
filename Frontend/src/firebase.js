import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVin4GTUZfWQQgW-h-nUZynLRnbdy99lI",
  authDomain: "sportnearme-44204.firebaseapp.com",
  databaseURL: "https://sportnearme-44204-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sportnearme-44204",
  storageBucket: "sportnearme-44204.firebasestorage.app",
  messagingSenderId: "872064899072",
  appId: "1:872064899072:web:090b02e8fe4556b23ea0e5",
  measurementId: "G-9WCD95HYV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
