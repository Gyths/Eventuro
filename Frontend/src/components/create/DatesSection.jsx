import React, { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { PlusIcon } from "@heroicons/react/24/outline";
import DateCard from "./DateCard";
import AddDateModal from "./AddDateModal";

export default function DatesSection({ value, onChange }) {
  // -------- Helpers de tiempo y utilitarios --------
  const pad2 = (n) => String(n).padStart(2, "0");

  function parseToMinutes(raw) {
    if (!raw) return NaN;
    const s = String(raw).trim();

    // 24h -> HH:mm
    let m = s.match(/^(\d{1,2}):(\d{2})$/);
    if (m) {
      const h = Number(m[1]), mm = Number(m[2]);
      if (h >= 0 && h < 24 && mm >= 0 && mm < 60) return h * 60 + mm;
      return NaN;
    }

    // 12h -> h:mm AM/PM
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
  }

  function to24h(raw) {
    const mins = parseToMinutes(raw);
    if (Number.isNaN(mins)) return null; // inválido o vacío
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${pad2(h)}:${pad2(m)}`;
  }

  // Asegura ID y ordena válidos por start; deja inválidos al final
  function normalizeAndSortSchedules(schedules = []) {
    const valid = [];
    const invalid = [];
    for (const s of schedules) {
      const withId = s.id ? s : { ...s, id: uuidv4() };
      const start24 = to24h(withId.start);
      const end24 = to24h(withId.end);
      if (start24) {
        valid.push({ ...withId, start: start24, end: end24 ?? withId.end });
      } else {
        invalid.push(withId); // vacío o inválido -> no reordenar mientras editan
      }
    }
    valid.sort((a, b) => parseToMinutes(a.start) - parseToMinutes(b.start));
    return [...valid, ...invalid];
  }

  // -------- Estado principal --------
  const controlled = Array.isArray(value);
  const [localDates, setLocalDates] = useState(value ?? []); // [{id, date, schedules:[{id,start,end}]}]

  // Sincroniza cuando el padre cambie; además INYECTA IDs faltantes y ordena
  useEffect(() => {
    if (!controlled) return;
    const next = (value ?? []).map((d) => ({
      ...d,
      id: d.id ?? uuidv4(),
      date: d.date instanceof Date ? d.date : new Date(d.date),
      schedules: normalizeAndSortSchedules(d.schedules ?? []),
    }));
    next.sort((a, b) => new Date(a.date) - new Date(b.date));
    setLocalDates(next);
  }, [controlled, value]);

  // util: normalizar a Date
  const toDate = (d) => (d instanceof Date ? d : new Date(d));
  // util: mismo día
  const sameDay = (a, b) => {
    const x = toDate(a), y = toDate(b);
    return (
      x.getFullYear() === y.getFullYear() &&
      x.getMonth() === y.getMonth() &&
      x.getDate() === y.getDate()
    );
  };

  const disabledDates = useMemo(
    () => localDates.map((d) => toDate(d.date)),
    [localDates]
  );

  // Setter unificado: normaliza y ordena horarios y fechas SIEMPRE
  const setDates = (updater) => {
    const nextRaw =
      typeof updater === "function" ? updater(localDates) : updater;

    let next = (nextRaw || []).map((d) => ({
      ...d,
      id: d.id ?? uuidv4(),
      date: toDate(d.date),
      schedules: normalizeAndSortSchedules(d.schedules ?? []),
    }));

    next.sort((a, b) => toDate(a.date) - toDate(b.date));

    if (!controlled) setLocalDates(next);
    // Además de normalizar, enviamos los objetos nuevos
    onChange?.(
      next.map((d) => ({
        ...d,
        schedules: d.schedules.map((s) => ({ ...s })),
      }))
    );
  };

  // -------- Estado modal y helpers --------
  const [addOpen, setAddOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "clone" | "edit"
  const [clonePreset, setClonePreset] = useState([]); // [{start,end}]
  const [editTargetId, setEditTargetId] = useState(null);

  function openAddDatesModal() {
    setModalMode("add");
    setClonePreset([]);
    setEditTargetId(null);
    setAddOpen(true);
  }

  // Agregar múltiples fechas (el orden final lo aplica setDates)
  const handleBulkAddDates = ({ dates: pickedDates, schedules }) => {
    setDates((current) => {
      const next = [...current];
      for (const d of pickedDates) {
        const idx = next.findIndex((x) => sameDay(x.date, d));
        const schedsWithIds = (schedules ?? []).map((s) => ({
          id: uuidv4(),
          ...s,
        }));
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            schedules: [...(next[idx].schedules ?? []), ...schedsWithIds],
          };
        } else {
          next.push({ id: uuidv4(), date: toDate(d), schedules: schedsWithIds });
        }
      }
      return next;
    });
  };

  // Confirmar modal (add/clone/edit)
  const handleModalConfirm = ({ dates: pickedDates, schedules }) => {
    if (modalMode === "edit" && editTargetId) {
      const newDate = pickedDates[0];
      setDates((ds) =>
        ds.map((d) =>
          d.id === editTargetId ? { ...d, date: toDate(newDate) } : d
        )
      );
      setEditTargetId(null);
      return;
    }
    handleBulkAddDates({ dates: pickedDates, schedules });
  };

  // -------- Mutadores auxiliares --------
  const handleRemoveDate = (id) =>
    setDates((ds) => ds.filter((d) => d.id !== id));

  const handleUpdateDate = (id, patch) =>
    setDates((ds) => ds.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  const handleAddSchedule = (dateId) =>
    setDates((ds) =>
      ds.map((d) =>
        d.id === dateId
          ? {
              ...d,
              schedules: [
                ...(d.schedules ?? []),
                { id: uuidv4(), start: "", end: "" },
              ],
            }
          : d
      )
    );

  const handleUpdateSchedule = (dateId, schedId, patch) =>
    setDates((ds) =>
      ds.map((d) =>
        d.id === dateId
          ? {
              ...d,
              schedules: (d.schedules ?? []).map((s) =>
                s.id === schedId ? { ...s, ...patch } : s
              ),
            }
          : d
      )
    );

  const handleDeleteSchedule = (dateId, schedId) =>
    setDates((ds) =>
      ds.map((d) =>
        d.id === dateId
          ? {
              ...d,
              schedules: (d.schedules ?? []).filter((s) => s.id !== schedId),
            }
          : d
      )
    );

  // -------- Render --------
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[17px] font-semibold text-gray-800">Fechas</h2>
          <button
            onClick={openAddDatesModal}
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white p-1.5 hover:bg-gray-50 active:bg-gray-100"
            aria-label="Agregar fecha"
            title="Agregar fecha"
          >
            <PlusIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {localDates.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-7 text-center">
            <p className="text-sm text-gray-600">
              No hay fechas asignadas a este evento. Agrega una o más fechas y
              horarios.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={openAddDatesModal}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                title="Agregar fecha"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Agregar fecha
              </button>
            </div>
          </div>
        ) : (
          localDates.map((d) => (
            <DateCard
              key={d.id}
              date={toDate(d.date)}
              schedules={d.schedules ?? []}  // ya vienen ordenados
              cloneDisabled={(d.schedules ?? []).length === 0}
              onChangeDate={(newDate) =>
                handleUpdateDate(d.id, { date: new Date(newDate) })
              }
              onRequestEditDate={() => {
                setModalMode("edit");
                setEditTargetId(d.id);
                setAddOpen(true);
              }}
              onAddSchedule={() => handleAddSchedule(d.id)}
              onUpdateSchedule={(schedId, patch) =>
                handleUpdateSchedule(d.id, schedId, patch)
              }
              onDeleteSchedule={(schedId) =>
                handleDeleteSchedule(d.id, schedId)
              }
              onRemove={() => handleRemoveDate(d.id)}
              onClone={() => {
                if (!d.schedules || d.schedules.length === 0) return;
                setModalMode("clone");
                setClonePreset(
                  d.schedules.map(({ start, end }) => ({ start, end }))
                );
                setAddOpen(true);
              }}
            />
          ))
        )}
      </div>

      {/* Modal */}
      <AddDateModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onConfirm={handleModalConfirm}
        disabledDates={disabledDates}
        mode={modalMode}
        presetSchedules={clonePreset}
      />
    </div>
  );
}
