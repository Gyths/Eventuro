import { useState } from "react";

export default function DateRangeSelector({ from, to, onChange }) {
  const [localFrom, setLocalFrom] = useState(from ?? "");
  const [localTo, setLocalTo] = useState(to ?? "");

  function quick(days) {
    const now = new Date();
    const f = now.toISOString().slice(0, 10);
    const t = new Date(now.getTime() + days * 86400000)
      .toISOString()
      .slice(0, 10);
    setLocalFrom(f);
    setLocalTo(t);
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
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

      <div className="space-y-2">
        <div>
          <label className="mb-1 block text-xs text-gray-600">Desde</label>
          <input
            type="date"
            value={localFrom}
            onChange={(e) => setLocalFrom(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">Hasta</label>
          <input
            type="date"
            value={localTo}
            onChange={(e) => setLocalTo(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="pt-1 text-right">
        <button
          onClick={() => onChange?.({ from: localFrom, to: localTo })}
          className="rounded-full bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Aceptar
        </button>
      </div>
      <div className="pt-1 text-right">
        <button
          onClick={() => onChange?.({ from: "", to: "" })}
          className="text-xs text-gray-500 underline underline-offset-2"
        >
          Limpiar
        </button>
      </div>
    </div>
    
  );
}
