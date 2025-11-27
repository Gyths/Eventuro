// src/pages/EventoDetalleOrganizador.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";
import placeholder from "../assets/image-placeholder.svg";

/**
 * Resuelve una URL para un archivo dado:
 * - Si viene una URL absoluta (https://...) la usa tal cual.
 * - Si viene solo un key (/events/xxx.png o events/xxx.png) arma la URL con VITE_FILES_BASE_URL.
 * - Si no hay nada, devuelve el placeholder.
 */
function resolveFileUrl(urlOrKey) {
  if (!urlOrKey) return placeholder;

  // Ya es URL completa firmada (R2/S3, etc.)
  if (/^https?:\/\//i.test(urlOrKey)) {
    return urlOrKey;
  }

  const base = (import.meta.env.VITE_FILES_BASE_URL || "")
    .replace(/\/$/, "");
  const path = urlOrKey.startsWith("/") ? urlOrKey : `/${urlOrKey}`;
  return base ? `${base}${path}` : placeholder;
}

function fmtDate(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleString("es-PE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtDateShort(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("es-PE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function fmtHour(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fmtMoney(v) {
  if (v == null) return "0.00";
  const n = Number(v);
  return n.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function accessPolicyLabel(code) {
  switch (code) {
    case "E":
      return "Apto para público en general";
    case "T":
      return "Apto para menores de 18 años con un adulto";
    case "AO":
      return "Solo para mayores de 18 años";
    default:
      return "—";
  }
}

function computePrice(basePrice, allocation) {
  const base = Number(basePrice ?? 0);
  if (!allocation) return base;
  const type = allocation.discountType;
  const value = Number(allocation.discountValue ?? 0);

  if (type === "PERCENTAGE") {
    return base * (1 - value / 100);
  }
  if (type === "AMOUNT") {
    return base - value;
  }
  return base;
}

export default function EventoDetalleOrganizador() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  // Si venimos desde MisEventos traemos el evento en el state
  const initialEventFromState = location.state?.event ?? null;

  const [event, setEvent] = useState(initialEventFromState);
  const [loading, setLoading] = useState(!initialEventFromState);
  const [error, setError] = useState(null);

  // para el modal de zonas por fecha
  const [selectedDate, setSelectedDate] = useState(null);

  const sortedDates = useMemo(() => {
    if (!event?.dates) return [];
    return [...event.dates].sort(
      (a, b) => new Date(a.startAt) - new Date(b.startAt)
    );
  }, [event]);

  useEffect(() => {
    // si ya viene todo desde MisEventos, no llamamos al backend
    if (initialEventFromState) {
      setEvent(initialEventFromState);
      setLoading(false);
      return;
    }

    if (!eventId) return;

    let cancelled = false;

    const loadEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await EventuroApi({
          endpoint: `/event/event-detail/${eventId}`,
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!cancelled) setEvent(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("No se pudo cargar el detalle del evento.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadEvent();

    return () => {
      cancelled = true;
    };
  }, [eventId, token, initialEventFromState]);

  if (loading) {
    return (
      <div className="px-8 py-6">
        <p>Cargando detalle del evento…</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="px-8 py-6">
        <p className="text-red-600 mb-4">
          {error || "Evento no encontrado."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm"
        >
          Volver
        </button>
      </div>
    );
  }

  const eventosInPerson = event.inPerson;

  // 🔑 Preferimos URLs firmadas, si existen, y luego los keys
  const principalImg = resolveFileUrl(
    event.imagePrincipalURLSigned || event.imagePrincipalKey
  );
  const bannerImg = resolveFileUrl(
    event.imageBannerURLSigned || event.imageBannerKey
  );
  const refundFileUrl = resolveFileUrl(event.refundPolicyFileKey);

  return (
    <div className="px-8 py-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Detalles del evento</h1>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="rounded-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm"
        >
          Volver a Mis Eventos
        </button>
      </div>

      {/* PASO 1 */}
      <section className="bg-white rounded-3xl shadow-sm border p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs grid place-items-center font-bold">
            1
          </span>
          Detalles del evento
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Nombre
              </p>
              <p className="text-sm">{event.title}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Descripción
              </p>
              <p className="text-sm whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Categorías
              </p>
              <div className="flex flex-wrap gap-2">
                {event.categories?.length ? (
                  event.categories.map((c) => (
                    <span
                      key={c.category.eventCategoryId}
                      className="bg-purple-50 text-purple-700 px-4 py-1 rounded-full text-xs font-medium"
                    >
                      {c.category.description}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">Sin categorías</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500">
                Restricción
              </p>
              <p className="text-sm">
                {accessPolicyLabel(event.accessPolicy)}
              </p>

              {event.accessPolicyDescription && (
                <p className="text-xs text-gray-500 mt-1">
                  {event.accessPolicyDescription}
                </p>
              )}
            </div>
          </div>

          {/* IMÁGENES */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500">
                Imagen principal
              </p>
              <img
                src={principalImg}
                onError={(e) => {
                  e.currentTarget.src = placeholder;
                }}
                className="rounded-2xl h-52 w-full object-cover border mt-1"
                alt="Imagen principal del evento"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500">Banner</p>
              <img
                src={bannerImg}
                onError={(e) => {
                  e.currentTarget.src = placeholder;
                }}
                className="rounded-2xl h-32 w-full object-cover border mt-1"
                alt="Banner del evento"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PASO 2: Fechas y Ubicación */}
      <section className="bg-white rounded-3xl shadow-sm border p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs grid place-items-center font-bold">
            2
          </span>
          Fechas y ubicación
        </h2>

        {/* FECHAS */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">
            Fechas programadas
          </p>

          {sortedDates.length ? (
            <div className="space-y-3">
              {sortedDates.map((d) => (
                <button
                  key={d.eventDateId}
                  type="button"
                  onClick={() => setSelectedDate(d)}
                  className="w-full text-left rounded-2xl border border-purple-200 bg-purple-50/80 hover:bg-purple-100 transition px-4 py-3 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                >
                  <div>
                    <p className="text-sm font-semibold text-purple-900">
                      {fmtDateShort(d.startAt)}
                    </p>
                    <p className="text-xs text-purple-800/80">
                      Inicio: {fmtHour(d.startAt)} — Fin: {fmtHour(d.endAt)}
                    </p>
                  </div>
                  <p className="text-[11px] text-purple-700 font-medium">
                    Ver zonas y tipos de entrada
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Sin fechas configuradas</p>
          )}
        </div>

        {/* UBICACIÓN */}
        {eventosInPerson && (
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500">Ciudad</p>
                <p>{event.venue?.city || "—"}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500">
                  Dirección
                </p>
                <p>{event.venue?.address || "—"}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500">
                  Referencia
                </p>
                <p>{event.venue?.reference || "—"}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500">Aforo</p>
                <p>{event.venue?.capacity ?? "—"}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Mapa
              </p>
              <div className="w-full h-56 rounded-2xl bg-gray-100 border border-dashed flex items-center justify-center text-xs text-gray-400">
                Mapa se cargará aquí
              </div>
            </div>
          </div>
        )}
      </section>

      {/* PASO 3: Zonas y temporadas */}
      <section className="bg-white rounded-3xl shadow-sm border p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs grid place-items-center font-bold">
            3
          </span>
          Zonas y temporadas
        </h2>

        <p className="text-xs text-gray-500">
          Haz clic en una fecha en la sección anterior para ver las zonas y
          los tipos de entrada (Niños, Adultos, etc.) con sus precios y
          descuentos.
        </p>

        {/* TEMPORADAS */}
        <div className="space-y-3 pt-2 border-t">
          <p className="text-xs font-semibold text-gray-500 mb-1">
            Temporadas de venta
          </p>

          {event.salesPhases?.length ? (
            event.salesPhases.map((sp, i) => (
              <div
                key={sp.eventSalesPhaseId}
                className="border rounded-xl p-4 bg-gray-50"
              >
                <p className="text-xs text-gray-500">Temporada {i + 1}</p>
                <p className="font-semibold">{sp.name}</p>
                <p className="text-xs text-gray-600">
                  {fmtDate(sp.startAt)} — {fmtDate(sp.endAt)}
                </p>
                <p className="text-xs mt-1">
                  ◦ Descuento:{" "}
                  {Number(sp.percentage ?? 0).toFixed(2)}
                  % ◦ Límite: {sp.ticketLimit ?? "—"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">
              Sin temporadas configuradas.
            </p>
          )}
        </div>
      </section>

      {/* PASO 4 */}
      <section className="bg-white rounded-3xl shadow-sm border p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs grid place-items-center font-bold">
            4
          </span>
          Devoluciones y Descuentos
        </h2>

        {/* Códigos */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1">
            Códigos de descuento
          </p>

          {event.Discount?.length ? (
            <div className="space-y-2">
              {event.Discount.map((d) => (
                <div
                  key={d.discountId}
                  className="border rounded-xl p-3 bg-gray-50"
                >
                  <p className="font-semibold text-sm">{d.code}</p>
                  <p className="text-xs text-gray-600">
                    {Number(d.percentage).toFixed(2)}% •{" "}
                    {d.status === "A" ? "Activo" : "Inactivo"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {fmtDate(d.startAt)} — {fmtDate(d.endAt)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Sin códigos agregados.
            </p>
          )}
        </div>

        {/* Política de devoluciones */}
        <div className="pt-2 border-t">
          <p className="text-xs font-semibold text-gray-500 mb-1">
            Política de devoluciones
          </p>

          {event.refundPolicyText ? (
            <div className="border rounded-xl bg-gray-50 p-4 text-sm whitespace-pre-line">
              {event.refundPolicyText}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              No se registró una política de devoluciones.
            </p>
          )}

          {event.refundPolicyFileKey && (
            <a
              href={refundFileUrl}
              className="text-indigo-600 text-sm underline mt-2 inline-block"
              target="_blank"
              rel="noreferrer"
            >
              Ver archivo adjunto
            </a>
          )}
        </div>
      </section>

      {/* MODAL ZONAS POR FECHA */}
      {selectedDate && (
        <DateZonesModal
          dateNode={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}

/* ---------- Modal con zonas + allocations ---------- */

function DateZonesModal({ dateNode, onClose }) {
  const zones = dateNode.zoneDates ?? [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] overflow-hidden">
        <header className="px-5 py-4 border-b flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Zonas y tipos de entrada</p>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
              {fmtDateShort(dateNode.startAt)} • {fmtHour(dateNode.startAt)} —{" "}
              {fmtHour(dateNode.endAt)}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            Cerrar
          </button>
        </header>

        <div className="p-5 space-y-4 overflow-y-auto max-h-[70vh]">
          {zones.length === 0 && (
            <p className="text-sm text-gray-400">
              No hay zonas configuradas para esta fecha.
            </p>
          )}

          {zones.map((z) => {
            const currency = z.currency || "PEN";
            return (
              <div
                key={z.eventDateZoneId}
                className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {z.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Capacidad: {z.capacity} — Restante:{" "}
                      {z.capacityRemaining}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">
                    Precio base: {currency} {fmtMoney(z.basePrice)}
                  </p>
                </div>

                {z.allocations?.length ? (
                  <div className="mt-2 space-y-1 border-t pt-2">
                    {z.allocations.map((al) => {
                      const finalPrice = computePrice(z.basePrice, al);
                      return (
                        <div
                          key={al.eventDateZoneAllocationId}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs"
                        >
                          <span className="font-medium text-gray-800">
                            {al.audienceName}
                          </span>
                          <span className="text-gray-600">
                            {al.discountType === "PERCENTAGE" &&
                              `Descuento ${al.discountValue}%`}
                            {al.discountType === "AMOUNT" &&
                              `Descuento ${currency} ${fmtMoney(
                                al.discountValue
                              )}`}
                            {!al.discountType && "Sin descuento"}
                          </span>
                          <span className="font-semibold text-purple-800">
                            {currency} {fmtMoney(finalPrice)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    No hay tipos de entrada configurados para esta zona.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
