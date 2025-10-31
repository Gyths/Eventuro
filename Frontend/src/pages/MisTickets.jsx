// src/pages/MisOrdenes.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";
import QRCode from "react-qr-code";
import placeholder from "../assets/image-placeholder.svg";
import RefundRequestModal from "../components/RefundRequestModal";

const CURRENCIES = { PEN: "S/.", USD: "$" };

/* ======================= Helpers de dinero/fechas ======================= */
function fmtMoney(v) {
  if (v == null) return "0.00";
  const n = Number(v);
  return n.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtDateTime(d) {
  if (!d) return "";
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

/* ===================== Helpers de ESTADO de reembolso ==================== */
// Lee un posible estado en el item (fallback cuando no hay tickets)
function readRefundStatusFromItem(it) {
  return it?.ticket?.refundStatus ?? it?.refundStatus ?? "NONE";
}

// Mapea el estado a UI
function refundStatusUI(status) {
  switch (status) {
    case "REQUESTED":
      return {
        label: "Pendiente de revisión",
        cls: "border-amber-200 bg-amber-50 text-amber-700",
      };
    case "APPROVED":
      return {
        label: "Cancelado / Reembolso aprobado",
        cls: "border-green-200 bg-green-50 text-green-700",
      };
    case "REJECTED":
      return {
        label: "Rechazado",
        cls: "border-red-200 bg-red-50 text-red-700",
      };
    default:
      return {
        label: "Vigente",
        cls: "border-gray-200 bg-gray-50 text-gray-600",
      };
  }
}

/* ========== Mapea una orden del backend a lo que la lista necesita ========== */
function mapOrderToCard(order) {
  const currency = order.currency || "PEN";
  const sym = CURRENCIES[currency] || currency;
  const firstItem =
    Array.isArray(order.items) && order.items[0] ? order.items[0] : null;

  const title =
    firstItem?.eventDate?.event?.title ||
    (order.items?.length
      ? `Compra de ${order.items.length} ítem(s)`
      : "Orden sin ítems");

  const image = firstItem?.eventDate?.event?.image || placeholder;
  const when = firstItem?.eventDate?.startAt
    ? fmtDateTime(firstItem.eventDate.startAt)
    : fmtDateTime(order.createdAt);

  return {
    id: Number(order.orderId),
    title,
    subtitle: when,
    image,
    totalLabel: `${sym} ${fmtMoney(order.totalAmount)}`,
    currencySymbol: sym,
    raw: order,
  };
}

/* =============================== Página =============================== */
export default function MisOrdenes() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let abort = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await EventuroApi({
          endpoint: `/orders/byUser/${user.userId}?pageSize=100`,
          method: "GET",
        });

        const items = Array.isArray(res?.items) ? res.items : [];
        const mapped = items.map(mapOrderToCard);

        if (!abort) {
          setOrders(mapped);
          setSelected(mapped[0] ?? null);
        }
      } catch (e) {
        if (!abort) setError(e?.message || "Error cargando órdenes");
      } finally {
        if (!abort) setLoading(false);
      }
    }

    if (user?.userId) load();
    return () => {
      abort = true;
    };
  }, [user?.userId]);

  const first = useMemo(() => orders[0] || null, [orders]);
  useEffect(() => {
    setSelected(first);
  }, [first]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Cargando tus órdenes…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="rounded-xl bg-red-50 text-red-700 px-4 py-3">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Cuenta <span className="text-gray-400">{">"}</span> Mis Tickets
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-8">
          {/* Lista de órdenes (izquierda) */}
          <div className="flex flex-col gap-5">
            {orders.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-gray-500 text-center">
                Aún no tienes órdenes.
              </div>
            )}

            {orders.map((o) => (
              <div
                key={o.id}
                onClick={() => setSelected(o)}
                className={`flex cursor-pointer gap-4 rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg ${
                  selected?.id === o.id ? "ring-2 ring-purple-400" : ""
                }`}
              >
                <img
                  src={o.image}
                  alt={o.title}
                  className="h-24 w-40 rounded-lg object-cover"
                />

                <div className="flex flex-col justify-center flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {o.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">{o.subtitle}</p>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900">
                    {o.totalLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Detalle de la orden (derecha) con desglose y estados */}
          <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6">
            {!selected ? (
              <p className="text-gray-400 text-center mt-20">
                Selecciona una orden para ver su detalle.
              </p>
            ) : (
              <OrderDetail orderCard={selected} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ Detalle de orden ============================ */
function OrderDetail({ orderCard }) {
  const { user } = useAuth();
  const o = orderCard.raw;
  const cardRef = useRef(null);

  // Estados de modales
  const [showRefund, setShowRefund] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Primer ítem como base del ticket
  const firstItem = Array.isArray(o.items) && o.items[0] ? o.items[0] : null;
  const ev = firstItem?.eventDate?.event;
  const title = ev?.title || "Evento";
  const when = firstItem?.eventDate?.startAt
    ? fmtDateTime(firstItem.eventDate.startAt)
    : "";
  const image = ev?.image || orderCard.image || placeholder;
  const location = ev?.venue
    ? [ev.venue.city, ev.venue.address || ev.venue.reference]
        .filter(Boolean)
        .join(" ")
    : ev?.inPerson
    ? "Evento presencial"
    : "Acceso virtual";

  // Cantidad total & zona de referencia
  const totalQty = (o.items || []).reduce(
    (acc, it) => acc + (it.quantity ?? 1),
    0
  );
  const zoneText = firstItem?.seat
    ? `Palcos | Fila ${firstItem.seat.rowNumber}`
    : `Zona ${firstItem?.zone?.name ?? "General"}`;

  // === Desglose por Zona × Subcategoría ===
  const pairs = (o.items || []).map((it) => ({
    zone: it?.zone?.name ?? "General",
    audience: it?.allocation?.audienceName ?? "General",
    qty: it?.quantity ?? 1,
  }));

  const grouped = pairs.reduce((acc, { zone, audience, qty }) => {
    const key = `${zone}||${audience}`;
    acc[key] = (acc[key] || 0) + qty;
    return acc;
  }, {});

  const breakdown = Object.entries(grouped)
    .map(([k, q]) => {
      const [zone, audience] = k.split("||");
      return { zone, audience, qty: q };
    })
    .sort(
      (a, b) =>
        a.zone.localeCompare(b.zone) || a.audience.localeCompare(b.audience)
    );

  // === Estados por TICKET (usando arreglo it.Ticket) ===
  const items = Array.isArray(o.items) ? o.items : [];
  const ticketsWithStatus = items.flatMap((it) => {
    const labelBase = it?.seat
      ? `Palco • Fila ${it.seat?.rowNumber} • Asiento ${
          it.seat?.seatNumber ?? "-"
        }`
      : `Zona ${it?.zone?.name ?? "General"} — ${
          it?.allocation?.audienceName ?? "General"
        }`;

    const tickets = Array.isArray(it.Ticket) ? it.Ticket : [];

    // Si vienen tickets, listamos uno por ticket
    if (tickets.length > 0) {
      return tickets.map((tk, idx) => {
        const status = tk?.refundStatus ?? "NONE";
        const ui = refundStatusUI(status);
        // id único estable
        const id =
          tk?.ticketId != null
            ? String(tk.ticketId)
            : `${it.orderItemId}-${idx}`;
        return {
          id,
          desc: labelBase, // puedes añadir `#${idx+1}` si quieres distinguir
          status,
          ui,
          refundRequestedAt: tk?.refundRequestedAt ?? null,
        };
      });
    }

    // Fallback: sin tickets, usamos estado del item (si existiera)
    const status = readRefundStatusFromItem(it);
    const ui = refundStatusUI(status);
    return [
      {
        id: String(it.orderItemId),
        desc: labelBase,
        status,
        ui,
        refundRequestedAt: it?.refundRequestedAt ?? null,
      },
    ];
  });

  // ¿Queda alguno elegible?
  const hasRefundable = ticketsWithStatus.some(
    (t) => !["REQUESTED", "APPROVED"].includes(t.status)
  );

  // Valor del QR
  const qrValue = `ORDER:${o.orderId};ITEM:${firstItem?.orderItemId ?? "NA"}`;

  // Imprimir sólo la tarjeta
  function handleDownload() {
    if (!cardRef.current) return;
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) return;
    const html = `
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Ticket</title>
          <style>
            body{font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial; padding:16px;}
            .ticket{max-width:420px; margin:0 auto; border:1px solid #c7d2fe; border-radius:14px; padding:16px;}
            img{max-width:100%; border-radius:12px;}
          </style>
        </head>
        <body onload="window.print(); setTimeout(()=>window.close(), 50)">
          <div class="ticket">${cardRef.current.innerHTML}</div>
        </body>
      </html>`;
    win.document.open();
    win.document.write(html);
    win.document.close();
  }

  return (
    <>
      <div
        ref={cardRef}
        className="rounded-2xl border border-blue-300 p-4 sm:p-5"
      >
        {/* Título y fecha */}
        <h3 className="text-2xl font-extrabold text-purple-900 mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-700 mb-3">{when}</p>

        {/* Imagen grande */}
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover rounded-xl mb-3"
        />

        {/* Ubicación */}
        <div className="flex items-center gap-2 text-gray-800 mb-4">
          <svg
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="text-purple-600"
          >
            <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
          </svg>
          <span className="text-sm">{location || "Ubicación"}</span>
        </div>

        {/* Datos + QR + Desglose */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-4 items-start">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Datos</p>
            <p className="text-sm text-gray-700">Nombre: {user?.name || "—"}</p>
            <p className="text-sm text-gray-700">
              Documento: {user?.document || "—"}
            </p>

            {/* Resumen general */}
            <div className="mt-4 text-sm text-gray-800">
              <p className="font-semibold">{zoneText}</p>
              <p>Cantidad: {totalQty}</p>
            </div>

            {/* Desglose por subcategoría */}
            {breakdown.length > 0 && (
              <div className="mt-2 text-sm text-gray-800">
                <p className="font-semibold mb-1">Desglose por subcategoría</p>
                <ul className="list-disc ml-5 space-y-0.5">
                  {breakdown.map(({ zone, audience, qty }, i) => (
                    <li key={i}>
                      <span className="font-medium">{zone}</span> — {audience}:{" "}
                      {qty}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Estado de tickets */}
            {ticketsWithStatus.length > 0 && (
              <div className="mt-4 text-sm">
                <p className="font-semibold mb-2 text-gray-900">
                  Estado de tickets
                </p>
                <ul className="space-y-2">
                  {ticketsWithStatus.map((t) => (
                    <li
                      key={t.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                    >
                      <span className="text-gray-800">{t.desc}</span>
                      <span
                        className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-[12px] ${t.ui.cls}`}
                      >
                        {t.ui.label}
                        {t.status === "REQUESTED" && t.refundRequestedAt && (
                          <em className="text-[11px] opacity-75">
                            ({fmtDateTime(t.refundRequestedAt)})
                          </em>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex sm:justify-end">
            <div className="bg-white p-2 rounded-xl border border-gray-200">
              <QRCode
                value={qrValue}
                size={150}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            className="inline-block bg-yellow-300 text-gray-700 font-semibold px-4 py-2 rounded-xl hover:brightness-95"
          >
            Imprimir / Descargar
          </button>

          <button
            onClick={() => setShowRefund(true)}
            disabled={!hasRefundable}
            className={`inline-block font-semibold px-4 py-2 rounded-xl text-white ${
              hasRefundable
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-rose-300 cursor-not-allowed"
            }`}
            title={
              hasRefundable
                ? "Solicitar devolución"
                : "No hay tickets elegibles para devolución"
            }
          >
            Solicitar devolución
          </button>
        </div>
      </div>

      {/* Modal de solicitud de devolución */}
      {showRefund && (
        <RefundRequestModal
          isOpen={showRefund}
          onClose={() => setShowRefund(false)}
          order={o}
          onSubmitted={() => {
            setShowRefund(false);
            setShowSuccess(true);
          }}
        />
      )}
    </>
  );
}
