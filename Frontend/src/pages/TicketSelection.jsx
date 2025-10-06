import React from "react";
import { useNavigate } from "react-router-dom";

export default function TicketSelection() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <span>
        Pantalla donde se muestra el detalle de los eventos y permite
        seleccionar la cantidad de tickets a comprar. Se implementará en el 2do
        sprint
      </span>
      <button
        className="flex rounded-2xl h-7 w-20 p-2 cursor-pointer justify-center items-center text-white bg-purple-600 hover:bg-yellow-500 hover:shadow-lg hover:scale-105"
        onClick={() => navigate("/pago")}
      >
        Pagar
      </button>
      <button
        className="flex rounded-2xl h-7 w-20 p-2 cursor-pointer justify-center items-center border text-yellow-400 bg-white border-yellow-400 hover:shadow-lg hover:scale-105"
        onClick={() => navigate("/home")}
      >
        Regresar
      </button>
    </div>
  );
}
