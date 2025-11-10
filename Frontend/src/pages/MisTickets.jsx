// src/pages/MisOrdenes.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";
import QRCode from "react-qr-code";
import placeholder from "../assets/image-placeholder.svg";
import RefundRequestModal from "../components/RefundRequestModal";
import SuccessModal from "../components/SuccessModal";

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
    weekday: "long", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}
function fmtDateLong(d) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleString("es-PE", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}
function refundStatusUI(status) {
  switch (status) {
    case "REQUESTED": return { label: "Pendiente de revisión", cls: "border-amber-200 bg-amber-50 text-amber-700" };
    case "APPROVED":  return { label: "Cancelado / Reembolso aprobado", cls: "border-green-200 bg-green-50 text-green-700" };
    case "REJECTED":  return { label: "Rechazado", cls: "border-red-200 bg-red-50 text-red-700" };
    default:          return { label: "Vigente", cls: "border-gray-200 bg-gray-50 text-gray-600" };
  }
}

/** Construye árbol Evento -> Fecha -> Orden (con tickets) desde tickets sueltos */
function buildEventTreeFromTickets(tickets) {
  const events = new Map();

  for (const tk of tickets) {
    const ev = tk?.event ?? {};
    const ed = tk?.eventDate ?? {};
    const ord = tk?.order ?? {};

    const evId = ev?.id ?? `ev-${tk.ticketId}`;
    const evTitle = ev?.title ?? "Evento";
    const evImage = ev?.imagePrincipalURLSigned || ev?.imageBannerURLSigned || placeholder;

    const dateId = ed?.id ?? `date-${tk.ticketId}`;
    const startAt = ed?.startAt ?? null;

    const orderId = ord?.orderId ?? `order-${tk.ticketId}`;
    const purchaseDate = ord?.createdAt ?? null;
    const currency = ord?.currency || tk?.currency || "PEN";
    const sym = CURRENCIES[currency] || currency;
    const totalLabel = ord?.totalAmount != null ? `${sym} ${fmtMoney(ord.totalAmount)}` : "";

    const desc = tk?.seat
      ? `Palco • Fila ${tk.seat.rowNumber ?? "-"} • Asiento ${tk.seat.seatNumber ?? "-"}`
      : `Zona ${tk?.zone?.name ?? "General"} — ${tk?.allocation?.audienceName ?? "General"}`;

    const ticketNode = {
      ticketId: tk.ticketId,
      desc,
      refundStatus: tk.refundStatus ?? "NONE",
      refundRequestedAt: tk.refundRequestedAt ?? null,
      qrValue: tk.qrCodeUrl || tk.qrCodeURL || `TICKET:${tk.ticketId}`,
    };

    if (!events.has(evId)) {
      events.set(evId, { eventId: evId, title: evTitle, image: evImage, dates: new Map() });
    }
    const evNode = events.get(evId);

    if (!evNode.dates.has(dateId)) {
      evNode.dates.set(dateId, { dateId, startAt, orders: new Map() });
    }
    const dateNode = evNode.dates.get(dateId);

    // “rawOrder” compatible con RefundRequestModal (items[0].Ticket[])
    if (!dateNode.orders.has(orderId)) {
      dateNode.orders.set(orderId, {
        orderId,
        purchaseDate,
        totalLabel,
        rawOrder: {
          orderId,
          createdAt: purchaseDate,
          totalAmount: ord?.totalAmount ?? null,
          currency,
          items: [{ Ticket: [] }],
        },
        tickets: [],
      });
    }
    const ordNode = dateNode.orders.get(orderId);

    ordNode.tickets.push(ticketNode);
    ordNode.rawOrder.items[0].Ticket.push({
      ticketId: tk.ticketId,
      refundStatus: tk.refundStatus ?? "NONE",
      refundRequestedAt: tk.refundRequestedAt ?? null,
      zone: tk.zone ? { name: tk.zone.name } : null,
      allocation: tk.allocation ? { audienceName: tk.allocation.audienceName } : null,
      seat: tk.seat ? { rowNumber: tk.seat.rowNumber ?? null, seatNumber: tk.seat.seatNumber ?? null } : null,
      eventDate: tk.eventDate ? { startAt: tk.eventDate.startAt, event: { title: evTitle } } : null,
    });
  }

  const eventArr = Array.from(events.values()).map((ev) => ({
    ...ev,
    dates: Array.from(ev.dates.values())
      .sort((a, b) => new Date(a.startAt ?? 0) - new Date(b.startAt ?? 0))
      .map((d) => ({
        ...d,
        orders: Array.from(d.orders.values()).sort(
          (a, b) => new Date(a.purchaseDate ?? 0) - new Date(b.purchaseDate ?? 0)
        ),
      })),
  }));

  eventArr.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  return eventArr;
}

export default function MisOrdenes() {
  const { user, token } = useAuth();
  const [ticketsRaw, setTicketsRaw] = useState([]);
  const [eventsTree, setEventsTree] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let abort = false;
    async function load() {
      try {
        setLoading(true);
        setError("");
        if (!token) throw new Error("No autenticado. Inicia sesión nuevamente.");

        const res = await EventuroApi({
          endpoint: `/tickets/my?page=1&pageSize=200`,
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }, // asegúrate que EventuroApi mergee headers
        });

        const items = Array.isArray(res?.items) ? res.items : [];
        if (!abort) setTicketsRaw(items);
      } catch (e) {
        if (!abort) setError(e?.message || "Error cargando tickets");
      } finally {
        if (!abort) setLoading(false);
      }
    }
    if (user?.userId) load();
    return () => { abort = true; };
  }, [user?.userId, token]);

  useEffect(() => {
    const tree = buildEventTreeFromTickets(ticketsRaw);
    setEventsTree(tree);
    setSelectedEventId(tree[0]?.eventId ?? null);
  }, [ticketsRaw]);

  const selectedEvent = useMemo(
    () => eventsTree.find((e) => e.eventId === selectedEventId) || null,
    [eventsTree, selectedEventId]
  );

  // Se llama cuando el modal reporta éxito; actualiza estado y muestra SuccessModal
  function handleRefundSubmitted(payload) {
    const {
      ticketIds = [],
      refundRequestedAt = new Date().toISOString(),
    } = payload || {};

    if (ticketIds.length > 0) {
      setTicketsRaw((prev) =>
        prev.map((t) =>
          ticketIds.includes(String(t.ticketId)) || ticketIds.includes(t.ticketId)
            ? { ...t, refundStatus: "REQUESTED", refundRequestedAt }
            : t
        )
      );
    }
    setShowSuccess(true);
  }

  if (loading) return <div className="min-h-screen grid place-items-center text-gray-500">Cargando tus tickets…</div>;
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

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside className="flex flex-col gap-4">
            {eventsTree.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-gray-500 text-center">Aún no tienes tickets.</div>
            )}
            {eventsTree.map((ev) => (
              <button
                key={ev.eventId}
                onClick={() => setSelectedEventId(ev.eventId)}
                className={[
                  "text-left rounded-xl bg-white p-3 shadow-md transition hover:shadow-lg",
                  selectedEventId === ev.eventId ? "ring-2 ring-purple-400 scale-[1.02]" : "",
                ].join(" ")}
              >
                <img src={ev.image} alt={ev.title} className="h-24 w-full rounded-lg object-cover mb-2" />
                <h2 className="text-sm font-semibold text-gray-900 leading-tight">{ev.title}</h2>
                <p className="text-[11px] text-gray-500">
                  {ev.dates.length} {ev.dates.length === 1 ? "fecha" : "fechas"}
                </p>
              </button>
            ))}
          </aside>

        <section className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6">
            {!selectedEvent ? (
              <p className="text-gray-400 text-center mt-20">Selecciona un evento para ver tus entradas.</p>
            ) : (
              <EventDetail eventNode={selectedEvent} onRefundSubmitted={handleRefundSubmitted} />
            )}
          </section>
        </div>
      </div>

      {/* Modal de éxito global */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="¡Solicitud enviada!"
        message="Tu solicitud de devolución fue registrada y está pendiente de revisión."
        confirmText="Entendido"
      />
    </div>
  );
}

function EventDetail({ eventNode, onRefundSubmitted }) {
  return (
    <div>
      <header className="flex items-center gap-4 mb-6">
        <img src={eventNode.image} alt={eventNode.title} className="w-24 h-24 rounded-xl object-cover border border-gray-200" />
        <div>
          <h3 className="text-2xl font-extrabold text-purple-900">{eventNode.title}</h3>
          <p className="text-sm text-gray-500">
            {eventNode.dates.length} {eventNode.dates.length === 1 ? "fecha" : "fechas"} programadas
          </p>
        </div>
      </header>

      <div className="space-y-6">
        {eventNode.dates.map((d) => (
          <DateBlock key={d.dateId} dateNode={d} onRefundSubmitted={onRefundSubmitted} />
        ))}
      </div>
    </div>
  );
}

function DateBlock({ dateNode, onRefundSubmitted }) {
  const title = dateNode.startAt ? fmtDateLong(dateNode.startAt) : "Fecha por confirmar";
  return (
    <div className="rounded-xl border border-gray-200">
      <div className="px-4 py-3 bg-gray-50 rounded-t-xl border-b border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500">Puede haber más de una compra (orden) para esta misma fecha.</p>
      </div>
      <div className="p-4 space-y-5">
        {dateNode.orders.map((o) => (
          <OrderBlock key={o.orderId} orderNode={o} onRefundSubmitted={onRefundSubmitted} />
        ))}
      </div>
    </div>
  );
}

function OrderBlock({ orderNode, onRefundSubmitted }) {
  const [showRefund, setShowRefund] = useState(false);

  const refundableTickets = orderNode.tickets.filter(
    (t) => !["REQUESTED", "APPROVED"].includes(t.refundStatus)
  );
  const hasRefundable = refundableTickets.length > 0;

  return (
    <>
      <div className="rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <p className="text-sm text-gray-600">Compra</p>
            <p className="text-xs text-gray-500">
              Comprada el {orderNode.purchaseDate ? fmtDateTime(orderNode.purchaseDate) : "—"}
            </p>
          </div>
          <div className="text-sm font-semibold text-gray-800">{orderNode.totalLabel}</div>
        </div>

        {/* Más ancho: 2 cols en lg, 3 en xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {orderNode.tickets.map((tk) => {
            const ui = refundStatusUI(tk.refundStatus);
            return (
              <div
                key={tk.ticketId}
                className="rounded-lg border border-gray-200 p-4 flex flex-col justify-between min-h-[210px]"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Ticket</p>
                  <p className="text-xs text-gray-600">
                    {tk.desc}
                  </p>

                  {/* Badge en bloque (wrap) */}
                  <div
                    className={[
                      "mt-2 rounded-md border px-3 py-1 text-[12px] leading-5",
                      "w-full max-w-full break-words",
                      ui.cls,
                    ].join(" ")}
                  >
                    <span className="font-medium">{ui.label}</span>
                    {tk.refundStatus === "REQUESTED" && tk.refundRequestedAt && (
                      <em className="opacity-75"> ({fmtDateTime(tk.refundRequestedAt)})</em>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="bg-white p-2 rounded-xl border border-gray-200">
                    <QRCode value={String(tk.qrValue)} size={90} bgColor="#ffffff" fgColor="#000000" />
                  </div>
                  <TicketPrintButton ticketNode={tk} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
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

      {showRefund && (
        <RefundRequestModal
          isOpen={showRefund}
          onClose={() => setShowRefund(false)}
          order={orderNode.rawOrder}
          acceptPolicyDefault={true}
          onSubmitted={(payload) => {
            setShowRefund(false);
            onRefundSubmitted?.(payload);
          }}
        />
      )}
    </>
  );
}

function TicketPrintButton({ ticketNode }) {
  const ref = useRef(null);
  function handlePrint() {
    if (!ref.current) return;
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) return;
    const html = `
      <html><head><meta charset="utf-8"/><title>Ticket</title>
      <style>
        body{font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial; padding:16px;}
        .ticket{max-width:320px; margin:0 auto; border:1px solid #c7d2fe; border-radius:12px; padding:12px;}
        img{max-width:100%; border-radius:10px;}
        p{margin:0}
      </style></head>
      <body onload="window.print(); setTimeout(()=>window.close(), 50)">
        <div class="ticket">${ref.current.innerHTML}</div>
      </body></html>`;
    win.document.open(); win.document.write(html); win.document.close();
  }
  return (
    <div className="flex items-center gap-2">
      <div className="hidden" ref={ref}>
        <div>
          <p style={{ fontWeight: 700, margin: 0 }}>Ticket</p>
          <p style={{ fontSize: 11, margin: "4px 0 8px" }}>{ticketNode.desc}</p>
          <div style={{ marginTop: 6, border: "1px solid #e5e7eb", padding: 6, borderRadius: 10, display: "inline-block" }}>
            <QRCode value={String(ticketNode.qrValue)} size={120} bgColor="#ffffff" fgColor="#000000" />
          </div>
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="inline-block bg-indigo-600 text-white font-semibold px-2 py-1 rounded-md hover:bg-indigo-700 text-xs"
      >
        Imprimir
      </button>
    </div>
  );
}
