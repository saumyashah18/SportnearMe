import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountSetupHost = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    dob: "",
    email: "",
    gender: "",
    turfName: "",
    turfAddress: "",
    turfDescription: "",
    turfLocationUrl: "",
  });

  // 🔄 Optional: prefill phone from localStorage
  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    if (storedPhone) {
      setFormData((prev) => ({ ...prev, phone: storedPhone }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const completeSetup = async () => {
    const firebaseUid = localStorage.getItem("firebaseUid");
    if (!firebaseUid) {
      alert("Authentication failed. Please login again.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/owner/profile`, {
        firebaseUid,
        ...formData,
      });

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("hostAccountSetup", "true");
        navigate("/dashboard-host");
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Error setting up profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#1f2937] text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">SportnearMe Ground Partner</h1>
        <a href="#" className="text-sm underline cursor-pointer">
          Sign Out
        </a>
      </header>

      {/* Main Setup Card */}
      <div className="max-w-5xl mx-auto my-10 bg-[#1e293b] text-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Account Setup</h2>
        <p className="text-center text-sm text-slate-300 mb-6">
          Please fill in the below details so that we can set up your account and grant you access to the Ground Owner Dashboard.
        </p>

        {/* Step Indicators */}
        <div className="flex justify-between text-sm font-semibold border-b border-slate-600 pb-2 mb-4">
          <button onClick={() => setStep(1)} className={`${step === 1 ? "text-blue-400" : "text-slate-500"} cursor-pointer`}>
            1. Owner Information
          </button>
          <button onClick={() => setStep(2)} className={`${step === 2 ? "text-blue-400" : "text-slate-500"} cursor-pointer`}>
            2. Turf Information
          </button>
          <button onClick={() => setStep(3)} className={`${step === 3 ? "text-blue-400" : "text-slate-500"} cursor-pointer`}>
            3. Finish
          </button>
        </div>

        {/* Step 1: Owner Info */}
        {step === 1 && (
          <div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Owner's Full Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent border border-slate-600 text-white p-2 rounded"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="bg-transparent border border-slate-600 text-white p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border border-slate-600 text-white p-2 rounded"
              />
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleChange}
                className="bg-transparent border border-slate-600 text-white p-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="bg-transparent border border-slate-600 text-white p-2 rounded"
              />
            </div>
            <button onClick={() => setStep(2)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Next
            </button>
          </div>
        )}

        {/* Step 2: Turf Info */}
        {step === 2 && (
          <div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="turfName"
                placeholder="Turf Name"
                value={formData.turfName}
                onChange={handleChange}
                className="bg-transparent border border-slate-600 text-white p-2 rounded"
              />
              <input
                type="text"
                name="turfAddress"
                placeholder="Turf Address"
                value={formData.turfAddress}
                onChange={handleChange}
                className="bg-transparent border border-slate-600 text-white p-2 rounded"
              />
            </div>
            <div className="grid gap-4 mb-6">
              <textarea
                name="turfDescription"
                placeholder="Turf Description"
                value={formData.turfDescription}
                onChange={handleChange}
                rows={3}
                className="bg-transparent border border-slate-600 text-white p-2 rounded resize-none"
              />
              <input
                type="url"
                name="turfLocationUrl"
                placeholder="Google Maps URL of Turf Location"
                value={formData.turfLocationUrl}
                onChange={handleChange}
                className="bg-transparent border border-slate-600 text-white p-2 rounded"
              />
            </div>
            <button onClick={() => setStep(1)} className="text-sm underline mr-4 text-blue-400">
              ← Back
            </button>
            <button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Next
            </button>
          </div>
        )}

        {/* Step 3: Final */}
        {step === 3 && (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Finalize Setup</h3>
            <p className="text-sm mb-6 text-slate-300">
              Confirm all details are correct before proceeding.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setStep(2)} className="text-sm underline text-blue-400">
                ← Back
              </button>
              <button
                onClick={completeSetup}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              >
                Proceed to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSetupHost;
