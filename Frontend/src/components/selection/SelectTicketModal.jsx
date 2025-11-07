import React from "react";
import BaseModal from "../BaseModal";
import { useNavigate } from "react-router-dom";
import { TICKET_SELECTION_TEXTS } from "../payment/texts";
import ArrowButton from "../../components/ArrowButton";

import useEvent from "../../services/Event/EventContext";
import useOrder from "../../services/Order/OrderContext";
import { useAuth } from "../../services/auth/AuthContext";
import { EventuroApi } from "../../api";

import SeatNumberSelectionModal from "./SeatNumberSelectionModal";
import AlertMessage from "../AlertMessage";

import { AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  MinusIcon,
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
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

  const { event, setEvent } = useEvent();
  const { user } = useAuth();
  const { setOrder } = useOrder();

  //console.log(selectedData);

  const [showAlertMessage, setShowAlertMessage] = React.useState(false);

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

  const [errorMessage, setErrorMessage] = React.useState("");
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
    const cap = Number(
      selectedData.zoneDates[zoneIndex].capacityRemaining || 0
    );
    const newValues = notAllocatedGeneralQuantities.map((value, index) =>
      index === zoneIndex && value < cap ? value + 1 : value
    );
    setNotAllocatedGeneralQuantities(newValues);
    setShowAlertMessage(false);
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
          ? allocation.map((quantity, allocationIndex) => {
              return allocationI === allocationIndex && quantity > 0
                ? quantity - 1
                : quantity;
            })
          : allocation;
      }
    );
    setAllocatedGeneralQuantities(newValues);
  };

  const handleAllocatedGeneralSum = (zoneI, allocationI) => {
    // CAMBIO: usar && y Number
    const rem = Number(
      selectedData.zoneDates[zoneI].allocations[allocationI]
        .remainingQuantity || 0
    );
    const newValues = allocatedGeneralQuantities.map(
      (allocation, zoneIndex) => {
        //console.log("sumando en " + zoneI + " " + allocationI);
        if (zoneI !== zoneIndex) return allocation;
        const zone = selectedData.zoneDates[zoneIndex];
        const totalSelectedInZone = allocation.reduce(
          (sum, q) => sum + parseInt(q || 0),
          0
        );
        if (totalSelectedInZone >= parseInt(zone.capacityRemaining)) {
          return allocation;
        }
        return allocation.map((quantity, allocationIndex) => {
          return allocationIndex === allocationI ? quantity + 1 : quantity;
        });
      }
    );
    setAllocatedGeneralQuantities(newValues);
    setShowAlertMessage(false);
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
        zone.allocations.forEach((allocation, allocationIndex) => {
          newSubtotal +=
            Number(allocatedGeneralQuantities[zoneIndex][allocationIndex]) *
            parseFloat(allocation.price);
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
    if (
      !notAllocatedGeneralQuantities.length &&
      !allocatedSeatedQuantities.length &&
      !notAllocatedGeneralQuantities.length &&
      !notAllocatedSeatedQuantities.length
    ) {
      setShowAlertMessage(true);
      return;
    }
    setShowAlertMessage(false);

    let shoppingCart = {};
    const orderData = {};
    orderData.buyerUserId = user.userId;
    orderData.currency = "PEN";
    orderData.items = [];

    //Se añaden las entradas sin allocation ni sitio
    notAllocatedGeneralQuantities.map((quantity, index) => {
      if (quantity > 0) {
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: selectedData.eventDateId,
          eventDateZoneId: selectedData.zoneDates[index].eventDateZoneId,
          quantity: quantity,
        });

        const zonePrice =
          parseInt(quantity) *
          parseFloat(selectedData.zoneDates[index].basePrice);

        shoppingCart[selectedData.zoneDates[index].name] = {
          allocation: "",
          quantity: parseInt(quantity),
          price: zonePrice,
          totalZonePrice: zonePrice,
        };
      }
    });

    //Se añaden las entradas sin allocation pero con sitio
    notAllocatedSeatedQuantities.map((seats, index) => {
      if (seats.length > 0) {
        seats.map((seat) => {
          orderData.items.push({
            eventId: event.eventId,
            eventDateId: selectedData.eventDateId,
            eventDateZoneId: selectedData.zoneDates[index].eventDateZoneId,
            quantity: 1,
            seatId: seat,
          });
        });

        const zonePrice =
          parseInt(seats.length) *
          parseFloat(selectedData.zoneDates[index].basePrice);

        shoppingCart[selectedData.zoneDates[index].name] = {
          allocation: "",
          quantity: seats.length,
          price: zonePrice,
          totalZonePrice: zonePrice,
        };
      }
    });

    //Se añaden las entradas con allocation pero sin sitio
    allocatedGeneralQuantities.map((quantitiesZone, zoneIndex) => {
      if (quantitiesZone != "") {
        const zone = selectedData.zoneDates[zoneIndex];
        let zonePrice = 0;

        quantitiesZone.map((quantity, allocationIndex) => {
          if (quantity > 0) {
            orderData.items.push({
              eventId: event.eventId,
              eventDateId: selectedData.eventDateId,
              eventDateZoneId: zone.eventDateZoneId,
              eventDateZoneAllocationId:
                zone.allocations[allocationIndex].eventDateZoneAllocationId,
              quantity: quantity,
            });

            const allocation = zone.allocations[allocationIndex];
            const discount =
              allocation.discountType === "PERCENTAGE"
                ? (parseFloat(zone.basePrice) *
                    parseFloat(allocation.discountValue)) /
                  100
                : parseFloat(allocation.discountValue);
            const price =
              parseFloat(quantity) * (parseFloat(zone.basePrice) - discount);

            if (!shoppingCart[zone.name]) shoppingCart[zone.name] = {};
            shoppingCart[zone.name][allocation.audienceName] = {
              quantity,
              price,
            };
            zonePrice += price;
          }
        });
        if (shoppingCart[zone.name])
          shoppingCart[zone.name].totalZonePrice = zonePrice;
      }
    });

    //Se añaden las entradas con allocation y con sitio
    allocatedSeatedQuantities.map((seats, zoneIndex) => {
      const zone = selectedData.zoneDates[zoneIndex];
      let zoneTotalPrice = 0;

      for (const seatId in seats) {
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: selectedData.eventDateId,
          eventDateZoneId: zone.eventDateZoneId,
          eventDateZoneAllocationId:
            zone.allocations[seats[seatId]].eventDateZoneAllocationId,
          quantity: 1,
          seatId: seatId,
        });
      }

      zone.allocations.map((allocation, index) => {
        const quantity = Object.values(seats).filter(
          (value) => value === index
        ).length;
        if (quantity) {
          const discount =
            allocation.discountType === "PERCENTAGE"
              ? (parseFloat(zone.basePrice) *
                  parseFloat(allocation.discountValue)) /
                100
              : parseFloat(allocation.discountValue);
          const price =
            parseFloat(quantity) * (parseFloat(zone.basePrice) - discount);

          if (!shoppingCart[zone.name]) shoppingCart[zone.name] = {};
          shoppingCart[zone.name][allocation.audienceName] = {
            quantity,
            price,
          };
          zoneTotalPrice += price;
        }
      });

      if (shoppingCart[zone.name]) {
        if (!shoppingCart[zone.name].totalZonePrice)
          shoppingCart[zone.name].totalZonePrice = 0;
        shoppingCart[zone.name].totalZonePrice += zoneTotalPrice;
      }
    });
    try {
      const response = await EventuroApi({
        endpoint: orderEndpoint,
        method: apiMethod,
        data: orderData,
      });

      // Calcular subtotal sumando totalZonePrice
      const subtotal = Object.values(shoppingCart).reduce((acc, zone) => {
        if (typeof zone.totalZonePrice === "number") {
          return acc + zone.totalZonePrice;
        }
        return acc;
      }, 0);

      setOrder({
        ...response,
        subtotal,
      });

      // Actualizar el evento con el carrito completo
      setEvent({
        ...event,
        selectedDate: selectedData.formattedStartDate,
        selectedSchedule:
          selectedData.formattedStartHour +
          " - " +
          selectedData.formattedEndHour,
        shoppingCart: shoppingCart,
      });

      navigate(paymentPage);
    } catch (err) {
      console.error("Error al consultar disponibilidad:", err);
      try {
        const error = JSON.parse(err.message.split(": ")[1]);
        setErrorMessage(error.error);
        setShowAlertMessage(true);
      } catch {
        console.warn("No se pudo parsear el JSON del error:", err.message);
      }

      throw err;
    }
  };

  return (
    <>
      <BaseModal>
        <div className="flex flex-col rounded-xl justify-between w-full max-w-6xl h-auto  bg-white shadow-2xs ">
          <div className="flex flex-wrap h-[60vh] rounded-xl">
            <div className="flex flex-[4] rounded-xl items-stretch h-full flex-col border-r border-gray-300/60">
              {/* Header del modal */}
              <div className="flex flex-row rounded-l-xl rounded-b-none shadow-sm border-b justify-start gap-4 items-center py-4 px-4 border-b-gray-300 bg-gray-200">
                <ArrowButton onClick={onReturn} />
                <span className="inline-block font-semibold text-3xl">
                  Selecciona tus entradas
                </span>
              </div>

              {/* Sección donde se muestran las entradas */}
              <div className="flex overflow-auto flex-col h-full w-full px-7 pb-5 gap-2.5">
                <div className="flex pt-3">
                  {showAlertMessage && (
                    <AlertMessage id={zoneIndex}>
                      {TICKET_SELECTION_TEXTS.alerts[errorMessage]}
                    </AlertMessage>
                  )}
                </div>
                {selectedData &&
                  selectedData.zoneDates.map((zone, zoneIndex) => (
                    <div key={zoneIndex} className="gap-none">
                      <div className="grid grid-cols-[1fr_auto_auto] justify-between items-center py-3 border border-gray-400 shadow-xl rounded-lg px-5">
                        <span>{zone.name}</span>
                        {/* Zonas */}
                        {zone.allocations.length === 0 && (
                          <>
                            <span>{currencies.PEN + zone.basePrice}</span>

                            {zone.kind != "SEATED" ? (
                              <div
                                key={zoneIndex}
                                className="select-none grid grid-cols-3 justify-between items-center"
                              >
                                <div className="flex flex-row gap-4 items-center m-3">
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
                        <div className="rounded-b-2xl border-b border-x border-gray-300 bg-gray-100 shadow-md">
                          {zone.allocations.length > 0 &&
                            zone.allocations.map(
                              (allocation, allocationIndex) => (
                                <div
                                  key={allocationIndex}
                                  className="flex flex-col rounded-2xl  bg-gray-100"
                                >
                                  <div className="select-none grid grid-cols-[1fr_1fr_auto] gap-4 items-center bg-gray-100 py-2.5 pl-3.5 pr-2 rounded-2xl">
                                    <span className=" w-auto">
                                      {allocation.audienceName}
                                    </span>
                                    <span>
                                      {currencies.PEN +
                                        " " +
                                        parseFloat(allocation.price)}
                                    </span>
                                    {zone.kind != "SEATED" ? (
                                      <div
                                        key={allocationIndex}
                                        className="grid grid-cols-3 justify-between items-center gap-3.5"
                                      >
                                        <div
                                          onClick={() =>
                                            handleAllocatedGeneralSubtraction(
                                              zoneIndex,
                                              allocationIndex
                                            )
                                          }
                                          className="flex select-none py-0.5 cursor-pointer transition-all hover:scale-110"
                                        >
                                          <div className="flex cursor-pointer rounded-xl bg-gray-300 justify-center items-center hover:bg-gray-400/60 transition-all hover:scale-101">
                                            <MinusIcon className="select-none size-3.5 m-0.5" />
                                          </div>
                                        </div>

                                        <span className="text-center">
                                          {
                                            allocatedGeneralQuantities[
                                              zoneIndex
                                            ][allocationIndex]
                                          }
                                        </span>
                                        <div
                                          onClick={() =>
                                            handleAllocatedGeneralSum(
                                              zoneIndex,
                                              allocationIndex
                                            )
                                          }
                                          className="flex select-none py-0.5 cursor-pointer  transition-all hover:scale-110"
                                        >
                                          <div className="flex cursor-pointer rounded-xl bg-gray-300 justify-center items-center hover:bg-gray-400/60 transition-all hover:scale-101">
                                            <PlusIcon className="select-none size-3.5 m-0.5 " />
                                          </div>
                                        </div>
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
                              )
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* Sección de información del evento */}
            <div className="flex-[2] rounded-r overflow-auto h-full">
              <div className="flex flex-col rounded-r py-6 px-6 gap-3 justify-start">
                <img src={event?.image} className="rounded-lg "></img>
                <span className="inline-block text-start font-semibold text-2xl">
                  {event?.title}
                </span>
                <div className="flex flex-1 flex-row justify-start items-center gap-2">
                  <MapPinIcon className="inline-block size-5 text-purple-600"></MapPinIcon>
                  {event?.inPerson ? (
                    <span className="flex text-start">
                      {event?.venue?.address}
                    </span>
                  ) : (
                    <span>Modalidad Virtual</span>
                  )}
                </div>
                <div className="flex flex-1 flex-row justify-start items-center gap-2">
                  <UserGroupIcon className="flex size-5 text-purple-600"></UserGroupIcon>
                  <p className="inline-block text-start">
                    {event?.accessPolicyDescription}
                  </p>
                </div>
                <div className="flex flex-1 flex-row  justify-start items-center gap-2">
                  <CalendarIcon className="size-5 text-purple-600"></CalendarIcon>
                  <span className="inline-block">
                    {selectedData?.formattedStartDate}
                  </span>
                </div>
                <div className="flex flex-1 flex-row  justify-start items-center gap-2">
                  <ClockIcon className="size-5 text-purple-600"></ClockIcon>
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
          <div className="flex flex-row h-auto py-3 px-3.5 justify-between gap-4 border-t border-gray-300/60 items-center">
            <div className="flex flex-row gap-4">
              <span className="inline-block font-semibold">Subtotal: </span>
              <span className="inline-block font-semibold">
                {currencies.PEN + " " + subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <button
                onClick={onContinue}
                className="inline-block w-auto bg-purple-600 rounded-lg text-white px-2.5 py-1 hover:bg-yellow-500/70 hover:scale-103 cursor-pointer transition-all"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </BaseModal>
      {modal === "seats" && (
        <AnimatePresence>
          <SeatNumberSelectionModal
            setModal={setModal}
            seatMap={seatMap}
            zoneIndex={zoneIndex}
            capacityRemaining={selectedData[zoneIndex].capacityRemaining}
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
