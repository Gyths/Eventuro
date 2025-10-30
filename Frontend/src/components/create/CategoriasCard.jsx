import React, { useState, useEffect } from "react";
import AddCategoryModal from "./AddCategoryModal";
import Swal from "sweetalert2";
import {
  ListBulletIcon,
  PlusCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:4000/eventuro/api/event-category";

export default function CategoriasCard() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    if (categories.length === 0) setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const parsedData = (data || []).map((item) => ({
        id: item.eventCategoryId,
        name: item.description || item.name,
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
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveCategory = async (modalData) => {
    const jsonBody = {
      initials: modalData.initials,
      description: modalData.name,
    };
    setIsSaving(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(jsonBody),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }
      await Swal.fire({
        icon: "success",
        title: "¡Categoría Creada!",
        text: "La nueva categoría se ha guardado correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
      handleCloseModal();
      fetchCategories();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error al Guardar",
        text: err.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-4xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="p-6 sm:p-8 bg-gray-50/70 border-b border-gray-200">
          <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
            <ListBulletIcon className="h-9 w-9 text-purple-600" />
            <span>Gestión de categorías de eventos</span>
          </h3>
          <p className="mt-2 text-base text-gray-600">
            Algunas de las categorías registradas:
          </p>
        </div>

        {/* Cuerpo de la Tarjeta*/}
        <div className="p-6 sm:p-8 pt-6 min-h-[150px] flex items-center justify-center">
          {isLoading && (
            <div className="text-center text-gray-500 py-10 w-full">
              Cargando categorías...
            </div>
          )}
          {error && !isLoading && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg w-full">
              <strong>Error:</strong> {error}
            </div>
          )}
          {!isLoading && !error && categories.length > 0 && (
            <div className="flex flex-wrap gap-3 w-full justify-center">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="px-4 py-2 rounded-lg bg-purple-100 text-purple-800 font-medium text-sm shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-default"
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
          {!isLoading && !error && categories.length === 0 && (
            <div className="text-center text-gray-500 py-10 w-full">
              No se encontraron categorías registradas.
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-4 bg-gray-50/70">
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors shadow-sm"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Crear nueva categoría
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-purple-700 font-semibold text-sm border border-purple-200 hover:bg-purple-50 transition-colors shadow-sm"
          >
            Ver todas las categorías
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCategory}
      />
    </>
  );
}
