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

const PorcentajeOcupacionChart = ({ eventos }) => {
  function splitLabel(text, maxLength = 30) {
    const words = text.split(" ");
    const lines = [];
    let current = "";

    words.forEach((w) => {
      if ((current + " " + w).trim().length > maxLength) {
        lines.push(current.trim());
        current = w;
      } else {
        current += " " + w;
      }
    });

    if (current.trim().length > 0) lines.push(current.trim());
    return lines;
  }

  const labels = eventos.map((e) => splitLabel(e.nombre));
  const porcentajes = eventos.map((e) =>
    Math.round((e.vendidas / e.capacidad) * 100)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "% Ocupación por evento",
        data: porcentajes,
        backgroundColor: "rgba(92, 22, 197, 0.4)",
        borderColor: "#5C16C5",
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: "rgba(92, 22, 197, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const i = ctx.dataIndex;
            const evento = eventos[i];
            const p = ctx.raw;
            return ` ${evento.vendidas}/${evento.capacidad} (${p}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 9 },
          color: "#6B7280",
          maxRotation: 0,
          minRotation: 0,
          padding: 6,
        },
        grid: { display: false },
      },
      y: {
        min: 0,
        max: 110,
        ticks: {
          callback: (v) => `${v}%`,
          color: "#6B7280",
          font: { size: 9 },
        },
        grid: { color: "#E5E7EB" },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PorcentajeOcupacionChart;
