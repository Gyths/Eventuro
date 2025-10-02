import React from "react";

export default function Restrictions({ value, onChange }) {
  return (
    <div className="space-y-2">
      <Checkbox
        checked={value.general}
        onChange={(v) => onChange?.({ general: v })}
        label="Apto para público en general."
      />
      <Checkbox
        checked={value.withAdult}
        onChange={(v) => onChange?.({ withAdult: v })}
        label="Apto para menores de 18 años en compañía de un adulto."
      />
      <Checkbox
        checked={value.adultsOnly}
        onChange={(v) => onChange?.({ adultsOnly: v })}
        label="Apto solo para mayores de 18 años."
      />
    </div>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-400"
      />
      <span className="text-[15px] text-gray-700">{label}</span>
    </label>
  );
}