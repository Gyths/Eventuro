import React, { useState, useEffect } from "react";
import {
  ClipboardDocumentListIcon,
  TagIcon,
  CalendarIcon,
  UserIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { BASE_URL } from "../../config";

const animationStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.4s ease-out forwards;
  }
`;

const formatRequestDate = (isoString) => {
  if (!isoString) return "Fecha desconocida";
  const date = new Date(isoString);
  return date.toLocaleString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

function ActionIcon({ action }) {
  let icon, bgColor;

  switch (action) {
    case "CREATE":
      icon = <PlusIcon className="h-5 w-5 text-white" />;
      bgColor = "bg-green-500";
      break;
    case "UPDATE":
      icon = <PencilIcon className="h-5 w-5 text-white" />;
      bgColor = "bg-yellow-500";
      break;
    case "DELETE":
      icon = <TrashIcon className="h-5 w-5 text-white" />;
      bgColor = "bg-red-500";
      break;
    default:
      icon = <QuestionMarkCircleIcon className="h-5 w-5 text-white" />;
      bgColor = "bg-gray-400";
  }

  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full ${bgColor} shadow-sm`}
    >
      {icon}
    </span>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-20">
      <svg
        className="animate-spin h-8 w-8 text-purple-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="ml-3 text-gray-600 font-medium">
        Cargando registros...
      </span>
    </div>
  );
}

/**
 * Componente de Error
 */
function ErrorMessage({ error }) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Error al cargar los registros
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${BASE_URL}/eventuro/api/audit/list`);
        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: No se pudo obtener la lista de logs.`
          );
        }
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
        console.error("Error en fetchLogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <>
      {/* Hoja de estilos en línea para las animaciones */}
      <style>{animationStyles}</style>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-5xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md">
          {/* Encabezado */}
          <div className="border-b border-gray-200 p-6 sm:p-8 bg-gray-50/70">
            <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
              <ClipboardDocumentListIcon className="h-9 w-9 text-purple-600" />
              Registro de Auditoría
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Actividad reciente de los administradores en el sistema.
            </p>
          </div>

          {/* Cuerpo - Contenedor del Timeline */}
          <div className="p-6 sm:p-8">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage error={error} />}

            {!isLoading && !error && (
              <div className="flow-root">
                {logs.length === 0 ? (
                  <div className="text-center p-12 text-gray-500">
                    <ClipboardDocumentListIcon className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-800">
                      No hay registros
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Aún no se ha registrado ninguna acción de administrador.
                    </p>
                  </div>
                ) : (
                  <ul className="-mb-8">
                    {logs.map((log, logIdx) => (
                      <li
                        key={log.auditLogId}
                        className="animate-fade-in-up"
                        style={{
                          animationFillMode: "both",
                          animationDelay: `${logIdx * 100}ms`,
                        }}
                      >
                        <div className="relative pb-8">
                          {/* Línea de conexión (excepto para el último) */}
                          {logIdx !== logs.length - 1 ? (
                            <span
                              className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}

                          <div className="relative flex items-start space-x-3">
                            {/* Ícono de Acción */}
                            <div className="relative">
                              <ActionIcon action={log.action} />
                            </div>

                            {/* Contenido del Log */}
                            <div className="min-w-0 flex-1">
                              {/* Descripción principal */}
                              <p className="text-sm font-medium text-gray-800">
                                {log.description}
                              </p>

                              {/* Metadatos */}
                              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <UserIcon className="h-3.5 w-3.5" />
                                  Admin ID: {log.administratorId}
                                </span>
                                <span className="flex items-center gap-1">
                                  <TagIcon className="h-3.5 w-3.5" />
                                  Entidad: {log.entityName} (ID: {log.entityId})
                                </span>
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="h-3.5 w-3.5" />
                                  {formatRequestDate(log.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
