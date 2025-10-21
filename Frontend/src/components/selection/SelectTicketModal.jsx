import React from "react";
import BaseModal from "../BaseModal";
import { useNavigate } from "react-router-dom";

import useEvent from "../../services/Event/EventContext";
import useOrder from "../../services/Order/OrderContext";
import { useAuth } from "../../services/auth/AuthContext";
import { EventuroApi } from "../../api";

import SeatNumberSelectionModal from "./SeatNumberSelectionModal";

import { AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { number } from "framer-motion";

export default function SelectAllocationModal({
  modal,
  setModal,
  selectedData,
  onReturn,
}) {
  const paymentPage = "/pago";
  const orderEndpoint = "/orders";
  const apiMethod = "POST";

  const navigate = useNavigate();

  const { event } = useEvent();
  const { user } = useAuth();
  const { setOrder } = useOrder();

  console.log(selectedData);

  //Funciones para el manejo de entradas generales
  const [noAllocationGeneralQuantities, setNoAllocationGeneralQuantities] =
    React.useState(Array(100).fill(0));
  const [noAllocationSeatedQuantities, setNoAllocationSeatedQuantities] =
    React.useState([]);
  const [allocatedGeneralQuantities, setAllocatedGeneralQuantities] =
    React.useState([]);
  const [allocatedSeatedQuantities, setAllocatedSeatedQuantities] =
    React.useState([]);
  const [subtotal, setSubtotal] = React.useState(0);
  const [seatMap, setSeatMap] = React.useState(null);
  const currencies = { PEN: "S/." };

  const handleNoAllocationGeneralSubtraction = (zoneIndex) => {
    const newValues = noAllocationGeneralQuantities.map((value, index) => {
      return (index === zoneIndex) & (value > 0) ? value - 1 : value;
    });
    setNoAllocationGeneralQuantities(newValues);
  };

  const handleNoAllocationGeneralSum = (zoneIndex) => {
    console.log(zoneIndex);
    const newValues = noAllocationGeneralQuantities.map((value, index) => {
      return (index === zoneIndex) &
        (value < parseInt(selectedData.zoneDates[zoneIndex].capacityRemaining))
        ? value + 1
        : value;
    });
    setNoAllocationGeneralQuantities(newValues);
  };

  const handleNoAllocatedGeneral = (i) => {
    setSeatMap(selectedData.zoneDates[i].seatMap);
    setModal("seats");
  };

  const handleAllocationSubtraction = ({ zoneIndex, allocationIndex }) => {};
  const handleAllocationSum = ({ zoneIndex, allocationIndex }) => {};

  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;
      for (let i = 0; i < selectedData.zoneDates.length; i++) {
        console.log(noAllocationGeneralQuantities[i]);
        console.log(selectedData.zoneDates[i].basePrice);
        newSubtotal +=
          parseInt(noAllocationGeneralQuantities[i]) *
          parseInt(selectedData.zoneDates[i].basePrice);
      }
      setSubtotal(newSubtotal);
    }
  }, [noAllocationGeneralQuantities]);

  //Funciones para el manejo de entradas con sitio

  const handleAllocationsClick = ({ zoneIndex, allocationIndex }) => {};

  //Función para manejar enviar la orden a la bd
  const onContinue = async () => {
    //Se establece la información de la orden
    const orderData = {};
    orderData.buyerUserId = user.userId;
    orderData.currency = "PEN";
    orderData.items = [];
    noAllocationGeneralQuantities.forEach((value, index) => {
      value > 0 &&
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: selectedData.eventDateId,
          eventDateZoneId: selectedData.zoneDates[index].eventDateZoneId,
          quantity: value,
        });
    });

    console.log(orderData);

    //Se envía la orden
    try {
      const response = await EventuroApi({
        endpoint: orderEndpoint,
        method: apiMethod,
        data: orderData,
      });
      console.log(response);
      setOrder(response);
    } catch (err) {
      console.error("Error al consultar disponbilidad:", err);
      throw err;
    }

    //Cambio de página
    navigate(paymentPage);
  };

  return (
    <>
      <BaseModal>
        <div className="flex flex-col items-stretch w-full max-w-4xl bg-white shadow-2xs rounded-md">
          <div className="flex flex-row items-stretch">
            <div className="flex flex-[4] flex-col">
              {/* Header del modal */}
              <div className="flex flex-row justify-start gap-4 items-center py-4 px-4 border-b border-b-gray-300">
                <ChevronLeftIcon
                  onClick={onReturn}
                  className="fill-purple-700 shadow-2xl size-8 cursor-pointer hover:scale-105"
                ></ChevronLeftIcon>
                <span className="inline-block font-semibold text-3xl">
                  Selecciona tus entradas
                </span>
              </div>
              {/* Sección donde se muestran las entradas */}
              <div className="flex flex-col w-full py-7 px-7">
                <span className="inline-block border-b border-gray-200">
                  {selectedData?.formattedStartDate +
                    " " +
                    selectedData?.formattedStartHour +
                    " - " +
                    selectedData?.formattedEndHour}
                </span>
                {selectedData &&
                  selectedData.zoneDates.map((zone, index) => (
                    <div key={index}>
                      <div className="flex flex-row justify-between items-center py-3">
                        <span>{zone.name}</span>
                        {/* Zonas */}
                        {zone.allocations.length === 0 && (
                          <>
                            <span>{currencies.PEN + zone.basePrice}</span>
                            {zone.kind != "SEATED" ? (
                              <div
                                key={index}
                                className="flex flex-row gap-4 items-center"
                              >
                                <MinusIcon
                                  onClick={() =>
                                    handleNoAllocationGeneralSubtraction(index)
                                  }
                                  className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                ></MinusIcon>
                                <span>
                                  {noAllocationGeneralQuantities[index]}
                                </span>
                                <PlusIcon
                                  onClick={() =>
                                    handleNoAllocationGeneralSum(index)
                                  }
                                  className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                ></PlusIcon>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleNoAllocatedGeneral(index)}
                                className="bg-yellow-400 text-white px-2 rounded-md cursor-pointer hover:bg-yellow-500 hover:scale-105 transition-transform"
                              >
                                Elegir
                              </button>
                            )}
                          </>
                        )}
                      </div>
                      {/* Allocations */}
                      {zone.allocations.length > 0 &&
                        zone.allocations.map((allocation, index_a) => (
                          <div key={index_a} className="flex flex-col">
                            <div className="flex bg-gray-100 justify-between py-2.5 pl-3.5 pr-2">
                              <span>{allocation.audienceName}</span>
                              <span>
                                {currencies.PEN +
                                  " " +
                                  parseInt(zone.basePrice) *
                                    (1 -
                                      parseInt(allocation.discountPercent) /
                                        100)}
                              </span>
                              {zone.kind != "SEATED" ? (
                                <div
                                  key={index}
                                  className="flex flex-row gap-4 items-center"
                                >
                                  <MinusIcon
                                    onClick={() =>
                                      handleNoAllocationGeneralSubtraction(
                                        index_a
                                      )
                                    }
                                    className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                  ></MinusIcon>
                                  <span>
                                    {noAllocationGeneralQuantities[index_a]}
                                  </span>
                                  <PlusIcon
                                    onClick={() =>
                                      handleNoAllocationGeneralSum(index_a)
                                    }
                                    className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                  ></PlusIcon>
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleAllocationsClick(index_a)
                                  }
                                  className="bg-yellow-400 text-white px-2 rounded-md cursor-pointer hover:bg-yellow-500 hover:scale-105 transition-transform"
                                >
                                  Elegir
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
            {/* Sección de información del evento */}
            <div className="flex-[2] border-l border-l-gray-100"></div>
          </div>
          <div className="flex flex-row justify-between gap-4 px-5 py-1.5 border-t border-gray-100 items-center">
            <div className="flex flex-row gap-4">
              <span className="inline-block font-semibold">Subtotal: </span>
              <span className="inline-block font-semibold">
                {currencies.PEN + " " + subtotal}
              </span>
            </div>
            <button
              onClick={onContinue}
              className="inline-block bg-purple-600 rounded-lg text-white px-2.5 py-1 cursor-pointer"
            >
              Continuar
            </button>
          </div>
        </div>
      </BaseModal>
      {modal === "seats" && (
        <AnimatePresence>
          <SeatNumberSelectionModal
            seatMap={seatMap}
            setNoAllocationSeatedQuantities={setNoAllocationSeatedQuantities}
          />
        </AnimatePresence>
      )}
    </>
  );
}
