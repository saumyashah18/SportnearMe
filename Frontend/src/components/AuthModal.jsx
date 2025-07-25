import React, { useState, useRef } from "react";
import sportsData from "../data/sportsData";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";
import { useEffect } from "react";
import { storage } from "../firebase";


export default function AuthModal({ isOpen, onClose, setIsLoggedIn }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [gmail, setGmail] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const {  user, logout, loading, sendOtp, verifyOtp, firebaseUid, setUser } = useAuth();


  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (/^\d{10}$/.test(phone)) {
      setIsSendingOtp(true);
      const res = await sendOtp(phone);
      setIsSendingOtp(false);
      if (res.success) setStep("otp");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value;
    setOtpDigits(updatedOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

   const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && otpDigits[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const updatedOtp = [...otpDigits];
        updatedOtp[index - 1] = "";
        setOtpDigits(updatedOtp);
      }
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpDigits.join("");
    const uid = await verifyOtp(otp);
    if (!uid) {
      alert("OTP verification failed.");
      return;
    }
    const res = await fetch("http://localhost:5001/api/users/loginOrRegister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebaseUid: uid, phone }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }
    localStorage.setItem("token", data.token);
    if (res.ok) {
  console.log("✅ Token stored in localStorage after login:", data.token);
} else {
  console.error("❌ Login failed:", data.message);
}
setUser(data.user);
console.log("✅ User logged in, token stored, user state set.");

    if (data.needsProfile) setStep("name");
    else {
      setStep("success");
    }
  };

const uploadImageAndGetURL = async () => {
  if (!profileImage) return null;
  if (typeof profileImage === "string") return profileImage;

  if (!auth.currentUser) {
    alert("You are not signed in, please complete OTP verification.");
    return null;
  }

  const fileRef = ref(storage, `profileImages/${auth.currentUser.uid}_${Date.now()}`);
  await uploadBytes(fileRef, profileImage);
  const url = await getDownloadURL(fileRef);
  console.log("✅ File uploaded successfully:", url);
  return url;
};

const handleCompleteProfile = async () => {
  const imageUrl = await uploadImageAndGetURL();

  const token = localStorage.getItem("token");
  console.log("Token before sending to /completeProfile:", token);
    if (!token) {
      console.error("❌ No token found in localStorage. User might not be logged in.");
      return;
    }

  const res = await fetch("http://localhost:5001/api/users/completeProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
      body: JSON.stringify({
        firstName,
        lastName,
        gender,
        gmail,
        phone,
        selectedSports,
        profileImageUrl: imageUrl,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Profile completion failed");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    if (imageUrl) {
  localStorage.setItem("profileImage", imageUrl);
}

  
    setStep("success");


  };

  const toggleSport = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      try {
        if (step === "phone" && /^\d{10}$/.test(phone) && !isSendingOtp) {
          handleSendOtp();
        } else if (step === "otp" && otpDigits.every((d) => d !== "")) {
          handleVerifyOtp();
        } else if (step === "name" && firstName && lastName) {
          setStep("gender");
        } else if (step === "gender" && gender) {
          setStep("gmail");
        } else if (step === "gmail" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail)) {
          setStep("sports");
        } else if (step === "sports" && selectedSports.length > 0) {
          setStep("image");
        } else if (step === "image" && profileImage) {
          handleCompleteProfile();
        }
      } catch (err) {
        console.error("Error in handleKeyDown:", err);
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [
  step,
  phone,
  isSendingOtp,
  otpDigits,
  firstName,
  lastName,
  gender,
  gmail,
  selectedSports,
  profileImage,
]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur flex items-center justify-center">
    
      <div className="bg-[#111827] text-white w-full max-w-md p-6 rounded-lg shadow-xl relative cursor-pointer">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 text-2xl hover:text-white"
        >
          &times;
        </button>

        {/* STEP: Phone */}
        {step === "phone" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-6">Get Started</h2>
            <div className="border border-gray-600 px-3 py-2 rounded flex items-center gap-2 bg-gray-900">
              🇮🇳 +91
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile number"
                maxLength={10}
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={!/^\d{10}$/.test(phone) || isSendingOtp}
              className={`mt-4 w-full py-2 rounded cursor-pointer ${
                /^\d{10}$/.test(phone) && !isSendingOtp
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-600 opacity-70"
              }`}
            >
              {isSendingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP: OTP */}
        {step === "otp" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Verify OTP</h2>
            <div className="flex justify-center gap-2 mb-4">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  maxLength={1}
                  className="w-10 h-10 text-center text-lg border border-gray-600 rounded bg-gray-900 focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={!otpDigits.every((d) => d !== "")}
              className="w-full py-2 rounded cursor-pointer bg-green-600 hover:bg-green-500"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP: Name */}
        {step === "name" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Enter Your Name</h2>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mb-3 px-3 py-2 rounded bg-gray-900 border border-gray-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mb-3 px-3 py-2 rounded bg-gray-900 border border-gray-600 focus:outline-none"
            />
            <button
              onClick={() => setStep("gender")}
              disabled={!firstName || !lastName}
              className={`w-full py-2 rounded cursor-pointer ${
                firstName && lastName
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-600 opacity-70"
              }`}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP: Gender */}
        {step === "gender" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Select Gender</h2>
            <div className="flex justify-center gap-4 mb-4">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-4 py-2 rounded border cursor-pointer ${
                    gender === g ? "bg-blue-600 border-blue-600" : "border-gray-600"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("gmail")}
              disabled={!gender}
              className={`w-full py-2 rounded cursor-pointer ${
                gender ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-600 opacity-70"
              }`}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP: Gmail */}
        {step === "gmail" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Enter Gmail</h2>
            <input
              type="email"
              placeholder="you@gmail.com"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded bg-gray-900 border border-gray-600 focus:outline-none"
            />
            <button
              onClick={() => setStep("sports")}
              disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail)}
              className={`w-full py-2 rounded cursor-pointer ${
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail)
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-600 opacity-70"
              }`}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP: Sports */}
        {step === "sports" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Pick Your Sports</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {sportsData.map((sport) => (
                <div
                  key={sport.name}
                  onClick={() => toggleSport(sport.name)}
                  className={`cursor-pointer border rounded p-1 flex flex-col items-center text-xs ${
                    selectedSports.includes(sport.name)
                      ? "border-blue-500 bg-blue-900"
                      : "border-gray-600"
                  }`}
                >
                  <img src={sport.img} alt={sport.name} className="w-12 h-12 object-cover mb-1" />
                  {sport.name}
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep("image")}
              disabled={selectedSports.length === 0}
              className={`w-full py-2 rounded cursor-pointer mt-4 ${
                selectedSports.length > 0
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-600 opacity-70"
              }`}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP: Image */}
        {step === "image" && (
          <>
            <h2 className="text-center text-2xl font-bold mb-2">Set up your profile picture</h2>
            <div className="flex justify-center mb-4">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                  />
                  <button
                    onClick={() => {
                      setProfileImage(null);
                      setPreviewImage(null);
                    }}
                    className="absolute top-0 right-0 bg-black bg-opacity-60 rounded-full p-1 text-white hover:bg-opacity-80"
                    title="Remove selection"
                  >
                    &times;
                  </button>
                </div>
              ) :  (
                <label className="w-24 h-24 rounded-full border-2 border-dashed border-gray-500 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfileImage(file);
                        setPreviewImage(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-center text-gray-400 mb-4">or choose your avatar</p>
            <div className="flex justify-center gap-3 overflow-x-auto mb-6">
              {[
                "/avatars/avatar1.png",
                "/avatars/avatar2.png",
                "/avatars/avatar3.png",
                "/avatars/avatar4.png",
                "/avatars/avatar5.png"
              ].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Avatar ${idx + 1}`}
                  onClick={() => {
                    setProfileImage(src);
                    setPreviewImage(src);
                  }}
                  className={`w-14 h-14 rounded-full cursor-pointer border-2 ${
                    profileImage === src ? "border-blue-500" : "border-transparent"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleCompleteProfile}
              disabled={!profileImage }
              className={`w-full py-2 rounded cursor-pointer ${
                profileImage ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-600 opacity-70"
              }`}
            >
              Complete Profile
            </button>
          </>
        )}

        {step === "success" && (
          <>
            <h2 className="text-center text-2xl font-bold mb-4">🎉 All Set!</h2>
           <button
  onClick={() => {
    onClose();
    window.location.href = "/";
  }}
  className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 cursor-pointer"
>
  Continue
</button>

          </>
        )}

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
