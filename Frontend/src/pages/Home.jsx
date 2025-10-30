// src/pages/Home.jsx
import placeholder from "../assets/DefaultEvent.webp";
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import EventCard from "../components/EventCard.jsx";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../config.js";
import BannerCarousel from "../components/BannerCarousel.jsx"
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

// Normaliza texto (minúsculas, sin acentos) para comparar
function norm(s) {
  return (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export default function Home() {
  const { filters } = useOutletContext(); // { query, category, dateFrom, dateTo, location }
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
          // Fechas (rango real a partir de todas las fechas)
          const all = (ev.dates ?? [])
            .map((d) => ({
              start: d.startAt ? new Date(d.startAt) : null,
              end: d.endAt ? new Date(d.endAt) : d.startAt ? new Date(d.startAt) : null,
            }))
            .filter((x) => x.start);

          const minStart = all.length ? all.reduce((a, b) => (a.start < b.start ? a : b)).start : null;
          const maxEnd = all.length ? all.reduce((a, b) => (a.end > b.end ? a : b)).end : null;

          // YYYY-MM-DD en UTC (evita “correr” el día por TZ)
          const toYMD = (d) =>
            d ? new Date(d).toISOString().slice(0, 10) : null;
          const startDate = toYMD(minStart);
          const endDate = toYMD(maxEnd);

          // Hora (de la primera fecha) en UTC para consistencia
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
            startDate, // rango real
            endDate, // rango real
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

  // === Filtros del TopBar + búsqueda ===
  const filteredEvents = useMemo(() => {
    const q = norm(filters?.query || "");
    const cat = norm(filters?.category || "");
    const loc = norm(filters?.location || "");
    const from = filters?.dateFrom || null; // YYYY-MM-DD
    const to = filters?.dateTo || null;     // YYYY-MM-DD

    return events.filter((e) => {
      // Búsqueda: por título, descripción y ciudad/ubicación
      const matchQuery = q
        ? norm(e.titulo).includes(q) ||
          norm(e.description).includes(q) ||
          norm(e.location).includes(q)
        : true;

      // Categoría: alguna categoría con descripción exacta (case-insensitive)
      const matchCat = cat
        ? (e.categories || []).some(
            (c) => norm(c?.category?.description) === cat
          )
        : true;

      // Ubicación contiene
      const matchLoc = loc ? norm(e.location).includes(loc) : true;

      // Fechas: strings YYYY-MM-DD se pueden comparar lexicográficamente
      const start = e.startDate || e.endDate || null;
      const end = e.endDate || e.startDate || null;
      const matchFrom = from ? (end && end >= from) : true;
      const matchTo = to ? (start && start <= to) : true;
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

      return matchQuery && matchCat && matchLoc && matchFrom && matchTo;
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
                  startDate={e.startDate}
                  endDate={e.endDate}
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
