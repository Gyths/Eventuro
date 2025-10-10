import React from "react";
import { useNavigate } from "react-router-dom";

export default function TicketSelection() {
  const navigate = useNavigate();

  async function onClick() {
    const event = JSON.parse(localStorage.getItem("eventoSeleccionado"));
    const token = localStorage.getItem("sessionToken");
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(event);
    console.log(token);
    console.log(user);

    const orderData = {
      buyerUserId: user.userId,
      items: [
        {
          eventId: event.id,
          eventDateId: 2,
          eventDateZoneId: 4,
          quantity: 2,
        },
      ],
    };

    try {
      const response = await fetch(
        "http://localhost:4000/eventuro/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      localStorage.setItem("buyOrder", JSON.stringify(result));
      console.log(result);
      navigate("/pago");
    } catch (err) {
      console.error("Error al crear la orden:", err);
      throw err;
    }
  }
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <span>
        Pantalla donde se muestra el detalle de los eventos y permite
        seleccionar la cantidad de tickets a comprar. Se implementará en el 2do
        sprint
      </span>
      <button
        className="flex rounded-2xl h-7 w-20 p-2 cursor-pointer justify-center items-center text-white bg-purple-600 hover:bg-yellow-500 hover:shadow-lg hover:scale-105"
        onClick={onClick}
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
