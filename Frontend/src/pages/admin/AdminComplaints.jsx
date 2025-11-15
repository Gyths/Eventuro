import React, { useState, useEffect } from "react";
import {
  BookmarkSquareIcon,
  EyeIcon,
  ChevronDownIcon,
  XMarkIcon,
  CalendarDaysIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  IdentificationIcon,
  CurrencyDollarIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
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

const API_ESTADOS = {
  ACCEPTED: "Aceptar",
  NEGATED: "Negar",
  PENDING: "Marcar como Pendiente",
};

const formatDate = (isoString) => {
  if (!isoString) return "Fecha desconocida";
  const date = new Date(isoString);
  return date.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StatusBadge = ({ estado }) => {
  let text, colorClasses;
  switch (estado) {
    case "Pendiente":
    case "PENDING":
      text = "Pendiente";
      colorClasses = "bg-yellow-100 text-yellow-800";
      break;
    case "ACCEPTED":
      text = "Aceptado";
      colorClasses = "bg-green-100 text-green-800";
      break;
    case "NEGATED":
      text = "Negado";
      colorClasses = "bg-red-100 text-red-800";
      break;
    default:
      text = estado;
      colorClasses = "bg-gray-100 text-gray-800";
  }
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses}`}
    >
      {text}
    </span>
  );
};

const capitalize = (s) => {
  if (typeof s !== "string" || !s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const listData = await EventuroApi({
        endpoint: "/complaint/list",
        method: "GET",
      });
      setComplaints(Array.isArray(listData) ? listData : []);
    } catch (err) {
      setError(err.message);
      Swal.fire(
        "Error",
        `No se pudieron cargar los reclamos: ${err.message}`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleViewDetails = async (complaintId) => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    setSelectedComplaint(null);
    try {
      const detailData = await EventuroApi({
        endpoint: `/complaint/${complaintId}/detail`,
        method: "GET",
      });
      setSelectedComplaint(detailData);
    } catch (err) {
      Swal.fire(
        "Error",
        `No se pudo cargar el detalle: ${err.message}`,
        "error"
      );
      handleCloseModal();
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedComplaint(null);
  };

  const handleChangeStatus = async (complaintId, currentStatus) => {
    const { value: newStatus } = await Swal.fire({
      title: "Actualizar Estado",
      text: `Selecciona el nuevo estado para el reclamo #${complaintId}:`,
      input: "select",
      inputOptions: API_ESTADOS,
      inputValue: currentStatus,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    });

    if (newStatus && newStatus !== currentStatus) {
      try {
        await EventuroApi({
          endpoint: `/complaint/${complaintId}/update`,
          method: "PUT",
          data: { state: newStatus },
        });

        Swal.fire(
          "¡Actualizado!",
          "El estado del reclamo ha sido cambiado.",
          "success"
        );
        fetchComplaints();
      } catch (err) {
        Swal.fire("Error", `No se pudo actualizar: ${err.message}`, "error");
      }
    }
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-6xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md w-full">
          <div className="border-b border-gray-200 p-6 sm:p-8 bg-gray-50/70">
            <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
              <BookmarkSquareIcon className="h-9 w-9 text-purple-600" />
              Libro de Reclamaciones
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Gestiona los reclamos y quejas de los usuarios.
            </p>
          </div>

          {/* Contenido (Tabla) */}
          <div className="p-0">
            {isLoading && (
              <div className="text-center p-12 text-gray-500">
                Cargando reclamos...
              </div>
            )}
            {error && (
              <div className="text-center p-12 text-red-600">
                <strong>Error:</strong> {error}
              </div>
            )}

            {!isLoading && !error && complaints.length === 0 && (
              <div className="text-center p-12 text-gray-500">
                No hay reclamos registrados por el momento.
              </div>
            )}

            {!isLoading && !error && complaints.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID Reclamo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Evento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Objetivo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {complaints.map((complaint, index) => (
                      <tr
                        key={complaint.complaintId}
                        className="transition-colors duration-150 hover:bg-gray-50/50 animate-fade-in-up"
                        style={{
                          animationFillMode: "both",
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{complaint.complaintId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(complaint.dateCreation)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {complaint.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {complaint.eventName}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {capitalize(complaint.target)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <StatusBadge estado={complaint.state} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() =>
                              handleViewDetails(complaint.complaintId)
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200"
                            title="Ver Detalle"
                          >
                            <EyeIcon className="h-4 w-4" />
                            Ver
                          </button>
                          <button
                            onClick={() =>
                              handleChangeStatus(
                                complaint.complaintId,
                                complaint.state
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                            title="Cambiar Estado"
                            disabled={
                              complaint.state === "ACCEPTED" ||
                              complaint.state === "NEGATED"
                            }
                          >
                            <ChevronDownIcon className="h-4 w-4" />
                            Estado
                          </button>
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

      {/* Modal de Detalle */}
      <ComplaintDetailModal
        complaint={selectedComplaint}
        isLoading={isModalLoading}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

// --- (Modal y DetailRow ) ---

function DetailRow({ label, value, span = 1, icon: Icon }) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : ""}>
      <dt className="text-sm font-medium text-gray-500 uppercase flex items-center gap-1.5">
        {Icon && <Icon className="h-4 w-4 text-gray-400" />}
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900">{value || "—"}</dd>
    </div>
  );
}

function ComplaintDetailModal({ complaint, isLoading, isOpen, onClose }) {
  if (!isOpen) return null;

  const renderModalContent = () => {
    if (isLoading || !complaint) {
      return (
        <div className="p-12 flex justify-center items-center">
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
        </div>
      );
    }

    return (
      <div className="p-6 overflow-y-auto space-y-6">
        <section>
          <h4 className="text-base font-semibold text-purple-700 mb-3">
            Información del Cliente
          </h4>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <DetailRow
              label="Nombre Completo"
              value={complaint.fullName}
              span={2}
              icon={UserIcon}
            />
            <DetailRow
              label="DNI"
              value={complaint.dni}
              icon={IdentificationIcon}
            />
            <DetailRow
              label="Email"
              value={complaint.email}
              icon={EnvelopeIcon}
            />
            <DetailRow
              label="Teléfono"
              value={complaint.phone}
              icon={PhoneIcon}
            />
            <DetailRow
              label="Menor de Edad"
              value={complaint.isMinor ? "Sí" : "No"}
            />
            <DetailRow
              label="Dirección"
              value={complaint.address}
              span={2}
              icon={MapPinIcon}
            />
          </dl>
        </section>

        <section>
          <h4 className="text-base font-semibold text-purple-700 mb-3">
            Detalles del Reclamo
          </h4>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <DetailRow label="Evento" value={complaint.eventName} />
            <DetailRow label="N° Ticket" value={complaint.ticketNum} />
            <DetailRow label="Tipo de Reclamo" value={complaint.type} />
            <DetailRow label="Tipo de Bien" value={complaint.itemType} />
            <DetailRow
              label="Monto Reclamado"
              value={
                complaint.amountClaimed ? `S/ ${complaint.amountClaimed}` : "—"
              }
              icon={CurrencyDollarIcon}
            />

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 uppercase flex items-center gap-1.5">
                <LinkIcon className="h-4 w-4 text-gray-400" />
                Evidencia
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {complaint.evidenceDownloadUrl ? (
                  <a
                    href={complaint.evidenceDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 hover:underline font-medium"
                  >
                    Descargar Evidencia (Abre en nueva pestaña)
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>

            <DetailRow
              label="Descripción del Bien"
              value={complaint.itemDescription}
              span={2}
            />
            <DetailRow
              label="Descripción del Reclamo"
              value={complaint.problemDescription}
              span={2}
            />
            <DetailRow
              label="Solución Esperada"
              value={complaint.expectedSolution}
              span={2}
            />
          </dl>
        </section>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm animate-fade-in-backdrop"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col animate-modal-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Detalle del Reclamo #{complaint?.complaintId || ""}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        {renderModalContent()}
      </div>
    </div>
  );
}
