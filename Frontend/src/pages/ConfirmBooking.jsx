import React, { useState } from "react";

export default function ConfirmBooking() {
  const [payFull, setPayFull] = useState(false);

  const fullTotal = 400.0;
  const advance = 200.0;
  const remaining = 200.0;

  const advanceAmount = payFull ? fullTotal.toFixed(2) : advance.toFixed(2);
  const venueAmount = payFull ? "0.00" : remaining.toFixed(2);
  const bottomAmount = payFull ? fullTotal.toFixed(2) : advance.toFixed(2);

  return (
    <div className="bg-[#0B1220] text-white font-sans min-h-screen pb-28">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Super Smash Court</h2>
      </div>

      {/* Booking Summary */}
      <div className="m-4 bg-[#151C2F] shadow-md rounded-xl border border-gray-700 p-4 space-y-2">
        <p className="text-green-400 text-sm font-semibold mb-2">PICKLEBALL</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Court 2</p>
          </div>
          <button className="text-red-400 text-xl font-bold">&times;</button>
        </div>

        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>Thu, 3rd Jul</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⏰</span>
            <span>12:30 PM to 01:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💰</span>
            <span>INR 400.00</span>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="mx-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Court Price</span>
          <span>INR 400.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Convenience Fee</span>
          <span>INR 0.00</span>
        </div>
      </div>

      {/* Advance / Full Toggle */}
      <div className="bg-[#151C2F] mt-6 p-4 mx-4 rounded-xl border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white text-md">Total Amount</h3>
          <span className="text-green-400 font-bold">INR 400.00</span>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Pay full amount in advance</span>
          <label className="relative inline-block w-12 h-6">
            <input
              type="checkbox"
              checked={payFull}
              onChange={() => setPayFull(!payFull)}
              className="peer opacity-0 w-0 h-0"
            />
            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-600 rounded-full peer-checked:bg-green-500 transition"></span>
            <span className="absolute left-[2px] top-[2px] h-5 w-5 bg-white rounded-full peer-checked:left-[24px] transition"></span>
          </label>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Advance payable</span>
          <span>INR {advanceAmount}</span>
        </div>
        <div className="flex justify-between text-sm mt-3">
          <span className="text-gray-400">To be paid at venue</span>
          <span>INR {venueAmount}</span>
        </div>
      </div>

      {/* Booking Policies */}
      <div className="mt-6 px-4">
        <h3 className="text-md font-semibold text-white mb-2">Booking Policies</h3>
        <div className="text-sm text-gray-400 leading-relaxed space-y-1">
          <p>
            <strong>Reschedule Policy:</strong> Rescheduling is allowed 4 hours prior to slot time.
          </p>
          <p>
            <strong>Cancellation:</strong> Non-refundable unless policy states otherwise.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#151C2F] border-t border-gray-700 px-4 py-3 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">
            INR <span className="text-lg font-bold text-white">{bottomAmount}</span>
          </p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium">
          Proceed to Pay →
        </button>
      </div>
    </div>
  );
}
