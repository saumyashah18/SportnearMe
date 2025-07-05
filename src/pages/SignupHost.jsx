import React, { useState } from "react";
import "./SignupHost.css";

export default function SignupHost() {
  const [isFlipped, setIsFlipped] = useState(false);

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
              title: "Boost your Booking Overnight",
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

      {/* RIGHT: Signup/Signin Card */}
      <div className="w-full md:w-1/2 bg-[#1e293b] flex flex-col justify-center items-center p-8">
        <div className={`relative w-full max-w-sm h-[400px] flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-inner">

            {/* FRONT: Sign Up */}
            <div className="flip-front bg-[#0f172a] text-white p-6 rounded shadow-md">
              <div className="flex items-center justify-center mb-4">
                <img src="/images/logo.jpeg" className="w-6 h-6 mr-2" alt="Logo" />
                <h2 className="text-lg font-semibold">SportnearMe GroundUp</h2>
              </div>

              <label className="block text-sm mb-2">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your mobile no"
                className="w-full border border-slate-500 bg-transparent text-white rounded px-3 py-2 mb-4 focus:outline-blue-500"
              />

              <button className="w-full bg-blue-600 text-white rounded py-2 mb-4 hover:bg-blue-700 transition">
                Send OTP
              </button>

              <p className="text-sm text-center text-slate-400">
                Already have an account?{" "}
                <button
                  onClick={() => setIsFlipped(true)}
                  className="text-blue-400 underline"
                >
                  Sign in
                </button>
              </p>
            </div>

            {/* BACK: Sign In */}
            <div className="flip-back bg-[#0f172a] text-white p-6 rounded shadow-md">
              <div className="flex items-center justify-center mb-4">
                <img src="/images/logo.jpeg" className="w-6 h-6 mr-2" alt="Logo" />
                <h2 className="text-lg font-semibold">DO IT YOURSELF</h2>
              </div>

              <label className="block text-sm mb-2">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter mobile no"
                className="w-full border border-slate-500 bg-transparent text-white rounded px-3 py-2 mb-3"
              />

              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full border border-slate-500 bg-transparent text-white rounded px-3 py-2 mb-2"
              />

              <div className="text-right text-sm mb-4">
                <a href="#" className="text-blue-400">Forgot password?</a>
              </div>

              <button
                onClick={() => window.location.href = "/account_setup_host"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mb-4"
              >
                Proceed
              </button>

              <p className="text-sm text-center text-slate-400">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsFlipped(false)}
                  className="text-blue-400 underline"
                >
                  Sign up
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
