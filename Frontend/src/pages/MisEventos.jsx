// src/pages/MisEventos.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";
import placeholder from "../assets/image-placeholder.svg";

// Elige la mejor imagen disponible para el evento
function getEventImage(ev) {
  const keyOrUrl =
    ev?.imagePrincipalURLSigned ||
    ev?.imageBannerURLSigned ||
    ev?.imagePrincipalKey ||
    ev?.imageBannerKey;

  // Si no hay nada, usamos el placeholder local
  if (!keyOrUrl) return placeholder;

  // Si ya es una URL absoluta, la usamos tal cual
  if (/^https?:\/\//i.test(keyOrUrl)) {
    return keyOrUrl;
  }

  // Si es solo un path/key, construimos la URL con la base
  const base = (import.meta.env.VITE_FILES_BASE_URL || "").replace(/\/$/, "");
  if (!base) return placeholder;

  const path = keyOrUrl.startsWith("/") ? keyOrUrl : `/${keyOrUrl}`;
  return `${base}${path}`;
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatRangoFechas(dates = []) {
  if (!dates.length) return "Sin fechas";
  const sorted = [...dates].sort(
    (a, b) => new Date(a.startAt) - new Date(b.startAt)
  );
  const inicio = sorted[0]?.startAt;
  const fin =
    sorted[sorted.length - 1]?.endAt || sorted[sorted.length - 1]?.startAt;

  if (!inicio) return "Sin fechas";

  if (new Date(inicio).toDateString() === new Date(fin).toDateString()) {
    return formatDate(inicio);
  }

  return `Del ${formatDate(inicio)} al ${formatDate(fin)}`;
}

export default function MisEventos() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.organizer?.organizerId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const idOrganizer = user.organizer.organizerId;

        const data = await EventuroApi({
          endpoint: `/event/events-by-organizer/${idOrganizer}`,
          method: "GET",
        });

        if (!cancelled) {
          setEvents(Array.isArray(data) ? data : data?.events ?? []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Ocurrió un error al cargar tus eventos.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadEvents();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleVerDetalle = (ev) => {
    navigate(`/organizador/eventos/${ev.eventId}`, {
      state: { event: ev },
    });
  };

  const handleExportarLista = (eventId) => {
    alert(
      `Exportar lista de invitados para el evento #${eventId} (pendiente implementación).`
    );
  };

  // --------- UI ---------

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded-full" />
            <div className="h-4 w-64 bg-gray-200 rounded-full" />
            <div className="mt-8 h-56 bg-gray-200 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
          <header>
            <h1 className="text-2xl font-semibold text-gray-900">
              Mis eventos
            </h1>
          </header>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/crearEvento")}
            className="rounded-full px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold"
          >
            Crear nuevo evento
          </button>
        </div>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Mis eventos
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Aún no has creado ningún evento. Empieza creando tu primer
                evento y podrás gestionarlo desde aquí.
              </p>
            </div>
          </header>

          <div className="mt-10 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-sm border border-dashed border-gray-300 px-8 py-10 text-center max-w-md">
              <p className="text-sm text-gray-500 mb-4">
                Aquí aparecerán todos los eventos que crees como organizador.
              </p>
              <button
                onClick={() => navigate("/crearEvento")}
                className="rounded-full px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold"
              >
                Crear evento ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Mis eventos
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Revisa la información general de tus eventos, accede al detalle y
              exporta la lista de asistentes.
            </p>
          </div>
        </header>



        {/* Lista de cards */}
        <div className="space-y-6">
          {events.map((ev) => {
            const rango = formatRangoFechas(ev.dates || []);
            const totalFechas = ev.dates?.length || 0;
            const ciudad = ev.venue?.city;
            const imageSrc = getEventImage(ev);

            return (
              <article
                key={ev.eventId}
                className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex flex-col md:flex-row"
              >
                {/* Imagen a la izquierda */}
                <div className="md:w-2/5 w-full h-52 md:h-auto overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = placeholder;
                    }}
                  />
                </div>

                {/* Info a la derecha */}
                <div className="md:w-3/5 w-full p-6 flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {ev.title}
                  </h2>

                  {ev.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {ev.categories.map((c) => (
                        <span
                          key={c.category.eventCategoryId}
                          className="px-4 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: "#E5D4FF",
                            color: "#5C1DCC",
                          }}
                        >
                          {c.category.description}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mb-1">
                    {rango}
                    {totalFechas > 0 &&
                      ` • ${totalFechas} fecha${
                        totalFechas > 1 ? "s" : ""
                      }`}
                    {ciudad && ` • ${ciudad}`}
                  </p>

                  {ev.accessPolicy && (
                    <p className="text-xs text-gray-500 mb-4">
                      {ev.accessPolicy === "E"
                        ? "Evento apto para todo público"
                        : ev.accessPolicy === "T"
                        ? "Menores de edad con acompañante adulto"
                        : "Solo para mayores de 18 años"}
                    </p>
                  )}

                  <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => handleVerDetalle(ev)}
                      className="flex-1 text-xs sm:text-sm font-semibold text-white rounded-full px-4 py-2.5"
                      style={{ backgroundColor: "#5B2EFF" }}
                    >
                      Ver detalles
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExportarLista(ev.eventId)}
                      className="flex-1 text-xs sm:text-sm font-semibold text-white rounded-full px-4 py-2.5"
                      style={{ backgroundColor: "#00B26D" }}
                    >
                      Exportar lista
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
