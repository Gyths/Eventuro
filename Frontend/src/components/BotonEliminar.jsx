import { TrashIcon } from "@heroicons/react/24/solid"; // or outline if you prefer outline
import React from "react";

export default function BotonEliminar({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-7 h-7 border-2 border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
}
