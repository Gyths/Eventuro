import { Bar } from "react-chartjs-2";

const MONTH_LABELS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const COLORS = [
  "#B388FF",
  "#9C6BFF",
  "#8E5DFF",
  "#7B45FF",
  "#6A2FFF",
  "#5919F2",
  "#5015D6",
  "#4A14BF",
  "#3F10A6",
  "#320A8C",
  "#26066B",
  "#1B034D",
];

export default function VentasPorMesChart({ salesByMonth = [] }) {
  // Inicializamos el array de 12 meses con 0
  const monthlyTotals = Array(12).fill(0);

  // Insertamos los valores reales donde corresponde
  salesByMonth.forEach((item) => {
    const [year, month] = item.month.split("-");
    const monthIndex = Number(month) - 1; // 0-based
    monthlyTotals[monthIndex] = item.total ?? 0;
  });

  const data = {
    labels: MONTH_LABELS,
    datasets: [
      {
        label: "Ventas por mes (promedio)",
        data: monthlyTotals,
        backgroundColor: COLORS.slice(0, MONTH_LABELS.length),
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` S/. ${ctx.raw.toLocaleString("es-PE")}`,
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
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
}
