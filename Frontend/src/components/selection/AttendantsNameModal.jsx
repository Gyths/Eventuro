import React from "react";
import BaseModal from "../BaseModal";
import { EventuroApi } from "../../api";
import useEvent from "../../services/Event/EventContext";
import useOrder from "../../services/Order/OrderContext";
import { useAuth } from "../../services/auth/AuthContext";
import { useNavigate } from "react-router-dom";

import { TICKET_SELECTION_TEXTS } from "../payment/texts";
import AlertMessage from "../AlertMessage";
import Swal from "sweetalert2";

export default function AttendantsNameModal({
  shoppingCartItems,
  selectedDateId,
  onReturn,
  onContinue,
}) {
  const [state, setState] = React.useState({ name: "", document: "" });
  const [showAlertMessage, setShowAlertMessage] = React.useState(false);
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState(false);
  const { user } = useAuth();
  const { event, setEvent } = useEvent();
  const { setOrder } = useOrder();
  const navigate = useNavigate();

  // Función para manejar enviar la orden a la bd
  const handleContinue = async () => {
    setShowAlertMessage(false);

    let orderData = {};
    orderData.buyerUserId = user.userId;
    orderData.currency = "PEN";
    orderData.items = [];

    shoppingCartItems.map((item) => {
      orderData.items.push({
        eventId: event.eventId,
        eventDateId: selectedDateId,
        eventDateZoneId: item.zoneId,
        eventDateZoneAllocationId: item.allocationId,
        quantity: "1",
      });
    });

    try {
      setIsButtonLoading(true);

      const response = await EventuroApi({
        endpoint: "/orders/",
        method: "POST",
        data: orderData,
      });

      setOrder({
        ...response,
      });

      await new Promise((res) => setTimeout(res, 500));
      navigate("/pago");
    } catch (err) {
      await new Promise((res) => setTimeout(res, 500));
      if (err.code === 1) navigate("/login");
      if (err.code === 0) {
        //onClose();
        Swal.fire({
          icon: "error",
          title: "¡Lo sentimos!",
          text: "Ocurrió un error inesperado",
        });
      }

      setErrorCode(err.code || 0);
      setShowAlertMessage(true);
    } finally {
      setIsButtonLoading(false);
    }
  };

  function handleNameChange(evt) {
    const { name, value } = evt.target;

    let newValue = value;

    newValue = newValue.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, "");
    newValue = newValue.slice(0, 50);
    setState((prev) => ({ ...prev, [name]: newValue }));
  }

  function handleDocumentChange(evt) {
    const { name, value } = evt.target;

    let newValue = value;

    newValue = newValue.replace(/\D/g, "");
    newValue = newValue.slice(0, 8);
    setState((prev) => ({ ...prev, [name]: newValue }));
  }

  //console.log(shoppingCartItems);
  return (
    <BaseModal>
      <div className="flex flex-col justify-between items-start gap-4 bg-white rounded-2xl px-7 py-5  max-h-[85vh] mt-15">
        {/* Header */}
        <div className="flex flex-col gap-2 w-full">
          <span className="inline-block text-3xl font-semibold mb-2">
            Ingrese los Nombres de los Asistentes
          </span>
          <hr className="border-1 text-gray-200 w-full"></hr>
          {showAlertMessage && (
            <div className="flex pt-5 pb-1">
              <AlertMessage id="1">
                {TICKET_SELECTION_TEXTS.alerts[errorCode]}
              </AlertMessage>
            </div>
          )}
        </div>
        <div
          className={`grid grid-cols-${
            shoppingCartItems.length < 3 ? shoppingCartItems.length : "3"
          } gap-4 overflow-auto items-center justify-center`}
        >
          {shoppingCartItems != null ? (
            shoppingCartItems.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className="flex flex-col gap-2 border-1 border-gray-400 rounded-2xl p-5 items-start"
                >
                  <label className="inline-block text-black">
                    {item.zoneName + " - " + item.allocationName}
                    {item.number > 1 && " #" + item.number}
                  </label>
                  <label className="inline-block w-full text-gray-600">
                    Ingrese el nombre del asistente
                  </label>
                  <input
                    name={"name" + itemIndex}
                    value={state["name" + itemIndex]}
                    onChange={handleNameChange}
                    placeholder="Nombre completo"
                    className="flex bg-gray-50 rounded-xl py-1.5 px-2.5 w-full ring hover:bg-gray-100 ring-gray-300 focus:outline-0 focus:bg-gray-200/60 transition-all"
                  ></input>
                  <label className="inline-block w-full text-gray-600">
                    Ingrese el número de documento del asistente
                  </label>
                  <input
                    name={"document" + itemIndex}
                    value={state["document" + itemIndex]}
                    onChange={handleDocumentChange}
                    placeholder="Número de documento"
                    className="flex bg-gray-50 rounded-xl py-1.5 px-2.5 w-full ring hover:bg-gray-100 ring-gray-300 focus:outline-0 focus:bg-gray-200 transition-all"
                  ></input>
                </div>
              );
            })
          ) : (
            <span>No hay items en el carrito de compras</span>
          )}
        </div>
        <hr className="w-full text-gray-300"></hr>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              onClick={onReturn}
              className="flex bg-red-400 text-white rounded-lg py-0.5 px-2 cursor-pointer hover:scale-103 hover:bg-red-500 transition-all"
            >
              Volver
            </button>
          </div>
          <div
            onClick={handleContinue}
            className="flex justify-end items-center"
          >
            <button
              className={`inline-block border-0 w-auto rounded-lg text-white px-2.5 py-1 ${
                !isButtonLoading
                  ? "bg-purple-600 hover:bg-yellow-500/70 hover:scale-104  cursor-pointer"
                  : "bg-purple-700"
              } transition-all duration-200`}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
