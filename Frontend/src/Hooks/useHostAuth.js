import { useState, useRef, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import { auth } from "../firebase";

export function useHostAuth() {
  const confirmationResultRef = useRef(null);
  const [firebaseUid, setFirebaseUid] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("hostToken");
      if (token) {
        try {
          const res = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/owner/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("hostToken");
            setIsLoggedIn(false);
            setUser(null);
          }
        } catch (err) {
          localStorage.removeItem("hostToken");
          setIsLoggedIn(false);
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const sendOtp = async (phone) => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const confirmation = await signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier);
      confirmationResultRef.current = confirmation;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const result = await confirmationResultRef.current.confirm(otp);
      const user = result.user;
      setFirebaseUid(user.uid);
      return user;
    } catch (err) {
      return null;
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("hostToken");
    setUser(null);
    setIsLoggedIn(false);
    setFirebaseUid(null);
  };

  return {
    sendOtp,
    verifyOtp,
    logout,
    firebaseUid,
    isLoggedIn,
    user,
    loading,
    setUser,
    setIsLoggedIn,
  };
}

export default useHostAuth;