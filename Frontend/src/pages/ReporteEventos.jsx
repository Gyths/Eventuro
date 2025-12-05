//ReporteEventos.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import VentasPorMesChart from "../components/reporte_evento/Grafico_1";
import PorcentajeOcupacionChart from "../components/reporte_evento/Grafico_2";
import { useAuth } from "../services/auth/AuthContext";
import { useRef, useState, useEffect } from "react";
import { BASE_URL } from "../config.js";

export default function ReportesOrganizador() {
  const { user } = useAuth();
  const [posting, setPosting] = useState(false);
  const hasLoaded = useRef(false);
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  // ⭐ NUEVO: evento seleccionado
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    if (hasLoaded.current) return;
    if (!user?.organizer?.organizerId) return;

    hasLoaded.current = true;

    const init = async () => {
      try {
        setPosting(true);

        const organizerId = user.organizer.organizerId;
        const numericOrganizerId = Number(organizerId);

        const session = localStorage.getItem("session");
        const token = session ? JSON.parse(session)?.token : null;

        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        console.log(
          "Fetching report from:",
          `${BASE_URL}/eventuro/api/report/sales/${numericOrganizerId}`
        );

        const res = await fetch(
          `${BASE_URL}/eventuro/api/report/sales/${numericOrganizerId}`,
          {
            method: "GET",
            headers,
          }
        );
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server returned error:", res.status, errorText);
          throw new Error("Request failed");
        }

        const json = await res.json();

        setReport(json);
      } catch (err) {
        console.error("Error generating report:", err);
      } finally {
        setPosting(false);
      }
    };

    init();
  }, [user]);

  // --------- Mapeo de eventos para la tabla y el gráfico de ocupación ---------
  const eventos =
    report?.events?.map((e) => ({
      id: e.eventId, // ⭐ importante para saber qué evento es
      nombre: e.title,
      fechas: e.dates.map((d) => {
        const start = new Date(d.startAt);
        const end = new Date(d.endAt);

        return (
          start.toLocaleString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }) +
          " - " +
          end.toLocaleTimeString("es-PE", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }),
      estado: e.status,
      capacidad: e.capacity,
      vendidas: e.sold,
      bruto: `S/. ${e.gross}`,
      neto: `S/. ${e.net}`,
      reembolso: `S/. ${e.refundAmount}`,
      ocupacion: Number(e.occupancy),
      // datos crudos para métricas cuando se filtra
      _raw: e,
    })) ?? [];

  // ⭐ NUEVO: eventos que realmente se muestran (filtrados o no)
  const eventosFiltrados =
    selectedEventId == null
      ? eventos
      : eventos.filter((e) => e.id === selectedEventId);

  // --------- Summary (global o del evento seleccionado) ----------
  const summaryGlobal = report?.summary;

  const summary =
    selectedEventId == null
      ? summaryGlobal
      : (() => {
          const ev = eventos.find((e) => e.id === selectedEventId);
          if (!ev) return summaryGlobal;

          const r = ev._raw;
          return {
            gross: r.gross,
            net: r.net,
            ticketsSold: r.sold,
            refundRate: r.refundRate,
          };
        })();

  // --------- Ventas por mes (para gráfico 1) ----------
  // 💡 Si tu API empieza a devolver eventId en cada item:
  // { month: '2025-11', total: 9620, eventId: 6 }
  const monthsOrder = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Tu JSON: charts.salesByMonth es un array con UN objeto dentro
  const rawSalesByMonthObj = report?.charts?.salesByMonth?.[0] ?? {};

  const salesByMonthTotals = monthsOrder.map((month) => {
    const rows = rawSalesByMonthObj[month] ?? [];

    // si no hay filtro, sumamos todos los montos del mes
    if (selectedEventId == null) {
      return rows.reduce((sum, r) => sum + Number(r.monto || 0), 0);
    }

    // si hay filtro, solo montos del evento seleccionado
    return rows
      .filter((r) => r.eventId === selectedEventId)
      .reduce((sum, r) => sum + Number(r.monto || 0), 0);
  });

  // --------- Helpers de formato ----------
  const formatMoney = (amount) =>
    `S/. ${Number(amount || 0).toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatPercent = (value) => {
    const n = Number(value || 0);
    return `${n.toFixed(2)}%`;
  };

  const selectedEventName =
    selectedEventId == null
      ? null
      : eventos.find((e) => e.id === selectedEventId)?.nombre ?? null;

  return (
    <div className="min-h-screen bg-[#f5f5ff] text-gray-900">
      {/* CONTENIDO */}
      <main className="px-6 lg:px-10 py-6 pt-12 space-y-6">
        <div className="w-full px-4 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm w-full p-6 lg:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                Reporte de Eventos
              </h3>

              <button
                onClick={() => navigate("/ventas-zona")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                  />
                </svg>
                <span>Ver detalle por zonas</span>
              </button>
            </div>

            {/* ⭐ NUEVO: indicador de filtro */}
            {selectedEventName && (
              <div className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-2xl px-4 py-2 text-sm text-purple-800 mb-2">
                <span>
                  Mostrando métricas y gráficos solo para:{" "}
                  <strong>{selectedEventName}</strong>
                </span>
                <button
                  className="text-xs font-semibold underline hover:opacity-80"
                  onClick={() => setSelectedEventId(null)}
                >
                  Ver todos los eventos
                </button>
              </div>
            )}

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#2d0247] text-white text-left text-sm">
                    <th className="p-4 rounded-tl-2xl">Evento</th>
                    <th className="p-4">Fechas</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Capacidad</th>
                    <th className="p-4">Vendidas</th>
                    <th className="p-4">Bruto/Neto</th>
                    <th className="p-4">Reembolso</th>
                    <th className="p-4 rounded-tr-2xl">% Ocupación</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {eventosFiltrados.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="p-4 text-center text-gray-500 italic"
                      >
                        No hay eventos con ventas registradas todavía.
                      </td>
                    </tr>
                  ) : (
                    eventosFiltrados.map((ev) => (
                      <tr
                        key={ev.id}
                        onClick={() => setSelectedEventId(ev.id)} // ⭐ click = filtrar
                        className={`border-b border-gray-200 hover:bg-purple-50 transition cursor-pointer ${
                          ev.id === selectedEventId
                            ? "bg-purple-50"
                            : "bg-white"
                        }`}
                      >
                        {/* Evento */}
                        <td className="p-4 font-semibold">{ev.nombre}</td>

                        {/* Fechas */}
                        <td className="p-4">
                          {ev.fechas.map((f, i) => (
                            <span key={i}>
                              {f}
                              {i < ev.fechas.length - 1 && <br />}
                            </span>
                          ))}
                        </td>

                        {/* Estado */}
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ev.estado === "Aceptado"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {ev.estado}
                          </span>
                        </td>

                        {/* Capacidad */}
                        <td className="p-4">{ev.capacidad}</td>

                        {/* Vendidas */}
                        <td className="p-4">{ev.vendidas}</td>

                        {/* Bruto / Neto */}
                        <td className="p-4">
                          {ev.bruto}
                          <br />
                          {ev.neto}
                        </td>

                        {/* Reembolso */}
                        <td className="p-4">{ev.reembolso}</td>

                        {/* % Ocupación */}
                        <td className="p-4 font-semibold text-right">
                          {ev.ocupacion ?? 0}%
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MÉTRICAS */}
        <div className="w-full px-4 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm w-full p-6 lg:p-8 space-y-6">
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-gray-50 px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500 mb-1">
                  Recaudado bruto (GMV)
                </p>
                <p className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  {summary ? formatMoney(summary.gross) : "S/. 0.00"}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500 mb-1">Ingresos netos</p>
                <p className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  {summary ? formatMoney(summary.net) : "S/. 0.00"}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500 mb-1">Entradas vendidas</p>
                <p className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  {summary ? summary.ticketsSold : 0}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500 mb-1">Tasa de reembolso</p>
                <p className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  {summary ? formatPercent(summary.refundRate) : "0.0%"}
                </p>
              </div>
            </section>

            {/* GRÁFICOS */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gray-50 px-4 py-3 flex flex-col shadow-md">
                <h2 className="font-semibold text-gray-800 mb-2">
                  Ventas por mes
                </h2>
                <div className="flex-1 h-64">
                  {/* ⭐ pasamos la data filtrada */}
                  <VentasPorMesChart monthlyTotals={salesByMonthTotals} />
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3 flex flex-col shadow-md">
                <h2 className="font-semibold text-gray-800 mb-2">
                  Porcentaje de ocupación
                </h2>
                <div className="flex-1 h-64">
                  {/* ⭐ usamos solo los eventos filtrados */}
                  <PorcentajeOcupacionChart eventos={eventosFiltrados} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
