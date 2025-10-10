import React from "react";
import { EventuroApi } from "../api";
import { useNavigate } from "react-router-dom";
import { select_test } from "../components/payment/tests";
import useEvent from "../services/Event/EventContext";
import useOrder from "../services/Order/OrderContext";

export default function TicketSelection() {
  const navigate = useNavigate();
  const orderEnpoint = "/orders";
  const apiMethod = "POST";
  const paymentPage = "/pago";
  const loginPage = "/login";

  const { event } = useEvent();
  const { setOrder } = useOrder();

  async function onClick(testNum) {
    const session = JSON.parse(localStorage.getItem("session"));

    if (session === null) navigate(loginPage);

    console.log(testNum);
    console.log(select_test(testNum, event.id));

    const orderData = {};
    orderData.buyerUserId = session.user.userId;
    orderData.currency = "PEN";
    orderData.items = select_test(testNum, event.id);
    console.log(orderData);

    try {
      const response = await EventuroApi({
        endpoint: orderEnpoint,
        method: apiMethod,
        data: orderData,
        saveLocalStorage: true,
        storageName: "orderData",
      });
      setOrder(response);
    } catch (err) {
      console.error("Error al crear la orden:", err);
      throw err;
    }

    navigate(paymentPage);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-gray-100 min-h-screen">
      <span>
        Pantalla donde se muestra el detalle de los eventos y permite
        seleccionar la cantidad de tickets a comprar. Se implementará en el 2do
        sprint
      </span>
      <div className="flex flex-col bg-white rounded-lg shadow-2xl justify-center items-center px-6 py-4 gap-4">
        <div className="flex flex-row  justify-between flex-1 gap-20">
          <span> Caso de prueba 1: </span>
          <button
            onClick={() => onClick(1)}
            className="flex rounded-2xl h-7 w-20 p-2 cursor-pointer justify-center items-center text-white bg-purple-600 hover:bg-yellow-500 hover:shadow-lg hover:scale-105"
          >
            Continuar
          </button>
        </div>
        <hr className=" w-full"></hr>
        <button
          className="flex rounded-2xl h-7 w-20 cursor-pointer justify-center items-center border text-yellow-400 bg-white border-yellow-400 hover:shadow-lg hover:scale-105"
          onClick={() => navigate("/home")}
        >
          Regresar
        </button>
      </div>
    </div>
  );
}
