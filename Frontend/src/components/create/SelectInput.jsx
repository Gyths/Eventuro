import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function SelectInput({ value, onChange, options = [], placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-10 text-[15px] text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
      >
        {options.length === 0 && (
          <option value="">{placeholder ?? "Selecciona una opción"}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
    </div>
  );
}