import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../services/auth/AuthContext";
import { BASE_URL } from "../config";
import placeholder from "../assets/image-placeholder.svg";

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

  // Construye árbol evento → fechas → info
  useEffect(() => {
    const tree = eventsRaw.map((ev) => ({
      eventId: ev.eventId,
      title: ev.title,
      image: ev.imagePrincipalURLSigned || ev.imageBannerURLSigned || placeholder,
      status: ev.status,
      description: ev.description,
      refundPolicyText: ev.refundPolicyText,
      venue: ev.venue,
      dates: ev.dates?.map((d) => ({
        dateId: d.eventDateId,
        startAt: d.startAt,
        endAt: d.endAt,
        zones: d.zoneDates?.map((z) => ({
          name: z.name,
          capacity: z.capacity,
          sold: z.allocations?.reduce((sum, a) => sum + (a.allocatedQuantity || 0), 0),
        })) || [],
      })) || [],
    }));
    setEventsTree(tree);
    setSelectedEventId(tree[0]?.eventId ?? null);
  }, [eventsRaw]);

  const selectedEvent = useMemo(
    () => eventsTree.find((e) => e.eventId === selectedEventId) || null,
    [eventsTree, selectedEventId]
  );

  if (loading)
    return <div className="min-h-screen grid place-items-center text-gray-500">Cargando tus eventos…</div>;
  if (!eventsTree.length)
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Aún no has creado eventos.</div>;

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
                    selectedEventId === ev.eventId ? "ring-2 ring-purple-400 scale-[1.02]" : "",
                  ].join(" ")}
                >
                  <img src={ev.image} alt={ev.title} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex flex-col">
                    <h2 className="text-sm font-semibold text-gray-900">{ev.title}</h2>
                    <p className="text-[11px] text-gray-500">
                      {ev.dates.length} {ev.dates.length === 1 ? "fecha" : "fechas"}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium mt-1 ${status.color}`}>
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
              <p className="text-gray-400 text-center mt-20">Selecciona un evento para ver detalles.</p>
            ) : (
              <EventDetail eventNode={selectedEvent} />
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
    .map(d => ({ start: new Date(d.startAt), end: new Date(d.endAt) }))
    .sort((a, b) => a.start - b.start);

  if (!dates.length) {
    return { text: eventNode.status === "A" ? "Aprobado" : eventNode.status === "P" ? "En revisión" : "Desaprobado", color: "bg-gray-100 text-gray-600" };
  }

  const firstStart = dates[0].start;
  const lastEnd = dates[dates.length - 1].end;

  if (now >= firstStart && now <= lastEnd && eventNode.status === "A" ) {
    return { text: "Evento en curso", color: "bg-blue-100 text-blue-700" };
  }

  if (now > lastEnd) {
    switch (eventNode.status) {
      case "A":
        return { text: "Expirado - Aprobado", color: "bg-green-100 text-green-700" };
      case "P":
        return { text: "Expirado - Nunca Aprobado", color: "bg-yellow-100 text-yellow-700" };
      case "D":
        return { text: "Expirado - Desaprobado", color: "bg-red-100 text-red-700" };
      default:
        return { text: "Expirado", color: "bg-gray-100 text-gray-600" };
    }
  }

  if (eventNode.status === "P") return { text: "En revisión", color: "bg-yellow-100 text-yellow-700" };
  if (eventNode.status === "D") return { text: "Desaprobado", color: "bg-red-100 text-red-700" };

  return { text: eventNode.status === "A" ? "Aprobado" : eventNode.status, color: "bg-gray-100 text-gray-600" };
};

function EventDetail({ eventNode }) {
  const status = getEventStatusLabel(eventNode);

  return (
    <div className="space-y-4 sm:space-y-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <img src={eventNode.image} className="w-24 h-24 rounded-xl object-cover border border-gray-200" />
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-purple-900 ">{eventNode.title}</h3>
          <span className={` px-2 py-1 rounded-full text-xs font-medium ${status.color} `}>{status.text}</span>
          <p className=" text-sm text-gray-500 mt-2">{eventNode.dates.length} {eventNode.dates.length === 1 ? "fecha programada" : "fechas programadas"}</p>
        </div>
      </header>

      {eventNode.description && (
        <p className="text-gray-700"><strong>Descripción:</strong> {eventNode.description}</p>
      )}

      {eventNode.refundPolicyText && (
        <p className="text-gray-700"><strong>Política de devolución:</strong> {eventNode.refundPolicyText}</p>
      )}
      {!eventNode.refundPolicyText && (
        <p className="text-gray-700"><strong>Política de devolución:</strong> No hay política de devolución</p>
      )}

      {eventNode.venue && (
        <p className="text-gray-700"><strong>Ciudad:</strong> {eventNode.venue.city} • <strong>Dirección:</strong> {eventNode.venue.address} • <strong>Aforo:</strong> {eventNode.venue.capacity}</p>
      )}

      {/* Mostrar fechas y zonas solo si está aprobado */}
      {eventNode.status === "A" ? (
        <div className="space-y-4">
          {eventNode.dates.map((d) => (
            <div key={d.dateId} className="rounded-xl border border-gray-200">
              <div className="px-3 py-2 bg-gray-50 rounded-t-xl border-b border-gray-200">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                  {new Date(d.startAt).toLocaleString("es-PE")} - {new Date(d.endAt).toLocaleString("es-PE")}
                </h4>
              </div>
              <div className="p-3 space-y-2">
                {d.zones?.map((z, i) => (
                  <div key={i} className="text-sm text-gray-700">
                    <strong>{z.name}</strong>: Capacidad {z.capacity}, Vendidas {z.sold}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-6 border border-gray-200 rounded-xl bg-gray-50">
          Este evento aún no está aprobado, por lo que las compras no están disponibles.
        </p>
      )}
    </div>
  );
}
