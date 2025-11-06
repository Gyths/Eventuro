// src/pages/Home.jsx
import placeholder from "../assets/DefaultEvent.webp";
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

/** Intenta convertir una URL de Google Maps a texto legible */
function humanizeAddress(venue) {
  if (!venue) return "Ubicación del evento";
  const { city, address, addressUrl, reference } = venue;

  let addr = address?.trim();
  if (!addr && addressUrl) {
    try {
      const u = new URL(addressUrl);
      // Preferimos ?q= si existe
      let q = u.searchParams.get("q");
      // Si no hay ?q=, intentamos /place/<texto>/
      if (!q && u.pathname.includes("/place/")) {
        const seg = u.pathname.split("/place/")[1]?.split("/")[0];
        if (seg) q = decodeURIComponent(seg);
      }
      if (q) addr = decodeURIComponent(q.replace(/\+/g, " ")).trim();
    } catch {
      // url inválida: ignorar
    }
  }

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

// Filtra primero por status "A" antes de mapear
      const mapped = (payload ?? [])
        .filter((ev) => ev.status === "A") // 👈 Solo eventos activos
        .map((ev) => {
          const all = (ev.dates ?? [])
            .map((d) => ({
              start: d.startAt ? new Date(d.startAt) : null,
              end: d.endAt ? new Date(d.endAt) : d.startAt ? new Date(d.startAt) : null,
            }))
            .filter((x) => x.start);

          const minStart = all.length ? all.reduce((a, b) => (a.start < b.start ? a : b)).start : null;
          const maxEnd = all.length ? all.reduce((a, b) => (a.end > b.end ? a : b)).end : null;

          const toYMD = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null);
          const startDate = toYMD(minStart);
          const endDate = toYMD(maxEnd);

          const hour = minStart
            ? new Date(minStart).toLocaleTimeString("es-PE", {
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
            description: ev.description,
            startDate,
            endDate,
            hour,
            location,
            locationUrl: ev.venue?.addressUrl,
            image: ev.imagePrincipalURLSigned ?? placeholder,
            bannerEv: ev.imageBannerURLSigned ?? placeholder,
            categories: ev.categories,
            accessPolicy: ev.accessPolicy,
            accessPolicyDescription: ev.accessPolicyDescription,
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

  // === Filtros del TopBar ===
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      let ok = true;

      if (filters.category) {
        ok =
          ok &&
          e.categories?.some(
            (c) =>
              c.category?.description?.toLowerCase() ===
              filters.category.toLowerCase()
          );
      }

      if (filters.location) {
        ok =
          ok &&
          e.location.toLowerCase().includes(filters.location.toLowerCase());
      }

      // Comparaciones de fecha usando strings YYYY-MM-DD (seguros)
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  image={e.image}
                  title={e.titulo}
                  description={e.description}
                  location={e.location}
                  locationUrl={e.locationUrl}
                  startDate={e.startDate} // YYYY-MM-DD (minStart)
                  endDate={e.endDate} // YYYY-MM-DD (maxEnd)
                  hour={e.hour}
                  categories={e.categories}
                  accessPolicy={e.accessPolicy}
                  accessPolicyDescription={e.accessPolicyDescription}
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
