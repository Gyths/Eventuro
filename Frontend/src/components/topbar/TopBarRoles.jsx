// src/components/topbar/TopBarRoles.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth/AuthContext";

import CategorySelector from "./items/CategorySelector";
import DateRangeSelector from "./items/DateRangeSelector";
import LocationSelector from "./items/LocationSelector";
import UserMenu from "./items/UserMenu";
import AuthButtons from "./items/AuthButtons";
import Linker from "./items/Linker";
import CreateOrganizerModal from "../CreateOrganizerModal";

export default function TopBarRoles({ filters, setFilters }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ---- Roles / estado de organizador
  const roles = user?.roles || [];
  const organizerStatus = user?.organizerStatus; // "APPROVED" | "PENDING" | "REJECTED" | undefined
  const isOrganizer = roles.includes("ORGANIZER") || roles.includes("ADMIN");
  const isOrganizerApproved = isOrganizer && organizerStatus === "APPROVED";

  // ---- Buscador expandible tipo Joinnus
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");

  // ---- Modal Solicitud de Organizador
  const [openModal, setOpenModal] = useState(false);
  const handleOrganizerSuccess = () => {
    window.location.href = "/crearEvento";
  };

  function updateFilters(patch) {
    const next = { ...(filters || {}), ...patch };
    setFilters?.(next);
  }

  function handleBuscar() {
    // Aquí puedes disparar navegación o levantar un evento al Home
    // Ej.: navigate(`/buscar?q=${encodeURIComponent(query)}`)
    setExpanded(false);
  }

  function handleCrearEvento() {
    if (isOrganizerApproved) {
      navigate("/crearEvento");
      return;
    }
    if (isOrganizer && organizerStatus === "PENDING") {
      alert("Tu perfil de organizador está en revisión.");
      return;
    }
    // No es organizador (o rechazado): abrir el modal de solicitud
    setOpenModal(true);
  }

  return (
    <div className="flex w-full items-center justify-between px-6">
      {/* ========= IZQUIERDA: BUSCADOR + FILTROS INTEGRADOS ========= */}
      <div className="relative flex-1 max-w-4xl mx-4">
        <div
          className={`flex items-center bg-white/95 rounded-full px-4 py-2 shadow-md transition-all duration-200 ${
            expanded ? "ring-2 ring-purple-300" : ""
          }`}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setExpanded(true)}
            placeholder="Buscar por eventos, artistas o lugares…"
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
          />

          {/* Botón para mostrar el panel de filtros (opcional) */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="ml-2 text-xs rounded-full border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-100"
            title="Filtros"
          >
            Filtros
          </button>
        </div>

        {/* Panel “Joinnus-like” */}
        {expanded && (
          <div className="absolute z-50 left-0 right-0 bg-white shadow-2xl rounded-2xl p-4 mt-2">
            <div className="flex flex-wrap gap-3">
              <div className="min-w-[180px]">
                <CategorySelector
                  value={filters?.category ?? null}
                  onChange={(category) => updateFilters({ category })}
                />
              </div>

              <div className="min-w-[260px]">
                <DateRangeSelector
                  from={filters?.dateFrom ?? null}
                  to={filters?.dateTo ?? null}
                  onChange={({ from, to }) => updateFilters({ dateFrom: from, dateTo: to })}
                />
              </div>

              <div className="min-w-[220px]">
                <LocationSelector
                  value={filters?.location ?? ""}
                  onChange={(location) => updateFilters({ location })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleBuscar}
                className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
              >
                Buscar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========= DERECHA: ACCIONES SEGÚN ROL ========= */}
      <div className="flex items-center gap-3">
        {/* Bloque de acciones de organizador (solo si está aprobado) */}
        {isOrganizerApproved && (
          <div className="hidden md:flex items-center gap-2">
            <Linker label="Reportes" icon="chart-bar" to="/reports" activeMatch="/reports" />
            <Linker label="Mis Eventos" icon="calendar-days" to="/my-events" activeMatch="/my-events" />
          </div>
        )}

        {/* Crear evento (si organizador aprobado navega; si no, abre modal) */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={handleCrearEvento}
            className={`px-4 py-2 rounded-xl font-semibold ${
              isOrganizerApproved
                ? "bg-white/10 border border-white/30 text-white hover:bg-white/20"
                : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
            }`}
          >
            Crear evento
          </button>
        )}

        {/* Menú usuario o botones de auth */}
        <div>{isAuthenticated ? <UserMenu /> : <AuthButtons />}</div>
      </div>

      {/* Modal de solicitud de organizador */}
      <CreateOrganizerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleOrganizerSuccess}
      />
    </div>
  );
}
