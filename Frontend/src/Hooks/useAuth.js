import { useState, useRef, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import { auth } from "../firebase";

export function useAuth() {
  const confirmationResultRef = useRef(null); // useRef instead of state
  const [firebaseUid, setFirebaseUid] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check JWT in localStorage and validate with backend on first load
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("http://localhost:5001/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            setIsLoggedIn(true);
            console.log("✅ Session restored, user fetched:", data.user);
          } else {
            console.log("⚠️ Token invalid or expired, logging out.");
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUser(null);
          }
        } catch (err) {
          console.error("❌ Error validating session:", err);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        console.log("ℹ️ No token found, user not logged in.");
      }
      setLoading(false);
    };

    checkSession();
  }, []);

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
    console.error("OTP send error:", err);
    return { success: false, error: err.message };
  }
};

const verifyOtp = async (otp) => {
  try {
    if (!confirmationResultRef.current) {
      throw new Error("OTP confirmation result is not available.");
    }

    const result = await confirmationResultRef.current.confirm(otp);
    const user = result.user;

    if (user?.uid) {
      setFirebaseUid(user.uid);
      console.log("✅ OTP verified:", user.uid);
      return user; // ✅ return full user object
    } else {
      throw new Error("User UID not found after OTP verification.");
    }
  } catch (err) {
    console.error("❌ OTP verification failed:", err);
    return null;
  }
};

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setFirebaseUid(null);
      setUser(null);
      setIsLoggedIn(false);
      console.log("✅ Logged out successfully.");
    } catch (err) {
      console.error("❌ Logout error:", err);
    }
  };

  return {
    sendOtp,
    verifyOtp,
    logout,
    firebaseUid,
    isLoggedIn,
    user,
    loading,
    setUser,        // expose for post-login profile updates
    setIsLoggedIn,  // expose for direct login state updates after login
  };
}
