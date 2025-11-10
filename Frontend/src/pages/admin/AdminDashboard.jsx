import React, { useState, useEffect, useMemo } from "react";
import {
  ChartPieIcon,
  CurrencyDollarIcon,
  ArrowDownOnSquareIcon,
} from "@heroicons/react/24/outline";
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
import Papa from "papaparse";

function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].trim().split(",");

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length < headers.length) {
      continue;
    }

    const row = {};
    headers.forEach((header, index) => {
      const cleanHeader = header.replace(/"/g, "").trim();

      let value = values[index];
      if (value) {
        value = value.replace(/"/g, "").trim();
      }

      if (cleanHeader === "issuedAt") {
        try {
          const dateString = value.replace(/ \(.*\)/, "");
          row[cleanHeader] = new Date(dateString);
        } catch (e) {
          row[cleanHeader] = null;
        }
      } else {
        row[cleanHeader] = value;
      }
    });
    data.push(row);
  }
  return data;
}

function processChartData(rawTicketData) {
  const dailyTotals = new Map();

  rawTicketData.forEach((row) => {
    try {
      const date = row.issuedAt;
      if (!date) return;

      const dayKey = date.toISOString().split("T")[0];
      const commission = parseFloat(row.platformCommissionAmount);

      if (dayKey && !isNaN(commission)) {
        const currentTotal = dailyTotals.get(dayKey) || 0;
        dailyTotals.set(dayKey, currentTotal + commission);
      }
    } catch (e) {
      console.warn("Fila ignorada por fecha inválida:", row.issuedAt, e);
    }
  });

  const chartData = Array.from(dailyTotals.entries()).map(
    ([date, commission]) => ({
      date,
      commission: parseFloat(commission.toFixed(2)),
    })
  );

  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return chartData;
}

function IncomeChartCard() {
  const [timeFilter, setTimeFilter] = useState("7d");

  const [fullRawData, setFullRawData] = useState([]);

  const [chartData, setChartData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);
      const url =
        "http://localhost:4000/eventuro/api/report/sales-tickets/export";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Error al obtener el reporte: ${response.statusText}`
          );
        }

        const csvText = await response.text();

        const rawData = parseCSV(csvText);
        setFullRawData(rawData);

        const processedChartData = processChartData(rawData);
        setChartData(processedChartData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const filteredChartData = useMemo(() => {
    const dataMap = new Map(chartData.map((d) => [d.date, d.commission]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    if (timeFilter === "quarter") {
      const monthlyTotals = new Map();
      chartData.forEach((d) => {
        const entryDate = new Date(d.date);
        const monthIndex = entryDate.getMonth();
        const currentTotal = monthlyTotals.get(monthIndex) || 0;
        monthlyTotals.set(monthIndex, currentTotal + d.commission);
      });
      const result = [];
      const currentMonthIndex = today.getMonth();
      const quarterStartMonthIndex = Math.floor(currentMonthIndex / 3) * 3;
      for (
        let i = quarterStartMonthIndex;
        i <= quarterStartMonthIndex + 2;
        i++
      ) {
        if (i <= currentMonthIndex) {
          result.push({
            date: monthNames[i],
            commission: parseFloat((monthlyTotals.get(i) || 0).toFixed(2)),
          });
        }
      }
      return result;
    }

    let startDate = new Date(today);
    if (timeFilter === "7d") {
      startDate.setDate(today.getDate() - 6);
    } else if (timeFilter === "month") {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }
    const dateRangeData = [];
    let currentDate = new Date(startDate);
    while (currentDate <= today) {
      const dayKey = currentDate.toISOString().split("T")[0];
      const commission = dataMap.get(dayKey) || 0;
      dateRangeData.push({ date: dayKey, commission });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateRangeData;
  }, [chartData, timeFilter]);

  const filteredRawData = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    switch (timeFilter) {
      case "7d":
        startDate.setDate(today.getDate() - 7);
        break;
      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "quarter":
        const currentMonth = today.getMonth();
        const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
        startDate = new Date(today.getFullYear(), quarterStartMonth, 1);
        break;
      default:
        startDate.setDate(today.getDate() - 7);
    }

    return fullRawData.filter((ticket) => {
      const ticketDate = ticket.issuedAt;
      return ticketDate && ticketDate >= startDate && ticketDate <= today;
    });
  }, [fullRawData, timeFilter]);

  const handleExportCSV = () => {
    if (filteredRawData.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const csvString = Papa.unparse(
      filteredRawData.map((ticket) => {
        return {
          ...ticket,
          issuedAt: ticket.issuedAt ? ticket.issuedAt.toString() : "",
        };
      }),
      {
        quotes: true,
        header: true,
      }
    );

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `reporte_detallado_${timeFilter}.csv`);
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (value) => `S/ ${value.toFixed(2)}`;
  const formatDate = (value) => {
    if (typeof value === "string" && value.length <= 3) {
      return value;
    }
    try {
      const date = new Date(value);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      return date.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "short",
      });
    } catch (e) {
      return value;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200">
      <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
            Ingresos por comisión
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Ganancias generadas por la comisión de tickets vendidos.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-shrink-0 rounded-lg p-1 bg-gray-100 flex">
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
          <button
            onClick={handleExportCSV}
            disabled={isLoading || filteredRawData.length === 0}
            className="flex-shrink-0 px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg flex items-center gap-1.5 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowDownOnSquareIcon className="h-4 w-4" />
            Exportar Detalle
          </button>
        </div>
      </div>

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

        {!isLoading && !error && filteredChartData.length === 0 && (
          <div className="flex h-full items-center justify-center text-gray-500">
            No se encontraron datos para el período seleccionado.
          </div>
        )}
        {!isLoading && !error && filteredChartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredChartData}
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
                stroke="#8b5cf6"
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

export default function AdminDashboard() {
  return (
    // Centrado vertical
    <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-80px)] flex flex-col">
      <div className="w-full max-w-7xl mx-auto my-auto">
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

          {/* Próximos Gráficos (Barra y Pastel) */}
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
    </div>
  );
}
