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
          "👉 Fetching report from:",
          `${BASE_URL}/eventuro/api/report/sales/${numericOrganizerId}`
        );

        const res = await fetch(
          `${BASE_URL}/eventuro/api/report/sales/${numericOrganizerId}`,
          {
            method: "GET",
            headers,
          }
        );

        console.log("👉 Raw response:", res);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Server returned error:", res.status, errorText);
          throw new Error("Request failed");
        }

        const json = await res.json();

        console.log("✅ JSON response:", json); // 👈 AQUÍ IMPRIME EL JSON REAL

        setReport(json);
      } catch (err) {
        console.error("🔥 Error generating report:", err);
      } finally {
        setPosting(false);
      }
    };

    init();
  }, [user]);

  const eventos =
    report?.events?.map((e) => ({
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
      ocupacion: Math.round(Number(e.occupancy) * 100),
    })) ?? [];

  return (
    <div className="min-h-screen bg-[#f5f5ff] text-gray-900">
      {/* CONTENIDO */}
      <main className="px-6 lg:px-10 py-6 pt-12 space-y-6">
        <div className="w-full px-4 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm w-full p-6 lg:p-8 space-y-6">
            {/* Título */}
            <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              Reporte de Eventos
            </h3>

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
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="p-4 font-semibold">
                      Seminario de sistemas web para venta de tickets
                    </td>
                    <td className="p-4">
                      17-09-25 12:00pm–02:00pm
                      <br />
                      19-09-25 02:00pm–04:00pm
                    </td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        Aceptado
                      </span>
                    </td>
                    <td className="p-4">600</td>
                    <td className="p-4">522</td>
                    <td className="p-4">
                      S/. 42,846.60
                      <br />
                      S/. 37,740.00
                    </td>
                    <td className="p-4">S/. 2,310.00</td>
                    <td className="p-4 font-semibold text-right">87%</td>
                  </tr>

                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="p-4 font-semibold">
                      Taller de integración de pasarelas de pago para venta de
                      tickets
                    </td>
                    <td className="p-4">
                      17-12-25 12:00am–02:00pm
                      <br />
                      20-12-25 05:00pm–04:00pm
                    </td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        Aceptado
                      </span>
                    </td>
                    <td className="p-4">2400</td>
                    <td className="p-4">1760</td>
                    <td className="p-4">
                      S/. 42,846.60
                      <br />
                      S/. 37,740.00
                    </td>
                    <td className="p-4">S/. 513.00</td>
                    <td className="p-4 font-semibold text-right">73%</td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition">
                    <td className="p-4 font-semibold">
                      Conferencia sobre seguridad y antifraude para venta de
                      tickets
                    </td>
                    <td className="p-4">20-01-26 12:00pm–11:00pm</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        Aceptado
                      </span>
                    </td>
                    <td className="p-4">1200</td>
                    <td className="p-4">1200</td>
                    <td className="p-4">
                      S/. 42,846.60
                      <br />
                      S/. 37,740.00
                    </td>
                    <td className="p-4">S/. 1,232.40</td>
                    <td className="p-4 font-semibold text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MÉTRICAS */}
        <div className="w-full px-4 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm w-full p-6 lg:p-8 space-y-6">
            {/* MÉTRICAS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-gray-50 px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500 mb-1">
                  Recaudado bruto (GMV)
                </p>
                <p className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  S/. 128,540
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500 mb-1">Ingresos netos</p>
                <p className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  S/. 113,220
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500 mb-1">Entradas vendidas</p>
                <p className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  3,482
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3 shadow-md">
                <p className="text-xs text-gray-500 mb-1">Tasa de reembolso</p>
                <p className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  1.8%
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
                  <VentasPorMesChart />
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3 flex flex-col shadow-md">
                <h2 className="font-semibold text-gray-800 mb-2">
                  Porcentaje de ocupación
                </h2>
                <div className="flex-1 h-64">
                  <PorcentajeOcupacionChart eventos={eventos} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
