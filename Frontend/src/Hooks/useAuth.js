// src/Hooks/useAuth.js

import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import { auth } from "../firebase";

export function useAuth() {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [firebaseUid, setFirebaseUid] = useState(null);

  const sendOtp = async (phone) => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          'size': 'invisible',
          'callback': (response) => {
            console.log("Recaptcha solved:", response);
          },
          'expired-callback': () => {
            console.log("Recaptcha expired");
          }
        });
      } catch (err) {
        console.error("Recaptcha init error:", err);
        return { success: false, error: err.message };
      }
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      console.log("OTP sent successfully via Firebase.");
      return { success: true };
    } catch (err) {
      console.error("sendOtp error:", err);
      return { success: false, error: err.message };
    }
  };

const verifyOtp = async (otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    setFirebaseUid(result.user.uid);
    console.log("✅ OTP verified:", result.user.uid);
    return result.user.uid; // return it explicitly
  } catch (err) {
    console.error("❌ OTP verification failed:", err);
    return null;
  }
};


  const logout = async () => {
    await signOut(auth);
    setFirebaseUid(null);
    console.log("Logged out successfully.");
  };

  return { sendOtp, verifyOtp, logout, firebaseUid };

  
}
