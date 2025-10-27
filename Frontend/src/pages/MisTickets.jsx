// src/pages/MisOrdenes.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";
import QRCode from "react-qr-code";
import placeholder from "../assets/image-placeholder.svg";

const CURRENCIES = { PEN: "S/.", USD: "$" };

function fmtMoney(v) {
  if (v == null) return "0.00";
  const n = Number(v);
  return n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

/** Mapea una orden del backend a lo que la lista necesita */
function mapOrderToCard(order) {
  const currency = order.currency || "PEN";
  const sym = CURRENCIES[currency] || currency;
  const firstItem = Array.isArray(order.items) && order.items[0] ? order.items[0] : null;

  const title =
    firstItem?.eventDate?.event?.title ||
    (order.items?.length ? `Compra de ${order.items.length} ítem(s)` : "Orden sin ítems");

  const image = firstItem?.eventDate?.event?.image || placeholder;
  const when = firstItem?.eventDate?.startAt ? fmtDateTime(firstItem.eventDate.startAt) : fmtDateTime(order.createdAt);

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
        <div className="rounded-xl bg-red-50 text-red-700 px-4 py-3">{error}</div>
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
          {/* Lista de órdenes */}
          <div className="flex flex-col gap-5">
            {orders.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-gray-500 text-center">Aún no tienes órdenes.</div>
            )}

            {orders.map((o) => (
              <div
                key={o.id}
                onClick={() => setSelected(o)}
                className={`flex cursor-pointer gap-4 rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg ${
                  selected?.id === o.id ? "ring-2 ring-purple-400" : ""
                }`}
              >
                <img src={o.image} alt={o.title} className="h-24 w-40 rounded-lg object-cover" />

                <div className="flex flex-col justify-center flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{o.title}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">{o.subtitle}</p>
                </div>

                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900">{o.totalLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Detalle de la orden → estilo “ticket” */}
          <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6">
            {!selected ? (
              <p className="text-gray-400 text-center mt-20">Selecciona una orden para ver su detalle.</p>
            ) : (
              <OrderDetail orderCard={selected} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Tarjeta de detalle tipo ticket con imagen + QR + botón Descargar (sin “Orden #…”) */
function OrderDetail({ orderCard }) {
  const { user } = useAuth();
  const o = orderCard.raw;
  const sym = orderCard.currencySymbol;
  const cardRef = useRef(null);

  // Primer ítem como base del ticket
  const firstItem = Array.isArray(o.items) && o.items[0] ? o.items[0] : null;
  const ev = firstItem?.eventDate?.event;
  const title = ev?.title || "Evento";
  const when = firstItem?.eventDate?.startAt ? fmtDateTime(firstItem.eventDate.startAt) : "";
  const image = ev?.image || orderCard.image || placeholder;
  const location = ev?.venue
    ? [ev.venue.city, ev.venue.address || ev.venue.reference].filter(Boolean).join(" ")
    : ev?.inPerson
    ? "Evento presencial"
    : "Acceso virtual";

  // Zona y cantidad
  const totalQty = (o.items || []).reduce((acc, it) => acc + (it.quantity ?? 1), 0);
  const zoneText = firstItem?.seat
    ? `Palcos | Fila ${firstItem.seat.rowNumber}`
    : `Zona ${firstItem?.zone?.name ?? "General"}`;

  // Valor del QR (ajústalo a tu validación real)
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
            body{font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji","Segoe UI Emoji"; padding:16px;}
            .ticket{max-width:420px; margin:0 auto; border:1px solid #c7d2fe; border-radius:14px; padding:16px;}
            img{max-width:100%; border-radius:12px;}
            .title{font-weight:800; font-size:22px; color:#4c1d95; margin:0 0 4px;}
            .sub{color:#374151; font-size:13px; margin-bottom:10px;}
            .row{display:flex; align-items:center; gap:8px; color:#111827; font-size:14px; margin:10px 0;}
            .bold{font-weight:600;}
            .data{font-size:14px; color:#374151;}
            .grid{display:grid; grid-template-columns:1fr 180px; gap:16px; align-items:start; margin-top:10px;}
            .btn{display:inline-block; margin-top:14px; background:#FACC15; color:#111827; border:0; padding:8px 14px; border-radius:10px; font-weight:600;}
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
    <div ref={cardRef} className="rounded-2xl border border-blue-300 p-4 sm:p-5">
      {/* Título y fecha (sin “Orden #…”) */}
      <h3 className="text-2xl font-extrabold text-purple-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-700 mb-3">{when}</p>

      {/* Imagen grande */}
      <img src={image} alt={title} className="w-full h-52 object-cover rounded-xl mb-3" />

      {/* Ubicación */}
      <div className="flex items-center gap-2 text-gray-800 mb-4">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="text-purple-600">
          <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
        </svg>
        <span className="text-sm">{location || "Ubicación"}</span>
      </div>

      {/* Datos + QR */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-4 items-start">
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Datos</p>
          <p className="text-sm text-gray-700">Nombre: {user?.name || "—"}</p>
          <p className="text-sm text-gray-700">Documento: {user?.document || "—"}</p>

          <div className="mt-4 text-sm text-gray-800">
            <p className="font-semibold">{zoneText}</p>
            <p>Cantidad: {totalQty}</p>
          </div>
        </div>

        <div className="flex sm:justify-end">
          <div className="bg-white p-2 rounded-xl border border-gray-200">
            <QRCode value={qrValue} size={150} bgColor="#ffffff" fgColor="#000000" />
          </div>
        </div>
      </div>

      {/* Botón Descargar */}
      <button
        disabled
        className="mt-4 inline-block bg-yellow-300 text-gray-700 font-semibold px-4 py-2 rounded-xl opacity-70 cursor-not-allowed"
      >
        Descargar
      </button>
    </div>
  );
}
