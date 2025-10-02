import React from "react";

export default function TextArea({ value, onChange, placeholder, rows = 5 }) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="w-full min-h-[120px] rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-800 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
    />
  );
}