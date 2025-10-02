import React from "react";

export default function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-[15px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
    />
  );
}