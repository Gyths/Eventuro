import React, { useState, useEffect } from "react";
import { EventuroApi } from "../../api";
import {
  ClockIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  InformationCircleIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const animationStyles = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }

  @keyframes fade-in-backdrop {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in-backdrop { animation: fade-in-backdrop 0.2s ease-out forwards; }

  @keyframes modal-scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-modal-scale-in { animation: modal-scale-in 0.3s cubic-bezier(0.1, 0.9, 0.2, 1) forwards; }
`;

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

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      if (err.message.includes("401") || err.message.toLowerCase().includes("token")) {
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

  useEffect(() => { fetchPendingEvents(); }, []);

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
        if (!value) return "¡Necesitas ingresar un valor!";
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) return "Por favor, ingresa un número válido (ej: 5.25)";
      },
    });

    if (percentage) {
      try {
        await EventuroApi({
          endpoint: `/event/${eventId}/approve`,
          method: "PUT",
          data: { status: "A", percentage: parseFloat(percentage) },
        });
        Swal.fire("¡Aprobado!", "El evento ha sido aprobado y la comisión ha sido establecida.", "success");
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
          data: { status: "D" },
        });
        Swal.fire("¡Rechazado!", "El evento ha sido marcado como rechazado.", "success");
        fetchPendingEvents();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleViewDetails = (event) => { setSelectedEvent(event); setIsDetailModalOpen(true); };
  const handleCloseModal = () => { setIsDetailModalOpen(false); setSelectedEvent(null); };

  const renderContent = () => {
    if (isLoading) return <div className="text-center text-gray-500 py-12">Cargando eventos pendientes...</div>;
    if (error) return <div className="text-center text-red-600 bg-red-50 p-6 m-6 rounded-lg"><strong>Error al cargar:</strong> {error}</div>;
    if (events.length === 0) return <div className="text-center text-gray-500 py-12">¡Buen trabajo! No hay eventos pendientes de aprobación.</div>;

    return (
      <ul className="divide-y divide-gray-200">
        {events.map((event, index) => (
          <li key={event.eventId} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-purple-50/50 transition-colors duration-150 animate-fade-in-up" style={{ animationFillMode: "both", animationDelay: `${index * 100}ms` }}>
            <div className="flex-1 mb-4 sm:mb-0 pr-4">
              <h4 className="text-base font-semibold text-purple-800">{event.title || "Evento sin título"}</h4>
              <p className="text-sm text-gray-600 mt-1">Organizador: <span className="font-medium">{event.organizer?.companyName || "Desconocido"}</span></p>
              <p className="text-xs text-gray-500 mt-1">Solicitado: {formatDate(event.createdAt || event.updatedAt)}</p>
            </div>

            <div className="flex-shrink-0 flex gap-2">
              <button onClick={() => handleViewDetails(event)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200" title="Ver Detalle"><EyeIcon className="h-4 w-4" /> Detalle</button>
              <button onClick={() => handleReject(event.eventId)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200" title="Rechazar"><XMarkIcon className="h-4 w-4" /> Rechazar</button>
              <button onClick={() => handleApprove(event.eventId)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200" title="Aprobar"><CheckIcon className="h-4 w-4" /> Aprobar</button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-5xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md w-full">
          <div className="border-b border-gray-200 p-6 sm:p-8 bg-gray-50/70">
            <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
              <ClockIcon className="h-9 w-9 text-purple-600" />
              Eventos Pendientes de Aprobación
            </h3>
            <p className="mt-2 text-base text-gray-600">Revisa y aprueba los nuevos eventos enviados por los organizadores.</p>
          </div>
          <div className="p-0">{renderContent()}</div>
        </div>
      </div>

      <EventDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
        refreshList={fetchPendingEvents}  // <-- agregamos esto
      />
    </>
  );
}

function DetailRow({ label, value, span = 1, icon: Icon }) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : ""}>
      <dt className="text-sm font-medium text-gray-500 flex items-center gap-1.5">{Icon && <Icon className="h-4 w-4 text-gray-400" />} {label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || "—"}</dd>
    </div>
  );
}
function EventDetailModal({ isOpen, event, onClose, refreshList }){
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    if (event) {
      setFormState({
        title: event.title || "",
        description: event.description || "",
        refundPolicyText: event.refundPolicyText || "",
        // Guardamos solo los precios editables por zona
        zones: (event.dates || []).map(d => ({
          dateId: d.eventDateId,
          zones: (d.zoneDates || []).map(z => ({
            zoneId: z.eventDateZoneId,
            price: z.basePrice || 0,
          })),
        })),
      });
      setIsEditing(false);
    }
  }, [event]);

  if (!isOpen || !event || !formState) return null;

  const handleInputChange = (field, value) =>
    setFormState(prev => ({ ...prev, [field]: value }));

  const handleZonePriceChange = (dateIndex, zoneIndex, value) => {
    setFormState(prev => {
      const newZones = [...prev.zones];
      newZones[dateIndex].zones[zoneIndex].price = Number(value);
      return { ...prev, zones: newZones };
    });
  };

  const handleSave = async () => {
    try {
      await EventuroApi({
        endpoint: `/event/${event.eventId}/update-details`,
        method: "PUT",
        data: formState,
      });

      Swal.fire("¡Guardado!", "Los cambios han sido aplicados.", "success").then(() => {
        setIsEditing(false);
        onClose();           // cierra el modal
        refreshList?.();     // refresca la lista principal
      });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const aforoTotal = event.venue?.capacity || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm animate-fade-in-backdrop" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-modal-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Detalle del Evento</h3>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"><XMarkIcon className="h-6 w-6" /></button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Info principal */}
          <section>
            <dt className="text-sm font-medium text-gray-500">Título de Evento</dt>
            {isEditing ? (
              <input className="w-full border border-gray-300 rounded-md p-2 text-gray-800 mb-2" value={formState.title} onChange={(e) => handleInputChange("title", e.target.value)} />
            ) : (
              <h4 className="text-2xl font-bold text-purple-800 mb-4">{event.title}</h4>
            )}
            <dt className="text-sm font-medium text-gray-500">Descripción</dt>
            {isEditing ? (
              <textarea className="w-full border border-gray-300 rounded-md p-2 text-gray-800 mb-2" rows={3} value={formState.description} onChange={(e) => handleInputChange("description", e.target.value)} />
            ) : (
              <p className="text-base text-gray-700">{event.description}</p>
            )}
          </section>

          {/* Detalles generales */}
          <section>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              <DetailRow label="Organizador" value={event.organizer?.companyName} icon={UsersIcon} />
              <DetailRow
                label="Aforo Máximo del Recinto"
                value={event.inPerson === false ? "Evento Virtual" : aforoTotal.toLocaleString("es-PE")}
                icon={UsersIcon}
              />
              <DetailRow label="Solicitado (Fecha)" value={formatDate(event.createdAt)} icon={CalendarDaysIcon} />
              <DetailRow label="Imagen Key" value={event.imagePrincipalKey} icon={InformationCircleIcon} span={2} />

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Política de Devolución</dt>
                <dd className="mt-1 text-sm text-gray-900">{isEditing ? <textarea className="w-full border border-gray-300 rounded-md p-2 text-gray-800" rows={2} value={formState.refundPolicyText} onChange={(e) => handleInputChange("refundPolicyText", e.target.value)} /> : event.refundPolicyText || "—"}</dd>
              </div>
            </dl>
          </section>

          {/* Zonas y precios */}
          {event.dates?.length > 0 && (
            <section>
              <h4 className="text-base font-semibold text-purple-700 mb-3">Fechas y Aforos por Zona</h4>
              <ul className="divide-y divide-gray-200 border rounded-lg">
                {event.dates.map((date, dateIndex) => (
                  <li key={date.eventDateId} className="px-4 py-3 flex flex-col gap-2 bg-gray-50 rounded-md mb-2">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {formatDate(date.startAt)} - {formatDate(date.endAt)}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(date.zoneDates || []).map((zone, zoneIndex) => (
                        <div key={zone.eventDateZoneId} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm border border-gray-100">
                          <span className="text-gray-700 font-medium">{zone.name} (Máx: {zone.capacity})</span>
                          {isEditing ? (
                            <input
                              type="number"
                              className="w-24 border border-gray-300 rounded-md p-1 text-right"
                              value={formState.zones[dateIndex]?.zones[zoneIndex]?.price || 0}
                              onChange={(e) => handleZonePriceChange(dateIndex, zoneIndex, e.target.value)}
                            />
                          ) : (
                            <span className="text-gray-900 font-semibold">S/. {zone.basePrice.toLocaleString("es-PE")}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          {isEditing ? (
            <>
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200">Cancelar</button>
              <button onClick={handleSave} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Guardar</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700">Editar</button>
          )}
        </div>
      </div>
    </div>
  );
}
