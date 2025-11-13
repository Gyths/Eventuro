import { Bar } from "react-chartjs-2";

const VentasPorMesChart = () => {
  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
    ],
    datasets: [
      {
        label: "Ventas por mes (promedio)",
        data: [150, 165, 172, 180, 178, 182, 185, 176, 188],
        backgroundColor: [
          "#B388FF",
          "#9C6BFF",
          "#8E5DFF",
          "#7B45FF",
          "#6A2FFF",
          "#5919F2",
          "#5015D6",
          "#4A14BF",
          "#3F10A6",
        ],
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
          label: (ctx) => ` ${ctx.raw} tickets`,
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
          callback: (v) => v,
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
