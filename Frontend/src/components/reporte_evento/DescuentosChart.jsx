import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DescuentosChart = ({ data = [], selectedEventId = null }) => {
  const { labels, values } = useMemo(() => {
    if (!Array.isArray(data)) {
      return { labels: [], values: [] };
    }

    // filtrar por evento si aplica
    const filtered = selectedEventId
      ? data.filter((d) => d.eventId === selectedEventId)
      : data;

    if (filtered.length === 0) {
      return { labels: [], values: [] };
    }

    const labels = filtered.map((d, idx) => {
      return (
        d.discountName || d.name || d.label || `Descuento ${idx + 1}`
      );
    });

    const values = filtered.map((d) =>
      Number(
        d.totalDiscountAmount ??
          d.amount ??
          d.total ??
          d.monto ??
          0
      )
    );

    return { labels, values };
  }, [data, selectedEventId]);

  if (!labels.length) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-500 italic">
        No hay datos de descuentos para mostrar.
      </div>
    );
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monto descontado",
        data: values,
        backgroundColor: "rgba(147, 51, 234, 0.6)", // morado Eventuro
        borderColor: "rgba(147, 51, 234, 1)",
        borderWidth: 1.5,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y || 0;
            return `Descuento: S/. ${Number(value).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            `S/. ${Number(value).toLocaleString("es-PE", {
              maximumFractionDigits: 0,
            })}`,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default DescuentosChart;