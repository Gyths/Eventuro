import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ListBulletIcon,
  PencilIcon,
  TrashIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config";
import AddCategoryModal from "../../components/create/AddCategoryModal";

import { EventuroApi } from "../../api";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await EventuroApi({
        endpoint: "/event-category",
        method: "GET",
      });

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

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (modalData) => {
    if (!editingCategory) return;
    const jsonBody = {
      initials: modalData.initials,
      description: modalData.name,
    };
    try {
      await EventuroApi({
        endpoint: `/event-category/${editingCategory.id}`,
        method: "PUT",
        data: jsonBody,
      });

      await Swal.fire(
        "¡Actualizado!",
        "La categoría ha sido modificada.",
        "success"
      );
      setIsEditModalOpen(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      await Swal.fire("Error", err.message, "error");
    }
  };

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
          await EventuroApi({
            endpoint: `/event-category/${id}`,
            method: "DELETE",
          });

          Swal.fire(
            "¡Eliminado!",
            "La categoría ha sido eliminada.",
            "success"
          );
          fetchCategories();
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery) {
      return categories;
    }
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-4xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md">
          <div className="border-b border-gray-200 p-6 sm:p-8 flex justify-between items-center bg-gray-50/70">
            <div>
              <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
                <ArchiveBoxIcon className="h-9 w-9 text-purple-600" />
                Categorías de eventos registrados
              </h3>
              <p className="mt-2 text-base text-gray-600">
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

          <div className="p-6 sm:p-8">
            {isLoading && <div className="text-center p-4">Cargando...</div>}
            {error && (
              <div className="text-center p-4 text-red-600">Error: {error}</div>
            )}

            {!isLoading && !error && (
              <>
                {/* Barra de búsqueda */}
                <div className="mb-4 relative">
                  <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm shadow-sm"
                  />
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Lógica de renderizado*/}
                {categories.length === 0 ? (
                  <div className="text-center p-6 text-gray-500">
                    No hay categorías registradas.
                  </div>
                ) : filteredCategories.length === 0 ? (
                  <div className="text-center p-6 text-gray-500">
                    No se encontraron categorías que coincidan con "
                    {searchQuery}".
                  </div>
                ) : (
                  // Tabla
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
                        {filteredCategories.map((category) => (
                          <tr
                            key={category.id}
                            className="transition-colors duration-150 hover:bg-purple-50/50"
                          >
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
                            <td className="px-6 py-4 whitespace-nowtwrap text-right text-sm font-medium space-x-2">
                              <button
                                onClick={() => handleEdit(category)}
                                className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-100 transition-colors"
                                title="Editar"
                              >
                                <PencilIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(category.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal*/}
      <AddCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleUpdateCategory}
        initialData={editingCategory}
      />
    </>
  );
}
