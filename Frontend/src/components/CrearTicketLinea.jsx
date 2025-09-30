import React from "react";

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
      {/* Subtitulos */}
      <div className="flex flex-col md:flex-row gap-2 md:items-center mb-2 font-semibold text-gray-700">
        <span className="flex-1">Tipo de la entrada*</span>
        <span className="flex-1">Cantidad disponible*</span>
        <span className="flex-1">Precio*</span>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-2 md:items-center border-b pb-2"
          >
            <input
              type="text"
              placeholder="Ej: Vip, premium,etc..."
              value={item.name}
              onChange={(e) => handleChange(index, "tipo", e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            />
            <input
              type="text"
              placeholder="0"
              value={item.price}
              onChange={(e) => handleChange(index, "cantidad", e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            />
            <input
              type="text"
              placeholder="0.00"
              value={item.amount}
              onChange={(e) => handleChange(index, "monto", e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            />

            {/* Delete button */}
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 self-end md:self-auto"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LineaDinamica;
