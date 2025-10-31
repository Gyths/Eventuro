// src/components/create/AddDateModal.jsx
import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function startOfMonth(d) {
  const x = new Date(d);
  x.setDate(1);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addMonths(d, n) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return startOfMonth(x);
}
function ymd(date) {
  const y = date.getFullYear(),
    m = String(date.getMonth() + 1).padStart(2, "0"),
    dd = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
function fromYmd(s) {
  const [y, m, d] = s.split("-").map(Number);
  const x = new Date(y, m - 1, d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function range(n) {
  return Array.from({ length: n }, (_, i) => i);
}
function hmAmPmTo24(hh, mm, ampm) {
  let h = Number(hh);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
function compareHHMM(a, b) {
  return a.localeCompare(b);
}

function CalendarMonth({
  monthDate,
  selectedSet,
  onToggle,
  disabledSet,
  minYmd,
}) {
  const first = startOfMonth(monthDate);
  const firstWeekday = (first.getDay() + 6) % 7; // 0=Lun
  const daysInMonth = new Date(
    first.getFullYear(),
    first.getMonth() + 1,
    0
  ).getDate();
  const cells = firstWeekday + daysInMonth;
  const rows = Math.ceil(cells / 7);

  return (
    <div className="rounded-xl bg-white p-3 ring-1 ring-gray-200">
      <div className="text-center font-semibold text-gray-800">
        {MONTHS_ES[first.getMonth()].replace(/^\w/, (c) => c.toUpperCase())}{" "}
        {first.getFullYear()}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center">
        {range(rows * 7).map((i) => {
          const dayNum = i - firstWeekday + 1;
          const inMonth = dayNum >= 1 && dayNum <= daysInMonth;
          if (!inMonth) return <div key={i} className="h-9" />;
          const date = new Date(first.getFullYear(), first.getMonth(), dayNum);
          date.setHours(0, 0, 0, 0);
          const key = ymd(date);
          const isPast = !!minYmd && key < minYmd;
          const alreadyUsed = disabledSet?.has(key);
          const disabled = isPast || alreadyUsed;
          const selected = selectedSet.has(key);
          const cls = disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : selected
            ? "bg-teal-500 text-white"
            : "hover:bg-gray-100 text-gray-800";
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onToggle(key)}
              className={`h-9 w-9 mx-auto grid place-items-center rounded-full text-sm ${cls}`}
              title={
                disabled
                  ? isPast
                    ? "Fecha anterior a hoy"
                    : "Fecha ya asignada"
                  : undefined
              }
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Modal para seleccionar fechas y (opcionalmente) horarios.
 * Props:
 * - open: bool
 * - onClose: fn()
 * - onConfirm: fn({ dates: Date[], schedules: [{start,end}] })
 * - disabledDates?: Date[]   // días que no se pueden elegir
 * - mode?: "add" | "clone" | "edit"
 * - presetSchedules?: [{start,end}]
 */
export default function AddDateModal({
  open,
  onClose,
  onConfirm,
  disabledDates = [],
  mode = "add",
  presetSchedules = [],
}) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const todayYmd = ymd(today);

  const [viewMonth, setViewMonth] = useState(startOfMonth(new Date()));
  const minMonth = startOfMonth(today);
  const canGoPrev = addMonths(viewMonth, -1) >= minMonth;

  const [selected, setSelected] = useState(new Set());
  const nextMonth = useMemo(() => addMonths(viewMonth, 1), [viewMonth]);
  const singleSelect = mode === "edit";
  const disabledSet = useMemo(
    () => new Set(disabledDates.map((d) => ymd(new Date(d)))),
    [disabledDates]
  );

  // Builder de horarios (solo para mode="add")
  const [builder, setBuilder] = useState([
    {
      id: uuidv4(),
      h1: "12",
      m1: "30",
      a1: "PM",
      h2: "01",
      m2: "30",
      a2: "PM",
    },
  ]);
  const handleClose = () => {
    setSelected(new Set());
    setBuilder([
      {
        id: uuidv4(),
        h1: "12",
        m1: "30",
        a1: "PM",
        h2: "01",
        m2: "30",
        a2: "PM",
      },
    ]);
    onClose?.();
  };
  
  const toggle = (key) => {
    if (disabledSet.has(key) || key < todayYmd) return;
    setSelected((prev) => {
      if (singleSelect) return new Set([key]);
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  };

  const addRow = () =>
    setBuilder((b) => [
      ...b,
      {
        id: uuidv4(),
        h1: "09",
        m1: "00",
        a1: "AM",
        h2: "10",
        m2: "00",
        a2: "AM",
      },
    ]);
  const delRow = (id) =>
    setBuilder((b) => (b.length > 1 ? b.filter((x) => x.id !== id) : b));

  // ---- Detección de cruces en el builder (mode=add) ----
  const builderOverlap = useMemo(() => {
    // si no estamos en modo "add", simplemente devolvemos vacío
    if (mode !== "add") {
      return { ids: new Set(), any: false };
    }

    // pasar cada fila a intervalos en minutos [start, endAdjusted)
    const toMinutes = (row) => {
      const s = hmAmPmTo24(row.h1, row.m1, row.a1);
      const e = hmAmPmTo24(row.h2, row.m2, row.a2);
      const [sh, sm] = s.split(":").map(Number);
      const [eh, em] = e.split(":").map(Number);
      const start = sh * 60 + sm;
      let end = eh * 60 + em;
      if (end <= start) end += 1440; // cruza medianoche
      return { id: row.id, start, end };
    };

    const intervals = builder.map(toMinutes).sort((a, b) => a.start - b.start);
    const overlapped = new Set();

    // comparar cada intervalo
    for (let i = 0; i < intervals.length; i++) {
      const a = intervals[i];
      for (
        let j = i + 1;
        j < intervals.length && intervals[j].start < a.end;
        j++
      ) {
        overlapped.add(a.id);
        overlapped.add(intervals[j].id);
      }
    }

    // casos de spill (pasan medianoche)
    for (let i = 0; i < intervals.length; i++) {
      const a = intervals[i];
      if (a.end > 1440) {
        const spillEnd = a.end - 1440;
        for (
          let j = 0;
          j < intervals.length && intervals[j].start < spillEnd;
          j++
        ) {
          if (j === i) continue;
          overlapped.add(a.id);
          overlapped.add(intervals[j].id);
        }
      }
    }

    return { ids: overlapped, any: overlapped.size > 0 };
  }, [builder, mode]);

  if (!open) return null;

  // --- Validaciones para “Agregar” ---
  const validSelectedKeys = Array.from(selected).filter(
    (k) => k >= todayYmd && !disabledSet.has(k)
  );
  const canConfirm =
    validSelectedKeys.length > 0 &&
    (mode === "clone" ? presetSchedules.length > 0 : true) &&
    (!singleSelect || validSelectedKeys.length === 1) &&
    (mode !== "add" || !builderOverlap.any); // ← bloquear si hay cruces en builder

  const confirm = () => {
    const dates = validSelectedKeys.map(fromYmd);
    const schedules =
      mode === "clone"
        ? presetSchedules
        : mode === "edit"
        ? []
        : builder.map((row) => ({
            start: hmAmPmTo24(row.h1, row.m1, row.a1),
            end: hmAmPmTo24(row.h2, row.m2, row.a2),
          }));
    onConfirm?.({ dates, schedules });
    setSelected(new Set());
    setBuilder([
      {
        id: uuidv4(),
        h1: "12",
        m1: "30",
        a1: "PM",
        h2: "01",
        m2: "30",
        a2: "PM",
      },
    ]);
    onClose?.();
  };

  const hours = range(12).map((i) => String(i + 1).padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];
  const ampm = ["AM", "PM"];

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="absolute left-1/2 top-1/2 w:[min(96vw,900px)] w-[min(96vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="rounded-t-2xl bg-gradient-to-r from-[#2A0243] via-[#6408A2] to-[#2A0243] px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {mode === "clone"
                ? "Selecciona fechas para duplicar horarios"
                : mode === "edit"
                ? "Selecciona la nueva fecha"
                : "Selecciona una o varias fechas"}
            </h3>
            <button
              onClick={handleClose}
              className="grid h-8 w-8 place-items-center rounded bg-white/10 hover:bg-white/20"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {/* Calendarios + nav */}
          <div className="mb-4 flex items-center justify-between">
            <button
              className="grid h-9 w-9 place-items-center rounded-lg ring-1 ring-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => canGoPrev && setViewMonth((m) => addMonths(m, -1))}
              disabled={!canGoPrev}
              title={
                canGoPrev ? "Mes anterior" : "No puedes ir a meses pasados"
              }
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <CalendarMonth
                monthDate={viewMonth}
                selectedSet={selected}
                onToggle={toggle}
                disabledSet={disabledSet}
                minYmd={todayYmd}
              />
              <CalendarMonth
                monthDate={nextMonth}
                selectedSet={selected}
                onToggle={toggle}
                disabledSet={disabledSet}
                minYmd={todayYmd}
              />
            </div>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg ring-1 ring-gray-200 hover:bg-gray-50"
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              title="Mes siguiente"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Aviso de cruce en builder */}
          {mode === "add" && builderOverlap.any && (
            <div className="mb-3 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Hay horarios que se cruzan. Corrige los horarios para poder
              agregarlos.
            </div>
          )}

          {/* Builder de horarios (solo en modo ADD) */}
          {mode === "add" && (
            <>
              <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
                {/* DESDE */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Desde:
                  </label>
                  {builder.map((row) => (
                    <div key={row.id} className="mb-2 flex items-center gap-2">
                      <Select
                        value={row.h1}
                        onChange={(v) =>
                          setBuilder((b) =>
                            b.map((x) =>
                              x.id === row.id ? { ...x, h1: v } : x
                            )
                          )
                        }
                        options={hours}
                      />
                      <span className="text-gray-500">:</span>
                      <Select
                        value={row.m1}
                        onChange={(v) =>
                          setBuilder((b) =>
                            b.map((x) =>
                              x.id === row.id ? { ...x, m1: v } : x
                            )
                          )
                        }
                        options={minutes}
                      />
                      <Select
                        value={row.a1}
                        onChange={(v) =>
                          setBuilder((b) =>
                            b.map((x) =>
                              x.id === row.id ? { ...x, a1: v } : x
                            )
                          )
                        }
                        options={ampm}
                      />
                    </div>
                  ))}
                </div>

                {/* HASTA */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Hasta:
                  </label>
                  {builder.map((row) => {
                    const start24 = hmAmPmTo24(row.h1, row.m1, row.a1);
                    const end24 = hmAmPmTo24(row.h2, row.m2, row.a2);
                    const overnight = compareHHMM(start24, end24) > 0;
                    const isOver = builderOverlap.ids.has(row.id);

                    return (
                      <div
                        key={row.id}
                        className="mb-2 flex items-center gap-2"
                      >
                        <Select
                          value={row.h2}
                          onChange={(v) =>
                            setBuilder((b) =>
                              b.map((x) =>
                                x.id === row.id ? { ...x, h2: v } : x
                              )
                            )
                          }
                          options={hours}
                        />
                        <span className="text-gray-500">:</span>
                        <Select
                          value={row.m2}
                          onChange={(v) =>
                            setBuilder((b) =>
                              b.map((x) =>
                                x.id === row.id ? { ...x, m2: v } : x
                              )
                            )
                          }
                          options={minutes}
                        />
                        <Select
                          value={row.a2}
                          onChange={(v) =>
                            setBuilder((b) =>
                              b.map((x) =>
                                x.id === row.id ? { ...x, a2: v } : x
                              )
                            )
                          }
                          options={ampm}
                        />
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-md ring-1 ring-gray-200 hover:bg-gray-50"
                          title="Eliminar horario"
                          onClick={() => delRow(row.id)}
                        >
                          <TrashIcon className="h-4 w-4 text-gray-600" />
                        </button>
                        {overnight && (
                          <span className="text-xs text-gray-700 italic">
                            (Hasta el día siguiente)
                          </span>
                        )}
                        {isOver && (
                          <span className="text-xs text-red-600 font-medium">
                            (Horario cruzado)
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  onClick={addRow}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#5A0A94] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#6f1fb2]"
                  title="Agregar otro horario"
                >
                  <PlusIcon className="h-4 w-4" />
                  Agregar horario
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full px-5 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={confirm}
            className={`rounded-full px-6 py-2 text-sm font-semibold text-white ${
              canConfirm
                ? "bg-emerald-500 hover:bg-emerald-400"
                : "bg-emerald-300 cursor-not-allowed"
            }`}
            title={
              canConfirm
                ? "Agregar"
                : "Selecciona fechas válidas y corrige los cruces"
            }
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
