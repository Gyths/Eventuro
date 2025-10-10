import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TimerTopBar() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos en segundos

  // Formatea el tiempo como MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/seleccionTickets");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  return (
    <div className="flex bg-white text-gray-600 font-semibold text-lg text-right px-10">
      {formatTime(timeLeft)}
    </div>
  );
}
