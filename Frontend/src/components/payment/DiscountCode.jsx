import React from "react";
export default function DiscountCode() {
  return (
    <div className="w-full max-w-lg mt-6">
      <p className="font-medium mb-2">¿Tienes un código de descuento?</p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Código de descuento aquí"
          className="flex-1 border rounded px-3 py-2"
        />
        <button className="bg-yellow-400 text-white px-4 rounded hover:bg-yellow-500 transition-transform duration-200 active:scale-102">
          Agregar
        </button>
      </div>
    </div>
  );
}
