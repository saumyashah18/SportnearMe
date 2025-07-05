import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountSetupHost = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const completeSetup = () => {
    localStorage.setItem("hostAccountSetup", "true");
    navigate("/dashboard-host");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#1f2937] text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">SportnearMe Ground Partner</h1>
        <a href="#" className="text-sm underline">
          Sign Out
        </a>
      </header>

      {/* Main Setup Card */}
      <div className="max-w-5xl mx-auto my-10 bg-[#1e293b] text-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Account Setup</h2>
        <p className="text-center text-sm text-slate-300 mb-6">
          Please fill in the below details so that we can setup an account for your organisation in our system and give you access to the Do-It-Yourself portal for listing your sports ground.
        </p>

        {/* Step Indicators */}
        <div className="flex justify-between text-sm font-semibold border-b border-slate-600 pb-2 mb-4">
          <button onClick={() => setStep(1)} className={step === 1 ? "text-blue-400" : "text-slate-500"}>
            1. Academy Credentials
          </button>
          <button onClick={() => setStep(2)} className={step === 2 ? "text-blue-400" : "text-slate-500"}>
            2. Bank Information
          </button>
          <button onClick={() => setStep(3)} className={step === 3 ? "text-blue-400" : "text-slate-500"}>
            3. Finish Setup
          </button>
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Academy Information</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Academy Name" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="text" placeholder="Owner Full Name" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="text" placeholder="PAN Number" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="text" placeholder="Phone Number" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="email" placeholder="Email" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
            </div>
            <button onClick={() => setStep(2)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Bank & KYC</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Beneficiary Name" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="text" placeholder="Bank Name" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="text" placeholder="Account Number" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="text" placeholder="IFSC Code" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-slate-300">Upload Academy Logo / Profile Image</label>
              <input type="file" className="bg-transparent border border-slate-600 rounded w-full p-2 text-white file:text-white file:bg-blue-600" />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-slate-300">Upload GST Certificate / KYC</label>
              <input type="file" className="bg-transparent border border-slate-600 rounded w-full p-2 text-white file:text-white file:bg-blue-600" />
            </div>

            <button onClick={() => setStep(1)} className="text-sm underline mr-4 text-blue-400">
              ← Back
            </button>
            <button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Finalize Setup</h3>
            <p className="text-sm mb-6 text-slate-300">
              By proceeding, you confirm all your details are accurate and agree to our partner terms.
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
