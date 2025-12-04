import React from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export default function ResponseModal({
  open,
  onClose,
  type = "success", // "success" | "error"
  title,
  message,
}) {
  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <>
      <style>{`
        @keyframes modalFadeInScale {
          0% { opacity: 0; transform: translateY(12px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-7 border border-purple-50 relative"
          style={{ animation: "modalFadeInScale 0.2s ease-out" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full px-2 py-1 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            ✕
          </button>

          <div className="flex items-center justify-center mb-4">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center ${
                isSuccess ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {isSuccess ? (
                <CheckCircleIcon className="h-7 w-7 text-green-600" />
              ) : (
                <XCircleIcon className="h-7 w-7 text-red-600" />
              )}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 text-center mb-5">
            {message}
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white shadow-md hover:bg-purple-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
