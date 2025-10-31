import { useState } from "react";

export default function LocationSelector({ value = "", onChange }) {
  const [local, setLocal] = useState(value);

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-xs text-gray-600 mb-1">Ubicación</label>
        <input
          type="text"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Ej. Morro Solar"
          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs"
        />
      </div>

      <div className="rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
        <div className="h-24 bg-[url('https://tile.openstreetmap.org/5/9/12.png')] bg-cover bg-center opacity-60" />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => onChange?.(local)}
          className="rounded-full bg-violet-600 px-4 py-1 text-xs font-semibold text-white hover:bg-violet-700"
        >
          Aceptar
        </button>
        <button
          onClick={() => onChange?.("")}
          className="text-xs text-gray-500 underline hover:text-gray-700"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
