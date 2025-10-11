import React, { useState, useMemo, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import DateCard from "./DateCard";
import AddDateModal from "./AddDateModal";

export default function DatesSection({ value, onChange }) {
  // Modo controlado si llega "value" como array
  const controlled = Array.isArray(value);
  const [localDates, setLocalDates] = useState(value ?? []); // [{id, date: Date|ISO, schedules:[{id,start,end}]}]

  // Mantener sincronía cuando el padre cambie "value"
  useEffect(() => {
    if (controlled) setLocalDates(value);
  }, [controlled, value]);

  // Setter unificado: actualiza local y notifica al padre si aplica
  const setDates = (updater) => {
    const next = typeof updater === "function" ? updater(localDates) : updater;
    if (!controlled) setLocalDates(next);
    onChange?.(next);
  };

  // Estado modal y helpers
  const [addOpen, setAddOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "clone" | "edit"
  const [clonePreset, setClonePreset] = useState([]); // [{start,end}]
  const [editTargetId, setEditTargetId] = useState(null);

  // util: normalizar a Date
  const toDate = (d) => (d instanceof Date ? d : new Date(d));
  // util: mismo día
  const sameDay = (a, b) => {
    const x = toDate(a), y = toDate(b);
    return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth() && x.getDate() === y.getDate();
  };

  const disabledDates = useMemo(() => localDates.map((d) => toDate(d.date)), [localDates]);

  // abrir modal modo agregar
  function openAddDatesModal() {
    setModalMode("add");
    setClonePreset([]);
    setEditTargetId(null);
    setAddOpen(true);
  }

  // agregar múltiples fechas
  const handleBulkAddDates = ({ dates: pickedDates, schedules }) => {
    setDates((current) => {
      const next = [...current];
      for (const d of pickedDates) {
        const idx = next.findIndex((x) => sameDay(x.date, d));
        const schedsWithIds = (schedules ?? []).map((s) => ({ id: uuidv4(), ...s }));
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            schedules: [...(next[idx].schedules ?? []), ...schedsWithIds],
          };
        } else {
          next.push({ id: uuidv4(), date: toDate(d), schedules: schedsWithIds });
        }
      }
      next.sort((a, b) => toDate(a.date) - toDate(b.date));
      return next;
    });
  };

  // confirmar modal (add/clone/edit)
  const handleModalConfirm = ({ dates: pickedDates, schedules }) => {
    if (modalMode === "edit" && editTargetId) {
      const newDate = pickedDates[0];
      setDates((ds) =>
        ds
          .map((d) => (d.id === editTargetId ? { ...d, date: toDate(newDate) } : d))
          .sort((a, b) => toDate(a.date) - toDate(b.date))
      );
      setEditTargetId(null);
      return;
    }
    handleBulkAddDates({ dates: pickedDates, schedules });
  };

  // mutadores auxiliares
  const handleRemoveDate = (id) => setDates((ds) => ds.filter((d) => d.id !== id));
  const handleUpdateDate = (id, patch) => setDates((ds) => ds.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  const handleAddSchedule = (dateId) =>
    setDates((ds) =>
      ds.map((d) =>
        d.id === dateId
          ? { ...d, schedules: [...(d.schedules ?? []), { id: crypto.randomUUID(), start: "", end: "" }] }
          : d
      )
    );
  const handleUpdateSchedule = (dateId, schedId, patch) =>
    setDates((ds) =>
      ds.map((d) =>
        d.id === dateId
          ? { ...d, schedules: (d.schedules ?? []).map((s) => (s.id === schedId ? { ...s, ...patch } : s)) }
          : d
      )
    );
  const handleDeleteSchedule = (dateId, schedId) =>
    setDates((ds) =>
      ds.map((d) =>
        d.id === dateId ? { ...d, schedules: (d.schedules ?? []).filter((s) => s.id !== schedId) } : d
      )
    );

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
              No hay fechas asignadas a este evento. Agrega una o más fechas y horarios.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={openAddDatesModal}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                title="Agregar fecha"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
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
              schedules={d.schedules ?? []}
              cloneDisabled={(d.schedules ?? []).length === 0}
              onChangeDate={(newDate) => handleUpdateDate(d.id, { date: new Date(newDate) })}
              onRequestEditDate={() => {
                setModalMode("edit");
                setEditTargetId(d.id);
                setAddOpen(true);
              }}
              onAddSchedule={() => handleAddSchedule(d.id)}
              onUpdateSchedule={(schedId, patch) => handleUpdateSchedule(d.id, schedId, patch)}
              onDeleteSchedule={(schedId) => handleDeleteSchedule(d.id, schedId)}
              onRemove={() => handleRemoveDate(d.id)}
              onClone={() => {
                if (!d.schedules || d.schedules.length === 0) return;
                setModalMode("clone");
                setClonePreset(d.schedules.map(({ start, end }) => ({ start, end })));
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
