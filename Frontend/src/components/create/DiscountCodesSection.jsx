import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { DiscountCodeCard } from "./DiscountCodeCard";
export default function DiscountCodesSection({
  zoneNames = [],
  value = [],
  onChange = () => {},
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState({
    code: "",
    available: 0,
    from: "",
    to: "",
    percent: 0,
    appliesToOne: "ALL",
  });

  const addCode = () => {
    if (!draft.code || !draft.from || !draft.to) return;
    const computedAppliesTo =
      draft.appliesToOne === "ALL"
        ? [...zoneNames] // todas las zonas definidas en el paso 2
        : draft.appliesToOne
        ? [draft.appliesToOne]
        : [];

    const newCode = {
      id: uuidv4(),
      code: draft.code.trim(),
      available: Number(draft.available || 0),
      from: draft.from,
      to: draft.to,

      appliesToOne: draft.appliesToOne,

      appliesTo: computedAppliesTo,
      percent: Number(draft.percent || 0),
    };
    onChange([...value, newCode]);
    setDraft({
      code: "",
      available: 0,
      from: "",
      to: "",
      percent: 0,
      appliesToOne: "ALL",
    });
    setShowAdd(false);
  };

  const removeCode = (id) => onChange(value.filter((x) => x.id !== id));

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Códigos de descuento
        </h3>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-purple-300 bg-white px-3 py-1.5 text-sm text-purple-700 hover:bg-purple-50"
        >
          {showAdd ? "Cancelar" : "Agregar código"}
        </button>
      </div>

      {showAdd && (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-600">Código</label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                value={draft.code}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, code: e.target.value }))
                }
                placeholder="EVNTR2025"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Disponibles</label>
              <input
                type="number"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                value={draft.available}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, available: e.target.value }))
                }
                min={0}
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Descuento (%)</label>
              <input
                type="number"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                value={draft.percent}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, percent: e.target.value }))
                }
                min={0}
                max={100}
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Desde</label>
              <input
                type="date"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                value={draft.from}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, from: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Hasta</label>
              <input
                type="date"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                value={draft.to}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, to: e.target.value }))
                }
              />
            </div>
            <div className="lg:col-span-3">
              <label className="text-xs text-gray-600">Aplica para: </label>
              <select
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                value={draft.appliesToOne}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, appliesToOne: e.target.value }))
                }
              >
                <option value="ALL">Todas</option>
                {zoneNames.map((zn, i) => (
                  <option key={i} value={zn}>
                    {zn}
                  </option>
                ))}
              </select>

              <p className="mt-1 text-[11px] text-gray-500">
                Selecciona una zona específica o “Todas”. Si eliges “Todas”, el
                código se aplicará a todas las zonas actuales.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={addCode}
              className="inline-flex items-center rounded-full border border-purple-300 bg-purple-600 text-white px-4 py-2 text-sm hover:bg-purple-700"
            >
              Guardar código
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {value.map((c) => (
          <DiscountCodeCard
            key={c.id}
            code={c.code}
            available={c.available}
            from={c.from}
            to={c.to}
            appliesTo={c.appliesTo}
            percent={c.percent}
            onRemove={() => removeCode(c.id)}
          />
        ))}
        {value.length === 0 && !showAdd && (
          <p className="text-sm text-gray-500 md:col-span-2">
            No hay códigos de descuento agregados.
          </p>
        )}
      </div>
    </section>
  );
}
