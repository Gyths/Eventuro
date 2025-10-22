// src/components/topbar/variants/UserVariant.jsx
import React, { useState } from "react";
import SearchBar from "../items/SearchBar";
import { useAuth } from "../../../services/auth/AuthContext";
import UserMenu from "../items/UserMenu";
import AuthButtons from "../items/AuthButtons";
import FilterPill from "../items/FilterPill";
import CategorySelector from "../items/CategorySelector";
import DateRangeSelector from "../items/DateRangeSelector";
import LocationSelector from "../items/LocationSelector";
import CreateOrganizerModal from "../../CreateOrganizerModal"; 

export default function UserVariant({ filters, setFilters }) {
  const { isAuthenticated } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  function updateFilters(patch) {
    const next = { ...filters, ...patch };
    setFilters?.(next);
  }

  const handleSuccess = (data) => {
    // data.user.roles ya debería incluir ORGANIZER y tienes organizerStatus
    // Como pediste: con la respuesta misma, redirigimos.
    window.location.href = "/crearEvento";
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 w-full">
        {/* === IZQUIERDA: SEARCH === */}
        <div className="relative flex items-center justify-start w-[320px]">
          <SearchBar />
        </div>

        {/* === CENTRO: FILTROS === */}
        <div className="flex items-center justify-center gap-4 ml-70">
          <div className="z-10">
            <FilterPill label="Categoría" icon="category">
              <CategorySelector
                value={filters.category}
                onChange={(category) => updateFilters({ category })}
              />
            </FilterPill>
          </div>

          <FilterPill label="Fecha" icon="date">
            <DateRangeSelector
              from={filters.dateFrom}
              to={filters.dateTo}
              onChange={({ from, to }) =>
                updateFilters({ dateFrom: from, dateTo: to })
              }
            />
          </FilterPill>

          <FilterPill label="Ubicación" icon="location">
            <LocationSelector
              value={filters.location}
              onChange={(location) => updateFilters({ location })}
            />
          </FilterPill>
        </div>

        {/* === DERECHA: BOTÓN CREAR EVENTO + MENÚ USUARIO === */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {isAuthenticated && (
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition"
              onClick={() => setOpenModal(true)}  // 👈 abre modal SIEMPRE
            >
              Crear evento
            </button>
          )}
          <div>{isAuthenticated ? <UserMenu /> : <AuthButtons />}</div>
        </div>
      </div>

      {/* Modal */}
      <CreateOrganizerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
