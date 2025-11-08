import React, { useState, useEffect } from "react";
// --- CAMBIO ---
// Importamos el EventuroApi que maneja el token
import { EventuroApi } from "../../api";
import { ClockIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

// Helper para formatear la fecha
const formatDate = (isoString) => {
  if (!isoString) return "Fecha desconocida";
  const date = new Date(isoString);
  return date.toLocaleString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Lógica de Fetch ---
  const fetchPendingEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Usamos EventuroApi (esto está bien)
      const data = await EventuroApi({
        endpoint: "/event/to-approve",
        method: "GET",
      });

      // --- CAMBIO ---
      // El backend devuelve un objeto { items: [...] }, no un array.
      // Extraemos el array 'items' de la respuesta.
      setEvents(data && Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      setError(err.message);
      // ... (el resto del catch es igual)
      if (
        err.message.includes("401") ||
        err.message.toLowerCase().includes("token")
      ) {
        Swal.fire({
          icon: "error",
          title: "Error de Autenticación",
          text: "No se pudo verificar tu sesión. Por favor, inicia sesión de nuevo.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar eventos al montar el componente
  useEffect(() => {
    fetchPendingEvents();
  }, []);

  // --- Handlers para Acciones (Aprobar/Rechazar) ---
  const handleApprove = (eventId) => {
    // TODO: Reemplazar con la lógica de API real
    Swal.fire({
      icon: "info",
      title: "Endpoint Necesario",
      text: `Para aprobar, necesito el endpoint de TIPO POST (ej: /event/${eventId}/approve)`,
    });
    // Lógica futura:
    // 1. Mostrar confirmación con Swal.fire
    // 2. Llamar a EventuroApi({ endpoint: `/event/${eventId}/approve`, method: 'POST' })
    // 3. Si tiene éxito, llamar a fetchPendingEvents() para refrescar la lista.
  };

  const handleReject = (eventId) => {
    // TODO: Reemplazar con la lógica de API real
    Swal.fire({
      icon: "info",
      title: "Endpoint Necesario",
      text: `Para rechazar, necesito el endpoint de TIPO POST (ej: /event/${eventId}/reject)`,
    });
    // Lógica futura:
    // 1. Mostrar confirmación con Swal.fire
    // 2. Llamar a EventuroApi({ endpoint: `/event/${eventId}/reject`, method: 'POST' })
    // 3. Si tiene éxito, llamar a fetchPendingEvents() para refrescar la lista.
  };

  // --- Lógica de Renderizado ---
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center text-gray-500 py-12">
          Cargando eventos pendientes...
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-600 bg-red-50 p-6 m-6 rounded-lg">
          <strong>Error al cargar:</strong> {error}
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="text-center text-gray-500 py-12">
          ¡Buen trabajo! No hay eventos pendientes de aprobación.
        </div>
      );
    }

    return (
      <ul className="divide-y divide-gray-200">
        {events.map((event) => (
          <li
            key={event.eventId} // Asumo que el ID se llama 'eventId'
            className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-purple-50/50 transition-colors duration-150"
          >
            {/* Detalles del Evento */}
            <div className="flex-1 mb-4 sm:mb-0 pr-4">
              <h4 className="text-base font-semibold text-purple-800">
                {event.title || "Evento sin título"}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Organizador:{" "}
                <span className="font-medium">
                  {event.organizer?.companyName || "Desconocido"}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Solicitado: {formatDate(event.createdAt || event.updatedAt)}
              </p>
            </div>

            {/* Botones de Acción */}
            <div className="flex-shrink-0 flex gap-2">
              <button
                onClick={() => handleReject(event.eventId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200"
                title="Rechazar"
              >
                <XMarkIcon className="h-4 w-4" />
                Rechazar
              </button>
              <button
                onClick={() => handleApprove(event.eventId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200"
                title="Aprobar"
              >
                <CheckIcon className="h-4 w-4" />
                Aprobar
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-5xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md">
        {/* Encabezado */}
        <div className="border-b border-gray-200 p-6 sm:p-8 bg-gray-50/70">
          <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
            <ClockIcon className="h-9 w-9 text-purple-600" />
            Eventos Pendientes de Aprobación
          </h3>
          <p className="mt-2 text-base text-gray-600">
            Revisa y aprueba los nuevos eventos enviados por los organizadores.
          </p>
        </div>

        {/* Contenido (Lista) */}
        <div className="p-0">{renderContent()}</div>
      </div>
    </div>
  );
}
