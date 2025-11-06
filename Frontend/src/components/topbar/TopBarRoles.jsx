import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth/AuthContext";
import { EventuroApi } from "../../api";

import SearchBar from "./items/SearchBar";
import CategorySelector from "./items/CategorySelector";
import DateRangeSelector from "./items/DateRangeSelector";
import LocationSelector from "./items/LocationSelector";
import UserMenu from "./items/UserMenu";
import AuthButtons from "./items/AuthButtons";
import Linker from "./items/Linker";
import CreateOrganizerModal from "../CreateOrganizerModal";
import { BellIcon } from "@heroicons/react/24/outline";



import logo from "../../assets/logoB.svg";





export default function TopBarRoles({ filters, setFilters }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Click fuera de cuadro de notificaciones lo cierra
  const notifRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Carga de notificaciones por usuario que inicio sesion
  useEffect(() => {
    if (!isAuthenticated || !user?.userId) return;

    (async () => {
      try {
        const res = await EventuroApi({
          endpoint: `/orders/byUser/${user.userId}?pageSize=100`,
          method: "GET",
        });

        const now = new Date();
        const upcomingDays = 7; // dentro de 7 días
        const future = new Date();
        future.setDate(now.getDate() + upcomingDays);

        const notifs = [];

        for (const order of res.items ?? []) {
          for (const item of order.items ?? []) {
            const ev = item?.eventDate?.event;
            const startAt = item?.eventDate?.startAt ? new Date(item.eventDate.startAt) : null;
            if (!ev || !startAt) continue;

            const diff = startAt - now;
            const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

            if (diffDays < 0) continue; // evento ya pasó
            if (diffDays <= upcomingDays) {
              let text = `¡Tu evento "${ev.title}" `;
              if (diffDays === 0) text += "es hoy!";
              else if (diffDays === 1) text += "es mañana!";
              else text += `es en ${diffDays} días!`;

              notifs.push({ text, date: startAt, eventId: ev.eventId });
            }
          }
        }

        setNotifications(notifs);
      } catch (err) {
        console.error("Error cargando notificaciones:", err);
      }
    })();
  }, [isAuthenticated, user?.userId]);


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


        {/* Notificaciones */}
        {isAuthenticated && (
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setShowNotifications((v) => !v)}
              className={`px-4 py-2 rounded-xl font-semibold flex items-center justify-center transition-colors duration-200 ${
                isOrganizerApproved
                  ? "bg-white/10 border border-white/30 text-white hover:bg-white/20"
                  : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
              }`}
            >
              <BellIcon className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg p-2 z-50 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-sm p-2">No hay notificaciones</p>
                ) : (
                  notifications
                    .sort((a, b) => a.date - b.date)
                    .map((n, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-start border-b border-gray-200 py-2 px-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer"
                        onClick={() => navigate("/misTickets")} // ir a mis tickets al click
                      >
                        <span>{n.text}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // evita que se active el onClick del div
                            setNotifications((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            );
                          }}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                          aria-label="Cerrar notificación"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                )}
              </div>
            )}
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
        <div>{isAuthenticated ? <UserMenu isOrganizerApproved={isOrganizerApproved} /> : <AuthButtons />}</div>
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
