import React, { useEffect, useState } from "react";

export default function ReturnsPolicy({ value, onChange }) {
  const maxMB = 5;

  // controlado si llega `value`, si no funciona local
  const controlled = !!value;
  const [text, setText] = useState(value?.text ?? "");
  const [file, setFile] = useState(value?.file ?? null);

  // sync desde el padre si cambia
  useEffect(() => {
    if (controlled) {
      setText(value?.text ?? "");
      setFile(value?.file ?? null);
    }
  }, [controlled, value]);

  // notificar al padre ante cambios
  useEffect(() => {
    onChange?.({ text, file });
  }, [text, file, onChange]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text || "");
    } catch (e) {
      console.warn("No se pudo copiar", e);
    }
  };

  const tooBig = file && file.size > maxMB * 1024 * 1024;

  const handleClearFile = () => {
    setFile(null);
    const input = document.getElementById("policy-file-input");
    if (input) input.value = "";
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Política de devoluciones</h3>
        <button
          type="button"
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1.5 text-sm text-yellow-800 hover:bg-yellow-200"
        >
          Copiar Política
        </button>
      </div>

      <div>
        <label className="text-sm text-gray-700">Información</label>
        <textarea
          className="mt-1 w-full min-h-[140px] rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"
          placeholder="Ingrese la política..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm text-gray-700">Subir política:</label>
        <div className="mt-1 flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <input
              id="policy-file-input"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
            />
            {file && (
              <button
                type="button"
                onClick={handleClearFile}
                className="text-gray-500 hover:text-red-500 text-lg font-bold leading-none"
                title="Eliminar archivo"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-3 w-3 rounded ${
                tooBig ? "bg-red-500" : "bg-green-500"
              }`}
            />
            {file && (
              <span
                className={`text-xs font-medium ${
                  tooBig ? "text-red-600" : "text-green-600"
                }`}
              >
                {tooBig ? "Archivo muy pesado" : "Archivo válido"}
              </span>
            )}
          </div>
        </div>
        <div className="mt-1 text-xs text-gray-500">Tamaño máximo: {maxMB} MB</div>
      </div>

      <p className="text-xs text-gray-500">
        La política de devoluciones puede ser ingresada tanto en la casilla como en archivo.
      </p>
    </section>
  );
}
