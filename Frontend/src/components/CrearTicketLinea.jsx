import React from "react";
import BotonEliminar from "./BotonEliminar";

function LineaDinamica({ items, setItems }) {
  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full">
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-2 border-b pb-2 items-start md:items-center"
          >
            {/* Tipo */}
            <div className="flex flex-col w-full md:flex-1">
              <span className="font-semibold text-gray-700 mb-1 md:text-left">Tipo de la entrada*</span>
              <input
                type="text"
                placeholder="Ej: Vip, premium,etc..."
                value={item.name}
                onChange={(e) => handleChange(index, "tipo", e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            {/* Cantidad */}
            <div className="flex flex-col w-full md:flex-1">
              <span className="font-semibold text-gray-700 mb-1 md:text-left">Cantidad disponible*</span>
              <input
                type="text"
                placeholder="0"
                value={item.price}
                onChange={(e) => handleChange(index, "cantidad", e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            {/* Precio */}
            <div className="flex flex-col w-full md:flex-1">
              <span className="font-semibold text-gray-700 mb-1 md:text-left">Precio*</span>
              <input
                type="text"
                placeholder="0.00"
                value={item.amount}
                onChange={(e) => handleChange(index, "monto", e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            {/* Delete button */}
            <div className="w-full md:w-auto flex justify-end mt-2 md:mt-0">
              <BotonEliminar onClick={() => handleDelete(index)} />
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default LineaDinamica;
