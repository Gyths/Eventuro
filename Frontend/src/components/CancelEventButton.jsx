import React, { useState } from "react";

export default function CancelEventButton({
  onClick,
  disabled = false,
  className = "",
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const baseClasses =
    "relative inline-flex items-center justify-center rounded-lg px-4 py-1.5 text-sm font-semibold shadow-sm transition-all ";

  const enabledClasses =
    "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer";

  const disabledClasses =
    "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70";

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => disabled && setShowTooltip(true)}
      onMouseLeave={() => disabled && setShowTooltip(false)}
    >
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`${baseClasses} ${
          disabled ? disabledClasses : enabledClasses
        } ${className}`}
      >
        Cancelar evento
      </button>

      {/* Tooltip estilizado SOLO cuando está deshabilitado */}
      {disabled && showTooltip && (
        <div className="
          absolute bottom-full mb-2 py-1.5 px-3 rounded-xl text-xs text-white 
          bg-gray-800 shadow-xl whitespace-nowrap z-50 
          animate-fadeIn
        ">
          No se pueden cancelar eventos expirados o en curso
        </div>
      )}

      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.18s ease-out;
        }
      `}</style>
    </div>
  );
}
