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
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { EventuroApi } from "../../api";

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
  @keyframes fade-in-backdrop {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in-backdrop {
    animation: fade-in-backdrop 0.2s ease-out forwards;
  }
  @keyframes modal-scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-modal-scale-in {
    animation: modal-scale-in 0.3s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
  }
`;

const formatRequestDate = (isoString) => {
  if (!isoString) return "Fecha desconocida";

  const localIsoString = isoString.slice(0, -1);

  const date = new Date(localIsoString);

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
    case "INSERT":
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

function generateDescription(log) {
  const userId = log.actorUserId || "Sistema";
  const op = log.operationType;
  const table = log.targetTableName;
  const pk = extractId(log.primaryKeyJson);

  let actionText = "";
  let entityText = `un registro en ${table}`;

  if (op === "INSERT") {
    actionText = "creó";
  } else if (op === "UPDATE") {
    actionText = "actualizó";
  } else if (op === "DELETE") {
    actionText = "eliminó";
  } else {
    return `El usuario con (ID: ${userId}) realizó [${op}] en ${table} con ${pk}.`;
  }

  if (table === "EventCategory") {
    entityText = "una categoría";
  } else if (table === "Event") {
    entityText = "un evento";
  } else if (table === "User") {
    entityText = "un usuario";
  }

  return `El usuario con (ID: ${userId}) ${actionText} ${entityText} con ${pk}.`;
}

function extractId(pkJson) {
  if (!pkJson) return "(ID: ?)";
  try {
    const obj = typeof pkJson === "string" ? JSON.parse(pkJson) : pkJson;
    const keys = Object.keys(obj);
    if (keys.length > 0) {
      return `(${keys[0]}: ${obj[keys[0]]})`;
    }
    return "(ID: ?)";
  } catch (e) {
    return "(ID: ?)";
  }
}

const LOGS_PER_PAGE = 15;

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalLogs, setTotalLogs] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState(null);

  useEffect(() => {
    const fetchLogs = async (pageNum) => {
      try {
        setIsLoading(true);
        setError(null);
        const skip = (pageNum - 1) * LOGS_PER_PAGE;
        const endpoint = `/audit?take=${LOGS_PER_PAGE}&skip=${skip}&order=desc`;
        const data = await EventuroApi({
          endpoint: endpoint,
          method: "GET",
        });
        if (data && Array.isArray(data.items)) {
          setLogs(data.items || []);
          setTotalPages(data.totalPages || 0);
          setTotalLogs(data.total || 0);
        } else if (Array.isArray(data)) {
          setLogs(data);
          setTotalLogs(data.length);
          setTotalPages(1);
        } else {
          setLogs([]);
          setTotalPages(0);
          setTotalLogs(0);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error en fetchLogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs(page);
  }, [page]);

  const handleShowDetails = (id) => {
    setSelectedLogId(id);
    setIsDetailModalOpen(true);
  };
  const handleCloseDetails = () => {
    setIsDetailModalOpen(false);
    setSelectedLogId(null);
  };
  const handlePrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };
  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-5xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md w-full">
          {/* Encabezado */}
          <div className="border-b border-gray-200 p-6 sm:p-8 bg-gray-50/70">
            <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
              <ClipboardDocumentListIcon className="h-9 w-9 text-purple-600" />
              Registro de Auditoría
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Actividad reciente de administradores y organizadores en el
              sistema.
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
                      Aún no se ha registrado ninguna actividad.
                    </p>
                  </div>
                ) : (
                  <ul className="-mb-8">
                    {logs.map((log, logIdx) => (
                      <li
                        key={log.auditTransactionId}
                        className="animate-fade-in-up"
                        style={{
                          animationFillMode: "both",
                          animationDelay: `${logIdx * 100}ms`,
                        }}
                      >
                        <div className="relative pb-8">
                          {logIdx !== logs.length - 1 ? (
                            <span
                              className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <ActionIcon action={log.operationType} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-800">
                                {generateDescription(log)}
                              </p>

                              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <UserIcon className="h-3.5 w-3.5" />
                                  Usuario ID: {log.actorUserId || "Sistema"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <TagIcon className="h-3.5 w-3.5" />
                                  Entidad: {log.targetTableName}{" "}
                                  {extractId(log.primaryKeyJson)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="h-3.5 w-3.5" />
                                  {formatRequestDate(log.createdAt)}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleShowDetails(log.auditTransactionId)
                                }
                                className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200"
                              >
                                <EyeIcon className="h-4 w-4" />
                                Ver Cambios
                              </button>
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

          {/* Paginación */}
          {!isLoading && totalLogs > 0 && totalPages > 1 && (
            <div className="border-t border-gray-200 bg-gray-50/70 px-6 py-3 flex items-center justify-between text-sm">
              <p className="text-gray-600">
                Mostrando{" "}
                <span className="font-medium">
                  {(page - 1) * LOGS_PER_PAGE + 1}
                </span>
                {" - "}
                <span className="font-medium">
                  {Math.min(page * LOGS_PER_PAGE, totalLogs)}
                </span>{" "}
                de <span className="font-medium">{totalLogs}</span> registros
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Anterior
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <LogDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetails}
        auditTransactionId={selectedLogId}
      />
    </>
  );
}

// --- (Modal de Detalle) ---
function LogDetailModal({ isOpen, onClose, auditTransactionId }) {
  const [changes, setChanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !auditTransactionId) {
      setChanges([]);
      return;
    }
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await EventuroApi({
          endpoint: `/audit/${auditTransactionId}`,
          method: "GET",
        });
        setChanges(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [isOpen, auditTransactionId]);

  const renderValue = (value) => {
    if (value === null || typeof value === "undefined") {
      return <span className="text-gray-400 italic">N/A</span>;
    }
    let valToShow;
    try {
      valToShow = typeof value === "string" ? JSON.parse(value) : value;
    } catch (e) {
      valToShow = value;
    }
    if (typeof valToShow === "object" && valToShow !== null) {
      return (
        <pre className="text-xs bg-gray-100 p-1 rounded overflow-x-auto">
          {JSON.stringify(valToShow, null, 2)}
        </pre>
      );
    }
    return <span className="text-gray-700">{String(valToShow)}</span>;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm animate-fade-in-backdrop"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-modal-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Detalle de Cambios (ID: {auditTransactionId})
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage error={error} />}
          {!isLoading && !error && changes.length === 0 && (
            <div className="text-center text-gray-500 py-6">
              No se encontraron cambios detallados para esta transacción.
            </div>
          )}
          {!isLoading && !error && changes.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Columna
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor Anterior
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor Nuevo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {changes.map((change) => (
                    <tr key={change.auditChangeId || change.columnName}>
                      <td className="px-4 py-3 align-top">
                        <span className="font-mono text-sm font-medium text-purple-700">
                          {change.columnName}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        {renderValue(change.oldValueJson)}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {renderValue(change.newValueJson)}
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
