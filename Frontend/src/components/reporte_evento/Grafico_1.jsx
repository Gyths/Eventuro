import { Bar } from "react-chartjs-2";

const VentasPorMesChart = ({ monthlyTotals = [] }) => {
  // Labels fijos en español
  const labels = [
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

  // misma paleta original (los 9 primeros) y reusamos el último para los demás
  const baseColors = [
    "#B388FF",
    "#9C6BFF",
    "#8E5DFF",
    "#7B45FF",
    "#6A2FFF",
    "#5919F2",
    "#5015D6",
    "#4A14BF",
    "#3F10A6",
  ];

  const backgroundColor = labels.map(
    (_, idx) => baseColors[Math.min(idx, baseColors.length - 1)]
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Ventas por mes (monto)",
        data: labels.map((_, i) => Number(monthlyTotals[i] || 0)),
        backgroundColor,
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
          label: (ctx) => {
            const val = Number(ctx.raw || 0);
            return ` S/. ${val.toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280", font: { size: 10 } },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: {
          color: "#9CA3AF",
          font: { size: 10 },
          callback: (v) => `S/. ${v}`,
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default VentasPorMesChart;