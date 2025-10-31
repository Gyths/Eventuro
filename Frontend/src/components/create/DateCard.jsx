import React, { useState, useMemo } from "react";
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
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  onRequestEditDate,
  onRemove,
  onClone,
  cloneDisabled = false,
}) {
  const header = formatFullDate(date);
  const [editRow, setEditRow] = useState({}); // { [schedId]: boolean }

  const toggleEdit = (id) =>
    setEditRow((m) => ({ ...m, [id]: !m[id] }));

  const isEditing = (s) =>
    !!editRow[s.id] || !s.start || !s.end;

  // === Helpers tiempo ===
  const pad2 = (n) => String(n).padStart(2, "0");
  const parseToMinutes = (raw) => {
    if (!raw) return NaN;
    const s = String(raw).trim();

    // 24h HH:mm
    let m = s.match(/^(\d{1,2}):(\d{2})$/);
    if (m) {
      const h = Number(m[1]), mm = Number(m[2]);
      if (h >= 0 && h < 24 && mm >= 0 && mm < 60) return h * 60 + mm;
      return NaN;
    }
    // 12h h:mm AM/PM
    m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (m) {
      let h = Number(m[1]), mm = Number(m[2]);
      const ap = m[3].toUpperCase();
      if (h < 1 || h > 12 || mm < 0 || mm >= 60) return NaN;
      if (ap === "AM") h = h === 12 ? 0 : h;
      else h = h === 12 ? 12 : h + 12;
      return h * 60 + mm;
    }
    return NaN;
  };
  const to24h = (raw) => {
    const mins = parseToMinutes(raw);
    if (Number.isNaN(mins)) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${pad2(h)}:${pad2(m)}`;
  };

  // Orden visual garantizada
  const sortedSchedules = useMemo(() => {
    const valid = [];
    const invalid = [];
    for (const s of schedules) {
      const start24 = to24h(s.start);
      if (start24) valid.push({ ...s, start: start24 });
      else invalid.push(s);
    }
    valid.sort((a, b) => parseToMinutes(a.start) - parseToMinutes(b.start));
    return [...valid, ...invalid];
  }, [schedules]);

  // Conjunto de IDs que están cruzados (detección completa, soporta medianoche)
  const overlapIds = useMemo(() => {
    // Construir intervalos válidos con manejo de medianoche
    const intervals = sortedSchedules
      .map((s) => {
        const sM = parseToMinutes(s.start);
        const eMraw = parseToMinutes(s.end);
        if (Number.isNaN(sM) || Number.isNaN(eMraw)) return null;
        const eM = eMraw <= sM ? eMraw + 1440 : eMraw; // fin al día siguiente si end <= start
        return { id: s.id, start: sM, end: eM };
      })
      .filter(Boolean)
      .sort((a, b) => a.start - b.start);

    const overlapped = new Set();

    // 1) Para cada i, comparar con TODOS los j posteriores con start < end(i)
    for (let i = 0; i < intervals.length; i++) {
      const a = intervals[i];
      for (let j = i + 1; j < intervals.length && intervals[j].start < a.end; j++) {
        overlapped.add(a.id);
        overlapped.add(intervals[j].id);
      }
    }

    // 2) Spill de medianoche: si end > 1440, comparar (end - 1440) con inicios tempranos
    for (let i = 0; i < intervals.length; i++) {
      const a = intervals[i];
      if (a.end > 1440) {
        const spillEnd = a.end - 1440; // tramo en madrugada del “día siguiente”
        for (let j = 0; j < intervals.length && intervals[j].start < spillEnd; j++) {
          if (j === i) continue;
          overlapped.add(a.id);
          overlapped.add(intervals[j].id);
        }
      }
    }

    return overlapped;
  }, [sortedSchedules]);

  // Hay algún cruce global
  const hasAnyOverlap = overlapIds.size > 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div
        className="flex items-center justify-between rounded-t-2xl px-4 py-3 text-white"
        style={{ backgroundColor: "#42a692" }}
      >
        <div className="text-sm font-extrabold tracking-wide uppercase">
          {header}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
            title="Agregar horario"
            onClick={onAddSchedule}
          >
            <PlusIcon className="h-4 w-4" />
            Agregar horario
          </button>
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
        {hasAnyOverlap && (
          <div className="mb-3 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Hay horarios que se cruzan. Corrige los horarios para finalizar la edición.
          </div>
        )}

        <div className="flex flex-col gap-3">
          {sortedSchedules.length === 0 && (
            <div className="text-sm text-gray-600">
              No hay horarios aún. Usa “Agregar horario”.
            </div>
          )}

          {sortedSchedules.map((s) => {
            const editing = isEditing(s);
            const crossesNextDay =
              s.start && s.end && s.start.localeCompare(s.end) > 0;
            const isOverlapped = overlapIds.has(s.id);

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

                {/* Etiquetas auxiliares */}
                {crossesNextDay && (
                  <span className="text-xs text-gray-700 italic">
                    (Hasta el día siguiente)
                  </span>
                )}
                {isOverlapped && (
                  <span className="text-xs text-red-600 font-medium">
                    (Horario cruzado)
                  </span>
                )}

                {/* Badge de edición */}
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
                    disabled={editing && hasAnyOverlap} // bloquea terminar edición si hay cruces
                    className={`grid h-8 w-8 place-items-center rounded-md border text-gray-600
                      ${editing
                        ? `border-gray-300 ${hasAnyOverlap ? "bg-gray-200 opacity-60 cursor-not-allowed" : "bg-gray-100"}`
                        : "border-gray-200 bg-white hover:bg-gray-50"}`}
                    title={
                      editing && hasAnyOverlap
                        ? "Hay horarios que se cruzan"
                        : (editing ? "Terminar edición" : "Editar horario")
                    }
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
