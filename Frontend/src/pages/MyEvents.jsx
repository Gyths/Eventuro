// src/pages/MyEvents.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../services/auth/AuthContext";
import { BASE_URL } from "../config";
import placeholder from "../assets/image-placeholder.svg";
import ResponseModal from "../components/ResponseModal";
import CancelEventButton from "../components/CancelEventButton";
import ConfirmCancelModal from "../components/ConfirmCancelButton";
import { EventuroApi } from "../api.js";

export default function MyEvents() {
  const { user } = useAuth();
  const [eventsRaw, setEventsRaw] = useState([]);
  const [eventsTree, setEventsTree] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    if (!user?.organizer?.organizerId) return;

    hasLoaded.current = true;
    const organizerId = user.organizer.organizerId;

    async function load() {
      try {
        setLoading(true);
        const session = localStorage.getItem("session");
        const token = session ? JSON.parse(session)?.token : null;

        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(
          `${BASE_URL}/eventuro/api/event/events-by-organizer/${organizerId}`,
          { headers }
        );

        if (!res.ok) throw new Error("No se pudo cargar tus eventos");

        const json = await res.json();
        const items = Array.isArray(json) ? json : json?.events ?? [];
        setEventsRaw(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  const reload = async () => {
    if (!user?.organizer?.organizerId) return;
    const organizerId = user.organizer.organizerId;

    const session = localStorage.getItem("session");
    const token = session ? JSON.parse(session)?.token : null;

    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(
      `${BASE_URL}/eventuro/api/event/events-by-organizer/${organizerId}`,
      { headers }
    );

    const json = await res.json();
    const items = Array.isArray(json) ? json : json?.events ?? [];
    setEventsRaw(items);
  };

  // Construye árbol evento → fechas → zonas → tipos
  useEffect(() => {
    const tree = eventsRaw.map((ev) => {
      // solo fechas activas (active !== false)
      const datesRaw = Array.isArray(ev.dates)
        ? ev.dates.filter((d) => d.active !== false)
        : [];

      const dates = datesRaw.map((d, idxDate) => {
        // solo zonas activas
        const zonesRaw = Array.isArray(d.zoneDates)
          ? d.zoneDates.filter((z) => z.active !== false)
          : [];

        const zones = zonesRaw.map((z, idxZone) => ({
          zoneKey: z.eventDateZoneId ?? `${idxDate}-${idxZone}`,
          eventDateZoneId: z.eventDateZoneId,
          name: z.name,
          capacity: z.capacity,
          sold: z.capacity - z.capacityRemaining,
          // sólo allocations activas
          allocations: (z.allocations ?? []).filter(
            (t) => t.active !== false
          ),
        }));

        return {
          dateKey: d.eventDateId ?? idxDate,
          eventDateId: d.eventDateId,
          startAt: d.startAt,
          endAt: d.endAt,
          zones,
        };
      });

      return {
        eventId: ev.eventId,
        title: ev.title,
        inPerson: ev.inPerson,
        image:
          ev.imagePrincipalURLSigned || ev.imageBannerURLSigned || placeholder,
        status: ev.status,
        description: ev.description,
        refundPolicyText: ev.refundPolicyText,
        venue: ev.venue,
        dates,
      };
    });

    setEventsTree(tree);
    setSelectedEventId(tree[0]?.eventId ?? null);
  }, [eventsRaw]);

  const selectedEvent = useMemo(
    () => eventsTree.find((e) => e.eventId === selectedEventId) || null,
    [eventsTree, selectedEventId]
  );

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Cargando tus eventos…
      </div>
    );
  if (!eventsTree.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Aún no has creado eventos.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Eventos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 sm:gap-6">
          {/* Sidebar - Lista de eventos */}
          <aside className="flex flex-col gap-3">
            {eventsTree.map((ev) => {
              const status = getEventStatusLabel(ev);
              return (
                <button
                  key={ev.eventId}
                  onClick={() => setSelectedEventId(ev.eventId)}
                  className={[
                    "text-left rounded-xl bg-white p-3 shadow-md transition hover:shadow-lg flex items-center gap-3",
                    selectedEventId === ev.eventId
                      ? "ring-2 ring-purple-400 scale-[1.02]"
                      : "",
                  ].join(" ")}
                >
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-sm font-semibold text-gray-900">
                      {ev.title}
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      {ev.dates.length}{" "}
                      {ev.dates.length === 1 ? "fecha" : "fechas"}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium mt-1 ${status.color}`}
                    >
                      {status.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Panel de detalle */}
          <section className="rounded-2xl bg-white shadow-lg border border-gray-100 p-4 sm:p-6">
            {!selectedEvent ? (
              <p className="text-gray-400 text-center mt-20">
                Selecciona un evento para ver detalles.
              </p>
            ) : (
              <EventDetail eventNode={selectedEvent} reload={reload} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

// Helper para estado dinámico según fechas y aprobación
const getEventStatusLabel = (eventNode) => {
  const now = new Date();
  const dates = eventNode.dates
    .map((d) => ({ start: new Date(d.startAt), end: new Date(d.endAt) }))
    .sort((a, b) => a.start - b.start);

  if (!dates.length) {
    return {
      text:
        eventNode.status === "A"
          ? "Aprobado - Sin Fechas"
          : eventNode.status === "P"
          ? "En revisión - Sin Fechas"
          : eventNode.status === "C"
          ? "Cancelado - Sin Fechas"
          : eventNode.status === "D"
          ? "Desaprobado - Sin Fechas"
          : "Sin Estado - Sin Fechas",
      color: "bg-gray-100 text-gray-600",
    };
  }

  const firstStart = dates[0].start;
  const lastEnd = dates[dates.length - 1].end;

  if (now >= firstStart && now <= lastEnd && eventNode.status === "A") {
    return { text: "Evento en curso", color: "bg-blue-100 text-blue-700" };
  }

  if (now > lastEnd) {
    switch (eventNode.status) {
      case "A":
        return {
          text: "Expirado - Aprobado",
          color: "bg-green-100 text-green-700",
        };
      case "P":
        return {
          text: "Expirado - Nunca Aprobado",
          color: "bg-yellow-100 text-yellow-700",
        };
      case "D":
        return {
          text: "Expirado - Desaprobado",
          color: "bg-red-100 text-red-700",
        };
      case "C":
        return {
          text: "Expirado - Cancelado",
          color: "bg-red-100 text-red-700",
        };
      default:
        return {
          text: "Expirado - Sin Estado",
          color: "bg-gray-100 text-gray-600",
        };
    }
  }

  if (eventNode.status === "P")
    return { text: "En revisión", color: "bg-yellow-100 text-yellow-700" };
  if (eventNode.status === "D")
    return { text: "Desaprobado", color: "bg-red-100 text-red-700" };
  if (eventNode.status === "C")
    return { text: "Cancelado", color: "bg-red-100 text-red-700" };
  return {
    text: eventNode.status === "A" ? "Aprobado" : "Sin Estado",
    color:
      eventNode.status === "A"
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-600",
  };
};

function EventDetail({ eventNode, reload }) {
  const status = getEventStatusLabel(eventNode);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseType, setResponseType] = useState("success");
  const [responseMessage, setResponseMessage] = useState("");

  // Modal de tipos de entrada
  const [typesModalOpen, setTypesModalOpen] = useState(false);
  const [zoneForTypes, setZoneForTypes] = useState(null);

  const isExpiredOrRunning =
    status.text.toLowerCase().includes("expirado") ||
    status.text.toLowerCase().includes("curso") ||
    status.text.toLowerCase().includes("cancelado");

  const openCancelModal = () => {
    if (isExpiredOrRunning) return;
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const openResponseModal = (type, message) => {
    setResponseType(type);
    setResponseMessage(message);
    setResponseModalOpen(true);
  };

  const closeResponseModal = () => {
    setResponseModalOpen(false);
  };

  const handleConfirmCancel = async () => {
    try {
      await EventuroApi({
        endpoint: `/event/${eventNode.eventId}/del`,
        method: "POST",
      });

      closeCancelModal();
      openResponseModal(
        "success",
        "El evento ha sido cancelado correctamente."
      );
      await reload();
    } catch (err) {
      console.error("Error al cancelar evento:", err);
      closeCancelModal();
      openResponseModal(
        "error",
        err?.message ||
          "Ocurrió un error al cancelar el evento. Inténtalo nuevamente."
      );
    }
  };

  // ---- Eliminar fecha, zona y tipo de entrada ----
  const handleDeleteDate = async (eventDateId) => {
    if (!eventDateId) {
      openResponseModal(
        "error",
        "No se pudo identificar la fecha a eliminar. Asegúrate de que el backend envíe eventDateId."
      );
      return;
    }

    try {
      await EventuroApi({
        endpoint: `/event/${eventDateId}/del-date`,
        method: "POST",
      });
      openResponseModal("success", "La fecha ha sido eliminada.");
      await reload();
    } catch (err) {
      console.error("Error al eliminar fecha:", err);
      openResponseModal(
        "error",
        err?.message || "No se pudo eliminar la fecha."
      );
    }
  };

  const handleDeleteZone = async (eventDateZoneId) => {
    if (!eventDateZoneId) {
      openResponseModal(
        "error",
        "No se pudo identificar la zona a eliminar. Asegúrate de que el backend envíe eventDateZoneId."
      );
      return;
    }

    try {
      await EventuroApi({
        endpoint: `/event/${eventDateZoneId}/del-zone`,
        method: "POST",
      });
      openResponseModal("success", "La zona ha sido eliminada.");
      await reload();
    } catch (err) {
      console.error("Error al eliminar zona:", err);
      openResponseModal(
        "error",
        err?.message || "No se pudo eliminar la zona."
      );
    }
  };

  const handleDeleteType = async (allocationId) => {
    if (!allocationId) {
      openResponseModal(
        "error",
        "No se pudo identificar el tipo de entrada a eliminar."
      );
      return;
    }

    try {
      await EventuroApi({
        endpoint: `/event-date-zone-allocation/${allocationId}/del`,
        method: "POST",
      });
      openResponseModal("success", "El tipo de entrada ha sido eliminado.");
      await reload();
    } catch (err) {
      console.error("Error al eliminar tipo de entrada:", err);
      openResponseModal(
        "error",
        err?.message || "No se pudo eliminar el tipo de entrada."
      );
    }
  };

  const openTypesModal = (zone) => {
    setZoneForTypes(zone);
    setTypesModalOpen(true);
  };

  const closeTypesModal = () => {
    setTypesModalOpen(false);
    setZoneForTypes(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <img
          src={eventNode.image}
          className="w-24 h-24 rounded-xl object-cover border border-gray-200"
        />
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-purple-900 ">
            {eventNode.title}
          </h3>
          <span
            className={` px-2 py-1 rounded-full text-xs font-medium ${status.color} `}
          >
            {status.text}
          </span>
          <p className=" text-sm text-gray-500 mt-2">
            {eventNode.dates.length}{" "}
            {eventNode.dates.length === 1
              ? "fecha programada"
              : "fechas programadas"}
          </p>
        </div>
      </header>

      {eventNode.description && (
        <p className="text-gray-700">
          <strong>Descripción:</strong> {eventNode.description}
        </p>
      )}

      {eventNode.refundPolicyText && (
        <p className="text-gray-700">
          <strong>Política de devolución:</strong>{" "}
          {eventNode.refundPolicyText}
        </p>
      )}
      {!eventNode.refundPolicyText && (
        <p className="text-gray-700">
          <strong>Política de devolución:</strong> No hay política de devolución
        </p>
      )}

      {eventNode.inPerson === false && (
        <p className="text-gray-700">
          <strong>Modalidad:</strong> Evento Virtual
        </p>
      )}

      {eventNode.inPerson === true && (
        <p className="text-gray-700">
          <strong>Ciudad:</strong> {eventNode.venue.city} •{" "}
          <strong>Dirección:</strong> {eventNode.venue.address} •{" "}
          <strong>Aforo:</strong> {eventNode.venue.capacity}
        </p>
      )}

      {/* Fechas, zonas y tipos de entrada (solo si está aprobado) */}
      {eventNode.status === "A" ? (
        <>
          <div className="space-y-4">
            {eventNode.dates.map((d) => (
              <div
                key={d.dateKey}
                className="rounded-xl border border-gray-200"
              >
                <div className="px-3 py-2 bg-gray-50 rounded-t-xl border-b border-gray-200 flex justify-between items-center gap-2">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                    {new Date(d.startAt).toLocaleString("es-PE")} -{" "}
                    {new Date(d.endAt).toLocaleString("es-PE")}
                  </h4>
                  <button
                    onClick={() => handleDeleteDate(d.eventDateId)}
                    className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Eliminar fecha
                  </button>
                </div>
                <div className="p-3 space-y-2">
                  {d.zones?.map((z) => (
                    <div
                      key={z.zoneKey}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-700 border-b last:border-b-0 pb-2 last:pb-0"
                    >
                      <div>
                        <strong>{z.name}</strong>: Capacidad {z.capacity},
                        Vendidas {z.sold}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => openTypesModal(z)}
                          className="px-3 py-1 text-xs rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100"
                        >
                          Ver tipos de entrada
                        </button>
                        <button
                          onClick={() => handleDeleteZone(z.eventDateZoneId)}
                          className="px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Eliminar zona
                        </button>
                      </div>
                    </div>
                  ))}
                  {!d.zones?.length && (
                    <p className="text-xs text-gray-400">
                      No hay zonas configuradas para esta fecha.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <CancelEventButton
              onClick={openCancelModal}
              disabled={isExpiredOrRunning}
            />
          </div>
        </>
      ) : eventNode.status === "C" ? (
        <p className="text-gray-500 text-center py-6 border border-gray-200 rounded-xl bg-gray-50">
          Este evento ha sido cancelado, por lo que las compras ya no estarán
          disponibles.
        </p>
      ) : eventNode.status === "D" ? (
        <p className="text-gray-500 text-center py-6 border border-gray-200 rounded-xl bg-gray-50">
          Este evento ha sido desaprobado, por lo que las compras no estarán
          disponibles.
        </p>
      ) : (
        <p className="text-gray-500 text-center py-6 border border-gray-200 rounded-xl bg-gray-50">
          Este evento aún no está aprobado, por lo que las compras todavía no
          estarán disponibles.
        </p>
      )}

      {/* Modal de confirmación para cancelar evento completo */}
      <ConfirmCancelModal
        open={cancelModalOpen}
        onClose={closeCancelModal}
        onConfirm={handleConfirmCancel}
        eventTitle={eventNode.title}
      />

      {/* Modal de respuesta (éxito / error) */}
      <ResponseModal
        open={responseModalOpen}
        onClose={closeResponseModal}
        type={responseType}
        title={
          responseType === "success"
            ? "Operación exitosa"
            : "Ocurrió un problema"
        }
        message={responseMessage}
      />

      {/* Modal de tipos de entrada por zona */}
      <TypesModal
        open={typesModalOpen}
        onClose={closeTypesModal}
        zone={zoneForTypes}
        onDeleteType={handleDeleteType}
      />
    </div>
  );
}

// Modal para mostrar tipos de entrada de una zona
function TypesModal({ open, onClose, zone, onDeleteType }) {
  if (!open || !zone) return null;

  // por si acaso: sólo allocations activas
  const allocations = (zone.allocations ?? []).filter(
    (t) => t.active !== false
  );

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Tipos de entrada – {zone.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {allocations.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {allocations.map((t) => (
              <div
                key={t.eventDateZoneAllocationId}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-gray-200 rounded-lg px-3 py-2"
              >
                <div className="text-sm text-gray-800">
                  <p>
                    <strong>{t.audienceName}</strong>
                  </p>
                  <p className="text-xs text-gray-600">
                    Tipo de descuento: {t.discountType} • Valor:{" "}
                    {t.discountValue}
                  </p>
                  <p className="text-xs text-gray-500">
                    Asignados: {t.allocatedQuantity ?? "—"} • Restantes:{" "}
                    {t.remainingQuantity ?? "—"}
                  </p>
                </div>
                <button
                  onClick={() =>
                    onDeleteType(t.eventDateZoneAllocationId)
                  }
                  className="self-start sm:self-auto px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Esta zona aún no tiene tipos de entrada configurados.
          </p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
