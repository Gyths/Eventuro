import React, { useState } from "react";
import {
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function DateCard({
  date,
  schedules = [],                // [{id, start, end}]
  onAddSchedule,                  // () => void
  onUpdateSchedule,               // (schedId, patch) => void
  onDeleteSchedule,               // (schedId) => void
  onRequestEditDate,
  onRemove,                       // () => void
  onClone,                        // () => void (abre modal en modo clone)
  cloneDisabled = false,          // deshabilita duplicar si no hay horarios
}) {
  const header = formatFullDate(date);
  const [editRow, setEditRow] = useState({}); // { [schedId]: boolean }

  const toggleEdit = (id) =>
    setEditRow((m) => ({ ...m, [id]: !m[id] }));

  const isEditing = (s) =>
    !!editRow[s.id] || !s.start || !s.end; // si está vacío, editable por defecto

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header con nuevo color (#42a692) */}
      <div
        className="flex items-center justify-between rounded-t-2xl px-4 py-3 text-white"
        style={{ backgroundColor: "#42a692" }}
      >
        <div className="text-sm font-extrabold tracking-wide uppercase">
          {header}
        </div>
        <div className="flex items-center gap-2">
          {/* Agregar horario (único botón + arriba) */}
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
            title="Agregar horario"
            onClick={onAddSchedule}
          >
            <PlusIcon className="h-4 w-4" />
            Agregar horario
          </button>

          {/* Acciones de la fecha */}
          <button
            type="button"
            className="grid h-6 w-6 place-items-center rounded bg-white/10 hover:bg-white/20"
            title="Editar fecha"
            onClick={onRequestEditDate}
          >
            <PencilSquareIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={cloneDisabled}
            className={`grid h-6 w-6 place-items-center rounded ${
              cloneDisabled
                ? "bg-white/10 opacity-40 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20"
            }`}
            title={
              cloneDisabled
                ? "Agrega al menos un horario para duplicar"
                : "Duplicar esta fecha a otras"
            }
            onClick={onClone}
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="grid h-6 w-6 place-items-center rounded bg-white/10 hover:bg-white/20"
            title="Eliminar fecha"
            onClick={onRemove}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="rounded-b-2xl bg-gray-50 px-4 py-4">
        <div className="flex flex-col gap-3">
          {schedules.length === 0 && (
            <div className="text-sm text-gray-600">
              No hay horarios aún. Usa “Agregar horario”.
            </div>
          )}

          {schedules.map((s) => {
            const editing = isEditing(s);

            return (
              <div
                key={s.id}
                className={`flex flex-wrap items-center gap-3 rounded-xl border px-3 py-2 shadow-sm
                  ${editing ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200"}`}
              >
                {/* Hora de inicio */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Hora de inicio:
                  </span>
                  <input
                    type="time"
                    value={s.start || ""}
                    disabled={!editing}
                    onChange={(e) =>
                      onUpdateSchedule?.(s.id, { start: e.target.value })
                    }
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 disabled:bg-gray-200"
                  />
                </div>

                {/* Hora de fin */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Hora de fin:
                  </span>
                  <input
                    type="time"
                    value={s.end || ""}
                    disabled={!editing}
                    onChange={(e) =>
                      onUpdateSchedule?.(s.id, { end: e.target.value })
                    }
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300 disabled:bg-gray-200"
                  />
                </div>
                {s.start && s.end && s.start.localeCompare(s.end) > 0 && (
                  <span className="text-xs text-gray-700 italic">
                    (Hasta el día siguiente)
                  </span>
                )}
                {/* Badge de edición (cuando está editando) */}
                {editing && (
                  <span className="ml-auto inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700">
                    Edición activada
                  </span>
                )}

                {/* Acciones de la fila */}
                <div className={`flex items-center gap-2 ${editing ? "" : "ml-auto"}`}>
                  <button
                    type="button"
                    onClick={() => toggleEdit(s.id)}
                    className={`grid h-8 w-8 place-items-center rounded-md border text-gray-600
                      ${editing
                        ? "border-gray-300 bg-gray-100"
                        : "border-gray-200 bg-white hover:bg-gray-50"}`}
                    title={editing ? "Terminar edición" : "Editar horario"}
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteSchedule?.(s.id)}
                    className="grid h-8 w-8 place-items-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    title="Eliminar horario"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function formatFullDate(date) {
  try {
    return date
      .toLocaleDateString("es-PE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
      .toUpperCase();
  } catch {
    return "FECHA";
  }
}