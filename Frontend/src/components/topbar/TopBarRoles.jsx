import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth/AuthContext";

import SearchBar from "./items/SearchBar";
import CategorySelector from "./items/CategorySelector";
import DateRangeSelector from "./items/DateRangeSelector";
import LocationSelector from "./items/LocationSelector";
import UserMenu from "./items/UserMenu";
import AuthButtons from "./items/AuthButtons";
import Linker from "./items/Linker";
import CreateOrganizerModal from "../CreateOrganizerModal";


import logo from "../../assets/logoB.svg";

export default function TopBarRoles({ filters, setFilters }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ---- Roles / estado del usuario ----
  const roles = user?.roles || [];
  const organizerStatus = user?.organizerStatus; // "APPROVED" | "PENDING" | "REJECTED"
  const isAdmin = roles.includes("ADMIN");
  const isOrganizer = roles.includes("ORGANIZER") || isAdmin;
  const isOrganizerApproved = isOrganizer && organizerStatus === "APPROVED";

  // ---- Panel de filtros (Joinnus style) ----
  const [expanded, setExpanded] = useState(false);

  // ---- Modal para solicitar rol de organizador ----
  const [openModal, setOpenModal] = useState(false);
  const handleOrganizerSuccess = () => {
    window.location.href = "/crearEvento";
  };

  // ---- Funciones auxiliares ----
  function updateFilters(patch) {
    setFilters?.((prev) => ({ ...(prev ?? {}), ...patch }));
  }

  function handleBuscar() {
    if (pathname !== "/home") navigate("/home");
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
    setOpenModal(true);
  }


  const showAdminLinks = isAdmin;

  return (
    <div className="flex w-full items-center justify-between px-6">
      {/* ========= IZQUIERDA: LOGO + BUSCADOR ========= */}
      <div className="flex items-center gap-3 flex-1 max-w-4xl mx-4">
        {/* Logo (opcional) */}


        <div className="relative flex-1">
          <div
            className={`flex items-center bg-white/95 rounded-full px-4 py-1.5 shadow-md transition-all duration-200 ${
              expanded ? "ring-2 ring-purple-300" : ""
            }`}
          >
            <SearchBar
              placeholder="Buscar por eventos, artistas o lugares…"
              onSearch={(q) => updateFilters({ query: q })}
              onEnter={handleBuscar}
            />

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="ml-2 text-xs rounded-full border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100"
            >
              Filtros
            </button>
          </div>

          {/* ========= PANEL DE FILTROS ========= */}
          {expanded && (
            <div className="absolute z-50 left-0 right-0 bg-white shadow-2xl rounded-2xl p-4 mt-2">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[150px]">
                  <CategorySelector
                    value={filters?.category ?? null}
                    onChange={(category) => updateFilters({ category })}
                  />
                </div>

                <div className="flex-1 min-w-[220px]">
                  <DateRangeSelector
                    from={filters?.dateFrom ?? null}
                    to={filters?.dateTo ?? null}
                    onChange={({ from, to }) =>
                      updateFilters({ dateFrom: from, dateTo: to })
                    }
                  />
                </div>

                <div className="flex-1 min-w-[200px]">
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
      </div>

      {/* ========= DERECHA: ACCIONES ========= */}
      <div className="flex items-center gap-3">
        {/* 🔒 Bloque de enlaces de ADMIN (solo visibles si isAdmin) */}
        {showAdminLinks && (
          <div className="hidden lg:flex items-center gap-2 mr-1">
            <Linker label="Dashboard" icon="dashboard" to="/admin/dashboard" activeMatch="/admin/dashboard" />
            <Linker label="Ajustes" icon="cog" to="/admin/settings" activeMatch="/admin/settings" />
            <Linker label="Eventos" icon="calendar-days" to="/admin/events" activeMatch="/admin/events" />
            <Linker label="Libro de reclamaciones" icon="book-open" to="/admin/complaints" activeMatch="/admin/complaints" />
            <Linker label="Usuarios" icon="user-circle" to="/admin/users" activeMatch="/admin/users" />
            <Linker label="Logs" icon="document-log" to="/admin/logs" activeMatch="/admin/logs" />
          </div>
        )}

        {/* Opciones del organizador aprobado */}
        {isOrganizerApproved && (
          <div className="hidden md:flex items-center gap-2">
            <Linker
              label="Reportes"
              icon="chart-bar"
              to="/reports"
              activeMatch="/reports"
            />
            <Linker
              label="Mis Eventos"
              icon="calendar-days"
              to="/my-events"
              activeMatch="/my-events"
            />
          </div>
        )}

        {/* Botón Crear Evento */}
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

        {/* Menú usuario / auth */}
        <div>{isAuthenticated ? <UserMenu /> : <AuthButtons />}</div>
      </div>

      {/* Modal para solicitud de organizador */}
      <CreateOrganizerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleOrganizerSuccess}
      />
    </div>
  );
}
