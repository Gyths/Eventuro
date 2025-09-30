import { useState } from "react";

export default function LocationSelector({ value = "", onChange }) {
  const [local, setLocal] = useState(value);

  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1 block text-xs text-gray-600">Ingrese ubicación</label>
        <input
          type="text"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Ej. Morro Solar"
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Placeholder de mapa */}
      <div className="rounded-2xl bg-gray-100 p-3 shadow-inner">
        <div className="h-32 rounded-xl bg-[url('https://tile.openstreetmap.org/5/9/12.png')] bg-cover bg-center opacity-60" />
      </div>

      <div className="text-right">
        <button
          onClick={() => onChange?.(local)}
          className="rounded-full bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
