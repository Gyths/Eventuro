import React, { useRef } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function ImageDropzone({ file, onFile }) {
  const inputRef = useRef(null);

  const handleSelect = (e) => {
    const f = e.target.files?.[0];
    if (f) onFile?.(f);
  };

  return (
    <div
      className="flex h-[260px] w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50"
      onClick={() => inputRef.current?.click()}
      title="Subir imagen"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSelect}
      />
      {!file ? (
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <ArrowUpTrayIcon className="h-8 w-8" />
          <span className="text-sm">Upload Photo</span>
        </div>
      ) : (
        <div className="text-sm text-gray-700">
          {file.name} ({Math.round(file.size / 1024)} KB)
        </div>
      )}
    </div>
  );
}