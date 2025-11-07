// src/pages/Home.jsx
import placeholder from "../assets/DefaultEvent.webp";
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BannerCarousel from "../components/BannerCarousel.jsx";
import EventCard from "../components/EventCard.jsx";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../config.js";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";


const imagesDemo = [
  { id: "demo1", title: "Evento destacado 1", image: "/banners/banner1.jpg" },
  { id: "demo2", title: "Evento destacado 2", image: "/banners/banner2.jpg" },
  { id: "demo3", title: "Evento destacado 3", image: "/banners/banner3.jpg" },
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
  const [carouselImages, setCarouselImages] = useState([]);
  const { isAuthenticated, user } = useAuth();

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
          // === Tomar TODAS las fechas y armar rango ===
          const all = (ev.dates ?? [])
            .map((d) => ({
              start: d.startAt ? new Date(d.startAt) : null,
              end: d.endAt
                ? new Date(d.endAt)
                : d.startAt
                ? new Date(d.startAt)
                : null,
            }))
            .filter((x) => x.start);

          // Si no hay fechas válidas, evitar crashear
          const minStart = all.length
            ? all.reduce((a, b) => (a.start < b.start ? a : b)).start
            : null;
          const maxEnd = all.length
            ? all.reduce((a, b) => (a.end > b.end ? a : b)).end
            : null;

          // YYYY-MM-DD en UTC (evita “correr” el día por TZ)
          const toYMD = (d) =>
            d ? new Date(d).toISOString().slice(0, 10) : null;
          const startDate = toYMD(minStart);
          const endDate = toYMD(maxEnd);

          // Hora de la PRIMERA fecha (minStart). Usa UTC para consistencia con toYMD.
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
            image: ev.imagePrincipalURLSigned ?? placeholder, //imagen principal evento
            bannerEv: ev.imageBannerURLSigned ?? placeholder, //imagen banner evento
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


// === Cargar eventos comprados del usuario (si está logueado) ===
useEffect(() => {
  if (events.length === 0) return;

  (async () => {
    try {
      // Si no está logueado, mostrar eventos random
      if (!isAuthenticated || !user?.userId) {
        const fallback = events
          .filter((e) => e.bannerEv)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((e) => ({ id: e.id, title: e.titulo, image: e.bannerEv }));
        setCarouselImages(fallback);
        return;
      }

      // === Obtener las órdenes del usuario ===
      const res = await EventuroApi({
        endpoint: `/orders/byUser/${user.userId}?pageSize=100`,
        method: "GET",
      });

      // === Contar categorías compradas ===
      const categoryCount = new Map();
      for (const order of res.items ?? []) {
        for (const item of order.items ?? []) {
          const ev = item?.eventDate?.event;
          for (const cat of ev?.categories ?? []) {
            const name = cat?.category?.description ?? "Otros";
            categoryCount.set(name, (categoryCount.get(name) || 0) + 1);
          }
        }
      }

      // === Si el usuario no compró nada, fallback random ===
      if (categoryCount.size === 0) {
        const fallback = events
          .filter((e) => e.bannerEv)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((e) => ({ id: e.id, title: e.titulo, image: e.bannerEv }));
        setCarouselImages(fallback);
        return;
      }

      // === Ordenar categorías por cantidad comprada ===
      const sortedCategories = Array.from(categoryCount.entries())
        .sort((a, b) => {
          const diff = b[1] - a[1];
          // Si tienen la misma cantidad, decidir aleatoriamente el orden
          if (diff === 0) return Math.random() - 0.5;
          return diff;
        })
        .map(([cat]) => cat);

      console.log("📊 Ranking de categorías compradas:");
      for (const [cat, count] of categoryCount.entries()) {
        console.log(` - ${cat}: ${count} compras`);
      }
      console.log("➡️ Categorías ordenadas por preferencia:", sortedCategories);

      // === Buscar eventos en orden de categorías más compradas ===
      const selected = [];
      const usedIds = new Set();
      const boughtEventIds = new Set();

      // === Marcar eventos ya comprados ===
      for (const order of res.items ?? []) {
        for (const item of order.items ?? []) {
          const ev = item?.eventDate?.event;
          if (ev?.eventId) boughtEventIds.add(ev.eventId);
        }
      }

      for (const cat of sortedCategories) {
        // filtrar eventos de esa categoría
        const catEvents = events.filter(
          (e) =>
            e.bannerEv &&
            e.categories?.some(
              (c) => c.category?.description?.toLowerCase() === cat.toLowerCase()
            ) &&
            !usedIds.has(e.id) &&
            !boughtEventIds.has(e.id) // filtramos comprados
        );

        console.log(`🎯 Eventos encontrados en la categoría '${cat}':`, catEvents.map(ev => ev.id));

        // mezclar aleatoriamente los eventos de esa categoría
        for (const ev of catEvents.sort(() => Math.random() - 0.5)) {
          if (selected.length < 3) {
            selected.push({ id: ev.id, title: ev.titulo, image: ev.bannerEv });
            usedIds.add(ev.id);
          }
        }

        if (selected.length >= 3) break; // ya completamos el carrusel
      }

      console.log("✅ Eventos seleccionados (antes de rellenar):", selected.map(e => e.id));

      // === Si faltan, rellenar con eventos aleatorios no repetidos ===
      if (selected.length < 3) {
        const remaining = events
          .filter((e) => e.bannerEv && !usedIds.has(e.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, 3 - selected.length)
          .map((e) => ({ id: e.id, title: e.titulo, image: e.bannerEv }));

        console.log("🎲 Eventos aleatorios usados para rellenar:", remaining.map(e => e.id));

        selected.push(...remaining);
      }

console.log("🏁 Eventos finales del carrusel:", selected.map(e => e.id));


      // === Asignar finalmente el carrusel ===
      setCarouselImages(selected);
    } catch (err) {
      console.error("Error al obtener órdenes:", err);
      // fallback random
      const fallback = events
        .filter((e) => e.bannerEv)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((e) => ({ id: e.id, title: e.titulo, image: e.bannerEv }));
      setCarouselImages(fallback);
    }
  })();
}, [isAuthenticated, user?.userId, events]);



  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Banner */}
        <div className="lg:col-span-4">
          <BannerCarousel
            key={isAuthenticated ? "auth-carousel" : "guest-carousel"} // fuerza re-render
            images={carouselImages.length > 0 ? carouselImages : imagesDemo}
            interval={5000}
            showArrows={true}
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
