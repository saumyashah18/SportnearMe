import React from "react";
import QRCode from "qrcode.react";

export default function BookingConfirmed({ booking }) {
  const {
    bookingId,
    customerName,
    sport,
    turfName,
    court,
    date,
    timeSlot,
  } = booking;

  const qrValue = `https://sportnearme.in/verify/${bookingId}`;

  const downloadQRCode = () => {
    const canvas = document.getElementById("bookingQR");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `Booking-${bookingId}.png`;
    downloadLink.click();
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-xl rounded-xl bg-white text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        ✅ Booking Confirmed!
      </h2>
      <div className="text-left text-sm mb-4">
        <p>🧑 <strong>Customer:</strong> {customerName}</p>
        <p>🆔 <strong>Booking ID:</strong> {bookingId}</p>
        <p>🏟️ <strong>Turf:</strong> {turfName}</p>
        <p>🏸 <strong>Sport:</strong> {sport}</p>
        <p>🎯 <strong>Court:</strong> {court}</p>
        <p>📅 <strong>Date:</strong> {date}</p>
        <p>⏰ <strong>Time:</strong> {timeSlot}</p>
      </div>
      <div className="mb-4">
        <QRCode
          id="bookingQR"
          value={qrValue}
          size={180}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
        <p className="text-xs text-gray-500 mt-2">Scan this QR at the turf entrance</p>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => alert("Cancel flow not implemented yet")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          ❌ Cancel Booking
        </button>
        <button
          onClick={downloadQRCode}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          📥 Download QR
        </button>
      </div>
      <div className="mt-4">
        <a href="/dashboard" className="text-blue-600 text-sm underline">
          ⬅️ Back to Dashboard
        </a>
      </div>
    </div>
  );
}
