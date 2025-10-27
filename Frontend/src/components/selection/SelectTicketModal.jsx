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
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

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

  // States para el manejo de las cantidad de entradas seleccionadas
  const [notAllocatedGeneralQuantities, setNotAllocatedGeneralQuantities] =
    React.useState(Array(selectedData.zoneDates.length).fill(0));

  // CAMBIO: evitar fill([]) que comparte la misma referencia
  const [notAllocatedSeatedQuantities, setNotAllocatedSeatedQuantities] =
    React.useState(() => selectedData.zoneDates.map(() => []));

  const [allocatedGeneralQuantities, setAllocatedGeneralQuantities] =
    React.useState(
      selectedData.zoneDates.map((zone) => {
        return zone.allocations.length > 0
          ? Array(zone.allocations.length).fill(0)
          : "";
      })
    );

  // CAMBIO: evitar fill({}) que comparte la misma referencia
  const [allocatedSeatedQuantities, setAllocatedSeatedQuantities] =
    React.useState(() => selectedData.zoneDates.map(() => ({})));

  const [subtotal, setSubtotal] = React.useState(0);
  const [seatMap, setSeatMap] = React.useState(null);
  const [zoneIndex, setZoneIndex] = React.useState(null);
  const [allocationIndex, setAllocationIndex] = React.useState(null);

  const currencies = { PEN: "S/." };

  // Manejo de suma y resta de entradas sin allocation
  const handleNoAllocationGeneralSubtraction = (zoneIndex) => {
    // CAMBIO: usar && en vez de &
    const newValues = notAllocatedGeneralQuantities.map((value, index) =>
      index === zoneIndex && value > 0 ? value - 1 : value
    );
    setNotAllocatedGeneralQuantities(newValues);
  };

  const handleNoAllocationGeneralSum = (zoneIndex) => {
    // CAMBIO: usar && y Number para límites
    const cap = Number(selectedData.zoneDates[zoneIndex].capacityRemaining || 0);
    const newValues = notAllocatedGeneralQuantities.map((value, index) =>
      index === zoneIndex && value < cap ? value + 1 : value
    );
    setNotAllocatedGeneralQuantities(newValues);
  };

  // Manejo de entradas con sitio pero sin allocation
  const handleNotAllocatedSeated = (zoneIndex) => {
    setSeatMap(selectedData.zoneDates[zoneIndex].seatMap);
    setZoneIndex(zoneIndex);
    setAllocationIndex(null);
    setModal("seats");
  };

  // Manejo de suma y resta de entradas con allocation
  const handleAllocatedGeneralSubtraction = (zoneI, allocationI) => {
    const newValues = allocatedGeneralQuantities.map(
      (allocation, zoneIndex) => {
        return zoneI === zoneIndex
          ? allocation.map((quantitie, allocationIndex) =>
              allocationI === allocationIndex && quantitie > 0
                ? quantitie - 1
                : quantitie
            )
          : allocation;
      }
    );
    setAllocatedGeneralQuantities(newValues);
  };

  const handleAllocatedGeneralSum = (zoneI, allocationI) => {
    // CAMBIO: usar && y Number
    const rem = Number(
      selectedData.zoneDates[zoneI].allocations[allocationI].remainingQuantity ||
        0
    );
    const newValues = allocatedGeneralQuantities.map(
      (allocation, zoneIndex) => {
        return zoneI === zoneIndex
          ? allocation.map((quantitie, allocationIndex) =>
              allocationI === allocationIndex && quantitie < rem
                ? quantitie + 1
                : quantitie
            )
          : allocation;
      }
    );
    setAllocatedGeneralQuantities(newValues);
  };

  // Manejo de entradas con sitio y con allocation
  const handleAllocatedSeated = (zoneIndex, allocationIndex) => {
    setSeatMap(selectedData.zoneDates[zoneIndex].seatMap);
    setZoneIndex(zoneIndex);
    setAllocationIndex(allocationIndex);
    setModal("seats");
  };

  // Calculo del subtotal resultado de entradas sin allocation ni sitios
  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;
      for (let i = 0; i < selectedData.zoneDates.length; i++) {
        // CAMBIO: Number/parseFloat para decimales
        newSubtotal +=
          Number(notAllocatedGeneralQuantities[i]) *
          parseFloat(selectedData.zoneDates[i].basePrice || 0);
      }
      setSubtotal(newSubtotal);
    }
  }, [notAllocatedGeneralQuantities, selectedData]);

  // Calculo del subtotal resultado de entradas sin allocation pero con sitios
  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;
      for (let i = 0; i < selectedData.zoneDates.length; i++) {
        newSubtotal +=
          Number(notAllocatedSeatedQuantities[i].length) *
          parseFloat(selectedData.zoneDates[i].basePrice || 0);
      }
      setSubtotal(newSubtotal);
    }
  }, [notAllocatedSeatedQuantities, selectedData]);

  // Calculo del subtotal resultado de entradas con allocation pero sin sitios
  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;

      selectedData.zoneDates.forEach((zone, zoneIndex) => {
        zone.allocations.forEach((_, allocationIndex) => {
          newSubtotal +=
            Number(allocatedGeneralQuantities[zoneIndex][allocationIndex]) *
            (parseFloat(zone.basePrice || 0) *
              (1 -
                Number(zone.allocations[allocationIndex].discountPercent || 0) /
                  100));
        });
      });
      setSubtotal(newSubtotal);
    }
  }, [allocatedGeneralQuantities, selectedData]);

  // Calculo del subtotal resultado de entradas con allocations y sitios
  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;
      selectedData.zoneDates.forEach((zone, zoneIndex) => {
        for (const seat in allocatedSeatedQuantities[zoneIndex]) {
          newSubtotal +=
            parseFloat(zone.basePrice || 0) *
            (1 -
              Number(
                zone.allocations[allocatedSeatedQuantities[zoneIndex][seat]]
                  .discountPercent || 0
              ) /
                100);
        }
      });
      setSubtotal(newSubtotal);
    }
  }, [allocatedSeatedQuantities, selectedData]);

  // Función para manejar enviar la orden a la bd
  const onContinue = async () => {
    const orderData = {};
    orderData.buyerUserId = user.userId;
    orderData.currency = "PEN";
    orderData.items = [];

    // Entradas sin allocation ni sitio
    notAllocatedGeneralQuantities.forEach((value, index) => {
      if (value > 0) {
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: selectedData.eventDateId,
          eventDateZoneId: selectedData.zoneDates[index].eventDateZoneId,
          quantity: value,
        });
      }
    });

    // Entradas sin allocation pero con sitio
    notAllocatedSeatedQuantities.forEach((zoneAllocation, index) => {
      if (zoneAllocation.length > 0) {
        zoneAllocation.forEach((seat) => {
          orderData.items.push({
            eventId: event.eventId,
            eventDateId: selectedData.eventDateId,
            eventDateZoneId: selectedData.zoneDates[index].eventDateZoneId,
            quantity: 1,
            seatId: seat,
          });
        });
      }
    });

    // Entradas con allocation pero sin sitio
    allocatedGeneralQuantities.forEach((zone, zoneIndex) => {
      if (zone !== "") {
        zone.forEach((quantitie, allocationIndex) => {
          if (quantitie > 0) {
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
          }
        });
      }
    });

    // Entradas con allocation y con sitio
    allocatedSeatedQuantities.forEach((seats, zoneIndex) => {
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

    navigate(paymentPage);
  };

  return (
    <>
      <BaseModal>
        <div className="flex flex-col rounded-xl justify-between w-full max-w-6xl h-[65vh] bg-white shadow-2xs ">
          <div className="flex flex-row h-[60vh]">
            <div className="flex flex-[4] items-stretch h-full flex-col border-r border-gray-300/60">
              {/* Header del modal */}
              <div className="flex flex-row justify-start gap-4 items-center py-4 px-4 border-b border-b-gray-300 bg-gray-200">
                <ChevronLeftIcon
                  onClick={onReturn}
                  className="fill-purple-700 shadow-2xl size-8 cursor-pointer hover:scale-105"
                ></ChevronLeftIcon>
                <span className="inline-block font-semibold text-3xl">
                  Selecciona tus entradas
                </span>
              </div>
              {/* Sección donde se muestran las entradas */}
              <div className="flex flex-col h-full w-full py-7 px-7 gap-2.5">
                {selectedData &&
                  selectedData.zoneDates.map((zone, zoneIndex) => (
                    <div key={zoneIndex} className="gap-none">
                      <div className="flex flex-row justify-between items-center py-3 border border-gray-400 shadow-2xs rounded-lg px-5">
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
                      <div className="px-2">
                        <div className="rounded-b-2xl border-b border-x border-gray-300 bg-gray-100">
                          {zone.allocations.length > 0 &&
                            zone.allocations.map(
                              (allocation, allocationIndex) => (
                                <div
                                  key={allocationIndex}
                                  className="flex flex-col rounded-2xl  bg-gray-100"
                                >
                                  <div className="flex bg-gray-100 justify-between py-2.5 pl-3.5 pr-2 rounded-2xl">
                                    <span>{allocation.audienceName}</span>
                                    <span>
                                      {currencies.PEN +
                                        " " +
                                        parseFloat(zone.basePrice || 0) *
                                          (1 -
                                            Number(
                                              allocation.discountPercent || 0
                                            ) /
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
                                            allocatedGeneralQuantities[
                                              zoneIndex
                                            ][allocationIndex]
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
                                            (value) =>
                                              value === allocationIndex
                                          ).length
                                        }
                                        )
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* Sección de información del evento */}
            <div className="flex-[2]">
              <div className="flex flex-col py-6 px-6 gap-3 justify-start">
                <img src={event?.image} className="rounded-lg"></img>
                <span className="inline-block text-start font-semibold text-2xl">
                  {event?.title}
                </span>
                <div className="flex flex-row gap-2 justify-start items-center">
                  <CalendarIcon className="size-5"></CalendarIcon>
                  <span className="inline-block">
                    {selectedData?.formattedStartDate}
                  </span>
                </div>
                <div className="flex flex-row gap-2 justify-start items-center">
                  <ClockIcon className="size-5"></ClockIcon>
                  <span className="inline-block">
                    {selectedData?.formattedStartHour +
                      " - " +
                      selectedData?.formattedEndHour}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Subtotal seleccionado */}
          <div className="flex flex-row justify-between gap-4 px-5 py-3 border-t border-gray-300/60 items-center">
            <div className="flex flex-row gap-4">
              <span className="inline-block font-semibold">Subtotal: </span>
              <span className="inline-block font-semibold">
                {currencies.PEN + " " + subtotal.toFixed(2)}
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
