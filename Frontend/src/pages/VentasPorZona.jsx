import React, { useState, useEffect } from "react";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";
import {
  ChartBarIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  TicketIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  CalendarDaysIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const formatDateTime = (isoString) => {
  if (!isoString) return "Fecha desconocida";
  const date = new Date(isoString);
  return {
    date: date.toLocaleDateString("es-PE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

const formatCurrency = (amount, currency = "PEN") => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6 w-fit">
      <button
        onClick={() => setActiveTab("sales")}
        className={`w-40 rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200
          ${
            activeTab === "sales"
              ? "bg-white text-purple-700 shadow"
              : "text-gray-500 hover:bg-white/[0.12] hover:text-gray-700"
          }`}
      >
        Ventas por Zona
      </button>
      <button
        onClick={() => setActiveTab("analytics")}
        className={`w-40 rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200
          ${
            activeTab === "analytics"
              ? "bg-white text-purple-700 shadow"
              : "text-gray-500 hover:bg-white/[0.12] hover:text-gray-700"
          }`}
      >
        Analítica de Demanda
      </button>
    </div>
  );
}

function SalesListView({ eventsData, searchQuery, setSearchQuery }) {
  const filteredEvents = eventsData.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Barra de Búsqueda */}
      <div className="flex justify-end">
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar evento..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Lista */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center text-gray-500 border border-dashed border-gray-300 rounded-xl">
          No se encontraron eventos con ese nombre.
        </div>
      ) : (
        <div className="space-y-10">
          {filteredEvents.map((event) => {
            const totalEventRevenue = event.funciones.reduce(
              (acc, func) =>
                acc +
                func.zonas.reduce(
                  (zAcc, zone) => zAcc + Number(zone.totalRecaudado || 0),
                  0
                ),
              0
            );

            return (
              <div
                key={event.eventId}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-shadow hover:shadow-md animate-fade-in-up"
              >
                {/* Encabezado Evento */}
                <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      {event.eventName}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-2">
                      ID: {event.eventId}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                      Recaudación Total
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(totalEventRevenue)}
                    </p>
                  </div>
                </div>

                {/* Funciones */}
                <div className="divide-y divide-gray-100">
                  {event.funciones.map((func) => {
                    const start = formatDateTime(func.inicio);
                    const end = formatDateTime(func.fin);
                    const funcRevenue = func.zonas.reduce(
                      (acc, z) => acc + Number(z.totalRecaudado || 0),
                      0
                    );

                    return (
                      <div key={func.eventDateId} className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-2 border-b border-gray-100 border-dashed">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2 rounded-lg">
                              <CalendarIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 capitalize">
                                {start.date}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {start.time} - {end.time}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-lg self-start sm:self-center">
                            Total Función:{" "}
                            <span className="text-gray-900 font-bold">
                              {formatCurrency(funcRevenue)}
                            </span>
                          </div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Zona
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Precio Base
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Vendidos
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Ocupación
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {func.zonas.map((zona) => {
                                const porcentaje =
                                  zona.capacidadMaxima > 0
                                    ? (zona.ticketsVendidos /
                                        zona.capacidadMaxima) *
                                      100
                                    : 0;

                                return (
                                  <tr
                                    key={zona.zoneId}
                                    className="hover:bg-gray-50 transition-colors"
                                  >
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {zona.zoneName}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-600">
                                      {formatCurrency(
                                        zona.basePrice,
                                        zona.currency
                                      )}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {zona.ticketsVendidos} /{" "}
                                        {zona.capacidadMaxima}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap align-middle">
                                      <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[80px] mx-auto overflow-hidden">
                                        <div
                                          className={`h-2.5 rounded-full ${
                                            porcentaje >= 90
                                              ? "bg-green-500"
                                              : "bg-blue-600"
                                          }`}
                                          style={{ width: `${porcentaje}%` }}
                                        ></div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-bold text-green-600">
                                      {formatCurrency(
                                        zona.totalRecaudado,
                                        zona.currency
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AnalyticsView({ analyticsData, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center text-gray-500">
        No hay datos de analítica disponibles.
      </div>
    );
  }

  const { hours, topHour, topMonth, topWeekday } = analyticsData;

  const chartData = hours.map((h) => ({
    name: `${h.hour}:00`,
    Ventas: h.count,
  }));

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Tarjetas de Resumen (Top Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Hora */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <ClockIcon className="h-24 w-24 absolute -right-6 -bottom-6 text-white/20" />
          <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider">
            Hora Pico de Compra
          </p>
          <div className="mt-2">
            <h3 className="text-4xl font-bold">{topHour.hour}:00</h3>
            <p className="text-indigo-200 mt-1 text-sm">
              {topHour.count} ventas registradas
            </p>
          </div>
        </div>

        {/* Top Día */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <CalendarDaysIcon className="h-24 w-24 absolute -right-6 -bottom-6 text-gray-100" />
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
            Día con más ventas
          </p>
          <div className="mt-2">
            <h3 className="text-3xl font-bold text-gray-800">
              {topWeekday.weekday}
            </h3>
            <p className="text-green-600 font-medium mt-1 text-sm">
              {topWeekday.count} ventas
            </p>
          </div>
        </div>

        {/* Top Mes */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <ChartBarIcon className="h-24 w-24 absolute -right-6 -bottom-6 text-gray-100" />
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
            Mes más fuerte
          </p>
          <div className="mt-2">
            <h3 className="text-3xl font-bold text-gray-800">
              {topMonth.month}
            </h3>
            <p className="text-green-600 font-medium mt-1 text-sm">
              {topMonth.count} ventas totales
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico de Barras: Horarios */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <PresentationChartLineIcon className="h-5 w-5 text-purple-600" />
          Distribución de ventas por hora
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "#f3e8ff" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="Ventas" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name === `${topHour.hour}:00`
                        ? "#7c3aed"
                        : "#c4b5fd"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          * La barra más oscura indica la hora pico.
        </p>
      </div>
    </div>
  );
}

export default function VentasPorZona() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("sales");

  // Datos para Ventas
  const [eventsData, setEventsData] = useState([]);
  const [isSalesLoading, setIsSalesLoading] = useState(true);
  const [salesError, setSalesError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Datos para Analítica
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);

  // Cargar Ventas (Inicial)
  useEffect(() => {
    const fetchSalesSummary = async () => {
      const organizerId = user?.organizer?.organizerId;
      if (!organizerId) return;

      try {
        setIsSalesLoading(true);
        const data = await EventuroApi({
          endpoint: `/event/sales-summary/${organizerId}`,
          method: "GET",
        });
        setEventsData(Array.isArray(data) ? data : []);
      } catch (err) {
        setSalesError("Error al cargar ventas.");
      } finally {
        setIsSalesLoading(false);
      }
    };
    if (user) fetchSalesSummary();
  }, [user]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const organizerId = user?.organizer?.organizerId;
      if (!organizerId || analyticsData) return;

      try {
        setIsAnalyticsLoading(true);
        const data = await EventuroApi({
          endpoint: `/orders/analytics/organizer/${organizerId}`,
          method: "GET",
        });
        setAnalyticsData(data);
      } catch (err) {
        console.error("Error cargando analíticas", err);
      } finally {
        setIsAnalyticsLoading(false);
      }
    };

    if (activeTab === "analytics") {
      fetchAnalytics();
    }
  }, [activeTab, user, analyticsData]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <ChartBarIcon className="h-10 w-10 text-purple-600" />
          {activeTab === "sales" ? "Reporte de Ventas" : "Analítica de Demanda"}
        </h1>
        <p className="mt-2 text-gray-600">
          {activeTab === "sales"
            ? "Detalle de recaudación por evento, función y zona."
            : "Identifica tus horarios pico y tendencias de compra."}
        </p>
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "sales" ? (
        isSalesLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
          </div>
        ) : salesError ? (
          <div className="text-red-500 text-center">{salesError}</div>
        ) : eventsData.length === 0 ? (
          <div className="p-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            Aún no tienes ventas registradas.
          </div>
        ) : (
          <SalesListView
            eventsData={eventsData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )
      ) : (
        <AnalyticsView
          analyticsData={analyticsData}
          isLoading={isAnalyticsLoading}
        />
      )}
    </div>
  );
}
