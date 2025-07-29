import { useState, useRef, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import { auth } from "../firebase";

export function useCustomerAuth() {
  const confirmationResultRef = useRef(null);
  const [firebaseUid, setFirebaseUid] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUser(null);
          }
        } catch (err) {
          localStorage.removeItem("token");
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
      const confirmationResult = await signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier);
      confirmationResultRef.current = confirmationResult; 
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const verifyOtp = async (otp) => {
  try {
    const result = await confirmationResultRef.current.confirm(otp);
    const user = result.user;
    setFirebaseUid(user.uid); // ✅ store UID in state
    return user;
  } catch (err) {
    return null;
  }
};



  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
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

export default useCustomerAuth;
