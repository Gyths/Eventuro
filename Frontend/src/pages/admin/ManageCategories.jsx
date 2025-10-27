// src/pages/admin/ManageCategories.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ListBulletIcon,
  PencilIcon,
  TrashIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

import AddCategoryModal from "../../components/create/AddCategoryModal";

const API_URL = "http://localhost:4000/eventuro/api/event-category";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Función para cargar categorías (igual que en CategoriasCard)
  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const parsedData = (data || []).map((item) => ({
        id: item.eventCategoryId,
        name: item.description || "Sin nombre",
        initials: item.initials || "N/A",
        description: item.description || "",
      }));
      setCategories(parsedData);
    } catch (err) {
      setError(err.message || "No se pudieron cargar las categorías");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Lógica para los botones de editar/eliminar (placeholder)
  const handleEdit = (category) => {
    setEditingCategory(category); // Guarda el objeto completo
    setIsEditModalOpen(true); // Abre el modal
  };

  const handleUpdateCategory = async (modalData) => {
    if (!editingCategory) return;

    // JSON para el backend (igual que en 'Crear')
    const jsonBody = {
      initials: modalData.initials,
      description: modalData.name, // 'name' del modal es 'description' en tu backend
    };

    try {
      const response = await fetch(`${API_URL}/${editingCategory.id}`, {
        method: "PUT", // o 'PATCH' si tu backend lo prefiere
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(jsonBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      await Swal.fire(
        "¡Actualizado!",
        "La categoría ha sido modificada.",
        "success"
      );
      setIsEditModalOpen(false); // Cierra el modal
      setEditingCategory(null); // Limpia el estado
      fetchCategories(); // Refresca la lista
    } catch (err) {
      await Swal.fire("Error", err.message, "error");
    }
  };

  // --- LÓGICA DE ELIMINAR (DELETE) ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error ${response.status}`);
          }

          Swal.fire(
            "¡Eliminado!",
            "La categoría ha sido eliminada.",
            "success"
          );
          fetchCategories(); // Refresca la lista
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-4xl mx-auto">
          {/* Encabezado */}
          <div className="border-b border-gray-200 p-4 sm:p-5 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <ArchiveBoxIcon className="h-6 w-6 text-purple-600" />
                Categorías de eventos registrados
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Edita, elimina o gestiona las categorías existentes.
              </p>
            </div>
            <Link
              to="/admin/settings"
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              &larr; Volver a Ajustes
            </Link>
          </div>

          {/* Contenedor de la tabla */}
          <div className="p-4 sm:p-5">
            {isLoading && <div className="text-center p-4">Cargando...</div>}
            {error && (
              <div className="text-center p-4 text-red-600">Error: {error}</div>
            )}

            {!isLoading && !error && (
              <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Iniciales
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {category.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {category.initials}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(category)} // Pasa el objeto 'category' completo
                            className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-gray-100"
                            title="Editar"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)} // Pasa solo el 'id'
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100"
                            title="Eliminar"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* --- 3. RENDERIZA EL MODAL PARA EDICIÓN --- */}
      <AddCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleUpdateCategory}
        initialData={editingCategory} // Pasa los datos de la categoría al modal
      />
    </>
  );
}
