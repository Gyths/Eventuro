import { Line } from "react-chartjs-2";

const PorcentajeOcupacionChart = () => {
  const labels = [
    "1",
    "3",
    "5",
    "7",
    "9",
    "11",
    "13",
    "15",
    "17",
    "19",
    "21",
    "23",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Conciertos",
        data: [45, 60, 75, 88, 92, 97, 90, 83, 78, 85, 92, 96],
        borderColor: "#5C16C5",
        backgroundColor: "rgba(92, 22, 197, 0.12)",
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.35,
        fill: true,
      },
      {
        label: "Teatro",
        data: [30, 40, 55, 63, 70, 80, 78, 72, 65, 69, 74, 79],
        borderColor: "#A855F7",
        backgroundColor: "rgba(168, 85, 247, 0.10)",
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.35,
        fill: true,
      },
      {
        label: "Exposiciones",
        data: [15, 22, 28, 35, 40, 48, 45, 39, 33, 30, 27, 25],
        borderColor: "#F97316",
        backgroundColor: "rgba(249, 115, 22, 0.08)",
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          font: { size: 10 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.raw}% ocupación`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280", font: { size: 9 } },
        title: {
          display: true,
          text: "Día del mes",
          color: "#9CA3AF",
          font: { size: 9 },
        },
      },
      y: {
        min: 0,
        max: 110,
        grid: { color: "#E5E7EB" },
        ticks: {
          color: "#9CA3AF",
          font: { size: 9 },
          callback: (v) => `${v}%`,
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default PorcentajeOcupacionChart;
