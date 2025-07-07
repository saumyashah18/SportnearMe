import React, { useState, useRef } from "react";
import sportsData from "../data/sportsData"; // Create if not already

export default function AuthModal({ isOpen, onClose, setIsLoggedIn }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [gmail, setGmail] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  const handleSendOtp = () => {
    if (/^\d{10}$/.test(phone)) {
      setStep("otp");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value;
    setOtpDigits(updatedOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleVerifyOtp = () => {
    if (otpDigits.every((digit) => digit !== "")) {
      setStep("name");
    }
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

  const handleComplete = () => {
    const profileData = {
      firstName,
      lastName,
      gender,
      gmail,
      phone,
      selectedSports,
      profileImage: profileImage ? URL.createObjectURL(profileImage) : null,
    };
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    setIsLoggedIn(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur flex items-center justify-center">
      <div className="bg-[#111827] text-white max-w-md w-full p-6 rounded-lg shadow-xl transition-all">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 text-2xl hover:text-white"
        >
          &times;
        </button>

        {/* Phone Input */}
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

        {/* OTP Verification */}
        {step === "otp" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">Verify OTP</h2>
            <div className="flex justify-center gap-3 mb-4">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg border border-gray-600 rounded bg-gray-900 focus:outline-none focus:border-blue-500"
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

        {/* Name and Last Name */}
        {step === "name" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">
              Enter Your Name
            </h2>
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

        {/* Gender */}
        {step === "gender" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">
              Select Gender
            </h2>
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

        {/* Gmail */}
        {step === "gmail" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">
              Enter Your Gmail
            </h2>
            <input
              type="email"
              placeholder="you@gmail.com"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              className="w-full mb-3 px-3 py-2 rounded bg-gray-900 border border-gray-600 focus:outline-none"
            />
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

        {/* Sports Selection */}
        {step === "sports" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">
              Select Sports You Like
            </h2>
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto mb-3">
              {sportsData.map((sport) => (
                <div
                  key={sport.name}
                  className={`cursor-pointer border rounded p-2 flex flex-col items-center text-xs ${
                    selectedSports.includes(sport.name)
                      ? "border-blue-500 bg-blue-900"
                      : "border-gray-600"
                  }`}
                  onClick={() => toggleSport(sport.name)}
                >
                  <img
                    src={sport.img}
                    alt={sport.name}
                    className="w-12 h-12 object-cover mb-1 rounded"
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

        {/* Profile Image */}
        {step === "image" && (
          <>
            <h2 className="text-center text-xl font-semibold mb-4">
              Upload Profile Image
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full mb-4 text-sm text-gray-300"
            />
            <button
              onClick={handleComplete}
              className="w-full py-2 rounded bg-green-600 hover:bg-green-500"
            >
              Finish & Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}
