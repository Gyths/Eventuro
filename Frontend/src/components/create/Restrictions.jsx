// src/components/create/Restrictions.jsx
import React from "react";

export default function Restrictions({ value, onChange }) {
  // value: { general: bool, withAdult: bool, adultsOnly: bool }

  const setExclusive = (key, checked) => {
    if (checked) {
      // activar uno y desactivar los demás
      onChange?.({
        general: key === "general",
        withAdult: key === "withAdult",
        adultsOnly: key === "adultsOnly",
      });
    } else {
      // si desmarcan el activo, queda ninguno
      onChange?.({
        general: false,
        withAdult: false,
        adultsOnly: false,
      });
    }
  };

  return (
    <div className="space-y-2">
      <Checkbox
        checked={!!value.general}
        onChange={(v) => setExclusive("general", v)}
        label="Apto para público en general."
      />
      <Checkbox
        checked={!!value.withAdult}
        onChange={(v) => setExclusive("withAdult", v)}
        label="Apto para menores de 18 años en compañía de un adulto."
      />
      <Checkbox
        checked={!!value.adultsOnly}
        onChange={(v) => setExclusive("adultsOnly", v)}
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