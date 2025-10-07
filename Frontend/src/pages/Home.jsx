// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BannerCarousel from "../components/BannerCarousel.jsx";
import EventCard from "../components/EventCard.jsx";

const BASE_URL = "http://localhost:4000";

const imagesDemo = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
];

export default function Home() {
  const { filters } = useOutletContext();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let abort = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await fetch(`${BASE_URL}/eventuro/api/event/list`);
        const isJson = res.headers.get("content-type")?.includes("application/json");
        const payload = isJson ? await res.json().catch(() => null) : null;

        if (!res.ok) throw new Error(payload?.error || `HTTP ${res.status}`);
        if (abort) return;

        // 🔁 Mapea lo que venga del backend → estructura para la card
        // Ajusta las propiedades si tu API devuelve otros nombres.
        const mapped = (payload ?? []).map(ev => {
          const firstDate = ev.dates?.[0];
          return {
            id:       ev.eventId ?? ev.id ?? crypto.randomUUID(),
            titulo:   ev.title ?? "Evento",
            // si tu card necesita rango, guarda ambos
            fechaInicio: firstDate?.startAt ?? ev.startAt ?? null,
            fechaFin:    firstDate?.endAt ?? ev.endAt ?? null,
            // si tu card usa un solo campo “fecha”, puedes decidir cuál mostrar:
            fecha: firstDate?.startAt ?? ev.startAt ?? null,
            lugar: ev.venue?.city ?? ev.city ?? "Ubicación del evento",
            // si tu API trae categorías anidadas: ev.categories[].category.description
            category:
              ev.categories?.[0]?.category?.description ??
              ev.categories?.[0]?.description ??
              ev.category ??
              "",
            imagen: ev.imageUrl ?? "/img/evento-placeholder.jpg",
          };
        });

        setEvents(mapped);
      } catch (e) {
        if (!abort) setErr(e.message);
      } finally {
        if (!abort) setLoading(false);
      }
    })();

    return () => { abort = true; };
  }, []);

  // 🧠 Aplica filtros actuales del TopBar
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      let ok = true;
      if (filters.category) ok = ok && e.category === filters.category;
      if (filters.location) ok = ok && e.lugar.toLowerCase().includes(filters.location.toLowerCase());
      if (filters.dateFrom) ok = ok && new Date(e.fechaInicio ?? e.fecha) >= new Date(filters.dateFrom);
      if (filters.dateTo) ok = ok && new Date(e.fechaFin ?? e.fecha) <= new Date(filters.dateTo);
      return ok;
    });
  }, [events, filters]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Banner */}
        <div className="lg:col-span-4">
          <BannerCarousel
            images={imagesDemo}
            interval={5000}
            showArrows={false}
            heightClass="h-48 md:h-64 lg:h-72"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {loading && (
          <p className="col-span-4 text-center text-gray-500">Cargando eventos…</p>
        )}
        {err && (
          <p className="col-span-4 text-center text-red-600">Error: {err}</p>
        )}

        {!loading && !err && (
          filteredEvents.length > 0 ? (
            filteredEvents.map(e => (
              <div key={e.id} className="col-span-1">
                    <EventCard
                      image={e.imagen || "/img/evento-placeholder.jpg"}
                      title={e.titulo ?? e.title ?? e.name ?? "Evento"}
                      location={e.lugar ?? "Ubicación del evento"}
                      startDate={e.fechaInicio ?? e.fecha ?? null}
                      endDate={e.fechaFin ?? e.fecha ?? null}
                      hour={e.hora ?? "16:00"}
                    />
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No hay eventos que coincidan con los filtros seleccionados.
            </p>
          )
        )}
      </div>
    </section>
  );
}
