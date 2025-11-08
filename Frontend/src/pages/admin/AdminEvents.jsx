import React, { useState, useEffect } from "react";

import { EventuroApi } from "../../api";
import { ClockIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

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

  const fetchPendingEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await EventuroApi({
        endpoint: "/event/to-approve",
        method: "GET",
      });

      setEvents(data && Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      setError(err.message);
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

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const handleApprove = async (eventId) => {
    const { value: percentage } = await Swal.fire({
      title: "Aprobar Evento",
      text: "Ingresa el porcentaje de comisión (ej: 5.25) para este evento:",
      input: "text",
      inputPlaceholder: "5.25",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Aprobar Evento",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#10B981",
      inputValidator: (value) => {
        if (!value) {
          return "¡Necesitas ingresar un valor!";
        }
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) {
          return "Por favor, ingresa un número válido (ej: 5.25)";
        }
      },
    });

    if (percentage) {
      const numPercentage = parseFloat(percentage);
      try {
        await EventuroApi({
          endpoint: `/event/${eventId}/approve`,
          method: "PUT",
          data: {
            status: "A",
            percentage: numPercentage,
          },
        });

        Swal.fire(
          "¡Aprobado!",
          "El evento ha sido aprobado y la comisión ha sido establecida.",
          "success"
        );

        fetchPendingEvents();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleReject = async (eventId) => {
    const result = await Swal.fire({
      title: "¿Rechazar este evento?",
      text: "Esta acción marcará el evento como 'Denegado' (D).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Sí, rechazar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await EventuroApi({
          endpoint: `/event/${eventId}/approve`,
          method: "PUT",
          data: {
            status: "D",
          },
        });

        Swal.fire(
          "¡Rechazado!",
          "El evento ha sido marcado como rechazado.",
          "success"
        );

        fetchPendingEvents();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

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
            key={event.eventId}
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
