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

  //States para el manejo de las cantidad de entradas seleccionadas
  const [notAllocatedGeneralQuantities, setNotAllocatedGeneralQuantities] =
    React.useState(Array(selectedData.zoneDates.length).fill(0));
  const [notAllocatedSeatedQuantities, setNotAllocatedSeatedQuantities] =
    React.useState(Array(selectedData.zoneDates.length).fill([]));
  const [allocatedGeneralQuantities, setAllocatedGeneralQuantities] =
    React.useState(
      selectedData.zoneDates.map((zone) => {
        return zone.allocations.length > 0
          ? Array(zone.allocations.length).fill(0)
          : "";
      })
    );
  //console.log(allocatedGeneralQuantities);

  const [allocatedSeatedQuantities, setAllocatedSeatedQuantities] =
    React.useState(Array(selectedData.zoneDates.length).fill({}));
  console.log(allocatedSeatedQuantities);

  const [subtotal, setSubtotal] = React.useState(0);
  const [seatMap, setSeatMap] = React.useState(null);
  const [zoneIndex, setZoneIndex] = React.useState(null);
  const [allocationIndex, setAllocationIndex] = React.useState(null);

  const currencies = { PEN: "S/." };

  //Manejo de suma y resta de entradas sin allocation
  const handleNoAllocationGeneralSubtraction = (zoneIndex) => {
    const newValues = notAllocatedGeneralQuantities.map((value, index) => {
      return (index === zoneIndex) & (value > 0) ? value - 1 : value;
    });
    setNotAllocatedGeneralQuantities(newValues);
  };

  const handleNoAllocationGeneralSum = (zoneIndex) => {
    //console.log(zoneIndex);
    const newValues = notAllocatedGeneralQuantities.map((value, index) => {
      return (index === zoneIndex) &
        (value < parseInt(selectedData.zoneDates[zoneIndex].capacityRemaining))
        ? value + 1
        : value;
    });
    setNotAllocatedGeneralQuantities(newValues);
  };

  //Manejo de entradas con sitio pero sin allocation
  const handleNotAllocatedSeated = (zoneIndex) => {
    setSeatMap(selectedData.zoneDates[zoneIndex].seatMap);
    setZoneIndex(zoneIndex);
    setAllocationIndex(null);
    setModal("seats");
  };

  //Manejo de suma y resta de entradas con allocation
  const handleAllocatedGeneralSubtraction = (zoneI, allocationI) => {
    const newValues = allocatedGeneralQuantities.map(
      (allocation, zoneIndex) => {
        return zoneI === zoneIndex
          ? allocation.map((quantitie, allocationIndex) => {
              return allocationI === allocationIndex && quantitie > 0
                ? quantitie - 1
                : quantitie;
            })
          : allocation;
      }
    );
    setAllocatedGeneralQuantities(newValues);
  };

  const handleAllocatedGeneralSum = (zoneI, allocationI) => {
    //console.log(zoneIndex);
    const newValues = allocatedGeneralQuantities.map(
      (allocation, zoneIndex) => {
        //console.log("sumando en " + zoneI + " " + allocationI);
        return zoneI === zoneIndex
          ? allocation.map((quantitie, allocationIndex) => {
              return (allocationI === allocationIndex) &
                (quantitie <
                  parseInt(
                    selectedData.zoneDates[zoneIndex].allocations[allocationI]
                      .remainingQuantity
                  ))
                ? quantitie + 1
                : quantitie;
            })
          : allocation;
      }
    );
    setAllocatedGeneralQuantities(newValues);
  };

  //Manejo de entradas con sitio y con allocation
  const handleAllocatedSeated = (zoneIndex, allocationIndex) => {
    setSeatMap(selectedData.zoneDates[zoneIndex].seatMap);
    setZoneIndex(zoneIndex);
    setAllocationIndex(allocationIndex);
    setModal("seats");
  };

  //Calculo del subtotal resultado de entradas sin allocation ni sitios
  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;
      for (let i = 0; i < selectedData.zoneDates.length; i++) {
        //console.log(notAllocatedGeneralQuantities[i]);
        //console.log(selectedData.zoneDates[i].basePrice);
        newSubtotal +=
          parseInt(notAllocatedGeneralQuantities[i]) *
          parseInt(selectedData.zoneDates[i].basePrice);
      }
      setSubtotal(newSubtotal);
    }
  }, [notAllocatedGeneralQuantities]);

  //Calculo del subtotal resultado de entradas sin allocation pero con sitios
  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;
      for (let i = 0; i < selectedData.zoneDates.length; i++) {
        //console.log(notAllocatedSeatedQuantities[i]);
        //console.log(selectedData.zoneDates[i].basePrice);
        newSubtotal +=
          parseInt(notAllocatedSeatedQuantities[i].length) *
          parseInt(selectedData.zoneDates[i].basePrice);
      }
      setSubtotal(newSubtotal);
    }
  }, [notAllocatedSeatedQuantities]);

  //Calculo del subtotal resultado de entradas con allocation pero sin sitios
  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;

      selectedData.zoneDates.map((zone, zoneIndex) => {
        zone.allocations.map((quantities, allocationIndex) => {
          //console.log(allocatedGeneralQuantities[zoneIndex][allocationIndex]);
          //console.log(selectedData.zoneDates[zoneIndex].basePrice);
          /*console.log(
            selectedData.zoneDates[zoneIndex].allocations[allocationIndex]
              .discountPercent
          );*/

          newSubtotal +=
            parseInt(allocatedGeneralQuantities[zoneIndex][allocationIndex]) *
            (parseInt(zone.basePrice) *
              (1 -
                parseInt(zone.allocations[allocationIndex].discountPercent) /
                  100));
        });
      });
      setSubtotal(newSubtotal);
    }
  }, [allocatedGeneralQuantities]);

  //Calculo del subtotal resultado de entradas con allocations y sitios
  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;
      selectedData.zoneDates.map((zone, zoneIndex) => {
        for (const seat in allocatedSeatedQuantities[zoneIndex]) {
          newSubtotal +=
            parseInt(zone.basePrice) *
            (1 -
              parseInt(
                zone.allocations[allocatedSeatedQuantities[zoneIndex][seat]]
                  .discountPercent
              ) /
                100);
        }
      });
      setSubtotal(newSubtotal);
    }
  }, [allocatedSeatedQuantities]);

  //Función para manejar enviar la orden a la bd
  const onContinue = async () => {
    //Se establece la información de la orden
    const orderData = {};
    orderData.buyerUserId = user.userId;
    orderData.currency = "PEN";
    orderData.items = [];

    //Se añaden las entradas sin allocation ni sitio
    notAllocatedGeneralQuantities.map((value, index) => {
      value > 0 &&
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: selectedData.eventDateId,
          eventDateZoneId: selectedData.zoneDates[index].eventDateZoneId,
          quantity: value,
        });
    });

    //Se añaden las entradas sin allocation pero con sitio
    notAllocatedSeatedQuantities.map((zoneAllocation, index) => {
      zoneAllocation.length > 0 &&
        zoneAllocation.map((seat) => {
          orderData.items.push({
            eventId: event.eventId,
            eventDateId: selectedData.eventDateId,
            eventDateZoneId: selectedData.zoneDates[index].eventDateZoneId,
            quantity: 1,
            seatId: seat,
          });
        });
    });

    //Se añaden las entradas con allocation pero sin sitio
    allocatedGeneralQuantities.map((zone, zoneIndex) => {
      zone != "" &&
        zone.map((quantitie, allocationIndex) => {
          quantitie > 0 &&
            orderData.items.push({
              eventId: event.eventId,
              eventDateId: selectedData.eventDateId,
              eventDateZoneId:
                selectedData.zoneDates[zoneIndex].eventDateZoneId,
              eventDateZoneAllocationId:
                selectedData.zoneDates[zoneIndex].allocations[allocationIndex]
                  .eventDateZoneAllocationId,
              quantity: quantitie,
            });
        });
    });

    //Se añaden las entradas con allocation y con sitio

    allocatedSeatedQuantities.map((seats, zoneIndex) => {
      for (const seatId in seats) {
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: selectedData.eventDateId,
          eventDateZoneId: selectedData.zoneDates[zoneIndex].eventDateZoneId,
          eventDateZoneAllocationId:
            selectedData.zoneDates[zoneIndex].allocations[seats[seatId]]
              .eventDateZoneAllocationId,
          quantity: 1,
          seatId: seatId,
        });
      }
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

    //Avanza a la siguiente página
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
                  selectedData.zoneDates.map((zone, zoneIndex) => (
                    <div key={zoneIndex}>
                      <div className="flex flex-row justify-between items-center py-3">
                        <span>{zone.name}</span>
                        {/* Zonas */}
                        {zone.allocations.length === 0 && (
                          <>
                            <span>{currencies.PEN + zone.basePrice}</span>
                            {zone.kind != "SEATED" ? (
                              <div
                                key={zoneIndex}
                                className="flex flex-row gap-4 items-center"
                              >
                                <MinusIcon
                                  onClick={() =>
                                    handleNoAllocationGeneralSubtraction(
                                      zoneIndex
                                    )
                                  }
                                  className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                ></MinusIcon>
                                <span>
                                  {notAllocatedGeneralQuantities[zoneIndex]}
                                </span>
                                <PlusIcon
                                  onClick={() =>
                                    handleNoAllocationGeneralSum(zoneIndex)
                                  }
                                  className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                ></PlusIcon>
                              </div>
                            ) : (
                              <div className="flex flex-row gap-4">
                                <button
                                  onClick={() =>
                                    handleNotAllocatedSeated(zoneIndex)
                                  }
                                  className="bg-yellow-400 text-white px-2 rounded-md cursor-pointer hover:bg-yellow-500 hover:scale-105 transition-transform"
                                >
                                  Elegir
                                </button>
                                (
                                {notAllocatedSeatedQuantities[zoneIndex].length}
                                )
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      {/* Allocations */}
                      {zone.allocations.length > 0 &&
                        zone.allocations.map((allocation, allocationIndex) => (
                          <div key={allocationIndex} className="flex flex-col">
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
                                  key={allocationIndex}
                                  className="flex flex-row gap-4 items-center"
                                >
                                  <MinusIcon
                                    onClick={() =>
                                      handleAllocatedGeneralSubtraction(
                                        zoneIndex,
                                        allocationIndex
                                      )
                                    }
                                    className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                  ></MinusIcon>
                                  <span>
                                    {
                                      allocatedGeneralQuantities[zoneIndex][
                                        allocationIndex
                                      ]
                                    }
                                  </span>
                                  <PlusIcon
                                    onClick={() =>
                                      handleAllocatedGeneralSum(
                                        zoneIndex,
                                        allocationIndex
                                      )
                                    }
                                    className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                  ></PlusIcon>
                                </div>
                              ) : (
                                <div className="flex flex-row gap-3">
                                  <button
                                    onClick={() =>
                                      handleAllocatedSeated(
                                        zoneIndex,
                                        allocationIndex
                                      )
                                    }
                                    className="bg-yellow-400 text-white px-2 rounded-md cursor-pointer hover:bg-yellow-500 hover:scale-105 transition-transform"
                                  >
                                    Elegir
                                  </button>
                                  (
                                  {
                                    Object.values(
                                      allocatedSeatedQuantities[zoneIndex]
                                    ).filter(
                                      (value) => value === allocationIndex
                                    ).length
                                  }
                                  )
                                </div>
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
            setModal={setModal}
            seatMap={seatMap}
            zoneIndex={zoneIndex}
            allocationIndex={allocationIndex}
            notAllocatedSeatedQuantities={notAllocatedSeatedQuantities}
            setNotAllocatedSeatedQuantities={setNotAllocatedSeatedQuantities}
            allocatedSeatedQuantities={allocatedSeatedQuantities}
            setAllocatedSeatedQuantities={setAllocatedSeatedQuantities}
          />
        </AnimatePresence>
      )}
    </>
  );
}
