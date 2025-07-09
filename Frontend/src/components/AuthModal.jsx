// src/components/AuthModal.jsx
import React, { useState, useRef } from "react";
import sportsData from "../data/sportsData";
import { useAuth } from "../Hooks/useAuth";

export default function AuthModal({ isOpen, onClose, setIsLoggedIn }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [gmail, setGmail] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  const { sendOtp, verifyOtp, firebaseUid } = useAuth();

  const handleSendOtp = async () => {
    if (/^\d{10}$/.test(phone)) {
      const res = await sendOtp(phone);
      console.log("OTP Send Response:", res);
      if (res.success) {
        console.log("Moving to OTP step");
        setStep("otp");
      }
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value;
    setOtpDigits(updatedOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleVerifyOtp = async () => {
    const otp = otpDigits.join("");
    if (otp.length !== 6) return;
    const success = await verifyOtp(otp);
    console.log("OTP Verification Success:", success);
    if (success) setStep("name");
  };

  const handleContinueName = () => {
    if (firstName && lastName) setStep("gender");
  };

  const handleContinueGender = () => {
    if (gender) setStep("gmail");
  };

  const handleContinueGmail = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail)) setStep("sports");
  };

  const toggleSport = (sport) => {
    setSelectedSports((prev) =>
      prev.includes(sport)
        ? prev.filter((s) => s !== sport)
        : [...prev, sport]
    );
  };

  const handleContinueSports = () => {
    if (selectedSports.length > 0) setStep("image");
  };

  const handleComplete = async () => {
    const profileData = new FormData();
    profileData.append("firebaseUid", firebaseUid);
    profileData.append("firstName", firstName);
    profileData.append("lastName", lastName);
    profileData.append("gender", gender);
    profileData.append("gmail", gmail);
    profileData.append("phone", phone);
    profileData.append("selectedSports", JSON.stringify(selectedSports));
    if (profileImage) profileData.append("profileImage", profileImage);
    
    const res = await fetch("http://localhost:5000/api/users", {
  method: "POST",
  body: profileData,
});

const data = await res.json();
console.log("✅ User created:", data);


    if (res.ok) {
      setIsLoggedIn(true);
      setStep("success");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur flex items-center justify-center">
      <div className="bg-[#111827] text-white w-full max-w-md p-6 rounded-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 text-2xl hover:text-white"
        >
          &times;
        </button>

        {/* Step: Phone */}
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
              disabled={!/^\d{10}$/.test(phone)}
              className={`mt-4 w-full py-2 rounded ${
                /^\d{10}$/.test(phone)
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Send OTP
            </button>
          </>
        )}

        {/* Step: OTP */}
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
                  maxLength={1}
                  className="w-10 h-10 text-center text-lg border border-gray-600 rounded bg-gray-900 focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={!otpDigits.every((d) => d !== "")}
              className={`w-full py-2 rounded ${
                otpDigits.every((d) => d !== "")
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Verify OTP
            </button>
          </>
        )}

        {/* Step: Name */}
        {step === "name" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Enter Your Details</h2>
            <div className="flex flex-col gap-1 mb-3">
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

            </div>
            <button
              onClick={handleContinueName}
              disabled={!firstName || !lastName}
              className={`w-full py-2 rounded ${
                firstName && lastName
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          
          </>
        )}

        {/* Step: Gender */}
        {step === "gender" && (
          <>
          <div className="flex flex-col gap-1 mb-3">
            <h2 className="text-center text-xl font-semibold mb-4">Select Gender</h2>
            <div className="flex justify-center gap-4 mb-4">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-4 py-2 rounded border ${
                    gender === g
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-600"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            </div>
            <button
              onClick={handleContinueGender}
              disabled={!gender}
              className={`w-full py-2 rounded ${
                gender
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </>
        )}

        {/* Step: Gmail */}
        {step === "gmail" && (
          <>
            <div className="flex flex-col gap-1 mb-3">
            <h2 className="text-center text-xl font-semibold mb-4">Enter Your Gmail</h2>
            <input
              type="email"
              placeholder="you@gmail.com"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded bg-gray-900 border border-gray-600 focus:outline-none"
            />

            </div>
            <button
              onClick={handleContinueGmail}
              disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail)}
              className={`w-full py-2 rounded ${
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail)
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </>
        )}

        {/* Step: Sports */}
        {step === "sports" && (
          <>
            <div className="flex flex-col gap-1 mb-3"></div>
            <h2 className="text-center text-xl font-semibold mb-4">Select Sports You Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">

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
                  <img
                    src={sport.img}
                    alt={sport.name}
                    className="w-12 h-12 object-cover rounded mb-1"
                  />
                  {sport.name}
                </div>
              ))}
            </div>
            
            <button
              onClick={handleContinueSports}
              disabled={selectedSports.length === 0}
              className={`w-full py-2 rounded ${
                selectedSports.length
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </>
        )}

        {/* Step: Image */}
        {step === "image" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Upload Profile Image</h2>
            <div className="flex flex-col gap-1 mb-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full mb-4 text-sm text-gray-300"
            />
            </div>
            <button
              onClick={handleComplete}
              className="w-full py-2 rounded bg-green-600 hover:bg-green-500"
            >
              Yay! You are all set 🎉
            </button>
          </>
        )}

        {/* Success Confirmation */}
        {step === "success" && (
          <>
            <h2 className="text-center text-2xl font-bold mb-4">🎉 Yay! You are all set up!</h2>
            <p className="text-center text-gray-300 mb-4">Start exploring and booking your favourite sports now.</p>
            <button
              onClick={onClose}
              className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500"
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
