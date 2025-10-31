import React from "react";

export default function FormField({ label, hint, children }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[15px] font-semibold text-gray-800">
          {label}
        </label>
      )}
      {children}
      {hint && <p className="text-sm text-gray-500">{hint}</p>}
    </div>
  );
}