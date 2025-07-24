import { useState, useRef } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import { auth } from "../firebase";

export function useAuth() {
  const confirmationResultRef = useRef(null); // useRef instead of state
  const [firebaseUid, setFirebaseUid] = useState(null);

  const sendOtp = async (phone) => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha solved:", response);
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
          },
        });
      } catch (err) {
        console.error("Recaptcha init error:", err);
        return { success: false, error: err.message };
      }
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier);
      confirmationResultRef.current = confirmation; // store in ref
      console.log("OTP sent successfully via Firebase.");
      return { success: true };
    } catch (err) {
      console.error("sendOtp error:", err);
      return { success: false, error: err.message };
    }
  };

  const verifyOtp = async (otp) => {
    try {
      if (!confirmationResultRef.current) {
        throw new Error("OTP confirmation result is not available.");
      }

      const result = await confirmationResultRef.current.confirm(otp);
      const uid = result.user?.uid;

      if (uid) {
        setFirebaseUid(uid);
        console.log("✅ OTP verified:", uid);
        return uid;
      } else {
        throw new Error("User UID not found after OTP verification.");
      }
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
