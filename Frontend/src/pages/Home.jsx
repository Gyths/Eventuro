// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BannerCarousel from "../components/BannerCarousel.jsx";
import EventCard from "../components/EventCard.jsx";
import { v4 as uuidv4 } from "uuid";

import { BASE_URL } from "../config.js";

const imagesDemo = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
];

// Intenta convertir una URL de Google Maps a texto legible
function humanizeAddress(venue) {
  if (!venue) return "Ubicación del evento";
  const { city, address, addressUrl, reference } = venue;

  let addr = address?.trim();
  if (!addr && addressUrl) {
    try {
      const u = new URL(addressUrl);
      // Preferimos el parámetro ?q= si existe
      let q = u.searchParams.get("q");
      // Si no, intentamos /place/<texto>/
      if (!q && u.pathname.includes("/place/")) {
        const seg = u.pathname.split("/place/")[1]?.split("/")[0];
        if (seg) q = decodeURIComponent(seg);
      }
      if (q) {
        // Reemplaza + por espacios en caso de estar codificado así
        addr = decodeURIComponent(q.replace(/\+/g, " ")).trim();
      }
    } catch {
      // Si la URL no es válida, ignoramos
    }
  }

  // Si no logramos generar addr, usamos referencia
  const rightPart = addr || reference || "";
  return (
    [city, rightPart].filter(Boolean).join(" — ") || "Ubicación del evento"
  );
}

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
        const isJson = res.headers
          .get("content-type")
          ?.includes("application/json");
        const payload = isJson ? await res.json().catch(() => null) : null;

        if (!res.ok) throw new Error(payload?.error || `HTTP ${res.status}`);
        if (abort) return;

        const mapped = (payload ?? []).map((ev) => {
          const firstDate = ev.dates?.[0] ?? null;
          console.log(ev);
          // **Clave para no “mover” el día**:
          // Convertimos a YYYY-MM-DD (UTC) y ese string lo mandamos a la card.
          const startDate = firstDate?.startAt
            ? new Date(firstDate.startAt).toISOString().slice(0, 10)
            : null;
          const endDate = firstDate?.endAt
            ? new Date(firstDate.endAt).toISOString().slice(0, 10)
            : null;

          // Hora en formato local HH:mm (si tu DB guarda hora)
          const hour = firstDate?.startAt
            ? new Date(firstDate.startAt).toLocaleTimeString("es-PE", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "UTC",
              })
            : "12:00";

          const location = humanizeAddress(ev.venue);

          return {
            id: ev.eventId ?? uuidv4(),
            titulo: ev.title ?? "Evento",
            startDate, // YYYY-MM-DD
            endDate, // YYYY-MM-DD
            hour,
            location,
            imagen: ev.imageUrl ?? "/img/evento-placeholder.jpg",
            category:
              ev.categories?.[0]?.category?.description ??
              ev.categories?.[0]?.description ??
              ev.category ??
              "",
          };
        });

        setEvents(mapped);
      } catch (e) {
        if (!abort) setErr(e.message);
      } finally {
        if (!abort) setLoading(false);
      }
    })();

    return () => {
      abort = true;
    };
  }, []);

  // Filtros del TopBar
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      let ok = true;
      if (filters.category) ok = ok && e.category === filters.category;
      if (filters.location)
        ok =
          ok &&
          e.location.toLowerCase().includes(filters.location.toLowerCase());

      // Comparaciones de fecha usando los strings YYYY-MM-DD (seguros)
      if (filters.dateFrom)
        ok =
          ok &&
          new Date(e.startDate ?? e.endDate ?? 0) >= new Date(filters.dateFrom);
      if (filters.dateTo)
        ok =
          ok &&
          new Date(e.endDate ?? e.startDate ?? 0) <= new Date(filters.dateTo);

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
          <p className="col-span-4 text-center text-gray-500">
            Cargando eventos…
          </p>
        )}
        {err && (
          <p className="col-span-4 text-center text-red-600">Error: {err}</p>
        )}

        {!loading &&
          !err &&
          (filteredEvents.length > 0 ? (
            filteredEvents.map((e) => (
              <div key={e.id} className="col-span-1">
                <EventCard
                  id={e.id}
                  image={e.imagen}
                  title={e.titulo}
                  location={e.location}
                  startDate={e.startDate} // YYYY-MM-DD (sin “correr” día)
                  endDate={e.endDate}
                  hour={e.hour}
                />
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No hay eventos que coincidan con los filtros seleccionados.
            </p>
          ))}
      </div>
    </section>
  );
}
