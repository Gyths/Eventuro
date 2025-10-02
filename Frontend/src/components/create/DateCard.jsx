import React from "react";
import {
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function DateCard({
  date,
  times = [],
  onChangeDate,
  onChangeTimes,
  onRemove,
  onClone,
}) {
  const header = formatFullDate(date);

  const updateTime = (id, newValue) => {
    const next = times.map((t) => (t.id === id ? { ...t, value: newValue } : t));
    onChangeTimes?.(next);
  };

  const addTime = () => {
    const next = [
      ...times,
      { id: crypto.randomUUID(), label: "Hora de inicio", value: "" },
    ];
    onChangeTimes?.(next);
  };

  const removeTime = (id) => {
    onChangeTimes?.(times.filter((t) => t.id !== id));
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header morado */}
      <div className="flex items-center justify-between rounded-t-2xl bg-[#5A0A94] px-4 py-3 text-white">
        <div className="text-sm font-extrabold tracking-wide uppercase">
          {header}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-6 w-6 place-items-center rounded bg-white/10 hover:bg-white/20"
            title="Editar fecha"
            onClick={() => onChangeDate?.(new Date()) /* abre datepicker en tu impl */}
          >
            <PencilSquareIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="grid h-6 w-6 place-items-center rounded bg-white/10 hover:bg-white/20"
            title="Duplicar"
            onClick={onClone}
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="grid h-6 w-6 place-items-center rounded bg-white/10 hover:bg-white/20"
            title="Eliminar"
            onClick={onRemove}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Body gris suave */}
      <div className="rounded-b-2xl bg-gray-50 px-4 py-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {times.map((t) => (
            <TimeChip
              key={t.id}
              label={t.label}
              value={t.value}
              onChange={(v) => updateTime(t.id, v)}
              onDelete={() => removeTime(t.id)}
            />
          ))}

          <button
            type="button"
            onClick={addTime}
            className="inline-flex items-center gap-1 rounded-lg bg-[#5A0A94] px-2.5 py-1.5 text-sm font-medium text-white hover:bg-[#6f1fb2] active:bg-[#4c0780]"
            title="Agregar hora"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TimeChip({ label, value, onChange, onDelete }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
      <span className="text-sm font-semibold text-gray-700">{label}:</span>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300"
      />
      <button
        type="button"
        onClick={onDelete}
        className="grid h-7 w-7 place-items-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        title="Eliminar hora"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

function formatFullDate(date) {
  try {
    return date.toLocaleDateString("es-PE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).toUpperCase();
  } catch {
    return "FECHA";
  }
}