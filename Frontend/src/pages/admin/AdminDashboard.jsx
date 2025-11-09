import React, { useState, useEffect, useMemo } from "react";
import { ChartPieIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// NOTA: Asegúrate de haber corrido 'npm install recharts'

/**
 * Función para parsear el texto CSV a un array de objetos.
 * (La volvemos a necesitar)
 */
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",");

  // Encontrar los índices de las columnas que nos importan
  const dateIndex = headers.indexOf("issuedAt");
  const commissionIndex = headers.indexOf("platformCommissionAmount");

  if (dateIndex === -1 || commissionIndex === -1) {
    console.error(
      "Columnas 'issuedAt' o 'platformCommissionAmount' no encontradas en el CSV"
    );
    return [];
  }

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");

    if (values.length > Math.max(dateIndex, commissionIndex)) {
      data.push({
        issuedAt: values[dateIndex],
        platformCommissionAmount: parseFloat(values[commissionIndex]),
      });
    }
  }
  return data;
}

/**
 * Procesa los datos (ahora del CSV), los agrupa por día y suma las comisiones.
 */
function processChartData(rawData) {
  const dailyTotals = new Map();

  rawData.forEach((row) => {
    try {
      // El formato 'issuedAt' es: "Sun Nov 09 2025 15:58:10 GMT-0500 (hora estándar de Perú)"
      const dateString = row.issuedAt.replace(/ \(.*\)/, ""); // Quita el texto entre paréntesis
      const date = new Date(dateString);

      // Formateamos a 'YYYY-MM-DD' para agrupar
      const dayKey = date.toISOString().split("T")[0];
      const commission = row.platformCommissionAmount; // Ya es un float por parseCSV

      if (dayKey && !isNaN(commission)) {
        const currentTotal = dailyTotals.get(dayKey) || 0;
        dailyTotals.set(dayKey, currentTotal + commission);
      }
    } catch (e) {
      console.warn("Fila ignorada por fecha inválida:", row.issuedAt, e);
    }
  });

  // Convertir el Map a un array y ordenarlo por fecha
  const chartData = Array.from(dailyTotals.entries()).map(
    ([date, commission]) => ({
      date,
      commission: parseFloat(commission.toFixed(2)), // Redondear a 2 decimales
    })
  );

  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return chartData;
}

/**
 * Componente del Gráfico de Líneas
 */
function IncomeChartCard() {
  const [timeFilter, setTimeFilter] = useState("7d"); // '7d', 'month', 'quarter'

  // --- Estado para los datos ---
  const [chartData, setChartData] = useState([]); // Almacenará los datos procesados
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Lógica de Fetching (Actualizada para usar /export SIN TOKEN) ---
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);

      // 1. Calcular fechas de inicio y fin
      const to = new Date(); // Hoy
      let from = new Date();
      to.setHours(23, 59, 59, 999); // Fin del día de hoy

      switch (timeFilter) {
        case "7d":
          from.setDate(to.getDate() - 7);
          break;
        case "month":
          from = new Date(to.getFullYear(), to.getMonth(), 1);
          break;
        case "quarter":
          const currentMonth = to.getMonth(); // 0-11
          const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
          from = new Date(to.getFullYear(), quarterStartMonth, 1);
          break;
        default:
          from.setDate(to.getDate() - 7);
      }
      from.setHours(0, 0, 0, 0); // Inicio del día

      // Convertir a ISO string para la URL
      const fromISO = from.toISOString();
      const toISO = to.toISOString();

      // 2. Construir la URL con filtros, apuntando a /export
      const url = `http://localhost:4000/eventuro/api/report/sales-tickets/export?from=${fromISO}&to=${toISO}`;

      try {
        // 3. Llamar a la API (SIN token, ya que comentaste la seguridad)
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Error al obtener el reporte: ${response.statusText}`
          );
        }

        // 4. Obtenemos TEXTO (CSV), no JSON
        const csvText = await response.text();

        // 5. Procesar los datos CSV
        const rawData = parseCSV(csvText);
        const processedData = processChartData(rawData);
        setChartData(processedData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [timeFilter]); // Se ejecuta cada vez que 'timeFilter' cambia

  // Formateador para el Tooltip
  const formatCurrency = (value) => `S/ ${value.toFixed(2)}`;
  // Formateador para el Eje X
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Ajusta la zona horaria para evitar problemas de "un día antes"
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleDateString("es-PE", { day: "2-digit", month: "short" });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200">
      {/* Encabezado de la Tarjeta */}
      <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
            Ingresos por Comisión
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Ganancias generadas por la comisión de tickets vendidos.
          </p>
        </div>
        {/* Filtros de Tiempo */}
        <div className="flex-shrink-0 mt-3 sm:mt-0 rounded-lg p-1 bg-gray-100 flex">
          <FilterButton
            label="7 días"
            filter="7d"
            activeFilter={timeFilter}
            onClick={setTimeFilter}
          />
          <FilterButton
            label="Este Mes"
            filter="month"
            activeFilter={timeFilter}
            onClick={setTimeFilter}
          />
          <FilterButton
            label="Este Trimestre"
            filter="quarter"
            activeFilter={timeFilter}
            onClick={setTimeFilter}
          />
        </div>
      </div>

      {/* Cuerpo de la Tarjeta (Gráfico) */}
      <div className="p-5 h-96">
        {isLoading && (
          <div className="flex h-full items-center justify-center text-gray-500">
            Cargando datos del gráfico...
          </div>
        )}
        {error && (
          <div className="flex h-full flex-col items-center justify-center text-center text-red-600">
            <strong className="mb-2">Error al cargar el gráfico:</strong>
            <p className="text-sm font-mono bg-red-50 p-2 rounded">{error}</p>
          </div>
        )}
        {/* El gráfico ahora usa 'chartData' */}
        {!isLoading && !error && chartData.length === 0 && (
          <div className="flex h-full items-center justify-center text-gray-500">
            No se encontraron datos para el período seleccionado.
          </div>
        )}
        {!isLoading && !error && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                fontSize={12}
                stroke="#6b7280"
              />
              <YAxis
                tickFormatter={(val) => `S/ ${val}`}
                fontSize={12}
                stroke="#6b7280"
              />
              <Tooltip
                formatter={formatCurrency}
                labelFormatter={formatDate}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  borderColor: "#ddd",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="commission"
                name="Comisión"
                stroke="#8b5cf6" // Color Púrpura
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

// Pequeño componente helper para los botones de filtro
function FilterButton({ label, filter, activeFilter, onClick }) {
  const isActive = filter === activeFilter;
  return (
    <button
      onClick={() => onClick(filter)}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? "bg-white text-purple-700 shadow-sm"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Página principal del Dashboard
 */
export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-80px)]">
      {/* Encabezado de la Página */}
      <div className="border-b border-gray-200 pb-5 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
            <ChartPieIcon className="h-9 w-9 text-purple-600" />
            Dashboard
          </h3>
          <p className="mt-2 text-base text-gray-600">
            Resumen de la actividad de la plataforma.
          </p>
        </div>
      </div>

      {/* Contenido del Dashboard */}
      <div className="space-y-6">
        {/* Fila 1: Gráfico de Ingresos */}
        <IncomeChartCard />

        {/* Próximos Gráficos (Barra y Pastel) irán aquí */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white shadow-lg rounded-xl border border-gray-200 h-96 p-5 flex items-center justify-center text-gray-400">
            (Próximamente: Gráfico de Barras)
          </div>
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 h-96 p-5 flex items-center justify-center text-gray-400">
            (Próximamente: Gráfico de Pastel)
          </div>
        </div>
      </div>
    </div>
  );
}
