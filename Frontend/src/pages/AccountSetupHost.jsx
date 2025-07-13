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
            1. Turf-Owner information
          </button>
          <button onClick={() => setStep(2)} className={step === 2 ? "text-blue-400" : "text-slate-500"}>
            2. Turf information
          </button>
          <button onClick={() => setStep(3)} className={step === 3 ? "text-blue-400" : "text-slate-500"}>
            3. Finish Setup
          </button>
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Owner's Full Name" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="date" placeholder="Date Of Birth" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="email" placeholder="Email" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="text" placeholder="Gender" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
            </div>
            <button onClick={() => setStep(2)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-2"></h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Turf Name" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="text" placeholder="Turf Address" className="bg-transparent border border-slate-600 text-white p-2 rounded" />

          </div>
            <div className= "grid h-14 gap-4 mb-15" >
              <input type="text" placeholder="Turf Description" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
              <input type="link" placeholder="Turf Location URL" className="bg-transparent border border-slate-600 text-white p-2 rounded" />
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
