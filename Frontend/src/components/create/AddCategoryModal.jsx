import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logoB.svg";

export default function AddCategoryModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
}) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryInitials, setCategoryInitials] = useState("");

  const isEditing = initialData !== null;
  const modalTitle = isEditing ? "Editar categoría" : "Nueva categoría";
  const saveButtonText = isEditing ? "Actualizar cambios" : "Guardar cambios";

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        // Modo Edición: Rellena los campos
        setCategoryName(initialData.name || "");
        setCategoryDescription(initialData.description || ""); // Asumo que quieres editar la descripción también
        setCategoryInitials(initialData.initials || "");
      } else {
        // Modo Creación: Limpia los campos
        setCategoryName("");
        setCategoryDescription("");
        setCategoryInitials("");
      }
    }
  }, [isOpen, initialData, isEditing]); // Dependencias del efecto

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() && categoryInitials.trim()) {
      onSave({
        name: categoryName.trim(),
        description: categoryDescription.trim(),
        initials: categoryInitials.trim(),
      });
      // El modal se cierra desde el 'onSave' (handleUpdateCategory)
    } else {
      alert(
        "El nombre y las iniciales de la categoría no pueden estar vacíos."
      );
    }
  };

  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center z-50 p-4
        bg-black/50
        transition-opacity duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div
        className={`
          bg-white rounded-lg shadow-xl w-full max-w-lg relative overflow-hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        <div
          className="flex justify-between items-center p-4"
          style={{
            background:
              "linear-gradient(90deg, #2A0243 0%, #6408A2 60%, #2A0243 100%)",
          }}
        >
          <img src={logo} alt="Eventuro" className="h-8 w-auto" />

          <button
            onClick={onClose} // Llama a la función 'onClose' pasada por props
            className="text-white p-1.5 rounded-lg border border-white/50 hover:bg-white/10 transition-colors"
            title="Cerrar"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* --- Contenido del Modal --- */}
        <div className="p-6">
          {/* TÍTULO */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {modalTitle}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input para el nombre */}
            <div className="flex gap-4">
              {/* Campo Nombre (ocupa más espacio) */}
              <div className="flex-grow">
                <label htmlFor="categoryName" className="sr-only">
                  Ingrese el nombre de la categoría
                </label>
                <input
                  id="categoryName"
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-base shadow-sm placeholder-gray-500"
                  placeholder="Ingrese el nombre de la categoría"
                />
              </div>

              {/* Campo Iniciales (ocupa menos espacio) */}
              <div className="w-1/3">
                <label htmlFor="categoryInitials" className="sr-only">
                  Iniciales de la categoría
                </label>
                <input
                  id="categoryInitials"
                  type="text"
                  value={categoryInitials}
                  onChange={(e) => setCategoryInitials(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-base shadow-sm placeholder-gray-500"
                  placeholder="Iniciales (Ej. C)"
                  maxLength={5}
                />
              </div>
            </div>

            {/* Textarea para la descripción */}
            <div>
              <label htmlFor="categoryDescription" className="sr-only">
                Descripción de la categoría (opcional)
              </label>
              <textarea
                id="categoryDescription"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-base shadow-sm placeholder-gray-500 min-h-[120px]"
                placeholder="Descripción de la categoría (opcional)"
              ></textarea>
            </div>

            {/* Botón Guardar cambios */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition-colors shadow-md"
              >
                {saveButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
