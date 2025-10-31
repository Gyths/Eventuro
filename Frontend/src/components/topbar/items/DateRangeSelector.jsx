import { useState } from "react";

export default function DateRangeSelector({ from, to, onChange }) {
  const [localFrom, setLocalFrom] = useState(from ?? null);
  const [localTo, setLocalTo] = useState(to ?? null);

  function quick(days) {
    const now = new Date();
    const f = now.toISOString().slice(0, 10);
    const t = new Date(now.getTime() + days * 86400000).toISOString().slice(0, 10);
    setLocalFrom(f);
    setLocalTo(t);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 mb-1">
        {[
          { k: "Hoy", d: 0 },
          { k: "Mañana", d: 1 },
          { k: "Semana", d: 7 },
          { k: "Mes", d: 30 },
        ].map((q) => (
          <button
            key={q.k}
            onClick={() => quick(q.d)}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200"
          >
            {q.k}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Desde</label>
          <input
            type="date"
            value={localFrom || ""}
            onChange={(e) => setLocalFrom(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Hasta</label>
          <input
            type="date"
            value={localTo || ""}
            onChange={(e) => setLocalTo(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={() => onChange?.({ from: localFrom, to: localTo })}
          className="rounded-full bg-violet-600 px-4 py-1 text-xs font-semibold text-white hover:bg-violet-700"
        >
          Aceptar
        </button>
        <button
          onClick={() => onChange?.({ from: null, to: null })}
          className="text-xs text-gray-500 underline hover:text-gray-700"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
