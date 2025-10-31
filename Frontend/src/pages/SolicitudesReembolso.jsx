import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const DUMMY_REQUESTS = [
  {
    id: 1,
    eventName: "Concierto de Rock Sinfónico",
    customerName: "Ana García",
    requestDate: "2025-10-26T14:30:00Z",
    tickets: ["A-101", "A-102"],
    status: "Pendiente", // 'Pendiente', 'Aceptado', 'Rechazado'
  },
  {
    id: 2,
    eventName: "Obra de Teatro: El Fantasma",
    customerName: "Carlos Mendoza",
    requestDate: "2025-10-25T09:15:00Z",
    tickets: ["VIP-03"],
    status: "Pendiente",
  },
  {
    id: 3,
    eventName: "Concierto de Rock Sinfónico",
    customerName: "Lucía Fernández",
    requestDate: "2025-10-24T18:00:00Z",
    tickets: ["G-501", "G-502", "G-503"],
    status: "Aceptado",
  },
];

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(DUMMY_REQUESTS);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleRequest = (id, newStatus) => {
    const actionText = newStatus === "Aceptado" ? "aceptar" : "rechazar";

    Swal.fire({
      title: `¿Estás seguro de ${actionText} este reembolso?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "Aceptado" ? "#10B981" : "#EF4444",
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests((currentRequests) =>
          currentRequests.map((req) =>
            req.id === id ? { ...req, status: newStatus } : req
          )
        );
        Swal.fire(
          `¡${newStatus}!`,
          `La solicitud ha sido marcada como "${newStatus}".`,
          "success"
        );
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-6xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md">
        {/* Encabezado */}
        <div className="border-b border-gray-200 p-6 sm:p-8 bg-gray-50/70">
          <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
            <ArrowUturnLeftIcon className="h-9 w-9 text-purple-600" />
            Solicitudes de Reembolso
          </h3>
          <p className="mt-2 text-base text-gray-600">
            Acepta o rechaza las solicitudes de reembolso para tus eventos.
          </p>
        </div>

        {/* Contenedor de la tabla */}
        <div className="p-0 sm:p-0">
          {isLoading && (
            <div className="text-center p-12">Cargando solicitudes...</div>
          )}

          {!isLoading && (
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
                      Tickets
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
                  {requests.map((req) => (
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
                              className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800"
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
                        {/* Botones de Acción (solo si está pendiente) */}
                        {req.status === "Pendiente" ? (
                          <>
                            <button
                              onClick={() => handleRequest(req.id, "Aceptado")}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200"
                              title="Aceptar"
                            >
                              <CheckIcon className="h-4 w-4" />
                              Aceptar
                            </button>
                            <button
                              onClick={() => handleRequest(req.id, "Rechazado")}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200"
                              title="Rechazar"
                            >
                              <XMarkIcon className="h-4 w-4" />
                              Rechazar
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400 text-xs italic">
                            Decidido
                          </span>
                        )}
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
  );
}
