// src/components/create/ImageDropzone.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function ImageDropzone({
  file,                 // archivo controlado desde el padre
  onFile,               // callback (f: File) => void
  className = "",
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  // Archivo local para feedback inmediato si el padre tarda en setear `file`
  const [localFile, setLocalFile] = useState(null);
  const srcFile = file || localFile;

  // URL de previsualización
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    if (!srcFile) {
      if (previewSrc) URL.revokeObjectURL(previewSrc);
      setPreviewSrc(null);
      return;
    }
    const url = URL.createObjectURL(srcFile);
    setPreviewSrc(url);
    return () => URL.revokeObjectURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcFile]);

  // Si el padre actualiza `file`, dejamos de usar el local
  useEffect(() => {
    if (file) setLocalFile(null);
  }, [file]);

  const fileInfo = useMemo(() => {
    if (!srcFile) return null;
    const kb = srcFile.size / 1024;
    const sizeStr = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;
    return { name: srcFile.name, sizeStr };
  }, [srcFile]);

  const accept = "image/*";
  const maxSizeBytes = 5 * 1024 * 1024;

  function openPicker() {
    inputRef.current?.click();
  }

  function handleFiles(fs) {
    const f = fs?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Formato no soportado. Usa una imagen (JPG, PNG, WebP...).");
      return;
    }
    if (f.size > maxSizeBytes) {
      setError("La imagen debe pesar hasta 5 MB.");
      return;
    }
    setError("");
    setLocalFile(f);   // feedback inmediato
    onFile?.(f);       // actualiza en el padre
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${
        dragOver ? "ring-2 ring-violet-400" : "border-gray-300"
      } ${className}`}
    >
      {/* INPUT real */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = ""; // permite re-seleccionar el mismo archivo
        }}
      />

      {/* Área interactiva */}
      <div
        className="relative h-full min-h-[14rem] cursor-pointer"
        onClick={openPicker}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        {/* Fondo con la imagen seleccionada */}
        {previewSrc && (
          <>
            <img
              src={previewSrc}
              alt="Previsualización"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* velo para legibilidad */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
          </>
        )}

        {/* Contenido central (look & feel previo) */}
        <div className={`relative z-10 grid h-full place-items-center p-6 ${previewSrc ? "bg-black/20" : "bg-gray-50"}`}>
          <div className="text-center">
            <CloudArrowUpIcon className="mx-auto h-10 w-10 text-gray-600" />
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-semibold">Haz clic</span> o suelta una imagen aquí
            </p>
            <p className="text-xs text-gray-500">Imágenes (JPG, PNG, WebP) • máx 5 MB</p>
          </div>
        </div>

        {/* Etiqueta con el nombre debajo de la previsualización */}
        {previewSrc && fileInfo?.name && (
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-3 z-20
                       max-w-[85%] truncate rounded-md bg-white/95 px-3 py-1 text-xs sm:text-sm
                       font-medium text-gray-900 shadow ring-1 ring-gray-200"
            title={fileInfo.name}
          >
            {fileInfo.name}
          </div>
        )}
      </div>

      {/* Footer: miniatura + nombre/tamaño (se mantiene igual) */}
      <div className="relative z-10 border-t border-gray-200 bg-white p-3">
        {srcFile ? (
          <div className="flex items-center gap-3">
            {previewSrc && (
              <img
                src={previewSrc}
                alt="Miniatura"
                className="h-12 w-16 rounded-md object-cover ring-1 ring-gray-200"
              />
            )}
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-gray-800">
                {fileInfo?.name}
              </div>
              <div className="text-xs text-gray-500">{fileInfo?.sizeStr}</div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No has cargado una imagen.</div>
        )}

        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
