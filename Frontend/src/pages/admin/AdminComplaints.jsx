import React, { useState, useEffect } from "react";
import {
  ListBulletIcon,
  EyeIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

// --- DATOS SIMULADOS ---
const DUMMY_COMPLAINTS = [
  {
    id: 1001,
    estado: "Pendiente",
    fecha: "2025-11-08T10:30:00Z",
    cliente: {
      nombres: "Ana",
      primerApellido: "García",
      segundoApellido: "Pérez",
      telefono: "987654321",
      email: "ana.garcia@example.com",
      numeroDocumento: "45678901",
      provincia: "Lima",
      distrito: "Miraflores",
      direccion: "Av. Larco 123",
      menorEdad: false,
    },
    detalle: {
      nombreEvento: "Concierto de Rock Sinfónico",
      numeroTicket: "A-102",
      montoReclamado: "150.00",
      tipoBien: "Servicio",
      tipoReclamo: "Reclamo por cobro/compra",
      descripcionBien: "Entrada VIP",
      descripcionReclamo: "Me cobraron doble en la tarjeta de crédito.",
      solucionEsperada: "Devolución de uno de los cobros.",
      evidenciaNombre: "voucher.pdf",
    },
  },
  {
    id: 1002,
    estado: "En revisión",
    fecha: "2025-11-07T14:15:00Z",
    cliente: {
      nombres: "Carlos",
      primerApellido: "Mendoza",
      segundoApellido: "Ruiz",
      telefono: "912345678",
      email: "carlos.mendoza@example.com",
      numeroDocumento: "12345678",
      provincia: "Arequipa",
      distrito: "Yanahuara",
      direccion: "Calle Misti 456",
      menorEdad: false,
    },
    detalle: {
      nombreEvento: "Obra de Teatro: El Fantasma",
      numeroTicket: "B-003",
      montoReclamado: "",
      tipoBien: "Servicio",
      tipoReclamo: "Reclamo por atención del organizador",
      descripcionBien: "Servicio de atención al cliente",
      descripcionReclamo:
        "El personal de la entrada fue muy grosero y no me dejaron entrar a tiempo, me perdí los primeros 10 minutos.",
      solucionEsperada: "Una disculpa formal y una compensación.",
      evidenciaNombre: null,
    },
  },
  {
    id: 1003,
    estado: "Resuelto",
    fecha: "2025-11-05T09:00:00Z",
    cliente: {
      nombres: "Lucía",
      primerApellido: "Fernández",
      segundoApellido: "",
      telefono: "955443322",
      email: "lucia.fernandez@example.com",
      numeroDocumento: "87654321",
      provincia: "Lima",
      distrito: "Surco",
      direccion: "Jr. Montebello 789",
      menorEdad: false,
    },
    detalle: {
      nombreEvento: "Página Web General",
      numeroTicket: "",
      montoReclamado: "",
      tipoBien: "Producto",
      tipoReclamo: "Reclamo por funcionamiento de página",
      descripcionBien: "Página de pago",
      descripcionReclamo: "La página se colgó al momento de pagar.",
      solucionEsperada: "Que arreglen la página.",
      evidenciaNombre: "screenshot.png",
    },
  },
];

const RECLAMO_ESTADOS = ["Pendiente", "En revisión", "Resuelto"];

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
  let colorClasses = "";
  switch (estado) {
    case "Pendiente":
      colorClasses = "bg-yellow-100 text-yellow-800";
      break;
    case "En revisión":
      colorClasses = "bg-blue-100 text-blue-800";
      break;
    case "Resuelto":
      colorClasses = "bg-green-100 text-green-800";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800";
  }
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses}`}
    >
      {estado}
    </span>
  );
};

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setComplaints(DUMMY_COMPLAINTS);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedComplaint(null);
  };

  const handleChangeStatus = async (complaintId) => {
    const complaint = complaints.find((c) => c.id === complaintId);
    if (!complaint) return;

    const { value: newStatus } = await Swal.fire({
      title: "Actualizar Estado",
      text: `Selecciona el nuevo estado para el reclamo #${complaintId}:`,
      input: "select",
      inputOptions: {
        Pendiente: "Pendiente",
        "En revisión": "En revisión",
        Resuelto: "Resuelto",
      },
      inputValue: complaint.estado,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    });

    if (newStatus && newStatus !== complaint.estado) {
      setComplaints((currentComplaints) =>
        currentComplaints.map((c) =>
          c.id === complaintId ? { ...c, estado: newStatus } : c
        )
      );
      Swal.fire(
        "¡Actualizado!",
        "El estado del reclamo ha sido cambiado.",
        "success"
      );
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-6xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md w-full">
          {/* Encabezado */}
          <div className="border-b border-gray-200 p-6 sm:p-8 bg-gray-50/70">
            <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
              <ListBulletIcon className="h-9 w-9 text-amber-500" />
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

            {!isLoading && complaints.length === 0 && (
              <div className="text-center p-12 text-gray-500">
                No hay reclamos registrados por el momento.
              </div>
            )}

            {!isLoading && complaints.length > 0 && (
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
                        Estado
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {complaints.map((complaint) => (
                      <tr
                        key={complaint.id}
                        className="transition-colors duration-150 hover:bg-gray-50/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{complaint.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(complaint.fecha)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {complaint.cliente.nombres}{" "}
                          {complaint.cliente.primerApellido}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {complaint.detalle.nombreEvento}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <StatusBadge estado={complaint.estado} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleViewDetails(complaint)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200"
                            title="Ver Detalle"
                          >
                            <EyeIcon className="h-4 w-4" />
                            Ver
                          </button>
                          <button
                            onClick={() => handleChangeStatus(complaint.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                            title="Cambiar Estado"
                            disabled={complaint.estado === "Resuelto"}
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
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

function DetailRow({ label, value, span = 1 }) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : ""}>
      <dt className="text-xs font-medium text-gray-500 uppercase">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || "—"}</dd>
    </div>
  );
}

function ComplaintDetailModal({ complaint, isOpen, onClose }) {
  if (!isOpen || !complaint) return null;

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
            Detalle del Reclamo #{complaint.id}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Cuerpo del Modal (con scroll) */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Sección Cliente */}
          <section>
            <h4 className="text-base font-semibold text-purple-700 mb-3">
              Información del Cliente
            </h4>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              <DetailRow
                label="Nombre Completo"
                value={`${complaint.cliente.nombres} ${complaint.cliente.primerApellido} ${complaint.cliente.segundoApellido}`}
                span={2}
              />
              <DetailRow
                label="Documento"
                value={complaint.cliente.numeroDocumento}
              />
              <DetailRow label="Email" value={complaint.cliente.email} />
              <DetailRow label="Teléfono" value={complaint.cliente.telefono} />
              <DetailRow
                label="Menor de Edad"
                value={complaint.cliente.menorEdad ? "Sí" : "No"}
              />
              <DetailRow
                label="Ubicación"
                value={`${complaint.cliente.provincia} / ${complaint.cliente.distrito}`}
              />
              <DetailRow
                label="Dirección"
                value={complaint.cliente.direccion}
                span={2}
              />
            </dl>
          </section>

          {/* Sección Reclamo */}
          <section>
            <h4 className="text-base font-semibold text-purple-700 mb-3">
              Detalles del Reclamo
            </h4>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              <DetailRow
                label="Evento"
                value={complaint.detalle.nombreEvento}
              />
              <DetailRow
                label="Ticket"
                value={complaint.detalle.numeroTicket}
              />
              <DetailRow
                label="Tipo de Reclamo"
                value={complaint.detalle.tipoReclamo}
              />
              <DetailRow
                label="Tipo de Bien"
                value={complaint.detalle.tipoBien}
              />
              <DetailRow
                label="Monto Reclamado"
                value={
                  complaint.detalle.montoReclamado
                    ? `S/ ${complaint.detalle.montoReclamado}`
                    : "—"
                }
              />
              <DetailRow
                label="Evidencia"
                value={complaint.detalle.evidenciaNombre}
              />
              <DetailRow
                label="Descripción del Bien"
                value={complaint.detalle.descripcionBien}
                span={2}
              />
              <DetailRow
                label="Descripción del Reclamo"
                value={complaint.detalle.descripcionReclamo}
                span={2}
              />
              <DetailRow
                label="Solución Esperada"
                value={complaint.detalle.solucionEsperada}
                span={2}
              />
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
