import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrder from "../../../services/Order/OrderContext";

export default function TimerTopBar() {
  const navigate = useNavigate();
  const { order } = useOrder();

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!order?.expiresAt) return 0;

    const expires = new Date(order.expiresAt).getTime();
    const now = Date.now();

    return Math.max(0, Math.floor((expires - now) / 1000));
  });

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

  useEffect(() => {
    if (!order?.expiresAt) return;

    const expires = new Date(order.expiresAt).getTime();
    const now = Date.now();
    const newTimeLeft = Math.max(0, Math.floor((expires - now) / 1000));

    setTimeLeft(newTimeLeft);
  }, [order?.expiresAt]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex bg-white text-gray-600 font-semibold text-lg text-right px-10">
      {formatTime(timeLeft)}
    </div>
  );
}
