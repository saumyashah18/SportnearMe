// src/components/LogoutMenu.jsx

import React from "react";

export default function LogoutMenu({ onLogout }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onLogout}
        className="px-6 py-2 rounded bg-red-600 text-white text-lg hover:bg-red-500 transition"
      >
        Logout
      </button>
    </div>
  );
}