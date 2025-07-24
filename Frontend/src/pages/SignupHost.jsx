// src/pages/owner/SignupHost.jsx

import React, { useState, useRef } from "react";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignupHost.css"; // your flip animation



export default function SignupHost() {
  const { sendOtp, verifyOtp } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();



  const handleSendOtp = async () => {
    setError("");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    try {
      setIsLoading(true);
      const result = await sendOtp(phone);
      setConfirmationResult(result);
      setIsFlipped(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    const combinedOtp = otpDigits.join("");
    if (!/^\d{6}$/.test(combinedOtp)) {
      setError("Enter a valid 6-digit OTP.");
      return;
    }
    try {
  setIsLoading(true);

 const res = await axios.post("http://localhost:5001/api/owner/auth/check-owner", { phone });


  if (res.data.exists) {
    navigate("/turfownerdashboard");
  } else {
    navigate("/account_setup_host");
  }
} catch (err) {
  console.error(err);
  setError("OTP verification failed. Please try again.");
} finally {
  setIsLoading(false);
}
};


  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-slate-200">
      {/* LEFT: Benefits */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-white">
          Benefits of listing your ground with SportnearMe
        </h1>
        <div className="space-y-6">
          {[
            {
              img: "/images/qr.svg",
              title: "Quick Registration",
              desc: "Set up your turf in minutes with just your contact and location info.",
            },
            {
              img: "/images/fast.svg",
              title: "Boost Your Booking Overnight",
              desc: "Start receiving slot bookings within 24 hours.",
            },
            {
              img: "/images/moniter.svg",
              title: "Track Revenue & Usage",
              desc: "Real-time insights on earnings and active player slots.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <img src={item.img} alt={item.title} className="w-8 h-8" />
              <div>
                <h2 className="font-semibold text-lg text-white">{item.title}</h2>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Flip Card */}
      <div className="w-full md:w-1/2 bg-[#1e293b] flex flex-col justify-center items-center p-8">
        <div className={`relative w-full max-w-sm h-[400px] flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-inner">

            {/* FRONT: Phone Number Entry */}
            <div className="flip-front bg-[#0f172a] text-white p-6 rounded shadow-md">
              <div className="flex items-center justify-center mb-4">
                <img src="/images/logo.jpeg" className="w-6 h-6 mr-2" alt="Logo" />
                <h2 className="text-lg font-semibold">SportnearMe GroundUp</h2>
              </div >
              <label className="block text-center mb-2">Mobile Number</label>
              <div className="border border-gray-600 px-3 py-2 rounded flex items-center gap-2 bg-gray-900">
                 🇮🇳 +91
              <input
                type="tel"
                placeholder="Enter your mobile no"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-500 bg-transparent text-white rounded px-3 py-2 focus:outline-blue-500"
              />
              </div>
              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mt-4 transition"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
              {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
              <div id="recaptcha-container"></div>
            </div>

            {/* BACK: OTP Verification with 6 Boxes */}
            <div className="flip-back bg-[#0f172a] text-white p-6 rounded shadow-md">
              <div className="flex items-center justify-center mb-4">
                <img src="/images/logo.jpeg" className="w-6 h-6 mr-2" alt="Logo" />
                <h2 className="text-lg font-semibold">Verify OTP</h2>
              </div>
              <label className="block text-sm mb-2 text-center">Enter 6-digit OTP</label>
              <div className="flex justify-center gap-2 mb-4">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(el) => (inputsRef.current[idx] = el)}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      if (val) {
                        const newOtp = [...otpDigits];
                        newOtp[idx] = val;
                        setOtpDigits(newOtp);
                        if (idx < 5) {
                          inputsRef.current[idx + 1]?.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
                        inputsRef.current[idx - 1]?.focus();
                      }
                    }}
                    className="w-10 h-12 text-center text-lg border border-slate-500 bg-transparent text-white rounded focus:outline-blue-500"
                  />
                ))}
              </div>
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mb-4 transition"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
              {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
              <p className="text-sm text-center text-slate-400">
                Entered wrong number?{" "}
                <button onClick={() => setIsFlipped(false)} className="text-blue-400 underline">
                  Go Back
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
