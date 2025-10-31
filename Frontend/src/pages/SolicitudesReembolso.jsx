import React, { useState, useEffect, useMemo } from "react";

import {
  ArrowUturnLeftIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

import { useAuth } from "../services/auth/AuthContext";
import { BASE_URL } from "../config.js";

const formatRequestDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function SolicitudesReembolso() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      const organizerId = user?.organizer?.organizerId;
      if (!organizerId) {
        setIsLoading(false);
        console.warn("No se encontró organizerId para cargar reembolsos.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/eventuro/api/tickets/refund-requests/${organizerId}`
        );
        if (!response.ok) {
          throw new Error("Error al cargar las solicitudes de reembolso.");
        }
        const data = await response.json();

        const mappedRequests = data.map((item) => ({
          id: item.ticketId,
          eventName: item.eventDate.event.title,
          customerName: `${item.owner.name} ${item.owner.lastName}`,
          requestDate: item.refundRequestedAt,
          tickets: [item.ticketId.toString()],
          status: "Pendiente",
        }));

        setRequests(mappedRequests);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error de Carga",
          text: error.message || "No se pudo conectar con el servidor.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchRequests();
    }
  }, [user]);

  const handleRequest = async (id, newStatus) => {
    const actionText = newStatus === "Aceptado" ? "aceptar" : "rechazar";
    const ticketId = id;

    const result = await Swal.fire({
      title: `¿Estás seguro de ${actionText} este reembolso?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "Aceptado" ? "#10B981" : "#EF4444",
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const endpoint =
        newStatus === "Aceptado"
          ? `${BASE_URL}/eventuro/api/tickets/${ticketId}/approve-refund`
          : `${BASE_URL}/eventuro/api/tickets/${ticketId}/reject-refund`;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Error al ${actionText} la solicitud.`
          );
        }

        setRequests((currentRequests) =>
          currentRequests.map((req) =>
            req.id === ticketId ? { ...req, status: newStatus } : req
          )
        );

        Swal.fire(
          `¡${newStatus}!`,
          `La solicitud ha sido marcada como "${newStatus}".`,
          "success"
        );
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error en la operación",
          text: error.message,
        });
      }
    }
  };

  const filteredRequests = useMemo(() => {
    if (!searchTerm) {
      return requests;
    }
    return requests.filter((req) =>
      req.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [requests, searchTerm]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-6xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="border-b border-gray-200 p-6 sm:p-8 bg-gray-50/70">
          <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
            <ArrowUturnLeftIcon className="h-9 w-9 text-purple-600" />
            Solicitudes de Reembolso
          </h3>
          <p className="mt-2 text-base text-gray-600">
            Acepta o rechaza las solicitudes de reembolso para tus eventos.
          </p>
        </div>

        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="search-event"
              id="search-event"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Buscar por nombre de evento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-0 sm:p-0">
          {isLoading && (
            <div className="text-center p-12 text-gray-600">
              Cargando solicitudes...
            </div>
          )}

          {!isLoading && filteredRequests.length === 0 && (
            <div className="text-center p-12 text-gray-500">
              {requests.length === 0
                ? "No hay solicitudes de reembolso pendientes."
                : "No se encontraron eventos con ese nombre."}
            </div>
          )}

          {!isLoading && filteredRequests.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Evento
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cliente
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Fecha de Solicitud
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ticket ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="transition-colors duration-150 hover:bg-purple-50/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {req.eventName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {req.customerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {formatRequestDate(req.requestDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {req.tickets.map((ticketId) => (
                            <span
                              key={ticketId}
                              className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800 font-mono"
                            >
                              {ticketId}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            req.status === "Pendiente"
                              ? "bg-yellow-100 text-yellow-800"
                              : req.status === "Aceptado"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        {req.status !== "Aceptado" && (
                          <button
                            onClick={() => handleRequest(req.id, "Aceptado")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200"
                            title="Aceptar"
                          >
                            <CheckIcon className="h-4 w-4" />
                            Aceptar
                          </button>
                        )}

                        {req.status !== "Rechazado" && (
                          <button
                            onClick={() => handleRequest(req.id, "Rechazado")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200"
                            title="Rechazar"
                          >
                            <XMarkIcon className="h-4 w-4" />
                            Rechazar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && requests.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-600 text-right">
              Mostrando {filteredRequests.length} de {requests.length}{" "}
              solicitudes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
