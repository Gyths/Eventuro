// src/components/RefundRequestModal.jsx
import { useMemo, useState } from "react";
import { EventuroApi } from "../api";

function describeItem(it) {
  const title = it?.eventDate?.event?.title ?? "Evento";
  const start = it?.eventDate?.startAt ? new Date(it.eventDate.startAt).toLocaleString("es-PE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }) : "Fecha por confirmar";

  const zone = it?.seat
    ? `Palco • Fila ${it.seat.rowNumber} • Asiento ${it.seat.seatNumber ?? "-"}`
    : `Zona ${it?.zone?.name ?? "General"}`;

  return `${title} — ${start} — ${zone}`;
}

export default function RefundRequestModal({ isOpen, onClose, order, onSubmitted }) {
  const refundableItems = useMemo(() => {
    const items = Array.isArray(order?.items) ? order.items : [];
    // Si tu backend marca estados, aquí puedes filtrar por it.status === "PAID"/"CONFIRMED"
    return items.map((it) => ({
      key: it.orderItemId,
      orderItemId: it.orderItemId,
      description: describeItem(it),
      maxQty: it.quantity ?? 1,
    }));
  }, [order]);

  const [selected, setSelected] = useState(() =>
    refundableItems.reduce((acc, it) => {
      acc[it.orderItemId] = { checked: false, qty: 1 };
      return acc;
    }, {})
  );

  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const anySelected = Object.values(selected).some((s) => s.checked && s.qty > 0);
  const canSubmit = anySelected && !!reason && agree && !submitting;

  const payload = useMemo(() => {
    const items = refundableItems
      .filter((it) => selected[it.orderItemId]?.checked && selected[it.orderItemId].qty > 0)
      .map((it) => ({
        orderItemId: it.orderItemId,
        quantity: Math.min(selected[it.orderItemId].qty, it.maxQty),
      }));
    return {
      orderId: order?.orderId,
      items,
      reason,
      comment: comment?.trim() || null,
    };
  }, [order, refundableItems, selected, reason, comment]);

  async function handleSubmit() {
    try {
      setSubmitting(true);
      setError("");

      // Ajusta el endpoint a tu backend real:
      // Ejemplos:
      // 1) POST /orders/:orderId/refund-request
      // 2) POST /refunds
      const res = await EventuroApi({
        endpoint: `/orders/${order.orderId}/refund-request`,
        method: "POST",
        data: payload,
      });

      // Puedes mostrar un toast; por simplicidad: alert
      alert("Solicitud enviada. Te notificaremos el estado de la devolución.");
      onSubmitted?.();
      onClose?.();
    } catch (e) {
      setError(e?.message || "No se pudo enviar la solicitud.");
    } finally {
      setSubmitting(false);
    }
  }

  function setChecked(id, val) {
    setSelected((prev) => ({ ...prev, [id]: { ...prev[id], checked: val } }));
  }
  function setQty(id, val, max) {
    const n = Math.max(1, Math.min(Number(val) || 1, max));
    setSelected((prev) => ({ ...prev, [id]: { ...prev[id], qty: n } }));
  }

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
              Selecciona los tickets que deseas devolver y cuéntanos el motivo. Ten en cuenta que la elegibilidad depende de la política del evento.
            </p>

            {/* Lista de items */}
            <div className="space-y-3">
              {refundableItems.map((it) => (
                <div key={it.key} className="flex items-start gap-3 rounded-xl border border-gray-200 p-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4"
                    checked={!!selected[it.orderItemId]?.checked}
                    onChange={(e) => setChecked(it.orderItemId, e.target.checked)}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{it.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Cantidad a devolver</span>
                      <input
                        type="number"
                        min={1}
                        max={it.maxQty}
                        value={selected[it.orderItemId]?.qty ?? 1}
                        onChange={(e) => setQty(it.orderItemId, e.target.value, it.maxQty)}
                        className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm"
                        disabled={!selected[it.orderItemId]?.checked}
                      />
                      <span className="text-xs text-gray-400">/ {it.maxQty} compradas</span>
                    </div>
                  </div>
                </div>
              ))}

              {refundableItems.length === 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-800 text-sm">
                  No hay ítems reembolsables en esta orden.
                </div>
              )}
            </div>

            {/* Motivo */}
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-900">Motivo</label>
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Selecciona un motivo…</option>
                <option value="NO_ASISTIRE">No podré asistir</option>
                <option value="ERROR_COMPRA">Error en la compra</option>
                <option value="EVENTO_CANCELADO">El evento fue cancelado</option>
                <option value="OTRO">Otro</option>
              </select>
            </div>

            {/* Comentario */}
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-900">Comentario (opcional)</label>
              <textarea
                rows={3}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Describe detalles que ayuden a evaluar tu solicitud…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Aceptación */}
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              Confirmo que he leído y acepto la política de devoluciones del evento.
            </label>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>

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
              className={`px-4 py-2 rounded-xl font-semibold text-white ${canSubmit ? "bg-rose-600 hover:bg-rose-700" : "bg-rose-300 cursor-not-allowed"}`}
            >
              {submitting ? "Enviando…" : "Enviar solicitud"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
