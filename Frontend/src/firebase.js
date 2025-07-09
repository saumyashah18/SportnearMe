// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVin4GTUZfWQQgW-h-nUZynLRnbdy99lI",
  authDomain: "sportnearme-44204.firebaseapp.com",
  projectId: "sportnearme-44204",
  storageBucket: "sportnearme-44204.firebasestorage.app",
  messagingSenderId: "872064899072",
  appId: "1:872064899072:web:090b02e8fe4556b23ea0e5",
  measurementId: "G-9WCD95HYV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


export { auth, RecaptchaVerifier, signInWithPhoneNumber, signOut };
