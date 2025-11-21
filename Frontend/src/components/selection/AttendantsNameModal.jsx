import React from "react";
import BaseModal from "../BaseModal";
import useEvent from "../../services/Event/EventContext";
import useOrder from "../../services/Order/OrderContext";
import { useNavigate } from "react-router-dom";

export default function AttendantsNameModal({
  shoppingCartItems,
  onReturn,
  onContinue,
}) {
  const { event, setEvent } = useEvent();
  const { setOrder } = useOrder();
  const navigate = useNavigate();
  // Función para manejar enviar la orden a la bd
  const handleContinue = async () => {
    setShowAlertMessage(false);

    const orderData = {};
    orderData.buyerUserId = user.userId;
    orderData.currency = "PEN";
    orderData.items = [];

    //Se añaden las entradas con allocation pero sin sitio
    allocatedGeneralQuantities.map((quantitiesZone, zoneIndex) => {
      if (quantitiesZone != "") {
        const zone = zonesInfo[0]?.zoneDates[zoneIndex];

        quantitiesZone.map((quantity, allocationIndex) => {
          if (quantity > 0) {
            orderData.items.push({
              eventId: event.eventId,
              eventDateId: eventDateId,
              eventDateZoneId: zone.eventDateZoneId,
              eventDateZoneAllocationId:
                zone.allocations[allocationIndex].eventDateZoneAllocationId,
              quantity: quantity,
            });
          }
        });
      }
    });

    //Se añaden las entradas con allocation y con sitio
    allocatedSeatedQuantities.map((seats, zoneIndex) => {
      const zone = zonesInfo[0]?.zoneDates[zoneIndex];

      for (const seatId in seats) {
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: eventDateId,
          eventDateZoneId: zone.eventDateZoneId,
          eventDateZoneAllocationId:
            zone.allocations[seats[seatId]].eventDateZoneAllocationId,
          quantity: 1,
          seatId: seatId,
        });
      }
    });

    try {
      setIsButtonLoading(true);
      const response = await EventuroApi({
        endpoint: orderEndpoint,
        method: apiMethod,
        data: orderData,
      });
      setOrder({
        ...response,
      });

      let shoppingCart = {};

      response.items.forEach((item) => {
        const { zoneName, allocationName, quantity, unitPrice, finalPrice } =
          item;

        if (!shoppingCart[zoneName]) {
          shoppingCart[zoneName] = {
            totalQuantity: 0,
            totalZonePrice: 0,
          };
        }

        if (!shoppingCart[zoneName][allocationName]) {
          shoppingCart[zoneName][allocationName] = [];
        }

        shoppingCart[zoneName][allocationName].push({
          quantity,
          unitPrice,
        });

        shoppingCart[zoneName].totalQuantity += Number(quantity);
        shoppingCart[zoneName].totalZonePrice += Number(
          finalPrice ?? unitPrice * quantity
        );
      });

      // Actualizar el evento con el carrito completo
      setEvent({
        ...event,
        selectedDate: zonesInfo[0]?.date[0]?.startDate,
        selectedSchedule:
          zonesInfo[0]?.date[0]?.startHour +
          " - " +
          zonesInfo[0]?.date[0]?.endHour,
        shoppingCart,
      });

      await new Promise((res) => setTimeout(res, 300));
    } catch (err) {
      await new Promise((res) => setTimeout(res, 300));
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

  console.log(shoppingCartItems);
  return (
    <BaseModal>
      <div className="flex flex-col justify-between items-start gap-4 bg-white rounded-2xl px-7 py-5  max-h-[85vh] mt-15">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="inline-block text-3xl font-semibold mb-2">
            Ingrese los Nombres de los Asistentes
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 overflow-auto">
          {shoppingCartItems != null ? (
            shoppingCartItems.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className="flex flex-col gap-2 border-1 border-gray-400 rounded-2xl p-5"
                >
                  <label className="inline-block text-black">
                    {item.zoneName + " - " + item.allocationName}
                    {item.number > 1 && " #" + item.number}
                  </label>
                  <label className="inline-block w-full text-gray-600">
                    Ingrese el nombre del asistente
                  </label>
                  <input
                    placeholder="Nombre completo"
                    className="flex bg-gray-100 rounded-xl py-1.5 px-2.5 focus:border-0"
                  ></input>
                  <label className="inline-block w-full text-gray-600">
                    Ingrese el número de documento del asistente
                  </label>
                  <input
                    placeholder="Número de documento"
                    className="flex bg-gray-100 rounded-xl py-1.5 px-2.5"
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
              className="flex bg-red-400 text-white rounded-lg py-0.5 px-2"
            >
              Volver
            </button>
          </div>
          <div onClick={onContinue} className="flex justify-end items-center">
            <button className="flex bg-purple-500 text-white rounded-lg py-0.5 px-2">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
