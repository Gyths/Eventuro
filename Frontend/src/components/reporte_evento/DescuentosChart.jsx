import React, { useMemo } from "react";

const DescuentosChart = ({ data = [], selectedEventId = null, eventList = [] }) => {
  const eventMap = useMemo(
    () => new Map(eventList.map(ev => [ev.id, ev.nombre])),
    [eventList]
  );

  const rows = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const filtered = selectedEventId
      ? data.filter((d) => d.eventId === selectedEventId)
      : data;

    return filtered
      .map((d) => {
        const initialQty = Number(d.initialQty ?? 0);
        const availableQty = Number(d.availableQty ?? 0);

        const used = initialQty - availableQty;
        const usageRate = initialQty > 0 ? used / initialQty : 0;

        return {
          key: d.discountId,
          eventName: eventMap.get(d.eventId) ?? "(Sin nombre)",
          code: d.code,
          appliesTo: d.appliesTo,
          percentage: Number(d.percentage ?? 0),
          initialQty,
          availableQty,
          used,
          usageRate,
        };
      })
      .sort((a, b) => a.availableQty / a.initialQty - b.availableQty / b.initialQty);
  }, [data, selectedEventId, eventMap]);

  if (rows.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-500 italic">
        No hay datos de descuentos para mostrar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto text-sm">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 text-left">Evento</th>
            <th className="p-3 text-left rounded-tl-2xl">Código</th>
            <th className="p-3 text-left">Aplica a</th>
            <th className="p-3 text-right">% desc.</th>
            <th className="p-3 text-right">Inicial</th>
            <th className="p-3 text-right">Disponible</th>
            <th className="p-3 text-right">Usadas</th>
            <th className="p-3 text-right">% uso</th>
            <th className="p-3 text-left rounded-tr-2xl">Progreso</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const usagePercent = Math.min(
              Math.max(row.usageRate * 100, 0),
              100
            );

            return (
              <tr
                key={row.key ?? idx}
                className="border-b border-gray-200 bg-white hover:bg-purple-50 transition"
              >
                <td className="p-3 text-gray-800 font-medium">{row.eventName}</td>
                <td className="p-3 font-semibold text-gray-800">
                  {row.code}
                </td>
                <td className="p-3 text-gray-700">{row.appliesTo}</td>
                <td className="p-3 text-right">
                  {row.percentage.toFixed(0)}%
                </td>
                <td className="p-3 text-right">{row.initialQty}</td>
                <td className="p-3 text-right">{row.availableQty}</td>
                <td className="p-3 text-right">{row.used}</td>
                <td className="p-3 text-right">
                  {usagePercent.toFixed(0)}%
                </td>
                <td className="p-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 bg-purple-600 rounded-full"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-gray-500">
        Ordenado por <strong>availableQty / initialQty</strong> (primero los
        descuentos más utilizados).
      </p>
    </div>
  );
};

export default DescuentosChart;
