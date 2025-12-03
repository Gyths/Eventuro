import React from "react";

export default function ViewAttendeesButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex bg-pruple-600 rounded-lg px-4 py-1.5 text-sm font-semibold shadow-sm text-white cursor-pointer hover:bg-purple-700 hover:text-gray-50 transition-all"
    >
      Ver asistentes
    </button>
  );
}
