// src/components/RefundRequestModal.jsx
import { useMemo, useState } from "react";
import { EventuroApi } from "../api";
import { useAuth } from "../services/auth/AuthContext";

/* ======================= Helpers de fecha/UI ======================= */
function formatDateTime(d) {
  if (!d) return "Fecha por confirmar";
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

/** Construye descripción legible sin mostrar IDs */
function describeItem(it) {
  const title = it?.eventDate?.event?.title ?? "Evento";
  const start = formatDateTime(it?.eventDate?.startAt);

  const zone = it?.seat
    ? `Palco • Fila ${it.seat.rowNumber} • Asiento ${it.seat.seatNumber ?? "-"}`
    : `Zona ${it?.zone?.name ?? "General"}`;

  const audience = it?.allocation?.audienceName ? ` — ${it.allocation.audienceName}` : "";
  return `${title} — ${start} — ${zone}${audience}`;
}

/* ==================== Helpers de ESTADO reembolso ==================== */
function readRefundStatusFromItem(it) {
  return it?.ticket?.refundStatus ?? it?.refundStatus ?? "NONE";
}

function refundStatusUI(status) {
  switch (status) {
    case "REQUESTED":
      return { label: "Pendiente de revisión", cls: "border-amber-200 bg-amber-50 text-amber-700" };
    case "APPROVED":
      return { label: "Cancelado / Reembolso aprobado", cls: "border-green-200 bg-green-50 text-green-700" };
    case "REJECTED":
      return { label: "Rechazado", cls: "border-red-200 bg-red-50 text-red-700" };
    default:
      return { label: "Vigente", cls: "border-gray-200 bg-gray-50 text-gray-600" };
  }
}

/* ========================= Componente principal ========================= */
export default function RefundRequestModal({
  isOpen,
  onClose,
  order,
  onSubmitted,            // el padre debe recibir { ticketIds, refundRequestedAt }
  acceptPolicyDefault = true,
}) {
  const { token } = useAuth();

  // Construye la lista plana de elementos reembolsables (1 por ticket; fallback por item)
  const refundableItems = useMemo(() => {
    const items = Array.isArray(order?.items) ? order.items : [];

    return items.flatMap((it) => {
      const tickets = Array.isArray(it.Ticket) ? it.Ticket : [];

      if (tickets.length > 0) {
        return tickets.map((tk) => {
          const refundStatus = tk?.refundStatus ?? "NONE";
          const refundRequestedAt = tk?.refundRequestedAt ?? null;
          const requested = refundStatus === "REQUESTED";
          const approved = refundStatus === "APPROVED";
          const ui = refundStatusUI(refundStatus);

          return {
            key: `${it.orderItemId}-${tk.ticketId}`,
            ticketId: String(tk.ticketId),
            orderItemId: it.orderItemId,
            description: describeItem(it),
            refundStatus,
            refundRequestedAt,
            requested,
            approved,
            ui,
            maxQty: 1,
          };
        });
      }

      // Fallback: sin tickets, usa estados a nivel item
      const refundStatus = readRefundStatusFromItem(it);
      const refundRequestedAt = it?.refundRequestedAt ?? null;
      const requested = refundStatus === "REQUESTED";
      const approved = refundStatus === "APPROVED";
      const ui = refundStatusUI(refundStatus);

      return [
        {
          key: `item-${it.orderItemId}`,
          ticketId: String(it.ticketId ?? it.orderItemId), // mejor como string
          orderItemId: it.orderItemId,
          description: describeItem(it),
          refundStatus,
          refundRequestedAt,
          requested,
          approved,
          ui,
          maxQty: it.quantity ?? 1,
        },
      ];
    });
  }, [order]);

  // Estado de selección: sólo para elegibles (no requested/approved)
  const [selected, setSelected] = useState(() =>
    refundableItems.reduce((acc, it) => {
      if (!it.requested && !it.approved) acc[it.ticketId] = { checked: false, qty: 1 };
      return acc;
    }, {})
  );

  const [agree, setAgree] = useState(acceptPolicyDefault);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  if (!isOpen) return null;

  const selectableItems = refundableItems.filter((it) => !it.requested && !it.approved);
  const chosen = selectableItems.filter(
    (it) => selected[it.ticketId]?.checked && (selected[it.ticketId]?.qty ?? 0) > 0
  );
  const canSubmit = agree && chosen.length > 0 && !submitting;

  /* ====================== Helpers de UI ====================== */
  function setChecked(id, val) {
    setSelected((prev) => ({ ...prev, [id]: { ...(prev[id] || { qty: 1 }), checked: val } }));
  }
  function setQty(id, val, max) {
    const n = Math.max(1, Math.min(Number(val) || 1, max));
    setSelected((prev) => ({ ...prev, [id]: { ...(prev[id] || { checked: true }), qty: n } }));
  }

  /* ========================= Envío ========================= */
  async function handleSubmit() {
    try {
      setSubmitting(true);
      setError("");
      setSummary(null);

      // Tomamos los IDs seleccionados (1 por ticket)
      const selectedTicketIds = chosen.map((it) => it.ticketId);

      // Si tienes endpoint por ticket:
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const requests = chosen.map((it) =>
        EventuroApi({
          endpoint: `/tickets/${encodeURIComponent(it.ticketId)}/request-refund`,
          method: "POST",
          data: { quantity: Math.min(selected[it.ticketId]?.qty ?? 1, it.maxQty) },
          headers,
        })
      );

      const results = await Promise.allSettled(requests);
      const ok = [];
      const okIds = [];
      const fail = [];

      results.forEach((r, idx) => {
        const it = chosen[idx];
        if (r.status === "fulfilled") {
          ok.push(`• ${it.description}`);
          okIds.push(it.ticketId);
        } else {
          const msg = r.reason?.message || "Error desconocido";
          fail.push(`• ${it.description} — ${msg}`);
        }
      });

      setSummary({ ok, fail });

      // Notifica al padre con los IDs que sí se actualizaron
      if (okIds.length > 0) {
        onSubmitted?.({
          ticketIds: okIds,
          refundRequestedAt: new Date().toISOString(),
        });
      }

      // Cierra si todo fue OK
      if (fail.length === 0) onClose?.();
    } catch (e) {
      setError(e?.message || "No se pudo enviar la solicitud.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ========================= Render ========================= */
  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-gray-200">
          <div className="flex items-center justify-between p-5 border-b">
            <h3 className="text-xl font-bold text-gray-900">Solicitar devolución</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
            <p className="text-sm text-gray-600">
              Selecciona los tickets que deseas devolver. La elegibilidad depende de la política del evento.
            </p>

            {/* Lista de tickets */}
            <div className="space-y-3">
              {refundableItems.map((it) => {
                const disabled = it.requested || it.approved;
                return (
                  <div
                    key={it.key}
                    className={`flex items-start gap-3 rounded-xl border p-3 ${
                      disabled ? "border-gray-200 bg-gray-50" : "border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4"
                      checked={!!selected[it.ticketId]?.checked}
                      onChange={(e) => setChecked(it.ticketId, e.target.checked)}
                      disabled={disabled}
                    />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${disabled ? "text-gray-500" : "text-gray-900"}`}>
                        {it.description}
                      </p>

                      {disabled ? (
                        <div className={`mt-1 inline-flex items-center gap-2 rounded-md border px-2 py-1 text-[12px] ${it.ui.cls}`}>
                          <span className="font-semibold">{it.ui.label}</span>
                          {it.refundRequestedAt && it.refundStatus === "REQUESTED" && (
                            <span>({formatDateTime(it.refundRequestedAt)})</span>
                          )}
                        </div>
                      ) : (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">Cantidad</span>
                          <input
                            type="number"
                            min={1}
                            max={it.maxQty}
                            value={selected[it.ticketId]?.qty ?? 1}
                            onChange={(e) => setQty(it.ticketId, e.target.value, it.maxQty)}
                            className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm"
                            disabled={!selected[it.ticketId]?.checked}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {refundableItems.length === 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-800 text-sm">
                  No hay tickets reembolsables en esta orden.
                </div>
              )}
            </div>

            {/* Aceptación de política */}
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              Confirmo que he leído y acepto la política de devoluciones del evento.
            </label>

            {/* Mensajes */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 text-sm">
                {error}
              </div>
            )}
            {summary && (summary.ok.length > 0 || summary.fail.length > 0) && (
              <div className="space-y-2">
                {summary.ok.length > 0 && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-2 text-green-800 text-sm">
                    <p className="font-semibold mb-1">Solicitudes enviadas:</p>
                    {summary.ok.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                )}
                {summary.fail.length > 0 && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-800 text-sm">
                    <p className="font-semibold mb-1">Solicitudes con error:</p>
                    {summary.fail.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className="flex items-center justify-end gap-3 p-5 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`px-4 py-2 rounded-xl font-semibold text-white ${
                canSubmit ? "bg-rose-600 hover:bg-rose-700" : "bg-rose-300 cursor-not-allowed"
              }`}
            >
              {submitting ? "Enviando…" : "Enviar solicitud"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
